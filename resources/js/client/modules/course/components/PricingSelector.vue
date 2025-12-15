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
                <h2 class="title-course text-center">ВЫБЕРИ СВОЙ ПАКЕТ:</h2>
            </div>

            <div v-for="pkg in packageData" :key="pkg.id" class="package-container position-relative"
                 :class="{ 'expanded': expandedPackage === pkg.id }" :ref="`package_${pkg.id}`">
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
                            <svg class="scroll-arrow" :class="expandedPackage === pkg.id ? 'arrow-up' : 'arrow-down'"
                                 viewBox="0 0 24 24">
                                <path fill="currentColor"
                                      d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
                            </svg>
                        </div>
                    </div>
                    <div v-if="expandedPackage === pkg.id"
                         class="package-details-container position-relative cursor-auto">
                        <div class="details-content">
                            <p class="mb-4">{{ pkg.details.intro }}</p>
                            <p v-if="pkg.details.restriction" class="restriction-text">{{ pkg.details.restriction }}</p>

                            <h4 v-if="pkg.id === 1"
                                class="details-subtitle fw-bold">
                                Этот пакет отлично подходит для тех, кто хочет:
                            </h4>
                            <ul class="list-unstyled benefits-list">
                                <li v-for="(benefit, index) in pkg.details.suitsFor" :key="index" class="benefits-item d-flex align-items-center">
                                    <img :src="benefit.icon" class="benefit-icon" :alt="'icon-benefit-'+index"/>
                                    <div class="benefit-text">
                                        <h3 class="fw-bold" v-if="benefit.description">{{ benefit.title }}</h3>
                                        <p class="benefit-description">
                                            {{ !benefit.description ? benefit.title : benefit.description }}
                                        </p>
                                    </div>
                                </li>
                            </ul>

                            <p v-if="pkg.details.summary" class="summary-text" v-html="pkg.details.summary"></p>
                        </div>
                    </div>
                </div>
                <div v-if="expandedPackage === pkg.id"
                     class="btn-container d-flex flex-column justify-content-center text-center">
                    <button data-bs-toggle="modal" data-bs-target="#orderModal" class="btn btn-cta btn-price"
                            :disabled="isDisabled" :data-bs-id="pkg.id"
                            :data-bs-name="pkg.name" :data-bs-price="pkg.details.priceNew">
                        {{ pkg.details.buttonText }}
                    </button>
                    <div class="mark-price">
                        <span class="price-old text-decoration-line-through fw-medium">{{
                                pkg.details.priceOld
                            }} р</span>
                        <span class="price-new">{{ pkg.details.priceNew }} р</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import PreOrderModal from "../../../modals/PreOrderModal.vue";

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
                    details: {
                        intro: 'Он включает в себя все девять модулей нашего курса, давая тебе полное понимание туристической индустрии и необходимых практических знаний.',
                        restriction: 'Однако в пакете "Мини" не предусмотрены доступ к закрытому клубу, наставникам и кураторам, а также сертификация по завершении курса.',
                        suitsFor: [
                            {icon: '/img/packets/icons/1.png', title: 'Освоить азы работы турагента.'},
                            {icon: '/img/packets/icons/2.png', title: 'Научиться бронировать путешествия для себя и своих близких.'},
                            {icon: '/img/packets/icons/3.png', title: 'Получать выгодные цены на туры и путешествия, не прибегая к услугам агентств.'}
                        ],
                        summary: '<b>С пакетом "Мини"</b> ты получишь все ключевые знания и инструменты для организации путешествий с максимальной выгодой для себя, открывая мир путешествий на совершенно новом уровне.',
                        priceOld: 9000,
                        priceNew: 7000,
                        buttonText: 'ПОЛУЧИТЬ ДОСТУП'
                    }
                }, {
                    id: 'opti',
                    name: 'ОПТИ',
                    description: 'это твой полный путь к успеху в мире туризма!',
                    imagePlaceholder: '/img/packets/packet-1-bg.png',
                    details: {
                        intro: 'Этот пакет включает в себя все ключевые элементы для твоего профессионального роста и предоставляет уникальные возможности:',
                        restriction: null,
                        suitsFor: [
                            {
                                icon: '/img/packets/icons/4.png',
                                title: 'Все девять модулей курса',
                                description: 'Ты получаешь доступ ко всем девяти модулям, которые охватывают все аспекты туристической индустрии, от основ до практических навыков, которые помогут стать настоящим экспертом.'
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
                            },
                            {
                                icon: '/img/packets/icons/8.png',
                                title: 'Доступ к онлайн-вебинарам от партнеров',
                                description: 'Пакет также включает доступ к эксклюзивным онлайн вебинарам от наших партнеров — лидеров индустрии, что расширяет твои горизонты и открывает новые возможности.'
                            },
                            {
                                icon: '/img/packets/icons/9.png',
                                title: 'Сертификат о прохождении курса',
                                description: 'По завершении курса ты получишь официальный сертификат, который станет подтверждением твоих знаний и навыков в сфере туризма.'
                            },
                            {
                                icon: '/img/packets/icons/10.png',
                                title: 'Возможность работы менеджером в туристической компании "В ПУТЬ"',
                                description: 'После успешного завершения курса ты получишь шанс работать менеджером в нашей туристической компании, что станет отличным стартом для твоей карьеры в туризме.'
                            }
                        ],
                        summary: '<b>Пакет "Опти"</b> – это не просто курс, это комплексная подготовка, которая откроет перед тобой все двери в мир туризма!',
                        priceOld: 18000,
                        priceNew: 14000,
                        buttonText: 'ПОЛУЧИТЬ ДОСТУП'
                    }
                }, {
                    id: 'maxi',
                    name: 'МАКСИ',
                    description: 'это полный и уникальный набор возможностей для твоего профессионального роста и сфере туризма!',
                    imagePlaceholder: '/img/packets/packet-3-bg.png',
                    details: {
                        intro: 'Этот пакет нашего курса, предоставляет тебе доступ к самым ценным и эксклюзивным материалам и услугам.',
                        restriction: null,
                        suitsFor: [
                            {
                                icon: '/img/packets/icons/4.png',
                                title: 'Все девять модулей курса',
                                description: "Ты получаешь доступ ко всем 9 модулям нашего курса, которые помогут тебе освоить основы туризма, от правовых аспектов до маркетинга и продаж. Всё, что необходимо для успешной карьеры в этой отрасли, — в одном пакете!"
                            },
                            {
                                icon: '/img/packets/icons/5.png',
                                title: 'Закрытый премиум-клуб',
                                description: "Для наших самых амбициозных участников мы предлагаем премиум-клуб, где ты получишь дополнительные привилегии: персонализированные консультации, доступ к эксклюзивным материалам и уникальным возможностям для карьерного роста."
                            },
                            {
                                icon: '/img/packets/icons/6.png',
                                title: 'Общение с наставниками',
                                description: "Ты будешь общаться с опытными наставниками, которые помогут тебе на каждом этапе курса. Получи ценные советы, направляющие твой путь и делая его максимально успешным."
                            },
                            {
                                icon: '/img/packets/icons/7.png',
                                title: 'Общение с кураторами',
                                description: "Наши кураторы всегда будут рядом, чтобы поддержать тебя и ответить на все вопросы, возникающие в процессе курса. Мы не просто обучаем, мы заботимся о твоем успехе!"
                            },
                            {
                                icon: '/img/packets/icons/9.png',
                                title: 'Получение сертификата',
                                description: "По завершении курса ты получишь сертификат, который станет подтверждением твоих новых знаний и навыков, открывая перед тобой двери для карьерных возможностей в индустрии туризма."
                            },
                            {
                                icon: '/img/packets/icons/11.png',
                                title: 'Возможность открытия бренда-офиса по франшизе',
                                description: "И, наконец, ты получаешь уникальную возможность открыть собственный бренд-офис по франшизе туристической компании «В ПУТЬ» в своем городе. Мы предоставим тебе все необходимые инструменты и поддержку для старта успешного бизнеса."
                            }
                        ],
                        summary: '<b>Пакет "Макси"</b> – это полное погружение в мир туризма с возможностью стать частью нашей крупнейшей сети и начать собственный бизнес с поддержкой.',
                        priceOld: 45000,
                        priceNew: 37000,
                        buttonText: 'ПОЛУЧИТЬ ДОСТУП'
                    }
                }],
            isLoading: true,
            isDisabled: false,
            selectedCourse: null
        };
    },
    methods: {
        togglePackage(packageId, headerOffset = 0) {
            this.expandedPackage =
                this.expandedPackage === packageId ? null : packageId;

            this.$nextTick(() => {
                const refKey = `package_${packageId}`;
                const pkgRefs = this.$refs[refKey];

                if (!pkgRefs || pkgRefs.length === 0) return;
                const pkgEl = pkgRefs[0];
                if (!(pkgEl instanceof Element)) return;

                pkgEl.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });

                if (headerOffset > 0) {
                    const targetScroll =
                        window.scrollY + pkgEl.getBoundingClientRect().top - headerOffset;

                    window.scroll({
                        top: targetScroll,
                        behavior: 'smooth',
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
                        this.packageData[index].details.contentLink = pkgData.contentLink;
                    }
                });
            }).finally(() => {
                this.isLoading = false;
            })
        },
    },
    mounted() {
        this.getCourses();

        const orderModal = document.getElementById('orderModal');

        if (orderModal) {
            orderModal.addEventListener('show.bs.modal', event => {
                const button = event.relatedTarget;

                const id = button.getAttribute('data-bs-id');
                const name = button.getAttribute('data-bs-name');
                const price = button.getAttribute('data-bs-price');

                const modalId = orderModal.querySelector('.idCourse');
                const modalTitle = orderModal.querySelector('.package-title .fw-bolder');
                const modalPrice = orderModal.querySelector('.package-price .price');

                if (modalId) {
                    modalId.value = id;
                }
                if (modalTitle) {
                    modalTitle.textContent = ` "${name}"`;
                }
                if (modalPrice) {
                    modalPrice.textContent = `${price} р`;
                }
            });
        }
    }
}
</script>
<style scoped>

</style>
