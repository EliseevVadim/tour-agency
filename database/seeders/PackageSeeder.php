<?php

namespace Database\Seeders;

use App\Models\Package;
use Illuminate\Database\Seeder;

class PackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        $packages = [
            [
                'id' => 'mini',
                'name' => 'Мини',
                'price_old' => 14500,
                'price_new' => 12000,
                'content_link' => null,
            ],
            [
                'id' => 'opti',
                'name' => 'Опти',
                'price_old' => 14500,
                'price_new' => 12000,
                'content_link' => null,
            ],
            [
                'id' => 'maxi',
                'name' => 'Макси',
                'price_old' => 14500,
                'price_new' => 12000,
                'content_link' => null,
            ],
        ];

        foreach ($packages as $package) {
            Package::query()->updateOrCreate(['id' => $package['id']], $package);
        }
    }
}
