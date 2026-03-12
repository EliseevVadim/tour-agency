<template>
    <div class="admin-content-container container">
        <div class="d-flex justify-content-between">
            <h4>Управление Товарами</h4>

            <button @click="showCreateModal" class="create-btn">
                + Добавить Новый Товар
            </button>
        </div>

        <div v-if="isLoading">Загрузка...</div>

        <div v-else>
            <p v-if="products.length === 0">Нет товаров в базе. Создайте первый!</p>
            <template v-else>
                <div v-if="tabs.length > 0" class="d-flex align-items-center gap-2 flex-wrap mb-3">
                    <button :disabled="activeTab === tab.id"
                            v-for="tab in tabs"
                            :key="tab.id"
                            :class="['btn tab-button', { active: activeTab === tab.id }]"
                            @click="setActiveTab(tab.id)">
                        {{ tab.name }}
                    </button>
                </div>
                <div class="row g-3">
                    <div class="col-lg-4" v-for="product in products"
                         :key="product.id">
                        <product-card :is-admin="true" :product="product" :key="product.id"
                            @product:edit="showEditModal" @product:delete="deleteProduct"/>
                    </div>
                </div>
                <div v-if="lastPage > 1" class="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-2">
                    <div class="text-muted">
                        Страница <b>{{ page }}</b> из <b>{{ lastPage }}</b>
                        <span v-if="searchTotal"> • Всего: <b>{{ searchTotal }}</b></span>
                    </div>

                    <div class="btn-group" role="group" aria-label="Pagination">
                        <button class="btn btn-outline-secondary" :disabled="page <= 1 || isLoading"
                                @click="goToPage(page - 1)">
                            ← Назад
                        </button>

                        <button v-for="p in paginationPages" :key="p" class="btn"
                            :class="p === page ? 'btn-secondary' : 'btn-outline-secondary'"
                            :disabled="isLoading" @click="goToPage(p)">
                            {{ p }}
                        </button>

                        <button class="btn btn-outline-secondary" :disabled="page >= lastPage || isLoading"
                                @click="goToPage(page + 1)">
                            Вперёд →
                        </button>
                    </div>
                </div>
            </template>
        </div>

        <ProductCreateModal :isVisible="isModalVisible" :mode="modalMode"
                            :productId="editingProductId"
                            @close="closeModal"
                            @saved="handleProductSaved"/>

    </div>
</template>

<script>
import axios from 'axios';
import ProductCreateModal from "./modules/ProductCreateModal.vue";
import ProductCard from "../client/modules/shop/components/ProductCard.vue";
import eventBus from "../event-bus";

export default {
    name: "AdminProductsContent",
    components: {ProductCard, ProductCreateModal},
    data() {
        return {
            isLoading: false,
            isModalVisible: false,
            modalMode: 'create',
            editingProductId: null,
            products: [],
            tabs: [],
            activeTab: null,
            slugCategory: null,

            page: 1,
            perPage: 12,
            lastPage: 1,
            searchTotal: 0,
        };
    },
    computed: {
        paginationPages() {
            const max = 7;
            const half = Math.floor(max / 2);

            let start = Math.max(1, this.page - half);
            let end = Math.min(this.lastPage, start + max - 1);
            start = Math.max(1, end - max + 1);

            const pages = [];
            for (let p = start; p <= end; p++) pages.push(p);
            return pages;
        },
    },
    mounted() {
        this.fetchProducts();
    },
    methods: {
        async fetchProducts() {
            if (this.tabs.length === 0) await this.fetchCategories();
            this.isLoading = true;

            try {
                const params = new URLSearchParams();

                if (this.slugCategory) params.set('category', this.slugCategory);
                params.set('page', String(this.page));
                params.set('per_page', String(this.perPage));

                const url = `/api/products?${params.toString()}`;

                const response = await fetch(url);
                const data = await response.json();

                this.products = data.data || [];
                const meta = data.meta || {};
                this.lastPage = meta.last_page || data.last_page || 1;
                this.searchTotal = meta.total || data.total || 0;

            } catch (err) {
                console.error("Ошибка при получении продуктов:", err);
            } finally {
                this.isLoading = false;
            }
        },

        async fetchCategories() {
            const {data} = await axios.get('/api/categories');
            this.tabs = data.data || data;

            if (this.tabs.length) {
                this.activeTab = this.tabs[0].id;
                this.slugCategory = this.tabs[0].slug;
            }
        },

        closeModal() {
            this.isModalVisible = false;
        },

        handleProductSaved() {
            this.page = 1;
            this.isModalVisible = false;
            this.fetchProducts();
        },

        goToPage(p) {
            const next = Math.min(Math.max(1, p), this.lastPage);
            if (next === this.page) return;

            this.page = next;
            this.fetchProducts();
        },

        setActiveTab(id) {
            this.activeTab = id;

            const tab = this.tabs.find(t => t.id === id);
            this.slugCategory = tab ? tab.slug : null;

            this.page = 1;
            this.fetchProducts();
        },

        showCreateModal() {
            this.modalMode = 'create';
            this.editingProductId = null;
            this.isModalVisible = true;
        },

        showEditModal(productId) {
            this.modalMode = 'edit';
            this.editingProductId = productId;
            this.isModalVisible = true;
        },

        async deleteProduct(productId) {
            if (!confirm('Удалить этот товар?')) return;

            try {
                await axios.delete(`/api/products/${productId}`);
                this.products = this.products.filter(p => p.id !== productId);
            } catch (e) {
                alert('Ошибка при удалении товара');
                console.error(e);
            }

        }
    }
}
</script>

<style scoped>
.admin-content-container {
    padding: 20px;
}

.create-btn {
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 20px;
}

.alert {
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 4px;
}

.alert.error {
    background-color: #f8d7da;
    color: #721c24;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    padding: 10px;
    border-bottom: 1px solid #eee;
}

.tab-button.active {
    background: black;
}

.btn:disabled {
    color: lightgray !important;
}
</style>

<style>
.btn-action {
    width: 50px;
    border: 3px solid white;
    padding: 6px;
}
</style>
