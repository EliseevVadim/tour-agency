<template>
    <div class="tour-store">
        <app-header class="hero-section-absolute"></app-header>

        <div class="tour-store__container">
            <div class="tour-store__content">
                <h3 class="fw-bold">Здесь скоро будет магазин с нашем мерчем, а пока можете
                    <a href="/" target="_blank" class="text-white">заказать у нас тур</a>
                </h3>
            </div>
        </div>

        <app-footer class="footer__wrapper"></app-footer>
    </div>
</template>

<script setup>

</script>
<style scoped>
.tour-store {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: linear-gradient(90deg, #dd0024 0%, #fb6228 100%);

    &__container {
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        overflow-y: auto;
    }

    &__content {
        text-align: center;
        color: white;
    }
}
</style>
