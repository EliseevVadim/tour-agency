<?php

namespace App\Http\Controllers;

use App\Models\ProductSku;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function validateCart(Request $request)
    {
        $items = collect($request->input('items', []));

        if ($items->isEmpty()) {
            return response()->json(['items' => []]);
        }

        $skus = $items->pluck('sku')->unique();

        $skuModels = ProductSku::query()
            ->whereIn('sku', $skus)
            ->with([
                'product',
                'product.attributes',
                'product.attributes.options',
                'product.skus.options'
            ])
            ->get()
            ->keyBy('sku');

        $result = $items->map(function ($item) use ($skuModels) {
            $skuModel = $skuModels->get($item['sku']);

            if (!$skuModel) {
                return [
                    'sku' => $item['sku'],
                    'exists' => false
                ];
            }

            return [
                'sku' => $skuModel->sku,
                'exists' => true,
                'name' => $skuModel->product->name,
                'images' => $skuModel->product->images ?? [],
                'attributes' => $skuModel->product->attributes ?? [],
                'price' => $skuModel->price,
                'stock_qty' => $skuModel->stock_qty,
                'current_sku' => [
                    'price' => $skuModel->price,
                    'stock_qty' => $skuModel->stock_qty
                ]
            ];
        });

        return response()->json([
            'items' => $result->values()
        ]);
    }
}
