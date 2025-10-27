<template>
    <section class="container-fluid container-xl tour-section">
        <h2>Туры дня:</h2>
        <div v-if="tours.length > 0" class="tour-slider">
            <ssr-carousel show-arrows feather :peek='20'
                          :slides-per-page='1'
                          paginate-by-slide
                          :responsive='responsive'>
                <template #back-arrow='{ disabled }'>
                    <span class="carousel-left-icon tour-carousel-left-icon" :class="{'disabled': disabled}"></span>
                </template>
                <template #next-arrow='{ disabled }'>
                    <span class="carousel-right-icon tour-carousel-right-icon" :class="{'disabled': disabled}"></span>
                </template>
                <tour-card v-for="(tour, index) in tours"
                           :key="index"
                           :imageUrl="tour.thumbnail_url"
                           :tourUrl="tour.video_url"
                           :alt-text="'Тур'"
                           :badgeText="tour.badgeText"
                           :badgeType="tour.badgeType"/>
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
            ]
        }
    },
    methods: {
        fetchClips() {
            axios.get('/api/clips')
                .then(response => {
                    // !!! ВАЖНО: Добавьте логирование для проверки структуры API !!!
                    console.log('API Response Data:', response.data);

                    this.tours = response.data; // <-- Возможно, здесь проблема, если response.data не просто массив

                    // !!! Проверьте, что после присвоения this.tours действительно имеет данные !!!
                    console.log('Tours data after assignment:', this.tours);

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
        this.fetchClips();
    }
}
</script>
