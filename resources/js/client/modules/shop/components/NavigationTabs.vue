<template>
    <div class="header-controls-container">
        <div v-if="isActiveSearch" class="sidebar-search-top sidebar-overlay" :class="{ active: isActiveSearch }"
            @click.self="closeSearchOverlay">
            <header class="sidebar-header mb-0">
                <div class="container search-modal-wrap-search">
                    <div class="search-modal-inside">
                        <div class="search-modal-inside-input">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M20.2654 21L13.7684 14.503C13.2496 14.945 12.653 15.287 11.9786 15.5291C11.3042 15.7712 10.6264 15.8922 9.94507 15.8922C8.28363 15.8922 6.87743 15.3171 5.72646 14.1668C4.57549 13.0158 4 11.61 4 9.94922C4 8.28848 4.57479 6.88192 5.72438 5.72957C6.87466 4.57652 8.28018 4 9.94092 4C11.6024 4 13.0093 4.57549 14.1616 5.72646C15.314 6.87743 15.8901 8.28398 15.8901 9.94611C15.8901 10.6669 15.7625 11.3644 15.5073 12.0388C15.2514 12.7132 14.9159 13.2901 14.5009 13.7694L20.9979 20.2654L20.2654 21ZM9.94507 14.8536C11.3215 14.8536 12.4839 14.3798 13.4322 13.4322C14.3798 12.4846 14.8536 11.3222 14.8536 9.94507C14.8536 8.56861 14.3798 7.40657 13.4322 6.45896C12.4846 5.51134 11.3226 5.03753 9.94611 5.03753C8.56965 5.03753 7.40726 5.51134 6.45896 6.45896C5.51134 7.40657 5.03753 8.56861 5.03753 9.94507C5.03753 11.3215 5.51134 12.4836 6.45896 13.4312C7.40657 14.3788 8.56861 14.8536 9.94507 14.8536Z"
                                    fill="#222222"
                                />
                            </svg>

                            <input ref="searchInput" type="text" placeholder="Поиск..."
                                :value="searchQuery" @input="onSearchInput" @keyup.enter="isActiveSearch = false"/>
                        </div>

                        <div v-if="isActiveSearch" class="search-modal-inside-find" @click="closeSearchOverlay">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8.53336 24.4107L7.58936 23.4667L15.056 16L7.58936 8.53336L8.53336 7.58936L16 15.056L23.4667 7.58936L24.4107 8.53336L16.944 16L24.4107 23.4667L23.4667 24.4107L16 16.944L8.53336 24.4107Z"
                                    fill="#222222"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </header>

            <div class="sidebar-body mt-0" v-if="searchQuery.trim().length > 0">
                <div class="container search-modal-wrap-result" :class="{ active: searchQuery.trim().length > 0 }">
                    <div class="search-modal-result">
                        <h3>{{ listMeta.total || 0 }} результатов по запросу: {{ searchQuery }}</h3>

                        <div class="search-modal-result-items">
                            <ProductCard v-for="product in searchResults" :key="product.id"
                                :product="product" @click="openModalFromCard(product)"/>
                        </div>

                        <div class="search-modal-pagination mt-5">
                            <nav v-if="listMeta.last_page > 1" aria-label="Pagination">
                                <ul class="pagination justify-content-center">
                                    <li class="page-item" :class="{ disabled: listMeta.current_page === 1 }">
                                        <a class="page-link" href="#" aria-label="Previous"
                                            @click.prevent="goToPage(listMeta.current_page - 1)">
                                            <span aria-hidden="true">&laquo;</span>
                                        </a>
                                    </li>

                                    <li v-for="page in paginationPages" :key="page" class="page-item"
                                        :class="{ active: page === listMeta.current_page }">
                                        <a class="page-link" href="#" @click.prevent="goToPage(page)">
                                            {{ page }}
                                        </a>
                                    </li>

                                    <li class="page-item"
                                        :class="{ disabled: listMeta.current_page === listMeta.last_page }">
                                        <a class="page-link" href="#" aria-label="Next"
                                            @click.prevent="goToPage(listMeta.current_page + 1)">
                                            <span aria-hidden="true">&raquo;</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="align-items-center d-flex flex-wrap gap-2 justify-content-end justify-content-sm-between navigation-tabs"
        :class="{'pt-4 pb-4': !isInHeader}">
            <div v-if="!isInHeader" class="d-flex align-items-center gap-2 flex-wrap">
                <button v-for="tab in tabs" :key="tab.id" :disabled="activeTab === tab.id"
                    :class="['tab-button', { active: activeTab === tab.id }]" @click="setActiveTab(tab.id)">
                    {{ tab.name }}
                </button>
            </div>
            <div v-if="!isInHeader" class="sort-control-wrapper text-end">
                <div class="dropdown sort-control">
                    <button id="sortButton" class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                        {{ displaySortText.prefix }}:
                        <b>{{ displaySortText.value }}</b>

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

            <div v-if="isInHeader" class="controls-bar action-icons d-flex align-items-center gap-lg-3">
                <button class="icon-button search" title="Поиск" @click="toggleSearchOverlay">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.2654 21L13.7684 14.503C13.2496 14.945 12.653 15.287 11.9786 15.5291C11.3042 15.7712
                        10.6264 15.8922 9.94507 15.8922C8.28363 15.8922 6.87743 15.3171 5.72646 14.1668C4.57549 13.0158
                        4 11.61 4 9.94922C4 8.28848 4.57479 6.88192 5.72438 5.72957C6.87466 4.57652 8.28018 4 9.94092
                        4C11.6024 4 13.0093 4.57549 14.1616 5.72646C15.314 6.87743 15.8901 8.28398 15.8901
                        9.94611C15.8901 10.6669 15.7625 11.3644 15.5073 12.0388C15.2514 12.7132 14.9159 13.2901
                        14.5009 13.7694L20.9979 20.2654L20.2654 21ZM9.94507 14.8536C11.3215 14.8536 12.4839
                        14.3798 13.4322 13.4322C14.3798 12.4846 14.8536 11.3222 14.8536 9.94507C14.8536 8.56861
                        14.3798 7.40657 13.4322 6.45896C12.4846 5.51134 11.3226 5.03753 9.94611 5.03753C8.56965
                        5.03753 7.40726 5.51134 6.45896 6.45896C5.51134 7.40657 5.03753 8.56861 5.03753
                        9.94507C5.03753 11.3215 5.51134 12.4836 6.45896 13.4312C7.40657 14.3788 8.56861 14.8536
                        9.94507 14.8536Z" fill="#FFFFFF">
                        </path>
                    </svg>
                </button>

                <button class="icon-button favorites" title="Избранное" @click="toggleFavorites">
                    <svg :class="{ 'active-favorite': isActiveFavorite }" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path v-if="isActiveFavorite" d="M5.5 4H9L12 7L14 4.5L17.5 4L19.5 4.5L21.5 7V10.5L20.5 13L15.5 18L12 20.5L7.5 17.5L2.5 10.5V6L5.5 4Z" fill="#222222"></path>

                        <path fill="#FFFFFF" style="stroke-width: 0;" d="M16.6875 3.1875C14.7188 3.1875 13.0069 4.07531 12 5.56313C10.9931 4.07531 9.28125
                        3.1875 7.3125 3.1875C5.82119 3.18924 4.39146 3.78243 3.33694 4.83694C2.28243 5.89146 1.68924
                        7.32119 1.6875 8.8125C1.6875 11.55 3.39375 14.3991 6.75937 17.2791C8.30161 18.5932 9.96751
                        19.7549 11.7338 20.7478C11.8156 20.7918 11.9071 20.8148 12 20.8148C12.0929 20.8148 12.1844
                        20.7918 12.2662 20.7478C14.0325 19.7549 15.6984 18.5932 17.2406 17.2791C20.6062 14.3991
                        22.3125 11.55 22.3125 8.8125C22.3108 7.32119 21.7176 5.89146 20.6631 4.83694C19.6085 3.78243
                        18.1788 3.18924 16.6875 3.1875ZM12 19.6041C10.4616 18.7163 2.8125 14.0363 2.8125 8.8125C2.81374
                        7.61941 3.28825 6.47553 4.13189 5.63189C4.97553 4.78825 6.11941 4.31374 7.3125 4.3125C9.21375
                        4.3125 10.8103 5.32781 11.4797 6.96281C11.5221 7.06598 11.5942 7.15422 11.6868 7.21632C11.7795
                        7.27842 11.8885 7.31158 12 7.31158C12.1115 7.31158 12.2205 7.27842 12.3132 7.21632C12.4058
                        7.15422 12.4779 7.06598 12.5203 6.96281C13.1897 5.32781 14.7863 4.3125 16.6875 4.3125C17.8806
                        4.31374 19.0245 4.78825 19.8681 5.63189C20.7118 6.47553 21.1863 7.61941 21.1875 8.8125C21.1875
                        14.0363 13.5384 18.7163 12 19.6041Z" stroke="#222222"></path>
                    </svg>
                </button>

                <button class="icon-button cart" title="Корзина" @click="toggleOrder">
                    <svg class="active-cart" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path v-if="isActiveCart" d="M18.5 8.5H6L5.5 9V19L6.5 20.5H16.5L18.5 19.5V8.5Z" fill="#FFFFFF"></path>
                        <path d="M5.5 8.75H7.125H7.625V8.25V7.1875C7.625 6.81546 7.69525 6.47044 7.8336 6.14764C7.9746 5.81864 8.16762 5.5358 8.41316 5.29489C8.66223 5.05052 8.94851 4.85783 9.27505 4.71586C9.59124 4.57839 9.93636 4.50512 10.3156 4.5C10.8021 4.50051 11.2479 4.62125 11.6623 4.86335L11.9146 5.01073L11.9797 4.97266L12.4051 5.50068C12.5462 5.67585 12.6516 5.84068 12.7265 5.99482C12.8054 6.1572 12.8612 6.31509 12.8964 6.46884C12.9353 6.63937 12.9622 6.81246 12.9768 6.9883C12.9921 7.17201 13 7.3711 13 7.58594V8.25V8.75H13.5H15.625H16.125V8.25V7.1875C16.125 6.8337 16.0566 6.49308 15.9191 6.16995C15.7836 5.8516 15.5944 5.57135 15.3508 5.33472L15.0024 5.69336L15.3508 5.33472C15.1128 5.10353 14.8364 4.9191 14.5257 4.78031C14.2008 4.63513 13.8573 4.5625 13.5 4.5625C13.1943 4.5625 12.8993 4.61368 12.6189 4.71885L12.0472 4.93322L12.1668 4.86335C12.5836 4.61982 13.0252 4.5 13.5 4.5C13.872 4.5 14.2171 4.57025 14.5399 4.7086C14.8689 4.8496 15.1517 5.04262 15.3926 5.28816C15.637 5.53723 15.8297 5.82351 15.9716 6.15005C16.1091 6.46627 16.1824 6.81143 16.1875 7.19074V8.25V8.75H16.6875H18.3125V18.875C18.3125 19.1037 18.2697 19.3093 18.1879 19.4974C18.1019 19.6952 17.9851 19.8669 17.8364 20.0156C17.6894 20.1625 17.5166 20.2792 17.3135 20.3656C17.1148 20.4502 16.9056 20.4952 16.6824 20.5H7.125C6.89635 20.5 6.69071 20.4572 6.50258 20.3754C6.30477 20.2894 6.13314 20.1726 5.98441 20.0239C5.83569 19.8752 5.71886 19.7035 5.63285 19.5057C5.55074 19.3169 5.50489 19.1068 5.5 18.8701V8.75ZM7.6875 8.25V8.75H8.1875H12.4375H12.9375V8.25V7.1875C12.9375 6.8337 12.8691 6.49308 12.7316 6.16995C12.5961 5.8516 12.4069 5.57135 12.1633 5.33472C11.9253 5.10353 11.6489 4.9191 11.3382 4.78031L11.1343 5.23682L11.3382 4.78031C11.0133 4.63513 10.6698 4.5625 10.3125 4.5625C9.95456 4.5625 9.61235 4.63042 9.29136 4.76998C8.98006 4.90533 8.70345 5.09286 8.46481 5.33151C8.22438 5.57193 8.03668 5.85284 7.90174 6.16995C7.76552 6.49006 7.69433 6.82729 7.68759 7.17789L7.6875 7.17788V7.1875V8.25ZM15.0625 9.3125V8.8125H14.5625H6.0625H5.5625V9.3125V18.875C5.5625 19.0877 5.60224 19.2945 5.68697 19.4894C5.76623 19.6717 5.87574 19.8353 6.01607 19.9756L6.36963 19.6221L6.01608 19.9756C6.15611 20.1157 6.32009 20.2258 6.50163 20.309L6.70996 19.8545L6.50163 20.309C6.7014 20.4006 6.91395 20.4443 7.13357 20.4375H14.8447H15.7028L15.2797 19.691C15.1336 19.433 15.0625 19.1636 15.0625 18.875V9.3125ZM18.25 9.3125V8.8125H17.75H15.625H15.125V9.3125V18.875C15.125 19.0877 15.1647 19.2945 15.2495 19.4894C15.3287 19.6717 15.4382 19.8353 15.5786 19.9756C15.7186 20.1157 15.8826 20.2258 16.0641 20.309L16.2725 19.8545L16.0641 20.309C16.2642 20.4007 16.477 20.4444 16.6969 20.4375C16.9063 20.4363 17.1099 20.3965 17.3019 20.313C17.4842 20.2338 17.6478 20.1243 17.7881 19.9839L17.4346 19.6304L17.7881 19.9839C17.9282 19.8439 18.0383 19.6799 18.1215 19.4984C18.2131 19.2986 18.2568 19.086 18.25 18.8664V9.3125Z" stroke="#FFFFFF"></path></svg>
                </button>
            </div>
        </div>

        <FavoritesSidebar :isActive="isFavoritesOpen" @close="closeFavorites"/>
        <OrderSidebar :is-active="isOrderOpen" @close="closeOrder"/>
    </div>
