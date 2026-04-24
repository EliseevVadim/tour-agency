<template>
    <div v-if="isVisible" class="modal-backdrop">
        <notification-modal v-if="product"
                            :is-visible="isNotificationVisible"
                            :product="product"
                            :current-sku="currentSKU"
                            @close="isNotificationVisible = false"
        />

        <div class="modal-content">
            <div class="product-header container d-flex gap-2">
                <svg class="icon-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg" style="width: 22px;">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                <h2 @click="closeModal" class="fw-bold cursor-pointer">Назад</h2>
            </div>

            <div class="loader" v-if="isProductLoading">
                <div class="loader__dot"></div>
                <div class="loader__dot"></div>
                <div class="loader__dot"></div>
            </div>

            <div v-if="!isProductLoading && product" class="product-card container">
                <div class="product-content">
                    <div class="d-flex flex-column gallery-wrapper justify-content-between">
                        <div class="gallery">
                            <div class="image-list">
                                <swiper class="vertical-swiper" :options="swiperOptions"
                                        @ready="onSwiperReady">
                                    <swiper-slide v-for="(image, idx) in sortedImages" :key="'thumbnail-' + idx">
                                        <div class="slide image-wrapper position-relative"
                                             @click="goToSpecificSlide(idx)">
                                            <img :src="image.image" :alt="'Вид-' + idx"/>
                                        </div>
                                    </swiper-slide>
                                </swiper>
                            </div>
                            <div class="main-image position-relative">
                                <div class="img-wrapper h-100">
                                    <img :src="sortedImages[vSwiperIndex]?.image" alt="Основное изображение">
                                </div>
                            </div>
                        </div>
                        <div v-if="false" class="size-chart-link">
                            <a href="#">Таблица размеров</a>
                        </div>
                    </div>

                    <div class="product-details">
                        <h2>{{ product.name }}</h2>
                        <p class="description">
                            {{ product.description }}
                        </p>

                        <div v-if="product?.available_skus?.length > 0" class="options">
                            <div v-for="(attr, index) in product.attributes" :key="attr.name" class="form-group">
                                <label :for="'select-' + attr.name">{{ attr.name }}:</label>
                                <div class="select-wrapper position-relative">
                                    <select :id="'select-' + attr.name" class="custom-select"
                                            v-model="selectedAttributes[attr.name]"
                                            @change="handleAttributeChange(attr.name, selectedAttributes[attr.name])"
                                            :disabled="!isVariantSelectionPossible">

                                        <option v-for="option in (activeAttributeOptions[attr.name] || attr.options)"
                                                :key="option" :value="option">
                                            {{ option }}
                                        </option>
                                    </select>
                                    <div class="select-icon position-absolute"></div>
                                </div>
                            </div>
                        </div>

                        <div class="price-actions">
                            <h2 class="mb-2">
                                {{ finalPrice }} руб.
                            </h2>
                            <div class="btn-actions d-flex gap-4 align-items-center">
                                <button @click="addToCart" class="btn btn-cta h-100"
                                        :class="{'out-of-stock': !isInStock}">
                                    {{ isInStock ? 'в корзину' : 'сообщить о наличии' }}
                                </button>
                                <div class="product-block-favorites-wrapp wishlist-icon">
                                    <input type="checkbox" :checked="isInWishlist"
                                           :id="'heart-prod-' + product.id"
                                           :name="'heart-prod-' + product.id"
                                           class="product-block-favorites__checkbox">
                                    <label @click.prevent="$emit('toggle-wishlist', product)"
                                           :for="'heart-prod-' + product.id" class="product-block-favorites__label">
                                        <svg width="30" height="25" viewBox="0 0 20 17"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <defs>
                                                <linearGradient id="favoriteGradient" x1="0%" y1="0%" x2="100%"
                                                                y2="0%">
                                                    <stop offset="0%" style="stop-color:#dd0024;stop-opacity:1"/>
                                                    <stop offset="100%" style="stop-color:#fb6228;stop-opacity:1"/>
                                                </linearGradient>
                                            </defs>
                                            <path fill="none"
                                                  d="M16.019 1.519C13.832 0.483 11.911 2.068 10.698 3.475 10.2 4.054 9.229 3.99 8.774 3.376 7.629 1.835 5.627 0.117 3.163 1.519 -0.385 3.538 1.163 7.519 2.663 9.519 4.398 11.833 7.65 14.466 9.024 15.532 9.395 15.821 9.914 15.8 10.274 15.498 11.806 14.215 14.425 12.104 16.163 10.019 18.955 6.668 19.519 3.176 16.019 1.519Z"
                                                  stroke="black" stroke-width="2"/>
                                        </svg>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="another-products container">
                <h2 class="fw-bold">Другие предложения</h2>
                <div v-if="otherProducts.length" class="another-products-slider">
                    <ssr-carousel :slides-per-page='1' paginate-by-slide show-arrows :responsive='carouselResponsive'>
                        <template #back-arrow='{ disabled }'>
                            <span class="carousel-left-icon reviews-carousel-left-icon"
                                  :class="{'disabled': disabled}"></span>
                        </template>
                        <template #next-arrow='{ disabled }'>
                            <div class="next-button-container">
                                <span class="carousel-right-icon reviews-carousel-right-icon"
                                      :class="{'disabled': disabled}">
                                </span>
                            </div>
                        </template>
                        <ProductCard
                            v-for="otherProduct in otherProducts"
                            :key="otherProduct.id"
                            :product="otherProduct"
                            @click="$emit('change-detail-product', otherProduct)"
                        />
                    </ssr-carousel>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProductCard from "./ProductCard.vue";
