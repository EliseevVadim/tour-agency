<template>
    <section class="promo-souvenir position-relative">
        <div class="juice-background juice-left"></div>

        <div class="promo-content position-relative container">
            <div class="text-block">
                <h2>Наш мерч</h2>
                <h3 class="mb-3">выбери свой любимый</h3>
                <a href="https://t.me/ваш_telegram_канал" target="_blank" class="btn btn-cta btn-open rounded-3">посмотреть</a>
            </div>

            <div class="d-flex flex-fill justify-content-end position-relative souvenir-mockup z-1">
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
