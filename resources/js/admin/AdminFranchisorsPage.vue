<template>
    <div class="container pb-5">
        <div class="admin-franchisors-create-card">
            <div class="admin-franchisors-create-head">
                <div>
                    <h3 class="admin-franchisors-create-title">
                        {{ form.id ? currentConfig.editText : currentConfig.createText }}
                    </h3>
                </div>
            </div>

            <form class="admin-franchisors-form" @submit.prevent="submitForm">
                <div class="admin-franchisors-grid">
                    <div class="admin-franchisors-field">
                        <label class="admin-franchisors-label">
                            {{ isHotelsTab ? 'Название отеля' : 'Имя' }}
                        </label>

                        <input v-model="form.name" type="text" class="admin-input"
                               :placeholder="isHotelsTab ? 'Grand Hotel' : 'Иван Иванов'" required>
                    </div>

                    <div class="admin-franchisors-field" v-if="!isHotelsTab">
                        <label class="admin-franchisors-label">Город</label>
                        <input v-model="form.city" type="text" class="admin-input" placeholder="Москва">
                    </div>

                    <div class="admin-franchisors-field" v-else>
                        <label class="admin-franchisors-label">Страна</label>
                        <input v-model="form.country" type="text" class="admin-input" placeholder="Турция">
                    </div>

                    <div class="admin-franchisors-field" v-if="!isHotelsTab">
                        <label class="admin-franchisors-label">Телефон</label>
                        <input type="tel" v-mask="'+7 (###) ###-##-##'" autocomplete="tel" v-model="form.phone"
                            class="admin-input" placeholder="+7 000 000 0000">
                    </div>

                    <div class="admin-franchisors-field" v-else>
                        <label class="admin-franchisors-label">Звёздность</label>
                        <input v-model.number="form.stars" type="number" min="1" max="5" class="admin-input"
                            placeholder="5">
                    </div>

                    <div class="admin-franchisors-field">
                        <label class="admin-franchisors-label">Ссылка</label>
                        <input v-model="form.link" type="text" class="admin-input" placeholder="/franchisors/moscow">
                    </div>

                    <div class="admin-franchisors-field">
                        <label class="admin-franchisors-label">Активность</label>

                        <button type="button" class="franchisor-toggle-btn" :class="{ active: form.is_active }"
                                @click="form.is_active = !form.is_active">
                            <span class="franchisor-toggle-circle"></span>
                            <span class="franchisor-toggle-label">
                                    {{ form.is_active ? 'Активен' : 'Отключён' }}
                                </span>
                        </button>
                    </div>

                    <div class="admin-franchisors-field admin-franchisors-field-wide">
                        <label class="admin-franchisors-label">Описание</label>
                        <textarea v-model="form.description" class="admin-textarea" rows="4"
                                  placeholder="Описание для карточки"></textarea>
                    </div>

                    <div class="admin-franchisors-field admin-franchisors-field-wide">
                        <label class="admin-franchisors-label">Фото</label>

                        <input ref="imageInput" type="file" class="admin-input admin-file-input"
                               accept="image/jpeg,image/png,image/webp" @change="onImageChange">

                        <div v-if="form.imagePreview" class="admin-franchisors-preview">
                            <img :src="form.imagePreview" alt="preview">
                        </div>
                    </div>

                    <div class="admin-franchisors-actions admin-franchisors-field-wide">
                        <button type="submit" class="admin-btn admin-btn-primary" :disabled="saving">
                            {{ saving ? 'Сохранение...' : (form.id ? 'Сохранить изменения' : 'Добавить франчайзера') }}
                        </button>

                        <button v-if="form.id" type="button" class="admin-btn admin-btn-secondary" @click="resetForm">
                            Отмена
                        </button>
                    </div>
                </div>
            </form>
        </div>

        <div class="admin-franchisors-tabs">
            <button type="button" class="admin-franchisors-tab" :class="{ active: activeTab === 'franchisors' }"
                    @click="changeTab('franchisors')">
                Франчайзеры
            </button>

            <button type="button" class="admin-franchisors-tab" :class="{ active: activeTab === 'hotels' }"
                    @click="changeTab('hotels')">
                Отели
            </button>
        </div>

        <div class="admin-franchisors-filters">
            <input v-model="filters.search" type="text" class="admin-input"
                   :placeholder="currentConfig.searchPlaceholder" @input="onSearchInput">

            <select v-model="filters.status" class="admin-select" @change="onFilterChange">
                <option value="">Все статусы</option>
                <option value="active">Активные</option>
                <option value="inactive">Отключённые</option>
            </select>
        </div>

        <div class="admin-franchisors-summary" v-if="!loading && currentItems.length">
            <div class="admin-summary-card">
                <div class="admin-summary-label">Всего на странице</div>
                <div class="admin-summary-value">{{ currentItems.length }}</div>
            </div>

            <div class="admin-summary-card">
                <div class="admin-summary-label">Активные</div>
                <div class="admin-summary-value">{{ activeCount }}</div>
            </div>

            <div class="admin-summary-card">
                <div class="admin-summary-label">Отключённые</div>
                <div class="admin-summary-value">{{ inactiveCount }}</div>
            </div>
        </div>

        <div class="admin-orders-card">
            <div v-if="loading" class="admin-orders-empty">
                Загрузка {{ currentConfig.loadingText }}...
            </div>

            <div v-else-if="!currentItems.length" class="admin-orders-empty">
                {{ currentConfig.emptyText }}
            </div>

            <div v-else class="admin-orders-table-wrapper p-4">
                <table class="admin-orders-table table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Фото</th>
                        <th>{{ isHotelsTab ? 'Отель' : 'Франчайзер' }}</th>
                        <th>{{ isHotelsTab ? 'Страна' : 'Город' }}</th>
                        <th v-if="isHotelsTab">Звёздность</th>
                        <th v-else>Телефон</th>
                        <th>Статус</th>
                        <th>Действия</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr
                        v-for="item in currentItems"
                        :key="`${activeTab}-${item.id}`"
                        :class="{ 'franchisor-row-inactive': !item.is_active }"
                    >
                        <td>{{ item.id }}</td>

                        <td>
                            <div class="franchisor-table-image">
                                <img
                                    v-if="item.image_url"
                                    :src="item.image_url"
                                    :alt="item.name"
                                >

                                <span v-else>—</span>
                            </div>
                        </td>

                        <td>
                            <div class="franchisor-name">{{ item.name }}</div>
                            <div class="franchisor-description">
                                {{ item.description || 'Описание не заполнено' }}
                            </div>
                        </td>

                        <td>
                            {{ isHotelsTab ? (item.country || '—') : (item.city || '—') }}
                        </td>

                        <td v-if="isHotelsTab">
                    <span class="hotel-stars-badge">
                        ★ {{ item.stars || 0 }}
                    </span>
                        </td>

                        <td v-else>
                            {{ item.phone || '—' }}
                        </td>

                        <td>
                    <span
                        class="franchisor-status-badge"
                        :class="item.is_active ? 'is-success' : 'is-muted'"
                    >
                        {{ item.is_active ? 'Активен' : 'Отключён' }}
                    </span>
                        </td>

                        <td>
                            <div class="admin-franchisors-table-actions">
                                <button
                                    type="button"
                                    class="admin-btn admin-btn-secondary admin-btn-sm"
                                    @click="editItem(item)"
                                >
                                    Изменить
                                </button>

                                <button
                                    type="button"
                                    class="admin-btn admin-btn-secondary admin-btn-sm"
                                    :disabled="togglingId === item.id"
                                    @click="toggleItem(item)"
                                >
                                    {{ item.is_active ? 'Отключить' : 'Включить' }}
                                </button>

                                <button
                                    type="button"
                                    class="admin-btn admin-btn-danger admin-btn-sm"
                                    :disabled="deletingId === item.id"
                                    @click="deleteItem(item)"
                                >
                                    Удалить
                                </button>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div v-if="pagination.last_page > 1" class="admin-pagination">
            <button class="admin-btn admin-btn-secondary"
                    :disabled="pagination.current_page <= 1 || loading"
                    @click="changePage(pagination.current_page - 1)">
                Назад
            </button>

            <span class="admin-pagination-info">
                Страница {{ pagination.current_page }} из {{ pagination.last_page }}
            </span>

            <button class="admin-btn admin-btn-secondary"
                    :disabled="pagination.current_page >= pagination.last_page || loading"
                    @click="changePage(pagination.current_page + 1)">
                Вперёд
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AdminFranchisorsPage',

    data() {
        return {
            activeTab: 'franchisors',

            loading: false,
            saving: false,
            togglingId: null,
            deletingId: null,

            itemsByTab: {
                franchisors: [],
                hotels: [],
            },

            loadedTabs: {
                franchisors: false,
                hotels: false,
            },

            form: {
                id: null,
                name: '',
                city: '',
                country: '',
                phone: '',
                stars: 5,
                description: '',
                link: '',
                is_active: true,
                image: null,
                imagePreview: null,
            },

            filtersByTab: {
                franchisors: {
                    search: '',
                    status: '',
                    page: 1,
                },
                hotels: {
                    search: '',
                    status: '',
                    page: 1,
                },
            },

            paginationByTab: {
                franchisors: {
                    current_page: 1,
                    last_page: 1,
                    per_page: 20,
                    total: 0,
                },
                hotels: {
                    current_page: 1,
                    last_page: 1,
                    per_page: 20,
                    total: 0,
                },
            },

            debounceTimer: null,
        };
    },

    computed: {
        isHotelsTab() {
            return this.activeTab === 'hotels';
        },

        currentConfig() {
            if (this.isHotelsTab) {
                return {
                    apiUrl: '/admin/api/hotels',
                    label: 'Отели',
                    createText: 'Добавить отель',
                    editText: 'Редактировать отель',
                    loadingText: 'отелей',
                    emptyText: 'Отели не найдены',
                    deleteText: 'отель',
                    searchPlaceholder: 'Поиск по названию, стране или звёздности',
                };
            }

            return {
                apiUrl: '/admin/api/franchisors',
                label: 'Франчайзеры',
                createText: 'Добавить франчайзера',
                editText: 'Редактировать франчайзера',
                loadingText: 'франчайзеров',
                emptyText: 'Франчайзеры не найдены',
                deleteText: 'франчайзера',
                searchPlaceholder: 'Поиск по имени, городу или телефону',
            };
        },

        currentItems() {
            return this.itemsByTab[this.activeTab] || [];
        },

        filters() {
            return this.filtersByTab[this.activeTab];
        },

        pagination() {
            return this.paginationByTab[this.activeTab];
        },

        activeCount() {
            return this.currentItems.filter(item => item.is_active).length;
        },

        inactiveCount() {
            return this.currentItems.filter(item => !item.is_active).length;
        },
    },

    created() {
        this.fetchItems();
    },

    beforeDestroy() {
        clearTimeout(this.debounceTimer);
    },

    methods: {
        changeTab(tab) {
            if (this.activeTab === tab) {
                return;
            }

            this.activeTab = tab;
            this.resetForm();

            if (!this.loadedTabs[tab]) {
                this.fetchItems();
            }
        },

        async fetchItems() {
            this.loading = true;

            try {
                const response = await axios.get(this.currentConfig.apiUrl, {
                    params: this.filters,
                });

                const payload = response.data || {};
                const data = payload.data || {};

                this.$set(
                    this.itemsByTab,
                    this.activeTab,
                    Array.isArray(data.data) ? data.data : []
                );

                this.$set(this.paginationByTab, this.activeTab, {
                    current_page: data.current_page || 1,
                    last_page: data.last_page || 1,
                    per_page: data.per_page || 20,
                    total: data.total || 0,
                });

                this.$set(this.loadedTabs, this.activeTab, true);
            } catch (error) {
                console.error('Ошибка загрузки данных', error);
                this.$set(this.itemsByTab, this.activeTab, []);
            } finally {
                this.loading = false;
            }
        },

        onSearchInput() {
            clearTimeout(this.debounceTimer);

            this.debounceTimer = setTimeout(() => {
                this.filters.page = 1;
                this.fetchItems();
            }, 350);
        },

        onFilterChange() {
            this.filters.page = 1;
            this.fetchItems();
        },

        changePage(page) {
            if (page < 1 || page > this.pagination.last_page) {
                return;
            }

            this.filters.page = page;
            this.fetchItems();
        },

        onImageChange(event) {
            const file = event.target.files[0] || null;

            this.form.image = file;

            if (!file) {
                return;
            }

            if (this.form.imagePreview && this.form.imagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(this.form.imagePreview);
            }

            this.form.imagePreview = URL.createObjectURL(file);
        },

        async submitForm() {
            this.saving = true;

            try {
                const formData = new FormData();

                formData.append('name', this.form.name || '');
                formData.append('description', this.form.description || '');
                formData.append('link', this.form.link || '');
                formData.append('is_active', this.form.is_active ? 1 : 0);

                if (this.isHotelsTab) {
                    formData.append('country', this.form.country || '');
                    formData.append('stars', this.form.stars || 0);
                } else {
                    formData.append('city', this.form.city || '');
                    formData.append('phone', this.form.phone || '');
                }

                if (this.form.image) {
                    formData.append('image', this.form.image);
                }

                if (this.form.id) {
                    await axios.post(`${this.currentConfig.apiUrl}/${this.form.id}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                } else {
                    await axios.post(this.currentConfig.apiUrl, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                }

                this.resetForm();
                await this.fetchItems();
            } catch (error) {
                console.error('Ошибка сохранения', error);

                const message = error?.response?.data?.message || 'Не удалось сохранить запись';
                alert(message);
            } finally {
                this.saving = false;
            }
        },

        editItem(item) {
            if (this.form.imagePreview && this.form.imagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(this.form.imagePreview);
            }

            this.form = {
                id: item.id,
                name: item.name || '',
                city: item.city || '',
                country: item.country || '',
                phone: item.phone || '',
                stars: Number(item.stars || 5),
                description: item.description || '',
                link: item.link || '',
                is_active: Boolean(item.is_active),
                image: null,
                imagePreview: item.image_url || null,
            };

            this.$nextTick(() => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            });
        },

        resetForm() {
            if (this.form.imagePreview && this.form.imagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(this.form.imagePreview);
            }

            this.form = {
                id: null,
                name: '',
                city: '',
                country: '',
                phone: '',
                stars: 5,
                description: '',
                link: '',
                is_active: true,
                image: null,
                imagePreview: null,
            };

            if (this.$refs.imageInput) {
                this.$refs.imageInput.value = '';
            }
        },

        async toggleItem(item) {
            this.togglingId = item.id;

            try {
                const response = await axios.patch(`${this.currentConfig.apiUrl}/${item.id}/toggle`);
                const updated = response.data.data;

                const index = this.currentItems.findIndex(currentItem => currentItem.id === item.id);

                if (index !== -1) {
                    this.$set(this.itemsByTab[this.activeTab], index, updated);
                }
            } catch (error) {
                console.error('Ошибка изменения активности', error);
            } finally {
                this.togglingId = null;
            }
        },

        async deleteItem(item) {
            const confirmed = confirm(`Удалить ${this.currentConfig.deleteText} "${item.name}"?`);

            if (!confirmed) {
                return;
            }

            this.deletingId = item.id;

            try {
                await axios.delete(`${this.currentConfig.apiUrl}/${item.id}`);

                this.$set(
                    this.itemsByTab,
                    this.activeTab,
                    this.currentItems.filter(currentItem => currentItem.id !== item.id)
                );

                if (!this.currentItems.length && this.pagination.current_page > 1) {
                    this.changePage(this.pagination.current_page - 1);
                }
            } catch (error) {
                console.error('Ошибка удаления', error);
            } finally {
                this.deletingId = null;
            }
        },
    },
};
</script>

<style scoped>
.admin-franchisors-create-card {
    border: 1px solid #e5edf5;
    border-radius: 16px;
    box-shadow: 0 6px 24px rgba(25, 42, 70, 0.05);
    padding: 24px;
    margin-bottom: 20px;
}

.admin-franchisors-create-head {
    margin-bottom: 18px;
}

.admin-franchisors-create-title {
    margin: 0 0 6px;
    font-size: 22px;
    font-weight: 700;
    color: #243447;
}

.admin-franchisors-create-subtitle {
    margin: 0;
    font-size: 14px;
    color: #6c8198;
}

.admin-franchisors-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(220px, 1fr));
    gap: 16px;
    align-items: start;
}

.admin-franchisors-field {
    min-width: 0;
}

.admin-franchisors-field-wide {
    grid-column: 1 / -1;
}

.admin-franchisors-label {
    display: block;
    margin-bottom: 8px;
    color: #516579;
    font-size: 14px;
    font-weight: 600;
}

.admin-input,
.admin-select,
.admin-textarea {
    width: 100%;
    padding: 0 14px;
    border: 1px solid #d7e1ec;
    border-radius: 10px;
    background: #fff;
    font-size: 14px;
}

.admin-input,
.admin-select {
    height: 42px;
}

.admin-textarea {
    min-height: 96px;
    padding-top: 12px;
    resize: vertical;
}

.admin-input:focus,
.admin-select:focus,
.admin-textarea:focus {
    outline: none;
    border-color: #8fb3d9;
    box-shadow: 0 0 0 4px rgba(80, 130, 190, 0.12);
}

.admin-file-input {
    padding-top: 8px;
}

.admin-franchisors-preview {
    width: 160px;
    height: 120px;
    margin-top: 12px;
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid #e5edf5;
}

.admin-franchisors-preview img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.admin-franchisors-actions {
    display: flex;
    gap: 12px;
}

.admin-franchisors-filters {
    display: grid;
    grid-template-columns: minmax(260px, 1fr) 220px;
    gap: 12px;
    margin-bottom: 20px;
}

.admin-franchisors-summary {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
    margin-bottom: 20px;
}

.admin-summary-card {
    background: #fff;
    border: 1px solid #e5edf5;
    border-radius: 16px;
    padding: 16px 18px;
    box-shadow: 0 6px 24px rgba(25, 42, 70, 0.05);
}

.admin-summary-label {
    color: #6c8198;
    font-size: 13px;
    margin-bottom: 6px;
}

.admin-summary-value {
    color: #243447;
    font-size: 24px;
    font-weight: 700;
}

.admin-orders-card {
    background: #fff;
    border: 1px solid #e5edf5;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 6px 24px rgba(25, 42, 70, 0.05);
}

.admin-orders-table th,
.admin-orders-table td {
    border-bottom: 1px solid #edf2f7;
    font-size: 14px;
    vertical-align: middle;
}

.admin-orders-table th {
    background: #f8fbff;
    color: #58708a;
}

.admin-orders-empty {
    padding: 32px;
    text-align: center;
    color: #6c8198;
}

.franchisor-table-image {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 72px;
    height: 58px;
    border-radius: 12px;
    overflow: hidden;
    background: #eef2f6;
    color: #90a0b1;
    font-size: 13px;
}

.franchisor-table-image img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.franchisor-name {
    color: #243447;
    font-weight: 700;
}

.franchisor-description {
    max-width: 420px;
    margin-top: 4px;
    color: #90a0b1;
    font-size: 12px;
    line-height: 1.3;
}

.franchisor-status-badge {
    display: inline-flex;
    align-items: center;
    min-height: 28px;
    padding: 0 10px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
}

.franchisor-status-badge.is-success {
    background: #e9f8ef;
    color: #1f8b4c;
}

.franchisor-status-badge.is-muted {
    background: #eef2f6;
    color: #617588;
}

.franchisor-row-inactive td {
    background: #f8fafc !important;
    color: #9aa7b6 !important;
}

.admin-franchisors-table-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.admin-btn {
    height: 40px;
    padding: 0 16px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    transition: 0.2s ease;
}

.admin-btn-sm {
    height: 34px;
    padding: 0 12px;
    font-size: 13px;
}

.admin-btn-primary {
    min-width: 220px;
    background: linear-gradient(135deg, #27425d 0%, #355c82 100%);
    color: #fff;
    box-shadow: 0 10px 24px rgba(39, 66, 93, 0.18);
}

.admin-btn-primary:hover:not(:disabled) {
    transform: translateY(-1px);
}

.admin-btn-secondary {
    background: #eaf1f8;
    color: #27425d;
}

.admin-btn-secondary:hover:not(:disabled) {
    background: #dce8f4;
}

.admin-btn-danger {
    background: #fdecec;
    color: #c44949;
}

.admin-btn-danger:hover:not(:disabled) {
    background: #f8d7da;
}

.admin-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.franchisor-toggle-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    min-height: 42px;
    padding: 0 14px;
    border: 1px solid #d7e1ec;
    border-radius: 999px;
    background: #f2f5f8;
    color: #617588;
    cursor: pointer;
    transition: 0.2s ease;
}

.franchisor-toggle-btn.active {
    background: #e9f8ef;
    border-color: #cfe8d8;
    color: #1f8b4c;
}

.franchisor-toggle-circle {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #98a8b8;
    flex-shrink: 0;
}

.franchisor-toggle-btn.active .franchisor-toggle-circle {
    background: #1f8b4c;
}

.franchisor-toggle-label {
    font-size: 13px;
    font-weight: 600;
}

.admin-pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-top: 20px;
}

.admin-pagination-info {
    color: #516579;
    font-size: 14px;
}

.admin-franchisors-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
}

.admin-franchisors-tab {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 42px;
    padding: 0 18px;
    border-radius: 10px;
    border: 1px solid #d7e1ec;
    background: #fff;
    color: #516579;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.admin-franchisors-tab.active {
    background: #27425d;
    border-color: #27425d;
    color: #fff;
}

.hotel-stars-badge {
    display: inline-flex;
    align-items: center;
    min-height: 28px;
    padding: 0 10px;
    border-radius: 999px;
    background: #fff3df;
    color: #d18400;
    font-size: 12px;
    font-weight: 700;
}

@media (max-width: 991px) {
    .admin-franchisors-grid {
        grid-template-columns: 1fr 1fr;
    }

    .admin-franchisors-filters {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 767px) {
    .admin-franchisors-grid,
    .admin-franchisors-summary {
        grid-template-columns: 1fr;
    }

    .admin-franchisors-actions {
        flex-direction: column;
    }

    .admin-btn-primary {
        width: 100%;
    }
}
</style>
