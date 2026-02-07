<template>
    <div v-if="isVisible" class="modal-backdrop" @click.self="$emit('close')">
        <notification-modal :is-visible="isNotificationVisible" @close="isNotificationVisible = false"></notification-modal>

        <div class="modal-content">
            <div class="product-header container">
                <h2 @click="closeModal" class="fw-bold cursor-pointer">Назад</h2>
            </div>

            <div v-if="product">
                <div class="product-card container">
                    <div class="product-content">
                        <div class="d-flex flex-column gallery-wrapper justify-content-between">
                            <div class="gallery">
                                <div class="image-list">
                                    <div v-for="(image, idx) in product.images" class="image-wrapper position-relative">
                                        <img :src="image" :alt="'Вид-' + idx" :key="'thumbnail-' + idx"/>
                                    </div>
                                </div>

                                <div class="main-image position-relative">
                                    <div class="img-wrapper h-100">
                                        <img :src="product.imageUrl" alt="Основное изображение">
                                    </div>
                                </div>
                            </div>
                            <div class="size-chart-link">
                                <a href="#">Таблица размеров</a>
                            </div>
                        </div>

                        <div class="product-details">
                            <h2>{{ product.name }}</h2>

                            <p class="description">
                                Наше авторское обучение для людей которые хотят работать в сфере туризма на полную или
                                частичную занятость, или путешествовать с огромными скидками.
                            </p>

                            <div class="options">
                                <div class="form-group" v-for="(parameter, idx) in product.parameters" :key="idx">
                                    <label :for="'select-' + idx">{{ parameter.name }}:</label>
                                    <div class="select-wrapper position-relative">
                                        <select :id="'select-' + idx" class="custom-select">
                                            <option v-for="value in parameter.value" :key="value" :value="value">
                                                {{ value }}
                                            </option>
                                        </select>
                                        <div class="select-icon position-absolute">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="price-actions">
                                <h2 class="mb-2">3650 руб.</h2>
                                <div class="btn-actions d-flex gap-4 align-items-center">
                                    <button class="btn btn-cta">
                                        в корзину
                                    </button>
                                    <div class="product-block-favorites-wrapp wishlist-icon">
                                        <input type="checkbox" :checked="isInWishlist"
                                               :id="'heart-prod-' + product.id"
                                               :name="'heart-prod-' + product.id"
                                               class="product-block-favorites__checkbox">
                                        <label @click.prevent="$emit('toggle-wishlist', {
                                         id: product.id,
                                          name: product.name,
                                           price: product.currentPrice,
                                            imageUrl: product.imageUrl,
                                              parameters: product.parameters,
                                                maxCount: product.maxCount
                                        })" :for="'heart-prod-' + product.id" class="product-block-favorites__label">
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
                                      :class="{'disabled w-100': disabled}">
                                </span>
                            </div>
                        </template>
                        <ProductCard
                            v-for="product in otherProducts"
                            :key="product.id"
                            :product="product"
                            @click="openModalFromCard(product)"
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

const MOCK_PRODUCTS_DB = [
    { id: 101, name: 'Синяя футболка "Путешествие"', category_slug: 'clothing', currentPrice: 1500, imageUrl: '/img/merch/test.png' },
    { id: 102, name: 'Красный рюкзак', category_slug: 'accessories', currentPrice: 3500, imageUrl: '/img/merch/test.png' },
    { id: 103, name: 'Треккинговые ботинки', category_slug: 'clothing', currentPrice: 12000, imageUrl: '/img/merch/test.png' },
    { id: 104, name: 'Термос "Поход"', category_slug: 'travelGoods', currentPrice: 2500, imageUrl: '/img/merch/test.png' },
    { id: 105, name: 'Брелок "Трек"', category_slug: 'accessories', currentPrice: 400, imageUrl: '/img/merch/test.png' },
];
const WISHLIST_STORAGE_KEY = 'merchWishlistIds';

export default {
    name: "ProductDetailModal",
    components: {NotificationModal, ProductCard},
    props: {
        isVisible: {type: Boolean, required: true},
        product: {type: Object, default: null}
    },
    emits: ['close', 'toggle-wishlist'],
    data() {
        return {
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
        };
    },
    methods: {
        closeModal() {
            this.$emit('close')
        },
        checkInWishlist() {
            const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
            this.wishlistIds = stored ? JSON.parse(stored) : null;

            this.isInWishlist = this.wishlistIds.includes(this.product.id);
        }
    },
    mounted() {
        eventBus.$on('update-favorites', this.checkInWishlist);
        this.checkInWishlist();
    }
}
</script>

<style scoped lang="scss">
.cursor-pointer {
    cursor: pointer;
}

.gallery-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #f5f5f5;
}

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
    height: auto; /* Убрано min-height: 100vh для корректной прокрутки контента */
    min-height: 100vh;
    overflow: auto;
}

.product-header {
    margin-top: 50px;
    margin-bottom: 65px;
}

.product-card {
    max-width: 1400px;
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
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 165px;
}

.image-wrapper {
    height: 125px;
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
    padding-left: 10px;

    .description {
        font-size: 1.4rem;
        line-height: 1;
        margin-bottom: 20px;
        margin-top: 20px;
        font-weight: 500;
    }
}

.price-actions {
    .btn-actions {
        .btn-cta {
            flex-grow: 1;
            font-size: 1.5rem;
        }
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
    max-width: 1400px;
    margin-bottom: 50px;

    h2 {
        padding-bottom: 35px;
    }
}
</style>
