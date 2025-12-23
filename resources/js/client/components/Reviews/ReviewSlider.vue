<template>
    <section class="reviews-section">
        <div class="container-fluid overflow-hidden">
            <h2 class="reviews-title text-center">Отзывы клиентов:</h2>
            <div class="reviews-slider">
                <ssr-carousel v-if="reviews.length > 0" :slides-per-page='1' paginate-by-slide show-arrows
                              :responsive='carouselResponsive' v-model="activeSlide" @change="handleSlideChange"
                              :style="{ height: this.carouselHeight }">
                    <template #back-arrow='{ disabled }'>
                        <span class="carousel-left-icon reviews-carousel-left-icon"
                              :class="{'disabled': disabled}"></span>
                    </template>
                    <template #next-arrow='{ disabled }'>
                        <div class="next-button-container">
                        <span class="carousel-right-icon reviews-carousel-right-icon" :class="{'disabled': disabled}">
                            <transition name="expand">
                                <a href="https://yandex.ru/maps/org/v_put/105740302681/reviews/?ll=38.970202%2C45.034904&z=16"
                                   target="_blank" v-if="disabled"
                                   class="button-text text-decoration-none">посмотреть еще</a>
                            </transition>
                        </span>
                        </div>
                    </template>

                    <review-card v-for="(review, index) in reviews"
                                 :key="index"
                                 :profile-image="review.avatar"
                                 :name="review.name"
                                 :pre-location="review.pre_location"
                                 :location="review.country"
                                 :text="review.review_text"
                                 :photos="review.photos"
                                 :data-slide-index="index"
                                 @open-image-modal="showImageModal"/>
                </ssr-carousel>
            </div>
        </div>
        <image-modal :is-visible="isModalVisible"
                     :image-url="currentImageUrl"
                     @close="hideImageModal"></image-modal>
    </section>
</template>

<script>
import axios from "axios";
import ImageModal from "../Fragments/ImageModal.vue";

export default {
    name: "ReviewSlider",
    components: {ImageModal},
    data() {
        return {
            isModalVisible: false,
            currentImageUrl: '',
            reviews: [],
            carouselResponsive: [],
            carouselHeight: 'auto',
            activeSlide: 0
        }
    },
    methods: {
        async fetchReviews() {
            try {
                const response = await axios.get('/api/reviews');
                this.reviews = response.data;

                this.updateCarouselResponsive();
                setTimeout(() => {
                    this.handleSlideChange();
                }, 1500);
            } catch (error) {
                console.error('Ошибка при получении отзывов:', error);
            }
        },

        updateCarouselResponsive() {
            const slidesPerPage = this.reviews.length > 1 ? 2 : 1;

            this.carouselResponsive = [
                {
                    maxWidth: 1479,
                    slidesPerPage: 1,
                    center: true,
                    gutter: 10,
                    peek: 0
                },
                {
                    minWidth: 1480,
                    slidesPerPage: slidesPerPage,
                }
            ];
        },
        handleSlideChange() {
            this.$nextTick(() => {
                const items = document.querySelectorAll('.review-card');

                if (!items || items.length === 0) {
                    console.warn('Элементы .review-card не найдены в контейнере.');
                    return;
                }

                const itemReview = items[this.activeSlide === null ? 0 : this.activeSlide];
                const reviewSize = itemReview.getBoundingClientRect();
                this.carouselHeight = reviewSize.height + 45 + 'px';
            })
        },
        showImageModal(payload) {
            this.currentImageUrl = payload.imageUrl;
            this.isModalVisible = true;
        },
        hideImageModal() {
            this.isModalVisible = false;
            this.currentImageUrl = '';
        },
    },
    mounted() {
        this.fetchReviews();
    },
}
</script>
