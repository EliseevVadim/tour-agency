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
                <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent"
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
}
</script>
