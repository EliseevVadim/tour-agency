<template>
    <div class="main">
        <app-header></app-header>

        <first-screen id="first" :class="{ 'active': activeAnchor == '#first' }" @set-active-link="handleSetActiveLink"></first-screen>
        <tour-slider id="tours" :class="{ 'active': activeAnchor == '#tours' }"></tour-slider>
        <telegram-promo id="discount" :class="{ 'active': activeAnchor == '#discount' }"></telegram-promo>
        <benefits-section id="travel" :class="{ 'active': activeAnchor == '#travel' }"></benefits-section>
        <review-slider id="reviews" :class="{ 'active': activeAnchor == '#reviews' }"></review-slider>
        <travel-directions id="directions" :class="{ 'active': activeAnchor == '#directions' }"></travel-directions>
        <training-promo id="training" :class="{ 'active': activeAnchor == '#training' }"></training-promo>
        <team-list id="team" :class="{ 'active': activeAnchor == '#team' }"></team-list>
        <souvenir-promo id="merch" :class="{ 'active': activeAnchor == '#merch' }"></souvenir-promo>

        <app-footer></app-footer>
    </div>
</template>
<script>
export default {
    name: "App",
    data() {
        return {
            activeAnchor: null,
            sectionObserver: null,
            menuLinks: [],
            sectionElements: []
        }
    },
    mounted() {
        document.addEventListener('DOMContentLoaded', () => {
            const mobileMenuCollapse = document.getElementById('mobileMenuContent');
            const body = document.body;
            const disableScroll = () => {
                body.style.overflow = 'hidden';
            };
            const enableScroll = () => {
                body.style.overflow = '';
            };
            mobileMenuCollapse.addEventListener('shown.bs.collapse', () => {
                disableScroll();
            });

            mobileMenuCollapse.addEventListener('hidden.bs.collapse', () => {
                enableScroll();
            });
        });

        document.addEventListener('DOMContentLoaded', () => {
            const mobileMenuCollapse = document.getElementById('mobileMenuContent');
            const menuLinks = document.querySelectorAll('.main li a');

            const closeMenu = () => {
                if (mobileMenuCollapse) {
                    mobileMenuCollapse.classList.remove('show');
                    mobileMenuCollapse.setAttribute('aria-expanded', 'false');
                }
            };
        });
    },
    beforeUnmount() {
        if (this.observer) {
            this.observer.disconnect();
        }
    },
    methods: {
        handleSetActiveLink(link) {
            this.activeAnchor = link;
        }
    }
}
</script>
