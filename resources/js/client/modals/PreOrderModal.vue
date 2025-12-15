<template>
    <div class="modal fade" id="orderModal" tabindex="-1" aria-labelledby="orderModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header text-end">
                    <button type="button" class="btn-close" data-bs-dismiss="modal"  aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h2 class="order-title text-center">Ваш заказ</h2>
                    <p class="order-subtitle text-center">Внимательно заполняйте <br> поля ниже</p>
                    <form @submit.prevent="paymentClick">
                        <input class="idCourse" type="text" hidden :value="currentPackageId">
                        <div class="mb-3">
                            <label for="fullName" class="form-label">Фамилия Имя:</label>
                            <input type="text" class="form-control ta-input" id="fullName" placeholder="Как к Вам обращаться?">
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">На данную почту придет доступ к курсу:</label>
                            <input type="email" class="form-control ta-input" id="email" placeholder="Email">
                        </div>
                        <div class="mb-3">
                            <label for="phone" class="form-label">Введите Ваш номер телефона:</label>
                            <input type="tel" class="form-control ta-input" id="phone" placeholder="Чтобы мы точно смогли с Вами связаться">
                        </div>

                        <div class="package-info d-flex justify-content-center gap-3 mb-5">
                            <div class="package-badge position-relative">
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
                                <input class="form-check-input" type="checkbox" value="" id="checkPolitics">
                                <label class="form-check-label" for="checkPolitics">
                                    Я согласен с <a href="#" class="text-decoration-underline">Условиями использования</a> и <a href="#" class="text-decoration-underline">Политикой конфиденциальности</a>
                                </label>
                            </div>
                        </div>

                        <div class="text-center">
                            <button data-bs-dismiss="modal" type="submit" class="btn btn-continue btn-cta">Продолжить</button>
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
    data(){
        return {
            isDisabled: false,
            currentPackageId: null,
            currentPackageName: null,
            currentPackagePrice: null,
        }
    },
    methods: {
        async paymentClick() {
            const isAgreed = document.getElementById('checkPolitics').checked;
            if (!isAgreed) {
                alert("Вы должны согласиться с условиями!");
                return;
            }

            const pkgId = this.currentPackageId;
            const pkgName = this.currentPackageName;
            const amount = this.currentPackagePrice;

            if (!pkgId || !amount) {
                console.error("Недостаточно данных для оплаты.");
                return;
            }

            this.isDisabled = true;

            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const firstName = document.getElementById('fullName').value;

            console.log({
                package_id: pkgId,
                course_name: pkgName,
                phone_number: phone,
                email: email,
                full_name: firstName,
                amount: amount
            });

            try {
                const response = await axios.post('/payments/create', {
                    package_id: pkgId,
                    course_name: pkgName,
                    phone_number: phone,
                    email: email,
                    full_name: firstName,
                    amount: amount
                });

                if (response.status === 200) {
                    window.open(response.data);
                } else {
                    alert('Ошибка при создании платежа.');
                }
            } catch (error) {
                console.error('Ошибка API:', error);
                alert('Произошла ошибка при запросе к серверу.');
            } finally {
                this.isDisabled = false;
            }
        },
        addMaskToPhone(){
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
        }
    },
    mounted() {
        const orderModal = document.getElementById('orderModal');

        if (orderModal) {
            orderModal.addEventListener('show.bs.modal', event => {
                this.addMaskToPhone();

                const button = event.relatedTarget;

                const id = button.getAttribute('data-bs-id');
                const name = button.getAttribute('data-bs-name');
                const price = button.getAttribute('data-bs-price');

                this.currentPackageId = id;
                this.currentPackageName = name;
                this.currentPackagePrice = price;

                const modalIdField = orderModal.querySelector('.idCourse');
                const modalTitleSpan = orderModal.querySelector('.package-title .fw-bolder');
                const modalPriceSpan = orderModal.querySelector('.package-price .price');

                if (modalIdField) {
                    modalIdField.value = id;
                }
                if (modalTitleSpan) {
                    modalTitleSpan.textContent = ` "${name}"`;
                }
                if (modalPriceSpan) {
                    modalPriceSpan.textContent = `${price} р`;
                }
            });
        }
    }
}
</script>
