<template>
    <admin-sales-layout active-tab="promo-codes">
        <div class="container">

            <div class="admin-promo-create-card">
                <div class="admin-promo-create-head">
                    <div>
                        <h3 class="admin-promo-create-title">Создать промокод</h3>
                        <p class="admin-promo-create-subtitle">
                            Общий промокод со скидкой в процентах и лимитом использований
                        </p>
                    </div>
                </div>

                <form class="admin-promo-create-form" @submit.prevent="createPromoCode">
                    <div class="admin-promo-create-grid">
                        <div class="admin-promo-field">
                            <label class="admin-promo-label">Скидка</label>

                            <div class="admin-promo-input-wrap">
                                <input v-model.number="createForm.discount_percent" type="number" min="1" max="100"
                                       class="admin-input" placeholder="Например: 15" required>
                                <span class="admin-promo-suffix">%</span>
                            </div>

                            <div class="admin-promo-hint">Только процентная скидка</div>
                        </div>

                        <div class="admin-promo-field">
                            <label class="admin-promo-label">Лимит использований</label>

                            <input v-model.number="createForm.max_usages" type="number" min="0" class="admin-input"
                                   placeholder="Например: 50">

                            <div class="admin-promo-hint">0 или пусто — без ограничений</div>
                        </div>

                        <div class="admin-promo-field admin-promo-field-submit">
                            <button type="submit" class="admin-btn admin-btn-primary" :disabled="createLoading">
                                {{ createLoading ? 'Создание...' : 'Создать промокод' }}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <div class="admin-promo-filters d-flex justify-content-end">
                <select v-model="filters.status" class="admin-select w-auto" @change="onFilterChange">
                    <option value="">Все статусы</option>
                    <option value="active">Активен</option>
                    <option value="non_active">Отключен</option>
                    <option value="limit_reached">Лимит исчерпан</option>
                </select>
            </div>

            <div class="admin-promo-summary" v-if="!loading && promoCodes.length">
                <div class="admin-summary-card">
                    <div class="admin-summary-label">Всего на странице</div>
                    <div class="admin-summary-value">{{ promoCodes.length }}</div>
                </div>

                <div class="admin-summary-card">
                    <div class="admin-summary-label">Активные</div>
                    <div class="admin-summary-value">{{ activeCount }}</div>
                </div>

                <div class="admin-summary-card">
                    <div class="admin-summary-label">Лимит исчерпан</div>
                    <div class="admin-summary-value">{{ limitReachedCount }}</div>
                </div>
            </div>

            <div class="admin-orders-card">
                <div v-if="loading" class="admin-orders-empty">
                    Загрузка промокодов...
                </div>

                <div v-else-if="!promoCodes.length" class="admin-orders-empty">
                    Промокоды не найдены
                </div>

                <div v-else class="admin-orders-table-wrapper p-4">
                    <table class="admin-orders-table table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Код</th>
                            <th>Скидка</th>
                            <th>Использовано</th>
                            <th>Лимит</th>
                            <th>Осталось</th>
                            <th>Статус</th>
                            <th>Активность</th>
                            <th></th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr v-for="promo in promoCodes" :key="promo.id"
                            :class="{ 'promo-row-inactive': isInactive(promo) }">
                            <td>{{ promo.id }}</td>

                            <td>
                                <div class="promo-code-box">
                                    <div class="promo-code-value">{{ promo.code }}</div>
                                    <div class="promo-code-subtext">Общий промокод</div>
                                </div>
                            </td>

                            <td>
                                <span class="promo-discount-badge">
                                    {{ getDiscountText(promo) }}
                                </span>
                            </td>

                            <td>{{ getUsageCount(promo) }}</td>
                            <td>{{ getUsageLimit(promo) }}</td>
                            <td>{{ getRemainingUsages(promo) }}</td>

                            <td>
                                <span class="promo-status-badge" :class="getStatusClass(promo)">
                                    {{ getStatusText(promo) }}
                                </span>
                            </td>

                            <td>
                                <button v-if="getRemainingUsages(promo) !== 0" type="button"
                                        class="promo-toggle-btn" :class="{ active: promo.is_active }"
                                        :disabled="togglingId === promo.id" @click="togglePromoActive(promo)">
                                    <span class="promo-toggle-circle"></span>
                                    <span class="promo-toggle-label">
                                        {{ togglingId === promo.id ? 'Сохранение...' : (promo.is_active ? 'Активен' : 'Отключён') }}
                                    </span>
                                </button>
                            </td>

                            <td>
                                <button v-if="promo.is_active && getRemainingUsages(promo) !== 0"
                                        type="button" class="admin-btn admin-btn-secondary admin-btn-sm"
                                        :disabled="copyingId === promo.id" @click="copyPromoCode(promo)">
                                    {{ copyingId === promo.id ? 'Скопировано' : 'Копировать' }}
                                </button>
                            </td>
                        </tr>
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
        </div>
    </admin-sales-layout>
