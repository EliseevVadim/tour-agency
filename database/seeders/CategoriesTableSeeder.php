<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriesTableSeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Одежда',
                'slug' => 'clothing'
            ],
            [
                'name' => 'Аксессуары',
                'slug' => 'accessories'
            ],
            [
                'name' => 'Для путешествий',
                'slug' => 'travelGoods'
            ],
        ];


        foreach ($categories as $category) {
            Category::create($category);
        }
    }
};
