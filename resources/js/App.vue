<template>
    <div class="main">
        <div class="loader" v-if="loading">
            <div class="loader__dot"></div>
            <div class="loader__dot"></div>
            <div class="loader__dot"></div>
        </div>

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
            sectionElements: [],
            loading: true
        }
    },
    mounted() {
        setTimeout(()=>{
            this.loading = false;
        },3000);
        document.addEventListener('DOMContentLoaded', () => {
            const mobileMenuCollapse = document.getElementById('mobileMenuContent');
            const body = document.body;
            document.querySelector('[data-bs-toggle="collapse"][data-bs-target="#mobileMenuContent"]');
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

            menuLinks.forEach(link => {
                link.addEventListener('click', () => {
                    closeMenu();
                    document.body.style.overflow = '';
                });
            });
            const hamburgerButton = document.querySelector('[data-bs-toggle="collapse"][data-bs-target="#mobileMenuContent"]');
            document.addEventListener('click', (event) => {
                if (mobileMenuCollapse && mobileMenuCollapse.classList.contains('show')) {
                    if (!mobileMenuCollapse.contains(event.target) && !hamburgerButton.contains(event.target)) {
                        closeMenu();
                        document.body.style.overflow = '';
                    }
                }
            });
        });
    },
    methods: {
        handleSetActiveLink(link) {
            this.activeAnchor = link;
        }
    }
}
</script>
