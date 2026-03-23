<template>
    <div v-if="show" class="order-modal-overlay" @click.self="$emit('close')">
        <div class="order-modal">
            <div class="order-modal-header">
                <div>
                    <h2 class="order-modal-title">
                        Заказ {{ order ? order.number : '' }}
                    </h2>
                    <div v-if="order" class="order-modal-subtitle">
                        ID: {{ order.id }}
                    </div>
                </div>

                <button class="order-modal-close" @click="$emit('close')">×</button>
            </div>

            <div v-if="loading" class="order-modal-loading">
                Загрузка...
            </div>

            <div v-else-if="order" class="order-modal-body">
                <div class="order-grid">
                    <section class="order-block">
                        <h3>Основное</h3>

                        <div class="order-info-row"><span>Создан:</span><strong>{{ formatDate(order.created_at) }}</strong></div>
                        <div class="order-info-row"><span>Статус:</span><strong>{{  statusLabel(order.status) }}</strong></div>
                        <div class="order-info-row"><span>Заказчик:</span><strong>{{ order.customer_name || '—' }}</strong></div>
                        <div class="order-info-row"><span>Телефон:</span><strong>{{ order.customer_phone || '—' }}</strong></div>
                        <div class="order-info-row"><span>Email:</span><strong>{{ order.customer_email || '—' }}</strong></div>
                    </section>

                    <section class="order-block">
                        <h3>Доставка</h3>

                        <div class="order-info-row"><span>Служба:</span><strong>{{ deliveryModeLabel(order.delivery_mode) }}</strong></div>
                        <div class="order-info-row"><span>Город:</span><strong>{{ order.city || '—' }}</strong></div>
                        <div class="order-info-row"><span>ПВЗ:</span><strong>{{ order.pickup_point_code || '—' }}</strong></div>
                        <div class="order-info-row"><span>Адрес ПВЗ:</span><strong>{{ order.pickup_point_address || '—' }}</strong></div>
                    </section>
                </div>

                <section class="order-block">
                    <h3>Позиции по заказу</h3>

                    <div class="order-items-table-wrapper">
                        <table class="order-items-table">
                            <thead>
                            <tr>
                                <th>Артикул</th>
                                <th>Название</th>
                                <th>Атрибуты</th>
                                <th>Кол-во</th>
                                <th>Цена</th>
                                <th>Вес</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item, index) in normalizedItems" :key="index">
                                <td>{{ item.sku }}</td>
                                <td>{{ item.name }}</td>
                                <td>
                                    <div class="order-attrs">
                                        <div v-for="(attr, attrIndex) in item.attributes"
                                            :key="attrIndex" class="order-attr-chip">
                                            {{ attr.label }}: {{ attr.value }}
                                        </div>
                                    </div>
                                </td>
                                <td>{{ item.quantity }}</td>
                                <td>{{ formatMoney(item.price) }}</td>
                                <td>{{ item.weight }}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section class="order-block order-summary">
                    <h3>Стоимость</h3>

                    <div class="order-info-row"><span>Стоимость доставки:</span><strong>{{ formatMoney(order.delivery_price) }}</strong></div>
                    <div class="order-info-row"><span>Полная стоимость заказа:</span><strong>{{ formatMoney(order.items_price) }}</strong></div>
                </section>
            </div>

            <div class="order-modal-footer justify-content-between">
                <div class="d-flex gap-3">
                    <a v-if="order && order.status !== 'closed'" class="footer-link" :href="`/api/delivery/orders/${order.id}/download-barcode`"
                       target="_blank">
                        Скачать документы
                    </a>

                    <a v-if="order && order.status !== 'closed'" class="footer-link" @click="closeOrder">
                        Закрыть заказ
                    </a>
                </div>

                <button class="footer-btn" @click="$emit('close')">
                    Закрыть
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AdminOrderDetailModal',
    props: {
        show: Boolean,
        order: Object,
        loading: Boolean,
    },
    computed: {
        normalizedItems() {
            const items = Array.isArray(this.order?.items) ? this.order.items : [];

            return items.map(item => {
                const labels = item.attribute_names || {};
                const reserved = [
                    'id',
                    'product_id',
                    'sku',
                    'name',
                    'product_name',
                    'qty',
                    'quantity',
                    'price',
                    'cost',
                    'old_price',
                    'amount',
                    'payment_value',
                    'weight',
                    'length',
                    'width',
                    'height',
                    'stock_qty',
                    'images',
                    'description',
                    'category_slug',
                    'attributes',
                    'attribute_names',
                ];

                const attributes = [];

                Object.keys(item).forEach(key => {
                    if (reserved.includes(key)) {
                        return;
                    }

                    const value = item[key];

                    if (value === null || value === '' || Array.isArray(value) || typeof value === 'object') {
                        return;
                    }

                    attributes.push({
                        label: labels[key] || this.humanizeKey(key),
                        value: value,
                    });
                });

                return {
                    sku: item.sku || '—',
                    name: item.name || item.product_name || '—',
                    quantity: item.quantity || item.amount || 1,
                    price: item.price || item.cost || 0,
                    weight: item.weight || 0,
                    attributes,
                };
            });
        },
    },
    methods: {
        formatDate(value) {
            if (!value) return '—';

            try {
                return new Date(value).toLocaleString('ru-RU');
            } catch (e) {
                return value;
            }
        },
        formatMoney(value) {
            const number = Number(value || 0);

            return new Intl.NumberFormat('ru-RU', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(number) + ' р.';
        },
        statusLabel(status) {
            const map = {
                new: 'Новый',
                paid: 'Оплачен',
                delivery_created: 'Создан в СДЭК',
                closed: 'Закрыт',
                cancelled: 'Отменён',
            };

            return map[status] || status || '—';
        },
        deliveryModeLabel(mode) {
            const map = {
                pickup: 'СДЭК (ПВЗ)',
                door: 'СДЭК (Курьер)',
            };

            return map[mode] || mode || '—';
        },
        humanizeKey(key) {
            return String(key || '')
                .replace(/_/g, ' ')
                .replace(/^\w/, s => s.toUpperCase());
        },
        async closeOrder() {
            if (!this.order) {
                return;
            }
            if (!confirm('Закрыть заказ?')) {
                return;
            }

            try {

                const response = await axios.post(
                    `/admin/api/orders/${this.order.id}/close`
                );
                alert(response.data.message || 'Заказ закрыт');
                this.$emit('refresh');
                this.$emit('refresh-orders');

            } catch (e) {
                const message =
                    e?.response?.data?.errors?.[0] ||
                    e?.response?.data?.message ||
                    'Ошибка закрытия заказа';
                alert(message);
            }
        }
    },
};
</script>

