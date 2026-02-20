<template>
    <div class="admin-content-container container">
        <div class="d-flex justify-content-between">
            <h4>Управление Товарами</h4>

            <button @click="showModal" class="create-btn">
                + Добавить Новый Товар
            </button>
        </div>

        <div v-if="isLoading">Загрузка...</div>

        <div v-else>
            <p v-if="products.length === 0">Нет товаров в базе. Создайте первый!</p>
            <ul v-else>
                <li v-for="product in products" :key="product.id">
                    <strong>{{ product.name }}</strong> (ID: {{ product.id }}) - {{ product.category_slug }}
                </li>
            </ul>
        </div>

        <ProductCreateModal :isVisible="isModalVisible" @close="closeModal" @product-created="handleProductCreated"/>

    </div>
</template>

<script>
import axios from 'axios';
import ProductCreateModal from "./modules/ProductCreateModal.vue";

export default {
    name: "AdminProductsContent",
    components: {ProductCreateModal},
    data() {
        return {
            products: [],
            isLoading: false,
            isModalVisible: false,
        };
    },
    mounted() {
        this.fetchProducts();
    },
    methods: {
        async fetchProducts() {
            this.isLoading = true;

            try {
                const response = await axios.get(`/api/products`);

                if (response.data.success) {
                    this.products = response.data.data;
                }

            } catch (err) {
                console.error("Ошибка при получении продуктов:", err);
            } finally {
                this.isLoading = false;
            }
        },

        showModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },

        handleProductCreated() {
            this.fetchProducts();
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
</style>
