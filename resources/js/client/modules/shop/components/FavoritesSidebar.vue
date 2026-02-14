<template>
    <div class="sidebar-favorites sidebar-overlay" :class="{ active: isActive }">
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

                <div v-for="item in items" :key="item.id" class="sidebar-item align-items-start cursor-pointer"  @click="openProductModal(item)">
                    <div class="sidebar-item-content">
                        <div class="image-wrapper">
                            <button class="close-button position-absolute color-white mt-2"
                                    @click.prevent.stop="eventBus.$emit('toggle-product-wishlist', item)">
                                &times;
                            </button>
                            <img :src="getPrimaryImageUrl(item)" alt="Product Image" class="item-image">
                        </div>

                        <div class="detail-info-section">
                            <h3 class="product-title">{{ item.name }}</h3>
                            <div class="item-details">
                                <div v-for="attribute in item.attributes" class="info-parameter pb-3">
                                    <p class="item-name">{{ attribute.name }}:</p>
                                    <p class="item-value">
                                        {{ attribute.options.join(', ') }}
                                    </p>
                                </div>
                            </div>

                            <p class="product-price fw-bold fs-3">
                                {{item.currentPrice}} р.
                            </p>
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
        },
        getPrimaryImageUrl(product) {
            if (!product?.images?.length) return '';
            const primaryImageObj = product.images.find(img => img.primary === true);
            return primaryImageObj ? primaryImageObj.image : product.images[0]?.image;
        },
        openProductModal(product){
            eventBus.$emit('open-product-modal', product);
        }
    },
    mounted() {
        eventBus.$on('update-favorites-products', this.getFavoritesList);
        const wishList = localStorage.getItem(WISHLIST_FULL_DATA_KEY);
        this.items = wishList ? JSON.parse(wishList) : [];
    }
}
</script>
