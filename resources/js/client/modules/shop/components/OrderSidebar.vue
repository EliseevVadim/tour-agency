<template>
    <div class="sidebar-overlay" :class="{ active: isActive }">
        <notifications position="top left"/>
        <div v-if="isActive" class="overlay-backdrop" @click="$emit('close')"></div>
        <div class="sidebar-content" :class="{ active: isActive }">

            <header class="sidebar-header">
                <h2 class="fw-bolder">Ваш заказ:</h2>
                <button class="close-button" @click="$emit('close')">
                    &times;
                </button>
            </header>

            <div class="sidebar-body">
                <div v-if="items.length === 0" class="empty-message">
                    Корзина пуста. Добавьте в корзину хотя бы один товар
                </div>

                <div v-for="item in items" :key="item.id" class="sidebar-item align-items-start cursor-pointer"
                     @click="openProductModal(item)">
                    <div class="sidebar-item-content">
                        <div class="image-wrapper">
                            <button class="close-button position-absolute color-white mt-2"
                                    @click.stop.prevent="removeItem(item)">
                                &times;
                            </button>
                            <img :src="getPrimaryImageUrl(item)" alt="Product Image" class="item-image">
                        </div>

                        <div class="detail-info-section">
                            <h3 class="product-title">{{ item.name }}</h3>

                            <div class="item-details">
                                <div v-for="attribute in item.attributes" class="info-parameter pb-1">
                                    <p class="item-name">{{ attribute.name }}:</p>
                                    <p class="item-value">
                                        {{ item.current_sku[attribute.sku_key] }}
                                    </p>
                                </div>
                            </div>

                            <div class="quantity-control item-details">
                                <span class="item-name">Количество:</span>
                                <div class="align-items-center d-flex quantity-counter">
                                    <button class="quantity-button plus"
                                            @click.stop.prevent="updateQuantity(item, 1)">+</button>
                                    <span class="quantity-value">{{ item.quantity }}</span>
                                    <button class="quantity-button minus"
                                            @click.stop.prevent="updateQuantity(item, -1)">-</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="items.length !== 0" class="order-summary d-flex gap-3">
                    <div class="order-sum">
                        <p class="item-name">К оплате:</p>
                        <p class="item-value">{{ totalPrice }} р.</p>
                    </div>
                    <button @click="proceedToCheckout" class="btn btn-cta py-2">
                        <span class="flare"></span>
                        Оформить заказ
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import eventBus from "../../../../event-bus";

const CART_STORAGE_KEY = 'shoppingCart';

export default {
    name: 'OrderSidebar',
    computed: {
        eventBus() {
            return eventBus
        }
    },
    props: {
        isActive: {
            type: Boolean,
            required: true
        },
    },
    data() {
        return {
            items: [],
            quantity: 1,
            totalPrice: 0,
        }
    },
    methods: {
        getPrimaryImageUrl(product) {
            if (!product?.images?.length) return '';
            const primaryImageObj = product.images.find(img => img.primary === true);
            return primaryImageObj ? primaryImageObj.image : product.images[0]?.image;
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
            this.calculateSummary();
        },

        calculateSummary() {
            this.totalPrice = this.items.reduce((sum, item) => {
                return sum + (item.current_sku.price * item.quantity);
            }, 0);
        },

        removeItem(itemToRemove) {
            const updatedCart = this.items.filter(item =>
                item.productId !== itemToRemove.productId || item.sku !== itemToRemove.sku
            );
            this.items = updatedCart;
            this.saveCartToStorage(updatedCart);
            this.calculateSummary();
            eventBus.$emit('cart:updated');
        },

        updateQuantity(item, change) {
            const newQuantity = item.quantity + change;
            const availableStock = this.getAvailableStockForSKU(item.productId, item.sku);

            if (newQuantity <= 0) {
                this.removeItem(item);
                return;
            }

            if (newQuantity > availableStock) {
                this.$notify({
                    group: 'notification',
                    type: 'warn',
                    duration: 4000,
                    title: 'Лимит достигнут',
                    text: 'Это максимально возможное количество товара на складе'
                });
                return;
            }

            const index = this.items.findIndex(i => i.sku === item.sku && i.productId === item.productId);
            if (index !== -1) {
                this.items[index].quantity = newQuantity;
                this.saveCartToStorage(this.items);
                this.calculateSummary();
                eventBus.$emit('cart:updated');
            }
        },

        getAvailableStockForSKU(productId, sku) {
            const product = this.items ? this.items.find(p => p.productId === productId) : null;
            if (!product) {
                return 0;
            }

            if (product.current_sku.stock_qty)
                return product.current_sku.stock_qty;
            return 0;
        },

        proceedToCheckout() {
            if (this.items.length === 0) return;
            this.$emit('close');

            eventBus.$emit('checkout:open');
        },

        openProductModal(product) {
            eventBus.$emit('product-modal:open', product);
            this.$emit('close');
        }
    },
    emits: ['close', 'remove', 'update:quantity'],
    mounted() {
        this.loadCart();
        eventBus.$on('cart:updated', this.loadCart);
    }
}
</script>

<style scoped lang="scss">

</style>
