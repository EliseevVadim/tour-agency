<template>
    <section class="reviews-section">
        <div class="container-fluid overflow-hidden">
            <h2 class="reviews-title text-center">Отзывы клиентов:</h2>
            <div v-if="reviews.length > 0" class="reviews-slider">
                <ssr-carousel show-arrows :slides-per-page='1'
                              paginate-by-slide overflow-visible peek-right='10%' gutter='29'
                              :responsive='responsive'>
                    <template #back-arrow='{ disabled }'>
                        <span class="carousel-left-icon reviews-carousel-left-icon" :class="{'disabled': disabled}"></span>
                    </template>
                    <template #next-arrow='{ disabled }'>
                        <span class="carousel-right-icon reviews-carousel-right-icon" :class="{'disabled': disabled}"></span>
                    </template>

                    <review-card v-for="(review, index) in reviews"
                                 :key="index"
                                 :name="review.name"
                                 :gender="review.gender"
                                 :location="review.location"
                                 :text="review.text"
                                 :background-image="review.backgroundImage"
                                 :profile-image="review.profileImage"/>
                </ssr-carousel>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";

export default {
    name: "ReviewSlider",
    data() {
        return {
            reviews: [],
            responsive: [
                {
                    minWidth: 270,
                    slidesPerPage: 1,
                    center: true,
                    peek: 20,
                    gutter: 15
                },
                {
                    minWidth: 768,
                    slidesPerPage: 2,
                },
                {
                    minWidth: 1024,
                    slidesPerPage: 3,
                },
                {
                    minWidth: 1366,
                    slidesPerPage: 4,
                }
            ]
        }
    },
    methods: {
        fetchReviews() {
            axios.get('/api/reviews')
                .then(response => {
                    this.reviews = response.data;
                })
                .catch(error => {
                    console.error('Ошибка при получении клипов:', error);
                    if (error.response) {
                        console.error('Error response data:', error.response.data);
                    }
                });
        },
    },
    mounted() {
        this.fetchReviews();
    }
}
</script>
