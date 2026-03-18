<template>
    <section class="admin-sales-page">
        <div class="admin-sales-header">
            <div class="admin-sales-tabs">
                <a href="/admin/orders" class="admin-sales-tab" :class="{ active: activeTab === 'orders' }">
                    Заказы
                </a>

                <a href="/admin/shop-promo-codes" class="admin-sales-tab" :class="{ active: activeTab === 'promo-codes' }">
                    Промокоды
                </a>
            </div>
        </div>

        <div class="admin-sales-content">
            <slot />
        </div>
    </section>
</template>

<script>
export default {
    name: 'AdminSalesLayout',
    props: {
        activeTab: {
            type: String,
            default: 'orders',
        }
    },
};
</script>

<style scoped>
.admin-sales-page {
    padding: 24px;
    background: #f5f7fb;
    min-height: 100vh;
}

.admin-sales-header {
    margin-bottom: 20px;
}

.admin-sales-tab {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 42px;
    padding: 0 18px;
    border-radius: 10px;
    border: 1px solid #d7e1ec;
    background: #fff;
    color: #516579;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease;
}

.admin-sales-tab.active {
    background: #27425d;
    border-color: #27425d;
    color: #fff;
}
</style>
