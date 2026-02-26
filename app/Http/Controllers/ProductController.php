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
        $query = Product::with([
            'category',
            'attributes.options',
            'skus.options.attribute'
        ]);

        if ($request->filled('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('description', 'LIKE', "%{$search}%");
            });
        }

        if ($request->filled('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        $perPage = $request->get('per_page', 12);
        $products = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => ProductResource::collection($products),
            'meta' => [
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'per_page' => $products->perPage(),
                'total' => $products->total(),
            ]
        ]);
    }


    public function show(Product $product)
    {
        $product->load([
            'category',
            'attributes.options',
            'skus.options.attribute'
        ]);

        return response()->json([
            'success' => true,
            'data' => new ProductResource($product)
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'current_price' => 'required|integer',
            'old_price' => 'nullable|integer',
            'is_hit' => 'nullable|boolean',
            'category_id' => 'required|exists:categories,id',
            'images' => 'nullable|array',
            'attributes' => 'required|array',
            'available_skus' => 'required|array',
        ]);

        DB::beginTransaction();

        try {
            $product = Product::create($request->only(
                'name', 'description', 'images', 'old_price', 'current_price', 'is_hit', 'category_id'
            ));

            $attributeMap = [];
            foreach ($request->input('attributes') as $attrData) {
                $attribute = ProductAttribute::create([
                    'product_id' => $product->id,
                    'name' => $attrData['name'],
                    'sku_key' => $attrData['sku_key'],
                ]);

                $optMap = [];
                foreach ($attrData['options'] as $value) {
                    $option = ProductAttributeOption::create([
                        'attribute_id' => $attribute->id,
                        'value' => $value,
                    ]);
                    $optMap[$value] = $option->id;
                }

                $attributeMap[$attrData['sku_key']] = $optMap;
            }

            foreach ($request->input('available_skus') as $skuData) {
                $sku = ProductSku::create([
                    'sku' => $skuData['sku'],
                    'product_id' => $product->id,
                    'price' => $skuData['price'],
                    'stock_qty' => $skuData['stock_qty'],
                ]);

                $optionIds = [];
                foreach ($attributeMap as $skuKey => $values) {
                    if (isset($skuData[$skuKey]) && isset($values[$skuData[$skuKey]])) {
                        $optionIds[] = $values[$skuData[$skuKey]];
                    }
                }
                $sku->options()->sync($optionIds);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Продукт успешно создан',
                'data' => new ProductResource($product->load('category', 'attributes.options', 'skus.options')),
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Ошибка при создании продукта',
                'error_details' => $e->getMessage()
            ], 500);
        }
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
