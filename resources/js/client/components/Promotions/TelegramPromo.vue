<template>
    <section class="promo-telegram">
        <div class="leaf-background leaf-left"></div>

        <div class="container-fluid container-xl promo-content">
            <div class="text-block animate__animated" ref="textBlock" @click="goToLink('https://t.me/put_club')">
                <h2 class="fw-bold">Акции и скидки</h2>
                <h3 class="mb-3">можно посмотреть у нас в Telegram</h3>
                <a href="https://t.me/put_club" @click.stop target="_blank" rel="noopener noreferrer"
                   class="btn btn-cta btn-open rounded-3">
                    <span class="flare"></span>
                    посмотреть
                </a>
            </div>

            <div class="phone-mockup-container" ref="phoneContainer">
                <div class="phone-mockup">
                    <img src="/img/phone-screen.png" alt="Telegram Channel Preview"
                         class="phone-screen animate__animated" ref="phoneScreen">

                    <div class=" animate__animated animate__slower card-1 d-none d-sm-block floating-card"
                         ref="floatingCard1">
                        <div class="card-wrapper"></div>
                        <img src="/img/promotions/card-1.png" alt="Tbilisi Tower">
                        <span class="card-title">Pullman Tbilisi Axis Towers 5*</span>
                    </div>

                    <div class=" animate__animated animate__slower floating-card card-2" ref="floatingCard2">
                        <div class="card-wrapper"></div>
                        <img src="/img/promotions/card-2.png" alt="Seychelles Resort">
                        <span class="card-title">Four Seasons Resort Seychelles 5*</span>
                    </div>

                    <div class=" animate__animated animate__slower floating-card card-3" ref="floatingCard3">
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
    data() {
        return {
            threshold: 0.1,
        };
    },
    methods: {
        goToLink(link) {
            window.location.href = link;
        },
        checkVisibilityDiscount() {
            const phoneContainer = this.$refs.phoneContainer;
            if (!phoneContainer) return;
            const rect = phoneContainer.getBoundingClientRect();
            const isVisible =
                rect.top < window.innerHeight * (1 - this.threshold) && rect.bottom > window.innerHeight * this.threshold;

            if (!isVisible) return;

            window.removeEventListener('scroll', this.checkVisibilityDiscount);

            const phoneScreen = this.$refs.phoneScreen;
            const textBlock = this.$refs.textBlock;

            if (phoneScreen) {
                phoneScreen.classList.add('animate__fadeIn', 'animate__fast');
            }
            if (textBlock) {
                textBlock.classList.add('animate__fadeInLeft', 'animate__slower');
            }

            const floatingCards = [
                this.$refs.floatingCard1,
                this.$refs.floatingCard2,
                this.$refs.floatingCard3
            ].filter(card => card);

            floatingCards.forEach(async (card) => {
                let animationClass = '';
                if (card.classList.contains('card-1') || card.classList.contains('card-3')) {
                    animationClass = 'animate__fadeInLeft';
                } else if (card.classList.contains('card-2')) {
                    animationClass = 'animate__fadeInRight';
                }

                if (animationClass) {
                    card.classList.add(animationClass);
                }

                await new Promise(resolve => {
                    const listener = (e) => {
                        if (e.target === card && (e.animationName.includes('fadeInLeft') || e.animationName.includes('fadeInRight'))) {
                            card.removeEventListener('animationend', listener);
                            resolve();
                        }
                    };
                    card.addEventListener('animationend', listener);
                });

                card.classList.add('is-active', 'opacity-100');
            });
        }
    },
    mounted() {
        window.addEventListener('scroll', this.checkVisibilityDiscount);
        this.checkVisibilityDiscount();
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.checkVisibilityDiscount);
    }
}
</script>
<style>
.promo-content {
    cursor: pointer;
}
</style>
