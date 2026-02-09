<template>
    <div class="promo-content">
        <div class="promo-text-block">
            <h2>{{ promoData.title }}</h2>
            <h3 class="pb-2">{{ promoData.description }}</h3>
            <a :href="promoData.url" target="_blank" class="btn-cta btn-open">
                <span class="flare"></span>
                посмотреть
            </a>
        </div>
        <img :src="promoData.imageUrl" :alt="promoData.title" class="promo-image">
    </div>
</template>

<script>
export default {
    name: 'PromoBlock',
    props: {
        promoData: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped lang="scss">
.promo-content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 75px auto;
    box-sizing: border-box;
}

.promo-text-block {
    width: 95%;
    position: relative;
    background: white;
    box-shadow: 0 0 46.4px 7.6px rgba(0, 0, 0, 0.2);
    border-radius: 41px;
    padding: 61px 40px 19px 38px;
    overflow: hidden;

    &:before {
        content: "";
        width: 100%;
        height: 5px;
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: #EB2D26FF;
    }
}

.promo-image {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    max-width: 240px;
    width: 25%;
    height: auto;
    margin: auto 0;
    z-index: 1;
    filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.18));

}

@media (max-width: 768px) {
    .promo-content {
        flex-direction: column;
        margin-top: 30px;
        margin-bottom: 30px;
        padding: 15px;
    }

    .promo-text-block {
        padding: 40px 20px 20px 30px;
        width: 100%;
        max-width: 100%;
        margin-bottom: 20px;
    }

    .promo-image {
        position: absolute;
        max-width: 180px;
        top: 58%;
        width: 20%;
        margin: 0 auto;
    }
}

@media (max-width: 500px) {
    .promo-text-block {
        padding: 30px 15px 15px 15px;
        border-radius: 20px;
    }
    h2 {
        font-size: 1.5em;
    }
    h3 {
        font-size: 1rem;
    }
    .btn-cta {
        padding: 8px 15px;
        font-size: 0.9em;
    }
}
</style>
