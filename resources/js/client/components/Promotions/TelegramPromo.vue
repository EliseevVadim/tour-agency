<template>
    <section class="promo-telegram">
        <div class="leaf-background leaf-left"></div>

        <div class="container-fluid container-xl promo-content">
            <div class="text-block">
                <h2 class="fw-bold">Горящие туры, акции и скидки</h2>
                <h3 class="mb-3">можно посмотреть у нас в Telegram</h3>
                <a href="https://t.me/ваш_telegram_канал" target="_blank" class="btn btn-cta btn-open rounded-3">посмотреть</a>
            </div>

            <div class="phone-mockup-container">
                <div class="phone-mockup">
                    <img src="/img/phone-screen.png" alt="Telegram Channel Preview" class="phone-screen">
                    <div class="floating-card card-1 d-none d-sm-block">
                        <div class="card-wrapper"></div>
                        <img src="/img/promotions/card-1.png" alt="Tbilisi Tower">
                        <span class="card-title">Pullman Tbilisi Axis Towers 5*</span>
                    </div>

                    <div class="floating-card card-2">
                        <div class="card-wrapper"></div>
                        <img src="/img/promotions/card-2.png" alt="Seychelles Resort">
                        <span class="card-title">Four Seasons Resort Seychelles 5*</span>
                    </div>

                    <div class="floating-card card-3">
                        <div class="card-wrapper"></div>
                        <img src="/img/promotions/card-3.png" alt="A.V. Sokol">
                        <span class="card-title">A.V. Sokol 4*</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "TelegramPromo",
}
</script>
