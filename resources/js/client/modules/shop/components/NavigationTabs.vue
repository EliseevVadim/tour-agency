<template>
    <div class="header-controls-container">
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
                <button class="icon-button search" title="Поиск">
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

const FILTERS_SORT_STORAGE_KEY = 'merchFiltersAndSort';

export default {
    name: 'NavigationTabs',
    components: {OrderSidebar, FavoritesSidebar},

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
            favoriteItems: [],
            isOrderOpen: false,
            orderItems: []
        }
    },

    computed: {
        currentSortOption() {
            return this.sortOptions.find(opt => opt.value === this.currentSortValue) || this.sortOptions[0];
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
        }
    },

    methods: {
        loadFiltersAndSort() {
            try {
                const stored = localStorage.getItem(FILTERS_SORT_STORAGE_KEY);
                if (!stored) {
                    this.saveFiltersAndSort();
                    return;
                }

                const { tag, sort } = JSON.parse(stored);

                if (tag && this.tabs.some(t => t.id === tag)) {
                    this.activeTab = tag;
                }
                if (sort && this.sortOptions.some(opt => opt.value === sort)) {
                    this.currentSortValue = sort;
                }

            } catch (e) {
                console.error("Не удалось загрузить фильтры/сортировку из localStorage:", e);
            }
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

        setActiveTab(id) {
            this.activeTab = id;
        },

        selectSortOption(option) {
            this.currentSortValue = option.value;
        },

        toggleFavorites() {
            this.isFavoritesOpen = !this.isFavoritesOpen;
        },

        toggleOrder() {
            this.isOrderOpen = !this.isOrderOpen;
        },

        closeFavorites() {
            this.isFavoritesOpen = false;
        },

        closeOrder() {
            this.isOrderOpen = false;
        },

        updateBodyScroll() {
            const body = document.body;
            if (this.isFavoritesOpen || this.isOrderOpen) {
                body.classList.add('no-scroll');
            } else {
                body.classList.remove('no-scroll');
            }
        }
    },

    mounted() {
        this.loadFiltersAndSort();
        this.updateBodyScroll();
    },

    beforeUnmount() {
        document.body.classList.remove('no-scroll');
    }
}
</script>
<style>
body.no-scroll {
    overflow: hidden !important;
}
</style>
