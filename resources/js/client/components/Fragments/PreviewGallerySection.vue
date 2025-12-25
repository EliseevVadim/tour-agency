<template>
    <section v-if="!loading" class="travel-directions-section preview-gallery-section">
        <div class="line-gradient-background"></div>

        <div class="container-fluid overflow-hidden">
            <h2 class="travel-directions-title text-center text-uppercase fw-800">Методология курса:</h2>

            <ssr-carousel v-if="slides.length > 0" show-arrows :slidesPerPage="3"
                          overflow-visible paginate-by-slide peek-right='3%' peek-left='3%' gutter='30'
                          :responsive='responsive' :no-drag="true">
                <template #back-arrow='{ disabled }'>
                    <span v-if="!disabled" class="carousel-left-icon" :class="{'disabled': disabled}"></span>
                </template>
                <template #next-arrow='{ disabled }'>
                    <span v-if="!disabled" class="carousel-right-icon" :class="{'disabled': disabled}"></span>
                </template>

                <div class="travel-card slide preview-card" v-for="slide in slides" :key="slide.id">
                    <a href="javascript:void(0)" @click.prevent="goToPricingAndOpenOpti(slide.id)" class="travel-card-link">
                        <div class="travel-card__image-container">
                            <div class="center-play-btn">
                                <img src="/img/icons/play.svg" alt="play Video">
                            </div>
                            <img :src="slide.image" :alt="slide.title || 'Preview Image'"
                                 class="travel-card__background-image" loading="lazy"/>
                        </div>
                    </a>
                </div>
            </ssr-carousel>
        </div>
    </section>
</template>

<script>
import { debounce } from 'lodash';
export default {
    name: "PreviewGallerySection",
    props: {
        title: {
            type: String,
            default: "Наши превью модулей"
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
            loading: true,
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
                    slidesPerPage: 3,
                },
                {
                    minWidth: 1366,
                    slidesPerPage: 3,
                }
            ],
        }
    },
    methods: {
        fetchPreviews() {
            this.loading = true;
            axios.get('/api/modules-preview')
                .then(response => {
                    this.slides = response.data;
                })
                .catch(error => {
                    console.error('Ошибка при получении превью:', error);
                    this.slides = [];
                }).finally(() => {
                this.loading = false;
            });
        },
        handleScrollAnimation() {
            document.querySelectorAll('.preview-card').forEach((el, idx) => {
                const rect = el.getBoundingClientRect();
                const isVisible =
                    rect.top < window.innerHeight * (1 - 0.1) && rect.bottom > window.innerHeight * 0.1;

                if (!isVisible) return;

                if (el.classList.contains('animate__animated')) return;

                el.classList.add('animate__animated', 'animate__fadeIn', 'animate__fast');
                if (idx === 1) el.classList.add('animate__delay-0-5s');
                if (idx === 2) el.classList.add('animate__delay-1s');
                if (idx === 3) el.classList.add('animate__delay-1-5s');
            });
        },
        goToPricingAndOpenOpti(slideId) {
            this.$emit('open-pricing-package', 'opti');
        },
    },
    created() {
        this.debouncedScroll = debounce(this.handleScrollAnimation, 50);
    },
    mounted() {
        this.fetchPreviews();
        window.addEventListener('scroll', this.debouncedScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.debouncedScroll);
    }
}
</script>
