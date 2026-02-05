<template>
    <div class="sidebar-overlay" :class="{ active: isActive }">
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

                <div v-for="item in items" :key="item.id" class="sidebar-item">
                    <div class="sidebar-item-content">
                        <div class="image-wrapper">
                            <button class="close-button position-absolute color-white mt-2"
                                    @click="eventBus.$emit('update-order-products', item)">
                                &times;
                            </button>
                            <img :src="item.imageUrl" alt="Product Image" class="item-image">
                        </div>

                        <div class="detail-info-section">
                            <h3 class="product-title">{{ item.name }}</h3>

                            <div class="item-details">
                                <div v-for="parameter in item.parameters" class="info-parameter pb-3">
                                    <p class="item-name">{{ parameter.name }}:</p>
                                    <p class="item-value">
                                        {{ parameter.value.join(', ') }}
                                    </p>
                                </div>
                            </div>

                            <div class="quantity-control item-details">
                                <span class="item-name">Количество:</span>
                                <div class="align-items-center d-flex quantity-counter">
                                    <button class="quantity-button plus" @click="incrementQuantity">+</button>
                                    <span class="quantity-value">{{ quantity }}</span>
                                    <button class="quantity-button minus" @click="decrementQuantity">-</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="items.length !== 0" class="order-summary d-flex gap-3">
                    <div class="order-sum">
                        <p class="item-name">К оплате:</p>
                        <p class="item-value">3650 р.</p>
                    </div>
                    <button class="btn btn-cta py-2">
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

const WISHLIST_FULL_DATA_KEY = 'merchWishlistFullData';

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
            quantity: 1
        }
    },
    methods: {
        incrementQuantity() {
            this.quantity++;
        },
        decrementQuantity() {
            if (this.quantity > 1) {
                this.quantity--;
            }
        }
    },
    emits: ['close', 'remove', 'update:quantity'],
    mounted() {
        const wishList = localStorage.getItem(WISHLIST_FULL_DATA_KEY);
        this.items = wishList ? JSON.parse(wishList) : [];
    }
}
</script>

<style scoped lang="scss">

</style>
