<template>
    <div class="container mt-4">
        <h3 class="mb-4 fw-bold">Управление пакетами</h3>

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
                                <label for="miniContentLink" class="form-label">Контент-ссылка</label>
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
                                <label for="optiContentLink" class="form-label">Контент-ссылка</label>
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
                                <label for="maxiContentLink" class="form-label">Контент-ссылка</label>
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
</template>

<script>
export default {
    name: "AdminCoursesComponent",
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
            isDataLoaded: false
        };
    },
    mounted() {
        this.loadPackages();
    },
    methods: {
        loadPackages() {
            axios.get('/api/courses')
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
