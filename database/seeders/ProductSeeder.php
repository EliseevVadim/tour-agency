<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Category;
use App\Models\ProductAttribute;
use App\Models\ProductAttributeOption;
use App\Models\ProductSku;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::whereIn('slug', ['clothing', 'accessories', 'travelGoods'])
            ->get()->keyBy('slug');

        if ($categories->count() < 3) {
            $this->command->error("Не все категории найдены. Убедитесь, что есть clothing, accessories, travelGoods.");
            return;
        }

        $sizes = ['Маленький', 'Средний', 'Большой'];
        $colors = ['Синий', 'Зеленый', 'Красный'];
        $materials = ['Кожа', 'Ткань', 'Пластик'];
        $imagesTemplate = [
            '/img/previews/Module_02/2.0.png',
            '/img/previews/Module_02/2.1.png',
            '/img/previews/Module_02/2.2.png',
            '/img/previews/Module_02/2.3.png',
        ];

        for ($i = 1; $i <= 40; $i++) {
            $categorySlug = array_rand($categories->toArray());
            $category = $categories[$categorySlug];

            $product = Product::create([
                'name' => "Продукт {$i} - " . Str::random(5),
                'description' => "Описание продукта {$i}. Категория: {$category->name}.",
                'images' => array_map(fn($img, $idx) => ['primary' => $idx===0, 'image'=>$img], $imagesTemplate, array_keys($imagesTemplate)),
                'old_price' => rand(1000, 5000),
                'current_price' => rand(500, 4000),
                'is_hit' => rand(0,1) ? true : false,
                'category_id' => $category->id,
            ]);

            $attributeVariants = [
                ['size','color'],
                ['material'],
                ['size','color','material'],
                []
            ];

            $selectedVariant = $attributeVariants[array_rand($attributeVariants)];

            $createdAttributes = [];

            foreach ($selectedVariant as $attrKey) {
                switch ($attrKey) {
                    case 'size': $options = $sizes; $name = 'Размер'; break;
                    case 'color': $options = $colors; $name = 'Цвет'; break;
                    case 'material': $options = $materials; $name = 'Материал'; break;
                }

                $attribute = ProductAttribute::create([
                    'product_id'=>$product->id,
                    'name'=>$name,
                    'sku_key'=>$attrKey
                ]);

                $createdAttributes[$attrKey] = ['id'=>$attribute->id,'options'=>[]];

                foreach ($options as $value) {
                    $option = ProductAttributeOption::create([
                        'attribute_id'=>$attribute->id,
                        'value'=>$value
                    ]);
                    $createdAttributes[$attrKey]['options'][$value] = $option->id;
                }
            }

            $skuCounter = 100 + $i*10;

            if (empty($selectedVariant)) {
                ProductSku::create([
                    'sku' => "SKU{$skuCounter}",
                    'product_id' => $product->id,
                    'price' => $product->current_price,
                    'stock_qty' => rand(0,10)
                ]);
            } else {
                $optionsArrays = [];
                foreach ($selectedVariant as $key) {
                    $optionsArrays[] = array_keys($createdAttributes[$key]['options']);
                }

                $combinations = $this->cartesian($optionsArrays);

                foreach ($combinations as $combo) {
                    $skuCode = "SKU{$skuCounter}-" . implode('-', array_map(fn($v)=>Str::upper(substr($v,0,3)),$combo));
                    $price = $product->current_price + rand(-200,200);
                    $stock = rand(0,20);

                    $sku = ProductSku::create([
                        'sku'=>$skuCode,
                        'product_id'=>$product->id,
                        'price'=>$price,
                        'stock_qty'=>$stock
                    ]);

                    $optionIds = [];
                    foreach ($selectedVariant as $idx => $key) {
                        $optionIds[] = $createdAttributes[$key]['options'][$combo[$idx]];
                    }

                    $sku->options()->sync($optionIds);

                    $skuCounter++;
                }
            }

            $this->command->info("Продукт {$product->id} с SKU создан.");
        }

        $this->command->info("Сидирование 40 товаров с разными атрибутами завершено.");
    }

    private function cartesian($arrays) {
        $result = [[]];
        foreach ($arrays as $property => $property_values) {
            $tmp = [];
            foreach ($result as $result_item) {
                foreach ($property_values as $property_value) {
                    $tmp[] = array_merge($result_item, [$property_value]);
                }
            }
            $result = $tmp;
        }
        return $result;
    }
}
