<template>
    <div class="tour-store">
        <notifications group="notification" position="top left"/>

        <payment-result-modal
            :is-visible="paymentResultModal.visible"
            :success="paymentResultModal.success"
            @close="closePaymentResultModal"
        />

        <app-header class="hero-section-absolute hero-section_dark"></app-header>

        <ssr-carousel class="products-gallery position-relative" :slides-per-page="1"
                      show-dots :loop="true">
            <div class="home-slider-item custom-slide">
                <div class="grid">
                    <div class="col down">
                        <div class="track">
                            <img src="/img/test.jpg">
                            <img src="/img/packets/packet-1-bg.png">
                            <img src="/img/packets/packet-2-bg.png">

                            <img src="/img/test.jpg">
                            <img src="/img/packets/packet-1-bg.png">
                            <img src="/img/packets/packet-2-bg.png">
                        </div>
                    </div>

                    <div class="col up">
                        <div class="track">
                            <img src="/img/test.jpg">
                            <img src="/img/packets/packet-1-bg.png">
                            <img src="/img/test.jpg">

                            <!-- дубликат -->
                            <img src="/img/test.jpg">
                            <img src="/img/packets/packet-1-bg.png">
                            <img src="/img/test.jpg">
                        </div>
                    </div>

                    <div class="col down">
                        <div class="track">
                            <img src="/img/test.jpg">
                            <img src="/img/test.jpg">
                            <img src="/img/packets/packet-1-bg.png">


                            <!-- дубликат -->
                            <img src="/img/test.jpg">
                            <img src="/img/test.jpg">
                            <img src="/img/packets/packet-1-bg.png">
                        </div>
                    </div>
                </div>
            </div>
            <div v-for="(slide, index) in slides" :key="index"
                 class="home-slider-item" tabindex="-1">
                <div v-if="slide.image" class="home-slider-item-img-desc">
                    <img :src="slide.image" :alt="slide.title" class="home-slider-image">
                </div>

                <div class="home-slider-item-inner">
                    <h2>{{ slide.title }}</h2>

                    <button class="btn btn-cta home-slider-btn" type="button" @click="goToCatalog">
                        {{ slide.buttonText }}
                    </button>
                </div>
            </div>
        </ssr-carousel>

        <main ref="catalogSection" class="content-wrapper container-xl">
            <section class="category-filters">
                <NavigationTabs/>
            </section>

            <ProductList/>
        </main>

        <app-footer></app-footer>
    </div>
</template>

<script>
import ProductList from "./components/ProductList.vue";
import NavigationTabs from "./components/NavigationTabs.vue";
import eventBus from "../../../event-bus";
import PaymentResultModal from "../../modals/ProductNotificationModal.vue";

const CART_STORAGE_KEY = 'shoppingCart';
const PENDING_PAYMENT_ORDER_ID_KEY = 'pendingPaymentOrderId';

