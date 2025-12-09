<template>
    <div class="course-page">
        <app-header class="hero-section_dark"></app-header>

        <course-hero></course-hero>
        <target-audience-list></target-audience-list>
        <course-modules-summary></course-modules-summary>
        <pricing-selector></pricing-selector>
        <travel-directions-section :is-show-coconut="false" title="Смотри видео"
                                   title-style="text-uppercase fw-800"></travel-directions-section>
        <faq-or-contact></faq-or-contact>

        <app-footer></app-footer>
    </div>
</template>

<script setup>

import TravelDirectionsSection from "../../components/TravelDirectionsSection.vue";
</script>

<style scoped>

</style>
