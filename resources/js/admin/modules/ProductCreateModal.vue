<script>
import axios from 'axios';

const SKU_KEY_TEMPLATES = {
    'размер': 'size',
    'размеры': 'size',
    'цвет': 'color',
    'материал': 'material',
    'бренд': 'brand',
    'артикул': 'article',
    'модель': 'model',
};

const slugifyLatin = (str) =>
    String(str || '')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_]/g, '');

const translitRuToEn = (str) => {
    const map = {
        а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z', и: 'i', й: 'y',
        к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f',
        х: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya'
    };

    return String(str || '')
        .trim()
        .toLowerCase()
        .split('')
        .map((ch) => map[ch] ?? ch)
        .join('');
};

const suggestSkuKeyFromName = (name) => {
    const cleaned = String(name || '').trim().toLowerCase();
    if (!cleaned) return '';
    if (SKU_KEY_TEMPLATES[cleaned]) return SKU_KEY_TEMPLATES[cleaned];

    for (const ru in SKU_KEY_TEMPLATES) {
        if (cleaned.includes(ru)) return SKU_KEY_TEMPLATES[ru];
    }

    return slugifyLatin(translitRuToEn(cleaned));
};

const normalizeAttributesForPayload = (attrs = []) =>
    attrs.map((a) => ({
        name: a.name,
        sku_key: a.sku_key,
        options: (a.options || []).filter(Boolean),
    }));

