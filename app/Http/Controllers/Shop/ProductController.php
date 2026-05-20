<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Services\ProductCreator;
use App\Services\ProductUpdater;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with([
            'category',
            'attributes.options',
            'skus.options.attribute'
        ]);//->whereHas('skus.options.attribute');

        if ($request->filled('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%");
            });
        }

        if ($request->filled('category')) {
            if ($request->category !== 'all'){
                $query->whereHas('category', function ($q) use ($request) {
                    $q->where('slug', $request->category);
                });

            }
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

    public function indexAdmin(Request $request)
    {
        $query = Product::with([
            'category',
            'attributes.options',
            'skus.options.attribute'
        ]);

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

    public function store(StoreProductRequest $request, ProductCreator $creator)
    {
        $product = $creator->create($request->validatedPayload());

        return response()->json([
            'success' => true,
            'message' => 'Продукт успешно создан',
            'data' => new ProductResource($product),
        ], 201);
    }

    public function update(UpdateProductRequest $request, Product $product, ProductUpdater $updater)
    {
        try {
            $updated = $updater->update($product, $request->validatedPayload());

            return response()->json([
                'success' => true,
                'message' => 'Товар успешно обновлён',
                'data' => new ProductResource($updated),
            ]);
        } catch (\RuntimeException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 422);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ошибка при обновлении',
                'error_details' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Product $product
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Product $product)
    {
        try {
            foreach ($product->images ?? [] as $img) {
                if (!isset($img['image'])) {
                    continue;
                }

                if (!str_starts_with($img['image'], '/storage/')) {
                    continue;
                }

                $path = str_replace('/storage/', '', $img['image']);
                if (Storage::disk('public')->exists($path)) {
                    Storage::disk('public')->delete($path);
                }
            }

            $product->delete();

            return response()->json([
                'success' => true,
                'message' => 'Товар успешно удалён'
            ]);

        } catch (\Throwable $e) {

            return response()->json([
                'success' => false,
                'message' => 'Ошибка при удалении товара'
            ], 500);
        }
    }

    public function getRelatedProducts(Product $product, Request $request)
    {
        $limit = (int) $request->get('limit', 12);

        $products = Product::query()
            ->where('id', '!=', $product->id)
            ->where('category_id', $product->category_id)
            ->whereHas('skus.options.attribute')
            ->with(['category', 'attributes.options', 'skus.options.attribute'])
            ->inRandomOrder()
            ->limit($limit)
            ->get();

        return response()->json([
            'success' => true,
            'data' => ProductResource::collection($products),
        ]);
    }
}
