<template>
    <div class="product-list-container">
        <OrderModal v-if="isOrderModalVisible" @close="closeOrderModal" :checkout-meta="checkoutMeta"/>

        <ProductDetailModal v-if="modalProductData"
                            :is-visible="isDetailVisible"
                            :temp-product="modalProductData"
                            @close="closeModal"
                            @toggle-wishlist="handleWishlist"
                            @change-detail-product="changeDetailProduct"/>

        <div v-for="(group, groupIndex) in displayedGroups" :key="`group-${groupIndex}`">
            <div class="product-grid">
                <ProductCard
                    v-for="product in group.products"
                    :key="product.id"
                    :product="product"
                    @toggle-wishlist="handleWishlist"
                    @click="openModalFromCard(product)"
                />
            </div>

            <div v-if="group.promo" class="promo-block">
                <PromoBlock :promo-data="group.promo"/>
            </div>
        </div>

        <div v-if="canLoadMore" class="load-more-container">
            <button @click="loadMore" class="load-more-button">
                Загрузить еще
            </button>
        </div>
    </div>
</template>

<script>
import ProductCard from "./ProductCard.vue";
import PromoBlock from "./PromoBlock.vue";
import ProductDetailModal from "./ProductDetailModal.vue";
import eventBus from "../../../../event-bus";
import OrderModal from "./OrderForm.vue";

import rawData from '../data/platform_data.json';

/*
*  {
            "idSuffix": "10",
            "platformName": "Instagram",
            "imageUrl": "/img/socials/promo-instagram.png",
            "url": "https://instagram.com/put_club",
            "template": "SALES"
        }
* */

