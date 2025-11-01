<template>
    <section v-if="!loading && tours.length > 0" class="container-fluid container-xl tour-section">
        <h2>Туры дня:</h2>
        <div class="tour-slider">
            <ssr-carousel show-arrows feather :peek='20'
                          :slides-per-page='1'
                          paginate-by-slide
                          :responsive='responsive'>
                <template #back-arrow='{ disabled }'>
                    <span class="carousel-left-icon tour-carousel-left-icon" :class="{'disabled': disabled}"></span>
                </template>
                <template #next-arrow='{ disabled }'>
                    <div class="next-button-container">
                        <span class="carousel-right-icon tour-carousel-right-icon" :class="{'disabled': disabled}">
                            <transition name="expand">
                                <a href="https://vk.com/clips/put_club" target="_blank" v-if="disabled"
                                   class="button-text text-decoration-none">посмотреть еще</a>
                            </transition>
                        </span>
                    </div>
                </template>
                <tour-card v-for="(tour, index) in tours"
                           :key="index"
                           :imageUrl="tour.thumbnail_url"
                           :tourUrl="tour.video_url"
                           :alt-text="tour.title"
                           :badgeText="getBadgeText(index)"
                           :badgeType="getBadgeType(index)"
                :index="index"/>
            </ssr-carousel>
        </div>
    </section>
</template>

<script>
import axios from "axios";

export default {
    name: "TourSlider",
    data() {
        return {
            tours: [],
            responsive: [
                {
                    minWidth: 500,
                    slidesPerPage: 2,
                },
                {
                    minWidth: 675,
                    slidesPerPage: 3,
                },
                {
                    minWidth: 1366,
                    slidesPerPage: 4,
                }
            ],
            loading: true,
        }
    },
    methods: {
        fetchClips() {
            axios.get('/api/clips')
                .then(response => {
                    this.tours = response.data;
                })
                .catch(error => {
                    console.error('Ошибка при получении клипов:', error);
                    if (error.response) {
                        console.error('Error response data:', error.response.data);
                    }
                }).finally(() => {
                this.loading = false;
            });
        },
        getBadgeText(index) {
            if (index === 0) {
                return "Новинка";
            } else if (index === 1) {
                return "Акция";
            } else if (index === 2) {
                return "Скидка";
            }
            return '';
        },

        getBadgeType(index) {
            if (index === 0) {
                return "new";
            } else if (index === 1) {
                return "sale";
            } else if (index === 2) {
                return "discount";
            }
            return '';
        },
    },
    mounted() {
        this.fetchClips();
    }
}
</script>