import eventBus from "../../../../event-bus";
import NotificationModal from "../../../modules/shop/components/NotificationModal.vue";

const WISHLIST_STORAGE_KEY = "merchWishlistIds";
const SHOPPING_CART_KEY = "shoppingCart";

export default {
    name: "ProductDetailModal",
    components: {NotificationModal, ProductCard},
    props: {
        isVisible: {type: Boolean, required: true},
        tempProduct: {type: Object, default: null},
    },
    emits: ["close", "toggle-wishlist", "change-detail-product"],
    data() {
        return {
            vSwiperRef: null,
            vSwiperIndex: 0,

            isInWishlist: false,
            isNotificationVisible: false,

            selectedAttributes: {},
            activeAttributeOptions: {},

            carouselResponsive: [{
                minWidth: 270,
                slidesPerPage: 2,
                center: true,
                peek: 0,
                gutter: 20,
                showDots: false
            }, {minWidth: 768, slidesPerPage: 3,}, {minWidth: 1024, slidesPerPage: 4,}],
            otherProducts: [],

            product: {},
            isProductLoading: false,

            screenWidth: window.innerWidth
        };
    },

    computed: {
        swiperOptions() {
            const isMobile = this.screenWidth < 768

            return {
                direction: isMobile ? "horizontal" : "vertical",
                slidesPerView: isMobile ? 4 : 'auto',
                mousewheel: !isMobile,
                spaceBetween: 12,
                loop: false
            }
        },

        sortedImages() {
            const images = this.product?.images || [];
            if (!images.length) return [];

            const primary = images.find((i) => i.primary === true);
            const rest = images.filter((i) => i.primary !== true);
            return primary ? [primary, ...rest] : rest;
        },

        isVariantSelectionPossible() {
            return !!this.product?.attributes?.length;
        },

        availableSkus() {
            return this.product?.available_skus || [];
        },

        currentSKU() {
            if (!this.product) return null;
            if (!this.isVariantSelectionPossible) {
                return this.availableSkus.find((s) => s.stock_qty > 0) || this.availableSkus[0] || null;
            }

            const attrs = this.product.attributes;
            const allSelected = attrs.every((a) => this.selectedAttributes[a.name] != null);
            if (!allSelected) return null;

            return (
                this.availableSkus.find((sku) =>
                    attrs.every((a) => sku[a.sku_key] === this.selectedAttributes[a.name])
                ) || null
            );
        },

        isInStock() {
            return !!this.currentSKU && (this.currentSKU.stock_qty || 0) > 0;
        },

        finalPrice() {
            const price =
                this.currentSKU?.price ??
                this.product?.currentPrice ??
                null;

            return price != null ? Number(price).toLocaleString() : "Цену уточняйте";
        },
    },

    methods: {
        async loadRelatedProducts() {
            if (!this.product?.id) {
                this.otherProducts = [];
                return;
            }

            const {data} = await axios.get(`/api/products/${this.product.id}/related`, {
                params: {limit: 12}
            });

            this.otherProducts = data?.data || [];
        },

        onSwiperReady(swiper) {
            this.vSwiperRef = swiper;
            this.vSwiperIndex = swiper.activeIndex;
        },
        goToSpecificSlide(targetIndex) {
            if (!this.vSwiperRef) return;
            this.vSwiperRef.slideTo(targetIndex);
            this.vSwiperIndex = targetIndex;
        },

        closeModal() {
            this.$emit("close");
        },

        checkInWishlist() {
            const id = this.product?.id;
            if (!id) return (this.isInWishlist = false);

            const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
            const ids = stored ? JSON.parse(stored) : [];
            this.isInWishlist = ids.includes(id);
        },

        skuMatchesSelections(sku, selections) {
            const attrs = this.product?.attributes || [];
            return attrs.every((a) => {
                const selected = selections[a.name];
                return selected == null || sku[a.sku_key] === selected;
            });
        },

        getMatchingSkus(selections) {
            return this.availableSkus.filter((sku) => this.skuMatchesSelections(sku, selections));
        },

        recalcActiveOptions() {
            if (!this.product?.attributes?.length) {
                this.activeAttributeOptions = {};
                return;
            }

            const attrs = this.product.attributes;
            const selections = this.selectedAttributes;
            const active = {};

            attrs.forEach((attr) => {
                const tmpSelections = {...selections};
                tmpSelections[attr.name] = null;

                const matching = this.getMatchingSkus(tmpSelections);
                const set = new Set();

                matching.forEach((sku) => {
                    if (sku[attr.sku_key] != null) set.add(sku[attr.sku_key]);
                });

                active[attr.name] = Array.from(set).sort();
            });

            this.activeAttributeOptions = active;
        },

        autoFixSelections() {
            if (!this.product?.attributes?.length) return;

            let changed = false;

            this.product.attributes.forEach((attr, index) => {
                const name = attr.name;
                const allowed = this.activeAttributeOptions[name] || [];
                const current = this.selectedAttributes[name];

                if (current != null && !allowed.includes(current)) {
                    this.$set(this.selectedAttributes, name, allowed[0] ?? null);
                    changed = true;
                    return;
                }

                if (current == null && allowed.length) {
                    this.$set(this.selectedAttributes, name, allowed[0]);
                    changed = true;
                }
            });

            if (changed) this.recalcActiveOptions();
        },

        initializeVariantSelection(product) {
            const initial = {};

            (product.attributes || []).forEach((attr) => {
                initial[attr.name] = product.current_sku?.[attr.sku_key] ?? null;
            });

            this.selectedAttributes = initial;

            this.recalcActiveOptions();
            this.autoFixSelections();
        },

        handleAttributeChange(attrName, value) {
            this.$set(this.selectedAttributes, attrName, value);
            this.recalcActiveOptions();
            this.autoFixSelections();
        },

        getCartFromStorage() {
            const cartData = localStorage.getItem(SHOPPING_CART_KEY);
            return cartData ? JSON.parse(cartData) : [];
        },

        saveCartToStorage(cart) {
            localStorage.setItem(SHOPPING_CART_KEY, JSON.stringify(cart));
        },

        addToCart() {
            if (!this.currentSKU || (this.currentSKU.stock_qty || 0) <= 0) {
                this.isNotificationVisible = true;
                return;
            }

            const cart = this.getCartFromStorage();
            const productId = this.product.id;
            const sku = this.currentSKU.sku;
            const requestedQuantity = this.quantity || 1;
            const availableStock = this.currentSKU.stock_qty;

            const idx = cart.findIndex((i) => i.productId === productId && i.sku === sku);

            if (idx !== -1) {
                const currentQty = cart[idx].quantity;
                const nextQty = Math.min(currentQty + requestedQuantity, availableStock);

                if (nextQty === currentQty) {
                    this.$notify({
                        group: 'notification',
                        type: 'warn',
                        duration: 4000,
                        title: 'Лимит достигнут',
                        text: 'Это максимально возможное количество товара на складе'
                    });
                    return;
                }

                cart[idx].quantity = nextQty;
            } else {
                cart.push({
                    productId,
                    sku,
                    name: this.product.name,
                    images: this.sortedImages,
                    current_sku: this.currentSKU,
                    quantity: Math.min(requestedQuantity, availableStock),
                    attributes: this.product.attributes,
                    available_skus: this.availableSkus,
                });
            }

            this.saveCartToStorage(cart);
            eventBus.$emit("cart:updated");
            this.isNotificationVisible = false;
        },

        updateScreenWidth() {
            this.screenWidth = window.innerWidth
        }
    },

    watch: {
        tempProduct: {
            immediate: true,
            async handler(p) {
                if (!p) return;

                this.isProductLoading = true;
                this.product = null;
                this.vSwiperIndex = 0;

                try {
                    const {data} = await axios.get(`/api/products/${p.id}`);
                    this.product = data.data;

                    this.initializeVariantSelection(this.product);
                    this.checkInWishlist();
                    await this.loadRelatedProducts();
                } finally {
                    this.isProductLoading = false;
                }
            },
        },
    },

    mounted() {
        eventBus.$on("update-favorites", this.checkInWishlist);
        window.addEventListener('resize', this.updateScreenWidth);
    },
};
</script>/