</template>

<script>
import FavoritesSidebar from "./FavoritesSidebar.vue";
import OrderSidebar from "./OrderSidebar.vue";
import ProductCard from "./ProductCard.vue";
import eventBus from "../../../../event-bus";

const FILTERS_SORT_STORAGE_KEY = "merchFiltersAndSort";
const SHOPPING_CART_KEY = "shoppingCart";

export default {
    name: "NavigationTabs",
    components: {
        ProductCard,
        OrderSidebar,
        FavoritesSidebar
    },

    props: {
        isInHeader: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            tabs: [
                { id: "clothing", name: "Одежда" },
                { id: "accessories", name: "Аксессуары" },
                { id: "travelGoods", name: "Для путешествий" }
            ],
            activeTab: "clothing",

            sortOptions: [
                { value: "default", text: "Сортировать: по умолчанию" },
                { value: "price_asc", text: "Цена: по возрастанию" },
                { value: "price_desc", text: "Цена: по убыванию" },
                { value: "name_a_z", text: "Название: А - Я" },
                { value: "name_z_a", text: "Название: Я - А" }
            ],
            currentSortValue: "default",

            isFavoritesOpen: false,
            isOrderOpen: false,
            isActiveSearch: false,

            wishlistIds: [],

            searchQuery: "",
            searchResults: [],
            searchLoading: false,
            searchPage: 1,
            lastPage: 1,
            searchTotal: 0,
            debouncedSearch: null,
            latestSearchRequestId: 0,

            listMeta: {
                total: 0,
                current_page: 1,
                last_page: 1
            },

            isActiveCart: false,
            isActiveFavorite: false
        };
    },

    computed: {
        currentSortOption() {
            return this.sortOptions.find(opt => opt.value === this.currentSortValue) || this.sortOptions[0];
        },

        displaySortText() {
            const [prefix, value] = this.currentSortOption.text.split(":");

            return {
                prefix: (prefix || "").trim(),
                value: value ? value.trim() : (prefix || "").trim()
            };
        },

        paginationPages() {
            const current = Number(this.listMeta.current_page || 1);
            const total = Number(this.listMeta.last_page || 1);

            if (total <= 1) return [];

            const pages = [];
            const maxVisible = 5;
            let start = Math.max(1, current - Math.floor(maxVisible / 2));
            let end = Math.min(total, start + maxVisible - 1);

            if (end - start + 1 < maxVisible) {
                start = Math.max(1, end - maxVisible + 1);
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            return pages;
        },
    },

    watch: {
        searchQuery() {
            this.searchPage = 1;
            this.debouncedSearch();
        },

        activeTab() {
            this.currentSortValue = "default";
            this.saveFiltersAndSort();
            this.searchPage = 1;
            this.fetchProducts();
        },

        currentSortValue() {
            this.saveFiltersAndSort();
            this.searchPage = 1;
            this.fetchProducts();
        },

        isActiveSearch(val) {
            if (!val) {
                this.searchQuery = "";
                this.searchResults = [];
                this.searchTotal = 0;
                this.searchPage = 1;
                this.lastPage = 1;
                this.listMeta = {
                    total: 0,
                    current_page: 1,
                    last_page: 1
                };
                document.body.classList.remove("no-scroll");
                return;
            }

            this.$nextTick(() => {
                if (this.$refs.searchInput) {
                    this.$refs.searchInput.focus();
                }
            });

            if (!this.searchQuery.trim().length) {
                document.body.classList.remove("no-scroll");
            }
        },

        isFavoritesOpen: "updateBodyScroll",
        isOrderOpen: "updateBodyScroll"
    },

    methods: {
        async fetchProducts() {
            const query = this.searchQuery.trim();

            if (!query) {
                this.resetSearch();
                this.updateBodyScroll();
                return;
            }

            const requestId = ++this.latestSearchRequestId;
            const requestedQuery = query;
            const requestedPage = this.searchPage;

            this.searchLoading = true;

            try {
                const params = new URLSearchParams({
                    search: requestedQuery,
                    page: String(requestedPage)
                });

                const response = await fetch(`/api/products?${params.toString()}`);
                const data = await response.json();

                if (requestId !== this.latestSearchRequestId) {
                    return;
                }

                if (requestedQuery !== this.searchQuery.trim() || requestedPage !== this.searchPage) {
                    return;
                }

                this.searchResults = Array.isArray(data.data) ? data.data : [];
                this.listMeta = data.meta || {
                    total: 0,
                    current_page: 1,
                    last_page: 1
                };
                this.searchTotal = Number(data.total || this.listMeta.total || 0);
                this.lastPage = Number(data.last_page || this.listMeta.last_page || 1);
                this.searchPage = Number(data.current_page || this.listMeta.current_page || 1);

                if (requestedQuery.length > 0) {
                    document.body.classList.add("no-scroll");
                } else {
                    document.body.classList.remove("no-scroll");
                    this.searchResults = [];
                }
            } catch (error) {
                if (requestId !== this.latestSearchRequestId) {
                    return;
                }

                console.error("Search error:", error);
            } finally {
                if (requestId === this.latestSearchRequestId) {
                    this.searchLoading = false;
                }
            }
        },

        goToPage(page) {
            if (page < 1 || page > this.lastPage) return;
            if (page === this.searchPage) return;

            this.searchPage = page;
            this.fetchProducts();

            this.$nextTick(() => {
                const container = document.querySelector(".search-modal-result-items");
                if (container) {
                    container.scrollTop = 0;
                }
            });
        },

        resetSearch() {
            this.searchResults = [];
            this.searchTotal = 0;
            this.searchPage = 1;
            this.lastPage = 1;
            this.listMeta = {
                total: 0,
                current_page: 1,
                last_page: 1
            };
        },

        loadMore() {
            if (this.searchPage >= this.lastPage) return;
            this.searchPage++;
            this.fetchProducts();
        },

        toggleSearchOverlay() {
            this.isActiveSearch = !this.isActiveSearch;
            if (this.isActiveSearch) {
                this.isFavoritesOpen = false;
                this.isOrderOpen = false;
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
            const shouldBlock =
                this.isFavoritesOpen ||
                this.isOrderOpen ||
                (this.isActiveSearch && this.searchQuery.trim().length > 0);

            document.body.classList.toggle("no-scroll", shouldBlock);
        },

        setActiveTab(id) {
            this.activeTab = id;
            eventBus.$emit("tab-category:changed", id);
        },

        selectSortOption(option) {
            this.currentSortValue = option.value;
            eventBus.$emit("sort:changed", option.value);
        },

        loadFiltersAndSort() {
            const stored = this.loadFromStorage(FILTERS_SORT_STORAGE_KEY);

            if (!stored) return;

            if (stored.tag) {
                this.activeTab = stored.tag;
            }

            if (stored.sort) {
                this.currentSortValue = stored.sort;
            }

            eventBus.$emit("tab-sort:changed");
        },

        saveFiltersAndSort() {
            localStorage.setItem(
                FILTERS_SORT_STORAGE_KEY,
                JSON.stringify({
                    tag: this.activeTab,
                    sort: this.currentSortValue
                })
            );
        },

        loadFromStorage(key) {
            try {
                const stored = localStorage.getItem(key);
                return stored ? JSON.parse(stored) : null;
            } catch (e) {
                return null;
            }
        },

        getWishListCount(){
            const wishListStorage = JSON.parse(localStorage.getItem('merchWishlistIds'));
            const wishListCount = Array.isArray(wishListStorage) ? wishListStorage.length : 0;

            if (wishListCount > 0) {
                this.isActiveFavorite = true;
            } else this.isActiveFavorite = false;
        },

        handleWishlist(product) {
            const index = this.wishlistIds.indexOf(product.id);

            if (index === -1) {
                this.wishlistIds.push(product.id);
            } else {
                this.wishlistIds.splice(index, 1);
            }

            eventBus.$emit("toggle-wishlist", product);

            this.getWishListCount();
        },

        isInWishlist(productId) {
            return this.wishlistIds.includes(productId);
        },

        openModalFromCard(product) {
            eventBus.$emit("product-modal:open", product);
        },

        openSidebarOrder() {
            this.isOrderOpen = true;

            this.checkIsActiveCart();
        },

        debounce(fn, delay) {
            let timeout = null;

            return (...args) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    fn.apply(this, args);
                }, delay);
            };
        },

        onSearchInput(event) {
            this.searchQuery = event.target.value;
        },

        checkIsActiveCart() {
            const cartStorage = JSON.parse(localStorage.getItem('shoppingCart'));
             const cartCount = Array.isArray(cartStorage) ? cartStorage.length : 0;

            const cartSoldOutStorage = JSON.parse(localStorage.getItem('shoppingCart'));
             const cartSoldOutCount = Array.isArray(cartSoldOutStorage) ? cartSoldOutStorage.length : 0;

            if (cartCount > 0 || cartSoldOutCount > 0) {
                this.isActiveCart = true;
            } else this.isActiveCart = false;
        }
    },

    created() {
        this.debouncedSearch = this.debounce(this.fetchProducts, 400);

        eventBus.$on("update-favorites-products", (fullData) => {
            this.wishlistIds = fullData.map(p => p.id);
        });

        eventBus.$on("cart:updated", this.openSidebarOrder);
        eventBus.$on('update-favorites', this.getWishListCount);
    },

    mounted() {
        this.loadFiltersAndSort();
        this.updateBodyScroll();

        this.checkIsActiveCart();
        this.getWishListCount();
    },

    beforeUnmount() {
        eventBus.$off("update-favorites-products");
        eventBus.$off("cart:updated", this.openSidebarOrder);
        document.body.classList.remove("no-scroll");
    }
};
</script>

