<template>
    <div v-if="isVisible" class="modal-backdrop">
        <notification-modal
            :is-visible="isNotificationVisible"
            @close="isNotificationVisible = false"
        ></notification-modal>

        <div class="modal-content">
            <div class="product-header container">
                <h2 @click="closeModal" class="fw-bold cursor-pointer">Назад</h2>
            </div>
            <div v-if="product" class="product-card container">
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
                            <div v-if="false" class="image-list">
                                <div v-for="(image, idx) in sortedImages"
                                     class="image-wrapper position-relative">
                                    <img :src="image.image" :alt="'Вид-' + idx" :key="'thumbnail-' + idx"/>
                                </div>
                            </div>
                            <div class="main-image position-relative">
                                <div class="img-wrapper h-100">
                                    <img :src="product.images[vSwiperIndex]?.image" alt="Основное изображение">
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

                        <div v-if="product.available_skus.length > 0" class="options">
                            <div v-for="(attr, index) in product.attributes" :key="attr.name" class="form-group">
                                <label :for="'select-' + attr.name">{{ attr.name }}:</label>
                                <div class="select-wrapper position-relative">
                                    <select :id="'select-' + attr.name" class="custom-select"
                                            v-model="selectedAttributes[attr.name]"
                                            @change="handleAttributeChange(attr.name, selectedAttributes[attr.name])"
                                            :disabled="!isVariantSelectionPossible">

                                        <option v-for="option in attr.options" :key="option" :value="option">
                                            {{ option }}
                                        </option>
                                    </select>
                                    <div class="select-icon position-absolute"></div>
                                </div>
                            </div>
                        </div>

                        <div class="price-actions">
                            <h2 v-if="currentSKU" class="mb-2">{{ finalPrice }} руб.</h2>
                            <div class="btn-actions d-flex gap-4 align-items-center">
                                <button @click="addToCart" class="btn btn-cta"
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
                <div class="another-products-slider">
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

const MOCK_PRODUCTS_DB = [{
    id: 2,
    name: "Чемодан",
    description: "Наш самый популярный чемодан. Цена зависит от размера и цвета.",
    oldPrice: 5500,
    currentPrice: 3650,
    isHit: true,
    category_slug: "clothing",
    images: [
        {primary: true, image: "/img/merch/test.png"},
        {primary: false, image: "/img/merch/test.png"},
        {primary: false, image: "/img/merch/test.png"},
        {primary: false, image: "/img/merch/test.png"},
        {primary: false, image: "/img/merch/test.png"},
    ],
    attributes: [
        {name: "Размер", sku_key: "size", options: ["Маленький", "Средний", "Большой"]},
        {name: "Цвет", sku_key: "color", options: ["Синий", "Зеленый", "Красный"]}
    ],
    available_skus: [
        {"sku": "102-S-BLU", "size": "Маленький", "color": "Синий", "price": 100, stock_qty: 2},
        {"sku": "102-S-GRN", "size": "Маленький", "color": "Зеленый", "price": 100, stock_qty: 3},
        {"sku": "102-M-GRN", "size": "Средний", "color": "Зеленый", "price": 120, stock_qty: 0},
        {"sku": "102-L-BLU", "size": "Большой", "color": "Синий", "price": 150, stock_qty: 0},
    ]
},
    {
        id: 3,
        name: "Чемодан 3",
        description: "Наш самый популярный чемодан. Цена зависит от размера и цвета.",
        oldPrice: 10500,
        currentPrice: 7650,
        isHit: true,
        category_slug: "clothing",
        images: [
            {primary: true, image: "/img/merch/test.png"},
            {primary: false, image: "/img/merch/test.png"},
            {primary: false, image: "/img/merch/test.png"},
            {primary: false, image: "/img/merch/test.png"},
            {primary: false, image: "/img/merch/test.png"},
        ],
        attributes: [
            {name: "Размер", sku_key: "size", options: ["Маленький", "Средний", "Большой"]},
            {name: "Цвет", sku_key: "color", options: ["Синий", "Зеленый", "Красный"]}
        ],
        available_skus: []
    },
    {
        id: 4,
        name: "Чемодан 4",
        description: "Наш самый популярный чемодан. Цена зависит от размера и цвета.",
        oldPrice: 8500,
        currentPrice: 4450,
        isHit: true,
        category_slug: "clothing",
        images: [
            {primary: true, image: "/img/merch/test.png"},
            {primary: false, image: "/img/merch/test.png"},
            {primary: false, image: "/img/merch/test.png"},
            {primary: false, image: "/img/merch/test.png"},
            {primary: false, image: "/img/merch/test.png"},
        ],
        attributes: [
            {name: "Размер", sku_key: "size", options: ["Маленький", "Средний", "Большой"]},
        ],
        available_skus: [
            {"sku": "104-S", "size": "Маленький", "price": 100, stock_qty: 2},
            {"sku": "104-M", "size": "Средний", "price": 120, stock_qty: 0},
        ]
    },
    {
        id: 5,
        name: "Чемодан 5",
        description: "Наш самый популярный чемодан. Цена зависит от размера и цвета.",
        oldPrice: 4500,
        currentPrice: 3350,
        isHit: true,
        category_slug: "clothing",
        images: [
            {primary: true, image: "/img/merch/test.png"},
            {primary: false, image: "/img/merch/test.png"},
            {primary: false, image: "/img/merch/test.png"},
            {primary: false, image: "/img/merch/test.png"},
            {primary: false, image: "/img/merch/test.png"},
        ],
        attributes: [
            {name: "Размер", sku_key: "size", options: ["Маленький", "Средний", "Большой"]},
            {name: "Цвет", sku_key: "color", options: ["Синий", "Зеленый", "Красный"]},
            {name: "Материал", sku_key: "material", options: ["Металл", "Пластик"]}
        ],
        available_skus: [
            {
                sku: "104-S-BLUE-PLASTIC",
                size: "Маленький",
                color: "Синий",
                material: "Пластик",
                price: 1000,
                stock_qty: 2
            },
            {
                sku: "104-S-BLUE-METAL",
                size: "Маленький",
                color: "Синий",
                material: "Металл",
                price: 2000,
                stock_qty: 0
            },
            {
                sku: "104-S-RED-PLASTIC",
                size: "Маленький",
                color: "Красный",
                material: "Пластик",
                price: 2000,
                stock_qty: 0
            },
        ]
    }];