export default {
    name: "ProductCreateModal",

    props: {
        isVisible: {type: Boolean, required: true},
        mode: {type: String, default: 'create'},
        productId: {type: Number, default: null},
    },

    data() {
        return {
            isLoading: false,
            error: null,
            successMessage: null,

            categories: [],
            categoriesLoading: false,

            activeAttrIndex: 0,

            form: this.getEmptyForm(),

            available_skus: [],
            deleted_sku_keys: [],

            imageError: null
        };
    },

    computed: {
        submitButtonText() {
            if (this.isLoading) return 'Сохранение...';
            return this.mode === 'create'
                ? 'Создать товар'
                : 'Сохранить товар';
        }
    },

    watch: {
        isVisible(newVal) {
            if (!newVal) return;

            this.error = null;
            this.successMessage = null;

            if (this.mode === 'create') {
                this.initializeFormDefaults();
            } else {
                this.loadProductForEdit();
            }
        },

        'form.attributes': {
            deep: true,
            handler() {
                if (this.mode !== 'create') return;
                this.generateSkus();
            }
        },

        'form.attributes.length'(len) {
            if (len === 0) this.activeAttrIndex = 0;
            else if (this.activeAttrIndex > len - 1) this.activeAttrIndex = len - 1;
        },
    },

    methods: {
        getEmptyForm() {
            return {
                name: '',
                description: '',
                old_price: 0,
                is_hit: false,
                category_id: 1,
                images: [],
                attributes: [],
                available_skus: [],
            };
        },

        initializeFormDefaults() {
            this.form = this.getEmptyForm();
            this.addAttribute('size', 'Размер', ['Маленький', 'Средний', 'Большой']);
            this.generateSkus();
        },

        async fetchCategories() {
            this.categoriesLoading = true;

            try {
                const {data} = await axios.get('/api/categories');
                this.categories = data.data || data;
            } catch (err) {
                console.error('Ошибка загрузки категорий', err);
                this.error = 'Не удалось загрузить категории';
            } finally {
                this.categoriesLoading = false;
            }
        },

        async loadProductForEdit() {
            if (!this.productId) {
                this.error = 'Не передан productId для редактирования';
                return;
            }

            this.isLoading = true;

            try {
                const {data} = await axios.get(`/api/products/${this.productId}`);
                const product = data.data || data;

                const category = this.categories.find(
                    (c) => c.slug === product.category_slug
                );

                const category_id = category ? category.id : null;
                this.form = {
                    name: product.name || '',
                    description: product.description || '',
                    old_price: product.oldPrice || 0,
                    current_price: product.currentPrice || 0,
                    is_hit: !!product.isHit,
                    category_id: category_id,

                    images: (product.images || []).map((img) => ({
                        primary: !!img.primary,
                        preview: img.image,
                        image: img.image,
                        file: null,
                        isExisting: true,
                    })),

                    attributes: (product.attributes || []).map(a => ({
                        name: a.name,
                        sku_key: a.sku_key,
                        sku_key_locked: true,
                        options: (a.options || []).map(o => (typeof o === 'string' ? o : o.value)),
                    })),

                    available_skus: (product.available_skus || []).map(s => ({
                        ...s,
                        price: Number(s.price) || 0,
                        stock_qty: Number(s.stock_qty) || 0,
                    })),
                };

                if (this.form.images.length && !this.form.images.some((i) => i.primary)) {
                    this.form.images[0].primary = true;
                }

                this.activeAttrIndex = 0;
            } catch (err) {
                console.error('Ошибка загрузки товара', err);
                this.error = 'Не удалось загрузить товар';
            } finally {
                this.isLoading = false;
            }
        },

        addAttribute(sku_key = '', name = '', options = ['']) {
            this.form.attributes.push({
                name,
                sku_key,
                options: options.length ? options : [''],
                sku_key_locked: !!sku_key,
            });

            this.activeAttrIndex = this.form.attributes.length - 1;

            if (this.mode === 'create') this.generateSkus();
        },

        removeAttribute(index) {
            this.form.attributes.splice(index, 1);

            if (this.activeAttrIndex >= this.form.attributes.length) {
                this.activeAttrIndex = Math.max(0, this.form.attributes.length - 1);
            }

            if (this.mode === 'create') this.generateSkus();
        },

        setActiveAttr(index) {
            this.activeAttrIndex = index;
        },

        addOption(attributeIndex) {
            this.form.attributes[attributeIndex].options.push('');
        },

        removeOption(attributeIndex, optionIndex) {
            this.form.attributes[attributeIndex].options.splice(optionIndex, 1);
            this.generateSkus();
        },

        onAttrNameInput(attr) {
            if (!attr.sku_key_locked) {
                attr.sku_key = suggestSkuKeyFromName(attr.name);
            }
            if (this.mode === 'create') this.generateSkus();
        },

        generateSkus() {
            const prev = Array.isArray(this.form.available_skus) ? this.form.available_skus : [];

            const validAttributes = (this.form.attributes || [])
                .filter(a => a.sku_key && (a.options || []).filter(o => (o || '').trim()).length > 0)
                .map(a => ({
                    key: a.sku_key,
                    options: (a.options || []).filter(o => (o || '').trim()),
                }));

            if (!validAttributes.length) {
                this.form.available_skus = [];
                return;
            }

            const makeComboKey = (obj) =>
                validAttributes
                    .map(a => `${a.key}=${String(obj[a.key] ?? '').trim()}`)
                    .join('|');

            const prevMap = new Map(prev.map(s => [makeComboKey(s), s]));

            const cartesian = (arrays) =>
                arrays.reduce((acc, curr) => {
                    const res = [];
                    acc.forEach(a => curr.forEach(b => res.push([...a, b])));
                    return res;
                }, [[]]);

            const combos = cartesian(validAttributes.map(a => a.options));

            let counter = 1;
            const deleted = new Set(this.form.deleted_sku_keys || []);

            this.form.available_skus = combos
                .map(values => {
                    const skuObj = {}; // <-- ВАЖНО: без price/stock_qty

                    values.forEach((val, idx) => {
                        skuObj[validAttributes[idx].key] = val;
                    });

                    const key = makeComboKey(skuObj);
                    if (deleted.has(key)) return null;

                    const old = prevMap.get(key);

                    const skuSuffix = values.map(v => String(v).substring(0, 3).toUpperCase()).join('-');
                    const baseSku = `${counter++}-${skuSuffix}`;

                    return {
                        ...skuObj,
                        sku: old?.sku || baseSku,
                        price: Number(old?.price ?? 0) || 0,
                        stock_qty: Number(old?.stock_qty ?? 0) || 0,

                        weight: Number(old?.weight ?? 0) || 0,
                        length: Number(old?.length ?? 0) || 0,
                        width: Number(old?.width ?? 0) || 0,
                        height: Number(old?.height ?? 0) || 0,
                    };
                })
                .filter(Boolean);
        },

        onPickImages(e) {
            const files = Array.from(e.target.files || []);
            if (!files.length) return;

            const MAX_SIZE = 5 * 1024 * 1024;

            this.imageError = null;

            files.forEach((file) => {
                if (file.size > MAX_SIZE) {
                    this.imageError = `Файл "${file.name}" больше 5MB и не был загружен`;
                    return;
                }

                const preview = URL.createObjectURL(file);
                this.form.images.push({
                    primary: false,
                    file,
                    preview,
                    isExisting: false,
                });
            });

            if (!this.form.images.some((i) => i.primary) && this.form.images.length) {
                this.form.images[0].primary = true;
            }

            e.target.value = '';
        },

        setPrimaryImage(index) {
            this.form.images.forEach((img, i) => {
                img.primary = i === index;
            });
        },

        removeImage(index) {
            const img = this.form.images[index];

            if (img?.preview && !img.isExisting) {
                URL.revokeObjectURL(img.preview);
            }

            this.form.images.splice(index, 1);

            if (!this.form.images.some((i) => i.primary) && this.form.images.length) {
                this.form.images[0].primary = true;
            }
        },

        validateImages() {
            const primaryCount = this.form.images.filter((i) => i.primary).length;
            if (primaryCount !== 1) return 'Должно быть выбрано ровно одно основное изображение.';
            return null;
        },

        buildCreateFormData(payload) {
            const fd = new FormData();

            fd.append('name', payload.name);
            fd.append('description', payload.description || '');
            fd.append('old_price', String(payload.old_price || 0));
            fd.append('is_hit', payload.is_hit ? '1' : '0');
            fd.append('category_id', String(payload.category_id));

            payload.images.forEach((img, i) => {
                fd.append(`images[${i}][image]`, img.file);
                fd.append(`images[${i}][primary]`, img.primary ? '1' : '0');
            });

            if (payload.attributes?.length) {
                fd.append('attributes', JSON.stringify(normalizeAttributesForPayload(payload.attributes)));
            }

            if (payload.available_skus?.length) {
                const skus = payload.available_skus.map(s => ({
                    ...s,
                    price: Number(s.price) || 0,
                    stock_qty: Number(s.stock_qty) || 0,
                    weight: Number(s.weight) || 0,
                    length: Number(s.length) || 0,
                    width: Number(s.width) || 0,
                    height: Number(s.height) || 0,
                }));

                fd.append('available_skus', JSON.stringify(skus));
            }

            return fd;
        },

        buildUpdateFormData(payload) {
            const fd = new FormData();

            fd.append('name', payload.name);
            fd.append('description', payload.description || '');
            fd.append('old_price', String(payload.old_price || 0));
            fd.append('is_hit', payload.is_hit ? '1' : '0');
            fd.append('category_id', String(payload.category_id));

            const existing = payload.images
                .filter((i) => i.isExisting)
                .map((i) => ({image: i.image, primary: !!i.primary}));
            fd.append('existing_images', JSON.stringify(existing));

            const newImages = payload.images.filter((i) => !i.isExisting && i.file);
            newImages.forEach((img, i) => {
                fd.append(`new_images[${i}][image]`, img.file);
                fd.append(`new_images[${i}][primary]`, img.primary ? '1' : '0');
            });

            if (payload.attributes?.length) {
                fd.append('attributes', JSON.stringify(normalizeAttributesForPayload(payload.attributes)));
            }

            if (payload.available_skus?.length) {
                const skus = payload.available_skus.map(s => ({
                    ...s,
                    price: Number(s.price) || 0,
                    stock_qty: Number(s.stock_qty) || 0,
                    weight: Number(s.weight) || 0,
                    length: Number(s.length) || 0,
                    width: Number(s.width) || 0,
                    height: Number(s.height) || 0,
                }));

                fd.append('available_skus', JSON.stringify(skus));
            }

            return fd;
        },

        deleteSkuRow(skuRow) {
            if (!skuRow) return;
            const validAttrs = (this.form.attributes || [])
                .filter(a => a.sku_key)
                .map(a => a.sku_key);

            const comboKey = validAttrs
                .map(k => `${k}=${String(skuRow[k] ?? '').trim()}`)
                .join('|');

            if (!this.form.deleted_sku_keys) this.form.deleted_sku_keys = [];

            if (comboKey) {
                this.form.deleted_sku_keys.push(comboKey);
                this.form.deleted_sku_keys = Array.from(new Set(this.form.deleted_sku_keys));
            }

            this.form.available_skus = (this.form.available_skus || [])
                .filter(r => r !== skuRow && r.sku !== skuRow.sku);
            // this.generateSkus();
        },

        async submitProduct() {
            this.isLoading = true;
            this.error = null;
            this.successMessage = null;

            const isEdit = this.mode === 'edit';

            const imagesError = this.validateImages();
            if (imagesError) {
                this.error = imagesError;
                this.isLoading = false;
                return;
            }

            const payload = {
                ...this.form,
                is_hit: !!this.form.is_hit,
                old_price: Number(this.form.old_price) || 0,
            };

            try {
                let fd;
                let url;

                if (!isEdit) {
                    fd = this.buildCreateFormData(payload);
                    url = url = `/admin/api/products`;
                } else {
                    if (!this.productId) {
                        this.error = 'Не выбран товар для редактирования';
                        return;
                    }
                    fd = this.buildUpdateFormData(payload);
                    fd.append('_method', 'PUT');
                    url = `/admin/api/products/${this.productId}`;
                }

                const res = await axios.post(url, fd, {
                    headers: {'Content-Type': 'multipart/form-data'},
                });

                if (res.data?.success) {
                    this.successMessage = isEdit ? 'Изменения сохранены!' : 'Товар создан!';
                    this.$emit('saved', res.data.data || null);
                    return;
                }

                this.error = res.data?.message || 'Ошибка';

            } catch (err) {
                const resp = err?.response?.data;

                const firstValidationError =
                    resp?.errors ? Object.values(resp.errors).flat()?.[0] : null;

                this.error =
                    resp?.message ||
                    firstValidationError ||
                    resp?.error_details ||
                    'Ошибка сервера.';

            } finally {
                this.isLoading = false;
            }
        },

        closeModal() {
            this.$emit('close');
        },
    },
    mounted() {
        this.fetchCategories();
    }
}
</script>

