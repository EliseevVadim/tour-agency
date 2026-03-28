<template>
    <div class="sidebar-overlay" :class="{ active: isActive }">
        <notification-modal v-if="product"
                            :is-visible="isNotificationVisible"
                            :product="product"
                            :current-sku="currentSKU"
                            @close="isNotificationVisible = false"
        />
        <notifications position="top left"/>

        <div v-if="isActive" class="overlay-backdrop" @click="$emit('close')"></div>

        <div class="sidebar-content" :class="{ active: isActive }">
            <header class="sidebar-header">
                <h2 class="fw-bolder">Ваш заказ:</h2>
                <button class="close-button" @click="$emit('close')">&times;</button>
            </header>

            <div class="line-block">
                <div class="line-block-extra"></div>
            </div>

            <div class="sidebar-body">
                <div v-if="!items.length && !soldOutItems.length" class="empty-message">
                    Корзина пуста. Добавьте в корзину хотя бы один товар
                </div>

                <div v-for="item in items" :key="`${item.productId}-${item.sku}`"
                     class="sidebar-item align-items-start cursor-pointer"
                     :class="{ removing: removingSku === item.sku }"
                     @click="openProductModal(item, item.productId)">
                    <div class="sidebar-item-content">
                        <div class="image-wrapper">
                            <button class="close-button position-absolute color-white mt-2"
                                    @click.stop.prevent="removeItem(item)">
                                &times;
                            </button>

                            <img :src="getPrimaryImageUrl(item)" alt="Product Image" class="item-image"/>
                        </div>

                        <div class="detail-info-section">
                            <h3 class="product-title">{{ item.name }}</h3>

                            <div class="item-details">
                                <div v-for="attribute in item.attributes" :key="attribute.sku_key"
                                     class="info-parameter pb-1">
                                    <p class="item-name">{{ attribute.name }}:</p>
                                    <p class="item-value">
                                        {{ item.current_sku[attribute.sku_key] }}
                                    </p>
                                </div>
                            </div>

                            <div class="quantity-control item-details">
                                <span class="item-name">Количество:</span>

                                <div class="align-items-center d-flex quantity-counter">
                                    <button class="quantity-button plus" :disabled="quantityLoadingSku === item.sku"
                                            @click.stop.prevent="changeQuantity(item, 1)">
                                        +
                                    </button>

                                    <span class="quantity-value">{{ item.quantity }}</span>

                                    <button class="quantity-button minus" :disabled="quantityLoadingSku === item.sku"
                                            @click.stop.prevent="changeQuantity(item, -1)">
                                        -
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="soldOutItems.length" class="sold-divider"></div>
                <div v-if="soldOutItems.length" class="soldout-header">

                    <div class="soldout-info">
                        <h3 class="sold-title">Раскупили</h3>
                    </div>
                </div>

                <div v-for="item in soldOutItems" :key="`sold-${item.productId}-${item.sku}`"
                     class="sidebar-item sold-out">
                    <div class="sidebar-item-content">
                        <div class="image-wrapper">
                            <button class="close-button color-white mt-2 position-absolute text-black z-1"
                                    @click.stop.prevent="removeItem(item, true)">
                                &times;
                            </button>

                            <img :src="getPrimaryImageUrl(item)" class="item-image" :alt="`image-${item.productId}`"/>
                        </div>

                        <div class="detail-info-section">
                            <h3 class="product-title">{{ item.name }}</h3>

                            <div class="item-details">
                                <div v-for="attribute in item.attributes" :key="attribute.sku_key"
                                     class="info-parameter pb-1">
                                    <p class="item-name">{{ attribute.name }}:</p>
                                    <p class="item-value">
                                        {{ item.current_sku[attribute.sku_key] }}
                                    </p>
                                </div>
                            </div>

                            <div class="sold-out-label">Нет в наличии</div>

                            <button class="btn btn-group notify-btn" @click="openNotificationModal(item)">
                                сообщить о наличии
                            </button>
                        </div>
                    </div>
                </div>

                <div v-if="items.length" class="order-summary d-flex flex-column gap-3">
                    <div class="promo-block">
                        <div class="promo-input-wrapper position-relative">

                            <div class="promo-input-container position-relative">
                                <input v-model.trim="promoCodeInput" type="text" class="form-input promo-input"
                                       placeholder="Промокод (если есть)" :disabled="promoLoading || promoApplied">
                                <button v-if="promoCodeInput" class="clear-btn" type="button"
                                        @click="clearInputPromocode">
                                    ×
                                </button>
                            </div>

                            <button type="button" class="btn btn-cta btn-promocode"
                                    :class="{ 'promo-btn-success': promoApplied }"
                                    :disabled="promoLoading || (!promoCodeInput && !promoApplied) || (promoApplied && promoSuccess)"
                                    @click="promoApplied ? resetPromo() : applyPromoCode()">
                                <span v-if="promoLoading">Проверка...</span>
                                <span v-else-if="promoApplied">✓ Применён</span>
                                <template v-else>Применить</template>
                            </button>
                        </div>

                        <div v-if="promoMessage" :class="['promo-message', promoSuccess ? 'success' : 'error']">
                            {{ promoMessage }}
                        </div>
                    </div>

                    <div class="d-flex gap-3">
                        <div class="align-items-baseline d-flex flex-column order-sum">
                            <p class="item-name">К оплате:</p>

                            <div class="d-flex flex-column align-items-end">
                                <p v-if="promoApplied" class="item-value">
                                    {{ finalPrice }} р.
                                </p>

                                <p v-if="!promoApplied" class="item-value">
                                    {{ totalPrice }} р.
                                </p>
                            </div>
                        </div>

                        <button class="btn btn-cta py-2" :disabled="checkoutLoading" @click="proceedToCheckout">
                            <span class="flare"></span>
                            {{ checkoutLoading ? 'Проверяем...' : 'Оформить заказ' }}
                        </button>
                    </div>
                </div>

                <div v-if="removedItem" class="undo-snackbar">
                    <span>Товар удалён</span>

                    <div class="d-flex">
                        <button @click="undoRemove">Отменить</button>
                        <span class="undo-timer">({{ undoCountdown }})</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import eventBus from "../../../../event-bus";