export default {
    name: 'MerchStore',
    components: {PaymentResultModal, NavigationTabs, ProductList},

    data() {
        return {
            paymentResultModal: {
                visible: false,
                success: false,
                title: '',
                text: '',
            },
            slides: [
                {
                    title: 'Наша атрибутика',
                    buttonText: 'Перейти в каталог',
                    //  image: '/images/store/slide-1.jpg',
                },
                {
                    title: 'Новинки',
                    buttonText: 'Перейти в каталог',
                    // image: '/images/store/slide-2.jpg',
                },
                {
                    title: 'Хиты продаж',
                    buttonText: 'Перейти в каталог',
                    //  image: '/images/store/slide-3.jpg',
                },
            ],
        };
    },

    async mounted() {
        await this.restorePaidOrderState();
    },

    methods: {
        async restorePaidOrderState() {
            const orderId = localStorage.getItem(PENDING_PAYMENT_ORDER_ID_KEY);
            const url = new URL(window.location.href);
            const isPaymentReturn = url.searchParams.get('payment_return') === '1';

            if (!orderId) {
                this.clearPaymentReturnQuery();
                return;
            }

            try {
                const response = await axios.get(`/api/delivery/orders/${orderId}/status`);
                const data = response && response.data ? response.data.data : null;

                if (!data) {
                    if (isPaymentReturn) {
                        this.clearPendingPayment();
                        this.openPaymentErrorModal();
                    }
                    return;
                }

                if (data.payment_status === 'paid') {
                    localStorage.removeItem(CART_STORAGE_KEY);
                    this.clearPendingPayment();
                    eventBus.$emit('cart:cleared');
                    this.openPaymentSuccessModal();
                    return;
                }

                if (data.payment_status === 'canceled') {
                    this.clearPendingPayment();
                    this.openPaymentErrorModal();
                    return;
                }

                if (isPaymentReturn && data.payment_status !== 'paid') {
                    this.openPaymentErrorModal();
                }
            } catch (e) {
                console.error('Failed to check payment status', e);

                if (isPaymentReturn) {
                    this.openPaymentErrorModal();
                }
            } finally {
                this.clearPaymentReturnQuery();
            }
        },

        clearPendingPayment() {
            localStorage.removeItem(PENDING_PAYMENT_ORDER_ID_KEY);
        },

        openPaymentSuccessModal() {
            this.paymentResultModal = {
                visible: true,
                success: true,
                title: 'Спасибо за покупку!',
                text: 'Заказ успешно оплачен. Отправка заказов осуществляется еженедельно в понедельник и четверг. По дополнительным вопросам обращайтесь в службу поддержки.',
            };
        },

        openPaymentErrorModal() {
            this.paymentResultModal = {
                visible: true,
                success: false,
                title: 'Оплата не завершена',
                text: 'Мы не получили подтверждение успешной оплаты. Попробуйте снова и, при необходимости, обратитесь в службу поддержки.',
            };
        },

        closePaymentResultModal() {
            this.paymentResultModal.visible = false;
        },

        clearPaymentReturnQuery() {
            const url = new URL(window.location.href);

            if (!url.searchParams.has('payment_return')) {
                return;
            }

            url.searchParams.delete('payment_return');
            window.history.replaceState({}, document.title, url.pathname + url.search);
        },

        goToCatalog() {
            const target = this.$refs.catalogSection;

            if (!target || typeof target.scrollIntoView !== 'function') {
                return;
            }

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }
}
</script>

<style scoped>
.home-slider-item-inner h2 {
    font-size: 120px;
    font-weight: 500;
    line-height: 120px;
    text-align: center;
    text-transform: uppercase;
    color: #fff;
}

.home-slider-item {
    width: 100%;
    height: 801px;
    position: relative;
    background: linear-gradient(90deg, #dd0024, #fb6228);
}

.home-slider-item-img-desc {
    display: block;
}

.home-slider-item-inner {
    width: 100%;
    position: absolute;
    bottom: 70px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
}

@media (max-width: 1024px) {
    .home-slider-item {
        height: 620px;
    }

    .home-slider-item-inner h2 {
        font-size: 72px;
    }
}

@media (max-width: 767px) {
    .home-slider-item {
        height: 520px;
    }

    .home-slider-item-inner {
        bottom: 50px;
        gap: 24px;
    }

    .home-slider-item-inner h2 {
        font-size: 42px;
    }
}
</style>

<style>
.products-gallery .ssr-carousel-dots {
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    margin: 0 !important;
    padding: 0 !important;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    width: max-content;
}

.products-gallery [aria-disabled] > .ssr-carousel-dot-icon {
    background-color: white !important;
}

.products-gallery .ssr-carousel-dot-icon {
    background-color: transparent !important;
    border: 2px solid white !important;
}

.products-gallery .btn-cta {
    background: white !important;
    color: black !important;
    font-weight: 500;
}

.grid {
    position: relative;
    z-index: 1;
    gap: 17px;
}

.grid {
    display: grid;
    grid-template-columns: 1.3fr 1fr 1.2fr;
    height: 100%;
    overflow: hidden;
}

.col {
    overflow: hidden;
    position: relative;
}

.track {
    display: flex;
    flex-direction: column;
    will-change: transform;
}

.track img {
    width: 100%;
    height: 33.333%;
    object-fit: cover;
    margin-bottom: 17px;
}

.track img:last-child {
    margin-bottom: 0;
}

.down .track {
    animation: scrollDown 10s linear infinite;
}

.up .track {
    animation: scrollUp 10s linear infinite;
}

@keyframes scrollDown {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(-50%);
    }
}

@keyframes scrollUp {
    0% {
        transform: translateY(-50%);
    }
    100% {
        transform: translateY(0);
    }
}

.col:nth-child(1) .track { animation-duration: 22s; }
.col:nth-child(2) .track { animation-duration: 25s; }
.col:nth-child(3) .track { animation-duration: 20s; }
</style>
