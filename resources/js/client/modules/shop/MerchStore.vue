<template>
    <div class="tour-store">
        <div class="loader" v-if="loading">
            <div class="loader__dot"></div>
            <div class="loader__dot"></div>
            <div class="loader__dot"></div>
        </div>

        <notifications group="notification" position="top left"/>

        <payment-result-modal
            :is-visible="paymentResultModal.visible"
            :success="paymentResultModal.success"
            @close="closePaymentResultModal"
        />

        <app-header class="hero-section-absolute hero-section_dark" :is-shop="true"></app-header>

        <ssr-carousel class="products-gallery position-relative padding-header-shop" :slides-per-page="1" show-dots>
            <div class="home-slider-item d-flex gap-3">
                <div class="marquee-columns">
                    <div
                        v-for="(slider, index) in sliders"
                        :key="index"
                        class="marquee-column"
                        :class="{ reverse: slider.reverse }"
                    >
                        <div class="marquee-track">
                            <div v-for="(image, idx) in slider.images"
                                :key="'a' + idx"
                                class="marquee-item"
                                :class="image.size">

                                <img
                                    :src="image.src"
                                    loading="eager"
                                    decoding="sync"
                                    draggable="false"
                                />
                            </div>

                            <!-- 🔥 duplicate for seamless loop -->
                            <div
                                v-for="(image, idx) in slider.images"
                                :key="'b' + idx"
                                class="marquee-item"
                                :class="image.size"
                            >
                                <img
                                    :src="image.src"
                                    loading="eager"
                                    decoding="sync"
                                    draggable="false"
                                />
                            </div>

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
import PaymentResultModal from "../../modals/ProductNotificationModal.vue";

import eventBus from "../../../event-bus";


const CART_STORAGE_KEY = "shoppingCart";
const PENDING_PAYMENT_ORDER_ID_KEY = "pendingPaymentOrderId";

const duplicateImages = (images) => [
    ...images,
    ...images,
    ...images,
];

const createSlider = ({
                          images,
                          reverse = false,
                      }) => ({
    images,
    reverse,
});

export default {
    name: "MerchStore",

    components: {
        PaymentResultModal,
        NavigationTabs,
        ProductList,
    },

    data() {
        return {
            loading: true,

            paymentResultModal: {
                visible: false,
                success: false,
                title: "",
                text: "",
            },

            slides: [
                {
                    title: "Наша атрибутика",
                    buttonText: "Перейти в каталог",
                },
                {
                    title: "Новинки",
                    buttonText: "Перейти в каталог",
                },
                {
                    title: "Хиты продаж",
                    buttonText: "Перейти в каталог",
                },
            ],
        };
    },

    computed: {
        sliders() {
            return [
                createSlider({
                    images: [
                        {
                            src: "/img/test3.jpg",
                            size: "large",
                        },
                        {
                            src: "/img/packets/packet-1-bg.png",
                            size: "medium",
                        },
                        {
                            src: "/img/packets/packet-2-bg.png",
                            size: "small",
                        },
                        {
                            src: "/img/test.jpg",
                            size: "large",
                        },
                    ],
                    reverse: true,
                    speed: 6000,
                }),

                createSlider({
                    images: [
                        {
                            src: "/img/test3.jpg",
                            size: "large",
                        },
                        {
                            src: "/img/packets/packet-1-bg.png",
                            size: "medium",
                        },
                        {
                            src: "/img/packets/packet-2-bg.png",
                            size: "small",
                        },
                        {
                            src: "/img/test.jpg",
                            size: "large",
                        },
                    ],
                    speed: 5000,
                }),

                createSlider({
                    images: [
                        {
                            src: "/img/test3.jpg",
                            size: "large",
                        },
                        {
                            src: "/img/packets/packet-1-bg.png",
                            size: "medium",
                        },
                        {
                            src: "/img/packets/packet-2-bg.png",
                            size: "small",
                        },
                        {
                            src: "/img/test.jpg",
                            size: "medium",
                        },
                    ],
                    reverse: true,
                    speed: 6500,
                }),
            ];
        },
    },

    async mounted() {
        await this.restorePaidOrderState();

        this.loaderTimeout = setTimeout(() => {
            this.loading = false;
        }, 800);
    },

    beforeDestroy() {
        clearTimeout(this.loaderTimeout);
    },

    methods: {
        async restorePaidOrderState() {
            const orderId = localStorage.getItem(
                PENDING_PAYMENT_ORDER_ID_KEY
            );

            const url = new URL(window.location.href);

            const isPaymentReturn =
                url.searchParams.get("payment_return") === "1";

            if (!orderId) {
                this.clearPaymentReturnQuery();
                return;
            }

            try {
                const response = await axios.get(
                    `/api/delivery/orders/${orderId}/status`
                );

                const data = response?.data?.data;

                if (!data) {
                    if (isPaymentReturn) {
                        this.clearPendingPayment();
                        this.openPaymentErrorModal();
                    }

                    return;
                }

                if (data.payment_status === "paid") {
                    localStorage.removeItem(CART_STORAGE_KEY);
                    this.clearPendingPayment();
                    eventBus.$emit("cart:cleared");
                    this.openPaymentSuccessModal();
                    return;
                }

                if (data.payment_status === "canceled") {
                    this.clearPendingPayment();
                    this.openPaymentErrorModal();
                    return;
                }

                if (
                    isPaymentReturn &&
                    data.payment_status !== "paid"
                ) {
                    this.openPaymentErrorModal();
                }
            } catch (e) {
                console.error(
                    "Failed to check payment status",
                    e
                );

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
                title: "Спасибо за покупку!",
                text:
                    "Заказ успешно оплачен. " +
                    "Отправка заказов осуществляется " +
                    "еженедельно в понедельник и четверг.",
            };
        },

        openPaymentErrorModal() {
            this.paymentResultModal = {
                visible: true,
                success: false,
                title: "Оплата не завершена",
                text:
                    "Мы не получили подтверждение " +
                    "успешной оплаты.",
            };
        },

        closePaymentResultModal() {
            this.paymentResultModal.visible = false;
        },

        clearPaymentReturnQuery() {
            const url = new URL(window.location.href);

            if (!url.searchParams.has("payment_return")) {
                return;
            }
            url.searchParams.delete("payment_return");
            window.history.replaceState(
                {},
                document.title,
                url.pathname + url.search
            );
        },

        goToCatalog() {
            this.$refs.catalogSection?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        },
    },
};
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
    height: 300px;
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
.products-gallery {
    overflow: hidden;
}

