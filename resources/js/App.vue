<template>
    <div class="main">
        <div class="loader" v-if="loading">
            <div class="loader__dot"></div>
            <div class="loader__dot"></div>
            <div class="loader__dot"></div>
        </div>

        <hero-section id="first" :class="{ 'active': activeAnchor == '#first' }" @set-active-link="handleSetActiveLink"></hero-section>
        <tour-slider id="tours" :class="{ 'active': activeAnchor == '#tours' }"></tour-slider>
        <telegram-promo id="discount" :class="{ 'active': activeAnchor == '#discount' }"></telegram-promo>
        <benefits id="travel" :class="{ 'active': activeAnchor == '#travel' }"></benefits>
        <review-slider id="reviews" :class="{ 'active': activeAnchor == '#reviews' }"></review-slider>
        <travel-directions-section id="directions" :class="{ 'active': activeAnchor == '#directions' }"></travel-directions-section>
        <training-promo id="training" :class="{ 'active': activeAnchor == '#training' }"></training-promo>
        <team-list id="team" :class="{ 'active': activeAnchor == '#team' }"></team-list>
        <souvenir-promo id="merch" :class="{ 'active': activeAnchor == '#merch' }"></souvenir-promo>

        <app-footer></app-footer>
    </div>
</template>
<script>

import HeroSection from "./client/components/HeroSection.vue";
import TourSlider from "./client/components/Tours/TourSlider.vue";
import SouvenirPromo from "./client/components/Promotions/SouvenirPromo.vue";
import TrainingPromo from "./client/components/Promotions/TrainingPromo.vue";
import TelegramPromo from "./client/components/Promotions/TelegramPromo.vue";
import Benefits from "./client/components/Benefits.vue";
import TravelDirectionsSection from "./client/components/TravelDirectionsSection.vue";
import TeamList from "./client/components/Team/TeamList.vue";
import ReviewSlider from "./client/components/Reviews/ReviewSlider.vue";

export default {
    name: "App",
    components: {
        ReviewSlider,
        TeamList,
        TravelDirectionsSection, Benefits, TelegramPromo, TrainingPromo, SouvenirPromo, TourSlider, HeroSection},
    data() {
        return {
            activeAnchor: null,
            sectionObserver: null,
            menuLinks: [],
            sectionElements: [],
            loading: true
        }
    },
    mounted() {
        setTimeout(()=>{
            this.loading = false;
        },1500);
        const mobileMenuCollapse = document.getElementById('mobileMenuContent');
        const body = document.body;

        if (mobileMenuCollapse) {
            const disableScroll = () => { body.style.overflow = 'hidden'; };
            const enableScroll = () => { body.style.overflow = ''; };

            mobileMenuCollapse.addEventListener('shown.bs.collapse', () => {
                disableScroll();
            });

            mobileMenuCollapse.addEventListener('hidden.bs.collapse', () => {
                enableScroll();
            });
        }
        if (window.location.hash) {
            setTimeout(() => {
                window.location.href = window.location.hash;
            }, 800);
        }
    },
    methods: {
        handleSetActiveLink(link) {
            this.activeAnchor = link;
        }
    }
}
</script>
