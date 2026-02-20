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
        $formattedImages = $this->images ?? [];

        $formattedAttributes = $this->whenLoaded('attributes', function() {
            return $this->attributes->map(function ($attribute) {
                return [
                    'name' => $attribute->name,
                    'sku_key' => $attribute->sku_key,
                    'options' => $attribute->options->pluck('value')->toArray(),
                ];
            })->toArray();
        });

        $formattedSkus = $this->whenLoaded('skus', function() {
            return $this->skus->map(function ($sku) {
                $attributeMap = [];
                foreach ($sku->options as $option) {
                    $skuKey = $option->attribute->sku_key;
                    $attributeMap[$skuKey] = $option->value;
                }

                return array_merge(
                    [
                        'sku' => $sku->sku,
                        'price' => (int)$sku->price,
                        'stock_qty' => (int)$sku->stock_qty,
                    ],
                    $attributeMap
                );
            })->toArray();
        });


        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'oldPrice' => (int)$this->old_price,
            'currentPrice' => (int)$this->current_price,
            'isHit' => (bool)$this->is_hit,
            'category_slug' => $this->whenLoaded('category', $this->category->slug),
            'attributes' => $formattedAttributes,
            'available_skus' => $formattedSkus,
            'images' => $formattedImages,
        ];
    }
}