import NotificationModal from "./NotificationModal.vue";

const CART_STORAGE_KEY = "shoppingCart";
const SOLD_OUT_STORAGE_KEY = "shoppingCartSoldOut";
const UNDO_TIMEOUT = 5;

export default {
    name: "OrderSidebar",
    components: {NotificationModal},

    props: {
        isActive: {
            type: Boolean,
            required: true
        }
    },

    data() {
        return {
            items: [],
            soldOutItems: [],

            removedItem: null,
            removingSku: null,
            undoTimer: null,
            undoCountdown: UNDO_TIMEOUT,

            isValidatingCart: false,
            quantityLoadingSku: null,

            checkoutLoading: false,
            checkoutConfirmedAfterValidation: false,

            isNotificationVisible: false,

            currentSKU: null,
            product: null,

            promoCodeInput: '',
            promoLoading: false,
            promoApplied: false,
            promoData: null,
            promoMessage: '',
            promoSuccess: false,
        };
    },

    computed: {
        totalPrice() {
            return this.items.reduce((sum, item) => {
                return sum + Number(item?.current_sku?.price || 0) * Number(item?.quantity || 0);
            }, 0);
        },

        finalPrice() {
            if (!this.promoApplied || !this.promoData) {
                return this.totalPrice;
            }

            const discount = this.promoData.discount_percent || 0;
            return Math.round(this.totalPrice * (1 - discount / 100));
        }
    },

    watch: {
        isActive: {
            immediate: true,
            async handler(value) {
                if (value) {
                    await this.loadAndValidateCart();
                }
            }
        }
    },

    methods: {
        getPrimaryImageUrl(product) {
            const images = Array.isArray(product?.images) ? product.images : [];
            const primary = images.find(img => img?.primary === true);
            return primary?.image || images[0]?.image || "";
        },

        notify(title, text, type = "warn") {
            this.$notify({
                group: "notification",
                type,
                duration: 4000,
                title,
                text
            });
        },

        getCart() {
            try {
                const cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));
                return Array.isArray(cart) ? cart : [];
            } catch (e) {
                return [];
            }
        },

        getSoldOutCart() {
            try {
                const cart = JSON.parse(localStorage.getItem(SOLD_OUT_STORAGE_KEY));
                return Array.isArray(cart) ? cart : [];
            } catch (e) {
                return [];
            }
        },

        saveCart(cart) {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        },

        saveSoldOutCart(cart) {
            localStorage.setItem(SOLD_OUT_STORAGE_KEY, JSON.stringify(cart));
        },

        saveCurrentStateToStorage() {
            this.saveCart(this.items);
            this.saveSoldOutCart(this.soldOutItems);
        },

        loadCartFromStorage() {
            const cart = this.getCart();
            this.items = cart.filter(item => Number(item?.current_sku?.stock_qty || item?.stock_qty || 0) > 0);
            this.soldOutItems = cart.filter(item => Number(item?.current_sku?.stock_qty || item?.stock_qty || 0) <= 0);
        },

        async validateItems(items) {
            const {data} = await axios.post("/api/cart/validate", {
                items: items.map(item => ({
                    sku: item.sku,
                    quantity: item.quantity
                }))
            });

            return Array.isArray(data?.items) ? data.items : [];
        },

        buildMergedItem(localItem, serverItem, quantity) {
            return {
                ...localItem,
                ...serverItem,
                exist: true,
                quantity,
                current_sku: {
                    ...(localItem.current_sku || {}),
                    ...(serverItem.current_sku || {}),
                    price: serverItem?.price,
                    stock_qty: serverItem?.stock_qty
                }
            };
        },

        async validateCartItems(items) {
            const updatedCart = [];
            const soldOutItems = [];
            let hasError = false;

            try {
                const serverItems = await this.validateItems(items);

                items.forEach(localItem => {
                    const serverItem = serverItems.find(item => item.sku === localItem.sku);

                    if (!serverItem || !serverItem.exists) {
                        hasError = true;
                        soldOutItems.push({
                            ...localItem,
                            exist: false,
                            current_sku: {
                                ...(localItem.current_sku || {}),
                                stock_qty: 0
                            }
                        });
                        return;
                    }

                    const stockQty = Number(serverItem.stock_qty || 0);
                    let quantity = Number(localItem.quantity || 1);

                    if (stockQty <= 0) {
                        hasError = true;
                        soldOutItems.push(this.buildMergedItem(localItem, serverItem, quantity));
                        return;
                    }

                    if (quantity > stockQty) {
                        hasError = true;
                        quantity = stockQty;

                        this.notify(
                            "Количество изменено",
                            `Для товара "${serverItem.name || localItem.name}" доступно только ${stockQty} шт.`
                        );
                    }

                    updatedCart.push(this.buildMergedItem(localItem, serverItem, quantity));
                });

                return {updatedCart, soldOutItems, hasError};
            } catch (error) {
                console.error("Ошибка при валидации корзины:", error);
                this.notify("Ошибка", "Не удалось проверить корзину", "error");
                return {updatedCart: [], soldOutItems: [], hasError: true};
            }
        },

        async loadAndValidateCart() {
            const allItems = [
                ...this.getCart(),
                ...this.getSoldOutCart()
            ];

            if (!allItems.length) {
                this.items = [];
                this.soldOutItems = [];
                return;
            }

            if (this.isValidatingCart) return;
            this.isValidatingCart = true;

            try {
                const {updatedCart, soldOutItems} = await this.validateCartItems(allItems);

                this.items = updatedCart;
                this.soldOutItems = soldOutItems;

                this.saveCart(this.items);
                this.saveSoldOutCart(this.soldOutItems);
            } finally {
                this.isValidatingCart = false;
            }
        },

        startUndoTimer() {
            clearInterval(this.undoTimer);
            this.undoCountdown = UNDO_TIMEOUT;

            this.undoTimer = setInterval(() => {
                this.undoCountdown--;

                if (this.undoCountdown <= 0) {
                    clearInterval(this.undoTimer);
                    this.saveCurrentStateToStorage();
                    eventBus.$emit("cart:updated");
                    this.removedItem = null;
                }
            }, 1000);
        },

        undoRemove() {
            this.checkoutConfirmedAfterValidation = false;

            if (!this.removedItem) return;

            const {item, index, fromSoldOut} = this.removedItem;

            if (fromSoldOut) {
                this.soldOutItems.splice(index, 0, item);
            } else {
                this.items.splice(index, 0, item);
            }

            clearInterval(this.undoTimer);
            this.saveCurrentStateToStorage();
            eventBus.$emit("cart:updated");
            this.removedItem = null;
        },

        removeItem(item, fromSoldOut = false) {
            this.checkoutConfirmedAfterValidation = false;

            this.removingSku = item.sku;

            setTimeout(() => {
                const list = fromSoldOut ? this.soldOutItems : this.items;
                const index = list.findIndex(i => i.productId === item.productId && i.sku === item.sku);

                if (index === -1) {
                    this.removingSku = null;
                    return;
                }

                this.removedItem = {
                    item: list[index],
                    index,
                    fromSoldOut
                };

                list.splice(index, 1);
                this.saveCurrentStateToStorage();
                this.removingSku = null;

                this.startUndoTimer();
                eventBus.$emit("cart:updated");
            }, 300);
        },

        async changeQuantity(item, delta) {
            this.checkoutConfirmedAfterValidation = false;

            const newQuantity = Number(item.quantity || 0) + delta;

            if (newQuantity <= 0) {
                this.removeItem(item);
                return;
            }

            this.quantityLoadingSku = item.sku;

            try {
                const serverItems = await this.validateItems([
                    {
                        sku: item.sku,
                        quantity: newQuantity
                    }
                ]);

                const serverItem = serverItems.find(server => server.sku === item.sku);

                if (!serverItem || !serverItem.exists || Number(serverItem.stock_qty || 0) <= 0) {
                    this.notify(
                        "Товар недоступен",
                        `${item.name || "Товар"} больше нет в наличии`
                    );

                    const index = this.items.findIndex(i => i.productId === item.productId && i.sku === item.sku);

                    if (index !== -1) {
                        const soldOutItem = this.buildMergedItem(item, serverItem || {}, item.quantity);
                        soldOutItem.exist = false;
                        soldOutItem.current_sku = {
                            ...(soldOutItem.current_sku || {}),
                            stock_qty: 0
                        };

                        this.items.splice(index, 1);

                        if (!this.soldOutItems.some(i => i.sku === soldOutItem.sku)) {
                            this.soldOutItems.unshift(soldOutItem);
                        }

                        this.saveCurrentStateToStorage();
                        eventBus.$emit("cart:updated");
                    }

                    return;
                }

                if (newQuantity > Number(serverItem.stock_qty || 0)) {
                    this.notify(
                        "Извините, достигнут лимит.",
                        "Это максимально возможное количество товаров в наличии"
                    );

                    const index = this.items.findIndex(i => i.productId === item.productId && i.sku === item.sku);

                    if (index !== -1) {
                        this.items.splice(index, 1, this.buildMergedItem(item, serverItem, Number(serverItem.stock_qty || 0)));
                        this.saveCurrentStateToStorage();
                        eventBus.$emit("cart:updated");
                    }

                    return;
                }

                const index = this.items.findIndex(i => i.productId === item.productId && i.sku === item.sku);

                if (index !== -1) {
                    this.items.splice(index, 1, this.buildMergedItem(item, serverItem, newQuantity));
                    this.saveCurrentStateToStorage();
                    eventBus.$emit("cart:updated");
                }
            } catch (error) {
                console.error("Ошибка при изменении количества:", error);
                this.notify("Ошибка", "Не удалось обновить количество товара", "error");
            } finally {
                this.quantityLoadingSku = null;
            }
        },

        async proceedToCheckout() {
            if (!this.items.length && !this.soldOutItems.length) return;

            if (this.checkoutConfirmedAfterValidation) {
                this.checkoutConfirmedAfterValidation = false;
                return;
            }

            this.checkoutLoading = true;

            try {
                const allItems = [
                    ...this.items,
                    ...this.soldOutItems
                ];

                const prevItemsJson = JSON.stringify(this.items);
                const prevSoldOutJson = JSON.stringify(this.soldOutItems);

                const {updatedCart, soldOutItems} = await this.validateCartItems(allItems);

                this.items = updatedCart;
                this.soldOutItems = soldOutItems;

                this.saveCart(this.items);
                this.saveSoldOutCart(this.soldOutItems);

                const itemsChanged =
                    prevItemsJson !== JSON.stringify(this.items) ||
                    prevSoldOutJson !== JSON.stringify(this.soldOutItems);

                if (!this.items.length) {
                    this.checkoutConfirmedAfterValidation = false;

                    this.notify(
                        "Корзина пуста",
                        "Все товары сейчас недоступны"
                    );
                    return;
                }

                if (itemsChanged) {
                    this.checkoutConfirmedAfterValidation = true;

                    this.notify(
                        "Корзина обновлена",
                        "Мы обновили наличие и количество товаров. Проверьте корзину и нажмите «Оформить заказ» ещё раз"
                    );
                    return;
                }

                this.checkoutConfirmedAfterValidation = false;
                eventBus.$emit("checkout:open", {
                    promo_code_id: this.promoData ? this.promoData.id : null,
                    promo_code: this.promoData ? this.promoData.code : null,
                    discount_percent: this.promoData ? this.promoData.discount_percent : null,
                    final_price: this.finalPrice,
                });
            } finally {
                this.checkoutLoading = false;
            }
        },

        openProductModal(product, id) {
            const payload = {
                ...product,
                id
            };

            eventBus.$emit("product-modal:open", payload);
        },

        clearCart() {
            this.items = [];
            this.soldOutItems = [];
            localStorage.removeItem(CART_STORAGE_KEY);
            localStorage.removeItem(SOLD_OUT_STORAGE_KEY);
        },
        openNotificationModal(item) {
            this.isNotificationVisible = true;
            this.product = item;
            this.product.id = item.productId;
            this.product.currentSku = item.current_sku;
            this.currentSKU = item.currentSku;
        },
        async handleCartUpdated() {
            await this.loadAndValidateCart();
        },

        async applyPromoCode() {
            if (!this.promoCodeInput) {
                return;
            }

            this.promoLoading = true;
            this.promoMessage = '';

            try {
                const response = await axios.post('/api/shop/check-promo-code', {
                    code: this.promoCodeInput
                });

                const data = response.data.data;

                this.promoData = data;
                this.promoApplied = true;
                this.promoSuccess = true;
                this.promoMessage = `Промокод применён (${data.discount_percent}%)`;

            } catch (error) {
                this.promoSuccess = false;
                this.promoMessage =
                    error.response?.data?.message || 'Ошибка применения промокода';

            } finally {
                this.promoLoading = false;
            }
        },
        clearInputPromocode() {
            this.resetPromo();
        },
        resetPromo() {
            this.promoCodeInput = '';
            this.promoLoading = false;
            this.promoApplied = false;
            this.promoData = null;
            this.promoMessage = '';
            this.promoSuccess = false;
        }
    },

    mounted() {
        this.loadCartFromStorage();
        eventBus.$on("cart:updated", this.handleCartUpdated);
        eventBus.$on("cart:cleared", this.clearCart);
    },

    beforeDestroy() {
        eventBus.$off("cart:cleared", this.clearCart);
        clearInterval(this.undoTimer);
    }
};
</script>

