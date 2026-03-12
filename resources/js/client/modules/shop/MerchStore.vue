<template>
    <div class="tour-store">
        <notifications group="notification" position="top left"/>
        <payment-result-modal
            :is-visible="paymentResultModal.visible"
            :success="paymentResultModal.success"
            @close="closePaymentResultModal"
        />

        <app-header class="hero-section-absolute hero-section_dark"></app-header>

        <main class="content-wrapper container-xl">
            <section class="category-filters">
                <NavigationTabs/>
            </section>

            <ProductList/>
        </main>

        <app-footer></app-footer>
    </div>
</template>

<script>
import ProductList from "./components/ProductList.vue";
import NavigationTabs from "./components/NavigationTabs.vue";
import eventBus from "../../../event-bus";
import PaymentResultModal from "../../modals/ProductNotificationModal.vue";

const CART_STORAGE_KEY = 'shoppingCart';
const PENDING_PAYMENT_ORDER_ID_KEY = 'pendingPaymentOrderId';

export default {
    name: 'MerchStore',
    components: { PaymentResultModal, NavigationTabs, ProductList },

    data() {
        return {
            paymentResultModal: {
                visible: false,
                success: false,
                title: '',
                text: '',
            },
        };
    },

    async mounted() {
        await this.restorePaidOrderState();
    },

    methods: {
        async restorePaidOrderState() {
            const orderId = localStorage.getItem(PENDING_PAYMENT_ORDER_ID_KEY);
            const url = new URL(window.location.href);
            const isPaymentReturn = url.searchParams.get('payment_return') === '1';

            if (!orderId) {
                this.clearPaymentReturnQuery();
                return;
            }

            try {
                const response = await axios.get(`/api/delivery/orders/${orderId}/status`);
                const data = response && response.data ? response.data.data : null;

                if (!data) {
                    if (isPaymentReturn) {
                        this.clearPendingPayment();
                        this.openPaymentErrorModal();
                    }
                    return;
                }

                if (data.payment_status === 'paid') {
                    localStorage.removeItem(CART_STORAGE_KEY);
                    this.clearPendingPayment();
                    eventBus.$emit('cart:cleared');
                    this.openPaymentSuccessModal();
                    return;
                }

                if (data.payment_status === 'canceled') {
                    this.clearPendingPayment();
                    this.openPaymentErrorModal();
                    return;
                }

                if (isPaymentReturn && data.payment_status !== 'paid') {
                    this.openPaymentErrorModal();
                }
            } catch (e) {
                console.error('Failed to check payment status', e);

                if (isPaymentReturn) {
                    this.openPaymentErrorModal();
                }
            } finally {
                this.clearPaymentReturnQuery();
            }
        },

        clearPendingPayment() {
            localStorage.removeItem(PENDING_PAYMENT_ORDER_ID_KEY);
        },

        openPaymentSuccessModal() {
            this.paymentResultModal = {
                visible: true,
                success: true,
                title: 'Спасибо за покупку!',
                text: 'Заказ успешно оплачен. Отправка заказов осуществляется еженедельно в понедельник и четверг. По дополнительным вопросам обращайтесь в службу поддержки.',
            };
        },

        openPaymentErrorModal() {
            this.paymentResultModal = {
                visible: true,
                success: false,
                title: 'Оплата не завершена',
                text: 'Мы не получили подтверждение успешной оплаты. Попробуйте снова и, при необходимости, обратитесь в службу поддержки.',
            };
        },

        closePaymentResultModal() {
            this.paymentResultModal.visible = false;
        },

        clearPaymentReturnQuery() {
            const url = new URL(window.location.href);

            if (!url.searchParams.has('payment_return')) {
                return;
            }

            url.searchParams.delete('payment_return');
            window.history.replaceState({}, document.title, url.pathname + url.search);
        },
    }
}
</script>
