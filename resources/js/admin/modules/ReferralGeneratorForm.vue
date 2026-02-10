<template>
    <div class="card shadow">
        <div class="card-body">
            <form @submit.prevent="submitForm">
                <div class="mb-3">
                    <label for="full_name" class="form-label fw-bold">ФИО</label>
                    <input type="text"
                           v-model="form.full_name"
                           id="full_name"
                           class="form-control"
                           :class="{'is-invalid': errors.full_name}"
                           required>
                    <div v-if="errors.full_name" class="invalid-feedback">{{ errors.full_name[0] }}</div>
                </div>

                <div class="mb-3">
                    <label for="phone" class="form-label fw-bold">Телефон</label>
                    <input type="text"
                           v-model="form.phone"
                           id="phone"
                           class="form-control"
                           :class="{'is-invalid': errors.phone}"
                           required>
                    <div v-if="errors.phone" class="invalid-feedback">{{ errors.phone[0] }}</div>
                </div>

                <div class="mb-3">
                    <label for="email" class="form-label fw-bold">Почта</label>
                    <input type="email"
                           v-model="form.email"
                           id="email"
                           class="form-control"
                           :class="{'is-invalid': errors.email}"
                           required>
                    <div v-if="errors.email" class="invalid-feedback">{{ errors.email[0] }}</div>
                </div>

                <div class="mb-3">
                    <label for="tg_username" class="form-label fw-bold">Telegram (Опционально)</label>
                    <input type="text"
                           v-model="form.tg_username"
                           id="tg_username"
                           class="form-control"
                           :class="{'is-invalid': errors.tg_username}">
                    <div v-if="errors.tg_username" class="invalid-feedback">{{ errors.tg_username[0] }}</div>
                </div>

                <div class="d-grid gap-2 mt-4">
                    <button type="submit" class="btn btn-primary btn-lg" :disabled="isLoading">
                        <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status"
                              aria-hidden="true"></span>
                        {{ isLoading ? 'Создание...' : 'Создать реферальную ссылку' }}
                    </button>
                </div>
            </form>

            <div v-if="newReferralCode" class="mt-5 pt-4 border-top">
                <h5>Сгенерировано!</h5>
                <p>
                    Реферальная ссылка создана.
                </p>

                <div class="input-group mb-3">
                    <input type="text"
                           class="form-control font-monospace"
                           :value="fullReferralLink"
                           readonly
                           id="fullReferralLinkInput">
                    <button class="btn btn-success" @click="copyLink" type="button">
                        Копировать Ссылку
                    </button>
                </div>
                <p class="text-muted">Реф-код: <strong class="text-primary">{{ newReferralCode }}</strong></p>

            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'ReferralGenerator',
    data() {
        return {
            form: {
                full_name: '',
                phone: '',
                email: '',
                tg_username: '',
            },
            errors: {},
            isLoading: false,
            successMessage: '',
            errorMessage: '',

            newReferralCode: null,
        };
    },
    computed: {
        fullReferralLink() {
            if (!this.newReferralCode) return '';
            const baseUrl = window.location.origin;
            return `${baseUrl}/courses?ref=${this.newReferralCode}`;
        }
    },
    methods: {
        async submitForm() {
            this.isLoading = true;
            this.errors = {};
            this.successMessage = '';
            this.errorMessage = '';
            this.newReferralCode = null;

            try {
                const response = await axios.post('/admin/api/referrals', this.form);

                this.successMessage = response.data.message;
                this.newReferralCode = response.data.referral.ref_code;

                this.form.full_name = '';
                this.form.phone = '';
                this.form.email = '';
                this.form.tg_username = '';

                this.$emit('referral-created');

            } catch (error) {
                if (error.response) {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors || {};
                    } else {
                        this.errorMessage = error.response.data.message || `Ошибка сервера: ${error.response.status}`;
                    }
                } else {
                    this.errorMessage = 'Ошибка соединения или неизвестная ошибка.';
                }
            } finally {
                this.isLoading = false;
            }
        },

        copyLink() {
            const linkInput = document.getElementById('fullReferralLinkInput');

            navigator.clipboard.writeText(this.fullReferralLink).then(() => {
                const originalText = linkInput.nextElementSibling.textContent;
                linkInput.nextElementSibling.textContent = 'Скопировано!';
                linkInput.nextElementSibling.classList.replace('btn-success', 'btn-info');

                setTimeout(() => {
                    linkInput.nextElementSibling.textContent = 'Копировать Ссылку';
                    linkInput.nextElementSibling.classList.replace('btn-info', 'btn-success');
                }, 2000);
            }).catch(err => {
                console.error('Не удалось скопировать текст: ', err);
                alert('Ошибка копирования. Попробуйте вручную: ' + this.fullReferralLink);
            });
        }
    }
}
</script>

<style scoped>
.invalid-feedback {
    display: block;
}

.font-monospace {
    font-family: monospace;
}
</style>
