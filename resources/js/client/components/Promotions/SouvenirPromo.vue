<template>
    <section class="promo-souvenir position-relative">
        <div class="juice-background juice-left"></div>

        <div class="container-fluid container-xl promo-content">
            <div class="text-block position-relative">
                <h2>Наша атрибутика</h2>
                <h3 class="mb-3">выбери свою</h3>
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
    mounted() {
        document.addEventListener('scroll', showAnimation);

        function showAnimation() {
            const sectionPromo = document.querySelector('.promo-souvenir');
            const textBlock = document.querySelector('.promo-souvenir .text-block');
            const souvenirMockup = document.querySelector('.souvenir-mockup');

            console.log(textBlock)

            const rect = sectionPromo.getBoundingClientRect();
            const isVisible =
                rect.top < window.innerHeight * (1 - 0.3) && rect.bottom > window.innerHeight * 0.3;
            if (!isVisible) return;

            textBlock.classList.add('animate__animated', 'animate__fadeInLeft', 'animate__slow');
            souvenirMockup.classList.add('animate__animated', 'animate__fadeIn', 'animate__slow', 'animate__delay-1-5s');
        }
    }
}
</script>
