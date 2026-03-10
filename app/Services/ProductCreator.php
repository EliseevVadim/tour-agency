<?php

namespace App\Services;

use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\ProductAttributeOption;
use App\Models\ProductSku;
use Illuminate\Support\Facades\DB;

class ProductCreator
{
    private function storeImages(array $images): array
    {
        $result = [];

        foreach ($images as $img) {
            $file = $img['image'];

            $path = $file->store('products', 'public');
            $result[] = [
                'primary' => (bool)$img['primary'],
                'image' => '/storage/' . $path,
            ];
        }

        return $result;
    }

    public function create(array $data): Product
    {
        return DB::transaction(function () use ($data) {

            $storedImages = $this->storeImages($data['images'] ?? []);

            $product = Product::create([
                'name' => $data['name'],
                'description' => $data['description'] ?? null,
                'images' => $storedImages,
                'old_price' => $data['old_price'] ?? null,
                'current_price' => $data['current_price'],
                'is_hit' => (bool)($data['is_hit'] ?? false),
                'category_id' => $data['category_id'],
            ]);

            $attributes = $data['attributes'] ?? [];
            $skus = $data['available_skus'] ?? [];

            if (empty($attributes) || !is_array($attributes)) {
                return $product->load('category');
            }

            $attributeOptionIdMap = $this->createAttributesAndOptions($product->id, $attributes);
            if (!empty($skus) && is_array($skus)) {
                $this->createSkus($product->id, $skus, $attributeOptionIdMap);
            }

            return $product->load('category', 'attributes.options', 'skus.options');
        });
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
            foreach ($attr['options'] as $value) {
                $value = trim((string)$value);

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

    private function createSkus(int $productId, array $skus, array $attributeOptionIdMap): void
    {
        foreach ($skus as $skuData) {
            $sku = ProductSku::create([
                'sku' => 'ID-' . $productId . '-' . ($skuData['sku'] ?? ''),
                'product_id' => $productId,
                'price' => (int)($skuData['price'] ?? 0),
                'stock_qty' => (int)($skuData['stock_qty'] ?? 0),

                'weight' => (int)($skuData['weight'] ?? 0),
                'length' => (int)($skuData['length'] ?? 0),
                'width'  => (int)($skuData['width'] ?? 0),
                'height' => (int)($skuData['height'] ?? 0),
            ]);

            $optionIds = $this->resolveOptionIdsForSku($skuData, $attributeOptionIdMap);
            $sku->options()->sync($optionIds);
        }
    }

    private function resolveOptionIdsForSku(array $skuData, array $attributeOptionIdMap): array
    {
        $ids = [];

        foreach ($attributeOptionIdMap as $skuKey => $valueToId) {
            if (!array_key_exists($skuKey, $skuData)) {
                continue;
            }

            $val = trim((string)$skuData[$skuKey]);
            if ($val !== '' && isset($valueToId[$val])) {
                $ids[] = $valueToId[$val];
            }
        }

        return $ids;
    }
}