<style scoped lang="scss">
.sidebar-item {
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.sidebar-item.removing {
    transform: translateX(120%);
    opacity: 0;
}

.undo-snackbar {
    position: absolute;
    bottom: 20px;
    left: 20px;
    right: 20px;
    background: #222;
    color: white;
    padding: 12px 16px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    animation: slideUp 0.25s ease;
}

.undo-snackbar button {
    background: none;
    border: none;
    color: #4da3ff;
    font-weight: 600;
    cursor: pointer;
}

@keyframes slideUp {
    from {
        transform: translateY(20px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.sold-divider {
    height: 1px;
    background: #e5e5e5;
    margin: 20px 0;
}

.sold-title {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 10px;
}

.sold-out {
    position: relative;
    opacity: 0.7;
}

.sold-out::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.6);
    pointer-events: none;
}

.sold-out-label {
    margin-top: 8px;
    font-size: 14px;
    font-weight: 600;
}

.notify-btn {
    z-index: 2;
    padding: 10px;
    border: 1px solid;
    margin-top: 10px;
}

.promo-input-wrapper {
    display: flex;
    gap: 8px;
    width: 100%;
}

.promo-input {
    flex: 1 1 auto;
    min-width: 0;
    height: 42px;
    border-radius: 5px;
    border: 1px solid #d7e1ec;
    padding: 0 12px;
    outline: none;
}

.promo-btn {
    flex: 0 0 auto;
    width: auto;
    white-space: nowrap;
    height: 42px;
    border-radius: 10px;
    padding: 0 14px;
}

.promo-message {
    font-size: 13px;
}

.promo-message.success {
    color: #1f8b4c;
}

.promo-message.error {
    color: #c44949;
}

.old-price {
    font-size: 13px;
    color: #9aa7b6;
    text-decoration: line-through;
    margin: 0;
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
</style>
