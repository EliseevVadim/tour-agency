<template>
    <section class="promo-training-section position-relative">
        <div class="skewed-background"></div>
        <div class="container-fluid container-xl promo-training-container flex-wrap justify-content-center">
            <div class="promo-image position-relative">
                <div class="expert-background-container">
                    <img src="/img/experts-bg.png" alt="Фон" class="expert-background" />
                </div>
                <img src="/img/experts.png" alt="Эксперты" class="expert-png"/>
            </div>
            <div class="promo-content" @click="goToLink('/courses')">
                <h2 class="promo-title"><span>Профессиональный</span> курс</h2>
                <p class="promo-description">Наш авторский курс для людей которые хотят работать в сфере туризма на
                    полную или частичную занятость, или путешествовать с огромными скидками.</p>
                <a href="/courses" @click.stop class="btn btn-cta btn-open rounded-3">
                    <span class="flare"></span>
                    посмотреть
                </a>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "TrainingPromo",
    methods: {
        goToLink(link) {
            window.location.href = link;
        },
    }
}
</script>
