<template>
    <div class="container mt-4">
        <ul class="nav nav-tabs" id="coursesTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="manage-courses-tab" data-bs-toggle="tab"
                        data-bs-target="#manage-courses" type="button" role="tab" aria-controls="manage-courses"
                        aria-selected="true">Управление</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="logs-courses-tab" data-bs-toggle="tab" data-bs-target="#logs-courses"
                        type="button" role="tab" aria-controls="logs-courses" aria-selected="false">История</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="promo-codes-tab" data-bs-toggle="tab"
                        data-bs-target="#promo-codes" type="button" role="tab" aria-controls="promo-codes-courses"
                        aria-selected="false">Промокоды</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="referrals-tab" data-bs-toggle="tab"
                        data-bs-target="#referrals" type="button" role="tab" aria-controls="referrals-courses"
                        aria-selected="false">Реферальные ссылки</button>
            </li>
        </ul>
        <div class="tab-content py-4" id="coursesTabContent">
            <div class="tab-pane fade show active" id="manage-courses" role="tabpanel"
                 aria-labelledby="manage-courses-tab">
                <div class="row" v-if="isDataLoaded">
                    <div class="col-lg-4">
                        <div class="card mb-4">
                            <div class="card-body">
                                <h5 class="card-title">Пакет "Мини"</h5>
                                <form @submit.prevent="savePackage('mini')">
                                    <div class="mb-3">
                                        <label for="miniName" class="form-label">Название пакета</label>
                                        <input autocomplete="off" class="form-control" id="miniName"
                                               v-model="packages.mini.name">
                                    </div>

                                    <div class="mb-3">
                                        <label for="minipriceOld" class="form-label">Старая цена</label>
                                        <div class="price-input-wrapper">
                                            <input type="hidden" id="minipriceOldHidden"
                                                   v-model.number="packages.mini.priceOld">

                                            <input type="text"
                                                   autocomplete="off"
                                                   class="form-control price-display"
                                                   id="minipriceOldDisplay"
                                                   :value="formattedPrice(packages.mini.priceOld)"
                                                   @input="updatePrice('mini', 'priceOld', $event.target.value)"
                                                   @blur="handleBlur('mini', 'priceOld')"
                                                   @focus="handleFocus('mini', 'priceOld')"
                                                   placeholder="14 500">
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        <label for="minipriceNew" class="form-label">Новая цена</label>
                                        <div class="price-input-wrapper">
                                            <input type="hidden" id="minipriceNewHidden"
                                                   v-model.number="packages.mini.priceNew">
                                            <input type="text"
                                                   autocomplete="off"
                                                   class="form-control price-display"
                                                   id="minipriceNewDisplay"
                                                   :value="formattedPrice(packages.mini.priceNew)"
                                                   @input="updatePrice('mini', 'priceNew', $event.target.value)"
                                                   @blur="handleBlur('mini', 'priceNew')"
                                                   @focus="handleFocus('mini', 'priceNew')"
                                                   placeholder="14 500">
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        <label for="miniContentLink" class="form-label">Id телеграмм-чата</label>
                                        <input autocomplete="off" class="form-control" id="miniContentLink"
                                               v-model="packages.mini.contentLink">
                                    </div>

                                    <button type="submit" class="btn btn-primary" :disabled="!isDataLoaded">Сохранить "Мини"
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="card mb-4">
                            <div class="card-body">
                                <h5 class="card-title">Пакет "Опти"</h5>
                                <form @submit.prevent="savePackage('opti')">
                                    <div class="mb-3">
                                        <label for="optiName" class="form-label">Название пакета</label>
                                        <input autocomplete="off" class="form-control" id="optiName"
                                               v-model="packages.opti.name">
                                    </div>

                                    <div class="mb-3">
                                        <label for="minipriceOld" class="form-label">Старая цена</label>
                                        <div class="price-input-wrapper">
                                            <input type="hidden" id="minipriceOldHidden"
                                                   v-model.number="packages.opti.priceOld">

                                            <input type="text"
                                                   autocomplete="off"
                                                   class="form-control price-display"
                                                   id="minipriceOldDisplay"
                                                   :value="formattedPrice(packages.opti.priceOld)"
                                                   @input="updatePrice('opti', 'priceOld', $event.target.value)"
                                                   @blur="handleBlur('opti', 'priceOld')"
                                                   @focus="handleFocus('opti', 'priceOld')"
                                                   placeholder="14 500">
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        <label for="minipriceNew" class="form-label">Новая цена</label>
                                        <div class="price-input-wrapper">
                                            <input type="hidden" id="minipriceNewHidden"
                                                   v-model.number="packages.opti.priceNew">
                                            <input type="text"
                                                   autocomplete="off"
                                                   class="form-control price-display"
                                                   id="minipriceNewDisplay"
                                                   :value="formattedPrice(packages.opti.priceNew)"
                                                   @input="updatePrice('opti', 'priceNew', $event.target.value)"
                                                   @blur="handleBlur('opti', 'priceNew')"
                                                   @focus="handleFocus('opti', 'priceNew')"
                                                   placeholder="14 500">
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        <label for="optiContentLink" class="form-label">Id телеграмм-чата</label>
                                        <input autocomplete="off" class="form-control" id="optiContentLink"
                                               v-model="packages.opti.contentLink">
                                    </div>

                                    <button type="submit" class="btn btn-primary" :disabled="!isDataLoaded">Сохранить "Опти"
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Пакет "Макси"</h5>
                                <form @submit.prevent="savePackage('maxi')">
                                    <div class="mb-3">
                                        <label for="maxiName" class="form-label">Название пакета</label>
                                        <input autocomplete="off" class="form-control" id="maxiName"
                                               v-model="packages.maxi.name">
                                    </div>

                                    <div class="mb-3">
                                        <label for="minipriceOld" class="form-label">Старая цена</label>
                                        <div class="price-input-wrapper">
                                            <input type="hidden" id="minipriceOldHidden"
                                                   v-model.number="packages.maxi.priceOld">

                                            <input type="text"
                                                   autocomplete="off"
                                                   class="form-control price-display"
                                                   id="minipriceOldDisplay"
                                                   :value="formattedPrice(packages.maxi.priceOld)"
                                                   @input="updatePrice('maxi', 'priceOld', $event.target.value)"
                                                   @blur="handleBlur('maxi', 'priceOld')"
                                                   @focus="handleFocus('maxi', 'priceOld')"
                                                   placeholder="14 500">
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        <label for="minipriceNew" class="form-label">Новая цена</label>
                                        <div class="price-input-wrapper">
                                            <input type="hidden" id="minipriceNewHidden"
                                                   v-model.number="packages.maxi.priceNew">
                                            <input type="text"
                                                   autocomplete="off"
                                                   class="form-control price-display"
                                                   id="minipriceNewDisplay"
                                                   :value="formattedPrice(packages.maxi.priceNew)"
                                                   @input="updatePrice('maxi', 'priceNew', $event.target.value)"
                                                   @blur="handleBlur('maxi', 'priceNew')"
                                                   @focus="handleFocus('maxi', 'priceNew')"
                                                   placeholder="14 500">
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        <label for="maxiContentLink" class="form-label">Id телеграмм-чата</label>
                                        <input autocomplete="off" class="form-control" id="maxiContentLink"
                                               v-model="packages.maxi.contentLink">
                                    </div>

                                    <button type="submit" class="btn btn-primary" :disabled="!isDataLoaded">Сохранить "Макси"
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="logs-courses" role="tabpanel" aria-labelledby="logs-courses-tab">
                <div class="container-fluid">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <div class="d-flex align-items-center">
                            <label for="statusFilter" class="me-1 fw-medium">Статус:</label>
                            <select id="statusFilter" v-model="filters.status" @change="fetchData" class="form-select" style="width:200px;">
                                <option :value="null">Все</option>
                                <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option>
                            </select>
                        </div>
                    </div>

                    <div class="table-responsive">
                        <table class="table table-hover table-striped align-middle">
                            <thead class="table-light">
                            <tr>
                                <th>#</th>
                                <th>Пользователь</th>
                                <th>Пакет</th>
                                <th>Payment ID</th>
                                <th>Статус</th>
                                <th>Метод</th>
                                <th>Сумма</th>
                                <th>Оплачено</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="t in transactions" :key="t.id">
                                <td>#{{ t.id }}</td>
                                <td>
                                    <div>{{ t.user.full_name ?? '-' }}</div>
                                    <small class="text-muted">{{ t.user.email ?? '' }}</small><br>
                                    <small class="text-muted">{{ t.user.phone_number ?? '' }}</small>
                                </td>
                                <td>
                                    <div>{{ t.package.name ?? '-' }}</div>
                                    <small class="text-muted">Цена: {{ t.package.price_new ?? '-' }} р</small>
                                </td>
                                <td>{{ t.payment_id ?? '-' }}</td>
                                <td>
                                    <span :class="badgeClass(t.status)">{{ formatStatus(t.status) }}</span>
                                </td>
                                <td>{{ t.payment_method ?? '-' }}</td>
                                <td>{{ formatMoney(t.amount) }} р</td>
                                <td>{{ t.payment_at ? formatDate(t.payment_at) : '-' }}</td>
                            </tr>
                            <tr v-if="transactions.length === 0">
                                <td colspan="8" class="text-center text-muted py-5">
                                    Нет транзакций для отображения
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <nav v-if="meta.total > meta.per_page" class="mt-2">
                        <ul class="pagination pagination-sm justify-content-center mb-0">
                            <li :class="['page-item', { disabled: !links.prev }]">
                                <a class="page-link" href="#" @click.prevent="goToPage(meta.current_page - 1)">«</a>
                            </li>

                            <li v-for="page in pages" :key="page" class="page-item" :class="{ active: page === meta.current_page }">
                                <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
                            </li>

                            <li :class="['page-item', { disabled: !links.next }]">
                                <a class="page-link" href="#" @click.prevent="goToPage(meta.current_page + 1)">»</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div class="tab-pane fade" id="promo-codes" role="tabpanel" aria-labelledby="promo-codes-tab">
                <div class="container-fluid">
                    <promocodes-component :initial-packages="packages"></promocodes-component>
                </div>
            </div>
            <div class="tab-pane fade" id="referrals" role="tabpanel" aria-labelledby="referrals-tab">
                <div class="container-fluid">
                    <referrals-component></referrals-component>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PromocodesComponent from "./modules/PromocodesComponent.vue";
