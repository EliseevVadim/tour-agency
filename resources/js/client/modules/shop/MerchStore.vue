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

        <app-header
            class="hero-section-absolute hero-section_dark"
            :is-shop="true"
        />

        <section class="products-hero padding-header-shop">
            <div class="home-slider-item">
                <swiper v-if="!isMobileVersion" key="desktop-merch-swiper"
                    :options="swiperProductOptions" class="desktop-merch-swiper">
                    <swiper-slide v-for="(slide, slideIndex) in desktopSlides" :key="'desktop-slide-' + slideIndex">
                        <div class="merch-grid">
                            <div v-for="(image, imageIndex) in slide" :key="image">
                                <img :src="image" alt=""
                                    :loading="slideIndex === 0 ? 'eager' : 'lazy'"
                                    :fetchpriority="slideIndex === 0 && imageIndex === 0 ? 'high' : 'auto'"
                                    decoding="async">
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>

                <swiper v-else key="mobile-merch-swiper"
                    :options="mobileSwiperProductOptions" class="mobile-merch-swiper">
                    <swiper-slide v-for="(image, idx) in productImages" :key="'mobile-merch-image-' + idx">
                        <div class="mobile-merch-image">
                            <img :src="image" :alt="'Вид-' + idx" loading="eager"
                                 :fetchpriority="idx === 0 ? 'high' : 'auto'"
                                 decoding="async">
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </section>

        <main ref="catalogSection" class="content-wrapper container-xl">
            <section class="category-filters">
                <NavigationTabs/>
            </section>

            <ProductList/>
        </main>

        <app-footer/>
    </div>
</template>

<script>
import ProductList from "./components/ProductList.vue";
import NavigationTabs from "./components/NavigationTabs.vue";
import PaymentResultModal from "../../modals/ProductNotificationModal.vue";

import eventBus from "../../../event-bus";

const CART_STORAGE_KEY = "shoppingCart";
const PENDING_PAYMENT_ORDER_ID_KEY = "pendingPaymentOrderId";

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

            swiperProductOptions: {
                direction: "vertical",
                slidesPerView: 1,
                mousewheel: false,
                allowTouchMove: false,
                loop: true,
                speed: 1200,
                autoHeight: true,
                observer: true,
                observeParents: true,
                autoplay: {
                    delay: 3500,
                    disableOnInteraction: false,
                },
                simulateTouch: false,
            },

            mobileSwiperProductOptions: {
                direction: "vertical",
                slidesPerView: 1,
                loop: true,
                speed: 1600,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                    waitForTransition: true,
                },
                observer: true,
                observeParents: true,
                mousewheel: false,
                allowTouchMove: false,
                simulateTouch: false,
            },

            desktopSlides: [
                [
                    "/img/merch/pc/1.jpg",
                    "/img/merch/pc/2.jpg",
                    "/img/merch/pc/3.jpg",
                    "/img/merch/pc/8.jpg",
                    "/img/merch/pc/7.jpg",
                    "/img/merch/pc/4.jpg",
                    "/img/merch/pc/5.jpg",
                    "/img/merch/pc/6.jpg",
                    "/img/merch/pc/9.jpg",
                    "/img/merch/pc/10.jpg",
                ],
                [
                    "/img/merch/pc/12.jpg",
                    "/img/merch/pc/11.jpg",
                    "/img/merch/pc/13.jpg",
                    "/img/merch/pc/9.jpg",
                    "/img/merch/pc/15.jpg",
                    "/img/merch/pc/3.jpg",
                    "/img/merch/pc/16.jpg",
                    "/img/merch/pc/2.jpg",
                    "/img/merch/pc/17.jpg",
                    "/img/merch/pc/18.jpg",
                ],
                [
                    "/img/merch/pc/20.jpg",
                    "/img/merch/pc/27.jpg",
                    "/img/merch/pc/21.jpg",
                    "/img/merch/pc/28.jpg",
                    "/img/merch/pc/22.jpg",
                    "/img/merch/pc/23.jpg",
                    "/img/merch/pc/29.jpg",
                    "/img/merch/pc/24.jpg",
                    "/img/merch/pc/30.jpg",
                    "/img/merch/pc/25.jpg",
                ],
            ],

            productImages: [
                "/img/merch/1.png",
                "/img/merch/2.png",
                "/img/merch/3.png",
                "/img/merch/4.png",
                "/img/merch/5.png",
            ],

            screenWidth: window.innerWidth,
        };
    },

    computed: {
        isMobileVersion() {
            return this.screenWidth <= 559.98;
        },
    },

    methods: {
        handleResize() {
            this.screenWidth = window.innerWidth;
        },

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
                console.error("Failed to check payment status", e);

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
    },

    async mounted() {
        window.addEventListener("resize", this.handleResize);

        await this.restorePaidOrderState();

        this.loaderTimeout = setTimeout(() => {
            this.loading = false;
        }, 800);
    },

    beforeDestroy() {
        window.removeEventListener("resize", this.handleResize);
        clearTimeout(this.loaderTimeout);
    },
};
</script>

