<template>
    <div class="product-list-container">
        <product-detail-modal v-if="modalProductData" :is-visible="isDetailVisible"
                              :product="modalProductData"
                              @close="closeModal"
                              :is-in-wishlist="isInWishlist(modalProductData.id)"
                              @toggle-wishlist="handleWishlist"/>

        <div v-for="(group, groupIndex) in displayedGroups" :key="`group-${groupIndex}`">
            <div class="product-grid">
                <ProductCard
                    v-for="product in group.products"
                    :key="product.id"
                    :product="product"
                    :is-in-wishlist="isInWishlist(product.id)"
                    @toggle-wishlist="handleWishlist"
                    @click="openModalFromCard(product)"
                />
            </div>

            <div v-if="group.promo" class="promo-block">
                <PromoBlock :promo-data="group.promo" />
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
import eventBus from "../../../../event-bus";
import ProductDetailModal from "./ProductDetailModal.vue";

const WISHLIST_STORAGE_KEY = 'merchWishlistIds';
const WISHLIST_FULL_DATA_KEY = 'merchWishlistFullData';
const FILTERS_SORT_STORAGE_KEY = 'merchFiltersAndSort';

const TEMPLATES = {
    RELEASES: {
        title: 'Новые выпуски из путешествий',
    },
    NEWS: {
        title: 'Последние новости',
    },
    SALES: {
        title: 'Горящие туры, акции и скидки',
    }
};

const PLATFORM_DATA = [
    { idSuffix: '1', platformName: 'Rutube',     imageUrl: '/img/socials/promo-rutube.png', url: 'https://rutube.ru/channel/37334628/', template: TEMPLATES.RELEASES },
    { idSuffix: '2', platformName: 'Vkontakte',  imageUrl: '/img/socials/promo-vk.png', url: 'https://vk.com/put_club', template: TEMPLATES.NEWS },
    { idSuffix: '3', platformName: 'Telegram',   imageUrl: '/img/socials/promo-tg.png', url: 'https://t.me/put_club', template: TEMPLATES.SALES },
    { idSuffix: '4', platformName: 'Dzen',       imageUrl: '/img/socials/promo-dzen.png', url: 'https://dzen.ru/put_club', template: TEMPLATES.RELEASES },
    { idSuffix: '5', platformName: 'YouTube',    imageUrl: '/img/socials/promo-youtube.png', url: 'https://www.youtube.com/@put_club', template: TEMPLATES.RELEASES },
    { idSuffix: '6', platformName: 'TikTok',     imageUrl: '/img/socials/promo-tiktok.png', url: 'https://www.tiktok.com/@put_club', template: TEMPLATES.SALES },
    { idSuffix: '7', platformName: 'Yappi',      imageUrl: '/img/socials/promo-yappi.png', url: 'https://yappy.media/n/put_club', template: TEMPLATES.SALES },
    { idSuffix: '8', platformName: 'Одноклассники', imageUrl: '/img/socials/promo-ok.png', url: 'https://ok.ru/group/70000033103318', template: TEMPLATES.SALES },
    { idSuffix: '9', platformName: 'Max',        imageUrl: '/img/socials/promo-max.png', url: 'https://t.me/put_club', template: TEMPLATES.NEWS },
    { idSuffix: '10', platformName: 'Instagram',  imageUrl: '/img/socials/promo-instagram.png', url: 'https://instagram.com/put_club', template: TEMPLATES.SALES }
];

