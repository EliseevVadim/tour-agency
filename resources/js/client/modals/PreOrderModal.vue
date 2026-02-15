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
                            <div v-if="promoStatus === 'allowed'" class="alert alert-success mt-2 p-2">
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
                                   :class="{'text-danger': originalPrice > currentPackagePrice}">
                                    {{ currentPackagePrice }} р
                                </p>
                            </div>
                        </div>

                        <div class="politics">
                            <div class="form-check d-flex align-items-center mb-2">
                                <input class="form-check-input" type="checkbox" id="checkPolicy"
                                       @change="checkFormValidity">
                                <label class="form-check-label" for="checkPolicy">
                                    Даю <a href="/documents/privacy-consent.pdf">согласие</a> на обработку моих
                                    персональных данных в соответствии с
                                    <a href="/documents/privacy-policy.pdf">политикой</a> обработки персональных данных
                                </label>
                            </div>
                            <div class="form-check mb-3 d-flex align-items-center">
                                <input class="form-check-input" type="checkbox" id="checkPolitics"
                                       v-model="formData.agreesToPolitics" @change="checkFormValidity">
                                <label class="form-check-label" for="checkPolitics">
                                    Даю <a href="/documents/subscription.pdf">согласие</a> на получение рекламных
                                    рассылок
                                </label>
                            </div>

                            <p class="form-check-label mb-3">Нажимая "продолжить", вы соглашаетесь с условиями <a
                                href="/documents/public-offer.pdf">Оферты</a></p>
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
            promoStatus: null,
            promoMessage: '',
            discountDetails: null,
            promoCodeId: null,
            promoCodeType: null,
            promoCodeValue: null,
            refId: null
        }
    },
    methods: {
        checkFormValidity() {
            const {fullName, email, phone} = this.formData;
            const checkPolicy = document.getElementById('checkPolicy');

            const isPhoneValid = phone && phone.replace(/\D/g, '').length >= 10;

            let isBaseValid = (
                fullName.trim().length > 0 &&
                email.includes('@') &&
                isPhoneValid &&
                checkPolicy.checked
            );

            this.isDisabled = !isBaseValid;
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

            const {fullName, email, phone, agreesToPolitics} = this.formData;
            const isPromoAllowed = this.promoStatus === 'allowed' && this.discountDetails;

            if (this.currentPackageId === 'maxi') {
                const presentationData = {
                    full_name: fullName,
                    phone_number: phone,
                    email: email,
                    agrees_to_marketing: agreesToPolitics,
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
                    agrees_to_marketing: agreesToPolitics,
                    amount: this.currentPackagePrice,
                    promo_code_id: this.promoCodeId,
                    discount_value: this.promoCodeValue,
                    discount_type: this.promoCodeType,
                    ref_id: this.refId,
                };

                this.isLoading = false
                const urlParams = new URLSearchParams(window.location.search);
                const refCode = urlParams.get('ref');

                if (refCode && !this.isLoading) {
                    await axios.post(`/api/get-referral/${this.refId}`)
                        .then((response) => {
                            if (response.status === 200 && response.data.success && response.data.referral) {
                                const referral = response.data.referral;
                                paymentData.ref_code = referral.ref_code;
                                paymentData.full_name_ref = referral.full_name;
                                paymentData.tg_username = referral.tg_username;
                            }
                        });
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

                this.promoStatus = null;
                this.discountDetails = null;
                this.isDisabled = true;

                const button = event.relatedTarget;

                const id = button.getAttribute('data-bs-id');
                const name = button.getAttribute('data-bs-name');
                const priceStr = button.getAttribute('data-bs-price');
                const bgUrl = button.getAttribute('data-bs-bg');

                this.refId = button.getAttribute('data-bs-ref-url');

                this.promoStatus = button.getAttribute('data-bs-promo-status');
                this.promoMessage = button.getAttribute('data-bs-promo-message') || '';

                if (this.promoStatus === 'allowed') {
                    this.promoCodeId = button.getAttribute('data-bs-promo-id');
                    this.promoCodeType = button.getAttribute('data-bs-promo-type');
                    this.promoCodeValue = button.getAttribute('data-bs-promo-value');

                    this.discountDetails = {
                        code: button.getAttribute('data-bs-promo-code'),
                        type: button.getAttribute('data-bs-promo-type'),
                        value: parseFloat(button.getAttribute('data-bs-promo-value'))
                    };
                }

                this.currentPackageId = id;
                this.currentPackageName = name;
                this.currentPackagePrice = priceStr;
                this.originalPrice = parseFloat(button.getAttribute('data-bs-original-price')) || 0;
                this.currentPackageBg = bgUrl ? `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url("${bgUrl}") no-repeat center center / cover` : '';

                this.checkFormValidity();
            });
        }
    }
}
</script>
