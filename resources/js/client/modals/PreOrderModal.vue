<template>
    <div class="modal " id="orderModal" tabindex="-1" aria-labelledby="orderModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header text-end">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h2 class="order-title text-center">Ваш заказ</h2>
                    <p class="order-subtitle text-center">Внимательно заполняйте <br> поля ниже</p>
                    <form @submit.prevent="paymentClick">
                        <input class="idCourse" type="text" hidden :value="currentPackageId">
                        <div class="mb-3">
                            <label for="fullName" class="form-label">Фамилия Имя:</label>
                            <input type="text" class="form-control ta-input" id="fullName"
                                   placeholder="Как к Вам обращаться?" v-model="formData.fullName"
                                   @input="checkFormValidity">
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">На данную почту придет доступ к курсу:</label>
                            <input type="email" class="form-control ta-input" id="email" placeholder="Email"
                                   v-model="formData.email" @input="checkFormValidity">
                        </div>
                        <div class="mb-3">
                            <label for="phone" class="form-label">Введите Ваш номер телефона:</label>
                            <input type="tel" class="form-control ta-input" id="phone"
                                   placeholder="Чтобы мы точно смогли с Вами связаться" v-model="formData.phone"
                                   @input="checkFormValidity">
                        </div>

                        <div class="package-info d-flex justify-content-center gap-3 mb-5">
                            <div class="package-badge position-relative" :style="getBackgroundStyle()">
                                <p class="package-title">
                                    ПАКЕТ <span class="fw-bolder">{{ currentPackageName || '...' }}</span>
                                </p>
                            </div>
                            <div class="package-price">
                                <p class="line-1">Стоимость:</p>
                                <p class="price fw-medium line-1">{{ currentPackagePrice || '...' }} р</p>
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
                                    class="btn btn-continue btn-cta">Продолжить
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PreOrderModal",
    data() {
        return {
            isDisabled: true,
            currentPackageId: null,
            currentPackageName: null,
            currentPackagePrice: null,
            currentPackageBg: null,
            formData: {
                fullName: '',
                email: '',
                phone: '',
                agreesToPolitics: false,
            }
        }
    },
    methods: {
        checkFormValidity() {
            const {fullName, email, phone, agreesToPolitics} = this.formData;
            const isPhoneValid = phone && phone.replace(/\D/g, '').length >= 10;

            this.isDisabled = !(
                fullName.trim() &&
                email.includes('@') &&
                isPhoneValid &&
                agreesToPolitics
            );
        },

        async paymentClick() {
            const {fullName, email, phone, agreesToPolitics} = this.formData;

            if (!this.currentPackageId || !this.currentPackagePrice || !agreesToPolitics || !this.isDisabled) {
                if (this.isDisabled) {
                    this.checkFormValidity();
                    if (this.isDisabled) return;
                }
            }

            this.isDisabled = true;

            try {
                const response = await axios.post('/payments/create', {
                    package_id: this.currentPackageId,
                    course_name: this.currentPackageName,
                    phone_number: phone,
                    email: email,
                    full_name: fullName,
                    amount: this.currentPackagePrice
                }).finally(() => {
                    this.isDisabled = false;
                })

                if (response.status === 200) {
                    window.open(response.data);
                } else {
                    alert('Ошибка при создании платежа.');
                }
            } catch (error) {
                console.error('Ошибка API:', error);
                alert('Произошла ошибка при запросе к серверу.');
            }
        },
        addMaskToPhone() {
            const addInputMaskPhone = () => {
                $(document)
                    .on('input', '#phone', maskPhone)
                    .on('focus', '#phone', maskPhone)
                    .on('blur', '#phone', maskPhone)
                    .on('keydown', '#phone', maskPhone)
            }

            let keyCode

            function maskPhone(event) {
                event.keyCode && (keyCode = event.keyCode)

                var pos = this.selectionStart
                if (pos < 3) event.preventDefault()

                const matrix = '+7 (___) ___-__-__'
                let i = 0
                const def = matrix.replace(/\D/g, '')
                const val = this.value.replace(/\D/g, '')

                let newValue = matrix.replace(/[_\d]/g, function (a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                })

                i = newValue.indexOf('_')
                if (i !== -1) {
                    i < 5 && (i = 3)
                    newValue = newValue.slice(0, i)
                }

                var reg = matrix
                    .substr(0, this.value.length)
                    .replace(/_+/g, function (a) {
                        return '\\d{1,' + a.length + '}'
                    })
                    .replace(/[+()]/g, '\\$&')

                reg = new RegExp('^' + reg + '$')

                if (
                    !reg.test(this.value) ||
                    this.value.length < 5 ||
                    (keyCode > 47 && keyCode < 58)
                )
                    this.value = newValue

                if (event.type === 'focusout' && this.value.length < 18) this.value = ''
            }

            addInputMaskPhone();
        },
        getBackgroundStyle() {
            if (this.currentPackageBg) {
                return {
                    background: this.currentPackageBg
                };
            }
            return {};
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
                this.isDisabled = true;

                this.addMaskToPhone();

                const button = event.relatedTarget;

                const id = button.getAttribute('data-bs-id');
                const name = button.getAttribute('data-bs-name');
                const price = button.getAttribute('data-bs-price');
                const bgUrl = button.getAttribute('data-bs-bg');

                this.currentPackageId = id;
                this.currentPackageName = name;
                this.currentPackagePrice = price;
                this.currentPackageBg = bgUrl;

                const modalIdField = orderModal.querySelector('.idCourse');
                const modalTitleSpan = orderModal.querySelector('.package-title .fw-bolder');
                const modalPriceSpan = orderModal.querySelector('.package-price .price');

                if (modalIdField) {
                    modalIdField.value = id;
                }
                if (modalTitleSpan) {
                    modalTitleSpan.textContent = name ? ` "${name}"` : '...';
                }
                if (modalPriceSpan) {
                    modalPriceSpan.textContent = price ? `${price} р` : '...';
                }
                if (this.currentPackageBg) {
                    this.currentPackageBg = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url("${bgUrl}") no-repeat center center / cover`;
                } else {
                    this.currentPackageBg = '';
                }
                this.checkFormValidity();
            });
        }
    }
}
</script>
