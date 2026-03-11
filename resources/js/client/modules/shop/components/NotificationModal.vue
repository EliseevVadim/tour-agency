<template>
    <div v-if="isVisible" class="modal-overlay" @click.self="$emit('close')">
        <div class="notification-card">
            <div class="notification-header d-flex justify-content-end">
                <button class="close-button" @click="$emit('close')">
                    &times;
                </button>
            </div>
            <div class="notification-body w-100">
                <h3 class="fw-bold mb-2">Сообщить о поступлении товара</h3>
                <p class="body-text support-text text-black text-center">
                    Выберите удобный способ для оповещения о повторном наличии данного товара
                </p>
                <div class="notification-inputs d-flex flex-column align-items-center">
                    <div class="notification-inside-input">
                        <input v-model="form.phone" type="text" v-mask="'+7 (###) ###-##-##'" autocomplete="tel"
                               class="notification-input" placeholder="Ваш номер телефона">
                    </div>

                    <div class="notification-inside-input">
                        <input v-model="form.email" type="email" class="notification-input" placeholder="Ваш email"
                               :class="{ 'input-error': form.email && !isValidEmail(form.email) }"/>
                    </div>

                </div>
                <div class="notification-button-wrapper text-center">
                    <button class="btn btn-cta notification-btn-close" :disabled="loading"
                            @click="sendNotificationRequest">
                        {{ loading ? 'Отправка...' : 'Получить уведомление' }}
                    </button>
                </div>

                <div v-if="success" class="notification-success text-center">
                    Заявка отправлена. Мы сообщим когда товар появится.
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DataProcessingModal',
    props: {
        isVisible: {
            type: Boolean,
            required: true,
            default: false
        },
        product: {
            type: Object,
            required: true
        },
        currentSku: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            loading: false,
            success: false,

            form: {
                phone: '',
                email: ''
            }
        }
    },
    methods: {
        async sendNotificationRequest() {

            if (!this.form.phone && !this.form.email) {
                this.$notify({
                    group: 'notification',
                    type: 'warn',
                    duration: 4000,
                    text: 'Укажите телефон или email'
                });
                return
            }

            if (this.form.email && !this.isValidEmail(this.form.email)) {
                this.$notify({
                    group: 'notification',
                    type: 'warn',
                    duration: 4000,
                    text: 'Введите корректный email'
                });
                return
            }

            this.loading = true
            try {
                const attributes = {}
                const attributeNames = {}
                if (this.currentSku && this.product.attributes) {
                    this.product.attributes.forEach(attr => {
                        const key = attr.sku_key
                        if (this.currentSku[key]) {
                            attributes[key] = this.currentSku[key]
                            attributeNames[key] = attr.name
                        }
                    })
                }

                await axios.post('/api/stock-notification-requests', {
                    product_id: this.product.id,
                    sku: this.currentSku?.sku || null,
                    product_name: this.product.name,

                    phone: this.form.phone || null,
                    email: this.form.email || null,

                    attributes: attributes,
                    attribute_names: attributeNames

                })

                this.success = true
                setTimeout(() => {
                    this.$emit('close')
                    this.form.phone = ''
                    this.form.email = ''
                    this.success = false

                }, 2000)

            } catch (e) {
                const message =
                    e?.response?.data?.errors?.[0] ||
                    'Ошибка отправки заявки'
            } finally {
                this.loading = false
            }
        },
        isValidEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(String(email).toLowerCase());
        }
    }
}
</script>

<style scoped lang="scss">
.modal-overlay {
    background-color: rgba(0, 0, 0, 0.5);
}

.notification-card {
    background-color: white;
    border-radius: 40px;
    max-width: 500px;
    padding: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);

    .body-text {
        line-height: 1.2;
        font-size: 1.3rem;
        font-weight: 500;
        margin-bottom: 55px;
    }

    .notification-body {
        text-align: start;

        h3 {
            font-size: 1.47rem;
        }
    }

    .notification-inputs {
        margin-bottom: 70px;
        gap: 25px;
    }

    .notification-inside-input {
        display: flex;
        align-items: center;
        gap: 4px;
        width: 100%;
        padding-bottom: 10px;
        border-bottom: 2px solid #222;
        max-width: 300px;
    }

    .notification-input {
        width: 100%;
        height: 100%;
        font-size: 1.15rem;
        font-weight: 100;
        line-height: 16px;
        letter-spacing: -0.04em;
        color: #222;
        border: none;
        outline: none;
        text-align: center;

        &::placeholder {
            text-align: center;
            font-weight: 500;
        }
    }

    .notification-btn-close {
        width: 300px;
        margin-bottom: 30px;
    }

    @media (max-width: 767.98px) {
        width: 90%;
    }
}

.modal-overlay {
    position: fixed;
    z-index: 9;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
}
.input-error {
    border-color: #ff3b3b;
}
</style>