<style scoped lang="scss">

.modal-backdrop {
    position: fixed;
    overflow-y: auto;
    background: white;
    height: 100%;
}

.modal-content {
    background: white;
    min-height: 100vh;
}

.product-header {
    margin-top: 50px;
    margin-bottom: 65px;
}

.product-card {
    margin: 0 auto;
}

.product-content {
    display: flex;
    gap: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    background-color: #ffffff;
    padding: 30px 30px 45px 15px;
}

.gallery {
    display: flex;
    gap: 20px;
    flex-basis: 60%;
    max-height: 530px;
}

.image-list {
    width: 115px;
}

.image-wrapper {
    object-fit: cover;
    position: relative;
    cursor: pointer;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &::after {
        content: "";
        height: 4px;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: #EB2D26FF;
    }

    @media (min-width: 768px) {
        //height: 125px;
    }
}

.main-image {
    flex: 1;
    overflow: hidden;
    width: 100%;

    img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
    }

    .img-wrapper::after {
        content: "";
        height: 4px;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: #EB2D26FF;
    }
}

.product-details {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-basis: 70%;

    .description {
        font-size: 1.4rem;
        line-height: 1;
        margin-bottom: 20px;
        margin-top: 20px;
        font-weight: 500;
    }
}

.form-group {
    margin-bottom: 15px;

    label {
        font-size: 1.4rem;
        font-weight: 500;
        margin-bottom: 5px;
    }
}

