<template>
    <div class="product-card-shadow" @click="$emit('click', product)">
        <div class="product-card-clip">
            <div class="product-card position-relative">
                <div class="product-image-container">
                    <img :src="primaryImageUrl" :alt="product.name" class="product-img">

                    <div class="product-right-info">
                        <div v-if="!isAdmin" class="product-block-favorites-wrapp wishlist-icon">
                            <input type="checkbox" :checked="isInWishlist"
                                   :id="'favorites-heart-prod-' + product.id"
                                   :name="'favorites-heart-prod-' + product.id"
                                   class="product-block-favorites__checkbox">
                            <label @click.prevent.stop="$emit('toggle-wishlist', product)"
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
                        <div v-if="isAdmin" class="d-flex justify-content-end">
                            <div class="product-block-favorites-wrapp wishlist-icon">
                                <button class="btn btn-action" @click.stop="$emit('product:edit', product.id)">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                         stroke="#ffffff">
                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                           stroke-linejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                  d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z"
                                                  fill="#ffffff"></path>
                                        </g>
                                    </svg>
                                </button>
                            </div>
                            <div class="product-block-favorites-wrapp wishlist-icon">
                                <button class="btn btn-action" @click="$emit('product:delete', product.id)">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                         stroke="#ffffff">
                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                           stroke-linejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <g id="Menu / Close_MD">
                                                <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
                                                      stroke="#ffffff" stroke-width="2" stroke-linecap="round"
                                                      stroke-linejoin="round"></path>
                                            </g>
                                        </g>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div v-if="product.isHit && !isAdmin" class="badge hit-sale">ХИТ ПРОДАЖ</div>
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
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    emits: ['click', 'toggle-wishlist', 'product:edit', 'product:delete'],
    data() {
        return {
            isInWishlist: false
        }
    },
    computed: {
        primaryImageUrl() {
            if (!this.product || !this.product.images || this.product.images.length === 0) {
                return '';
            }

            const primaryImageObj = this.product.images.find(img => img.primary === true);
            return primaryImageObj ? primaryImageObj.image : this.product.images[0].image;
        }
    },
    methods: {
        checkInWishlist() {
            const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);

            this.wishlistIds = stored ? JSON.parse(stored) : [];
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
.product-card-shadow {
    border-radius: 28px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, .4);
    cursor: pointer;
    transition: transform 0.3s;
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
    will-change: transform;
    margin-bottom: 30px;

    &:hover {
        transform: translateY(-5px) translateZ(0);
        -webkit-transform: translateY(-5px) translateZ(0);
    }

    .product-card-clip {
        border-radius: 28px;
        overflow: hidden;
        background: white;
        transform: translateZ(0);
        -webkit-transform: translateZ(0);
    }

    @media (max-width: 767.98px) {
        height: 330px;
    }
}

.products-slider,
.swiper,
.swiper-container,
.swiper-wrapper {
    overflow: visible;
}

.swiper-slide {
    padding: 16px 8px 24px;
}

.product-card {
    position: relative;
    height: 443px;
    background: white;
    border-radius: 28px;
    overflow: hidden;
    box-shadow: none;

    &:after {
        content: "";
        width: 100%;
        height: 5px;
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: #eb2d26;
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
        background: linear-gradient(to bottom, transparent, rgba(17, 17, 17, 1) 100%);

        .price-info span {
            color: white;
        }
    }

    .product-name {
        font-size: 1.25rem;
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
        height: 330px;

        .hit-sale {
            font-size: 12px;
        }

        .old-price {
            font-size: 10px;
        }
        .product-name, .current-price {
            font-size: 12px;
        }

        .product-img {
            object-fit: contain;
            background-color: #F2F2F2;
        }
    }
}
</style>