<style lang="scss">
.search-modal-pagination {
    .page-link {
        border: none;
        color: black;
    }

    .page-item.active .page-link {
        background: #dd0024;
        font-weight: bold;
        color: white;
    }
}

body.no-scroll {
    overflow: hidden !important;
}

.header-controls-container {
    @keyframes fadeTop {
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

    @keyframes fadeBottom {
        0% {
            opacity: 0;
            transform: translateY(100px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
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
                -webkit-animation-duration: var(--animate-duration, 0.3s);
                animation-duration: var(--animate-duration, 0.3s);
                -webkit-animation-fill-mode: both;
                animation-fill-mode: both;
                animation-name: fadeTop;
            }

            .sidebar-body {
                background: white;
                -webkit-animation-duration: var(--animate-duration, 0.3s);
                animation-duration: var(--animate-duration, 0.3s);
                -webkit-animation-fill-mode: both;
                animation-fill-mode: both;
                animation-name: fadeBottom;

                .search-modal-wrap-result {
                    padding-top: 15px;
                }
            }
        }

        .sidebar-body {
            padding-bottom: 0;
            height: 100%;
        }

        .search-modal-result {
            padding-bottom: 150px;
        }

        .search-modal-result-items {
            display: grid;
            justify-content: center;
            padding-top: 30px;
        }

        @media (max-width: 767.98px) {
            .search-modal-result-items {
                grid-template-columns: repeat(2, 1fr);
                gap: 20px;
            }

            .search-modal-result-items .product-card {
                height: 330px;
                border-radius: 15px;
            }
        }

        @media (min-width: 768px) {
            .search-modal-result-items {
                grid-template-columns: repeat(3, 1fr);
                gap: 30px;
            }
        }
    }

    .search-modal-inside,
    .search-modal-wrap-search {
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

    @media (max-width: 997.98px) {
        .sort-control button {
            font-size: 16px !important;
        }
    }

    @media (max-width: 767.98px) {
        .search-modal-inside-find svg {
            width: 40px;
        }
    }
}

.active-cart path {
    fill: #FFFFFF;
}

.active-favorite path {
    fill: #FFFFFF;
}
</style>
