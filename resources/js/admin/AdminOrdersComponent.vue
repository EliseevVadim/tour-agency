<template>
    <section class="admin-orders-page">
        <div class="admin-orders-header">
            <h1 class="admin-orders-title">Заказы</h1>

            <div class="admin-orders-filters">
                <input v-model.trim="filters.search" type="text" class="admin-input"
                       placeholder="Поиск по номеру, имени, телефону, email" @input="debouncedFetchOrders">

                <select v-model="filters.status" class="admin-select" @change="fetchOrders">
                    <option value="">Все статусы</option>
                    <option v-if="false" value="new">Новый</option>
                    <option value="paid">Оплачен</option>
                    <option value="pending">В ожидании</option>
                    <option v-if="false" value="delivery_created">Создан в СДЭК</option>
                    <option value="closed">Закрыт</option>
                    <option v-if="false" value="cancelled">Отменён</option>
                </select>

                <select v-model="filters.delivery_mode" class="admin-select" @change="fetchOrders">
                    <option value="">Все способы доставки</option>
                    <option value="pickup">СДЭК (ПВЗ)</option>
                    <option value="door">СДЭК (Курьер)</option>
                </select>
            </div>
        </div>

        <div class="admin-orders-card">
            <div v-if="loading" class="admin-orders-empty">
                Загрузка заказов...
            </div>

            <div v-else-if="!orders.length" class="admin-orders-empty">
                Заказы не найдены
            </div>

            <div v-else class="admin-orders-table-wrapper p-4">
                <table class="admin-orders-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Номер</th>
                        <th>Дата</th>
                        <th>Заказчик</th>
                        <th>Телефон</th>
                        <th>Доставка</th>
                        <th>Статус</th>
                        <th>Сумма</th>
                        <th></th>
                    </tr>
                    </thead>

                    <tbody>
                    <admin-order-row v-for="order in orders" :key="order.id" :order="order" @open="openOrder"/>
                    </tbody>
                </table>
            </div>
        </div>

        <div v-if="pagination.last_page > 1" class="admin-pagination">
            <button class="admin-btn admin-btn-secondary" :disabled="pagination.current_page <= 1 || loading"
                    @click="changePage(pagination.current_page - 1)">
                Назад
            </button>

            <span class="admin-pagination-info">
                Страница {{ pagination.current_page }} из {{ pagination.last_page }}
            </span>

            <button class="admin-btn admin-btn-secondary"
                    :disabled="pagination.current_page >= pagination.last_page || loading"
                    @click="changePage(pagination.current_page + 1)">
                Вперёд
            </button>
        </div>

        <admin-order-detail-modal :show="showDetailModal" :order="selectedOrder" :loading="detailLoading"
                                  @close="closeOrderModal" @refresh="refreshSelectedOrder"
                                  @refresh-orders="fetchOrders"/>
    </section>
</template>

<script>
import axios from 'axios';
import AdminOrderDetailModal from "./modules/AdminOrderDetailModal.vue";
import AdminOrderRow from "./modules/AdminOrderRow.vue";

