<template>
    <div class="sidebar-overlay" :class="{ active: isActive }">
        <div v-if="isActive" class="overlay-backdrop" @click="$emit('close')"></div>
        <div class="sidebar-content" :class="{ active: isActive }">

            <header class="sidebar-header">
                <h2 class="fw-bolder">Избранное</h2>
                <button class="close-button" @click="$emit('close')">
                    &times;
                </button>
            </header>

            <div class="sidebar-body">
                <div v-if="items.length === 0" class="empty-message">
                    Список избранного пуст.
                </div>

                <div v-for="item in items" :key="item.id" class="sidebar-item">
                    <div class="sidebar-item-content">
                        <div class="image-wrapper">
                            <button class="close-button position-absolute color-white mt-2"
                                    @click="eventBus.$emit('update-favorite-products', item)">
                                &times;
                            </button>
                            <img :src="item.imageUrl" alt="Product Image" class="item-image">
                        </div>

                        <div class="detail-info-section">
                            <h3 class="product-title">{{ item.name }}</h3>

                            <div class="item-details">
                                <div v-for="parameter in item.parameters" class="info-parameter pb-3">
                                    <p class="item-name">{{ parameter.name }}:</p>
                                    <p class="item-value">{{ parameter.value }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import eventBus from "../../../../event-bus";

const WISHLIST_FULL_DATA_KEY = 'merchWishlistFullData';

export default {
    name: 'FavoritesSidebar',
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
    emits: ['close', 'remove'],
    methods: {
        getFavoritesList(data) {
            this.items = data;
            /* const wishList = localStorage.getItem(WISHLIST_FULL_DATA_KEY);
             console.log(JSON.parse(wishList))
             this.items = wishList ? JSON.parse(wishList) : [];*/
        }
    },
    mounted() {
        eventBus.$on('update-favorites-products', this.getFavoritesList);
        const wishList = localStorage.getItem(WISHLIST_FULL_DATA_KEY);
        this.items = wishList ? JSON.parse(wishList) : [];
    }
}
</script>
