<template>
    <section v-if="!loading" class="travel-directions-section">
        <div v-if="isShowCoconut" class="coconut-background coconut-right"></div>
        <div class="line-gradient-background"></div>

        <div class=" container-fluid overflow-hidden">
            <h2 class="travel-directions-title text-center" :class="titleStyle">{{ title }}:</h2>

            <ssr-carousel v-if="slides.length > 0" show-arrows show-dots :slidesPerPage="1" overflow-visible
                          paginate-by-slide peek-right='3%' peek-left='3%' gutter='30'
                          :responsive='responsive'>

                <template #back-arrow='{ disabled }'>
                    <span class="carousel-left-icon" :class="{'disabled': disabled}"></span>
                </template>
                <template #next-arrow='{ disabled }'>
                    <div class="next-button-container">
                        <span class="carousel-right-icon" :class="{'disabled': disabled}">
                            <transition name="expand">
                                <a href="https://vkvideo.ru/@put_club/all" target="_blank" v-if="disabled"
                                   class="button-text text-decoration-none">посмотреть еще</a>
                            </transition>
                        </span>
                    </div>
                </template>

                <div class="travel-card slide" v-for="slide in slides" :key="slide.id">
                    <a :href="slide.direct_url" target="_blank" class="travel-card-link">
                        <div class="travel-card__image-container">
                            <div class="center-play-btn">
                                <img src="/img/icons/play.svg" alt="play Video">
                            </div>
                            <img :src="slide.image" :alt="slide.title" class="travel-card__background-image"/>
                        </div>
                    </a>
                </div>
            </ssr-carousel>
        </div>
    </section>
</template>

<script>
import axios from "axios";

export default {
    name: "TravelDirectionsSection",
    props: {
        title: {
            type: String,
            default: "Наши направления"
        },
        isShowCoconut: {
            type: Boolean,
            default: true
        },
        titleStyle: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            slides: [],
            responsive: [
                {
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
                    slidesPerPage: 2,
                },
                {
                    minWidth: 1366,
                    slidesPerPage: 3,
                }
            ],
            loading: true
        }
    },
    methods: {
        fetchVideos() {
            axios.get('/api/videos')
                .then(response => {
                    this.slides = response.data;
                })
                .catch(error => {
                    console.error('Ошибка при получении видео:', error);
                }).finally(() => {
                this.loading = false;
            });
        },
    },
    mounted() {
        this.fetchVideos();
        document.addEventListener('scroll', debounceCrop);

        function debounceCrop() {
            document.querySelectorAll('.travel-card').forEach((el, idx) => {

                const rect = el.getBoundingClientRect();
                const isVisible =
                    rect.top < window.innerHeight * (1 - 0.1) && rect.bottom > window.innerHeight * 0.1;
                if (!isVisible) return;
                el.classList.add('animate__animated', 'animate__fadeIn', 'animate__fast');
                if (idx === 1) el.classList.add('animate__delay-0-5s');
                if (idx === 2) el.classList.add('animate__delay-1s');
                if (idx === 3) el.classList.add('animate__delay-1-5s');
            });
        }
    }
}
</script>