export default {
    name: 'AdminOrdersComponent',
    components: {
        AdminOrderRow,
        AdminOrderDetailModal
    },
    data() {
        return {
            loading: false,
            detailLoading: false,
            orders: [],
            selectedOrder: null,
            showDetailModal: false,
            filters: {
                search: '',
                status: '',
                delivery_mode: '',
                page: 1,
            },
            pagination: {
                current_page: 1,
                last_page: 1,
                per_page: 20,
                total: 0,
            },
            debounceTimer: null,
        };
    },
    created() {
        this.fetchOrders();
        this.openOrderFromUrl();
    },
    methods: {
        async fetchOrders() {
            this.loading = true;

            try {
                const response = await axios.get('/admin/api/orders', {
                    params: this.filters,
                });

                const payload = response.data || {};
                const data = payload.data || {};

                this.orders = data.data || [];
                this.pagination = {
                    current_page: data.current_page || 1,
                    last_page: data.last_page || 1,
                    per_page: data.per_page || 20,
                    total: data.total || 0,
                };
            } catch (error) {
                console.error('Ошибка загрузки заказов', error);
                this.orders = [];
            } finally {
                this.loading = false;
            }
        },

        debouncedFetchOrders() {
            clearTimeout(this.debounceTimer);

            this.filters.page = 1;

            this.debounceTimer = setTimeout(() => {
                this.fetchOrders();
            }, 350);
        },

        changePage(page) {
            this.filters.page = page;
            this.fetchOrders();
        },

        async openOrder(order) {
            history.replaceState(null, '', `?order=${order.id}`);

            this.showDetailModal = true;
            this.detailLoading = true;

            try {
                const response = await axios.get(`/admin/orders/${order.id}`);
                this.selectedOrder = response.data.data;
            } finally {
                this.detailLoading = false;
            }
        },

        closeOrderModal() {
            this.showDetailModal = false;
            this.selectedOrder = null;

            history.replaceState(null, '', window.location.pathname);
        },

        async refreshSelectedOrder() {
            if (!this.selectedOrder || !this.selectedOrder.id) {
                return;
            }

            this.detailLoading = true;

            try {
                const response = await axios.get(`/admin/orders/${this.selectedOrder.id}`);
                this.selectedOrder = response.data.data;
            } catch (error) {
                console.error('Ошибка обновления заказа', error);
            } finally {
                this.detailLoading = false;
            }
        },
        openOrderFromUrl() {
            const params = new URLSearchParams(window.location.search);
            const orderId = params.get('order');

            if (!orderId) {
                return;
            }

            this.openOrderById(orderId);
        },
        async openOrderById(id) {
            this.showDetailModal = true;
            this.detailLoading = true;

            try {
                const response = await axios.get(`/admin/orders/${id}`);
                this.selectedOrder = response.data.data;
            } catch (e) {
                console.error('Ошибка загрузки заказа', e);
            } finally {
                this.detailLoading = false;
            }
        }
    },
};
</script>

<style scoped>
.admin-orders-page {
    padding: 24px;
    background: #f5f7fb;
    min-height: 100vh;
}

.admin-orders-header {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 20px;
}

.admin-orders-title {
    margin: 0;
    font-size: 28px;
    font-weight: 700;
    color: #243447;
}

.admin-orders-filters {
    display: grid;
    grid-template-columns: minmax(260px, 1fr) 220px 220px;
    gap: 12px;
}

.admin-input,
.admin-select {
    width: 100%;
    height: 42px;
    padding: 0 14px;
    border: 1px solid #d7e1ec;
    border-radius: 10px;
    background: #fff;
    font-size: 14px;
}

.admin-orders-card {
    background: #fff;
    border: 1px solid #e5edf5;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 6px 24px rgba(25, 42, 70, 0.05);
}

.admin-orders-table-wrapper {
    overflow-x: auto;
}

.admin-orders-table {
    width: 100%;
    border-collapse: collapse;
}

.admin-orders-table th,
.admin-orders-table td {
    padding: 14px 16px;
    border-bottom: 1px solid #edf2f7;
    text-align: left;
    font-size: 14px;
    white-space: nowrap;
}

.admin-orders-table th {
    background: #f8fbff;
    color: #58708a;
    font-weight: 600;
}

.admin-orders-empty {
    padding: 32px;
    text-align: center;
    color: #6c8198;
}

.admin-pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-top: 20px;
}

.admin-pagination-info {
    color: #516579;
    font-size: 14px;
}

.admin-btn {
    height: 40px;
    padding: 0 16px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-size: 14px;
}

.admin-btn-secondary {
    background: #eaf1f8;
    color: #27425d;
}

.admin-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

@media (max-width: 900px) {
    .admin-orders-filters {
        grid-template-columns: 1fr;
    }
}
</style>