const WISHLIST_STORAGE_KEY = 'merchWishlistIds';
const SHOPPING_CART_KEY = 'shoppingCart';

export default {
    name: "ProductDetailModal",
    components: {NotificationModal, ProductCard},
    props: {
        isVisible: {type: Boolean, required: true},
        product: {type: Object, default: null}
    },
    emits: ['close', 'toggle-wishlist', 'change-detail-product'],
    data() {
        return {
            vSwiperRef: null,
            vSwiperIndex: 0,
            carouselResponsive: [{
                minWidth: 270,
                slidesPerPage: 1,
                center: true,
                peek: 0,
                gutter: 20,
                showDots: false
            },
                {
                    minWidth: 768,
                    slidesPerPage: 2,
                },
                {
                    minWidth: 1024,
                    slidesPerPage: 3,
                }],
            otherProducts: MOCK_PRODUCTS_DB,
            isInWishlist: false,
            isNotificationVisible: false,

            selectedAttributes: {},
            currentSKU: null,
            activeAttributeOptions: {},
        };
    },
    computed: {
        swiperOptions() {
            return {
                direction: 'vertical',
                slidesPerView: 4,
                mousewheel: true,
                spaceBetween: 12,
                loop: false
            };
        },
        isInStock() {
            if (!this.product?.available_skus?.length) {
                return false;
            }
            return !!this.currentSKU && this.currentSKU.stock_qty > 0;
        },
        finalPrice() {
            return this.currentSKU ? this.currentSKU.price.toLocaleString() : (this.product?.currentPrice ? this.product.currentPrice.toLocaleString() : 'Цену уточняйте');
        },
        isVariantSelectionPossible() {
            return this.product && this.product.attributes && this.product.attributes.length > 0;
        },
        sortedImages() {
            if (!this.product?.images?.length) return '';
            const images = this.product.images;
            const primaryImageObj = images.find(img => img.primary === true);
            const secondaryImages = images.filter(img => img.primary !== true);
            const sortedImages = [];
            if (primaryImageObj) {
                sortedImages.push(primaryImageObj);
            }
            sortedImages.push(...secondaryImages);
            return sortedImages;
        },
    },
    methods: {
        onSwiperReady(swiper) {
            this.vSwiperRef = swiper;
            this.vSwiperIndex = swiper.activeIndex;
        },
        goToSpecificSlide(targetIndex) {
            if (this.vSwiperRef) {
                this.vSwiperRef.slideTo(targetIndex);
                this.vSwiperIndex = targetIndex;
            }
        },

        closeModal() {
            this.$emit('close')
        },

        checkInWishlist() {
            if (!this.product?.id) {
                this.isInWishlist = false;
                return;
            }
            const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
            const wishlistIds = stored ? JSON.parse(stored) : [];
            this.isInWishlist = wishlistIds.includes(this.product.id)
        },



        initializeVariantSelection(product) {
            if (!this.isVariantSelectionPossible) {
                const foundSKU = product.available_skus.find(sku => sku.stock_qty > 0) || product.available_skus[0];
                this.currentSKU = foundSKU ? {
                    price: foundSKU.price || product.currentPrice,
                    stock_qty: foundSKU.stock_qty,
                    sku: foundSKU.sku
                } : {price: product.currentPrice, stock_qty: 0, sku: null};
                this.selectedAttributes = {};
                this.activeAttributeOptions = {};
                return;
            }

            const availableSkus = product.available_skus;
            const initialSelection = {};

            product.attributes.forEach(attr => {
                const attrName = attr.name;
                const skuKey = attr.sku_key;
                let initialValue = null;

                if (product.current_sku) {
                    initialValue = product.current_sku[skuKey] || product.current_sku[attrName];
                }

                if (initialValue && attr.options.includes(initialValue)) {
                    this.$set(initialSelection, attrName, initialValue);
                } else {
                    this.$set(initialSelection, attrName, null);
                }
            });

            this.selectedAttributes = initialSelection;

            this.recalculateActiveOptions(product, availableSkus);
            this.autoSelectFirstAvailable(product, availableSkus);
            this.findAndUpdateSKU(product, availableSkus);
        },

        handleAttributeChange(changedAttrName, newValue) {
            const product = this.product;
            const availableSkus = product.available_skus;

            this.$set(this.selectedAttributes, changedAttrName, newValue);

            this.recalculateActiveOptions(product, availableSkus);
            this.findAndUpdateSKU(product, availableSkus);
        },

        recalculateActiveOptions(product, availableSkus) {
            const newActiveOptions = {};
            const currentSelections = this.selectedAttributes;
            const attributes = product.attributes;

            attributes.forEach(attr => {
                const currentAttrOptions = new Set();
                const currentAttrKey = attr.sku_key;

                const matchingSkus = availableSkus.filter(sku => {
                    let matches = true;

                    attributes.forEach(checkAttr => {
                        const checkAttrName = checkAttr.name;
                        const selectedValue = currentSelections[checkAttrName];
                        const checkSkuKey = checkAttr.sku_key;

                        if (selectedValue !== null && sku[checkSkuKey] !== selectedValue) {
                            matches = false;
                        }
                    });
                    return matches;
                });

                matchingSkus.forEach(sku => {
                    if (sku[currentAttrKey]) {
                        currentAttrOptions.add(sku[currentAttrKey]);
                    }
                });

                newActiveOptions[attr.name] = Array.from(currentAttrOptions).sort();
            });

            this.activeAttributeOptions = newActiveOptions;
        },

        autoSelectFirstAvailable(product, availableSkus) {
            let selectionChanged = false;
            const attributes = product.attributes;

            attributes.forEach(attr => {
                const attrName = attr.name;

                const currentSelection = this.selectedAttributes[attrName];
                const availableOptions = this.activeAttributeOptions[attrName] || [];

                const isAvailableInNextStep = availableOptions.length > 0;
                const isSelectionInvalid = currentSelection && !availableOptions.includes(currentSelection);


                if (isSelectionInvalid) {
                    if (isAvailableInNextStep) {
                        const firstValidOption = availableOptions[0];
                        if (this.selectedAttributes[attrName] !== firstValidOption) {
                            this.$set(this.selectedAttributes, attrName, firstValidOption);
                            selectionChanged = true;
                        }
                    } else {
                        const leadingAttributeName = attributes[0]?.name;
                        if (attrName !== leadingAttributeName) {
                            if (this.selectedAttributes[attrName] !== null) {
                                this.$set(this.selectedAttributes, attrName, null);
                                selectionChanged = true;
                            }
                        }
                    }
                } else if (currentSelection === null && isAvailableInNextStep) {
                    const firstValidOption = availableOptions[0];
                    if (this.selectedAttributes[attrName] !== firstValidOption) {
                        this.$set(this.selectedAttributes, attrName, firstValidOption);
                        selectionChanged = true;
                    }
                }
            });

            if (selectionChanged) {
                this.recalculateActiveOptions(product, availableSkus);
            }
        },

        findAndUpdateSKU(product, availableSkus) {
            if (!this.isVariantSelectionPossible) {
                const foundSKU = availableSkus.find(sku => sku.stock_qty > 0) || availableSkus[0];
                this.currentSKU = foundSKU || {price: product.currentPrice, stock_qty: 0, sku: null};
                return;
            }

            const requiredAttrsCount = product.attributes.length;
            const selectedAttrsCount = Object.values(this.selectedAttributes).filter(v => v !== null).length;

            if (selectedAttrsCount < requiredAttrsCount) {
                this.currentSKU = null;
                return;
            }

            const foundSKU = availableSkus.find(sku => {
                return product.attributes.every(attr => {
                    const skuKey = attr.sku_key;
                    return sku[skuKey] === this.selectedAttributes[attr.name];
                });
            });

            this.currentSKU = foundSKU || null;
        },

        getCartFromStorage() {
            const cartData = localStorage.getItem(SHOPPING_CART_KEY);
            return cartData ? JSON.parse(cartData) : [];
        },

        saveCartToStorage(cart) {
            localStorage.setItem('shoppingCart', JSON.stringify(cart));
        },

        addToCart() {
            if (!this.currentSKU || this.currentSKU.stock_qty <= 0) {
                this.isNotificationVisible = true;
                return;
            }

            const cart = this.getCartFromStorage();
            const productId = this.product.id;
            const currentSKUData = this.currentSKU;
            const sku = currentSKUData.sku;
            const requestedQuantity = this.quantity || 1;
            const availableStock = currentSKUData.stock_qty;

            const existingItemIndex = cart.findIndex(item =>
                item.productId === productId && item.sku === sku
            );

            let finalQuantity = requestedQuantity;

            if (existingItemIndex !== -1) {
                const currentCartQuantity = cart[existingItemIndex].quantity;
                const potentialTotal = currentCartQuantity + requestedQuantity;

                if (potentialTotal > availableStock) {
                    finalQuantity = availableStock - currentCartQuantity;

                    if (finalQuantity <= 0) {
                        //TODO: Если в корзине уже ровно столько, сколько есть на складе
                        alert('Извините, достигнут лимит. Это максимально возможное количество товаров в наличии')
                        return;
                    }
                    cart[existingItemIndex].quantity = availableStock;

                } else {
                    cart[existingItemIndex].quantity = potentialTotal;
                }

            } else {
                if (requestedQuantity > availableStock) {
                    finalQuantity = availableStock;
                }

                const cartItem = {
                    productId: productId,
                    sku: sku,
                    name: this.product.name,
                    images: this.sortedImages,
                    current_sku: this.currentSKU,
                    quantity: finalQuantity,
                    attributes: this.product.attributes,
                    available_skus: this.product.available_skus
                };
                cart.push(cartItem);
            }

            this.saveCartToStorage(cart);
            eventBus.$emit('cart:updated');

            this.isNotificationVisible = false;
        }
    },
    watch: {
        product: {
            immediate: true,
            handler(newProduct) {
                if (newProduct) {
                    this.initializeVariantSelection(newProduct);
                    this.checkInWishlist();
                } else {
                    this.currentSKU = null;
                    this.selectedAttributes = {};
                    this.activeAttributeOptions = {};
                }
            }
        }
    },
    mounted() {
        eventBus.$on('update-favorites', this.checkInWishlist);
    }
}
</script>
<style scoped lang="scss">

.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    overflow-y: auto;
}

.modal-content {
    background: white;
    height: auto;
    min-height: 100vh;
    overflow: auto;
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
    /* display: flex;
     flex-direction: column;
     gap: 10px;*/
    width: 165px;
}

.image-wrapper {
    object-fit: cover;
    position: relative;

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
        height: 125px;
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
    flex-basis: 40%;

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
</style>

<style lang="scss">
.gallery .image-list {
    overflow: hidden;
}

.gallery .swiper-container {
    height: 100%;
}

.gallery .swiper-slide {
    max-height: 135px;
}
</style>
