<script>
import axios from 'axios';

export default {
    name: "ProductCreateModal",

    props: {
        isVisible: {
            type: Boolean,
            required: true
        }
    },

    data() {
        return {
            form: {
                name: '',
                description: '',
                old_price: 0,
                current_price: 0,
                is_hit: false,
                category_id: 1,
                images: [],
                attributes: [],
                available_skus: []
            },
            isLoading: false,
            error: null,
            successMessage: null,
        };
    },

    watch: {
        'form.attributes': {
            handler: 'generateSkus',
            deep: true
        },
        isVisible(newValue) {
            if (newValue) {
                this.error = null;
                this.successMessage = null;
                this.initializeFormDefaults();
            }
        }
    },

    methods: {
        initializeFormDefaults() {
            // Сброс
            this.form.name = ''; this.form.description = ''; this.form.old_price = 0;
            this.form.current_price = 0; this.form.is_hit = false; this.form.category_id = 1;
            this.form.images = []; this.form.attributes = []; this.form.available_skus = [];

            // Инициализация с жестким назначением ключей для соответствия бэкенду
            this.addAttribute('size', 'Размер', ['Маленький', 'Средний', 'Большой']);
            this.addAttribute('color', 'Цвет', ['Синий', 'Зеленый', 'Красный']);

            this.generateSkus();
        },

        addAttribute() {
            this.form.attributes.push({ name: '', sku_key: '', options: [''] });
        },

        removeAttribute(index) {
            this.form.attributes.splice(index, 1);
            this.generateSkus();
        },

        addOption(attributeIndex) {
            this.form.attributes[attributeIndex].options.push('');
        },

        removeOption(attributeIndex, optionIndex) {
            this.form.attributes[attributeIndex].options.splice(optionIndex, 1);
            this.generateSkus();
        },

        generateSkus() {
            this.form.available_skus = [];

            const sizeOptions = this.form.attributes
                .find(a => a.sku_key === 'size')
                ?.options.filter(o => o) || [];

            const colorOptions = this.form.attributes
                .find(a => a.sku_key === 'color')
                ?.options.filter(o => o) || [];

            if (sizeOptions.length > 0 && colorOptions.length > 0) {
                let counter = 100;

                sizeOptions.forEach(size => {
                    colorOptions.forEach(color => {
                        const sizeKey = size.charAt(0).toUpperCase();
                        const colorKey = color.substring(0, 3).toUpperCase();

                        this.form.available_skus.push({
                            sku: `ID${counter++}-${sizeKey}-${colorKey}`,
                            size: size,
                            color: color,
                            price: 0,
                            stock_qty: 0
                        });
                    });
                });
            }
        },

        async submitProduct() {
            this.isLoading = true;
            this.error = null;
            this.successMessage = null;

            const payload = {
                ...this.form,
                old_price: parseInt(this.form.old_price) || 0,
                current_price: parseInt(this.form.current_price) || 0,
            };

            try {
                const response = await axios.post(`/api/products`, payload);

                if (response.data.success) {
                    this.successMessage = 'Товар успешно создан! ' + response.data.message;
                    this.$emit('product-created');
                }

            } catch (err) {
                console.error("Ошибка создания товара:", err);
                if (err.response && err.response.data && err.response.data.message) {
                    this.error = err.response.data.message;
                } else {
                    this.error = 'Произошла неизвестная ошибка на сервере.';
                }
            } finally {
                this.isLoading = false;
            }
        },

        closeModal() {
            this.$emit('close');
        }
    }
}
</script>

