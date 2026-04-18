<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\ProductAttributeOption;
use App\Models\ProductSku;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::whereIn('slug', ['clothing', 'accessories', 'travelGoods'])
            ->get()
            ->keyBy('slug');

        if ($categories->count() < 3) {
            $this->command->error('Не все категории найдены. Нужны: clothing, accessories, travelGoods.');
            return;
        }

        $catalog = $this->catalogConfig();

        for ($i = 1; $i <= 10; $i++) {
            $categorySlug = collect(['clothing', 'accessories', 'travelGoods'])->random();
            $category = $categories[$categorySlug];
            $config = $catalog[$categorySlug];

            $productType = collect($config['products'])->random();
            $basePrice = rand($config['price_min'], $config['price_max']);
            $oldPrice = $basePrice + rand(300, 1800);

            $product = Product::create([
                'name' => $productType['name'] . ' ' . $this->randomSuffix(),
                'description' => $this->makeDescription($productType['name'], $category->name, $productType['description']),
                'images' => $this->buildImages($productType['images']),
                'old_price' => $oldPrice,
                'is_hit' => $this->isHit($categorySlug, $i),
                'category_id' => $category->id,
            ]);

            $createdAttributes = $this->createAttributes($product->id, $productType['attributes']);

            $skuCounter = 1000 + ($i * 100);

            if (empty($productType['attributes'])) {
                ProductSku::create([
                    'sku' => "SKU{$skuCounter}",
                    'product_id' => $product->id,
                    'price' => $basePrice,
                    'stock_qty' => $this->makeStock($categorySlug, []),
                    'weight' => $this->makeDimensions($categorySlug)['weight'],
                    'length' => $this->makeDimensions($categorySlug)['length'],
                    'width' => $this->makeDimensions($categorySlug)['width'],
                    'height' => $this->makeDimensions($categorySlug)['height'],
                ]);

                $this->command->info("Создан товар {$product->id}: {$product->name}");
                continue;
            }

            $optionsArrays = [];
            $attributeKeys = array_keys($productType['attributes']);

            foreach ($attributeKeys as $key) {
                $optionsArrays[] = array_keys($createdAttributes[$key]['options']);
            }

            $combinations = $this->cartesian($optionsArrays);

            foreach ($combinations as $combo) {
                $comboAssoc = [];
                foreach ($attributeKeys as $index => $key) {
                    $comboAssoc[$key] = $combo[$index];
                }

                $dims = $this->makeDimensions($categorySlug, $comboAssoc);

                $sku = ProductSku::create([
                    'sku' => $this->makeSku($skuCounter, $comboAssoc),
                    'product_id' => $product->id,
                    'price' => $this->makeSkuPrice($basePrice, $categorySlug, $comboAssoc),
                    'stock_qty' => $this->makeStock($categorySlug, $comboAssoc),
                    'weight' => $dims['weight'],
                    'length' => $dims['length'],
                    'width' => $dims['width'],
                    'height' => $dims['height'],
                ]);

                $optionIds = [];
                foreach ($comboAssoc as $attrKey => $value) {
                    $optionIds[] = $createdAttributes[$attrKey]['options'][$value];
                }

                $sku->options()->sync($optionIds);
                $skuCounter++;
            }

            $this->command->info("Создан товар {$product->id}: {$product->name}");
        }

        $this->command->info('Сгенерировано 10 реалистичных товаров.');
    }

    private function catalogConfig(): array
    {
        return [
            'clothing' => [
                'price_min' => 2200,
                'price_max' => 8900,
                'products' => [
                    [
                        'name' => 'Футболка',
                        'description' => 'Универсальная модель на каждый день.',
                        'images' => [
                            '/img/previews/Module_02/2.0.png',
                            '/img/previews/Module_02/2.1.png',
                            '/img/previews/Module_02/2.2.png',
                            '/img/previews/Module_02/2.3.png',
                            '/img/previews/Module_02/2.4.png'
                        ],
                        'attributes' => [
                            'size' => [
                                'name' => 'Размер',
                                'options' => ['XS', 'S', 'M', 'L', 'XL'],
                            ],
                            'color' => [
                                'name' => 'Цвет',
                                'options' => ['Белый', 'Черный', 'Синий', 'Серый'],
                            ],
                            'material' => [
                                'name' => 'Материал',
                                'options' => ['Хлопок', 'Полиэстер'],
                            ],
                        ],
                    ],
                    [
                        'name' => 'Худи',
                        'description' => 'Комфортная вещь для прохладной погоды.',
                        'images' => [
                            '/img/previews/Module_02/2.0.png',
                            '/img/previews/Module_02/2.1.png',
                            '/img/previews/Module_02/2.2.png',
                            '/img/previews/Module_02/2.3.png',
                            '/img/previews/Module_02/2.4.png'
                        ],
                        'attributes' => [
                            'size' => [
                                'name' => 'Размер',
                                'options' => ['S', 'M', 'L', 'XL'],
                            ],
                            'color' => [
                                'name' => 'Цвет',
                                'options' => ['Черный', 'Серый', 'Бежевый', 'Зеленый'],
                            ],
                            'material' => [
                                'name' => 'Материал',
                                'options' => ['Хлопок', 'Флис'],
                            ],
                        ],
                    ],
                    [
                        'name' => 'Куртка',
                        'description' => 'Практичная верхняя одежда для города и поездок.',
                        'images' => [
                            '/img/previews/Module_02/2.0.png',
                            '/img/previews/Module_02/2.1.png',
                            '/img/previews/Module_02/2.2.png',
                            '/img/previews/Module_02/2.3.png',
                            '/img/previews/Module_02/2.4.png'
                        ],
                        'attributes' => [
                            'size' => [
                                'name' => 'Размер',
                                'options' => ['M', 'L', 'XL', 'XXL'],
                            ],
                            'color' => [
                                'name' => 'Цвет',
                                'options' => ['Черный', 'Синий', 'Хаки'],
                            ],
                            'material' => [
                                'name' => 'Материал',
                                'options' => ['Нейлон', 'Полиэстер'],
                            ],
                        ],
                    ],
                ],
            ],

            'accessories' => [
                'price_min' => 1200,
                'price_max' => 7600,
                'products' => [
                    [
                        'name' => 'Кошелек',
                        'description' => 'Компактный аксессуар для карт и наличных.',
                        'images' => [
                            '/img/previews/Module_02/2.0.png',
                            '/img/previews/Module_02/2.1.png',
                            '/img/previews/Module_02/2.2.png',
                            '/img/previews/Module_02/2.3.png',
                            '/img/previews/Module_02/2.4.png'
                        ],
                        'attributes' => [
                            'color' => [
                                'name' => 'Цвет',
                                'options' => ['Черный', 'Коричневый', 'Темно-синий'],
                            ],
                            'material' => [
                                'name' => 'Материал',
                                'options' => ['Натуральная кожа', 'Экокожа'],
                            ],
                        ],
                    ],
                    [
                        'name' => 'Ремень',
                        'description' => 'Классический аксессуар для повседневного образа.',
                        'images' => [
                            '/img/previews/Module_02/2.0.png',
                            '/img/previews/Module_02/2.1.png',
                            '/img/previews/Module_02/2.2.png',
                            '/img/previews/Module_02/2.3.png',
                            '/img/previews/Module_02/2.4.png'
                        ],
                        'attributes' => [
                            'size' => [
                                'name' => 'Размер',
                                'options' => ['100 см', '110 см', '120 см'],
                            ],
                            'color' => [
                                'name' => 'Цвет',
                                'options' => ['Черный', 'Коричневый'],
                            ],
                            'material' => [
                                'name' => 'Материал',
                                'options' => ['Кожа', 'Текстиль'],
                            ],
                        ],
                    ],
                    [
                        'name' => 'Сумка через плечо',
                        'description' => 'Удобный вариант для города и прогулок.',
                        'images' => [
                            '/img/previews/Module_02/2.0.png',
                            '/img/previews/Module_02/2.1.png',
                            '/img/previews/Module_02/2.2.png',
                            '/img/previews/Module_02/2.3.png',
                            '/img/previews/Module_02/2.4.png'
                        ],
                        'attributes' => [
                            'color' => [
                                'name' => 'Цвет',
                                'options' => ['Черный', 'Бежевый', 'Оливковый'],
                            ],
                        ],
                    ],
                ],
            ],

            'travelGoods' => [
                'price_min' => 3900,
                'price_max' => 18900,
                'products' => [
                    [
                        'name' => 'Чемодан',
                        'description' => 'Надежный багаж для поездок и путешествий.',
                        'images' => [
                            '/img/previews/Module_02/2.0.png',
                            '/img/previews/Module_02/2.1.png',
                            '/img/previews/Module_02/2.2.png',
                            '/img/previews/Module_02/2.3.png',
                            '/img/previews/Module_02/2.4.png'
                        ],
                        'attributes' => [
                            'size' => [
                                'name' => 'Размер',
                                'options' => ['S', 'M', 'L'],
                            ],
                            'color' => [
                                'name' => 'Цвет',
                                'options' => ['Черный', 'Синий', 'Серебристый'],
                            ],
                        ],
                    ],
                    [
                        'name' => 'Дорожная сумка',
                        'description' => 'Практичный вариант для коротких поездок.',
                        'images' => [
                            '/img/previews/Module_02/2.0.png',
                            '/img/previews/Module_02/2.1.png',
                            '/img/previews/Module_02/2.2.png',
                            '/img/previews/Module_02/2.3.png',
                            '/img/previews/Module_02/2.4.png'
                        ],
                        'attributes' => [
                            'size' => [
                                'name' => 'Размер',
                                'options' => ['40 л', '60 л', '80 л'],
                            ],
                            'color' => [
                                'name' => 'Цвет',
                                'options' => ['Черный', 'Серый', 'Синий'],
                            ],
                        ],
                    ],
                    [
                        'name' => 'Рюкзак для путешествий',
                        'description' => 'Вместительный рюкзак для ручной клади и поездок.',
                        'images' => [
                            '/img/previews/Module_02/2.0.png',
                            '/img/previews/Module_02/2.1.png',
                            '/img/previews/Module_02/2.2.png',
                            '/img/previews/Module_02/2.3.png',
                            '/img/previews/Module_02/2.4.png'
                        ],
                        'attributes' => [
                            'size' => [
                                'name' => 'Размер',
                                'options' => ['20 л', '30 л', '45 л'],
                            ],
                            'color' => [
                                'name' => 'Цвет',
                                'options' => ['Черный', 'Оливковый', 'Синий'],
                            ],
                        ],
                    ],
                ],
            ],
        ];
    }

    private function createAttributes(int $productId, array $attributes): array
    {
        $created = [];

        foreach ($attributes as $skuKey => $attributeData) {
            $attribute = ProductAttribute::create([
                'product_id' => $productId,
                'name' => $attributeData['name'],
                'sku_key' => $skuKey,
            ]);

            $created[$skuKey] = [
                'id' => $attribute->id,
                'options' => [],
            ];

            foreach ($attributeData['options'] as $value) {
                $option = ProductAttributeOption::create([
                    'attribute_id' => $attribute->id,
                    'value' => $value,
                ]);

                $created[$skuKey]['options'][$value] = $option->id;
            }
        }

        return $created;
    }

    private function buildImages(array $images): array
    {
        return array_map(
            fn ($img, $index) => [
                'primary' => $index === 0,
                'image' => $img,
            ],
            $images,
            array_keys($images)
        );
    }

    private function makeDescription(string $name, string $categoryName, string $extra): string
    {
        return "{$name} из категории {$categoryName}. {$extra}";
    }

    private function randomSuffix(): string
    {
        $suffixes = ['Urban', 'Classic', 'Lite', 'Pro', 'Travel', 'Daily', 'Flex'];
        return $suffixes[array_rand($suffixes)];
    }

    private function isHit(string $categorySlug, int $index): bool
    {
        if ($categorySlug === 'travelGoods') {
            return rand(1, 100) <= 45;
        }

        if ($categorySlug === 'accessories') {
            return rand(1, 100) <= 35;
        }

        return rand(1, 100) <= 30 || $index % 5 === 0;
    }

    private function makeSkuPrice(int $basePrice, string $categorySlug, array $combo): int
    {
        $delta = 0;

        if (isset($combo['size'])) {
            $delta += match ($combo['size']) {
                'XS', 'S', '20 л', '40 л', '100 см' => 0,
                'M', '30 л', '60 л', '110 см' => 250,
                'L', 'XL', 'XXL', '45 л', '80 л', '120 см' => 500,
                default => 300,
            };
        }

        if (isset($combo['material'])) {
            $delta += match ($combo['material']) {
                'Натуральная кожа', 'Кожа' => 1200,
                'Поликарбонат' => 900,
                'Флис' => 400,
                'Нейлон' => 300,
                'Экокожа' => 350,
                default => 150,
            };
        }

        if (isset($combo['color'])) {
            $delta += in_array($combo['color'], ['Серебристый', 'Бежевый']) ? 150 : 0;
        }

        if ($categorySlug === 'travelGoods') {
            $delta += 500;
        }

        return max(500, $basePrice + $delta);
    }

    private function makeStock(string $categorySlug, array $combo): int
    {
        $base = match ($categorySlug) {
            'clothing' => rand(8, 30),
            'accessories' => rand(5, 18),
            'travelGoods' => rand(2, 12),
            default => rand(3, 10),
        };

        if (isset($combo['size']) && in_array($combo['size'], ['XL', 'XXL', '80 л', '45 л', '120 см'])) {
            $base -= rand(2, 5);
        }

        if (isset($combo['material']) && in_array($combo['material'], ['Натуральная кожа', 'Поликарбонат'])) {
            $base -= rand(1, 3);
        }

        return max(0, $base);
    }

    private function makeDimensions(string $categorySlug, array $combo = []): array
    {
        if ($categorySlug === 'clothing') {
            $weight = rand(200, 1200);
            $length = rand(25, 45);
            $width = rand(20, 35);
            $height = rand(3, 10);

            if (($combo['size'] ?? null) === 'XL' || ($combo['size'] ?? null) === 'XXL') {
                $weight += 150;
                $length += 3;
                $width += 2;
            }

            return compact('weight', 'length', 'width', 'height');
        }

        if ($categorySlug === 'accessories') {
            $weight = rand(150, 900);
            $length = rand(12, 35);
            $width = rand(8, 28);
            $height = rand(3, 12);

            if (($combo['material'] ?? null) === 'Кожа' || ($combo['material'] ?? null) === 'Натуральная кожа') {
                $weight += 120;
            }

            return compact('weight', 'length', 'width', 'height');
        }

        $weight = rand(1800, 5200);
        $length = rand(35, 75);
        $width = rand(22, 48);
        $height = rand(18, 35);

        $size = $combo['size'] ?? null;
        if (in_array($size, ['L', '80 л', '45 л'])) {
            $weight += 700;
            $length += 8;
            $width += 5;
            $height += 4;
        } elseif (in_array($size, ['M', '60 л', '30 л'])) {
            $weight += 300;
            $length += 4;
            $width += 2;
        }

        return compact('weight', 'length', 'width', 'height');
    }

    private function makeSku(int $skuCounter, array $combo): string
    {
        $parts = [];

        foreach ($combo as $value) {
            $parts[] = Str::upper(Str::substr(preg_replace('/\s+/u', '', $value), 0, 3));
        }

        return 'SKU' . $skuCounter . '-' . implode('-', $parts);
    }

    private function cartesian(array $arrays): array
    {
        $result = [[]];

        foreach ($arrays as $values) {
            $tmp = [];

            foreach ($result as $resultItem) {
                foreach ($values as $value) {
                    $tmp[] = array_merge($resultItem, [$value]);
                }
            }

            $result = $tmp;
        }

        return $result;
    }
}
