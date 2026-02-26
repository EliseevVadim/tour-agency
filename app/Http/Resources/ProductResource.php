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
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'oldPrice' => (int)$this->old_price,
            'currentPrice' => (int)$this->current_price,
            'isHit' => (bool)$this->is_hit,
            'category_slug' => $this->whenLoaded('category', $this->category->slug),
            'images' => $this->images ?? [],
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
                    $attrMap = [];
                    foreach ($sku->options as $opt) {
                        $attrMap[$opt->attribute->sku_key] = $opt->value;
                    }

                    return array_merge([
                        'sku' => $sku->sku,
                        'price' => (int)$sku->price,
                        'stock_qty' => (int)$sku->stock_qty,
                    ], $attrMap);
                });
            }),
        ];
    }
}
