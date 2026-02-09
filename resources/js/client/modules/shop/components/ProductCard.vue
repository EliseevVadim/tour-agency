<template>
    <div class="product-card position-relative" @click="$emit('click', product)">
        <div class="product-image-container">
            <img :src="product.imageUrl" :alt="product.name" class="product-img">

            <div class="product-right-info">
                <div class="product-block-favorites-wrapp wishlist-icon">
                    <input type="checkbox" :checked="isInWishlist"
                           :id="'favorites-heart-prod-' + product.id"
                           :name="'favorites-heart-prod-' + product.id"
                           class="product-block-favorites__checkbox">
                    <label @click.prevent.stop="$emit('toggle-wishlist', {
                        id: product.id,
                          name: product.name,
                           price: product.currentPrice,
                            imageUrl: product.imageUrl,
                            parameters: product.parameters,
                            maxCount: product.maxCount
                    })"
                           :for="'favorites-heart-prod-' + product.id" class="product-block-favorites__label">
                        <svg width="30" height="25" viewBox="0 0 20 17" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="favoriteGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" style="stop-color:#dd0024;stop-opacity:1"/>
                                    <stop offset="100%" style="stop-color:#fb6228;stop-opacity:1"/>
                                </linearGradient>
                            </defs>

                            <path fill="none"
                                d="M16.019 1.519C13.832 0.483 11.911 2.068 10.698 3.475 10.2 4.054 9.229 3.99 8.774 3.376 7.629 1.835 5.627 0.117 3.163 1.519 -0.385 3.538 1.163 7.519 2.663 9.519 4.398 11.833 7.65 14.466 9.024 15.532 9.395 15.821 9.914 15.8 10.274 15.498 11.806 14.215 14.425 12.104 16.163 10.019 18.955 6.668 19.519 3.176 16.019 1.519Z"
                                stroke="white" stroke-width="2"/>
                        </svg>
                    </label>
                </div>
                <div v-if="product.isHit" class="badge hit-sale">ХИТ ПРОДАЖ</div>
            </div>
        </div>

        <div class="product-info position-absolute">
            <h3 class="product-name">{{ product.name }}</h3>
            <div class="price-info">
                <span class="old-price">{{ product.oldPrice }} руб.</span>
                <span class="current-price">{{ product.currentPrice }} руб.</span>
            </div>
        </div>
    </div>
</template>

<script>
import eventBus from "../../../../event-bus";

const WISHLIST_STORAGE_KEY = 'merchWishlistIds';

export default {
    name: 'ProductCard',
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    emits: ['toggle-wishlist'],
    data() {
        return {
            isInWishlist: false
        }
    },
    methods: {
        checkInWishlist() {
            const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
            this.wishlistIds = stored ? JSON.parse(stored) : null;

            this.isInWishlist = this.wishlistIds.includes(this.product.id);
        }
    },
    mounted() {
        eventBus.$on('update-favorites', this.checkInWishlist);
        this.checkInWishlist();
    },
    beforeUnmount() {
        eventBus.$off('update-favorites');
    }
}
</script>

<style scoped lang="scss">
.product-card {
    position: relative;
    height: 443px;
    background: white;
    border-radius: 28px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    transition: transform 0.3s;

    &:after {
        content: "";
        width: 100%;
        height: 5px;
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: #eb2d26;
    }

    &:hover {
        transform: translateY(-5px);
    }

    .product-image-container {
        position: relative;
        height: 100%;
    }

    .product-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .product-right-info {
        position: absolute;
        top: 0;
        right: 0;

        .product-block-favorites-wrapp {
            padding-right: 18px;
            padding-top: 15px;
            padding-bottom: 15px;
            text-align: end;
        }
    }

    .badge {
        background-image: linear-gradient(to right, #dd0024, #fb6228);
        color: white;
        padding: 10px 20px;
        border-radius: 20px 0 0 20px;
        font-size: 1rem;
        font-weight: 800;
    }

    .product-info {
        padding: 15px;
        padding-top: 30px;
        bottom: 0;
        width: 100%;
        color: white;
        background: linear-gradient(to bottom, transparent, rgba(17, 17, 17, 1) 49%);

        .price-info span {
            color: white;
        }
    }

    .product-name {
        font-size: 1.5rem;
        font-weight: 600;
    }

    .old-price {
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.5px;
        text-decoration: line-through;
        margin-right: 10px;
    }

    .current-price {
        font-size: 1.1rem;
        font-weight: bold;
    }

    @media (max-width: 767.98px) {
        .hit-sale {
            font-size: 12px;
        }

        .old-price {
            font-size: 10px;
        }
        .product-name, .current-price {
            font-size: 16px;
        }
    }
}
</style>
