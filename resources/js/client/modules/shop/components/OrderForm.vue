<template>
    <div class="modal-overlay" @click.self="closeModal">
        <div class="modal modal-content modal-content-order">
            <div class="container-xl order-page-container">
                <div class="left-column">
                    <header class="nav-header">
                        <button @click="goBack" v-if="currentStep === 2" class="back-link">
                            <svg class="icon-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                            </svg>
                            Назад
                        </button>
                    </header>

                    <h2 class="main-title">{{ currentStep === 1 ? 'Доставка' : 'Доставка' }}</h2>

                    <div v-if="currentStep === 1" class="form-section">
                        <div class="form-group">
                            <input type="text" id="city" placeholder="Выберите Ваш город" class="form-input">
                        </div>

                        <button @click="goToStep(2)" class="btn-continue">Продолжить</button>
                    </div>

                    <div v-if="currentStep === 2" class="form-section">
                        <div class="form-group">
                            <label for="fio">Ваше ФИО</label>
                            <input type="text" id="fio" class="form-input">
                        </div>
                        <div class="form-group">
                            <label for="phone">Ваш номер</label>
                            <input type="tel" id="phone" class="form-input">
                        </div>
                        <div class="form-group">
                            <label for="email">Ваш Email</label>
                            <input type="email" id="email" class="form-input">
                        </div>

                        <div class="address-row">
                            <div class="form-group address-part">
                                <label for="street">Улица</label>
                                <input type="text" id="street" class="form-input">
                            </div>
                            <div class="form-group address-part">
                                <label for="home">Дом</label>
                                <input type="text" id="home" class="form-input">
                            </div>
                        </div>

                        <div class="address-row">
                            <div class="form-group address-part">
                                <label for="entrance">Подъезд</label>
                                <input type="text" id="entrance" class="form-input">
                            </div>
                            <div class="form-group address-part">
                                <label for="apartment">Квартира/офис</label>
                                <input type="text" id="apartment" class="form-input">
                            </div>
                            <div class="form-group address-part small-gap">
                                <label for="floor">Этаж</label>
                                <input type="text" id="floor" class="form-input">
                            </div>
                        </div>

                        <div class="agreement-checkbox">
                            <input type="checkbox" id="agreement">
                            <label for="agreement">Я согласен/а с политикой конфиденциальности</label>
                        </div>

                        <button @click="submitOrder" class="btn-submit">Оформить</button>
                    </div>

                </div>

                <div class="right-column">
                    <h2 class="order-summary-title">Ваш заказ:</h2>

                    <div class="product-card">
                        <img src="" alt="Чемодан" class="product-image">
                        <div class="product-details">
                            <h3 class="product-name">Чемодан "В ПУТЬ"</h3>
                            <p>Размер: Средний</p>
                            <p>Цвет: Красный</p>

                            <div class="quantity-control">
                                <span>Количество:</span>
                            </div>
                        </div>
                    </div>

                    <div class="price-summary">
                        <p class="total-price">К оплате: <strong>{{ order.total }}</strong></p>

                        <p class="delivery-cost">
                            СДЭК (оплачивается при получении): {{ 803.15 }}
                            <br><small>Мосальск</small>
                        </p>

                        <div class="final-sum">
                            Итоговая сумма: {{ order.total }}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OrderModal',
    components: {},
    data() {
        return {
            currentStep: 1,
            order: {
                quantity: 1,
                pricePerUnit: 3650,
                delivery: 803.15,
            }
        };
    },
    computed: {
        orderTotal() {
            return this.order.quantity * this.order.pricePerUnit;
        }
    },
    mounted() {
        document.addEventListener('keydown', this.handleKeydown);
        document.body.style.overflow = 'hidden';
    },
    beforeDestroy() {
        document.removeEventListener('keydown', this.handleKeydown);
        document.body.style.overflow = 'auto';
    },
    methods: {
        goToStep(step) {
            this.currentStep = step;
        },
        goBack() {
            if (this.currentStep === 2) {
                this.currentStep = 1;
            }
        },
        submitOrder() {
            console.log('Заказ оформлен с количеством:', this.order.quantity);
            alert('Заказ оформлен!');
            this.closeModal();
        },
        closeModal() {
            this.$emit('close');
        },
        handleKeydown(event) {
            if (event.key === 'Escape') {
                this.closeModal();
            }
        },
    }
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content-order {
    border: none;
    height: 100%;
}

.order-page-container {
    display: flex;
    width: 100%;
    height: 100%;
    padding: 40px;
}

.left-column {
    flex: 1;
    padding-right: 40px;
}

.right-column {
    flex: 1;
    padding-left: 40px;
}

.nav-header {
    margin-bottom: 20px;
    height: 24px;
}

.main-title {
    margin-bottom: 50px;
}

.back-link,
.back-link:hover {
    display: inline-flex;
    align-items: center;
    font-size: 16px;
    color: #333;
    text-decoration: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
}

.icon-arrow {
    width: 20px;
    height: 20px;
    margin-right: 8px;
}

.form-group {
    margin-bottom: 25px;
    position: relative;
}

.form-group label {
    display: block;
    font-size: 14px;
    color: #888;
    margin-bottom: 4px;
}

.form-input {
    width: 100%;
    padding: 8px 0;
    font-size: 1.2rem;
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;

    &::placeholder {
        font-weight: 500;
        color: #909090;
        font-size: 1.2rem;
    }
}

.form-input:focus {
    border-bottom-color: #007bff;
}

.address-row {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
}

.address-part {
    flex: 1;
}

.address-part.small-gap {
    flex: 0.5;
}

.address-row .form-group {
    margin-bottom: 0;
}

.agreement-checkbox {
    display: flex;
    align-items: center;
    margin: 30px 0;
}

.agreement-checkbox input[type="checkbox"] {
    margin-right: 10px;
    width: 16px;
    height: 16px;
}

.btn-continue,
.btn-submit {
    width: 100%;
    padding: 15px;
    font-size: 22px;
    font-weight: 600;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.btn-continue {
    background-color: #aaaaaa;
}

.btn-continue:hover {
    background-color: #888888;
}

.btn-submit {
    background-color: #007bff;
}

.btn-submit:hover {
    background-color: #0056b3;
}

.order-summary-title {
    font-size: 20px;
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 25px;
}

.product-card {
    display: flex;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
}

.product-image {
    width: 100px;
    height: 120px;
    object-fit: cover;
    margin-right: 15px;
    border-radius: 4px;
}

.product-details {
    flex-grow: 1;
}

.product-details p {
    margin: 2px 0;
    font-size: 14px;
}

.product-name {
    font-size: 16px;
    margin: 0 0 8px 0;
}

.quantity-control {
    display: flex;
    align-items: center;
    margin-top: 10px;
    font-size: 14px;
}

.quantity-control span {
    margin-right: 10px;
}

.total-price {
    font-size: 22px;
    font-weight: 500;
    margin: 20px 0;
}

.delivery-cost {
    font-size: 14px;
    color: #555;
    margin-bottom: 15px;
}

.final-sum {
    font-size: 16px;
    font-weight: 600;
    padding-top: 10px;
    border-top: 1px dashed #ccc;
}
</style>