.select-wrapper {
    .custom-select {
        width: 263px;
        max-width: 263px;
        padding: 15px 25px 10px 20px;
        font-size: 1.4rem;
        font-weight: 600;
        border: 3px solid #ff4040;
        border-radius: 10px;
        appearance: none;
        cursor: pointer;
        outline: none;

        -webkit-tap-highlight-color: transparent;
        -webkit-appearance: none;
        appearance: none;
        color: #000;
    }

    .select-icon {
        right: 10px;
        top: 15%;
        transform: translateY(50%);
    }
}

.price-actions {
    .btn-actions {
        .btn-cta {
            flex-grow: 1;
            font-size: 1.5rem;

            &.out-of-stock {
                box-shadow: none;
                background: #969696;
                font-weight: 500;
                cursor: pointer;
            }
        }
    }
}

.wishlist-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
    transition: background-color 0.2s;

    .heart-icon {
        stroke: #000000;
    }
}

.size-chart-link {
    a {
        font-size: 1.4rem;
        font-weight: 500;
        color: black;
        text-underline-offset: 4px;
    }
}

.another-products {
    padding-top: 115px;
    margin-bottom: 50px;

    h2 {
        padding-bottom: 35px;
    }
}

@media (max-width: 767.98px) {
    .product-header {
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .product-content {
        flex-wrap: wrap;

        .gallery {
            flex-flow: column-reverse;

            .image-list {
                flex-direction: row;
                width: 100%;
            }
        }
    }

    .size-chart-link {
        margin-top: 15px;
    }

    .another-products {
        padding-top: 50px;
    }

    .product-details {
        flex-basis: auto;
    }

    .price-actions {
        h2 {
            padding-top: 10px;
            padding-bottom: 10px;
        }

        .btn-actions .btn-cta.out-of-stock {
            font-size: 16px;
        }
    }
}

.select-wrapper .custom-select {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%23eb2d26%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M1.646%204.646a.5.5%200%200%201%20.708%200L8%2010.293l5.646-5.647a.5.5%200%200%201%20.708.708l-6%206a.5.5%200%200%201-.708%200l-6-6a.5.5%200%200%201%200-.708%22%2F%3E%3C%2Fsvg%3E");
    background-repeat: no-repeat;
    background-position-x: 96%;
    background-position-y: 56%;
}

@media (max-width: 767.98px) {
    .gallery-wrapper {
        width: 100%;
    }

    .product-content {
        padding: 10px;
    }

    .gallery {
        flex-direction: column;
        max-height: none;
        gap: 12px;
    }

    .image-list {
        width: 100%;
        order: 1;
    }

    .main-image {
        order: 1;
        width: 100%;
        height: auto;
    }

    .gallery .swiper-container {
        height: auto;
    }

    .gallery .swiper-wrapper {
        flex-direction: row !important;
    }

    .gallery .swiper-slide {
        width: 80px !important;
        height: 80px;
        flex-shrink: 0;
    }

    .image-wrapper {
        height: 80px;
    }

    .main-image {
        height: 380px;
    }

    .main-image img {
        object-fit: cover;
    }

    .image-list .swiper-wrapper {
        scroll-snap-type: x mandatory;
    }

    .options {
        .custom-select {
            font-size: 16px;
        }
    }
}


</style>

<style lang="scss">
.gallery .image-list {
    overflow: hidden;
}

.gallery .swiper-container {
    height: 100%;
}

.gallery .swiper-slide {
    max-height: fit-content;
}
</style>