.padding-header-shop {
    padding-top: 108px;
}

.products-gallery .ssr-carousel-dots {
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    margin: 0 !important;
    padding: 0 !important;
    display: flex;
    gap: 8px;
    z-index: 10;
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

.home-slider-item {
    width: 100%;
    height: 720px;
    position: relative;
    background: linear-gradient(
        90deg,
        #dd0024,
        #fb6228
    );
    overflow: hidden;
}

.vertical-swiper {
    height: 720px;
    overflow: hidden;
}

.vertical-swiper:nth-child(1) {
    flex: 1.5;
}

.vertical-swiper:nth-child(2) {
    flex: 1;
}

.vertical-swiper:nth-child(3) {
    flex: 1.3;
}

.vertical-swiper .swiper-wrapper {
    transition-timing-function: linear !important;
}

.vertical-swiper .swiper-slide {
    height: auto !important;
}

.image-wrapper {
    overflow: hidden;
}

.image-wrapper.small {
    height: 220px;
}

.image-wrapper.medium {
    height: 320px;
}

.image-wrapper.large {
    height: 560px;
}

.image-wrapper img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
}

.home-slider-item-inner {
    width: 100%;
    position: absolute;
    left: 50%;
    bottom: 70px;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    z-index: 5;
}

.home-slider-item-inner h2 {
    font-size: 120px;
    line-height: 1;
    font-weight: 500;
    text-transform: uppercase;
    color: white;
    text-align: center;
}

@media (max-width: 1024px) {
    .home-slider-item {
        height: 620px;
    }

    .vertical-swiper {
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

    .vertical-swiper {
        height: 520px;
    }

    .home-slider-item-inner {
        bottom: 50px;
        gap: 24px;
    }

    .home-slider-item-inner h2 {
        font-size: 42px;
    }

    .image-wrapper {
        height: 220px;
    }
}

.marquee-columns {
    display: flex;
    gap: 16px;
    height: 720px;
    overflow: hidden;
}

.marquee-column {
    flex: 1;
    overflow: hidden;
    position: relative;
}

.marquee-track {
    display: flex;
    flex-direction: column;
    gap: 16px;

    animation: scrollUp 18s linear infinite;
    will-change: transform;
}

.marquee-column.reverse .marquee-track {
    animation: scrollDown 18s linear infinite;
}

@keyframes scrollUp {
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(-50%);
    }
}

@keyframes scrollDown {
    from {
        transform: translateY(-50%);
    }
    to {
        transform: translateY(0);
    }
}

.marquee-item {
    overflow: hidden;
}

.marquee-item.small {
    height: 180px;
}

.marquee-item.medium {
    height: 280px;
}

.marquee-item.large {
    height: 420px;
}

.marquee-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;

    transform: translateZ(0);
}
</style>
