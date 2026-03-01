<template>
    <div class="container mt-4">
        <ul class="nav nav-tabs" id="coursesTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="manage-courses-tab" data-bs-toggle="tab"
                        data-bs-target="#manage-courses" type="button" role="tab" aria-controls="manage-courses"
                        aria-selected="true">Управление
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="logs-courses-tab" data-bs-toggle="tab" data-bs-target="#logs-courses"
                        type="button" role="tab" aria-controls="logs-courses" aria-selected="false">История
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="promo-codes-tab" data-bs-toggle="tab"
                        data-bs-target="#promo-codes" type="button" role="tab" aria-controls="promo-codes-courses"
                        aria-selected="false">Промокоды
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="referrals-tab" data-bs-toggle="tab"
                        data-bs-target="#referrals" type="button" role="tab" aria-controls="referrals-courses"
                        aria-selected="false">Реферальные ссылки
                </button>
            </li>
        </ul>
        <div class="tab-content py-4" id="coursesTabContent">
            <div class="tab-pane fade show active" id="manage-courses" role="tabpanel"
                 aria-labelledby="manage-courses-tab">
                <div class="row" v-if="isDataLoaded">
                    <div class="col-lg-4" v-for="card in packageCards" :key="card.key">
                        <div class="card mb-4">
                            <div class="card-body">
                                <h5 class="card-title">Пакет "{{ card.title }}"</h5>

                                <form @submit.prevent="savePackage(card.key)">
                                    <div class="mb-3">
                                        <label :for="idFor(card.key, 'name')" class="form-label">Название пакета</label>
                                        <input
                                            autocomplete="off"
                                            class="form-control"
                                            :id="idFor(card.key, 'name')"
                                            v-model="packages[card.key].name"
                                        />
                                    </div>

                                    <div class="mb-3">
                                        <label :for="idFor(card.key, 'priceOld')" class="form-label">Старая цена</label>
                                        <div class="price-input-wrapper">
                                            <input
                                                type="hidden"
                                                :id="idFor(card.key, 'priceOld-hidden')"
                                                v-model.number="packages[card.key].priceOld"
                                            />

                                            <input
                                                type="text"
                                                autocomplete="off"
                                                class="form-control price-display"
                                                :id="idFor(card.key, 'priceOld')"
                                                :value="formattedPrice(packages[card.key].priceOld)"
                                                @input="updatePrice(card.key, 'priceOld', $event.target.value)"
                                                placeholder="14 500"
                                            />
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        <label :for="idFor(card.key, 'priceNew')" class="form-label">Новая цена</label>
                                        <div class="price-input-wrapper">
                                            <input
                                                type="hidden"
                                                :id="idFor(card.key, 'priceNew-hidden')"
                                                v-model.number="packages[card.key].priceNew"
                                            />

                                            <input
                                                type="text"
                                                autocomplete="off"
                                                class="form-control price-display"
                                                :id="idFor(card.key, 'priceNew')"
                                                :value="formattedPrice(packages[card.key].priceNew)"
                                                @input="updatePrice(card.key, 'priceNew', $event.target.value)"
                                                placeholder="14 500"
                                            />
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        <label :for="idFor(card.key, 'contentLink')" class="form-label">Id
                                            телеграмм-чата</label>
                                        <input
                                            autocomplete="off"
                                            class="form-control"
                                            :id="idFor(card.key, 'contentLink')"
                                            v-model="packages[card.key].contentLink"
                                        />
                                    </div>

                                    <button type="submit" class="btn btn-primary" :disabled="!isDataLoaded">
                                        Сохранить "{{ card.title }}"
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="text-muted">Загрузка...</div>
            </div>
        </div>
        <div class="tab-pane fade" id="logs-courses" role="tabpanel" aria-labelledby="logs-courses-tab">
            <div class="container-fluid">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex align-items-center">
                        <label for="statusFilter" class="me-1 fw-medium">Статус:</label>
                        <select id="statusFilter" v-model="filters.status" @change="fetchData" class="form-select"
                                style="width:200px;">
                            <option :value="null">Все</option>
                            <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option>
                        </select>

                        <button class="btn btn-outline-success ms-2" type="button" @click="openExportModal">
                            Экспорт в Excel
                        </button>
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
                            <th>Код рефа</th>
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
                            <td class="text-center">
                                <p v-if="t.referral">
                                    {{ t.referral.ref_code }}
                                </p>
                                <p v-else>-</p>
                            </td>
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

                        <li v-for="page in pages" :key="page" class="page-item"
                            :class="{ active: page === meta.current_page }">
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

        <div class="modal fade" id="exportColumnsModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-scrollable">
                <div class="modal-content">

                    <div class="modal-header">
                        <h5 class="modal-title">Экспорт в Excel — выбор столбцов</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                    </div>

                    <div class="modal-body">
                        <div class="row g-3 mb-2">
                            <div class="col-md-4">
                                <label class="form-label fw-medium">Статус</label>
                                <select class="form-select"
                                        v-model="exportFilters.status"
                                        :disabled="exporting">
                                    <option :value="null">Все</option>
                                    <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option>
                                </select>
                            </div>

                            <div class="col-md-4">
                                <label class="form-label fw-medium">Пакет</label>
                                <select class="form-select"
                                        v-model="exportFilters.package_id"
                                        :disabled="exporting">
                                    <option :value="null">Все</option>

                                    <option v-for="(p, key) in packages" :key="key" :value="key">
                                        {{ p.name }}
                                    </option>
                                </select>
                            </div>

                            <div class="col-md-4 d-flex align-items-end">
                                <button class="btn btn-outline-secondary w-100"
                                        type="button"
                                        @click="resetExportFilters"
                                        :disabled="exporting">
                                    Сбросить фильтры
                                </button>
                            </div>

                            <div class="col-md-6">
                                <label class="form-label fw-medium">Дата от (created_at)</label>
                                <input type="date"
                                       class="form-control"
                                       v-model="exportFilters.date_from"
                                       :disabled="exporting">
                            </div>

                            <div class="col-md-6">
                                <label class="form-label fw-medium">Дата до (created_at)</label>
                                <input type="date"
                                       class="form-control"
                                       v-model="exportFilters.date_to"
                                       :disabled="exporting">
                            </div>

                            <div class="col-md-4 d-flex align-items-center">
                                <div class="form-check">
                                    <input class="form-check-input"
                                           type="checkbox"
                                           id="specialFilter"
                                           v-model="exportFilters.cancelled_or_pending_with_paid_referral"
                                           :disabled="exporting">
                                    <label class="form-check-label small" for="specialFilter">
                                        Показать: без успешной оплаты
                                    </label>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="d-flex flex-wrap gap-2 align-items-center mb-3">
                            <button class="btn btn-sm btn-outline-primary" type="button" @click="selectAllColumns">
                                Выбрать все
                            </button>
                            <button class="btn btn-sm btn-outline-secondary" type="button" @click="clearAllColumns">
                                Снять все
                            </button>

                            <div class="ms-auto d-flex align-items-center gap-2">
                                <label class="text-muted small mb-0">Файл:</label>
                                <input type="text" class="form-control form-control-sm" style="width: 260px;"
                                       v-model="exportFileName" placeholder="transactions.xlsx">
                            </div>
                        </div>

                        <div class="alert alert-warning py-2" v-if="transactions.length === 0">
                            На текущей странице нет данных. Экспорт всё равно может быть сформирован на сервере по
                            фильтрам.
                        </div>

                        <div class="row">
                            <div class="col-md-6" v-for="col in exportColumns" :key="col.key">
                                <div class="form-check mb-2">
                                    <input class="form-check-input"
                                           type="checkbox"
                                           :id="'col-' + col.key"
                                           :value="col.key"
                                           v-model="selectedColumnKeys"
                                           :disabled="exporting">
                                    <label class="form-check-label" :for="'col-' + col.key">
                                        {{ col.label }}
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="text-danger small mt-2" v-if="selectedColumnKeys.length === 0">
                            Выберите хотя бы один столбец.
                        </div>
                    </div>

                    <div class="modal-footer">
                        <div class="me-auto text-muted small" v-if="exporting">
                            Формируем файл…
                        </div>

                        <button type="button" class="btn btn-light" data-bs-dismiss="modal" :disabled="exporting">
                            Отмена
                        </button>

                        <button type="button"
                                class="btn btn-success"
                                :disabled="exporting || selectedColumnKeys.length === 0"
                                @click="exportToExcel">
                            <span v-if="!exporting">Выгрузить</span>
                            <span v-else>Экспорт…</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PromocodesComponent from "./modules/PromocodesComponent.vue";
