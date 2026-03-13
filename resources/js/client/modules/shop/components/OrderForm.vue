<template>
    <div class="modal-overlay" @click.self="closeModal">
        <div class="modal modal-content modal-content-order">
            <div class="order-page-container container">
                <div class="left-column">
                    <header class="nav-header nav-header-desktop">
                        <button class="back-link" @click="handleBack">
                            <svg class="icon-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                            </svg>
                            Назад
                        </button>
                    </header>

                    <h2 class="main-title">Доставка</h2>

                    <div v-if="currentStep === 1" class="form-section">
                        <div class="form-group autocomplete" ref="autocomplete">
                            <div class="input-wrapper">
                                <input v-model="form.city" type="text" placeholder="Выберите Ваш город"
                                       class="form-input" @input="searchCities" @focus="onCityFocus"/>
                                <button v-if="form.city" class="clear-btn" @click="clearCity" type="button">
                                    ×
                                </button>
                            </div>

                            <ul v-if="cities.length || showCityNotFound" class="autocomplete-list">
                                <li v-for="city in cities" :key="city.uuid" @click="selectCity(city)">
                                    {{ city.city_name }}, {{ city.region }}
                                </li>
                                <li v-if="showCityNotFound" class="city-not-found">
                                    Город не найден
                                </li>
                            </ul>
                        </div>

                        <div v-if="loadingDeliveryOptions" class="placeholder-glow mb-2 rounded-2">
                            <div class="placeholder col-12 mb-3" style="height:80px;"></div>
                        </div>

                        <template v-else-if="deliveryOptions.length">
                            <label v-for="option in deliveryOptions" :key="option.type" class="delivery-option">
                                <input type="radio" name="delivery_type" :value="option.type"
                                       :checked="selectedDeliveryType === option.type"
                                       @change="selectDeliveryOption(option)">

                                <span class="delivery-option__text">
                                    <strong>{{ option.title }}</strong>,
                                    от {{ formatDeliveryDays(option) }} дней,
                                    от {{ formatPrice(option.price) }} руб.
                                </span>
                            </label>
                        </template>

                        <div class="price-box price-box-mobile">
                            <div class="pay-row">
                                <span class="pay-label">К оплате:</span>
                                <span class="pay-value">{{ formatRub(itemsTotal) }} р.</span>
                            </div>

                            <div class="price-lines">
                                <div>Сумма: {{ formatRub(itemsTotal) }} руб</div>

                                <div v-if="selectedDeliveryTitle && form.city_code">
                                    {{ selectedDeliveryTitle }}:
                                    <template v-if="isLoadingPriceCdek">
                                        <span class="placeholder-glow ms-1">
                                            <span class="placeholder" style="width: 60px;"></span>
                                        </span>
                                    </template>
                                    <template v-else>
                                        {{ formatRub(deliveryCost) }} руб
                                    </template>
                                </div>

                                <div v-if="form.city_code" class="city-small">
                                    {{ form.city }}
                                </div>
                            </div>

                            <div class="final-row">
                                Итоговая сумма: {{ formatRub(itemsTotal) }} руб
                            </div>
                        </div>

                        <button class="btn btn-cta" @click="goNextStep"
                                :disabled="loading || !form.city_code || !selectedDeliveryType">
                            {{ loading ? 'Загрузка...' : 'Продолжить' }}
                        </button>

                        <div v-if="deliveryOptions.length === 0 && form.city_code && !loadingDeliveryOptions"
                             class="delivery-loading mt-3">
                            К сожалению доставка в выбранный город на данный момент не осуществляется.
                            Обратитесь в наш <a href="https://t.me/putclub_info">чат поддержки</a>
                            мы решим эту проблему.
                        </div>
                    </div>

                    <div v-else class="form-section">
                        <div class="form-group">
                            <input v-model="form.fio" type="text" placeholder="Ваше ФИО" class="form-input"/>
                        </div>

                        <div class="form-group">
                            <input v-model="form.phone" type="tel" placeholder="Ваш номер" class="form-input"
                                   v-mask="'+7 (###) ###-##-##'" autocomplete="tel"/>
                        </div>

                        <div class="form-group">
                            <input v-model="form.email" type="email" placeholder="Ваш Email" class="form-input"/>
                        </div>

                        <div v-if="form.delivery_mode === 'door'">
                            <div class="form-group autocomplete" ref="streetAutocomplete">
                                <div class="input-wrapper">
                                    <input
                                        v-model="form.street"
                                        type="text"
                                        placeholder="Улица"
                                        class="form-input"
                                        @input="searchStreets"
                                        @focus="onStreetFocus"
                                        autocomplete="off"
                                    />
                                    <button v-if="form.street" class="clear-btn" @click="clearStreet" type="button">
                                        ×
                                    </button>
                                </div>

                                <ul v-if="streets.length || showStreetNotFound" class="autocomplete-list">
                                    <li v-for="street in streets" :key="street" @click="selectStreet(street)">
                                        {{ street }}
                                    </li>
                                    <li v-if="showStreetNotFound" class="city-not-found">
                                        Улица не найдена
                                    </li>
                                </ul>
                            </div>

                            <div class="address-row">
                                <div class="form-group autocomplete" ref="buildingAutocomplete">
                                    <div class="input-wrapper">
                                        <input
                                            v-model="form.house"
                                            type="text"
                                            placeholder="Дом"
                                            class="form-input"
                                            @input="searchBuildings"
                                            @focus="fetchBuildings"
                                            autocomplete="off"/>
                                        <button v-if="form.house" class="clear-btn" @click="clearHouse" type="button">
                                            ×
                                        </button>
                                    </div>

                                    <ul v-if="buildings.length || showBuildingNotFound" class="autocomplete-list">
                                        <li v-for="building in buildings" :key="building"
                                            @click="selectBuilding(building)">
                                            {{ building }}
                                        </li>
                                        <li v-if="showBuildingNotFound" class="city-not-found">
                                            Дом не найден
                                        </li>
                                    </ul>
                                </div>

                                <div class="form-group">
                                    <input v-model="form.flat" type="text" placeholder="Квартира/офис"
                                           class="form-input"/>
                                </div>
                            </div>

                            <div class="address-row">
                                <div class="form-group">
                                    <input v-model="form.entrance" type="text" placeholder="Подъезд"
                                           class="form-input"/>
                                </div>

                                <div class="form-group">
                                    <input v-model="form.floor" type="text" placeholder="Этаж" class="form-input"/>
                                </div>
                            </div>
                        </div>

                        <div v-if="form.delivery_mode === 'pickup'" class="pickup-points">
                            <div v-if="loadingDeliveryPoints" class="delivery-loading">
                                Загрузка ПВЗ...
                            </div>

                            <div v-else>
                                <div class="form-group pickup-search position-relative">
                                    <input v-model="pickupSearch" type="text" placeholder="Поиск по адресу ПВЗ"
                                           class="form-input" autocomplete="off"/>
                                    <button v-if="pickupSearch" class="clear-btn" @click="pickupSearch = ''"
                                            type="button">
                                        ×
                                    </button>
                                </div>

                                <div v-if="filteredDeliveryPoints.length" class="pickup-points-list">
                                    <ul class="pickup-dropdown">
                                        <li v-for="point in filteredDeliveryPoints" :key="point.code"
                                            class="pickup-dropdown-item"
                                            :class="{ 'pickup-selected': form.pickup_point_code === point.code }"
                                            @click="selectPickupPoint(point)">
                                            <div class="pickup-dropdown-title">
                                                {{ point.name || point.code }}
                                            </div>

                                            <div class="pickup-dropdown-address">
                                                {{ point.address }}
                                            </div>

                                            <div v-if="point.work_time" class="pickup-dropdown-time">
                                                {{ point.work_time }}
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div v-else class="pickup-empty">
                                    ПВЗ не найдены
                                </div>
                            </div>
                        </div>

                        <label class="agreement">
                            <input v-model="form.agreement" type="checkbox"/>
                            <span class="fw-800">Я согласен/а с политикой конфиденциальности</span>
                        </label>

                        <button class="btn btn-cta" @click="submitOrder" :disabled="loading || !canSubmit">
                            {{ loading ? 'Переход к оплате...' : 'Оформить' }}
                        </button>
                    </div>
                </div>

                <div class="right-column overflow-auto">
                    <button class="back-link" @click="handleBack">
                        <svg class="icon-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                        Назад
                    </button>

                    <h2 class="order-summary-title">Ваш заказ:</h2>

                    <div class="items-list">
                        <div v-for="item in items" :key="item.productId + ':' + item.sku" class="product-card">
                            <img class="product-image" :src="getPrimaryImageUrl(item) || fallbackImage" alt="Product"/>

                            <div class="product-details">
                                <div class="product-name">
                                    {{ item.name }}
                                </div>

                                <div class="meta">
                                    <div v-for="attr in item.attributes" :key="attr.sku_key">
                                        {{ attr.name }}:<br/>
                                        <b>{{ item.current_sku?.[attr.sku_key] }}</b>
                                    </div>
                                </div>

                                <div class="qty-row">
                                    <span class="qty-label">Количество:</span>
                                    <div class="d-flex">
                                        <button class="qty-btn" @click.stop.prevent="updateQuantity(item, 1)"
                                                aria-label="plus">+
                                        </button>
                                        <span class="qty-pill">{{ item.quantity }}</span>
                                        <button class="qty-btn" @click.stop.prevent="updateQuantity(item, -1)"
                                                aria-label="minus">-
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="price-box">
                        <div class="pay-row">
                            <span class="pay-label">К оплате:</span>
                            <span class="pay-value">{{ formatRub(itemsTotal) }} р.</span>
                        </div>

                        <div class="price-lines">
                            <div>Сумма: {{ formatRub(itemsTotal) }} руб</div>

                            <div v-if="selectedDeliveryTitle && form.city_code">
                                {{ selectedDeliveryTitle }}:
                                <template v-if="isLoadingPriceCdek">
                                        <span class="placeholder-glow ms-1">
                                            <span class="placeholder" style="width: 60px;"></span>
                                        </span>
                                </template>
                                <template v-else>
                                    {{ formatRub(deliveryCost) }} руб
                                </template>
                            </div>

                            <div v-if="form.city_code" class="city-small">
                                {{ form.city }}
                            </div>
                        </div>

                        <div class="final-row">
                            Итоговая сумма: {{ formatRub(itemsTotal) }} руб
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import eventBus from "../../../../event-bus";

