<template>
    <div class="header-controls-container">
        <div v-if="isActiveSearch" class="sidebar-search-top sidebar-overlay" :class="{ active: isActiveSearch }"  @click.self="closeSearchOverlay">
            <header class="sidebar-header">
                <div class="container search-modal-wrap-search">
                    <div class="search-modal-inside">
                        <div class="search-modal-inside-input">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M20.2654 21L13.7684 14.503C13.2496 14.945 12.653 15.287 11.9786 15.5291C11.3042 15.7712 10.6264 15.8922 9.94507 15.8922C8.28363 15.8922 6.87743 15.3171 5.72646 14.1668C4.57549 13.0158 4 11.61 4 9.94922C4 8.28848 4.57479 6.88192 5.72438 5.72957C6.87466 4.57652 8.28018 4 9.94092 4C11.6024 4 13.0093 4.57549 14.1616 5.72646C15.314 6.87743 15.8901 8.28398 15.8901 9.94611C15.8901 10.6669 15.7625 11.3644 15.5073 12.0388C15.2514 12.7132 14.9159 13.2901 14.5009 13.7694L20.9979 20.2654L20.2654 21ZM9.94507 14.8536C11.3215 14.8536 12.4839 14.3798 13.4322 13.4322C14.3798 12.4846 14.8536 11.3222 14.8536 9.94507C14.8536 8.56861 14.3798 7.40657 13.4322 6.45896C12.4846 5.51134 11.3226 5.03753 9.94611 5.03753C8.56965 5.03753 7.40726 5.51134 6.45896 6.45896C5.51134 7.40657 5.03753 8.56861 5.03753 9.94507C5.03753 11.3215 5.51134 12.4836 6.45896 13.4312C7.40657 14.3788 8.56861 14.8536 9.94507 14.8536Z"
                                    fill="#222222"></path>
                            </svg>
                            <input type="text" placeholder="Поиск..." value="" v-model="searchQuery"
                                   @keyup.enter="isActiveSearch = false"></div>
                        <div v-if="isActiveSearch" @click="closeSearchOverlay" class="search-modal-inside-find">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8.53336 24.4107L7.58936 23.4667L15.056 16L7.58936 8.53336L8.53336 7.58936L16 15.056L23.4667 7.58936L24.4107 8.53336L16.944 16L24.4107 23.4667L23.4667 24.4107L16 16.944L8.53336 24.4107Z"
                                    fill="#222222"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </header>

            <div class="sidebar-body" v-if="searchQuery.trim().length > 0">
                <div class="container search-modal-wrap-result" :class="{'active': searchQuery.trim().length > 0}">
                    <div class="search-modal-result">
                        <h3>{{ countSearch }} результатов по запросу: {{ searchQuery }}</h3>
                        <div class="search-modal-result-items">
                            <ProductCard
                                v-for="product in searchResults"
                                :key="product.id"
                                :product="product"
                                @click="openModalFromCard(product)"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="navigation-tabs d-flex align-items-center gap-2 justify-content-between flex-wrap">
            <div class="d-flex align-items-center gap-2 flex-wrap">
                <h2 class="fw-bolder pe-3">Наш мерч:</h2>
                <button :disabled="activeTab === tab.id"
                        v-for="tab in tabs"
                        :key="tab.id"
                        :class="['tab-button', { active: activeTab === tab.id }]"
                        @click="setActiveTab(tab.id)">
                    {{ tab.name }}
                </button>
            </div>

            <div class="controls-bar action-icons d-flex align-items-center gap-3">
                <button class="icon-button search" title="Поиск" @click="toggleSearchOverlay">
                    <img src="/img/merch/loupe-icon.png" alt="Поиск">
                </button>

                <button class="icon-button favorites" @click="toggleFavorites" title="Избранное">
                    <img src="/img/merch/like-icon.png" alt="Избранное">
                </button>

                <button class="icon-button cart" title="Корзина" @click="toggleOrder">
                    <img src="/img/merch/shopping-bag-icon.png" alt="Корзина">
                </button>
            </div>

            <FavoritesSidebar :isActive="isFavoritesOpen" @close="closeFavorites"/>
            <OrderSidebar :is-active="isOrderOpen" @close="closeOrder"/>
        </div>

        <div class="sort-control-wrapper text-end">
            <div class="dropdown sort-control">
                <button class="btn btn-light dropdown-toggle" type="button" id="sortButton"
                        data-bs-toggle="dropdown" aria-expanded="false">

                    {{ currentSortOption.text.split(':')[0] }}:
                    <b>{{ currentSortOption.text.split(':')[1] || currentSortOption.text.split(':')[0] }}</b>

                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#eb2d26"
                         class="bi bi-chevron-down custom-chevron" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
                <ul class="dropdown-menu" aria-labelledby="sortButton">
                    <li v-for="option in sortOptions" :key="option.value">
                        <a class="dropdown-item" href="#" @click.prevent="selectSortOption(option)">
                            {{ option.text }}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import FavoritesSidebar from "./FavoritesSidebar.vue";
