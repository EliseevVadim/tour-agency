<template>
    <div class="tour-store">
        <notifications group="notification" position="top left" />

        <app-header class="hero-section-absolute hero-section_dark"></app-header>

        <main class="content-wrapper container-xl">
            <section class="category-filters">
                <NavigationTabs />
            </section>

            <ProductList />
        </main>

        <app-footer></app-footer>
    </div>
</template>

<script>

import ProductList from "./components/ProductList.vue";
import NavigationTabs from "./components/NavigationTabs.vue";
import eventBus from "../../../event-bus";

export default {
    name: 'MerchStore',
    components: {NavigationTabs, ProductList},
    async mounted() {
        const url = new URL(window.location.href);
        const isPaymentReturn = url.searchParams.get('payment_return') === '1';

        if (!isPaymentReturn) {
            return;
        }

        const pendingOrderId = localStorage.getItem('pendingPaymentOrderId');

        if (!pendingOrderId) {
            return;
        }

        try {
            const response = await axios.get(`/api/delivery/orders/${pendingOrderId}/status`);
            const data = response && response.data ? response.data.data : null;

            if (data && data.payment_status === 'paid') {
                localStorage.removeItem('shoppingCart');
                localStorage.removeItem('pendingPaymentOrderId');
                eventBus.$emit('cart:cleared');

                if (this.$notify) {
                    this.$notify({
                        group: 'notification',
                        type: 'success',
                        title: 'Оплата прошла успешно',
                        text: 'Спасибо за заказ!'
                    });
                }
            }
        } catch (e) {
            console.error('Failed to check order payment status', e);
        }
    }
}
</script>