import ReferralGenerator from "./modules/ReferralGeneratorForm.vue";
import ReferralsComponent from "./modules/ReferralsComponent.vue";

const emptyPackage = (name) => ({
    id: null,
    name,
    priceOld: 0,
    priceNew: 0,
    contentLink: "",
});

export default {
    name: "AdminCoursesComponent",
    components: {ReferralsComponent, ReferralGenerator, PromocodesComponent},
    data() {
        return {
            packages: {
                mini: emptyPackage("Мини"),
                opti: emptyPackage("Опти"),
                maxi: emptyPackage("Макси"),
            },
            isDataLoaded: false,
            filters: {
                status: null,
            },
            transactions: [],
            meta: {},
            links: {next: null, prev: null},
            statuses: ['succeeded', 'pending', 'canceled'],
            baseDomain: window.location.origin,
            selectedColumnKeys: [],
            exportModalInstance: null,
            exporting: false,
            exportFileName: "",
            exportFilters: {
                status: null,
                package_id: null,
                date_from: null,
                date_to: null,
                cancelled_or_pending_with_paid_referral: false
            },
        }
    },
    computed: {
        packageCards() {
            return [
                {key: "mini", title: "Мини"},
                {key: "opti", title: "Опти"},
                {key: "maxi", title: "Макси"},
            ];
        },
        pages() {
            const arr = [];
            for (let i = 1; i <= (this.meta.last_page || 1); i++) {
                arr.push(i);
            }
            return arr;
        },
        exportColumns() {
            return [
                {key: "user_full_name", label: "Пользователь: ФИО"},
                {key: "user_email", label: "Пользователь: Почта"},
                {key: "user_phone", label: "Пользователь: Номер"},

                {key: "package_name", label: "Название пакета"},

                {key: "status", label: "Статус транзакции"},
                {key: "amount", label: "Сумма"},
                {key: "payment_at", label: "Дата оплаты"},

                {key: "referrer_full_name", label: "Реферал: ФИО"},
                {key: "referrer_email", label: "Реферал: Почта"},
                {key: "referrer_tg_username", label: "Реферал: TG Username"},

                {key: "payment_link", label: "Ссылка на оплату"},
            ];
        },
        exportPackagesList() {
            return Object.values(this.packages || {}).filter(p => p && p.id);
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
        idFor(packageKey, field) {
            return `${packageKey}-${field}`;
        },
        async fetchData(page = 1) {
            try {
                const {data} = await axios.get('/admin/api/transactions', {
                    params: {...this.filters, page},
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

        openExportModal() {
            if (!this.selectedColumnKeys.length) {
                this.selectedColumnKeys = this.exportColumns.map(c => c.key);
            }

            if (!this.exportFileName) {
                const d = new Date();
                const yyyy = d.getFullYear();
                const mm = String(d.getMonth() + 1).padStart(2, "0");
                const dd = String(d.getDate()).padStart(2, "0");
                this.exportFileName = `transactions_${yyyy}-${mm}-${dd}.xlsx`;
            }

            const el = document.getElementById("exportColumnsModal");
            this.exportModalInstance = window.bootstrap?.Modal.getOrCreateInstance(el);
            this.exportModalInstance?.show();
        },

        selectAllColumns() {
            this.selectedColumnKeys = this.exportColumns.map(c => c.key);
        },

        clearAllColumns() {
            this.selectedColumnKeys = [];
        },

        async exportToExcel() {
            if (this.selectedColumnKeys.length === 0) return;

            this.exporting = true;

            try {
                const payload = {
                    filters: {
                        status: this.exportFilters.status,
                        package_id: this.exportFilters.package_id,
                        date_from: this.exportFilters.date_from,
                        date_to: this.exportFilters.date_to,
                        cancelled_or_pending_with_paid_referral: this.exportFilters.cancelled_or_pending_with_paid_referral,
                    },
                    columns: this.selectedColumnKeys,
                    file_name: this.exportFileName,
                };

                const res = await axios.post("/admin/api/transactions/export", payload, {responseType: "blob"});

                const cd = res.headers["content-disposition"] || "";
                const match = cd.match(/filename\*=UTF-8''(.+)$|filename="?([^"]+)"?/i);
                const fromHeader = match ? decodeURIComponent(match[1] || match[2]) : null;

                const fileName = fromHeader || this.exportFileName || "transactions.xlsx";

                const blob = new Blob([res.data], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                });

                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", fileName);
                document.body.appendChild(link);
                link.click();
                link.remove();
                window.URL.revokeObjectURL(url);

                this.exportModalInstance?.hide();
            } catch (e) {
                console.error(e);

                try {
                    const text = await e?.response?.data?.text?.();
                    if (text) {
                        let msg = "Не удалось выгрузить Excel.";
                        try {
                            const json = JSON.parse(text);
                            msg = json.message || msg;
                        } catch (_) {
                        }
                        alert(msg);
                    } else {
                        alert("Не удалось выгрузить Excel. Попробуйте позже.");
                    }
                } catch (_) {
                    alert("Не удалось выгрузить Excel. Попробуйте позже.");
                }
            } finally {
                this.exporting = false;
            }
        },
        resetExportFilters() {
            this.exportFilters = {
                status: null,
                package_id: null,
                date_from: null,
                date_to: null,
                cancelled_or_pending_with_paid_referral: false
            };
        },
    }
}
</script>
