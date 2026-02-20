<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\ProductAttributeOption;
use App\Models\ProductSku;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::with([
            'category',
            'attributes.options',
            'skus.options'
        ])->get();

        return response()->json([
            'success' => true,
            'data' => ProductResource::collection($products)
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'current_price' => 'required|integer',
            'category_id' => 'required|exists:categories,id',
            'attributes' => 'required|array',
            'available_skus' => 'required|array',
        ]);

        try {
            DB::beginTransaction();
            $product = Product::create($request->only([
                'name', 'description', 'old_price', 'current_price', 'is_hit', 'category_id'
            ]));

            $createdAttributeMap = [];

            foreach ($request->input('attributes') as $attrData) {
                $attribute = ProductAttribute::create([
                    'product_id' => $product->id,
                    'name' => $attrData['name'],
                    'sku_key' => $attrData['sku_key'],
                ]);

                $attributeMap = [];
                foreach ($attrData['options'] as $optionValue) {
                    $option = ProductAttributeOption::create([
                        'attribute_id' => $attribute->id,
                        'value' => $optionValue,
                    ]);
                    $attributeMap[$optionValue] = $option->id;
                }
                $createdAttributeMap[$attrData['sku_key']] = $attributeMap;
            }

            $pivotData = [];
            foreach ($request->input('available_skus') as $skuItem) {
                ProductSku::create([
                    'sku' => $skuItem['sku'],
                    'product_id' => $product->id,
                    'price' => $skuItem['price'],
                    'stock_qty' => $skuItem['stock_qty'],
                ]);

                foreach ($createdAttributeMap as $skuKey => $attributeOptionsMap) {
                    if (isset($skuItem[$skuKey])) {
                        $currentOptionValue = $skuItem[$skuKey];
                        $optionId = $attributeOptionsMap[$currentOptionValue] ?? null;

                        if ($optionId) {
                            $pivotData[] = ['sku' => $skuItem['sku'], 'option_id' => $optionId];
                        }
                    }
                }
            }

            if (!empty($pivotData)) {
                DB::table('sku_option_pivot')->insert($pivotData);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Продукт успешно создан.',
                'data' => new ProductResource($product->load(['category', 'attributes.options', 'skus.options']))
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Ошибка при создании продукта.',
                'error_details' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Product $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Product $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Product $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        //
    }
}
