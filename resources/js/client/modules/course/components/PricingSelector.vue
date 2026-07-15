<template>
    <section class="pricing-selector container container-xl">
        <pre-order-modal class="pre-order-modal"></pre-order-modal>
        <div class="pricing-section">
            <div class="pricing-left">
                <p class="course-description">
                    Каждый модуль — это продуманный шаг к твоему профессиональному росту и успешной карьере в мире
                    туризма.
                </p>
                <div class="d-flex d-sm-none pricing-right">
                    <div class="pricing-certificate">
                        <div class="pricing-certificate-container">
                            <img class="logo" src="/img/logo-red.png" alt="logo">
                            <p class="certificate-title">СЕРТИФИКАТ</p>
                        </div>
                    </div>
                </div>
                <p class="course-description">
                    Кроме того, выпускники курса получат <span class="fw-bold">сертификат.</span> Пройди наш курс и
                    открой для себя мир безграничных возможностей!
                </p>
            </div>
            <div class="d-none d-sm-block pricing-right">
                <div class="pricing-certificate">
                    <div class="pricing-certificate-container">
                        <img class="logo" src="/img/logo-red.png" alt="logo">
                        <p class="certificate-title">СЕРТИФИКАТ</p>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="!isLoading && packageData.length > 0" class="select-course-section position-relative">
            <div class="person-wrapper">
                <div class="course-persons">
                    <img src="/img/packets/course-persons.png" alt="course persons">
                </div>
                <div class="timer-course">
                    <h2 class="title-course text-center">До старта осталось:</h2>
                    <div class="timer text-center">
                        <p>{{ formattedTime }}</p>
                    </div>
                    <h2 class="mt-0 mt-lg-3 text-center title-course">ВЫБЕРИ СВОЙ <br class="d-block d-xl-none">ПАКЕТ:
                    </h2>
                </div>
            </div>

            <div v-for="pkg in packageData" :key="pkg.id" class="package-container position-relative"
                 :id="pkg.id + '-section'"
                 :class="{ 'expanded': expandedPackage === pkg.id }" :ref="`package_${pkg.id}`"
                 :aria-hidden="expandedPackage !== pkg.id ? 'true' : null">
                <div class="package-card mb-4"
                     :class="{ 'expanded': expandedPackage === pkg.id }">
                    <div class="d-flex align-items-center" @click="togglePackage(pkg.id)">
                        <div class="col-md-5 package-image"
                             :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${pkg.imagePlaceholder})` }">
                            <h2 class="package-title">ПАКЕТ <span class="fw-bolder">"{{ pkg.name }}"</span></h2>
                        </div>

                        <div class="package-info-content w-100">
                            <p class="package-description">
                                {{ pkg.description }}
                            </p>
                            <div :class="{'animate-down': expandedPackage !== pkg.id}">
                                <div class="d-flex flex-column" v-if="expandedPackage !== pkg.id">
                                    <span class="arrow-css unu"></span>
                                    <span class="arrow-css doi"></span>
                                    <span class="arrow-css trei"></span>
                                </div>

                                <svg v-if="expandedPackage === pkg.id" class="scroll-arrow arrow-up"
                                     viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                          d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div v-if="expandedPackage === pkg.id"
                         class="package-details-container position-relative cursor-auto">
                        <div class="details-content">
                            <p class="mb-4">{{ pkg.details.intro }}</p>
                            <p v-if="pkg.details.restriction && pkg.id !== 'mini'" class="restriction-text">
                                {{ pkg.details.restriction }}</p>

                            <h4 v-if="pkg.id === 'mini'"
                                class="details-subtitle fw-bold">
                                Этот пакет отлично подходит для тех, кто хочет:
                            </h4>
                            <ul class="list-unstyled benefits-list">
                                <li v-for="(benefit, index) in pkg.details.suitsFor" :key="index"
                                    class="benefits-item d-flex align-items-center">
                                    <img :src="benefit.icon" class="benefit-icon" :alt="'icon-benefit-'+index"/>
                                    <div class="benefit-text">
                                        <h3 class="fw-bold" v-if="benefit.description">{{ benefit.title }}</h3>
                                        <p class="benefit-description"
                                           v-html="!benefit.description ? benefit.title : benefit.description"></p>
                                    </div>
                                </li>
                                <template v-if="pkg.details.bonuses">
                                    <li class="mb-0">
                                        <div class="gradient-divider"></div>
                                    </li>
                                    <li class="mb-4 text-center">
                                        <h2>Бонусы</h2>
                                    </li>
                                    <li v-for="(bonus, index) in pkg.details.bonuses" :key="'bonus-' + index"
                                        class="benefits-item d-flex align-items-center">
                                        <img :src="bonus.icon" class="benefit-icon" :alt="'icon-benefit-'+index"/>
                                        <div class="benefit-text">
                                            <h3 class="fw-bold" v-if="bonus.description">{{ bonus.title }}</h3>
                                            <p class="benefit-description">
                                                {{ !bonus.description ? bonus.title : bonus.description }}
                                            </p>
                                        </div>
                                    </li>
                                </template>
                            </ul>

                            <p v-if="pkg.details.restriction && pkg.id === 'mini'" class="restriction-text mb-5">
                                {{ pkg.details.restriction }}</p>
                            <p v-if="pkg.details.summary" class="summary-text" v-html="pkg.details.summary"></p>
                        </div>
                    </div>
                </div>
                <div v-if="expandedPackage === pkg.id"
                     class="btn-container d-flex flex-column justify-content-center text-center">
                    <button v-if="pkg.id !== 'maxi'" class="btn btn-cta btn-price" :class="pkg.id === 'opti' ? 'btn-glow' : ''" @click="goToPayment(pkg.id)">
                        <span class="flare"></span>
                        {{ pkg.id !== 'maxi' ? pkg.details.buttonText : 'ПОЛУЧИТЬ ПРЕЗЕНТАЦИЮ' }}
                    </button>
                    <div v-if="pkg.id !== 'maxi'" class="mark-price">
                        <span class="price-old text-decoration-line-through fw-medium">{{
                                pkg.details.priceOld
                            }} р</span>
                        <span class="price-new">{{ pkg.details.priceNew }} р</span>
                    </div>
                    <button v-if="pkg.id === 'maxi'" data-bs-toggle="modal" data-bs-target="#orderModal"
                            class="btn btn-cta btn-price"
                            :data-bs-id="pkg.id"
                            :data-bs-name="pkg.name"
                            :data-bs-price="finalPrice"
                            :data-bs-original-price="pkg.details.priceNew"
                            :data-bs-bg="pkg.imageThumbnail"
                            :data-bs-promo-id="promoCodeId"
                            :data-bs-promo-code="promoCode"
                            :data-bs-promo-status="promoStatus"
                            :data-bs-ref-url="refId"
                            :data-bs-promo-message="promoMessage"
                            :data-bs-promo-type="discountDetails ? discountDetails.type : null"
                            :data-bs-promo-value="discountDetails ? discountDetails.value : null">
                        <span class="flare"></span>
                        {{ pkg.id != 'maxi' ? pkg.details.buttonText : 'ПОЛУЧИТЬ ПРЕЗЕНТАЦИЮ' }}
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import PreOrderModal from "../../../modals/PreOrderModal.vue";
import axios from "axios";

export default {
    components: {PreOrderModal},
    data() {
        return {
            expandedPackage: 'opti',
            packageData: [
                {
                    id: 'mini',
                    name: 'МИНИ',
                    description: 'это идеальный вариант для тех, кто хочет освоить базовые навыки работы в туризме, но без дополнительных привилегий.',
                    imagePlaceholder: '/img/packets/packet-2-bg.png',
                    imageThumbnail: '/img/packets/packet-1-bg-small.jpg',
                    details: {
                        intro: 'Он включает в себя все девять модулей нашего курса, давая тебе полное понимание туристической индустрии и необходимых практических знаний.',
                        restriction: 'Однако в пакете "Мини" не предусмотрены доступ к закрытому клубу, наставникам и кураторам, а также сертификация по завершении курса.',
                        suitsFor: [
                            {icon: '/img/packets/icons/1.png', title: 'Освоить азы работы турагента.'},
                            {
                                icon: '/img/packets/icons/2.png',
                                title: 'Научиться бронировать путешествия для себя и своих близких.'
                            },
                            {
                                icon: '/img/packets/icons/3.png',
                                title: 'Получать выгодные цены на туры и путешествия, не прибегая к услугам агентств.'
                            }
                        ],
                        summary: '<b>С пакетом "Мини"</b> ты получишь все ключевые знания и инструменты для организации путешествий с максимальной выгодой для себя, открывая мир путешествий на совершенно новом уровне.',
                        priceOld: 9000,
                        priceNew: 7000,
                        buttonText: 'УТОЧНИТЬ СТОИМОСТЬ'
                    }
                }, {
                    id: 'opti',
                    name: 'ОПТИ',
                    description: 'это твой полный путь к успеху в мире туризма!',
                    imagePlaceholder: '/img/packets/packet-1-bg.png',
                    imageThumbnail: '/img/packets/packet-2-bg-small.jpg',
                    details: {
                        intro: 'Этот пакет включает в себя все ключевые элементы для твоего профессионального роста и предоставляет уникальные возможности:',
                        restriction: null,
                        suitsFor: [
                            {
                                icon: '/img/packets/icons/4.png',
                                title: 'Все девять модулей курса',
                                description: 'Ты получаешь доступ к модулям, которые охватывают все аспекты туристической индустрии, от основ до практических навыков, которые помогут стать настоящим экспертом.'
                            },
                            {
                                icon: '/img/packets/icons/5.png',
                                title: 'Закрытый клуб',
                                description: 'Становишься частью закрытого клуба, где сможешь общаться с коллегами, обмениваться опытом и получать дополнительные советы от опытных профессионалов отрасли.'
                            },
                            {
                                icon: '/img/packets/icons/6.png',
                                title: 'Общение с кураторами',
                                description: 'Наши кураторы всегда будут рядом, готовые поддержать и помочь на протяжении всего курса, отвечая на твои вопросы и направляя в нужном направлении.'
                            },
                            {
                                icon: '/img/packets/icons/7.png',
                                title: 'Общение с наставниками',
                                description: 'Ты будешь работать с наставниками, которые помогут тебе раскрыть твой потенциал, делиться практическими знаниями и обеспечат поддержку на всех этапах развития.'
                            }
                        ],
                        bonuses: [
                            {
                                icon: '/img/packets/icons/9.png',
                                title: 'Сертификат о прохождении курса',
                                description: 'По завершении курса ты получишь официальный сертификат, который станет подтверждением твоих знаний и навыков в сфере туризма.'
                            },
                            {
                                icon: '/img/packets/icons/10.png',
                                title: 'Возможность работы менеджером в туристической компании "В ПУТЬ"',
                                description: 'После успешного завершения курса ты получишь шанс работать менеджером в нашей туристической компании, что станет отличным стартом для твоей карьеры в туризме.'
                            },
                            {
                                icon: '/img/packets/icons/12.png',
                                title: 'Доступ 365 дней',
                                description: 'Наш курс рассчитан на 30 дней, но мы предоставляем доступ к материалам на целый год для закрепления знаний.'
                            }
                        ],
                        summary: '<b>Пакет "Опти"</b> – это не просто курс, это комплексная информация, которая необходима для работы в мир туризма!',
                        priceOld: 18000,
                        priceNew: 14000,
                        buttonText: 'УТОЧНИТЬ СТОИМОСТЬ'
                    }
                }, {
                    id: 'maxi',
                    name: 'МАКСИ',
                    description: 'это полный и уникальный набор возможностей для твоего профессионального роста и сфере туризма!',
                    imagePlaceholder: '/img/packets/packet-3-bg.png',
                    imageThumbnail: '/img/packets/packet-3-bg-small.jpg',
                    details: {
                        intro: 'Это готовый бизнес под ключ, который включает в себя наш авторский курс и, что самое важное, нашу франшизу.',
                        restriction: null,
                        suitsFor: [
                            {
                                icon: '/img/packets/icons/8.png',
                                title: 'Полный курс',
                                description: "Ты получаешь доступ к пакету \"Опти\", который включает все " +
                                    "необходимые знания и навыки для успешной работы в мире туризма!"
                            },
                            {
                                icon: '/img/packets/icons/13.png',
                                title: 'Доступ к онлайн-вебинарам от партнеров',
                                description: 'Пакет также включает доступ к эксклюзивным онлайн вебинарам от наших партнеров — лидеров индустрии, что расширяет твои горизонты и открывает новые возможности.'
                            },
                            {
                                icon: '/img/packets/icons/11.png',
                                title: 'Возможность работы с нами по франшизе',
                                description: "Ты получаешь уникальную возможность открыть свой собственный бизнес по медиа франшизе туристической компании <b>«В ПУТЬ»</b>\n" +
                                    "Мы предоставим тебе все необходимые инструменты и поддержку для успешного старта твоего бизнеса!"
                            }
                        ],
                        summary: '<b>Пакет "Макси"</b> – это полное погружение в мир туризма с возможностью стать частью нашей крупнейшей сети и начать собственный бизнес с поддержкой.',
                        priceOld: 45000,
                        priceNew: 37000,
                        buttonText: 'ПОЛУЧИТЬ ПРЕЗЕНТАЦИЮ'
                    }
                }],
            isLoading: true,
            refId: null,
            refCode: null,
            promoCode: null,
            promoCodeId: null,
            promoStatus: null, // 'loading', 'allowed', 'denied', 'error'
            promoMessage: null,
            discountDetails: null, // { type: 'percent' | 'fixed', value: number }
            INITIAL_TIME_SECONDS: 129600,
            time: 0,
            interval: null,
            isRunning: false,
        };
    },
    computed: {
        formattedTime() {
            const totalSeconds = this.time;

            if (totalSeconds <= 0) {
                return "00:00:00:00";
            }

            const secondsInDay = 24 * 60 * 60;
            const days = Math.floor(totalSeconds / secondsInDay);

            const remainingSecondsAfterDays = totalSeconds % secondsInDay;

            const hours = Math.floor(remainingSecondsAfterDays / 3600);
            const minutes = Math.floor((remainingSecondsAfterDays % 3600) / 60);
            const seconds = Math.floor(remainingSecondsAfterDays % 60);

            return `${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        },
        currentPackage() {
            return this.packageData.find(pkg => pkg.id === this.expandedPackage) || this.packageData[1];
        },
        priceNewUnformatted() {
            return this.currentPackage.details.priceNew;
        },
        finalPrice() {
            if (this.promoStatus === 'allowed' && this.discountDetails) {
                const {type, value} = this.discountDetails;
                const original = this.priceNewUnformatted;
                let finalPrice = original;

                if (type === 'percent') {
                    finalPrice = original * (1 - value / 100);
                } else if (type === 'fixed') {
                    finalPrice = original - value;
                }
                return Math.round(finalPrice * 100) / 100;
            }
            return this.priceNewUnformatted;
        }
    },
    methods: {
        saveTime() {
            localStorage.setItem('countdownTimeLeft', this.time);
        },

        startCountdown() {
            if (this.isRunning || this.time <= 0) return;

            this.isRunning = true;
            this.interval = setInterval(() => {
                if (this.time > 0) {
                    this.time--;
                    this.saveTime();
                } else {
                    this.stopCountdown();
                }
            }, 1000);
        },

        stopCountdown() {
            if (this.interval) {
                clearInterval(this.interval);
                this.interval = null;
                this.isRunning = false;
            }
            localStorage.removeItem('countdownTimeLeft');
        },

        togglePackage(packageId) {
            const isCurrentlyExpanded = this.expandedPackage === packageId;
            this.expandedPackage = isCurrentlyExpanded ? null : packageId;

            this.$nextTick(() => {
                const refKey = `package_${packageId}`;
                const pkgRefs = this.$refs[refKey];

                if (pkgRefs && pkgRefs.length > 0 && pkgRefs[0] instanceof Element) {
                    pkgRefs[0].scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                }

                if (!isCurrentlyExpanded && this.promoCode) {
                    this.checkPromoCode();
                }
            });
        },
        togglePackageFromGallery(packageId) {
            const wasExpanded = this.expandedPackage === packageId;

            if (!wasExpanded) {
                this.expandedPackage = packageId;
            }
            this.$nextTick(() => {
                const refKey = `package_${packageId}`;
                const pkgRefs = this.$refs[refKey];

                if (pkgRefs && pkgRefs.length > 0 && pkgRefs[0] instanceof Element) {
                    pkgRefs[0].scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                }
            });
        },
        getCourses() {
            axios.get("/api/courses").then((response) => {
                const packagesObject = response.data.packages;

                if (typeof packagesObject !== 'object' || packagesObject === null) {
                    console.error("API вернул невалидные данные пакетов.");
                    return;
                }
                const expectedOrder = ['mini', 'opti', 'maxi'];

                expectedOrder.forEach((key, index) => {
                    const pkgData = packagesObject[key] ?? null;

                    if (pkgData) {
                        this.packageData[index].id = pkgData.id;
                        this.packageData[index].name = pkgData.name;

                        this.packageData[index].details.priceOld = pkgData.priceOld;
                        this.packageData[index].details.priceNew = pkgData.priceNew;
                        this.packageData[index].details.buttonText = pkgData.buttonText || 'УТОЧНИТЬ СТОИМОСТЬ';
                    }
                });

                if (this.promoCode) {
                    this.checkPromoCode();
                }

            }).finally(() => {
                this.isLoading = false;
            })
        },
        getPromocodeFromUrl() {
            const urlParams = new URLSearchParams(window.location.search);
            this.promoCode = urlParams.get('promo');

            if (this.promoCode && !this.isLoading) {
                this.checkPromoCode();
            }
        },
        async checkPromoCode() {
            if (!this.promoCode) return;

            this.discountDetails = null;
            this.promoCodeId = null;
            this.promoStatus = 'loading';
            this.promoMessage = 'Проверка промокода...';

            const currentId = this.currentPackage.id;

            try {
                const response = await axios.post('/api/check-promo-code', {
                    code: this.promoCode,
                    package_id: currentId
                });

                this.promoStatus = response.data.status;

                if (this.promoStatus === 'allowed') {
                    this.discountDetails = response.data.discount_info;
                    this.promoCodeId = response.data.promo_id;
                    this.promoMessage = response.data.message || 'Промокод успешно применен!';
                }

            } catch (error) {
                this.promoStatus = 'error';
                this.promoMessage = 'Не удалось проверить промокод.';
                this.discountDetails = null;
                this.promoCodeId = null;
            }
        },
        getRefFromUrl() {
            this.isLoading = false
            const urlParams = new URLSearchParams(window.location.search);
            const refCode = urlParams.get('ref');

            if (refCode && !this.isLoading) {
                this.applyReferralCode(refCode);
            }
        },
        async applyReferralCode(refCode) {
            this.isLoading = true;
            try {
                const response = await axios.post('/api/apply-referral', {
                    ref_code: refCode
                });
                this.refId = response.data.ref_id;
                this.refCode = response.data.ref_code;
            } catch (error) {
                console.error('Ошибка применения реферального кода:', error.response ? error.response.data.message : 'Ошибка сети');
            } finally {
                this.isLoading = false;
            }
        },
        goToPayment(pkgId) {
            let baseUrl = '';
            if (pkgId === 'opti') {
                baseUrl = 'https://courses.putclub.ru/pay_opti';
            } else if (pkgId === 'mini') {
                baseUrl = 'https://courses.putclub.ru/pay_mini';
            }

            let params = '';
            if (this.refCode) {
                params = `?utm_medium=${this.refCode}`;
            }
            window.location.href = baseUrl + '/' + params;
        }
    },
    mounted() {
        this.getCourses();
        this.getPromocodeFromUrl();
        this.getRefFromUrl();

        const orderModal = document.getElementById('orderModal');
        if (orderModal) {
            orderModal.addEventListener('show.bs.modal', event => {
                const button = event.relatedTarget;

                const id = button.getAttribute('data-bs-id');
                const name = button.getAttribute('data-bs-name');
                const finalPrice = button.getAttribute('data-bs-price');
                const originalPrice = button.getAttribute('data-bs-original-price');
                const bgUrl = button.getAttribute('data-bs-bg');

                const urlForRef = button.getAttribute('data-bs-ref-url');

                const promoStatus = button.getAttribute('data-bs-promo-status');
                const promoMessage = button.getAttribute('data-bs-promo-message');
                const promoType = button.getAttribute('data-bs-promo-type');
                const promoValue = button.getAttribute('data-bs-promo-value');
                const promoId = button.getAttribute('data-bs-promo-id');

                const modalIdInput = orderModal.querySelector('.idCourse');
                const modalTitleSpan = orderModal.querySelector('.package-title .fw-bolder');
                const modalPriceP = orderModal.querySelector('.package-price .price');

                if (modalIdInput) modalIdInput.value = id;
                if (modalTitleSpan) modalTitleSpan.textContent = ` "${name}"`;
                if (modalPriceP) modalPriceP.textContent = `${finalPrice} р`;

                this.currentPackageId = id;
                this.currentPackageName = name;
                this.currentPackagePrice = finalPrice;
                this.originalPrice = parseFloat(originalPrice) || 0;
                this.currentPackageBg = bgUrl ? `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url("${bgUrl}") no-repeat center center / cover` : '';

                this.promoCodeId = promoId;
                this.promoStatus = promoStatus;
                this.promoMessage = promoMessage;
                this.refId = urlForRef;

                if (promoStatus === 'allowed' && promoType && promoValue) {
                    this.discountDetails = {
                        type: promoType,
                        value: parseFloat(promoValue)
                    };
                } else {
                    this.discountDetails = null;
                }
            });
        }

        const savedTime = localStorage.getItem('countdownTimeLeft');

        if (savedTime !== null) {
            const parsedTime = parseInt(savedTime, 10);
            if (parsedTime > 0 && parsedTime <= this.INITIAL_TIME_SECONDS) {
                this.time = parsedTime;
            } else {
                this.time = this.INITIAL_TIME_SECONDS;
            }
        } else {
            this.time = this.INITIAL_TIME_SECONDS;
        }

        this.startCountdown();
    },
}
</script>
<style scoped>
.gradient-divider {
    height: 2px;
    width: 100%;
    display: block;
    background: linear-gradient(to right, #dd0024, #fb6228);
    margin-bottom: 25px;
}

.btn-price {
    font-size: 22px;
}
</style>
