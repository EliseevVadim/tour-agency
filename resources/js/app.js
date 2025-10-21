require('./bootstrap');

import Vue from 'vue';
import SsrCarousel from 'vue-ssr-carousel'
import ssrCarouselCss from 'vue-ssr-carousel/index.css'

Vue.component('app-footer', require('./client/components/Fragments/Footer.vue').default);
Vue.component('app-header', require('./client/components/Fragments/Header.vue').default);

Vue.component('review-card', require('./client/components/Reviews/ReviewCard.vue').default);
Vue.component('review-slider', require('./client/components/Reviews/ReviewSlider.vue').default);

Vue.component('team-list', require('./client/components/Team/TeamList.vue').default);

Vue.component('tour-card', require('./client/components/Tours/TourCard.vue').default);
Vue.component('tour-slider', require('./client/components/Tours/TourSlider.vue').default);

Vue.component('souvenir-promo', require('./client/components/Promotions/SouvenirPromo.vue').default);
Vue.component('telegram-promo', require('./client/components/Promotions/TelegramPromo.vue').default);
Vue.component('training-promo', require('./client/components/Promotions/TrainingPromo.vue').default);

Vue.component('benefits-section', require('./client/components/Benefits.vue').default);
Vue.component('travel-directions', require('./client/components/TravelDirectionsSection.vue').default);
Vue.component('first-screen', require('./client/components/HeroSection.vue').default);

Vue.component('ssr-carousel', SsrCarousel);

const app = new Vue({
    el: '#app',
});
