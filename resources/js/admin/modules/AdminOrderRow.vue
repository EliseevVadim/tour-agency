<template>
    <tr>
        <td>{{ order.id }}</td>
        <td>{{ order.number }}</td>
        <td>{{ formatDate(order.created_at) }}</td>
        <td>{{ order.customer_name || '—' }}</td>
        <td>{{ order.customer_phone || '—' }}</td>
        <td>{{ deliveryModeLabel(order.delivery_mode) }}</td>
        <td>
            <span class="status-badge" :class="'status-' + (order.status || 'default')">
                {{ statusLabel(order.status) }}
            </span>
        </td>
        <td>{{ formatMoney(order.items_price) }}</td>
        <td>
            <div class="row-actions">
                <button class="row-btn" @click="$emit('open', order)">Открыть</button>
            </div>
        </td>
    </tr>
</template>

<script>
export default {
    name: 'AdminOrderRow',
    props: {
        order: {
            type: Object,
            required: true,
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
                delivery_created: 'Создан',
                cancelled: 'Отменён',
                closed: 'Закрыт',
                pending: 'В ожидании'
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
    },
};
</script>

<style scoped>
.row-actions {
    display: flex;
    gap: 8px;
}

.row-btn {
    height: 34px;
    padding: 0 12px;
    border: 1px solid #d6e2ee;
    background: #fff;
    border-radius: 8px;
    cursor: pointer;
}

.row-btn-accent {
    background: #eef6ff;
    color: #1f5ea8;
    border-color: #cfe2fa;
}

.status-badge {
    display: inline-flex;
    align-items: center;
    padding: 6px 10px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
}

.status-new {
    background: #f3f6fb;
    color: #52657a;
}

.status-paid {
    background: #e7f8ec;
    color: #20854b;
}

.status-pending {
    background: #fffbfa;
    color: #ff6228;
}

.status-delivery_created {
    background: #e8f1ff;
    color: #2359a8;
}

.status-closed {
    background: #fdecec;
    color: #ba3131;
}
</style>