<style scoped>
.order-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(16, 24, 40, 0.48);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 32px 20px;
    z-index: 1000;
    overflow-y: auto;
}

.order-modal {
    width: 100%;
    max-width: 1100px;
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 16px 60px rgba(8, 29, 58, 0.2);
    overflow: hidden;
}

.order-modal-header,
.order-modal-footer {
    padding: 20px 24px;
    border-bottom: 1px solid #edf2f7;
}

.order-modal-footer {
    border-top: 1px solid #edf2f7;
    border-bottom: none;
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    align-items: center;
}

.order-modal-title {
    margin: 0;
    font-size: 24px;
    font-weight: 700;
}

.order-modal-subtitle {
    margin-top: 6px;
    color: #66788a;
    font-size: 13px;
}

.order-modal-close {
    border: none;
    background: transparent;
    font-size: 28px;
    cursor: pointer;
    line-height: 1;
}

.order-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.order-modal-body {
    padding: 24px;
}

.order-modal-loading {
    padding: 32px 24px;
}

.order-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
}

.order-block {
    margin-bottom: 18px;
    padding: 18px;
    border: 1px solid #e6eef6;
    border-radius: 14px;
    background: #fbfdff;
}

.order-block h3 {
    margin: 0 0 14px;
    font-size: 16px;
}

.order-info-row {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding: 8px 0;
    border-bottom: 1px dashed #e8eef5;
}

.order-info-row:last-child {
    border-bottom: none;
}

.order-info-row span {
    color: #64778b;
}

.order-items-table-wrapper {
    overflow-x: auto;
}

.order-items-table {
    width: 100%;
    border-collapse: collapse;
}

.order-items-table th,
.order-items-table td {
    padding: 12px;
    border-bottom: 1px solid #edf2f7;
    text-align: left;
    vertical-align: top;
}

.order-items-table th {
    background: #f2f8fd;
}

.order-attrs {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.order-attr-chip {
    padding: 6px 10px;
    border-radius: 999px;
    background: #edf5ff;
    color: #2f5f96;
    font-size: 12px;
}

.footer-btn {
    height: 40px;
    padding: 0 16px;
    border-radius: 10px;
    border: 1px solid #d8e3ef;
    background: #fff;
    cursor: pointer;
}

.footer-btn-primary {
    background: #2e6fcb;
    border-color: #2e6fcb;
    color: #fff;
}

.footer-link {
    margin-right: auto;
    color: #2c66b0;
    text-decoration: none;
}

@media (max-width: 900px) {
    .order-grid {
        grid-template-columns: 1fr;
    }

    .order-modal-footer {
        flex-wrap: wrap;
        justify-content: stretch;
    }

    .footer-link {
        width: 100%;
        margin-right: 0;
    }
}
</style>
