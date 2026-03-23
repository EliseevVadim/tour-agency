<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * @param  \Illuminate\Http\Request  $request
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        $currentSku = null;

        if ($this->relationLoaded('skus') && $this->skus->isNotEmpty()) {
            $inStockSkus = $this->skus->filter(function ($sku) {
                return (int) $sku->stock_qty > 0;
            });

            $currentSku = $inStockSkus->isNotEmpty()
                ? $inStockSkus->sortBy('price')->first()
                : $this->skus->sortBy('price')->first();
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'oldPrice' => (int) $this->old_price,
            'currentPrice' => (int) $currentSku->price,
            'isHit' => (bool) $this->is_hit,
            'category_slug' => $this->whenLoaded('category', $this->category->slug),
            'images' => $this->images ?? [],

            'current_sku' => $currentSku ? $this->transformSku($currentSku) : null,

            'attributes' => $this->whenLoaded('attributes', function () {
                return $this->attributes->map(function ($attr) {
                    return [
                        'name' => $attr->name,
                        'sku_key' => $attr->sku_key,
                        'options' => $attr->options->pluck('value')->toArray(),
                    ];
                });
            }),

            'available_skus' => $this->whenLoaded('skus', function () {
                return $this->skus->map(function ($sku) {
                    return $this->transformSku($sku);
                });
            }),
        ];
    }

    protected function transformSku($sku)
    {
        $attrMap = [];

        foreach ($sku->options as $opt) {
            $attrMap[$opt->attribute->sku_key] = $opt->value;
        }

        return array_merge([
            'sku' => $sku->sku,
            'price' => (int) $sku->price,
            'stock_qty' => (int) $sku->stock_qty,
            'weight' => (int) $sku->weight,
            'length' => (int) $sku->length,
            'width' => (int) $sku->width,
            'height' => (int) $sku->height,
        ], $attrMap);
    }
}