const WISHLIST_STORAGE_KEY = 'merchWishlistIds';
const WISHLIST_FULL_DATA_KEY = 'merchWishlistFullData';
const FILTERS_SORT_STORAGE_KEY = 'merchFiltersAndSort';
const ITEMS_PER_PAGE = 16;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export default {
    name: 'ProductList',
    components: {
        OrderModal,
        ProductDetailModal,
        PromoBlock,
        ProductCard
    },
    data() {
        return {
            allProducts: [],
            page: 1,
            perPage: ITEMS_PER_PAGE,
            totalPages: 1,
            loading: false,

            wishlistIds: [],
            wishlistFullData: [],
            promoBlocks: [],
            shuffledPromoBlocks: [],

            currentFilterTag: 'clothing',
            currentSort: 'default',
            isDetailVisible: false,
            modalProductData: null,
            isInWishList: false,

            platformData: [],

            isOrderModalVisible: false,

            checkoutMeta: {
                promo_code_id: null,
                promo_code: null,
                discount_percent: null,
                final_price: null,
            },
        }
    },
    computed: {
        filteredProducts() {
            if (!this.currentFilterTag || this.currentFilterTag === 'all') {
                return this.allProducts;
            }
            return this.allProducts.filter(p => p.category_slug === this.currentFilterTag);
        },

        sortedAndFilteredProducts() {
            const list = [...this.filteredProducts];
            const sortValue = this.currentSort;

            list.sort((a, b) => {
                switch (sortValue) {
                    case 'price_asc':
                        return Number(a.currentPrice) - Number(b.currentPrice);
                    case 'price_desc':
                        return Number(b.currentPrice) - Number(a.currentPrice);
                    case 'name_a_z':
                        return a.name.localeCompare(b.name);
                    case 'name_z_a':
                        return b.name.localeCompare(a.name);
                    case 'default':
                    default:
                        return a.id - b.id;
                }
            });
            return list;
        },

        displayedGroups() {
            const groups = [];
            const productsPerGroup = 8;

            for (let i = 0; i < this.sortedAndFilteredProducts.length; i += productsPerGroup) {
                const groupProducts = this.sortedAndFilteredProducts.slice(i, i + productsPerGroup);

                const shouldInsertPromo = groupProducts.length === productsPerGroup;
                groups.push({
                    products: groupProducts,
                    promo: shouldInsertPromo
                        ? this.shuffledPromoBlocks[Math.floor(i / productsPerGroup) % this.shuffledPromoBlocks.length]
                        : null
                });
            }

            return groups;
        },

        canLoadMore() {
            return this.page < this.totalPages && !this.loading;
        }
    },
    watch: {
        currentSort() {
            this.saveFiltersAndSort();
        },
        currentFilterTag() {
            this.saveFiltersAndSort();
        },
        wishlistIds(newIds) {
            localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(newIds));
            eventBus.$emit('update-favorites', this.wishlistFullData);
        },
        wishlistFullData(newData) {
            localStorage.setItem(WISHLIST_FULL_DATA_KEY, JSON.stringify(newData));
            eventBus.$emit('update-favorites', newData.length);
            eventBus.$emit('update-favorites-products', newData);
        },
    },
    methods: {
        async fetchProducts(reset = false) {
            if (this.loading) return;
            if (reset) {
                this.page = 1;
                this.allProducts = [];
            }

            this.loading = true;
            try {
                const res = await axios.get("/api/products", {
                    params: {
                        category: this.currentFilterTag,
                        sort: this.currentSort,
                        per_page: this.perPage,
                        page: this.page,
                    },
                });

                if (res.data.success) {
                    const products = res.data.data;

                    this.totalPages = res.data.meta.last_page || 1;
                    this.allProducts = products;
                }
            } catch (e) {
                console.error("Ошибка при загрузке продуктов:", e);
            } finally {
                this.loading = false;
            }
        },

        initializePromo() {
            this.shuffledPromoBlocks = [...this.promoBlocks];
            shuffleArray(this.shuffledPromoBlocks);
        },

        getProductInWishlist(productId) {
            return this.wishlistIds.includes(productId);
        },

        openModalFromCard(product) {
            this.modalProductData = product;
            this.isDetailVisible = true;
            this.isInWishList = this.getProductInWishlist(product.id);
            document.body.classList.add('no-scroll');
            this.updateBrowserUrl(product.id);
        },

        closeModal() {
            this.isDetailVisible = false;
            this.modalProductData = null;
            this.updateBrowserUrl(null);
            document.body.classList.remove('no-scroll');
        },

        updateBrowserUrl(productId) {
            const baseUrl = window.location.pathname.split('?')[0];
            const newUrl = productId ? `${baseUrl}?product=${productId}` : baseUrl;
            window.history.replaceState({}, '', newUrl);
        },

        loadMore() {
            if (this.page < this.totalPages && !this.loading) {
                this.perPage += ITEMS_PER_PAGE;
                this.fetchProducts(false);
            }
        },

        loadFromStorage(key) {
            try {
                return JSON.parse(localStorage.getItem(key));
            } catch {
                return null;
            }
        },

        loadWishlist() {
            this.wishlistIds = this.loadFromStorage(WISHLIST_STORAGE_KEY) || [];
            this.wishlistFullData = this.loadFromStorage(WISHLIST_FULL_DATA_KEY) || [];
        },

        handleWishlist(product) {
            const productId = product.id;
            const isAdding = !this.wishlistIds.includes(productId);

            if (isAdding) {
                this.wishlistIds = Array.from(new Set([...this.wishlistIds, productId]));

                if (!this.wishlistFullData.some(p => p.id === productId)) {
                    this.wishlistFullData.push(product);
                }
            } else {
                this.wishlistIds = this.wishlistIds.filter(id => id !== productId);
                this.wishlistFullData = this.wishlistFullData.filter(p => p.id !== productId);
            }

            this.$notify({
                group: 'notification',
                type: isAdding ? 'success' : 'warn',
                duration: 4000,
                text: isAdding ? 'Товар добавлен в избранное' : 'Товар удалён из избранного'
            });
        },

        changeDetailProduct(product) {
            this.modalProductData = product;
            this.updateBrowserUrl(product.id);
        },

        loadFiltersAndSortFromStorage() {
            this.currentFilterTag = 'all';
            const stored = this.loadFromStorage(FILTERS_SORT_STORAGE_KEY);
            if (stored) {
                if (stored.sort) this.currentSort = stored.sort;
                if (stored.perPage) this.perPage = stored.perPage;
            }
        },

        changeSortValue(value) {
            this.currentSort = value;
            this.fetchProducts();
        },

        changeTabValue(id) {
            this.currentFilterTag = id;

            this.initializePromo();
            this.fetchProducts();
        },

        saveFiltersAndSort() {
            try {
                localStorage.setItem(FILTERS_SORT_STORAGE_KEY, JSON.stringify({
                    sort: this.currentSort,
                    perPage: ITEMS_PER_PAGE
                }));
                eventBus.$emit('tab-sort:changed');
            } catch (e) {
                console.error(e);
            }
        },

        getPlatformData() {
            const TEMPLATES = rawData.TEMPLATES;
            const PLATFORM_DATA_RAW = rawData.PLATFORM_DATA;

            if (PLATFORM_DATA_RAW) {
                this.platformData = PLATFORM_DATA_RAW.map(item => ({
                    ...item,
                    template: TEMPLATES[item.template]
                }));
            }
            this.promoBlocks = this.generatePromoBlocks();
        },
        generatePromoBlocks() {
            return this.platformData.map((platform) => ({
                id: `promo${platform.idSuffix}`,
                title: platform.template.title,
                description: `можно посмотреть у нас в ${platform.platformName}`,
                imageUrl: platform.imageUrl,
                type: 'promo',
                url: platform.url
            }));
        },
        closeDetailModal() {
            this.isDetailVisible = false;

            const params = new URLSearchParams(window.location.search);
            const productId = params.get('product');

            if (productId) {
                window.history.replaceState({}, '', window.location.pathname);
            }
        },

        openOrderModal(payload = {}) {
            this.isOrderModalVisible = true;
            document.body.classList.add('no-scroll');
            this.handleCheckoutOpen(payload);
        },
        closeOrderModal() {
            this.isOrderModalVisible = false;
            document.body.classList.remove('no-scroll');
        },
        handleCheckoutOpen(payload = {}) {
            this.checkoutMeta = {
                promo_code_id: payload.promo_code_id || null,
                promo_code: payload.promo_code || null,
                discount_percent: payload.discount_percent || null,
                final_price: payload.final_price || null,
            };
        },
    },
    mounted() {
        this.loadFiltersAndSortFromStorage();

        this.fetchProducts();
        this.getPlatformData();
        this.loadWishlist();
        this.initializePromo();

        eventBus.$on('sort:changed', this.changeSortValue)
        eventBus.$on('tab-category:changed', this.changeTabValue)
        eventBus.$on('tab-sort:changed', this.loadFiltersAndSortFromStorage);
        eventBus.$on('product-modal:open', this.openModalFromCard);
        eventBus.$on('product-wishlist:toggle', this.handleWishlist);
        eventBus.$on('cart:updated', this.closeDetailModal);
        eventBus.$on('checkout:open', this.openOrderModal);

        const params = new URLSearchParams(window.location.search);
        const productId = params.get('product');
        if (productId) {
            axios.get(`/api/products/${productId}`).then((response) => {
                const product = response.data.data;
                if (product) this.openModalFromCard(product);
                else window.history.replaceState({}, '', window.location.pathname);
            })
        }
    },
    beforeUnmount() {
        eventBus.$off('tab-sort:changed', this.loadFiltersAndSortFromStorage);
        eventBus.$off('product-modal:open', this.openModalFromCard);
        eventBus.$off('product-wishlist:toggle', this.handleWishlist);
        eventBus.$off('checkout:open', this.openOrderModal);
    }
}
</script>

<style scoped>
.product-list-container {
    min-height: 450px;
}
.product-grid {
    display: grid;
    justify-content: center;
}

.load-more-container {
    text-align: center;
    margin-top: 90px;
}

.load-more-button {
    background: none;
    border: 1px solid #eb2d26;
    border-radius: 20px;
    padding: 15px 30px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s;
}

.load-more-button:hover {
    background-color: #fff0f0;
}

@media (max-width: 767.98px) {
    .product-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;

        .product-card {
            height: 330px;
            border-radius: 15px;
        }
    }
}

@media (min-width: 768px) {
    .product-grid {
        grid-template-columns: repeat(4, 1fr);
        gap: 30px;
    }
}
</style>