</template>

<script>
import axios from 'axios';
import AdminSalesLayout from "./AdminSalesLayout.vue";

export default {
    name: 'AdminPromoCodesComponent',
    components: {
        AdminSalesLayout,
    },
    data() {
        return {
            loading: false,
            createLoading: false,
            copyingId: null,
            createdPromoCopying: false,
            togglingId: null,
            promoCodes: [],
            createdPromo: {
                code: '',
                discount_percent: '',
                max_usages: 0,
            },
            createForm: {
                discount_percent: '',
                max_usages: '',
            },
            filters: {
                search: '',
                status: '',
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
    computed: {
        activeCount() {
            return this.promoCodes.filter((item) => !this.isLimitReached(item)).length;
        },

        limitReachedCount() {
            return this.promoCodes.filter((item) => this.isLimitReached(item)).length;
        },
    },
    created() {
        this.fetchPromoCodes();
    },
    beforeDestroy() {
        clearTimeout(this.debounceTimer);
    },
    methods: {
        async fetchPromoCodes() {
            this.loading = true;

            try {
                const response = await axios.get('/admin/api/shop/promo-codes', {
                    params: this.filters,
                });

                const payload = response.data || {};
                const data = payload.data || {};

                this.promoCodes = Array.isArray(data.data) ? data.data : [];
                this.sortPromoCodes();

                this.pagination = {
                    current_page: data.current_page || 1,
                    last_page: data.last_page || 1,
                    per_page: data.per_page || 20,
                    total: data.total || 0,
                };
            } catch (error) {
                console.error('Ошибка загрузки промокодов', error);
                this.promoCodes = [];
            } finally {
                this.loading = false;
            }
        },

        async createPromoCode() {
            this.createLoading = true;

            try {
                const payload = {
                    discount_percent: Number(this.createForm.discount_percent),
                    max_usages: Number(this.createForm.max_usages || 0),
                };

                const response = await axios.post('/admin/api/shop/promo-codes', payload);
                const data = response.data || {};
                const created = data.data || data;

                this.createdPromo = {
                    code: created.code || '',
                    discount_percent: Number(created.discount_percent || payload.discount_percent || 0),
                    max_usages: Number(created.max_usages || payload.max_usages || 0),
                };

                this.createForm.discount_percent = '';
                this.createForm.max_usages = '';

                this.filters.page = 1;
                await this.fetchPromoCodes();
            } catch (error) {
                console.error('Ошибка создания промокода', error);
            } finally {
                this.createLoading = false;
            }
        },

        onFilterChange() {
            this.filters.page = 1;
            this.fetchPromoCodes();
        },

        changePage(page) {
            this.filters.page = page;
            this.fetchPromoCodes();
        },

        getDiscountText(promo) {
            const percent = Number(promo.discount_percent || 0);
            return percent ? `${percent}%` : '—';
        },

        getUsageCount(promo) {
            return Number(promo.usages_count || 0);
        },

        getUsageLimit(promo) {
            const limit = Number(promo.max_usages || 0);

            if (!limit) {
                return '∞';
            }

            return limit;
        },

        getRemainingUsages(promo) {
            const limit = Number(promo.max_usages || 0);
            const used = this.getUsageCount(promo);

            if (!limit) {
                return '∞';
            }

            return Math.max(limit - used, 0);
        },

        isLimitReached(promo) {
            const limit = Number(promo.max_usages || 0);

            if (!limit) {
                return false;
            }

            return this.getUsageCount(promo) >= limit;
        },

        getStatusText(promo) {
            if (this.isLimitReached(promo)) {
                return 'Лимит исчерпан';
            }

            return 'Активен';
        },

        isInactive(promo) {
            if (!promo.is_active) {
                return true;
            }

            return this.isLimitReached(promo);
        },

        async copyPromoCode(promo) {
            try {
                await navigator.clipboard.writeText(promo.code);
                this.copyingId = promo.id;

                setTimeout(() => {
                    if (this.copyingId === promo.id) {
                        this.copyingId = null;
                    }
                }, 1500);
            } catch (error) {
                console.error('Ошибка копирования промокода', error);
            }
        },

        async deletePromoCode(promo) {
            const confirmDelete = confirm(`Удалить промокод ${promo.code}?`);

            if (!confirmDelete) {
                return;
            }

            this.deletingId = promo.id;

            try {
                await axios.delete(`/admin/api/shop/promo-codes/${promo.id}`);
                this.promoCodes = this.promoCodes.filter(item => item.id !== promo.id);
                if (!this.promoCodes.length && this.pagination.current_page > 1) {
                    this.changePage(this.pagination.current_page - 1);
                }

            } catch (error) {
                console.error('Ошибка удаления промокода', error);
            } finally {
                this.deletingId = null;
            }
        },

        getStatusClass(promo) {
            if (!promo.is_active) {
                return 'is-muted';
            }

            if (this.isLimitReached(promo)) {
                return 'is-muted';
            }

            return 'is-success';
        },

        async togglePromoActive(promo) {
            this.togglingId = promo.id;

            try {
                const response = await axios.patch(`/admin/api/shop/promo-codes/${promo.id}/toggle`);
                const updatedPromo = response.data.data || null;

                if (!updatedPromo) {
                    return;
                }

                const index = this.promoCodes.findIndex(item => item.id === promo.id);

                if (index !== -1) {
                    this.$set(this.promoCodes, index, updatedPromo);
                }

                this.sortPromoCodes();
            } catch (error) {
                console.error('Ошибка переключения активности промокода', error);
            } finally {
                this.togglingId = null;
            }
        },

        sortPromoCodes() {
            this.promoCodes = [...this.promoCodes].sort((a, b) => {
                const aInactive = this.isInactive(a) ? 1 : 0;
                const bInactive = this.isInactive(b) ? 1 : 0;

                if (aInactive !== bInactive) {
                    return aInactive - bInactive;
                }

                return b.id - a.id;
            });
        },
    },
};
</script>

<style scoped>
.admin-promo-filters {
    margin-bottom: 20px;
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

.admin-input:focus,
.admin-select:focus {
    outline: none;
    border-color: #8fb3d9;
    box-shadow: 0 0 0 4px rgba(80, 130, 190, 0.12);
}

.admin-promo-create-card {
    background: #fff;
    border: 1px solid #e5edf5;
    border-radius: 16px;
    box-shadow: 0 6px 24px rgba(25, 42, 70, 0.05);
    padding: 24px;
    margin-bottom: 20px;
}

.admin-promo-create-head {
    margin-bottom: 18px;
}

.admin-promo-create-title {
    margin: 0 0 6px;
    font-size: 22px;
    font-weight: 700;
    color: #243447;
}

.admin-promo-create-subtitle {
    margin: 0;
    font-size: 14px;
    color: #6c8198;
}

.admin-promo-create-grid {
    display: grid;
    grid-template-columns: minmax(220px, 280px) minmax(220px, 280px) minmax(220px, 1fr);
    gap: 16px;
    align-items: end;
}

.admin-promo-field {
    min-width: 0;
}

.admin-promo-field-submit {
    display: flex;
}

.admin-promo-label {
    display: block;
    margin-bottom: 8px;
    color: #516579;
    font-size: 14px;
    font-weight: 600;
}

.admin-promo-input-wrap {
    position: relative;
}

.admin-promo-suffix {
    position: absolute;
    top: 50%;
    right: 40px;
    transform: translateY(-50%);
    color: #6c8198;
    font-size: 14px;
    font-weight: 600;
    pointer-events: none;
}

.admin-promo-hint {
    margin-top: 8px;
    color: #8a9caf;
    font-size: 12px;
}

.admin-promo-summary {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
    margin-bottom: 20px;
}

.admin-summary-card {
    background: #fff;
    border: 1px solid #e5edf5;
    border-radius: 16px;
    padding: 16px 18px;
    box-shadow: 0 6px 24px rgba(25, 42, 70, 0.05);
}

.admin-summary-label {
    color: #6c8198;
    font-size: 13px;
    margin-bottom: 6px;
}

.admin-summary-value {
    color: #243447;
    font-size: 24px;
    font-weight: 700;
}

.admin-orders-card {
    background: #fff;
    border: 1px solid #e5edf5;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 6px 24px rgba(25, 42, 70, 0.05);
}

.admin-orders-table th,
.admin-orders-table td {
    border-bottom: 1px solid #edf2f7;
    font-size: 14px;
    vertical-align: middle;
}

.admin-orders-table th {
    background: #f8fbff;
    color: #58708a;
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
    transition: 0.2s ease;
}

.admin-btn-primary {
    width: 100%;
    background: linear-gradient(135deg, #27425d 0%, #355c82 100%);
    color: #fff;
    box-shadow: 0 10px 24px rgba(39, 66, 93, 0.18);
}

.admin-btn-primary:hover:not(:disabled) {
    transform: translateY(-1px);
}

.admin-btn-secondary {
    background: #eaf1f8;
    color: #27425d;
}

.admin-btn-secondary:hover:not(:disabled) {
    background: #dce8f4;
}

.admin-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.promo-code-box {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.promo-code-value {
    color: #243447;
    font-weight: 700;
}

.promo-code-subtext {
    color: #90a0b1;
    font-size: 12px;
}

.promo-discount-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 30px;
    padding: 0 10px;
    border-radius: 999px;
    background: #eef5ff;
    color: #315a8c;
    font-size: 12px;
    font-weight: 700;
}

.promo-status-badge {
    display: inline-flex;
    align-items: center;
    min-height: 28px;
    padding: 0 10px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
}

.promo-status-badge.is-success {
    background: #e9f8ef;
    color: #1f8b4c;
}

.promo-status-badge.is-muted {
    background: #eef2f6;
    color: #617588;
}

.admin-btn-danger {
    background: #fdecec;
    color: #c44949;
}

.admin-btn-danger:hover:not(:disabled) {
    background: #f8d7da;
}

.promo-row-inactive {
    background: #f8fafc !important;
    color: #9aa7b6 !important;
}

.promo-row-inactive td {
    background: #f8fafc !important;
    color: #9aa7b6 !important;
}

.promo-row-inactive * {
    color: #9aa7b6 !important;
}

.promo-row-inactive:hover td {
    background: #f8fafc !important;
}

.promo-row-inactive .promo-discount-badge,
.promo-row-inactive .promo-status-badge {
    background: #eef2f6 !important;
    color: #9aa7b6 !important;
    border-color: #e1e8ef !important;
}

.promo-toggle-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    min-height: 36px;
    padding: 0 12px;
    border: 1px solid #d7e1ec;
    border-radius: 999px;
    background: #f2f5f8;
    color: #617588;
    cursor: pointer;
    transition: 0.2s ease;
}

.promo-toggle-btn.active {
    background: #e9f8ef;
    border-color: #cfe8d8;
    color: #1f8b4c;
}

.promo-toggle-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.promo-toggle-circle {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #98a8b8;
    flex-shrink: 0;
}

.promo-toggle-btn.active .promo-toggle-circle {
    background: #1f8b4c;
}

.promo-toggle-label {
    font-size: 13px;
    font-weight: 600;
}

</style>
