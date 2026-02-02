require('./bootstrap');

import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Vue from 'vue';
import SsrCarousel from 'vue-ssr-carousel'
import ssrCarouselCss from 'vue-ssr-carousel/index.css'
import 'animate.css';
import VueMask from 'v-mask';

Vue.component('app-footer', require('./client/components/Fragments/Footer.vue').default);
Vue.component('app-header', require('./client/components/Fragments/Header.vue').default);

const MainComponentContent = () => import('./App.vue');
const ContactsPageContent = () => import('./client/Contacts.vue');
const SocialPageContent = () => import('./client/SocialsPage.vue');
const MainShopContent = () => import('./client/modules/shop/MerchStore.vue');
const CoursePageContent = () => import('./client/modules/course/CoursePage.vue');

Vue.component('main-component', MainComponentContent);
Vue.component('contacts-component', ContactsPageContent);
Vue.component('socials-page', SocialPageContent);
Vue.component('main-shop-content', MainShopContent);
Vue.component('main-courses-content', CoursePageContent);


Vue.component('admin-team-component', require('./admin/TeamComponent.vue').default);
Vue.component('admin-reviews-component', require('./admin/ReviewsComponent.vue').default);
Vue.component('admin-contacts-component', require('./admin/ContactsComponent.vue').default);
Vue.component('admin-courses-component', require('./admin/AdminCoursesComponent.vue').default);

Vue.component('ssr-carousel', SsrCarousel);
Vue.use(VueMask);

const app = new Vue({
    el: '#app',
});