const generatePromoBlocks = () => {
    return PLATFORM_DATA.map((platform) => ({
        id: `promo${platform.idSuffix}`,
        title: platform.template.title,
        description: `можно посмотреть у нас в ${platform.platformName}`,
        imageUrl: platform.imageUrl,
        type: 'promo',
        url: platform.url
    }));
};

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export default {
    name: 'ProductList',
    components: {
        ProductDetailModal,
        PromoBlock,
        ProductCard
    },
    data() {
        return {
            allProducts: [
                { id: 1, name: 'Чемодан "В ПУТЬ" 1', oldPrice: 5500, currentPrice: 3650, imageUrl: '/img/merch/test.png', images: ['/img/merch/test.png', '/img/merch/test.png', '/img/merch/test.png', '/img/merch/test.png'], parameters: [{ name: 'Размер', value: ['Маленький', 'Средний', 'Большой'] }, { name: 'Цвет', value: ['Красный', 'Синий', 'Зеленый'] }], maxCount: 3, isHit: true, category_slug: 'clothing' },
                { id: 2, name: 'Чемодан "В ПУТЬ" 2', oldPrice: 7500, currentPrice: 4650, imageUrl: '/img/merch/test.png', parameters: [{ name: 'Размер', value: ['Маленький', 'Средний'] }], maxCount: 2, isHit: true, category_slug: 'clothing' },
                { id: 3, name: 'Чемодан "В ПУТЬ" 3', oldPrice: 3500, currentPrice: 8650, imageUrl: '/img/merch/test.png', parameters: [{ name: 'Размер', value: ['Средний', 'Большой'] }], maxCount: 5, isHit: true, category_slug: 'clothing' },
                { id: 4, name: 'Чемодан "В ПУТЬ" 4', oldPrice: 5500, currentPrice: 2650, imageUrl: '/img/merch/test.png', parameters: [{ name: 'Размер', value: ['Маленький', 'Средний', 'Большой'] }], maxCount: 4, isHit: true, category_slug: 'clothing' },
                { id: 5, name: 'Чемодан "В ПУТЬ" 5', oldPrice: 5500, currentPrice: 1550, imageUrl: '/img/merch/test.png', parameters: [{ name: 'Размер', value: ['Маленький', 'Средний', 'Большой'] }], maxCount: 5, isHit: true, category_slug: 'clothing' },
                { id: 6, name: 'Чемодан "В ПУТЬ" 6', oldPrice: 5500, currentPrice: 9650, imageUrl: '/img/merch/test.png', parameters: [{ name: 'Размер', value: ['Маленький', 'Средний', 'Большой'] }], isHit: true, category_slug: 'clothing' },

                { id: 7, name: 'Аксессуар А', oldPrice: 1500, currentPrice: 1200, imageUrl: '/img/merch/test.png', parameters: [{ name: 'Цвет', value: 'Черный' }], maxCount: 1, isHit: false, category_slug: 'accessories' },
                { id: 8, name: 'Аксессуар Б', oldPrice: 2000, currentPrice: 1800, imageUrl: '/img/merch/test.png', parameters: [{ name: 'Цвет', value: 'Белый' }], maxCount: 1, isHit: false, category_slug: 'accessories' },
                { id: 9, name: 'Аксессуар В', oldPrice: 500, currentPrice: 450, imageUrl: '/img/merch/test.png', parameters: [{ name: 'Цвет', value: 'Серый' }], maxCount: 1, isHit: false, category_slug: 'accessories' },
                { id: 10, name: 'Аксессуар Г', oldPrice: 3000, currentPrice: 2900, imageUrl: '/img/merch/test.png', parameters: [{ name: 'Цвет', value: 'Красный' }], maxCount: 1, isHit: false, category_slug: 'accessories' },

                { id: 11, name: 'Товар Т1', oldPrice: 5500, currentPrice: 3650, imageUrl: '/img/merch/test.png', parameters: [{ name: 'Размер', value: 'Средний' }], maxCount: 1, isHit: false, category_slug: 'travelGoods' },
                { id: 12, name: 'Товар Т2', oldPrice: 5500, currentPrice: 3650, imageUrl: '/img/merch/test.png', parameters: [{ name: 'Размер', value: 'Средний' }], maxCount: 1, isHit: false, category_slug: 'travelGoods' },
                { id: 13, name: 'Товар Т3', oldPrice: 5500, currentPrice: 3650, imageUrl: '/img/merch/test.png', parameters: [{ name: 'Размер', value: 'Средний' }], maxCount: 1, isHit: false, category_slug: 'travelGoods' },
                { id: 14, name: 'Товар Т4', oldPrice: 5500, currentPrice: 3650, imageUrl: '/img/merch/test.png', parameters: [{ name: 'Размер', value: 'Средний' }], maxCount: 1, isHit: false, category_slug: 'travelGoods' },
            ],

            wishlistIds: [],
            wishlistFullData: [],
            displayedCount: 12,
            promoBlocks: generatePromoBlocks(),
            shuffledPromoBlocks: [],

            currentFilterTag: 'clothing',
            currentSort: 'default',
            isDetailVisible: false,
            currentModalProductId: null,
            modalProductData: null,
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

            for (let i = 0; i < productsToShow.length; i += 6) {
                const groupProducts = productsToShow.slice(i, i + 6);
                const promoIndex = Math.floor(i / 6) % this.shuffledPromoBlocks.length;

                groups.push({
                    products: groupProducts,
                    promo: (i + 6 < productsToShow.length || groupProducts.length > 0)
                        ? this.shuffledPromoBlocks[promoIndex]
                        : null
                });
            }

            return groups;
        },

        canLoadMore() {
            return this.displayedCount < this.sortedAndFilteredProducts.length;
        }
    },
    watch: {
        wishlistIds(newIds) {
            try {
                localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(newIds));
            } catch (e) {
                console.error("Ошибка сохранения wishlistIds:", e);
            }
            eventBus.$emit('update-favorites-products', this.wishlistFullData);
        },

        wishlistFullData(newData) {
            try {
                localStorage.setItem(WISHLIST_FULL_DATA_KEY, JSON.stringify(newData));
            } catch (e) {
                console.error("Ошибка сохранения wishlistFullData:", e);
            }
            eventBus.$emit('update-favorites-count', newData.length);
        },
        currentSort() {
            this.saveFiltersAndSort();
        },
        currentFilterTag() {
            this.saveFiltersAndSort();
        }
    },
    methods: {
        fetchProductData(id) {
            //TODO:Получить список всех товаров
        },
        openModalFromCard(product) {
            this.modalProductData = product;
            this.isDetailVisible = true;
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

            window.history.pushState({}, '', newUrl);
        },

        loadMore() {
            this.displayedCount += 12;
        },

        loadWishlist() {
            try {
                const storedIds = localStorage.getItem(WISHLIST_STORAGE_KEY);
                this.wishlistIds = storedIds ? JSON.parse(storedIds) : [];

                const storedFullData = localStorage.getItem(WISHLIST_FULL_DATA_KEY);
                this.wishlistFullData = storedFullData ? JSON.parse(storedFullData) : [];
            } catch (e) {
                console.error("Не удалось загрузить избранное из localStorage:", e);
                this.wishlistIds = [];
                this.wishlistFullData = [];
            }
        },

        handleWishlist(productFromCard) {
            const productId = productFromCard.id;
            const index = this.wishlistIds.indexOf(productId);

            if (index === -1) {
                this.wishlistIds.push(productId);
                this.wishlistFullData.push(productFromCard);
            } else {
                this.wishlistIds.splice(index, 1);
                const dataIndex = this.wishlistFullData.findIndex(p => p.id === productId);
                if (dataIndex !== -1) {
                    this.wishlistFullData.splice(dataIndex, 1);
                }
            }
        },

        isInWishlist(productId) {
            return this.wishlistIds.includes(productId);
        },

        loadFiltersAndSortFromStorage() {
            try {
                const stored = localStorage.getItem(FILTERS_SORT_STORAGE_KEY);
                if (stored) {
                    const { tag, sort } = JSON.parse(stored);

                    if (tag) this.currentFilterTag = tag;
                    if (sort) this.currentSort = sort;
                }
            } catch (e) {
                console.error("Не удалось загрузить фильтры/сортировку из localStorage:", e);
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
        }
    },
    created() {
        this.shuffledPromoBlocks = [...this.promoBlocks];
        shuffleArray(this.shuffledPromoBlocks);
    },
    mounted() {
        this.loadWishlist();
        this.loadFiltersAndSortFromStorage();
        eventBus.$on('tab-sort-changed', this.loadFiltersAndSortFromStorage);
        eventBus.$on('update-favorite-products', this.handleWishlist);

        const urlParams = new URLSearchParams(window.location.search);
        const productIdFromUrl = urlParams.get('product');

        if (productIdFromUrl) {
            const productToOpen = this.allProducts.find(p => String(p.id) === productIdFromUrl);

            if (productToOpen) {
                this.openModalFromCard(productToOpen);
            } else {
                window.location.href = "/shop";
            }
        }
    },
    beforeUnmount() {
        eventBus.$off('tab-sort-changed', this.loadFiltersAndSortFromStorage);
        eventBus.$off('update-favorite-products', this.handleWishlist);
    }
}
</script>
<style scoped>
.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(304px, 1fr));
    gap: 50px;
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
}
</style>
