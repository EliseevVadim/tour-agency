<template>
    <div class="referral-manager">
        <div v-if="showTransactionsModal" class="modal fade show d-block backdrop-gray" tabindex="-1"
             aria-hidden="false">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Транзакции для: {{ currentReferral.full_name }}
                            ({{ currentReferral.ref_code }})</h5>
                        <button type="button" class="btn-close" @click="closeTransactionsModal"
                                aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="d-flex justify-content-end mb-3 gap-2">
                            <div class="d-flex align-items-center gap-2">
                                <label for="txnStatusFilter" class="form-label mb-0 fw-bold">Фильтр Статуса:</label>
                                <select id="txnStatusFilter" v-model="filterTxnStatus"
                                        @change="fetchTransactionsForReferral(currentReferral.id)"
                                        class="form-select form-select-sm w-auto">
                                    <option value="">Все статусы</option>
                                    <option value="succeeded">Успешные</option>
                                    <option value="pending">В ожидании</option>
                                    <option value="cancelled">Отклоненные</option>
                                </select>
                            </div>
                            <div class="d-flex align-items-center gap-2">
                                <label for="payoutFilter" class="form-label mb-0 fw-bold">Фильтр Выплаты:</label>
                                <select id="payoutFilter"
                                        v-model="filterPayoutStatus"
                                        @change="fetchTransactionsForReferral(currentReferral.id)"
                                        class="form-select form-select-sm w-auto">
                                    <option value="">Все статусы</option>
                                    <option :value="true">Выплачено</option>
                                    <option :value="false">В ожидании</option>
                                </select>
                            </div>
                        </div>

                        <div v-if="isLoadingTransactions" class="text-center py-5">
                            <div class="spinner-border text-primary" role="status"></div>
                            <p class="mt-2">Загрузка истории покупок...</p>
                        </div>

                        <div v-else-if="referralTransactions.length === 0" class="alert alert-warning">
                            Данных не найдено.
                        </div>

                        <div v-else class="table-responsive">
                            <table class="table table-bordered table-sm">
                                <thead>
                                <tr>
                                    <th>ID Транзакции</th>
                                    <th>Пакет</th>
                                    <th>Сумма</th>
                                    <th>Статус</th>
                                    <th>Дата</th>
                                    <th>Выплата</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="txn in referralTransactions" :key="txn.id">
                                    <td>{{ txn.id }}</td>
                                    <td>{{ txn.package_id }}</td>
                                    <td>{{ txn.amount }} руб.</td>
                                    <td>
                                        <span class="badge" :class="{
                                            'bg-success': txn.status === 'succeeded',
                                            'bg-danger': txn.status === 'cancelled',
                                            'bg-secondary': txn.status === 'pending',
                                        }">
                                            {{ txn.status === 'succeeded' ? 'Успешно' : '' }}
                                            {{ txn.status === 'cancelled' ? 'Отменен' : '' }}
                                            {{ txn.status === 'pending' ? ' В ожидании' : '' }}
                                        </span>
                                    </td>
                                    <td>{{ new Date(txn.created_at).toLocaleDateString() }}</td>
                                    <td class="text-center">
                                        <input
                                            type="checkbox"
                                            :id="'paid-' + txn.id"
                                            :checked="!!txn.paid_referral_fee"
                                            @change="toggleReferralPaid(txn.id, !!txn.paid_referral_fee)"
                                            :disabled="txn.status !== 'succeeded' || !!txn.paid_referral_fee"
                                            :title="txn.status !== 'succeeded' ? 'Можно платить только за успешные транзакции' : 'Отметить отметку о выплате'">
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeTransactionsModal">Закрыть</button>
                    </div>
                </div>
            </div>
        </div>

        <ul class="nav nav-tabs mb-3" id="referralTabs" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="generate-referral-tab" data-bs-toggle="tab"
                        data-bs-target="#generate-referral"
                        type="button" role="tab">Добавить Реферальную ссылку
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="list-referrals-tab" data-bs-toggle="tab" data-bs-target="#list-referrals"
                        type="button"
                        role="tab" @click="onListTabClick">Список Реферальных ссылок
                </button>
            </li>
        </ul>

        <div class="tab-content" id="referralTabsContent">
            <div class="tab-pane fade show active" id="generate-referral" role="tabpanel"
                 aria-labelledby="generate-referral-tab">
                <ReferralGenerator @referral-created="onReferralCreated"/>
            </div>

            <div class="tab-pane fade" id="list-referrals" role="tabpanel" aria-labelledby="list-referrals-tab">
                <div class="card shadow">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                            <h5>Список Реферальных Ссылок</h5>

                            <div class="d-flex flex-wrap gap-2">
                                <input type="text" v-model="filterEmail" @input="debounceFetch"
                                       placeholder="Поиск по Email" class="form-control form-control-sm">
                                <input type="text" v-model="filterPhone" @input="debounceFetch"
                                       placeholder="Поиск по Телефону" class="form-control form-control-sm">
                            </div>
                        </div>

                        <div v-if="isLoadingList" class="text-center py-5">
                            <div class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Загрузка...</span>
                            </div>
                            <p class="mt-2">Загрузка данных...</p>
                        </div>

                        <div v-else-if="referrals.length === 0" class="alert alert-info text-center">
                            Нет зарегистрированных ссылок.
                        </div>

                        <div v-else class="table-responsive">
                            <table class="table table-striped table-hover table-sm">
                                <thead>
                                <tr>
                                    <th>ФИО</th>
                                    <th>Телефон</th>
                                    <th>Email</th>
                                    <th>ТГ</th>
                                    <th>Реф-Код</th>
                                    <th>Действия</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="referral in referrals" :key="referral.id">
                                    <td>{{ referral.full_name }}</td>
                                    <td>{{ referral.phone }}</td>
                                    <td>{{ referral.email }}</td>
                                    <td>{{ referral.tg_username || '—' }}</td>
                                    <td class="font-monospace">{{ referral.ref_code }}</td>
                                    <td>
                                        <div class="d-flex align-items-center gap-2">
                                            <button
                                                @click="copyReferralLink(referral.ref_code)"
                                                class="btn btn-sm border-0 p-0 text-primary"
                                                title="Скопировать реферальную ссылку"
                                                :disabled="generatingUrlCode === referral.ref_code || deletingId === referral.id">
                                    <span v-if="generatingUrlCode === referral.ref_code" class="text-success fs-5">
                                        <svg style="width: 20px; height: 20px" xmlns="http://www.w3.org/2000/svg"
                                             width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path
                                                d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z"/></svg>
                                    </span>
                                                <span v-else class="fs-5">
                                        <svg style="width: 20px; height: 20px" xmlns="http://www.w3.org/2000/svg"
                                             width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path
                                                d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
                                            <path
                                                d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
                                        </svg>
                                    </span>
                                            </button>

                                            <button
                                                @click="deleteReferral(referral.id, referral.full_name)"
                                                class="btn btn-sm btn-danger ms-1"
                                                title="Удалить реферальную ссылку"
                                                :disabled="deletingId === referral.id || generatingUrlCode === referral.ref_code">
                                                <span v-if="deletingId === referral.id"
                                                      class="spinner-border spinner-border-sm" role="status"
                                                      aria-hidden="true"></span>
                                                <span v-else>Удалить</span>
                                            </button>

                                            <button
                                                @click="openTransactionsModal(referral)"
                                                class="btn btn-sm btn-info"
                                                title="Показать транзакции"
                                                :disabled="generatingUrlCode === referral.ref_code || deletingId === referral.id">
                                                Транзакции ({{ referral.transactions_count || 0 }})
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <nav v-if="listMeta.last_page > 1" aria-label="Pagination">
                            <ul class="pagination justify-content-center">
                                <li class="page-item" :class="{ disabled: listMeta.current_page === 1 }">
                                    <a class="page-link" href="#" @click.prevent="goToPage(listMeta.current_page - 1)">Предыдущая</a>
                                </li>

                                <li v-for="page in paginationPages" :key="page"
                                    class="page-item" :class="{ active: page === listMeta.current_page }">
                                    <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
                                </li>

                                <li class="page-item"
                                    :class="{ disabled: listMeta.current_page === listMeta.last_page }">
                                    <a class="page-link" href="#" @click.prevent="goToPage(listMeta.current_page + 1)">Следующая</a>
                                </li>
                            </ul>
                        </nav>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import ReferralGenerator from "./ReferralGeneratorForm.vue";

