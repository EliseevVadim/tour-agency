<?php

namespace App\Services;

use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\ProductAttributeOption;
use App\Models\ProductSku;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProductUpdater
{
    public function update(Product $product, array $data): Product
    {
        $deleteAfterCommit = [];

        $updated = DB::transaction(function () use ($product, $data, &$deleteAfterCommit) {

            $existingImages = $data['existing_images'] ?? $product->images ?? [];
            $existingImages = is_array($existingImages) ? $existingImages : [];

            $storedNewImages = $this->storeNewImages($data);

            $finalImages = array_values(array_merge(
                $this->normalizeImagesArray($existingImages),
                $storedNewImages
            ));

            $this->assertImagesValid($finalImages);

            $deleteAfterCommit = $this->collectRemovedImagePaths($product->images ?? [], $finalImages);

            $product->update([
                'name' => $data['name'],
                'description' => $data['description'] ?? null,
                'old_price' => $data['old_price'] ?? null,
                'is_hit' => (bool)($data['is_hit'] ?? false),
                'category_id' => $data['category_id'],
                'images' => $finalImages,
            ]);

            $attributes = $data['attributes'] ?? null;
            $skus = $data['available_skus'] ?? null;

            $this->replaceVariants($product, is_array($attributes) ? $attributes : [], is_array($skus) ? $skus : []);

            return $product->load('category', 'attributes.options', 'skus.options.attribute');
        });

        foreach ($deleteAfterCommit as $publicPath) {
            $this->deletePublicStoragePathIfSafe($publicPath);
        }

        return $updated;
    }

    private function storeNewImages(array $data): array
    {
        $result = [];

        if (!isset($data['new_images']) || !is_array($data['new_images'])) {
            return $result;
        }

        foreach ($data['new_images'] as $i => $row) {
            $file = $row['image'] ?? null;

            if (!$file instanceof UploadedFile) {
                continue;
            }

            $path = $file->store('products', 'public');

            $result[] = [
                'image' => '/storage/' . $path,
                'primary' => (bool)($row['primary'] ?? false),
            ];
        }

        return $result;
    }

    private function normalizeImagesArray(array $images): array
    {
        return array_values(array_filter(array_map(function ($img) {
            if (!is_array($img)) return null;
            if (!isset($img['image'])) return null;

            return [
                'image' => (string)$img['image'],
                'primary' => (bool)($img['primary'] ?? false),
            ];
        }, $images)));
    }

    private function assertImagesValid(array $images): void
    {
        $primaryCount = 0;
        foreach ($images as $img) {
            if (!empty($img['primary'])) $primaryCount++;
        }

        if ($primaryCount !== 1) {
            throw new \RuntimeException('Должно быть ровно одно основное изображение');
        }
    }

    private function collectRemovedImagePaths(array $oldImages, array $newImages): array
    {
        $old = collect($this->normalizeImagesArray($oldImages))->pluck('image')->all();
        $new = collect($this->normalizeImagesArray($newImages))->pluck('image')->all();

        $removed = array_values(array_diff($old, $new));
        return $removed;
    }

    private function deletePublicStoragePathIfSafe(string $publicPath): void
    {
        if (!str_starts_with($publicPath, '/storage/products/')) {
            return;
        }

        $relative = str_replace('/storage/', '', $publicPath);
        Storage::disk('public')->delete($relative);
    }

    private function replaceVariants(Product $product, array $attributes, array $skus): void
    {
        $product->skus()->each(function (ProductSku $sku) {
            $sku->options()->detach();
        });
        $product->skus()->delete();

        $product->attributes()->each(function (ProductAttribute $attr) {
            $attr->options()->delete();
        });

        $product->attributes()->delete();

        if (empty($attributes)) {
            return;
        }

        $attributeOptionIdMap = $this->createAttributesAndOptions($product->id, $attributes);

        if (!empty($skus)) {
            $this->createSkus($product->id, $skus, $attributeOptionIdMap);
        }
    }

    private function createAttributesAndOptions(int $productId, array $attributes): array
    {
        $map = [];

        foreach ($attributes as $attr) {
            $attribute = ProductAttribute::create([
                'product_id' => $productId,
                'name' => $attr['name'],
                'sku_key' => $attr['sku_key'],
            ]);

            $optMap = [];

            foreach (($attr['options'] ?? []) as $value) {
                $value = trim((string)$value);
                if ($value === '') continue;

                $option = ProductAttributeOption::create([
                    'attribute_id' => $attribute->id,
                    'value' => $value,
                ]);

                $optMap[$value] = $option->id;
            }

            $map[$attr['sku_key']] = $optMap;
        }

        return $map;
    }

    private function skuPart(string $value): string
    {
        $value = mb_strtolower(trim($value));

        $map = [
            'а'=>'a','б'=>'b','в'=>'v','г'=>'g','д'=>'d','е'=>'e','ё'=>'e','ж'=>'zh','з'=>'z','и'=>'i','й'=>'y',
            'к'=>'k','л'=>'l','м'=>'m','н'=>'n','о'=>'o','п'=>'p','р'=>'r','с'=>'s','т'=>'t','у'=>'u','ф'=>'f',
            'х'=>'h','ц'=>'ts','ч'=>'ch','ш'=>'sh','щ'=>'sch','ъ'=>'','ы'=>'y','ь'=>'','э'=>'e','ю'=>'yu','я'=>'ya',
        ];

        $latin = '';
        foreach (preg_split('//u', $value, -1, PREG_SPLIT_NO_EMPTY) as $ch) {
            $latin .= $map[$ch] ?? $ch;
        }

        $latin = strtoupper($latin);
        $latin = preg_replace('/\s+/', '-', $latin);
        $latin = preg_replace('/[^A-Z0-9-]/', '', $latin);
        $latin = preg_replace('/-+/', '-', $latin);
        $latin = trim($latin, '-');

        return $latin !== '' ? $latin : 'X';
    }

    private function buildBaseSku(int $productId, array $skuData, array $attributeKeysInOrder): string
    {
        $parts = [];
        foreach ($attributeKeysInOrder as $key) {
            if (!isset($skuData[$key])) continue;
            $parts[] = $this->skuPart((string)$skuData[$key]);
        }

        return 'ID-' . $productId . '-' . implode('-', $parts);
    }

    private function ensureUniqueSku(string $baseSku): string
    {
        $sku = $baseSku;
        $i = 2;

        while (ProductSku::where('sku', $sku)->exists()) {
            $sku = $baseSku . '-' . $i;
            $i++;
        }

        return $sku;
    }

    private function createSkus(int $productId, array $skus, array $attributeOptionIdMap): void
    {
        $attributeKeysInOrder = array_keys($attributeOptionIdMap);

        foreach ($skus as $skuData) {
            $baseSku = $this->buildBaseSku($productId, $skuData, $attributeKeysInOrder);
            $finalSku = $this->ensureUniqueSku($baseSku);

            $sku = ProductSku::create([
                'sku' => $finalSku,
                'product_id' => $productId,
                'price' => (int)($skuData['price'] ?? 0),
                'stock_qty' => (int)($skuData['stock_qty'] ?? 0),

                'weight' => (int)($skuData['weight'] ?? 0),
                'length' => (int)($skuData['length'] ?? 0),
                'width'  => (int)($skuData['width'] ?? 0),
                'height' => (int)($skuData['height'] ?? 0),
            ]);

            $optionIds = [];

            foreach ($attributeOptionIdMap as $skuKey => $valueToId) {
                if (!isset($skuData[$skuKey])) continue;

                $val = trim((string)$skuData[$skuKey]);
                if ($val !== '' && isset($valueToId[$val])) {
                    $optionIds[] = $valueToId[$val];
                }
            }

            $sku->options()->sync($optionIds);
        }
    }
}