<template>
    <!-- Модальное окно -->
    <div v-if="isVisible" class="modal-backdrop" @click.self="closeModal">
        <div class="modal-content">

            <button class="close-btn" @click="closeModal">&times;</button>

            <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
            <div v-if="error" class="alert alert-danger">{{ error }}</div>

            <form @submit.prevent="submitProduct" v-if="!successMessage">

                <fieldset class="mb-3">
                    <legend>Основная Информация</legend>
                    <div class="mb-2"><label class="form-label">Название:</label><input type="text" v-model="form.name"
                                                                                        required class="form-control">
                    </div>
                    <div class="mb-2"><label class="form-label">Описание:</label><textarea v-model="form.description"
                                                                                           class="form-control"></textarea>
                    </div>
                    <div class="mb-2"><label class="form-label">Старая Цена:</label><input type="number"
                                                                                           v-model.number="form.old_price"
                                                                                           class="form-control"></div>
                    <div class="mb-2"><label class="form-label">Текущая Цена:</label><input type="number"
                                                                                            v-model.number="form.current_price"
                                                                                            required
                                                                                            class="form-control"></div>
                    <div class="form-check mb-2"><input type="checkbox" v-model="form.is_hit"
                                                        class="form-check-input"><label class="form-check-label">Хит
                        продаж</label></div>
                    <div class="mb-2"><label class="form-label">Category ID:</label><input type="number"
                                                                                           v-model.number="form.category_id"
                                                                                           required
                                                                                           class="form-control"></div>
                </fieldset>

                <fieldset class="mb-3">
                    <legend class="d-flex justify-content-between">
                        Атрибуты
                        <button type="button" @click="addAttribute" class="btn btn-sm btn-outline-primary">Добавить
                            Атрибут
                        </button>
                    </legend>

                    <div v-for="(attr, attrIndex) in form.attributes" :key="attrIndex"
                         class="attribute-block border p-3 mb-3">
                        <button type="button" @click="removeAttribute(attrIndex)" class="btn btn-sm btn-danger mb-2">
                            Удалить Атрибут
                        </button>

                        <div class="mb-2"><label class="form-label">Имя:</label><input type="text" v-model="attr.name"
                                                                                       required class="form-control">
                        </div>
                        <div class="mb-2"><label class="form-label">Ключ (size/color):</label><input type="text"
                                                                                                     v-model="attr.sku_key"
                                                                                                     required
                                                                                                     class="form-control">
                        </div>

                        <h5>Опции:</h5>
                        <div v-for="(option, optIndex) in attr.options" :key="optIndex" class="option-item d-flex mb-2">
                            <input type="text" v-model="attr.options[optIndex]" required class="form-control me-2"
                                   placeholder="Значение опции">
                            <button type="button" @click="removeOption(attrIndex, optIndex)"
                                    class="btn btn-sm btn-outline-secondary">-
                            </button>
                        </div>
                        <button type="button" @click="addOption(attrIndex)" class="btn btn-sm btn-outline-success">
                            Добавить Опцию
                        </button>
                    </div>
                </fieldset>

                <fieldset v-if="form.available_skus.length > 0">
                    <legend>Варианты (SKU)</legend>

                    <table>
                        <thead>
                        <tr>
                            <th>SKU</th>
                            <th>Цена</th>
                            <th>Сток</th>
                            <th v-for="(value, key) in form.available_skus[0]"
                                v-if="key !== 'sku' && key !== 'price' && key !== 'stock_qty'">
                                {{ key.charAt(0).toUpperCase() + key.slice(1) }}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(sku, skuIndex) in form.available_skus" :key="sku.sku">
                            <td>{{ sku.sku }}</td>
                            <td><input type="number" v-model.number="sku.price" required
                                       class="form-control form-control-sm"></td>
                            <td><input type="number" v-model.number="sku.stock_qty" required
                                       class="form-control form-control-sm"></td>
                            <td v-for="(value, key) in sku"
                                v-if="key !== 'sku' && key !== 'price' && key !== 'stock_qty'">
                                {{ value }}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </fieldset>
                <div v-else class="alert alert-warning">
                    Настройте атрибуты и опции, чтобы сгенерировать SKU.
                </div>

                <button type="submit" class="btn btn-primary mt-3"
                        :disabled="isLoading || !form.name || !form.current_price || form.available_skus.length === 0">
                    {{ isLoading ? 'Сохранение...' : 'Создать Товар' }}
                </button>

            </form>
        </div>
    </div>
</template>

<style scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    padding: 25px;
    border-radius: 8px;
    width: 90%;
    max-width: 900px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
}

.close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.5em;
    cursor: pointer;
}

.attribute-block {
    border: 1px dashed #ccc;
    padding: 15px;
    margin-top: 15px;
    border-radius: 4px;
}

.form-check {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem !important;
}

.form-check-input {
    margin-top: 0.25rem;
}
</style>
