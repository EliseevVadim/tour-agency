<template>
    <div v-if="isVisible" class="modal-backdrop" @click.self="$emit('close')">
        <div class="modal-content">
            <div class="product-header container">
                <h2 class="fw-bold">Назад</h2>
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
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 fill="#eb2d26"
                                                 class="bi bi-chevron-down custom-chevron" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd"
                                                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                                            </svg>
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
                                        <label @click.prevent="toggleWishlist({
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
                        <div v-for="(item, idx) in [{id:1}, {id: 2},{id:1}, {id: 2},{id:1}, {id: 2},{id:1}, {id: 2}]"
                             :key="idx">
                            <p>{{ item }}</p>
                        </div>
                    </ssr-carousel>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProductDetailModal",
    props: {
        isVisible: {type: Boolean, required: true},
        product: {type: Object, default: null},
        isInWishlist: {type: Boolean, default: false}
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
                }]
        };
    },
    methods: {
        toggleWishlist(product) {
            this.$emit('toggle-wishlist', product);
        },
    }
}
</script>

<style scoped lang="scss">
.gallery-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #f5f5f5;
}

.modal-content {
    background: white;
    height: 100%;
    overflow: auto;
}

.product-header {
    margin-top: 50px;
    margin-bottom: 65px;
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

.btn-actions .btn-cta {
    flex-grow: 1;
    font-size: 1.5rem;
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
        background: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%23eb2d26%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20class%3D%22bi%20bi-chevron-down%20custom-chevron%22%20viewBox%3D%220%200%2016%2016%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20fill-rule%3D%22evenodd%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20d%3D%22M1.646%204.646a.5.5%200%200%201%20.708%200L8%2010.293l5.646-5.647a.5.5%200%200%201%20.708.708l-6%206a.5.5%200%200%201-.708%200l-6-6a.5.5%200%200%201%200-.708%22%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fsvg%3E");
        background: transparent;
        background-repeat: no-repeat;
        background-position-x: 96%;
        background-position-y: 56%;
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

    h2 {
        padding-bottom: 35px;
    }
}
</style>
