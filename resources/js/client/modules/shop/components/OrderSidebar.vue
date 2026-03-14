<template>
    <div class="sidebar-overlay" :class="{ active: isActive }">
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
                <div v-if="!items.length" class="empty-message">
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
                                    <p class="item-value">{{ item.current_sku[attribute.sku_key] }}</p>
                                </div>
                            </div>

                            <div class="quantity-control item-details">
                                <span class="item-name">Количество:</span>

                                <div class="align-items-center d-flex quantity-counter">
                                    <button class="quantity-button plus" @click.stop.prevent="changeQuantity(item, 1)">
                                        +
                                    </button>

                                    <span class="quantity-value">{{ item.quantity }}</span>

                                    <button class="quantity-button minus"
                                            @click.stop.prevent="changeQuantity(item, -1)">
                                        -
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="items.length" class="order-summary d-flex gap-3">
                    <div class="order-sum">
                        <p class="item-name">К оплате:</p>
                        <p class="item-value">{{ totalPrice }} р.</p>
                    </div>

                    <button class="btn btn-cta py-2" @click="proceedToCheckout">
                        <span class="flare"></span>
                        Оформить заказ
                    </button>
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

const CART_STORAGE_KEY = "shoppingCart";
const UNDO_TIMEOUT = 5;

export default {
    name: "OrderSidebar",

    props: {
        isActive: {
            type: Boolean,
            required: true
        }
    },

    data() {
        return {
            items: [],
            removedItem: null,
            removingSku: null,
            undoTimer: null,
            undoCountdown: UNDO_TIMEOUT
        };
    },

    computed: {
        totalPrice() {
            return this.items.reduce(
                (sum, item) => sum + Number(item.current_sku.price || 0) * Number(item.quantity || 0),
                0
            );
        }
    },

    watch: {
        isActive: {
            immediate: true,
            handler(value) {
                if (value) {
                    this.loadAndValidateCart();
                }
            }
        }
    },

    methods: {
        getPrimaryImageUrl(product) {
            const images = product && product.images ? product.images : [];
            const primary = images.find(img => img.primary);
            return (primary || images[0] || {}).image || "";
        },

        getCart() {
            try {
                return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
            } catch (e) {
                return [];
            }
        },

        loadCart() {
            this.items = this.getCart();
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

        async validateItems(items) {
            const {data} = await axios.post("/api/cart/validate", {
                items: items.map(item => ({
                    sku: item.sku,
                    quantity: item.quantity
                }))
            });

            return Array.isArray(data && data.items) ? data.items : [];
        },

        startUndoTimer() {
            clearInterval(this.undoTimer);
            this.undoCountdown = UNDO_TIMEOUT;

            this.undoTimer = setInterval(() => {
                this.undoCountdown--;

                if (this.undoCountdown <= 0) {
                    clearInterval(this.undoTimer);
                    this.saveCartToStorage();
                    eventBus.$emit("cart:updated");
                    this.removedItem = null;
                }
            }, 1000);
        },

        undoRemove() {
            if (!this.removedItem) return;

            const {item, index} = this.removedItem;
            this.items.splice(index, 0, item);

            clearInterval(this.undoTimer);
            this.saveCartToStorage();
            eventBus.$emit("cart:updated");
            this.removedItem = null;
        },

        saveCartToStorage(cart = this.items) {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        },

        changeQuantity(item, delta) {
            const newQuantity = item.quantity + delta;

            if (newQuantity <= 0) {
                this.removeItem(item);
                return;
            }

            if (newQuantity > item.current_sku.stock_qty) {
                this.$notify({
                    group: 'notification',
                    type: 'warn',
                    duration: 4000,
                    title: 'Извините, достигнут лимит.',
                    text: `Это максимально возможное количество товаров в наличии`
                });
                item.quantity = item.current_sku.stock_qty;
            } else {
                item.quantity = newQuantity;
            }

            this.saveCartToStorage(this.items);
            eventBus.$emit('cart:updated');
        },

        removeItem(item) {
            this.removingSku = item.sku;

            const index = this.items.findIndex(i => i.productId === item.productId && i.sku === item.sku);
            if (index === -1) return;

            this.removedItem = {
                item: this.items[index],
                index
            };

            this.items.splice(index, 1);
            this.saveCartToStorage(this.items);
            this.removingSku = null;

            this.startUndoTimer();
            eventBus.$emit('cart:remove-item');
        },

        async validateCartItems(items) {
            const updatedCart = [];
            let hasError = false;

            try {
                const serverItems = await this.validateItems(items);

                items.forEach(localItem => {
                    const serverItem = serverItems.find(item => item.sku === localItem.sku);

                    if (!serverItem || !serverItem.exists) {
                        hasError = true;
                        this.notify(
                            "Товар недоступен",
                            `${localItem.name || "Товар"} больше не доступен`
                        );
                        return;
                    }

                    const stockQty = Number(serverItem.stock_qty || 0);
                    let quantity = Number(localItem.quantity || 1);

                    if (stockQty <= 0) {
                        hasError = true;
                        this.notify(
                            "Нет в наличии",
                            `${serverItem.name || localItem.name || "Товар"} закончился`
                        );
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

                    updatedCart.push({
                        ...localItem,
                        ...serverItem,
                        exist: true,
                        quantity,
                        current_sku: {
                            ...(localItem.current_sku || {}),
                            ...(serverItem.current_sku || {}),
                            price: serverItem.price,
                            stock_qty: serverItem.stock_qty
                        }
                    });
                });

                return { updatedCart, hasError };
            } catch (error) {
                console.error("Ошибка при валидации корзины:", error);
                return { updatedCart: [], hasError: true };
            }
        },

        async proceedToCheckout() {
            if (!this.items.length) return;

            const { updatedCart, hasError } = await this.validateCartItems(this.items);

            this.items = updatedCart;
            this.saveCartToStorage();

            if (!hasError && this.items.length) {
                eventBus.$emit("checkout:open");
            }
        },

        async loadAndValidateCart() {
            const { updatedCart, hasError } = await this.validateCartItems(this.items);
            this.items = updatedCart;
            this.saveCartToStorage();
            if (hasError) {
                this.notify("Ошибка в корзине", "Некоторые товары недоступны или имеют ограничения.");
            }
        },

        openProductModal(product, id) {
            product.id = id;
            eventBus.$emit("product-modal:open", product);
        },

        clearCart() {
            this.items = this.getCart();
        }
    },

    mounted() {
        this.loadCart();
        eventBus.$on("cart:updated", this.loadCart);
        eventBus.$on("cart:cleared", this.clearCart);
    },

    beforeDestroy() {
        eventBus.$off("cart:updated", this.loadCart);
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
</style>