import ReferralGenerator from "./modules/ReferralGeneratorForm.vue";
import ReferralsComponent from "./modules/ReferralsComponent.vue";

export default {
    name: "AdminCoursesComponent",
    components: {ReferralsComponent, ReferralGenerator, PromocodesComponent},
    data() {
        return {
            packages: {
                mini: {
                    id: null,
                    name: 'Мини',
                    priceOld: 0,
                    priceNew: 0,
                    contentLink: '',
                },
                opti: {
                    id: null,
                    name: 'Опти',
                    priceOld: 0,
                    priceNew: 0,
                    contentLink: '',
                },
                maxi: {
                    id: null,
                    name: 'Макси',
                    priceOld: 0,
                    priceNew: 0,
                    contentLink: '',
                }
            },
            isDataLoaded: false,
            filters: {
                status: null,
            },
            transactions: [],
            meta: {},
            links: { next: null, prev: null },
            statuses: ['succeeded',
            'pending',
            'canceled']
        };
    },
    computed: {
        pages() {
            const arr = [];
            for (let i = 1; i <= (this.meta.last_page || 1); i++) {
                arr.push(i);
            }
            return arr;
        },
    },

    watch: {
        'filters.status'() {
            this.fetchData(1);
        },
    },
    created() {
        this.fetchData();
    },
    mounted() {
        this.loadPackages();
    },
    methods: {
        async fetchData(page = 1) {
            try {
                const { data } = await axios.get('/admin/api/transactions', {
                    params: { ...this.filters, page },
                });

                this.transactions = data.data;
                this.meta = data.meta;
                this.links = data.links;
            } catch (e) {
                console.error('Failed to load transactions', e);
            }
        },

        goToPage(page) {
            if (page < 1 || page > (this.meta.last_page || 1)) return;
            this.fetchData(page);
        },

        formatMoney(val) {
            return Number(val).toLocaleString('ru-RU', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
        },

        formatDate(dateStr) {
            const d = new Date(dateStr);
            return d.toLocaleString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        },

        formatStatus(status) {
            return status.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
        },

        badgeClass(status) {
            const map = {
                succeeded: 'badge bg-success',
                waiting_for_capture: 'badge bg-warning',
                canceled: 'badge bg-danger',
            };
            return map[status] ?? 'badge bg-secondary';
        },

        loadPackages() {
            axios.get('/api/admin/courses')
                .then(response => {
                    const packagesData = response.data.packages;

                    if (packagesData.mini) {
                        this.packages.mini = {
                            ...packagesData.mini,
                            priceOld: parseInt(packagesData.mini.priceOld),
                            priceNew: parseInt(packagesData.mini.priceNew)
                        };
                    }
                    if (packagesData.opti) {
                        this.packages.opti = {
                            ...packagesData.opti,
                            priceOld: parseInt(packagesData.opti.priceOld),
                            priceNew: parseInt(packagesData.opti.priceNew)
                        };
                    }
                    if (packagesData.maxi) {
                        this.packages.maxi = {
                            ...packagesData.maxi,
                            priceOld: parseInt(packagesData.maxi.priceOld),
                            priceNew: parseInt(packagesData.maxi.priceNew)
                        };
                    }

                    this.isDataLoaded = true;
                })
                .catch(error => {
                    console.error('Ошибка при загрузке пакетов:', error);
                });
        },

        savePackage(packageName) {
            const packageToSave = this.packages[packageName];

            if (!packageToSave || !packageToSave.id) {
                alert(`Ошибка: ID пакета "${packageName}" отсутствует или данные неполные.`);
                return;
            }

            axios.put(`/api/admin/courses/${packageToSave.id}`, packageToSave)
                .then(response => {
                    alert(`Пакет "${packageName}" успешно сохранен!`);

                    if (response.data.course) {
                        const updatedDataFromBackend = response.data.course;

                        this.packages[packageName] = {
                            ...packageToSave,
                            id: updatedDataFromBackend.id || packageToSave.id,
                            name: updatedDataFromBackend.name || packageToSave.name,

                            priceOld: updatedDataFromBackend.price_old || packageToSave.priceOld,
                            priceNew: updatedDataFromBackend.price_new || packageToSave.priceNew,
                            contentLink: updatedDataFromBackend.content_link || packageToSave.contentLink
                        };
                    }
                }).catch(error => {
                let errorMessage = `Ошибка при сохранении пакета "${packageName}".`;

                if (error.response && error.response.data) {
                    const responseData = error.response.data;
                    const errorDetail = responseData.message ||
                        (responseData.errors ? Object.values(responseData.errors).flat().join('\n') : null);
                    if (errorDetail) {
                        errorMessage += `\nДетали ошибки:\n${errorDetail}`;
                    } else {
                        errorMessage += `\nСервер вернул статус ${error.response.status}.`;
                    }
                }
                alert(errorMessage);
            });
        },

        formattedPrice(price) {
            if (typeof price !== 'number') {
                return price;
            }
            return price.toLocaleString('ru-RU').replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' ₽';
        },

        updatePrice(packageName, priceType, value) {
            const numericValue = value.replace(/[^\d]/g, '');
            this.packages[packageName][priceType] = numericValue === '' ? 0 : parseInt(numericValue, 10);
        },

        handleFocus(packageName, priceType) {
            this.focusedInput = `${packageName}-${priceType}`;
        },

        handleBlur(packageName, priceType) {
            this.focusedInput = null;
        },
    }
}
</script>
