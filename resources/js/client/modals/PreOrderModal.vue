<template>
    <div class="modal" id="orderModal" tabindex="-1" aria-labelledby="orderModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header text-end">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h2 class="order-title text-center mb-4">Ваш заказ</h2>
                    <p class="order-subtitle text-center">Внимательно заполняйте <br> поля ниже</p>
                    <form @submit.prevent="paymentClick">
                        <input id="idCourse" class="idCourse" type="text" hidden :value="currentPackageId">
                        <input id="originalPrice" type="text" hidden :value="currentPackagePrice">

                        <div class="mb-3">
                            <label for="fullName" class="form-label">Фамилия Имя:</label>
                            <input type="text" class="form-control ta-input" id="fullName"
                                   placeholder="Как к Вам обращаться?" v-model="formData.fullName"
                                   @input="checkFormValidity">
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">На данную почту придет доступ к курсу:</label>
                            <input type="email" class="form-control ta-input" id="email" placeholder="Email"
                                   v-model="formData.email" @input="checkFormValidity" autocomplete="email">
                        </div>
                        <div class="mb-3">
                            <label for="phone" class="form-label">Введите Ваш номер телефона:</label>
                            <input type="tel" class="form-control ta-input" id="phone"
                                   v-mask="'+7 (###) ###-##-##'" autocomplete="tel"
                                   placeholder="Чтобы мы точно смогли с Вами связаться" v-model="formData.phone"
                                   @input="checkFormValidity">
                        </div>

                        <div v-if="currentPackageId !== 'maxi'" class="mb-3">
                            <label for="promoCodeInput" class="form-label">Промокод (Необязательно)</label>
                            <div class="d-flex gap-2">
                                <input type="text"
                                       id="promoCodeInput"
                                       class="form-control"
                                       placeholder="Введите промокод"
                                       v-model="promoInput">
                                <button v-if="!isActivePromocode" @click="checkPromoCode()" class="btn btn-outline-secondary">
                                    <svg class="scroll-arrow arrow-up" viewBox="0 0 24 24">
                                        <path fill="currentColor"
                                              d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
                                    </svg>
                                </button>
                            </div>

                            <div v-if="promoStatus === 'checking'" class="form-text text-info mt-1">Проверка...</div>

                            <div v-else-if="promoStatus === 'allowed'" class="alert alert-success mt-2 p-2">
                                ✅ Промокод принят! Скидка {{
                                    discountDetails ? (discountDetails.value + (discountDetails.type === 'percent' ? '%' : 'р')) : '...'
                                }} применена.
                            </div>

                            <div v-else-if="promoStatus === 'used'" class="alert alert-warning mt-2 p-2">
                                ⚠️ {{ promoMessage }}
                            </div>

                            <div v-else-if="promoStatus === 'expired'" class="alert alert-danger mt-2 p-2">
                                ❌ {{ promoMessage }}
                            </div>

                            <div v-else-if="promoStatus === 'invalid'" class="alert alert-danger mt-2 p-2">
                                ❌ {{ promoMessage }}
                            </div>
                        </div>

                        <div class="package-info d-flex justify-content-center gap-3 mb-5">
                            <div class="package-badge position-relative" :style="getBackgroundStyle()">
                                <p class="package-title">
                                    ПАКЕТ <span class="fw-bolder">{{ currentPackageName || '...' }}</span>
                                </p>
                            </div>
                            <div class="package-price" :class="{'d-none': currentPackageId === 'maxi'}">
                                <p class="line-1">Стоимость:</p>
                                <p class="price fw-bold line-1"
                                   :class="{'text-danger': startPrice > currentPackagePrice}">
                                    {{ currentPackagePrice }} р
                                </p>
                            </div>
                        </div>

                        <div class="politics">
                            <div class="form-check mb-3 d-flex">
                                <input class="form-check-input" type="checkbox" id="checkPolitics"
                                       v-model="formData.agreesToPolitics" @change="checkFormValidity">
                                <label class="form-check-label" for="checkPolitics">
                                    Я согласен с <a href="#" class="text-decoration-underline">Условиями
                                    использования</a> и <a href="#" class="text-decoration-underline">Политикой
                                    конфиденциальности</a>
                                </label>
                            </div>
                        </div>

                        <div class="text-center">
                            <button :disabled="isDisabled" data-bs-dismiss="modal" type="submit"
                                    class="btn btn-continue btn-cta">
                                <span class="flare"></span>
                                {{ currentPackageId === 'maxi' ? 'Получить презентацию' : 'Продолжить' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "PreOrderModal",
    data() {
        return {
            isDisabled: true,
            currentPackageId: null,
            currentPackageName: null,
            currentPackagePrice: null,
            originalPrice: 0,
            currentPackageBg: null,
            formData: {
                fullName: '',
                email: '',
                phone: '',
                agreesToPolitics: false,
            },
            promoCodeId: null,
            promoInput: '',
            promoStatus: null,
            promoMessage: '',
            discountDetails: null,
            startPrice: 0,
            isActivePromocode: false
        }
    },
    methods: {
        checkFormValidity() {
            const {fullName, email, phone, agreesToPolitics} = this.formData;
            const isPhoneValid = phone && phone.replace(/\D/g, '').length >= 10;

            let isBaseValid = (
                fullName.trim().length > 0 &&
                email.includes('@') &&
                isPhoneValid &&
                agreesToPolitics
            );

            let isPromoRequiredAndInvalid = false;
            if (this.promoInput) {
                if (this.promoStatus !== 'allowed') {
                    isPromoRequiredAndInvalid = true;
                }
            }

            this.isDisabled = !(isBaseValid && !isPromoRequiredAndInvalid);
        },

        async checkPromoCode() {
            this.promoStatus = null;
            this.promoMessage = '';
            this.discountDetails = null;

            if (!this.promoInput) {
                this.checkFormValidity();
                return;
            }

            this.promoStatus = 'checking';

            try {
                const response = await axios.post('/api/check-promo-code', {
                    code: this.promoInput,
                    package_id: this.currentPackageId
                }).then((response) => {
                    this.promoCodeId = response.discount_info.promo_code_id;
                });

                this.promoStatus = response.data.status;
                this.promoMessage = response.data.message;

                if (this.promoStatus === 'allowed') {
                    this.discountDetails = response.data.discount_info;
                }

            } catch (error) {
                if (error.response && error.response.data) {
                    this.promoStatus = error.response.data.status || 'invalid';
                    this.promoMessage = error.response.data.message || 'Ошибка сервера при проверке кода.';
                } else {
                    this.promoStatus = 'invalid';
                    this.promoMessage = 'Ошибка сети при проверке кода.';
                }
            } finally {
                this.checkFormValidity();
            }
            this.calculateFinalPrice();
        },

        debounce(func, delay) {
            let timeoutId = null;
            return function (...args) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                }, delay);
            };
        },

        calculateFinalPrice() {
            if (this.promoStatus === 'allowed' && this.discountDetails) {
                const discountType = this.discountDetails.type;
                const discountValue = this.discountDetails.value;
                const original = this.originalPrice;

                let newPrice = original;

                if (discountType === 'percent') {
                    newPrice = original * (1 - discountValue / 100);
                } else if (discountType === 'fixed') {
                    newPrice = original - discountValue;
                }

                this.currentPackagePrice = Math.round(newPrice * 100) / 100;
                this.isActivePromocode = true;
            } else {
                this.currentPackagePrice = null;
                this.$nextTick(() => {
                    this.currentPackagePrice = this.originalPrice;
                });
            }
        },

        getBackgroundStyle() {
            if (this.currentPackageBg) {
                return {
                    background: this.currentPackageBg
                };
            }
            return {};
        },

        async paymentClick() {
            this.checkFormValidity();
            if (this.isDisabled) {
                return;
            }

            this.isDisabled = true;

            const {fullName, email, phone} = this.formData;
            const isPromoAllowed = this.promoStatus === 'allowed' && this.discountDetails;

            if (this.currentPackageId === 'maxi') {
                const presentationData = {
                    full_name: fullName,
                    phone_number: phone,
                    email: email,
                    package: this.currentPackageId
                };

                try {
                    const response = await axios.post('/api/request-presentation', presentationData);

                    if (response.data && response.data.success && response.data.redirect) {
                        localStorage.setItem('notification', JSON.stringify(response.data.notification));
                        window.location.href = response.data.redirect;
                    } else {
                        console.error('API Presentation Error:', response.data);
                        alert('Ошибка при запросе презентации. Проверьте консоль.');
                    }
                } catch (error) {
                    console.error('API Presentation Request Failed:', error);
                    alert('Произошла ошибка при запросе презентации.');
                } finally {
                    this.isDisabled = false;
                }
            } else {
                const paymentData = {
                    package_id: this.currentPackageId,
                    course_name: this.currentPackageName,
                    phone_number: phone,
                    email: email,
                    full_name: fullName,
                    amount: this.currentPackagePrice,
                    promo_code_id: this.promoCodeId
                };

                if (isPromoAllowed) {
                    paymentData.promo_code = this.promoInput;
                    paymentData.discount_type = this.discountDetails.type;
                    paymentData.discount_value = this.discountDetails.value;
                }

                try {
                    const response = await axios.post('/payments/create', paymentData);

                    if (response.status === 200) {
                        window.location.href = response.data;
                    } else {
                        alert('Ошибка при создании платежа.');
                    }
                } catch (error) {
                    console.error('Payment API Error:', error);

                    if (error.response && error.response.status === 400) {
                        alert(error.response.data.message || 'Промокод стал невалидным или данные некорректны.');
                    } else {
                        alert('Произошла ошибка при запросе к серверу.');
                    }
                } finally {
                    this.isDisabled = false;
                }
            }
        },
    },
    mounted() {
        const orderModal = document.getElementById('orderModal');

        if (orderModal) {
            orderModal.addEventListener('show.bs.modal', event => {
                this.formData.fullName = '';
                this.formData.email = '';
                this.formData.phone = '';
                this.formData.agreesToPolitics = false;
                this.promoInput = '';
                this.promoStatus = null;
                this.discountDetails = null;
                this.isDisabled = true;

                const button = event.relatedTarget;

                const id = button.getAttribute('data-bs-id');
                const name = button.getAttribute('data-bs-name');
                const priceStr = button.getAttribute('data-bs-price');
                const bgUrl = button.getAttribute('data-bs-bg');

                this.currentPackageId = id;
                this.currentPackageName = name;
                this.originalPrice = parseFloat(priceStr) || 0;
                this.startPrice = this.originalPrice;
                this.currentPackagePrice = this.originalPrice;
                this.currentPackageBg = bgUrl ? `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url("${bgUrl}") no-repeat center center / cover` : '';

                orderModal.querySelector('.idCourse').value = id;
                this.checkFormValidity();
            });
        }
    }
}
</script>
<style scoped>
.scroll-arrow {
    transform: rotate(270deg);
    width: 35px;
}
</style>
