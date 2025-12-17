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
        <target-audience-list></target-audience-list>
        <course-modules-summary></course-modules-summary>
        <pricing-selector></pricing-selector>
        <travel-directions-section :is-show-coconut="false" title="Смотри видео"
                                   title-style="text-uppercase fw-800"></travel-directions-section>
        <faq-or-contact></faq-or-contact>

        <app-footer></app-footer>
    </div>
</template>

<script>
import NotificationModal from "../../modals/NotificationModal.vue";
import TravelDirectionsSection from "../../components/TravelDirectionsSection.vue";

export default {
    components: {NotificationModal, TravelDirectionsSection},
    data() {
        return {
            loading: true,
            notificationData: null,
            isNotificationVisible: false,
            isSuccessType: false
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
    created() {
        if (this.initialSuccessData && Object.keys(this.initialSuccessData).length > 0) {
            this.notificationData = this.initialSuccessData;
            this.isSuccessType = true;
            this.isNotificationVisible = true;
        } else if (this.initialFailData && Object.keys(this.initialFailData).length > 0) {
            this.notificationData = this.initialFailData;
            this.isSuccessType = false;
            this.isNotificationVisible = true;
        } else if(localStorage.getItem('notification')) {
            const notification = JSON.parse(localStorage.getItem('notification'));
            this.notificationData = notification;
            this.isSuccessType = true;
            this.isNotificationVisible = true;
            console.log('Notification loaded from localStorage:', notification);

            localStorage.removeItem('notification');
            console.log('Notification removed from localStorage.');
        }

        if (this.isNotificationVisible) {
            this.loading = false;
        }
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
