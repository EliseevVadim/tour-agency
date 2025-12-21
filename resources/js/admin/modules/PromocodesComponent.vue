<template>
    <div class="promo-manager">
        <ul class="nav nav-tabs mb-3" id="promoTabs" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="generate-tab" data-bs-toggle="tab" data-bs-target="#generate"
                        type="button" role="tab">Генерация
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="list-tab" data-bs-toggle="tab" data-bs-target="#list" type="button"
                        role="tab" @click="onListTabClick">Список Кодов
                </button>
            </li>
        </ul>

        <div class="tab-content" id="promoTabsContent">
            <div class="tab-pane fade show active" id="generate" role="tabpanel" aria-labelledby="generate-tab">
                <GeneratorForm @success="onCodeGeneratedSuccess" :initial-packages="initialPackages"/>
            </div>

            <div class="tab-pane fade" id="list" role="tabpanel" aria-labelledby="list-tab">
                <div class="card shadow">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                            <h5>Статистика и Фильтр</h5>
                            <div>
                                <label class="me-2">Статус:</label>
                                <select v-model="filterStatus" @change="fetchCodes(1)"
                                        class="form-select d-inline w-auto">
                                    <option value="">Все</option>
                                    <option value="allowed">Доступные (Allowed)</option>
                                    <option value="used">Использованные (Used)</option>
                                    <option value="expired">Просроченные (Expired)</option>
                                </select>
                            </div>
                        </div>

                        <div v-if="isLoadingList" class="text-center py-5">
                            <div class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Загрузка...</span>
                            </div>
                            <p class="mt-2">Загрузка данных...</p>
                        </div>

                        <div v-else-if="codes.length === 0" class="alert alert-info text-center">
                            Нет промокодов, соответствующих текущему фильтру.
                        </div>

                        <div v-else class="table-responsive">
                            <table class="table table-striped table-hover table-sm">
                                <thead>
                                <tr>
                                    <th>Код</th>
                                    <th>Пакет</th>
                                    <th>Скидка</th>
                                    <th>Статус</th>
                                    <th>Срок действия</th>
                                    <th>Использован</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="code in codes" :key="code.id">
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <strong>{{ code.code }}</strong>
                                            <button
                                                @click="copyPromoLink(code.code, code.id)"
                                                class="btn btn-sm border-0 p-0 ms-2 text-primary"
                                                title="Скопировать ссылку с промокодом"
                                                :disabled="generatingUrlId === code.id">
                                                <span v-if="generatingUrlId === code.id" class="text-success fs-5">
                                                    <svg style="width: 20px; height: 20px"
                                                         xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                         fill="currentColor" viewBox="0 0 16 16">
                                                        <path
                                                            d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z"/></svg>
                                                </span>
                                                <span v-else class="fs-5">
                                                    <svg style="width: 20px; height: 20px"
                                                         xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                         fill="currentColor" viewBox="0 0 16 16">
                                                      <path
                                                          d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
                                                      <path
                                                          d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                    </td>
                                    <td>{{ getPackageName(code.rule) }}</td>
                                    <td>{{ getDiscountInfo(code.rule) }}</td>
                                    <td>
                                        <span :class="getStatusClass(code)">{{ getStatusText(code) }}</span>
                                    </td>
                                    <td>{{ formatDate(code.expires_at) }}</td>
                                    <td>
                                        <span v-if="code.user_id && code.user">
                                            {{ code.user.email }}
                                        </span>
                                        <span v-else>-</span>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <nav v-if="listMeta.last_page > 1" aria-label="Промокоды Pagination">
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
import GeneratorForm from './PromoCodeGeneratorForm.vue';

export default {
    name: 'PromoCodeManager',
    components: {
        GeneratorForm
    },
    props: {
        initialPackages: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            codes: [],
            listMeta: {
                current_page: 1,
                last_page: 1,
            },
            isLoadingList: false,
            filterStatus: '',
            generatingUrlId: null,
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
            if (this.codes.length === 0 && !this.isLoadingList) {
                this.fetchCodes(this.listMeta.current_page);
            }
        },

        async fetchCodes(page = 1) {
            this.isLoadingList = true;
            if (page === 1 && this.filterStatus === '' && this.codes.length === 0) {
                this.codes = [];
            }

            const params = {
                page: page,
                per_page: 20,
                status: this.filterStatus
            };

            try {
                const response = await axios.get('/admin/api/promo-codes', {params});

                this.codes = response.data.data;
                this.listMeta = {
                    current_page: response.data.current_page,
                    last_page: response.data.last_page,
                };

            } catch (error) {
                console.error("Ошибка при получении списка промокодов:", error);
            } finally {
                this.isLoadingList = false;
            }
        },

        onCodeGeneratedSuccess() {
            const tabEl = document.getElementById('list-tab');
            const isListActive = tabEl && tabEl.classList.contains('active');

            if (isListActive || this.codes.length === 0) {
                this.fetchCodes(this.listMeta.current_page);
            }
        },

        goToPage(page) {
            if (page >= 1 && page <= this.listMeta.last_page && page !== this.listMeta.current_page) {
                this.fetchCodes(page);
            }
        },

        getPackageName(rule) {
            return rule?.package ? rule.package.name : '—';
        },

        getDiscountInfo(rule) {
            if (!rule) return '—';
            return `${rule.discount_value}% (${rule.discount_type})`;
        },

        getStatusClass(code) {
            if (code.is_used) return 'badge bg-secondary';
            if (new Date(code.expires_at) <= new Date()) return 'badge bg-danger';
            return 'badge bg-success';
        },

        getStatusText(code) {
            if (code.is_used) return 'Used';
            if (new Date(code.expires_at) <= new Date()) return 'Expired';
            return 'Allowed';
        },

        formatDate(timestamp) {
            if (!timestamp) return 'N/A';
            return new Date(timestamp).toLocaleDateString('ru-RU');
        },

        async copyPromoLink(code, codeId) {
            const fullUrl = `${window.location.origin}/courses?promo=${code}`;

            try {
                await navigator.clipboard.writeText(fullUrl);
                this.generatingUrlId = codeId;

                setTimeout(() => {
                    if (this.generatingUrlId === codeId) {
                        this.generatingUrlId = null;
                    }
                }, 2000);

            } catch (err) {
                console.error('Не удалось скопировать URL:', err);
            }
        },
    }
}
</script>

<style scoped>
.table-responsive {
    margin-top: 15px;
}

.text-primary:hover {
    opacity: 0.8;
}
</style>
