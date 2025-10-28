<template>
    <section class="hero-section d-flex flex-column justify-content-between"
             style="min-height: 100vh; position: relative;">

        <div class="hero-background"
             style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; overflow: hidden;">
            <img src="/img/hero-section-bg.png" alt="Hero Image" style="width: 100%; height: 100%; object-fit: cover;">
        </div>

        <div class="hero-surf position-absolute">
            <img src="/img/surfboard.png" alt="surfboard">
        </div>

        <nav class="hero-top-bar container-xl d-flex justify-content-between align-items-start">
            <div class="hero-top-bar-left gap-5 d-flex align-items-start">
                <button @click="setActiveLink('#first')" class="navbar-toggler border-0" type="button" data-bs-toggle="collapse"
                        data-bs-target="#mobileMenuContent"
                        aria-controls="mobileMenuContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="logo-container">
                    <img class="logo" src="/img/logo.png" alt="logo">
                    <img class="position-absolute" src="/img/plane.png" alt="plane">
                    <p class="logo-subtitle">КЛУБ ПУТЕШЕСТВИЙ</p>
                </div>
            </div>

            <div class="hero-top-bar-right d-none d-sm-block">
                <a class="phone-plate btn btn-cta py-2 align-content-center" href="tel:+79888883603">
                    <img class="align-bottom" src="/img/phone-call.png" alt="phone">
                    +7 (988)888-36-03
                </a>
            </div>

            <div class="collapse navbar-collapse mobile-menu" id="mobileMenuContent">
                <nav class="nav w-100">
                    <div class="close-nav d-flex justify-content-end w-100">
                        <button class="border-0 bg-transparent" type="button" data-bs-toggle="collapse"
                                data-bs-target="#mobileMenuContent" aria-label="Close navigation">
                            <svg width="23" height="23" viewBox="0 0 23 23" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <rect y="20.5059" width="29" height="3" transform="rotate(-45 0 20.5059)"
                                      fill="#eb2d26"/>
                                <rect x="2.12134" width="29" height="3" transform="rotate(45 2.12134 0)"
                                      fill="#eb2d26"/>
                            </svg>
                        </button>
                    </div>

                    <ul class="main list-unstyled">
                        <li @click="setActiveLink('#first')" :class="{active: activeLink === '#first'}"><a
                            href="#first">Главная</a></li>
                        <li @click="setActiveLink('#tours')" :class="{active: activeLink === '#tours'}"><a
                            href="#tours">Туры дня</a></li>
                        <li @click="setActiveLink('#discount')" :class="{active: activeLink === '#discount'}"><a
                            href="#discount">Акции и скидки</a></li>
                        <li @click="setActiveLink('#travel')" :class="{active: activeLink === '#travel'}"><a
                            href="#travel">О путешествиях</a></li>
                        <li @click="setActiveLink('#reviews')" :class="{active: activeLink === '#reviews'}"><a
                            href="#reviews">Отзывы</a></li>
                        <li @click="setActiveLink('#directions')" :class="{active: activeLink === '#directions'}"><a
                            href="#directions">Наши направления</a></li>
                        <li @click="setActiveLink('#training')" :class="{active: activeLink === '#training'}"><a
                            href="#training">Обучение</a></li>
                        <li @click="setActiveLink('#team')" :class="{active: activeLink === '#team'}"><a href="#team">Команда</a>
                        </li>
                        <li @click="setActiveLink('#merch')" :class="{active: activeLink === '#merch'}"><a
                            href="#merch">Мерч</a></li>
                    </ul>
                </nav>
            </div>
        </nav>

        <div class="hero-content align-items-center container d-grid justify-content-center text-center text-uppercase">
            <h1 class="text-white fw-bold">Мы работаем чтобы</h1>
            <h1 class="text-white fw-800">вы отдыхали</h1>
        </div>

        <div class="hero-bottom container py-3 d-flex justify-content-center">
            <div class="bg-opacity-50 bg-light rounded d-flex justify-content-center"
                 style="width: 630px; height: 547px">
                СКОРО ЗДЕСЬ ЧТО-ТО БУДЕТ
            </div>
        </div>

    </section>
</template>

<script>
export default {
    name: "HeroSection",
    data() {
        return {
            activeLink: "#first"
        }
    },
    methods: {
        setActiveLink(link) {
            this.$emit('set-active-link', link);
            this.activeLink = link
        }
    }
}
</script>
