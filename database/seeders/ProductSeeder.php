<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Category;
use App\Models\ProductAttribute;
use App\Models\ProductAttributeOption;
use App\Models\ProductSku;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $category = Category::where('slug', 'clothing')->first();
        if (!$category) {
            $this->command->error("Категория 'clothing' не найдена. Запустите CategoriesTableSeeder сначала.");
            return;
        }

        $productData = [
            'name' => 'Чемодан "В ПУТЬ" (Общая Акция)',
            'description' => 'Наш самый популярный чемодан. Цена зависит от размера и цвета.',
            'images' => [
                ['primary' => true, 'image' => '/img/previews/Module_02/2.0.png'],
                ['primary' => false, 'image' => '/img/previews/Module_02/2.1.png'],
                ['primary' => false, 'image' => '/img/previews/Module_02/2.2.png'],
                ['primary' => false, 'image' => '/img/previews/Module_02/2.3.png'],
                ['primary' => false, 'image' => '/img/previews/Module_02/2.4.png'],
                ['primary' => false, 'image' => '/img/previews/Module_02/2.5.png'],
                ['primary' => false, 'image' => '/img/previews/Module_02/2.6.png'],
                ['primary' => false, 'image' => '/img/previews/Module_02/2.7.png'],
            ],
            'old_price' => 5500,
            'current_price' => 3650,
            'is_hit' => true,
            'category_id' => $category->id,
        ];

        $attributesData = [
            [
                "name" => "Размер",
                "sku_key" => "size",
                "options" => ["Маленький", "Средний", "Большой"]
            ],
            [
                "name" => "Цвет",
                "sku_key" => "color",
                "options" => ["Синий", "Зеленый", "Красный"]
            ]
        ];

        $skusData = [
            ["sku" => "101-M-BLU", "size" => "Средний", "color" => "Синий", "price" => 120, "stock_qty" => 4],
            ["sku" => "101-M-GRN", "size" => "Средний", "color" => "Зеленый", "price" => 120, "stock_qty" => 0],
            ["sku" => "101-L-BLU", "size" => "Большой", "color" => "Синий", "price" => 150, "stock_qty" => 0],
            ["sku" => "101-L-RED", "size" => "Большой", "color" => "Красный", "price" => 150, "stock_qty" => 2]
        ];

        $product = Product::create($productData);

        $this->command->info("Продукт ID {$product->id} создан.");

        $createdAttributes = [];

        foreach ($attributesData as $attr) {
            $attribute = ProductAttribute::create([
                'product_id' => $product->id,
                'name' => $attr['name'],
                'sku_key' => $attr['sku_key'],
            ]);

            $createdAttributes[$attr['sku_key']] = ['id' => $attribute->id, 'options' => []];

            foreach ($attr['options'] as $optionValue) {
                $option = ProductAttributeOption::create([
                    'attribute_id' => $attribute->id,
                    'value' => $optionValue,
                ]);

                $createdAttributes[$attr['sku_key']]['options'][$optionValue] = $option->id;
            }
        }

        $this->command->info("Атрибуты и опции созданы.");

        $pivotData = [];

        foreach ($skusData as $skuItem) {
            $sku = ProductSku::create([
                'sku' => $skuItem['sku'],
                'product_id' => $product->id,
                'price' => $skuItem['price'],
                'stock_qty' => $skuItem['stock_qty'],
            ]);

            $sizeId = $createdAttributes['size']['options'][$skuItem['size']] ?? null;
            $colorId = $createdAttributes['color']['options'][$skuItem['color']] ?? null;

            if ($sizeId && $colorId) {
                $pivotData[] = [
                    'sku' => $skuItem['sku'],
                    'option_id' => $sizeId,
                ];
                $pivotData[] = [
                    'sku' => $skuItem['sku'],
                    'option_id' => $colorId,
                ];
            }
        }

        DB::table('sku_option_pivot')->insert($pivotData);

        $this->command->info("SKU и связи созданы для товара {$product->name}.");
    }
};