export default {
    name: 'ReferralsComponent',
    components: {
        ReferralGenerator
    },
    data() {
        return {
            referrals: [],
            listMeta: {
                current_page: 1,
                last_page: 1,
            },
            isLoadingList: false,
            generatingUrlCode: null,

            deletingId: null,
            filterEmail: '',
            filterPhone: '',
            debounceTimeout: null,

            showTransactionsModal: false,
            currentReferral: null,
            referralTransactions: [],
            isLoadingTransactions: false,

            filterTxnStatus: '',
            filterPayoutStatus: '',
        };
    },
    computed: {
        paginationPages() {
            const {current_page: current, last_page: total} = this.listMeta;
            if (total <= 1) return [];

            const pages = [];
            const maxVisible = 5;
            let start = Math.max(1, current - Math.floor(maxVisible / 2));
            let end = Math.min(total, start + maxVisible - 1);

            if (end - start + 1 < maxVisible) {
                start = Math.max(1, end - maxVisible + 1);
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            return pages;
        }
    },
    methods: {
        onListTabClick() {
            if (this.referrals.length === 0 && !this.isLoadingList) {
                this.fetchReferrals(this.listMeta.current_page);
            }
        },

        debounceFetch() {
            clearTimeout(this.debounceTimeout);
            this.debounceTimeout = setTimeout(() => {
                this.fetchReferrals(1);
            }, 500);
        },

        async fetchReferrals(page = 1) {
            this.isLoadingList = true;

            const params = {
                page: page,
                per_page: 20,
                email: this.filterEmail,
                phone: this.filterPhone
            };

            try {
                const response = await axios.get('/admin/api/referrals', {params});

                this.referrals = response.data.data;
                this.listMeta = {
                    current_page: response.data.current_page,
                    last_page: response.data.last_page,
                };

            } catch (error) {
                console.error("Ошибка при получении списка рефералов:", error);
            } finally {
                this.isLoadingList = false;
            }
        },

        onReferralCreated() {
            this.filterEmail = '';
            this.filterPhone = '';
            this.fetchReferrals(1);
        },

        goToPage(page) {
            if (page >= 1 && page <= this.listMeta.last_page && page !== this.listMeta.current_page) {
                this.fetchReferrals(page);
            }
        },

        async copyReferralLink(refCode) {
            const baseUrl = window.location.origin;
            const fullUrl = `${baseUrl}/courses?ref=${refCode}`;

            try {
                await navigator.clipboard.writeText(fullUrl);
                this.generatingUrlCode = refCode;

                setTimeout(() => {
                    if (this.generatingUrlCode === refCode) {
                        this.generatingUrlCode = null;
                    }
                }, 2000);

            } catch (err) {
                console.error('Не удалось скопировать URL:', err);
            }
        },

        async deleteReferral(id, name) {
            if (!confirm(`Вы уверены, что хотите удалить реферальную ссылку? Это действие необратимо.`)) {
                return;
            }

            this.deletingId = id;

            try {
                await axios.delete(`/admin/api/referrals/${id}`);
                await this.fetchReferrals(this.listMeta.current_page);

            } catch (error) {
                console.error("Ошибка удаления реферальной ссылки:", error);
                alert('Не удалось удалить реферальную ссылку.');
            } finally {
                this.deletingId = null;
            }
        },

        async fetchTransactionsForReferral(referralId) {
            this.isLoadingTransactions = true;
            this.referralTransactions = [];

            const params = {
                status: this.filterTxnStatus,
                payout_paid: this.filterPayoutStatus
            };

            try {
                const response = await axios.get(`/admin/api/referrals/${referralId}/transactions`, {params});
                this.referralTransactions = response.data.transactions;
            } catch (error) {
                // console.error("Ошибка загрузки транзакций:", error);
            } finally {
                this.isLoadingTransactions = false;
            }
        },

        openTransactionsModal(referral) {
            this.filterTxnStatus = '';
            this.currentReferral = referral;
            this.fetchTransactionsForReferral(referral.id);
            this.showTransactionsModal = true;
        },

        closeTransactionsModal() {
            this.showTransactionsModal = false;
            this.currentReferral = null;
            this.referralTransactions = [];
        },

        async toggleReferralPaid(transactionId, isPaid) {
            try {
                await axios.put(`/admin/api/transactions/${transactionId}/mark-referral-paid`).then(() => {
                    this.fetchTransactionsForReferral(this.currentReferral.id);
                });

            } catch (error) {
                console.error(`Ошибка при обновлении статуса транзакции ${transactionId}:`, error.response ? error.response.data : error.message);
                const transaction = this.referralTransactions.find(t => t.id === transactionId);
                if (transaction) {
                    transaction.is_referral_paid = !isPaid;
                }
            }
        }
    }
}
</script>

<style scoped>
.font-monospace {
    font-family: monospace;
}

.text-primary:hover {
    opacity: 0.8;
}

.backdrop-gray {
    background-color: rgba(0, 0, 0, 0.5);
}
</style>
