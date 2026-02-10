<template>
    <div class="course-page">
        <div class="loader" v-if="loading">
            <div class="loader__dot"></div>
            <div class="loader__dot"></div>
            <div class="loader__dot"></div>
        </div>

        <notification-modal v-if="isNotificationVisible"
                            :data="notificationData"
                            :is-success="!!notificationData && !!notificationData.title.includes('Добро пожаловать')"
                            @close="isNotificationVisible = false"></notification-modal>

        <app-header class="hero-section_dark"></app-header>

        <course-hero></course-hero>
        <target-audience-section></target-audience-section>
        <course-modules-summary></course-modules-summary>
        <pricing-selector ref="pricingSelector"></pricing-selector>
        <preview-gallery-section @open-pricing-package="handleOpenPricing"></preview-gallery-section>
        <faq-or-contact></faq-or-contact>

        <app-footer></app-footer>
    </div>
</template>

<script>
import NotificationModal from "../../modals/NotificationModal.vue";
import PreviewGallerySection from "../../components/Fragments/PreviewGallerySection.vue";
import PricingSelector from "./components/PricingSelector.vue";
import CourseModulesSummary from "./components/CourseModulesSummary.vue";
import CourseHero from "./components/CourseHero.vue";
import TargetAudienceSection from "./components/TargetAudienceList.vue";
import FaqOrContact from "./components/FaqOrContact.vue";

export default {
    components: {
        FaqOrContact,
        TargetAudienceSection,
        CourseHero, CourseModulesSummary, PricingSelector, PreviewGallerySection, NotificationModal},
    data() {
        return {
            loading: true,
            notificationData: null,
            isNotificationVisible: false,
        }
    },
    props: {
        initialSuccessData: {
            type: Object,
            default: () => null
        },
        initialFailData: {
            type: Object,
            default: () => null
        }
    },
    methods: {
        handleOpenPricing(packageId) {
            if (this.$refs.pricingSelector) {
                this.$refs.pricingSelector.togglePackageFromGallery(packageId);

            }
        },
        initializeNotifications() {
            if (this.initialSuccessData && Object.keys(this.initialSuccessData).length > 0) {
                this.notificationData = this.initialSuccessData;
                this.isNotificationVisible = true;
            } else if (this.initialFailData && Object.keys(this.initialFailData).length > 0) {
                this.notificationData = this.initialFailData;
                this.isNotificationVisible = true;
            } else if(localStorage.getItem('notification')) {
                this.notificationData = JSON.parse(localStorage.getItem('notification'));
                this.isNotificationVisible = true;
                localStorage.removeItem('notification');
            }

            if (this.isNotificationVisible) {
                this.loading = false;
            }
        }
    },
    created() {
        this.initializeNotifications();
    },
    mounted() {
        if (!this.isNotificationVisible) {
            setTimeout(() => {
                this.loading = false;
            }, 1000);
        }
    }
}
</script>