<template>
    <div v-if="isVisible" class="modal-backdrop" @click.self="closeModal">
        <div class="modal-content">

            <button class="close-btn" @click="closeModal">&times;</button>

            <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
            <div v-if="error" class="alert alert-danger">{{ error }}</div>

            <form @submit.prevent="submitProduct" v-if="!successMessage">

                <fieldset class="mb-4">
                    <legend class="mb-3 d-flex align-items-center gap-2">
                        <span class="fw-bold">Основная информация</span>
                        <span class="badge bg-light text-dark border">Шаг 1</span>
                    </legend>

                    <div class="mb-3">
                        <label class="form-label fw-semibold" for="productName">
                            Название товара <span class="text-danger">*</span>
                        </label>
                        <input id="productName" type="text" v-model.trim="form.name"
                               :class="{ 'is-invalid': !form.name && error }"
                               required class="form-control" placeholder="Например: Чемодан AirLight" maxlength="255">
                        <div class="form-text">
                            Коротко и понятно. Это название увидит покупатель.
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-semibold" for="productDescription">
                            Описание
                        </label>
                        <textarea id="productDescription" v-model.trim="form.description" class="form-control"
                                  rows="4"
                                  placeholder="Пара предложений о товаре: материал, особенности, гарантия…"></textarea>
                        <div class="form-text">
                            Можно оставить пустым — но с описанием товар продаётся лучше.
                        </div>
                    </div>

                    <div class="row g-3 mb-3">
                        <div class="col-12 col-md-6">
                            <label class="form-label fw-semibold" for="productOldPrice">
                                Старая цена
                            </label>
                            <div class="input-group">
                                <input id="productOldPrice" type="number" v-model.number="form.old_price"
                                       min="0" step="1" class="form-control" placeholder="Необязательно">
                                <span class="input-group-text">₽</span>
                            </div>
                            <div class="form-text">
                                Если указать, можно показать скидку.
                            </div>
                        </div>
                    </div>

                    <div class="row g-3 align-items-end">
                        <div class="col-12 col-md-6">
                            <div class="border rounded-3 p-3">
                                <div class="d-flex gap-3">
                                    <input id="productIsHit" type="checkbox"
                                           v-model="form.is_hit" class="form-check-input">
                                    <label class="form-check-label fw-semibold" for="productIsHit">
                                        Хит продаж
                                    </label>
                                </div>
                                <div class="form-text mb-0">
                                    Отметьте, если хотите выделить товар на витрине.
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-md-6">
                            <label class="form-label fw-semibold" for="productCategory">
                                Категория <span class="text-danger">*</span>
                            </label>

                            <select id="productCategory" v-model.number="form.category_id" required
                                    class="form-select" :disabled="categoriesLoading">
                                <option :value="null" disabled>
                                    {{ categoriesLoading ? 'Загрузка...' : 'Выберите категорию' }}
                                </option>

                                <option v-for="category in categories" :key="category.id" :value="category.id">
                                    {{ category.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset class="mb-3">
                    <legend>Изображения</legend>

                    <div class="mb-2">
                        <input type="file" accept="image/*" multiple
                        @change="onPickImages" class="form-control"/>

                        <div v-if="imageError" class="text-danger small mt-1">
                            {{ imageError }}
                        </div>
                    </div>

                    <div v-if="form.images.length" class="row g-2">
                        <div class="col-6 col-md-4 col-lg-3" v-for="(img, idx) in form.images" :key="idx">
                            <div class="card h-100">
                                <img :src="img.preview" class="card-img-top" style="object-fit: cover; height: 140px;"
                                     alt="preview img"/>

                                <div class="card-body p-2">
                                    <label class="d-flex align-items-center gap-2 mb-2">
                                        <input type="radio" name="primaryImage" :checked="img.primary"
                                               @change="setPrimaryImage(idx)"/>
                                        <span class="small">Основное</span>
                                    </label>

                                    <button type="button" class="btn btn-sm btn-outline-danger w-100"
                                            @click="removeImage(idx)">
                                        Удалить
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </fieldset>

                <fieldset class="mb-4">
                    <legend class="mb-3 d-flex flex-wrap justify-content-between align-items-center gap-2">
                        <div>
                            <span class="fw-bold">Атрибуты и варианты</span>
                            <span class="badge bg-light text-dark border">Шаг 2</span>
                            <div class="text-muted small" style="font-size: 15px">
                                Например: Размер, Цвет. На их основе автоматически создаются SKU.
                            </div>
                        </div>

                        <button type="button" @click="addAttribute('', '', [''])"
                                class="btn btn-sm btn-primary">
                            + Добавить атрибут
                        </button>
                    </legend>

                    <div v-if="!form.attributes.length" class="alert alert-light border">
                        <div class="fw-semibold">Атрибутов пока нет</div>
                        <div class="text-muted small mb-2">
                            Добавьте хотя бы один атрибут, чтобы создать варианты товара.
                        </div>
                        <button type="button" class="btn btn-sm btn-outline-primary"
                                @click="addAttribute('', '', [''])">
                            Добавить первый атрибут
                        </button>
                    </div>
                    <div v-else>
                        <ul class="nav nav-pills flex-wrap gap-2 mb-3">
                            <li class="nav-item" v-for="(attr, idx) in form.attributes" :key="'attr-tab-'+idx">
                                <button type="button" class="nav-link" :class="{ active: idx === activeAttrIndex }"
                                        @click="setActiveAttr(idx)">
                                    {{ attr.name ? attr.name : `Атрибут #${idx + 1}` }}
                                    <span class="ms-2 badge bg-light text-dark border">{{
                                            (attr.options || []).filter(o => (o || '').trim()).length
                                        }}</span>
                                </button>
                            </li>
                        </ul>

                        <div class="card border-0 shadow-sm">
                            <div class="card-header bg-white d-flex justify-content-between align-items-start gap-2">
                                <div>
                                    <div class="fw-semibold">
                                        {{
                                            form.attributes[activeAttrIndex]?.name || `Атрибут #${activeAttrIndex + 1}`
                                        }}
                                    </div>
                                    <div class="small text-muted">
                                        Заполните название, ключ и добавьте опции. SKU пересчитаются автоматически.
                                    </div>
                                </div>

                                <button type="button" class="btn btn-sm btn-outline-danger"
                                        @click="removeAttribute(activeAttrIndex)" title="Удалить атрибут">
                                    Удалить
                                </button>
                            </div>

                            <div class="card-body" v-if="form.attributes[activeAttrIndex]">
                                <div class="row g-3">
                                    <div class="col-12 col-md-6">
                                        <label class="form-label fw-semibold">Название</label>
                                        <input type="text"
                                               v-model.trim="form.attributes[activeAttrIndex].name" class="form-control"
                                               placeholder="Например: Размер"
                                               @input="onAttrNameInput(form.attributes[activeAttrIndex])">
                                        <div class="form-text">Показывается пользователю на странице товара.</div>
                                    </div>

                                    <div class="col-12 col-md-6">
                                        <label class="form-label fw-semibold">Ключ</label>
                                        <input type="text" v-model.trim="form.attributes[activeAttrIndex].sku_key"
                                               class="form-control"
                                               placeholder="Например: size" @input="generateSkus">
                                        <div class="form-text">Только латиница и без пробелов (size, color...).</div>
                                    </div>
                                </div>

                                <hr class="my-3">

                                <div class="d-flex justify-content-between align-items-center mb-2">
                                    <div class="fw-semibold">Опции</div>

                                    <button type="button" class="btn btn-sm btn-outline-success"
                                            @click="addOption(activeAttrIndex)">
                                        + Добавить опцию
                                    </button>
                                </div>

                                <div class="row g-2">
                                    <div v-for="(option, optIndex) in form.attributes[activeAttrIndex].options"
                                         :key="'opt-'+activeAttrIndex+'-'+optIndex" class="col-12 col-md-6">
                                        <div class="input-group">
                                            <input type="text"
                                                   v-model.trim="form.attributes[activeAttrIndex].options[optIndex]"
                                                   class="form-control"
                                                   :placeholder="`Опция #${optIndex + 1} (например: Красный)`"
                                                   @input="generateSkus">
                                            <button type="button" class="btn btn-outline-secondary"
                                                    @click="removeOption(activeAttrIndex, optIndex)"
                                                    :disabled="form.attributes[activeAttrIndex].options.length <= 1"
                                                    title="Удалить опцию">
                                                ✕
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div class="small text-muted mt-2">
                                    Пустые опции игнорируются при генерации SKU.
                                </div>
                            </div>
                        </div>
                    </div>
                </fieldset>

                <fieldset class="mb-4">
                    <legend class="mb-2 fw-bold">
                        Варианты (SKU)
                        <span class="badge bg-light text-dark border">Шаг 3</span>
                    </legend>

                    <div v-if="form.available_skus.length" class="alert alert-success py-2">
                        Сгенерировано вариантов: <b>{{ form.available_skus.length }}</b>. Укажите цену и остаток для
                        каждого.
                    </div>

                    <div v-if="form.available_skus.length"
                         class="table-responsive border rounded-3 sku-table-wrap">
                        <table class="table table-striped align-middle mb-0 sku-table">
                            <thead class="table-light" style="position: sticky; top: 0; z-index: 1;">
                            <tr>
                                <th v-if="false" class="sticky-col sticky-left sku-col">SKU</th>

                                <th v-for="(value, key) in form.available_skus[0]" :key="key"
                                    v-if="!['sku','price','stock_qty','weight','length','width','height'].includes(key)">
                                    {{ key.charAt(0).toUpperCase() + key.slice(1) }}
                                </th>

                                <th class="price-col">Цена</th>
                                <th class="stock-col">Сток</th>

                                <th class="dim-col">Вес (г)</th>
                                <th class="dim-col">Длина (см)</th>
                                <th class="dim-col">Ширина (см)</th>
                                <th class="dim-col">Высота (см)</th>

                                <th class="sticky-col sticky-right actions-col"></th>
                            </tr>
                            </thead>

                            <tbody>
                            <tr v-for="(sku, skuIndex) in form.available_skus" :key="sku.sku">
                                <td v-if="false" class="sticky-col sticky-left sku-col fw-semibold">
                                    <span class="sku-text">{{ sku.sku }}</span>
                                </td>

                                <td v-for="(value, key) in sku" :key="key"
                                    v-if="!['sku','price','stock_qty','weight','length','width','height'].includes(key)">
                                    <span class="badge bg-light text-dark border">{{ value }}</span>
                                </td>

                                <td class="price-col">
                                    <div class="input-group">
                                        <input type="number" v-model.number="sku.price" min="0" class="form-control"
                                               placeholder="0">
                                        <span class="input-group-text">₽</span>
                                    </div>
                                </td>

                                <td class="stock-col">
                                    <input type="number" v-model.number="sku.stock_qty" min="0" class="form-control"
                                           placeholder="0">
                                </td>

                                <td class="dim-col">
                                    <input type="number" v-model.number="sku.weight" min="0" class="form-control"
                                           placeholder="г">
                                </td>
                                <td class="dim-col">
                                    <input type="number" v-model.number="sku.length" min="0" class="form-control"
                                           placeholder="см">
                                </td>
                                <td class="dim-col">
                                    <input type="number" v-model.number="sku.width" min="0" class="form-control"
                                           placeholder="см">
                                </td>
                                <td class="dim-col">
                                    <input type="number" v-model.number="sku.height" min="0" class="form-control"
                                           placeholder="см">
                                </td>

                                <td class="sticky-col sticky-right actions-col">
                                    <div class="d-flex gap-1 justify-content-end">
                                        <button type="button"
                                                class="btn btn-outline-danger btn-sm"
                                                @click="deleteSkuRow(sku)">
                                            ✕
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div v-else class="alert alert-warning d-flex justify-content-between align-items-center">
                        <div>
                            <div class="fw-semibold">Варианты ещё не созданы</div>
                            <div class="small text-muted">
                                Добавьте атрибут(ы) и опции (например: Размер → S/M/L), чтобы автоматически
                                сгенерировать SKU.
                            </div>
                        </div>

                        <button type="button" class="btn btn-sm btn-outline-primary"
                                @click="addAttribute('', '', [''])">
                            + Добавить атрибут
                        </button>
                    </div>
                </fieldset>

                <button type="submit" class="btn btn-primary mt-3"
                        :disabled="isLoading || !form.name || form.available_skus.length === 0">
                    {{ submitButtonText }}
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

.sku-table-wrap {
    max-height: 420px;
    overflow: auto;
}

.sku-table {
    margin: 0;
}

.sku-table th,
.sku-table td {
    padding: 10px 12px;
    vertical-align: middle;
}

.sku-col {
    min-width: 240px;
}

.price-col {
    min-width: 160px;
}

.stock-col {
    min-width: 130px;
}

.dim-col {
    min-width: 130px;
}

.sticky-col {
    position: sticky;
    background: #fff;
    z-index: 2;
}

.sticky-left {
    left: 0;
    box-shadow: 1px 0 0 rgba(0, 0, 0, .08);
}

.sticky-right {
    right: 0;
    box-shadow: -1px 0 0 rgba(0, 0, 0, .08);
}

.sku-table thead th {
    position: sticky;
    top: 0;
    z-index: 3;
    background: #f8f9fa;
}
</style>
