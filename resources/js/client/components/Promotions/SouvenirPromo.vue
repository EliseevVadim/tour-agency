<template>
    <section class="promo-souvenir position-relative">
        <div class="juice-background juice-left"></div>

        <div class="container-fluid container-xl promo-content">
            <div class="text-block position-relative">
                <h2>Наш мерч</h2>
                <h3 class="mb-3">выбери свой любимый</h3>
                <a href="https://t.me/ваш_telegram_канал" target="_blank" class="btn btn-cta btn-open rounded-3">посмотреть</a>
            </div>

            <div class="d-flex justify-content-end position-absolute souvenir-mockup z-1 w-100">
                <img src="/img/merch/merch-cap.png" alt="Merch Cap" class="merch-cap">
                <img src="/img/merch/merch-tshirt.png" alt="Merch Tshirt" class="merch-tsirt">
                <img src="/img/merch/merch-case.png" alt="Merch Case" class="merch-case">
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "SouvenirPromo",
}
</script>
