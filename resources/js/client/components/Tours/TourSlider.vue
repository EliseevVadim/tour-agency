<template>
    <section class="container-fluid container-xl tour-section">
        <template v-if="!loading && tours.length > 0">
            <h2>Туры дня:</h2>
            <div class="tour-slider">
                <ssr-carousel class="ssr-carousel-tours" show-arrows feather :peek='20'
                              :slides-per-page='2' paginate-by-slide :responsive='responsive'>

                    <template #back-arrow="{ disabled }">
                        <span class="carousel-left-icon tour-carousel-left-icon" :class="{'disabled': disabled}"></span>
                    </template>

                    <template #next-arrow="{ disabled }">
                        <div class="next-button-container">
                            <span class="carousel-right-icon tour-carousel-right-icon" :class="{'disabled w-100': disabled}">
                                <transition name="expand">
                                    <a v-if="disabled" href="https://vk.com/clips/put_club" target="_blank"
                                       class="button-text text-decoration-none">
                                        посмотреть еще
                                    </a>
                                </transition>
                            </span>
                        </div>
                    </template>

                    <tour-card v-for="(tour, index) in tours" :key="index"
                               :index="index"
                               :imageUrl="tour.thumbnail_url"
                               :tourUrl="tour.video_url"
                               :alt-text="tour.title"
                               :badgeText="tour.badgeText"
                    :badgeType="tour.badgeType"/>
                </ssr-carousel>
            </div>
        </template>

        <h2 class="title-hot-tours">Горящие туры:</h2>
        <div id="hot-tours" class="tv-hot-tours tv-moduleid-9986629"></div>
    </section>
</template>

<script>
import axios from "axios";

export default {
    name: "TourSlider",

    data() {
        return {
            tours: [],
            loading: true,
            responsive: [
                {minWidth: 768, slidesPerPage: 3},
                {minWidth: 1366, slidesPerPage: 4}
            ],
            badgeConfig: [
                {text: "Новинка", type: "new"},
                {text: "Акция", type: "sale"},
                {text: "Скидка", type: "discount"},
            ]
        }
    },
    methods: {
        async fetchClips() {
            this.loading = true;
            try {
                const response = await axios.get('/api/clips');
                this.tours = response.data.map((tour, index) => {
                    const badge = this.badgeConfig[index];
                    return {
                        ...tour,
                        badgeText: badge ? badge.text : '',
                        badgeType: badge ? badge.type : ''
                    };
                });
            } catch (error) {
                console.error('Ошибка при получении клипов:', error);
            } finally {
                this.loading = false;
            }
        },
        getBadgeText(index) {
            const badge = this.badgeConfig[index];
            return badge ? badge.text : '';
        },
        getBadgeType(index) {
            const badge = this.badgeConfig[index];
            return badge ? badge.type : '';
        },
    },
    created() {
        this.fetchClips();
    },
}
</script>
