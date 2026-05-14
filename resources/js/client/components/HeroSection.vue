<template>
    <section class="hero-section d-flex flex-column justify-content-between">

        <div class="hero-background">
        </div>

        <div class="hero-surf position-absolute">
            <img src="/img/surfboard.png" alt="surfboard">
        </div>

        <app-header :is-main="true" class="position-absolute w-100"/>

        <div class="hero-content align-items-center container d-grid justify-content-center text-center text-uppercase">
            <h1 class="text-white fw-bold">Мы работаем, чтобы</h1>
            <h1 class="text-white fw-800">вы отдыхали</h1>
        </div>

        <div class="hero-bottom container py-3">
            <div class="tv-search-form tv-moduleid-9974653"></div>
        </div>

    </section>
</template>

<script>
export default {
    name: "HeroSection",
    data() {
        return {
            activeLink: "#first",
            menuItems: [
                {link: '#first', text: 'Главная'},
                {link: '#tours', text: 'Туры дня'},
                {link: '#hot-tours', text: 'Горящие туры'},
                {link: '#discount', text: 'Акции и скидки'},
                {link: '#travel', text: 'О путешествиях'},
                {link: '#reviews', text: 'Отзывы'},
                {link: '#directions', text: 'Наши направления'},
                {link: '#training', text: 'Курсы'},
                {link: '#team', text: 'Команда'},
                {link: '#merch', text: 'Мерч'},
                {link: 'contacts', text: 'Контакты'},
                { link: 'socials', text: 'Социальные сети' }
            ],
        }
    },
    methods: {
        setActiveLink(link) {
            this.$emit('set-active-link', link);
            this.activeLink = link
        },
        handleLinkClick(link) {
            this.setActiveLink(link);
            this.closeMobileMenu();
        },
        closeMobileMenu(){
            this.$nextTick(() => {
                const mobileMenu = document.getElementById('mobileMenuContent');
                if (mobileMenu && typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
                    const bsCollapse = new bootstrap.Collapse(mobileMenu, {toggle: false});
                    bsCollapse.hide();
                }
            });
        },
        handleOutsideClick(event) {
           /* const mobileMenu = this.mobileMenu;
            const isMenuShown = mobileMenu && mobileMenu.classList.contains('show');
            const isClickInsideMenu = mobileMenu && mobileMenu.contains(event.target);

            const hamburgerButton = document.querySelector('.navbar-toggler[data-bs-target="#mobileMenuContent"]');
            const isClickOnHamburger = hamburgerButton && hamburgerButton.contains(event.target);

            if (isMenuShown && !isClickInsideMenu && !isClickOnHamburger) {
                this.closeMobileMenu();
            }*/
        }
    },
    mounted() {
        this.mobileMenu = document.getElementById('mobileMenuContent');

        if (this.mobileMenu) {
            if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
                this.bsCollapse = new bootstrap.Collapse(this.mobileMenu, {toggle: false});
            }
            document.addEventListener('click', this.handleOutsideClick);
        }
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleOutsideClick);
    },
}
</script>
<style scoped>
.hero-section .hero-content {
    padding-top: 110px;
}
</style>