const CART_STORAGE_KEY = 'shoppingCart';

export default {
    name: 'OrderModal',
    props: {
        product: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            currentStep: 1,
            loading: false,
            loadingDeliveryOptions: false,
            loadingDeliveryPoints: false,

            items: [],
            cities: [],
            streets: [],
            buildings: [],

            citySearchText: '',
            streetSearchText: '',
            showCityNotFound: false,
            showStreetNotFound: false,
            showBuildingNotFound: false,

            deliveryOptions: [],
            deliveryPoints: [],
            selectedDeliveryType: null,
            selectedDeliveryTariffCode: null,
            deliveryCost: 0,

            form: {
                city: '',
                city_code: null,
                city_uuid: null,
                city_name: '',
                city_region: '',
                city_fias_guid: '',

                delivery_mode: null,
                pickup_point_code: '',
                pickup_point_address: '',

                fio: '',
                phone: '',
                email: '',
                street: '',
                house: '',
                flat: '',
                entrance: '',
                floor: '',
                agreement: false,
            },
            pickupSearch: '',
            pickupDropdown: false,

            citySearchTimer: null,
            streetSearchTimer: null,
            houseSearchTimer: null,

            createdOrderId: null,
            barcodePollingTimer: null,

            deliveryRecalculateTimer: null,
            lastDeliveryCalcSignature: null,

            isLoadingPriceCdek: false,

            fallbackImage:
                'data:image/svg+xml;charset=UTF-8,' +
                encodeURIComponent(
                    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="240">
                        <rect width="100%" height="100%" fill="#f2f2f2"/>
                        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
                              font-family="Arial" font-size="14" fill="#999">Фото</text>
                    </svg>`
                )
        };
    },
    computed: {
        itemsTotal() {
            return this.items.reduce((sum, it) => {
                const price = Number(it?.current_sku?.price ?? 0);
                const qty = Number(it?.quantity ?? 0);
                return sum + price * qty;
            }, 0);
        },
        totalWeight() {
            return this.items.reduce((sum, item) => {
                const weight = Number(item?.current_sku?.weight ?? item?.weight ?? 0);
                const qty = Number(item?.quantity ?? 0);
                return sum + weight * qty;
            }, 0);
        },
        packageLength() {
            return this.items.length
                ? Math.max(...this.items.map(item => Number(item?.current_sku?.length ?? item?.length ?? 10)))
                : 10;
        },
        packageWidth() {
            return this.items.length
                ? Math.max(...this.items.map(item => Number(item?.current_sku?.width ?? item?.width ?? 10)))
                : 10;
        },
        packageHeight() {
            return this.items.reduce((sum, item) => {
                const height = Number(item?.current_sku?.height ?? item?.height ?? 5);
                const qty = Number(item?.quantity ?? 0);
                return sum + height * qty;
            }, 0) || 5;
        },
        selectedDeliveryTitle() {
            const option = this.deliveryOptions.find(item => item.type === this.selectedDeliveryType);
            return option ? option.title : '';
        },
        canSubmit() {
            if (!this.form.agreement) return false;
            if (!this.form.city_code) return false;
            if (!this.form.delivery_mode) return false;
            if (!this.form.fio || !this.form.phone) return false;

            if (this.form.delivery_mode === 'door') {
                return !!this.form.street && !!this.form.house;
            }

            if (this.form.delivery_mode === 'pickup') {
                return !!this.form.pickup_point_code;
            }

            return false;
        },

        filteredDeliveryPoints() {
            const q = (this.pickupSearch || '').trim().toLowerCase();

            if (!q) {
                return this.deliveryPoints;
            }

            return this.deliveryPoints.filter(point => {
                const name = (point.name || '').toLowerCase();
                const address = (point.address || '').toLowerCase();
                const addressFull = (point.address_full || '').toLowerCase();

                return (
                    name.includes(q) ||
                    address.includes(q) ||
                    addressFull.includes(q)
                );
            });
        },
    },
    mounted() {
        document.addEventListener('keydown', this.handleKeydown);
        document.addEventListener('click', this.handleClickOutside);
        document.body.style.overflow = 'hidden';
        this.loadCart();
    },
    beforeDestroy() {
        document.removeEventListener('keydown', this.handleKeydown);
        document.removeEventListener('click', this.handleClickOutside);
        document.body.style.overflow = 'auto';

        if (this.citySearchTimer) {
            clearTimeout(this.citySearchTimer);
        }

        if (this.streetSearchTimer) {
            clearTimeout(this.streetSearchTimer);
        }

        if (this.houseSearchTimer) {
            clearTimeout(this.houseSearchTimer);
        }

        if (this.deliveryRecalculateTimer) {
            clearTimeout(this.deliveryRecalculateTimer);
        }
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },

        handleBack() {
            if (this.currentStep === 2) {
                this.currentStep = 1;
                return;
            }

            this.closeModal();
        },

        handleKeydown(e) {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        },

        handleClickOutside(event) {
            const cityEl = this.$refs.autocomplete;
            if (cityEl && !cityEl.contains(event.target)) {
                this.cities = [];
                this.showCityNotFound = false;
            }

            const streetEl = this.$refs.streetAutocomplete;
            if (streetEl && !streetEl.contains(event.target)) {
                this.streets = [];
                this.showStreetNotFound = false;
            }

            const buildingEl = this.$refs.buildingAutocomplete;
            if (buildingEl && !buildingEl.contains(event.target)) {
                this.buildings = [];
                this.showBuildingNotFound = false;
            }
        },

        formatRub(value) {
            const n = Number(value);
            if (Number.isNaN(n)) return value;
            const hasDecimals = Math.round(n * 100) !== Math.round(n) * 100;
            return hasDecimals ? n.toFixed(2) : String(Math.trunc(n));
        },

        formatPrice(price) {
            return Number(price || 0).toFixed(2);
        },

        formatDeliveryDays(option) {
            if (option.period_min && option.period_max && option.period_min !== option.period_max) {
                return `${option.period_min}-${option.period_max}`;
            }

            return option.period_min || option.period_max || 0;
        },

        getCartFromStorage() {
            const cartData = localStorage.getItem(CART_STORAGE_KEY);
            return cartData ? JSON.parse(cartData) : [];
        },

        saveCartToStorage(cart) {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        },

        loadCart() {
            this.items = this.getCartFromStorage();
        },

        getPrimaryImageUrl(product) {
            if (!product?.images?.length) return '';
            const primary = product.images.find(img => img.primary === true);
            return primary ? primary.image : product.images[0]?.image;
        },

        getAvailableStockForSKU(productId, sku) {
            const product = this.items.find(p => p.productId === productId && p.sku === sku);
            if (!product) return 0;
            return product.current_sku?.stock_qty ? product.current_sku.stock_qty : 0;
        },

        removeItem(itemToRemove) {
            const updatedCart = this.items.filter(item =>
                item.productId !== itemToRemove.productId || item.sku !== itemToRemove.sku
            );

            this.items = updatedCart;
            this.saveCartToStorage(updatedCart);
            localStorage.removeItem('pendingPaymentOrderId');
            eventBus.$emit('cart:updated');

            if (!this.items.length) {
                this.closeModal();
                return;
            }

            if (this.form.city_code) {
                this.scheduleDeliveryRecalculation();
            }
        },

        updateQuantity(item, change) {
            const newQuantity = item.quantity + change;
            const availableStock = this.getAvailableStockForSKU(item.productId, item.sku);

            eventBus.$emit('cart:updated');

            if (newQuantity <= 0) {
                this.removeItem(item);
                return;
            }

            if (availableStock && newQuantity > availableStock) {
                if (this.$notify) {
                    this.$notify({
                        group: 'notification',
                        type: 'warn',
                        duration: 4000,
                        title: 'Лимит достигнут',
                        text: 'Это максимально возможное количество товара на складе'
                    });
                }
                return;
            }

            const index = this.items.findIndex(
                i => i.sku === item.sku && i.productId === item.productId
            );

            if (index !== -1) {
                this.items[index].quantity = newQuantity;
                this.saveCartToStorage(this.items);
                localStorage.removeItem('pendingPaymentOrderId');

                if (this.form.city_code) {
                    this.scheduleDeliveryRecalculation();
                }
            }
        },

        clearCity() {
            this.form.city = '';
            this.form.city_code = null;
            this.form.city_uuid = null;
            this.form.city_name = '';
            this.form.city_region = '';
            this.form.city_fias_guid = '';

            this.form.street = '';
            this.form.house = '';
            this.form.flat = '';
            this.form.entrance = '';
            this.form.floor = '';

            this.form.delivery_mode = null;
            this.form.pickup_point_code = '';
            this.form.pickup_point_address = '';

            this.citySearchText = '';
            this.streetSearchText = '';

            this.cities = [];
            this.streets = [];
            this.buildings = [];

            this.showCityNotFound = false;
            this.showStreetNotFound = false;
            this.showBuildingNotFound = false;

            this.deliveryOptions = [];
            this.deliveryPoints = [];
            this.selectedDeliveryType = null;
            this.selectedDeliveryTariffCode = null;
            this.deliveryCost = 0;
        },

        fetchCities(query) {
            const q = (query || '').trim();

            if (q.length < 3) {
                this.cities = [];
                this.showCityNotFound = false;
                return;
            }

            axios.post('/api/cities', {city: q})
                .then((response) => {
                    this.cities = response.data.data || [];
                    this.showCityNotFound = this.cities.length === 0;
                })
                .catch(() => {
                    this.cities = [];
                    this.showCityNotFound = true;
                });
        },

        searchCities() {
            const q = (this.form.city || '').trim();

            this.form.city_uuid = null;
            this.form.city_code = null;
            this.form.city_name = '';
            this.form.city_region = '';
            this.form.city_fias_guid = '';

            this.form.street = '';
            this.form.house = '';
            this.form.flat = '';
            this.form.entrance = '';
            this.form.floor = '';

            this.streets = [];
            this.buildings = [];
            this.showStreetNotFound = false;
            this.showBuildingNotFound = false;

            this.deliveryOptions = [];
            this.deliveryPoints = [];
            this.selectedDeliveryType = null;
            this.selectedDeliveryTariffCode = null;
            this.deliveryCost = 0;
            this.citySearchText = q;

            if (this.citySearchTimer) {
                clearTimeout(this.citySearchTimer);
            }

            this.citySearchTimer = setTimeout(() => {
                if (q.length < 3) {
                    this.cities = [];
                    this.showCityNotFound = false;
                    return;
                }

                this.fetchCities(q);
            }, 350);
        },

        onCityFocus() {
            const q = (this.citySearchText || this.form.city || '').trim();

            if (this.cities.length) return;

            if (q.length < 3) {
                this.cities = [];
                this.showCityNotFound = false;
                return;
            }

            this.fetchCities(q);
        },

        async selectCity(city) {
            this.form.city = `${city.city_name}, ${city.region}`;
            this.form.city_uuid = city.uuid;
            this.form.city_code = city.code;
            this.form.city_name = city.city_name;
            this.form.city_region = city.region;
            this.form.city_fias_guid = city.fias_guid || '';

            this.form.street = '';
            this.form.house = '';
            this.form.flat = '';
            this.form.entrance = '';
            this.form.floor = '';

            this.streetSearchText = '';
            this.streets = [];
            this.buildings = [];
            this.showStreetNotFound = false;
            this.showBuildingNotFound = false;

            this.citySearchText = city.city_name;
            this.cities = [];
            this.showCityNotFound = false;

            this.lastDeliveryCalcSignature = null;
            await this.calculateDeliveryOptions({ preserveSelection: false });
            this.lastDeliveryCalcSignature = this.getDeliveryCalcSignature();
        },

        async calculateDeliveryOptions({ preserveSelection = false } = {}) {
            if (!this.form.city_code || !this.items.length) return;

            const previousType = preserveSelection ? this.selectedDeliveryType : null;
            const previousTariffCode = preserveSelection ? this.selectedDeliveryTariffCode : null;
            const previousPickupPointCode = preserveSelection ? this.form.pickup_point_code : '';
            const previousPickupPointAddress = preserveSelection ? this.form.pickup_point_address : '';

            this.loadingDeliveryOptions = true;
            this.isLoadingPriceCdek = true;

            if (!preserveSelection) {
                this.deliveryOptions = [];
                this.deliveryPoints = [];
                this.selectedDeliveryType = null;
                this.selectedDeliveryTariffCode = null;
                this.form.delivery_mode = null;
                this.form.pickup_point_code = '';
                this.form.pickup_point_address = '';
                this.pickupSearch = '';
                this.deliveryCost = 0;
            }

            try {
                const response = await axios.post('/api/delivery/calculate-options', {
                    to_location_code: this.form.city_code,
                    weight: this.totalWeight,
                    length: this.packageLength,
                    width: this.packageWidth,
                    height: this.packageHeight,
                });

                const data = response.data?.data || {};
                const options = [data.door, data.pickup].filter(Boolean);

                this.deliveryOptions = options;

                if (!options.length) {
                    this.selectedDeliveryType = null;
                    this.selectedDeliveryTariffCode = null;
                    this.form.delivery_mode = null;
                    this.form.pickup_point_code = '';
                    this.form.pickup_point_address = '';
                    this.pickupSearch = '';
                    this.deliveryPoints = [];
                    this.deliveryCost = 0;
                    return;
                }

                let selectedOption = null;

                if (preserveSelection && previousType) {
                    selectedOption = options.find(option => option.type === previousType) || null;
                }

                if (!selectedOption && preserveSelection && previousTariffCode) {
                    selectedOption = options.find(option => option.tariff_code === previousTariffCode) || null;
                }

                if (!selectedOption) {
                    selectedOption = options[0];
                }

                this.selectedDeliveryType = selectedOption.type;
                this.selectedDeliveryTariffCode = selectedOption.tariff_code;
                this.form.delivery_mode = selectedOption.type;
                this.deliveryCost = Number(selectedOption.price || 0);

                if (selectedOption.type === 'pickup') {
                    await this.loadDeliveryPoints({
                        preserveSelection,
                        previousPickupPointCode,
                        previousPickupPointAddress,
                    });
                } else {
                    this.deliveryPoints = [];
                    this.form.pickup_point_code = '';
                    this.form.pickup_point_address = '';
                    this.pickupSearch = '';
                }
            } catch (e) {
                this.deliveryOptions = [];
                this.deliveryPoints = [];
                this.selectedDeliveryType = null;
                this.selectedDeliveryTariffCode = null;
                this.form.delivery_mode = null;
                this.form.pickup_point_code = '';
                this.form.pickup_point_address = '';
                this.pickupSearch = '';
                this.deliveryCost = 0;
            } finally {
                this.loadingDeliveryOptions = false;
                this.isLoadingPriceCdek = false;
            }
        },

        async loadDeliveryPoints({
                                     preserveSelection = false,
                                     previousPickupPointCode = '',
                                     previousPickupPointAddress = '',
                                 } = {}) {
            if (!this.form.city_code) return;

            if (!preserveSelection) this.loadingDeliveryPoints = true;

            try {
                if (!preserveSelection || this.deliveryPoints.length !== 0) return;
                const response = await axios.post('/api/delivery/delivery-points', {
                    city_code: this.form.city_code,
                });

                this.deliveryPoints = response.data?.data || [];

                if (preserveSelection && previousPickupPointCode) {
                    const existingPoint = this.deliveryPoints.find(
                        point => point.code === previousPickupPointCode
                    );

                    if (existingPoint) {
                        this.form.pickup_point_code = existingPoint.code;
                        this.form.pickup_point_address = existingPoint.address;
                        this.pickupSearch = existingPoint.address;
                        return;
                    }
                }

                this.form.pickup_point_code = '';
                this.form.pickup_point_address = '';
                this.pickupSearch = preserveSelection ? previousPickupPointAddress || '' : '';
            } catch (e) {
                this.deliveryPoints = [];
                this.form.pickup_point_code = '';
                this.form.pickup_point_address = '';
                this.pickupSearch = '';
            } finally {
                this.loadingDeliveryPoints = false;
            }
        },

        async selectDeliveryOption(option) {
            this.selectedDeliveryType = option.type;
            this.selectedDeliveryTariffCode = option.tariff_code;
            this.form.delivery_mode = option.type;
            this.deliveryCost = Number(option.price || 0);

            if (option.type === 'pickup') {
                await this.loadDeliveryPoints({
                    preserveSelection: true,
                    previousPickupPointCode: this.form.pickup_point_code,
                    previousPickupPointAddress: this.form.pickup_point_address,
                });
            } else {
                this.deliveryPoints = [];
                this.form.pickup_point_code = '';
                this.form.pickup_point_address = '';
                this.pickupSearch = '';
            }
        },

        getDeliveryCalcSignature() {
            return JSON.stringify({
                city_code: this.form.city_code,
                weight: this.totalWeight,
                length: this.packageLength,
                width: this.packageWidth,
                height: this.packageHeight,
                items: this.items.map(item => ({
                    productId: item.productId,
                    sku: item.sku,
                    quantity: item.quantity,
                })),
            });
        },

        scheduleDeliveryRecalculation() {
            if (!this.form.city_code || !this.items.length) return;

            const signature = this.getDeliveryCalcSignature();

            if (signature === this.lastDeliveryCalcSignature) {
                return;
            }

            if (this.deliveryRecalculateTimer) {
                clearTimeout(this.deliveryRecalculateTimer);
            }

            this.deliveryRecalculateTimer = setTimeout(async () => {
                const currentSignature = this.getDeliveryCalcSignature();

                if (currentSignature === this.lastDeliveryCalcSignature) {
                    return;
                }

                await this.calculateDeliveryOptions({ preserveSelection: true });
                this.lastDeliveryCalcSignature = currentSignature;
            }, 700);
        },

        goNextStep() {
            this.currentStep = 2;
        },

        selectPickupPoint(point) {
            this.form.pickup_point_code = point.code;
            this.form.pickup_point_address = point.address;
            this.pickupSearch = point.address;
        },

        buildOrderItems() {
            return this.items.map(item => {
                const sku = item.current_sku || {};
                const price = Number(sku.price ?? 0);
                const quantity = Number(item.quantity ?? 1);
                const weight = Number(sku.weight ?? item.weight ?? 1);

                const attributeNames = {};

                (item.attributes || []).forEach(attr => {
                    if (attr?.sku_key && attr?.name) {
                        attributeNames[attr.sku_key] = attr.name;
                    }
                });

                const result = {
                    product_id: item.productId,
                    name: item.name,
                    sku: item.sku || sku.sku || '',
                    cost: price,
                    price: price,
                    amount: quantity,
                    quantity: quantity,
                    payment_value: price,
                    weight: weight,
                    length: Number(sku.length ?? 0),
                    width: Number(sku.width ?? 0),
                    height: Number(sku.height ?? 0),
                    attribute_names: attributeNames,
                };

                Object.keys(sku).forEach(key => {
                    if ([
                        'sku',
                        'price',
                        'stock_qty',
                        'weight',
                        'length',
                        'width',
                        'height',
                    ].includes(key)) {
                        return;
                    }

                    result[key] = sku[key];
                });

                return result;
            });
        },

        clearStreet() {
            this.form.street = '';
            this.streetSearchText = '';
            this.streets = [];
            this.showStreetNotFound = false;

            this.form.house = '';
            this.buildings = [];
            this.showBuildingNotFound = false;
        },

        selectStreet(street) {
            this.form.street = street;
            this.streetSearchText = street;
            this.streets = [];
            this.showStreetNotFound = false;

            this.form.house = '';
            this.buildings = [];
            this.showBuildingNotFound = false;
        },

        fetchStreets(query) {
            const q = (query || '').trim();

            if (q.length < 2) {
                this.streets = [];
                this.showStreetNotFound = false;
                return;
            }

            if (!this.form.city_name || !this.form.city_region) {
                this.streets = [];
                this.showStreetNotFound = false;
                return;
            }

            axios.get('/api/service/streets', {
                params: {
                    query: q,
                    city: this.form.city_name,
                    region: this.form.city_region,
                }
            })
                .then((response) => {
                    this.streets = response.data?.streets || [];
                    this.showStreetNotFound = this.streets.length === 0;
                })
                .catch(() => {
                    this.streets = [];
                    this.showStreetNotFound = true;
                });
        },

        searchStreets() {
            const q = (this.form.street || '').trim();
            this.streetSearchText = q;

            if (this.streetSearchTimer) {
                clearTimeout(this.streetSearchTimer);
            }

            this.streetSearchTimer = setTimeout(() => {
                if (q.length < 2) {
                    this.streets = [];
                    this.showStreetNotFound = false;
                    return;
                }

                this.fetchStreets(q);
            }, 300);
        },

        onStreetFocus() {
            const q = (this.streetSearchText || this.form.street || '').trim();

            if (this.streets.length) return;

            if (q.length < 2) {
                this.streets = [];
                this.showStreetNotFound = false;
                return;
            }

            this.fetchStreets(q);
        },

        clearHouse() {
            this.form.house = '';
            this.buildings = [];
            this.showBuildingNotFound = false;
        },

        selectBuilding(building) {
            this.form.house = building;
            this.buildings = [];
            this.showBuildingNotFound = false;
        },

        fetchBuildings() {
            if (!this.form.street || !this.form.city_name || !this.form.city_region) {
                this.buildings = [];
                this.showBuildingNotFound = false;
                return;
            }

            axios.get('/api/service/buildings', {
                params: {
                    query: this.form.house,
                    street: this.form.street,
                    city: this.form.city_name,
                    region: this.form.city_region,
                }
            })
                .then((response) => {
                    this.buildings = response.data?.buildings || [];
                    this.showBuildingNotFound = this.buildings.length === 0;
                })
                .catch(() => {
                    this.buildings = [];
                    this.showBuildingNotFound = true;
                });
        },

        searchBuildings() {
            if (this.houseSearchTimer) {
                clearTimeout(this.houseSearchTimer);
            }

            this.houseSearchTimer = setTimeout(() => {
                this.fetchBuildings();
            }, 300);
        },

        async submitOrder() {
            if (!this.canSubmit) {
                return;
            }

            if (!this.items.length) {
                alert('Корзина пуста');
                return;
            }

            this.loading = true;

            try {
                const payload = {
                    existing_order_id: localStorage.getItem('pendingPaymentOrderId') || null,
                    delivery_mode: this.form.delivery_mode,
                    tariff_code: this.selectedDeliveryTariffCode,
                    city: this.form.city,
                    city_code: this.form.city_code,
                    recipient_name: this.form.fio,
                    recipient_phone: this.form.phone,
                    recipient_email: this.form.email,
                    delivery_price: this.deliveryCost,
                    package: {
                        weight: this.totalWeight,
                        length: this.packageLength,
                        width: this.packageWidth,
                        height: this.packageHeight,
                    },
                    items: this.buildOrderItems(),
                };

                if (this.form.delivery_mode === 'pickup') {
                    payload.pickup_point_code = this.form.pickup_point_code;
                    payload.pickup_point_address = this.form.pickup_point_address;
                }

                if (this.form.delivery_mode === 'door') {
                    payload.street = this.form.street;
                    payload.house = this.form.house;
                    payload.flat = this.form.flat;
                    payload.entrance = this.form.entrance;
                    payload.floor = this.form.floor;
                }

                const response = await axios.post('/api/delivery/orders', payload);
                const responseData = response && response.data ? response.data : null;

                const confirmationUrl = responseData ? responseData.confirmation_url : null;
                const orderId = responseData ? responseData.order_id : null;

                if (!confirmationUrl || !orderId) {
                    throw new Error('Сервер не вернул данные для оплаты');
                }

                localStorage.setItem('pendingPaymentOrderId', String(orderId));
                window.location.href = confirmationUrl;
            } catch (e) {
                const apiErrors = e && e.response && e.response.data
                    ? e.response.data.errors
                    : null;

                if (apiErrors && apiErrors.length) {
                    alert(apiErrors.join('\n'));
                } else {
                    alert((e && e.message) ? e.message : 'Ошибка оформления');
                }
            } finally {
                this.loading = false;
            }
        },
    }
};
</script>
<style scoped>
.delivery-option input[type="radio"] {
    accent-color: #ff5a2f;
}

.modal-overlay {
    position: fixed;
    inset: 0;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content-order {
    border: none;
    height: 100%;
    width: 100%;
}

.order-page-container {
    display: flex;
    height: 100%;
    width: 100%;
    padding: 32px 0;
    box-sizing: border-box;
}

.left-column {
    flex: 1;
    padding-right: 40px;
}

.right-column {
    width: 45%;
}

.right-column .items-list {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.nav-header {
    height: 26px;
    margin-bottom: 18px;
}

.back-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 20px;
    font-weight: 600;
    color: #111;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
}

.icon-arrow {
    width: 24px;
    height: 24px;
}

.main-title {
    margin: 44px 0 44px 0;
}

.form-group {
    margin-bottom: 26px;
}

.form-input {
    width: 100%;
    border: none;
    border-bottom: 2px solid #111;
    outline: none;
    padding: 10px 0;
    font-size: 20px;
}

.form-input::placeholder {
    color: #8f8f8f;
    font-weight: 500;
}

.address-row {
    display: flex;
    gap: 50px;
    margin-bottom: 22px;
}

.address-row .form-group {
    margin-bottom: 0;
    width: 100%;
}

.agreement {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 26px 0 20px 0;
    font-size: 14px;
    color: #111;
    user-select: none;
}

.agreement input {
    width: 18px;
    height: 18px;
}

.btn {
    width: 100%;
    font-size: 26px;
    height: auto;
}

.btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.order-summary-title {
    font-size: 28px;
    font-weight: 800;
    margin: 0 0 18px 0;
}

.product-card {
    display: flex;
    gap: 16px;
}

.product-image {
    width: clamp(160px, 17vw, 250px);
    height: clamp(170px, 18vw, 300px);
    object-fit: cover;
    border-radius: 4px;
}

.product-details {
    flex: 1;
}

.product-name {
    font-size: 28px;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 10px;
}

.meta {
    font-size: 18px;
    color: #111;
    display: grid;
    gap: 10px;
    margin-bottom: 12px;
}

.qty-row {
    display: flex;
    flex-direction: column;
    font-size: 18px;
}

.qty-label {
    margin-right: 6px;
}

.qty-btn {
    border: none;
    background: transparent;
    font-size: 20px;
    line-height: 1;
    cursor: pointer;
    font-weight: bold;
}

.qty-pill {
    width: 26px;
    height: 26px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    background: #e8e8e8;
    font-weight: 700;
    font-size: 14px;
}

.price-box {
    padding-top: 18px;
    margin-bottom: 25px;
}

.pay-row {
    display: flex;
    align-items: baseline;
    justify-content: flex-end;
    gap: 10px;
    margin: 16px 0 10px 0;
}

.pay-label {
    font-size: 16px;
    color: #111;
}

.pay-value {
    font-size: 22px;
    font-weight: 600;
}

.price-lines {
    text-align: right;
    font-size: 16px;
    color: #111;
    line-height: 1.6;
}

.final-row {
    text-align: right;
    font-size: 16px;
}

.autocomplete {
    position: relative;
}

.autocomplete-list {
    margin-top: 10px;
    position: absolute;
    background: white;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    list-style: none;
    padding: 0;
    border: 1px solid;
    border-left: none;
    z-index: 5;
}

.autocomplete-list li {
    padding: 8px;
    cursor: pointer;
}

.autocomplete-list li:hover {
    background: #f3f3f3;
}

.input-wrapper {
    position: relative;
}

.clear-btn {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    background: transparent;
    font-size: 24px;
    cursor: pointer;
    color: #888;
}

.clear-btn:hover {
    color: #000;
}

.city-not-found {
    padding: 8px;
    color: #888;
    cursor: default;
    text-align: center;
}

.delivery-option {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;
    cursor: pointer;
    font-size: 20px;
    line-height: 1.3;
}

.delivery-option input[type="radio"] {
    width: 20px;
    height: 20px;
    cursor: pointer;
}

.delivery-option__text {
    color: #1d2b44;
}

.pickup-empty,
.delivery-loading {
    margin: 12px 0 24px;
    color: #666;
    font-size: 14px;
}

.price-box-mobile {
    display: none;
}

.back-link {
    display: none;
}

.nav-header-desktop .back-link {
    display: block;
}

.pickup-dropdown {
    max-height: 260px;
    overflow-y: auto;
    list-style-type: none;
    padding: 0;
}

.pickup-dropdown-item {
    padding: 10px;
    cursor: pointer;
}

.pickup-dropdown-item:hover {
    background: #f3f3f3;
}

.pickup-dropdown-title {
    font-weight: 700;
}

.pickup-dropdown-address {
    font-size: 14px;
}

.pickup-dropdown-time {
    font-size: 12px;
    color: #777;
}

.pickup-empty {
    padding: 10px;
    font-size: 14px;
    color: #777;
}

@media (max-width: 1023px) {
    .order-page-container {
        flex-direction: column;
        padding-left: 20px;
        padding-right: 0;
    }

    .left-column {
        order: 1;
        padding-right: 20px;
    }

    .right-column {
        width: 100%;
        overflow: unset !important;
        padding-right: 20px;
    }

    .back-link {
        display: block;
        margin-bottom: 20px;
    }

    .nav-header.nav-header-desktop, .price-box {
        display: none;
    }

    .main-title {
        margin: 22px 0 22px 0;
        font-size: 24px;
        font-weight: 500;
    }

    .price-box-mobile {
        display: block;

        .pay-row {
            justify-content: start;
        }

        .price-lines, .final-row {
            text-align: start;
        }
    }

    .left-column {
        padding-bottom: 100px;
    }
}
</style>
