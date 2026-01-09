require('./bootstrap');

import Vue from 'vue';
import SsrCarousel from 'vue-ssr-carousel'
import ssrCarouselCss from 'vue-ssr-carousel/index.css'
import 'animate.css';
import VueMask from 'v-mask';

Vue.component('main-component', require('./App.vue').default);
Vue.component('contacts-component', require('./client/Contacts.vue').default);
Vue.component('socials-page', require('./client/SocialsPage.vue').default);

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

Vue.component('main-shop-content', require('./client/modules/shop/MerchStore.vue').default);


Vue.component('main-courses-content', require('./client/modules/course/CoursePage.vue').default);
Vue.component('course-hero', require('./client/modules/course/components/CourseHero.vue').default);
Vue.component('target-audience-list', require('./client/modules/course/components/TargetAudienceList.vue').default);
Vue.component('course-modules-summary', require('./client/modules/course/components/CourseModulesSummary.vue').default);
Vue.component('pricing-selector', require('./client/modules/course/components/PricingSelector.vue').default);
Vue.component('faq-or-contact', require('./client/modules/course/components/FaqOrContact.vue').default);


Vue.component('admin-team-component', require('./admin/TeamComponent.vue').default);
Vue.component('admin-reviews-component', require('./admin/ReviewsComponent.vue').default);
Vue.component('admin-contacts-component', require('./admin/ContactsComponent.vue').default);
Vue.component('admin-courses-component', require('./admin/AdminCoursesComponent.vue').default);

Vue.component('ssr-carousel', SsrCarousel);
Vue.use(VueMask);

import { initPromoAnimation } from './animation';
require("./scripts");

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => initPromoAnimation());
}

const app = new Vue({
    el: '#app',
});
