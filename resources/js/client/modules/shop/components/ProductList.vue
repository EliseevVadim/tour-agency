<template>
    <div class="product-list-container">
        <OrderModal v-if="false"></OrderModal>

        <ProductDetailModal v-if="modalProductData"
                            :is-visible="isDetailVisible"
                            :product="modalProductData"
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

const WISHLIST_STORAGE_KEY = 'merchWishlistIds';
const WISHLIST_FULL_DATA_KEY = 'merchWishlistFullData';
const FILTERS_SORT_STORAGE_KEY = 'merchFiltersAndSort';
const ITEMS_PER_PAGE = 12;

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
            allProducts: [
                {
                    id: 1,
                    name: "Чемодан \"В ПУТЬ\" (Общая Акция)",
                    description: "Наш самый популярный чемодан. Цена зависит от размера и цвета.",
                    oldPrice: 5500,
                    currentPrice: 3650,
                    isHit: true,
                    category_slug: "clothing",
                    images: [
                        {primary: true, image: "/img/merch/test.png"},
                        {primary: false, image: "/img/merch/test.png"},
                        {primary: false, image: "/img/merch/test.png"},
                        {primary: false, image: "/img/merch/test.png"},
                        {primary: false, image: "/img/merch/test.png"},
                    ],
                    attributes: [
                        {name: "Размер", sku_key: "size", options: ["Маленький", "Средний", "Большой"]},
                        {name: "Цвет", sku_key: "color", options: ["Синий", "Зеленый", "Красный"]}
                    ],
                    available_skus: [
                        {"sku": "101-M-BLU", "size": "Средний", "color": "Синий", "price": 120, stock_qty: 4},
                        {"sku": "101-M-GRN", "size": "Средний", "color": "Зеленый", "price": 120, stock_qty: 0},
                        {"sku": "101-L-BLU", "size": "Большой", "color": "Синий", "price": 150, stock_qty: 0},
                        {"sku": "101-L-RED", "size": "Большой", "color": "Красный", "price": 150, stock_qty: 2}
                    ]
                },
                {
                    id: 2,
                    name: "Чемодан",
                    description: "Наш самый популярный чемодан. Цена зависит от размера и цвета.",
                    oldPrice: 5500,
                    currentPrice: 3650,
                    isHit: true,
                    category_slug: "clothing",
                    images: [
                        {primary: true, image: "/img/merch/test.png"},
                        {primary: false, image: "/img/merch/test.png"},
                        {primary: false, image: "/img/merch/test.png"},
                        {primary: false, image: "/img/merch/test.png"},
                        {primary: false, image: "/img/merch/test.png"},
                    ],
                    attributes: [
                        {name: "Размер", sku_key: "size", options: ["Маленький", "Средний", "Большой"]},
                        {name: "Цвет", sku_key: "color", options: ["Синий", "Зеленый", "Красный"]}
                    ],
                    available_skus: [
                        {"sku": "102-S-BLU", "size": "Маленький", "color": "Синий", "price": 100, stock_qty: 2},
                        {"sku": "102-S-GRN", "size": "Маленький", "color": "Зеленый", "price": 100, stock_qty: 3},
                        {"sku": "102-M-GRN", "size": "Средний", "color": "Зеленый", "price": 120, stock_qty: 0},
                        {"sku": "102-L-BLU", "size": "Большой", "color": "Синий", "price": 150, stock_qty: 0},
                    ]
                },
                {
                    id: 3,
                    name: "Чемодан 3",
                    description: "Наш самый популярный чемодан. Цена зависит от размера и цвета.",
                    oldPrice: 10500,
                    currentPrice: 7650,
                    isHit: true,
                    category_slug: "clothing",
                    images: [
                        {primary: true, image: "/img/merch/test.png"},
                        {primary: false, image: "/img/merch/test.png"},
                        {primary: false, image: "/img/merch/test.png"},
                        {primary: false, image: "/img/merch/test.png"},
                        {primary: false, image: "/img/merch/test.png"},
                    ],
                    attributes: [
                        {name: "Размер", sku_key: "size", options: ["Маленький", "Средний", "Большой"]},
                        {name: "Цвет", sku_key: "color", options: ["Синий", "Зеленый", "Красный"]}
                    ],
                    available_skus: []
                },
                {
                    id: 4,
                    name: "Чемодан 4",
                    description: "Наш самый популярный чемодан. Цена зависит от размера и цвета.",
                    oldPrice: 8500,
                    currentPrice: 4450,
                    isHit: true,
                    category_slug: "clothing",
                    images: [
                        {primary: true, image: "/img/merch/test.png"},
                        {primary: false, image: "/img/merch/test.png"},
                        {primary: false, image: "/img/merch/test.png"},
                        {primary: false, image: "/img/merch/test.png"},
                        {primary: false, image: "/img/merch/test.png"},
                    ],
                    attributes: [
                        {name: "Размер", sku_key: "size", options: ["Маленький", "Средний", "Большой"]},
                    ],
                    available_skus: [
                        {"sku": "104-S", "size": "Маленький", "price": 100, stock_qty: 2},
                        {"sku": "104-M", "size": "Средний", "price": 120, stock_qty: 0},
                    ]
                },
                {
                    id: 5,
                    name: "Чемодан 5",
                    description: "Наш самый популярный чемодан. Цена зависит от размера и цвета.",
                    oldPrice: 4500,
                    currentPrice: 3350,
                    isHit: true,
                    category_slug: "clothing",
                    images: [
                        {primary: true, image: "/img/merch/test.png"},
                        {primary: false, image: "/img/merch/test.png"},
                        {primary: false, image: "/img/merch/test.png"},
                        {primary: false, image: "/img/merch/test.png"},
                        {primary: false, image: "/img/merch/test.png"},
                    ],
                    attributes: [
                        {name: "Размер", sku_key: "size", options: ["Маленький", "Средний", "Большой"]},
                        {name: "Цвет", sku_key: "color", options: ["Синий", "Зеленый", "Красный"]},
                        {name: "Материал", sku_key: "material", options: ["Металл", "Пластик"]}
                    ],
                    available_skus: [
                        {
                            sku: "104-S-BLUE-PLASTIC",
                            size: "Маленький",
                            color: "Синий",
                            material: "Пластик",
                            price: 1000,
                            stock_qty: 2
                        },
                        {
                            sku: "104-S-BLUE-METAL",
                            size: "Маленький",
                            color: "Синий",
                            material: "Металл",
                            price: 2000,
                            stock_qty: 0
                        },
                        {
                            sku: "104-S-RED-PLASTIC",
                            size: "Маленький",
                            color: "Красный",
                            material: "Пластик",
                            price: 2000,
                            stock_qty: 0
                        },
                    ]
                },
                {
                    id: 7,
                    name: 'Аксессуар А',
                    description: 'Наше авторское обучение для людей которые хотят работать в сфере туризма на ' +
                        'полную или частичную занятость, или путешествовать с огромными скидками.',
                    oldPrice: 1500,
                    currentPrice: 1200,
                    images: [
                        {primary: true, image: '/img/merch/test.png'},
                        {primary: false, image: '/img/merch/test.png'},
                        {primary: false, image: '/img/merch/test.png'},
                        {primary: false, image: '/img/merch/test.png'},
                        {primary: false, image: '/img/merch/test.png'}
                    ],
                    parameters: [{name: 'Цвет', value: ['Белый', 'Серый', 'Красный']}],
                    maxCount: 1,
                    isHit: false,
                    category_slug: 'accessories'
                },
                {
                    id: 11,
                    name: 'Товар Т1',
                    description: 'Наше авторское обучение для людей которые хотят работать в сфере туризма на ' +
                        'полную или частичную занятость, или путешествовать с огромными скидками.',
                    oldPrice: 5500,
                    currentPrice: 3650,
                    images: [
                        {primary: true, image: '/img/merch/test.png'},
                        {primary: false, image: '/img/merch/test.png'},
                        {primary: false, image: '/img/merch/test.png'},
                        {primary: false, image: '/img/merch/test.png'},
                        {primary: false, image: '/img/merch/test.png'}
                    ],
                    parameters: [{name: 'Размер', value: ['Маленький', 'Средний', 'Большой']}],
                    maxCount: 1,
                    isHit: false,
                    category_slug: 'travelGoods'
                },
            ],

            wishlistIds: [],
            wishlistFullData: [],
            displayedCount: ITEMS_PER_PAGE,
            promoBlocks: [],
            shuffledPromoBlocks: [],

            currentFilterTag: 'clothing',
            currentSort: 'default',
            isDetailVisible: false,
            modalProductData: null,
            isInWishList: false,

            platformData: []
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
            const productsToShow = this.sortedAndFilteredProducts.slice(0, this.displayedCount);
            const productsPerGroup = 6;

            for (let i = 0; i < productsToShow.length; i += productsPerGroup) {
                const groupProducts = productsToShow.slice(i, i + productsPerGroup);
                const shouldInsertPromo = (i + productsPerGroup) < productsToShow.length || groupProducts.length > 0;

                if (shouldInsertPromo) {
                    const promoIndex = Math.floor(i / productsPerGroup) % this.shuffledPromoBlocks.length;
                    groups.push({
                        products: groupProducts,
                        promo: this.shuffledPromoBlocks[promoIndex]
                    });
                } else {
                    groups.push({
                        products: groupProducts,
                        promo: null
                    });
                }
            }

            return groups;
        },

        canLoadMore() {
            return this.displayedCount < this.sortedAndFilteredProducts.length;
        },
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
            eventBus.$emit('update-favorites-products', newData)
        },
    },
    methods: {
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
            this.updateBrowserUrl(product.id);
            document.body.classList.add('no-scroll');
        },

        closeModal() {
            this.isDetailVisible = false;
            this.modalProductData = null;
            this.updateBrowserUrl(null);
            document.body.classList.remove('no-scroll');
        },

        updateBrowserUrl(productId) {
            const baseUrl = window.location.pathname.split('?')[0];
            const newUrl = productId
                ? `${baseUrl}?product=${productId}`
                : baseUrl;

            window.history.replaceState({}, '', newUrl);
        },

        loadMore() {
            this.displayedCount += ITEMS_PER_PAGE;
        },

        loadFromStorage(key) {
            try {
                const stored = localStorage.getItem(key);
                return stored ? JSON.parse(stored) : null;
            } catch (e) {
                console.error(`Не удалось загрузить данные из localStorage (${key}):`, e);
                return null;
            }
        },

        loadWishlist() {
            this.wishlistIds = this.loadFromStorage(WISHLIST_STORAGE_KEY) || [];
            this.wishlistFullData = this.loadFromStorage(WISHLIST_FULL_DATA_KEY) || [];
        },

        handleWishlist(product) {
            const productId = product.id;
            const index = this.wishlistIds.indexOf(productId);

            if (index === -1) {
                this.wishlistIds.push(productId);
                if (!this.wishlistFullData.some(p => p.id === productId)) {
                    this.wishlistFullData.push(product);
                }
            } else {
                this.wishlistIds.splice(index, 1);
                this.wishlistFullData = this.wishlistFullData.filter(p => p.id !== productId);
            }

            eventBus.$emit('update-favorites');
        },

        changeDetailProduct(product) {
            this.modalProductData = product;
            this.updateBrowserUrl(product.id);
        },

        loadFiltersAndSortFromStorage() {
            const stored = this.loadFromStorage(FILTERS_SORT_STORAGE_KEY);
            if (stored) {
                if (stored.tag) this.currentFilterTag = stored.tag;
                if (stored.sort) this.currentSort = stored.sort;
            }
        },

        saveFiltersAndSort() {
            try {
                const dataToSave = {
                    tag: this.currentFilterTag,
                    sort: this.currentSort
                };
                localStorage.setItem(FILTERS_SORT_STORAGE_KEY, JSON.stringify(dataToSave));
                eventBus.$emit('tab-sort-changed');
            } catch (e) {
                console.error("Не удалось сохранить фильтры/сортировку в localStorage:", e);
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
        }
    },
    mounted() {
        this.getPlatformData();
        this.loadWishlist();
        this.loadFiltersAndSortFromStorage();
        this.initializePromo();

        eventBus.$on('tab-sort-changed', this.loadFiltersAndSortFromStorage);
        eventBus.$on('open-product-modal', this.openModalFromCard);
        eventBus.$on('toggle-product-wishlist', this.handleWishlist);

        const urlParams = new URLSearchParams(window.location.search);
        const productIdFromUrl = urlParams.get('product');

        if (productIdFromUrl) {
            const productToOpen = this.allProducts.find(p => String(p.id) === productIdFromUrl);
            if (productToOpen) {
                this.openModalFromCard(productToOpen);
            } else {
                window.history.replaceState({}, '', window.location.pathname);
            }
        }
    },
    beforeUnmount() {
        eventBus.$off('tab-sort-changed', this.loadFiltersAndSortFromStorage);
        eventBus.$off('open-product-modal', this.openModalFromCard);
        eventBus.$off('toggle-product-wishlist', this.handleWishlist);
    }
}
</script>

<style scoped>
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
        grid-template-columns: repeat(3, 1fr);
        gap: 30px;
    }
}
</style>
