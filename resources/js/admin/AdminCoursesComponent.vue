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
                                <label for="miniOldPrice" class="form-label">Старая цена</label>
                                <div class="price-input-wrapper">
                                    <input type="hidden" id="miniOldPriceHidden"
                                           v-model.number="packages.mini.oldPrice">

                                    <input type="text"
                                           autocomplete="off"
                                           class="form-control price-display"
                                           id="miniOldPriceDisplay"
                                           :value="formattedPrice(packages.mini.oldPrice)"
                                           @input="updatePrice('mini', 'oldPrice', $event.target.value)"
                                           @blur="handleBlur('mini', 'oldPrice')"
                                           @focus="handleFocus('mini', 'oldPrice')"
                                           placeholder="14 500">
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="miniNewPrice" class="form-label">Новая цена</label>
                                <div class="price-input-wrapper">
                                    <input type="hidden" id="miniNewPriceHidden"
                                           v-model.number="packages.mini.newPrice">
                                    <input type="text"
                                           autocomplete="off"
                                           class="form-control price-display"
                                           id="miniNewPriceDisplay"
                                           :value="formattedPrice(packages.mini.newPrice)"
                                           @input="updatePrice('mini', 'newPrice', $event.target.value)"
                                           @blur="handleBlur('mini', 'newPrice')"
                                           @focus="handleFocus('mini', 'newPrice')"
                                           placeholder="14 500">
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="miniContentLink" class="form-label">Контент-ссылка</label>
                                <input autocomplete="off" class="form-control" id="miniContentLink"
                                       v-model="packages.mini.contentLink">
                            </div>

                            <button type="submit" class="btn btn-primary" :disabled="!isDataLoaded">Сохранить "Мини"</button>
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
                                <label for="miniOldPrice" class="form-label">Старая цена</label>
                                <div class="price-input-wrapper">
                                    <input type="hidden" id="miniOldPriceHidden"
                                           v-model.number="packages.opti.oldPrice">

                                    <input type="text"
                                           autocomplete="off"
                                           class="form-control price-display"
                                           id="miniOldPriceDisplay"
                                           :value="formattedPrice(packages.opti.oldPrice)"
                                           @input="updatePrice('opti', 'oldPrice', $event.target.value)"
                                           @blur="handleBlur('opti', 'oldPrice')"
                                           @focus="handleFocus('opti', 'oldPrice')"
                                           placeholder="14 500">
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="miniNewPrice" class="form-label">Новая цена</label>
                                <div class="price-input-wrapper">
                                    <input type="hidden" id="miniNewPriceHidden"
                                           v-model.number="packages.opti.newPrice">
                                    <input type="text"
                                           autocomplete="off"
                                           class="form-control price-display"
                                           id="miniNewPriceDisplay"
                                           :value="formattedPrice(packages.opti.newPrice)"
                                           @input="updatePrice('opti', 'newPrice', $event.target.value)"
                                           @blur="handleBlur('opti', 'newPrice')"
                                           @focus="handleFocus('opti', 'newPrice')"
                                           placeholder="14 500">
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="optiContentLink" class="form-label">Контент-ссылка</label>
                                <input autocomplete="off" class="form-control" id="optiContentLink"
                                       v-model="packages.opti.contentLink">
                            </div>

                            <button type="submit" class="btn btn-primary" :disabled="!isDataLoaded">Сохранить "Опти"</button>
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
                                <label for="miniOldPrice" class="form-label">Старая цена</label>
                                <div class="price-input-wrapper">
                                    <input type="hidden" id="miniOldPriceHidden"
                                           v-model.number="packages.maxi.oldPrice">

                                    <input type="text"
                                           autocomplete="off"
                                           class="form-control price-display"
                                           id="miniOldPriceDisplay"
                                           :value="formattedPrice(packages.maxi.oldPrice)"
                                           @input="updatePrice('maxi', 'oldPrice', $event.target.value)"
                                           @blur="handleBlur('maxi', 'oldPrice')"
                                           @focus="handleFocus('maxi', 'oldPrice')"
                                           placeholder="14 500">
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="miniNewPrice" class="form-label">Новая цена</label>
                                <div class="price-input-wrapper">
                                    <input type="hidden" id="miniNewPriceHidden"
                                           v-model.number="packages.maxi.newPrice">
                                    <input type="text"
                                           autocomplete="off"
                                           class="form-control price-display"
                                           id="miniNewPriceDisplay"
                                           :value="formattedPrice(packages.maxi.newPrice)"
                                           @input="updatePrice('maxi', 'newPrice', $event.target.value)"
                                           @blur="handleBlur('maxi', 'newPrice')"
                                           @focus="handleFocus('maxi', 'newPrice')"
                                           placeholder="14 500">
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="maxiContentLink" class="form-label">Контент-ссылка</label>
                                <input autocomplete="off" class="form-control" id="maxiContentLink"
                                       v-model="packages.maxi.contentLink">
                            </div>

                            <button type="submit" class="btn btn-primary" :disabled="!isDataLoaded">Сохранить "Макси"</button>
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
                    oldPrice: 0,
                    newPrice: 0,
                    contentLink: '',
                },
                opti: {
                    id: null,
                    name: 'Опти',
                    oldPrice: 0,
                    newPrice: 0,
                    contentLink: '',
                },
                maxi: {
                    id: null,
                    name: 'Макси',
                    oldPrice: 0,
                    newPrice: 0,
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
                            oldPrice: parseInt(packagesData.mini.oldPrice),
                            newPrice: parseInt(packagesData.mini.newPrice)
                        };
                    }
                    if (packagesData.opti) {
                        this.packages.opti = {
                            ...packagesData.opti,
                            oldPrice: parseInt(packagesData.opti.oldPrice),
                            newPrice: parseInt(packagesData.opti.newPrice)
                        };
                    }
                    if (packagesData.maxi) {
                        this.packages.maxi = {
                            ...packagesData.maxi,
                            oldPrice: parseInt(packagesData.maxi.oldPrice),
                            newPrice: parseInt(packagesData.maxi.newPrice)
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

            if (!packageToSave.id) {
                alert(`Ошибка: ID пакета "${packageName}" отсутствует.`);
                return;
            }

            axios.put(`/admin/api/courses/${packageToSave.id}`, packageToSave)
                .then(response => {
                    alert(`Пакет "${packageName}" успешно сохранен!`);
                    if (response.data.course) {
                        this.packages[packageName] = { ...packageToSave, ...response.data.course };
                    }
                }).catch(error => {
                let errorMessage = `Ошибка при сохранении пакета "${packageName}".`;
                if (error.response && error.response.data && error.response.data.message) {
                    errorMessage += `\n${error.response.data.message}`;
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