<style scoped>
.merch-image {
    opacity: 0;
    transform: scale(1.03);
    transition:
        opacity 0.8s ease,
        transform 1.2s ease;
    will-change: opacity, transform;
}

.swiper-slide-active .merch-image {
    opacity: 1;
    transform: scale(1);
}

.swiper-slide-prev .merch-image,
.swiper-slide-next .merch-image {
    opacity: 0;
    transform: scale(1.03);
}

.products-hero {
    overflow: hidden;
}

.home-slider-item {
    width: 100%;
    min-height: 0;
    height: auto;
    position: relative;
    background: linear-gradient(90deg, #dd0024, #fb6228);
    overflow: hidden;
}

.desktop-merch-swiper,
.mobile-merch-swiper {
    pointer-events: none;
}

.desktop-merch-swiper {
    width: 100%;
}

.desktop-merch-swiper .swiper-container,
.desktop-merch-swiper .swiper-wrapper,
.desktop-merch-swiper .swiper-slide {
    height: auto !important;
}

.desktop-merch-swiper .swiper-slide {
    display: flex;
}

.desktop-merch-swiper .swiper-slide > * {
    width: 100%;
}

.mobile-merch-swiper {
    width: 100%;
}

.mobile-merch-swiper .swiper-container,
.mobile-merch-swiper .swiper-wrapper,
.mobile-merch-swiper .swiper-slide {
    height: auto !important;
}

.mobile-merch-swiper .swiper-slide {
    display: flex;
}

.mobile-merch-swiper .swiper-slide > * {
    width: 100%;
}

.padding-header-shop {
    padding-top: 108px;
}

@media (max-width: 576.98px) {
    .padding-header-shop {
        padding-top: 80px;
    }
}

.merch-grid {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    background: white;
}

.merch-grid > div {
    aspect-ratio: 1 / 1;
    overflow: hidden;
}

.merch-grid img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
}

@media (min-width: 560px) and (max-width: 991.98px) {
    .merch-grid {
        grid-template-columns: repeat(4, 1fr);
    }

    .merch-grid > div:nth-last-child(-n + 2) {
        display: none;
    }
}

.mobile-merch-image {
    width: 100%;
    height: auto;
    background: white;
}

.mobile-merch-image img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: contain;
}

@media (max-width: 559.98px) {
    .mobile-merch-swiper {
        width: 100%;
        height: calc(100vw * 588 / 466);
        overflow: hidden;
        background: white;
    }

    .mobile-merch-swiper .swiper-container,
    .mobile-merch-swiper .swiper-wrapper,
    .mobile-merch-swiper .swiper-slide {
        width: 100%;
        height: 100% !important;
    }

    .mobile-merch-swiper .swiper-wrapper {
        transition-timing-function: ease-in-out !important;
    }

    .mobile-merch-swiper .swiper-slide {
        display: flex;
        align-items: flex-start;
        justify-content: center;
    }

    .mobile-merch-image {
        width: 100%;
        height: 100%;
        background: white;
        overflow: hidden;
    }

    .mobile-merch-image img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: contain;
        object-position: top center;
    }
}
</style>