import OrderSidebar from "./OrderSidebar.vue";
import eventBus from "../../../../event-bus";
import ProductCard from "./ProductCard.vue";

const FILTERS_SORT_STORAGE_KEY = 'merchFiltersAndSort';

const MOCK_PRODUCTS_DB = [
    { id: 101, name: 'Синяя футболка "Путешествие"', category_slug: 'clothing', currentPrice: 1500, imageUrl: '/img/merch/test.png' },
    { id: 102, name: 'Красный рюкзак', category_slug: 'accessories', currentPrice: 3500, imageUrl: '/img/merch/test.png' },
    { id: 103, name: 'Треккинговые ботинки', category_slug: 'clothing', currentPrice: 12000, imageUrl: '/img/merch/test.png' },
    { id: 104, name: 'Термос "Поход"', category_slug: 'travelGoods', currentPrice: 2500, imageUrl: '/img/merch/test.png' },
    { id: 105, name: 'Брелок "Трек"', category_slug: 'accessories', currentPrice: 400, imageUrl: '/img/merch/test.png' },
];

export default {
    name: 'NavigationTabs',
    components: {ProductCard, OrderSidebar, FavoritesSidebar},

    data() {
        return {
            tabs: [
                {id: 'clothing', name: 'Одежда'},
                {id: 'accessories', name: 'Аксессуары'},
                {id: 'travelGoods', name: 'Для путешествий'}
            ],
            activeTab: 'clothing',

            sortOptions: [
                {value: 'default', text: 'Сортировать: по умолчанию'},
                {value: 'price_asc', text: 'Цена: по возрастанию'},
                {value: 'price_desc', text: 'Цена: по убыванию'},
                {value: 'name_a_z', text: 'Название: А - Я'},
                {value: 'name_z_a', text: 'Название: Я - А'},
            ],
            currentSortValue: 'default',

            isFavoritesOpen: false,
            isOrderOpen: false,

            favoriteItems: [],
            orderItems: [],

            isActiveSearch: false,
            searchQuery: '',
            searchResults: [],

            wishlistIds: [],
        }
    },

    computed: {
        currentSortOption() {
            return this.sortOptions.find(opt => opt.value === this.currentSortValue) || this.sortOptions[0];
        },
        countSearch() {
            return this.searchResults.length;
        }
    },

    watch: {
        activeTab(newTab, oldTab) {
            if (newTab !== oldTab) {
                this.currentSortValue = 'default';
                this.$emit('tab-changed', newTab);
                this.saveFiltersAndSort();
            }
        },

        currentSortValue() {
            this.saveFiltersAndSort();
        },

        isFavoritesOpen() {
            this.updateBodyScroll();
        },
        isOrderOpen() {
            this.updateBodyScroll();
        },
        isActiveSearch(newValue) {
            if (!newValue) {
                this.searchQuery = '';
                this.searchResults = [];
                document.body.classList.remove('no-scroll');
            } else {
                if (this.searchQuery.trim().length === 0) {
                    document.body.classList.remove('no-scroll');
                }
            }
        },
        searchQuery() {
            this.performSearch();
        },
    },

    methods: {
        loadFiltersAndSort() {
            const stored = this.loadFromStorage(FILTERS_SORT_STORAGE_KEY);
            if (stored) {
                if (stored.tag && this.tabs.some(t => t.id === stored.tag)) {
                    this.activeTab = stored.tag;
                }
                if (stored.sort && this.sortOptions.some(opt => opt.value === stored.sort)) {
                    this.currentSortValue = stored.sort;
                }
            }
            eventBus.$emit('tab-sort-changed');
        },

        saveFiltersAndSort() {
            try {
                const dataToSave = {
                    tag: this.activeTab,
                    sort: this.currentSortValue
                };
                localStorage.setItem(FILTERS_SORT_STORAGE_KEY, JSON.stringify(dataToSave));

                eventBus.$emit('tab-sort-changed');

            } catch (e) {
                console.error("Не удалось сохранить фильтры/сортировку в localStorage:", e);
            }
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

        setActiveTab(id) {
            this.activeTab = id;
        },

        selectSortOption(option) {
            this.currentSortValue = option.value;
        },

        toggleSearchOverlay() {
            this.isActiveSearch = !this.isActiveSearch;
            if (this.isActiveSearch) {
                document.body.classList.add('no-scroll');
            } else {
                this.searchQuery = '';
            }
        },

        closeSearchOverlay() {
            this.isActiveSearch = false;
        },

        toggleFavorites() {
            this.isFavoritesOpen = !this.isFavoritesOpen;
            this.isActiveSearch = false;
        },

        toggleOrder() {
            this.isOrderOpen = !this.isOrderOpen;
            this.isActiveSearch = false;
        },

        closeFavorites() {
            this.isFavoritesOpen = false;
        },

        closeOrder() {
            this.isOrderOpen = false;
        },

        updateBodyScroll() {
            const shouldBlock = this.isFavoritesOpen || this.isOrderOpen || this.isActiveSearch;
            document.body.classList.toggle('no-scroll', shouldBlock);
        },

        performSearch() {
            // TODO: сделать поиск (запрос к бд или локально)

            const query = this.searchQuery.toLowerCase().trim();
            const body = document.body;

            if (query.length > 0) {
                body.classList.add('no-scroll');
                this.searchResults = MOCK_PRODUCTS_DB.filter(p =>
                    p.name.toLowerCase().includes(query)
                );
            } else {
                body.classList.remove('no-scroll');
                this.searchResults = [];
            }
        },

        isInWishlist(productId) {
            return this.wishlistIds.includes(productId);
        },

        handleWishlist(product) {
            const productId = product.id;
            const index = this.wishlistIds.indexOf(productId);

            if (index === -1) {
                this.wishlistIds.push(productId);
            } else {
                this.wishlistIds.splice(index, 1);
            }

            eventBus.$emit('toggle-wishlist', product);
        },

        openModalFromCard(product) {
            eventBus.$emit('open-product-modal', product);
            //this.closeSearchOverlay();
        }
    },

    created() {
        eventBus.$on('update-favorites-products', (fullData) => {
            this.wishlistIds = fullData.map(p => p.id);
        });
    },

    mounted() {
        this.loadFiltersAndSort();
        this.updateBodyScroll();
    },

    beforeUnmount() {
        eventBus.$off('update-favorites-products');
        document.body.classList.remove('no-scroll');
    }
}
</script>
<style lang="scss">
body.no-scroll {
    overflow: hidden !important;
}

.header-controls-container {
    @keyframes fadeIn {
        0% {
            opacity: 0;
            transform: translateY(-100px);
            background: transparent;
        }
        100% {
            opacity: 1;
            transform: translateY(0);
            background: white;
        }
    }

    .sidebar-search-top {
        overflow: hidden;
        z-index: 99;

        .sidebar-header {
            padding-top: 28px;
            padding-bottom: 28px;
        }

        &.active {
            .sidebar-header {
                -webkit-animation-duration: 0.3s;
                animation-duration: 0.3s;
                -webkit-animation-duration: var(--animate-duration);
                animation-duration: var(--animate-duration);
                -webkit-animation-fill-mode: both;
                animation-fill-mode: both;
                animation-name: fadeIn;
            }

            .sidebar-body {
                background: white;
            }
        }

        .sidebar-body {
            padding-bottom: 0;
            height: 100%;
        }

        .search-modal-result-items {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
            gap: 50px;
            justify-content: center;
            padding-top: 30px;
        }
    }

    .search-modal-inside, .search-modal-wrap-search {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .search-modal-inside {
        gap: 40px;
        padding: 0 20px;
        width: 100%;
        margin: 0 auto;
    }

    .search-modal-inside-input {
        display: flex;
        align-items: center;
        gap: 4px;
        width: 100%;
        max-width: 671px;
        padding-bottom: 10px;
        border-bottom: 1px solid #222;
    }

    .search-modal-inside-input input {
        width: 100%;
        height: 100%;
        font-size: 16px;
        font-weight: 100;
        line-height: 16px;
        letter-spacing: -.04em;
        color: #222;
        border: none;
        outline: none;
    }

    .search-modal-inside-find svg {
        width: 56px;
        height: 56px;
    }

    .search-modal-inside-find {
        cursor: pointer;
    }
}
</style>
