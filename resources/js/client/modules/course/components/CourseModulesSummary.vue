<template>
    <section class="course-modules-section">
        <div class="course-modules-container container container-xl">
            <div class="course-modules-left">
                <h2 class="course-modules-header title-course">О КУРСЕ:</h2>
                <p class="course-description">
                    Наш курс включает в себя
                    <span class="fw-800">9 уникальных модулей,</span> каждый
                    из которых поможет тебе стать экспертом в мире туризма
                    и подготовит к успешной карьере.
                </p>
            </div>
            <div class="course-modules-right">
                <div class="gradient-circle">
                    <div class="course-modules-cards">
                        <div class="course-card course-card-1">
                            <div class="card-line-bg">
                                <h2 class="card-title text-white">МОДУЛЬ 1</h2>
                                <p class="card-subtitle text-white">Понимание туристической индустрии</p>
                            </div>
                        </div>
                        <div class="course-card course-card-2">
                            <div class="card-line-bg">
                                <h2 class="card-title text-white">МОДУЛЬ 2</h2>
                                <p class="card-subtitle text-white">Туристическое законодательство</p>
                            </div>
                        </div>
                        <div class="course-card course-card-3">
                            <div class="card-line-bg">
                                <h2 class="card-title text-white">МОДУЛЬ 3</h2>
                                <p class="card-subtitle text-white">Туристическая бухгалтерия</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="course-modules-list text-center">
            <ssr-carousel v-if="modules.length > 0" show-dots :slidesPerPage="1" v-model="activeSlide"
                          :style="{ height: this.carouselHeight }">
                <div class="module-group-slide" v-for="(group, groupIndex) in groupedModules" :key="groupIndex">
                    <div class="module-card" v-for="(subModule, subIdx) in group" :key="subIdx">
                        <div v-if="modulesPerSlide === 3 ? subIdx % 2 === 0 : groupIndex % 2 === 0"
                             class="skewed-bg"></div>
                        <div class="container container-xl module-card-container">
                            <h2 class="module-card-title">МОДУЛЬ {{ subModule.num }}</h2>
                            <h2 class="module-card-subtitle">{{ subModule.title }}</h2>
                            <p class="module-card-description">{{ subModule.description }}</p>
                        </div>
                    </div>
                </div>
            </ssr-carousel>
        </div>
    </section>
</template>

<script>
export default {
    name: "CourseModulesSummary",
    data() {
        return {
            modules: [{
                num: 1,
                title: 'Понимание туристической индустрии',
                description: 'Ты погрузишься в историю туризма, изучишь важнейшие понятия и термины, а также ' +
                    'разберешь виды туров, классификацию номеров и питания. Этот модуль даст тебе прочную ' +
                    'основу для понимания всей структуры и механизма работы туристической отрасли.',
            }, {
                num: 2,
                title: 'Туристическое законодательство',
                description: 'Совместно с приглашённым экспертом, профессиональным туристическим юристом, ' +
                    'ты подробно разберешь все правовые основы работы в туризме. Мы изучим права и обязанности ' +
                    'турагента, правила договорных отношений, вопросы авторских прав и многие другие аспекты, ' +
                    'которые важны для легальной и эффективной работы в сфере.'
            }, {
                num: 3,
                title: 'Туристическая бухгалтерия',
                description: 'С помощью эксперта в области бухгалтерии ты освоишь все нюансы туристического ' +
                    'документооборота. Мы подробно поговорим о найме персонала, расчётах, налогах и рисках, ' +
                    'связанных с работой в индустрии туризма. Этот модуль поможет тебе уверенно разобраться ' +
                    'в финансовых аспектах бизнеса.'
            }, {
                num: 4,
                title: 'Развитие продажных навыков',
                description: 'Мы подробно разберем основы успешных продаж, клиентоориентированности и ' +
                    'методы увеличения комиссий. В этом модуле ты узнаешь, как действовать в экстренных ' +
                    'ситуациях, а также получишь советы от психолога, как управлять эмоциями клиентов и ' +
                    'наладить успешные отношения.',
            }, {
                num: 5,
                title: 'Маркетинг и формирование контента',
                description: 'Без маркетинга невозможно представить успешную продажу. Мы научим тебя ' +
                    'использовать все инструменты для продвижения туров через интернет и социальные сети. ' +
                    'Под руководством наших специалистов ты освоишь азы оффлайн и цифрового маркетинга, ' +
                    'научишься создавать видеоролики, разберешься в нейросетях и современных технологиях ' +
                    'продвижения себя, как эксперта в мире туризма.'
            }, {
                num: 6,
                title: 'Работа с туроператорами',
                description: 'Ты получишь знания о работе более чем с 20 туроператорами. И кроме этого мы подробно ' +
                    'разберем все нюансы бронирования ЖД билетов, авиабилетов, оформление виз, страховок и многое другое.'
            }, {
                num: 7,
                title: 'Страноведение',
                description: 'В этом модуле ты ознакомишься с 33 странами, которые наиболее популярны среди ' +
                    'русскоговорящих туристов. Мы разберем правила въезда, лучшие и худшие отели, популярные ' +
                    'локации для отдыха, советы по выбору мест для путешествий и другие важные аспекты для ' +
                    'планирования туров.',
            }, {
                num: 8,
                title: ' Развитие коммуникативных навыков',
                description: 'Ты освоишь искусство общения с клиентами и партнерами. Мы будем работать с тренером ' +
                    'по речи, который поможет тебе настроить голос и речь — главные инструменты для работы ' +
                    'в туризме. Также мы изучим стрессоустойчивость и психологию продаж с профессиональным ' +
                    'психологом нашего курса. '
            }, {
                num: 9,
                title: 'Продолжение развития и дополнительные ресурсы',
                description: 'Ты получишь список рекомендованной литературы и полезных ресурсов для дальнейшего ' +
                    'развития. Мы предоставим чек-листы, которые будут необходимы для работы в сфере туризма, ' +
                    'а также расскажем о возможностях франшизы, которые откроются перед тобой после завершения курса.'
            }],
            modulesPerSlide: 3,
            activeSlide: null,
            carouselHeight: 'auto'
        }
    },
    computed: {
        groupedModules() {
            if (window.innerWidth <= 767) {
                this.modulesPerSlide = 1;
            }
            const groups = [];
            for (let i = 0; i < this.modules.length; i += this.modulesPerSlide) {
                groups.push(this.modules.slice(i, i + this.modulesPerSlide));
            }
            return groups;
        }
    },
    watch: {
        activeSlide: {
            handler() {
                if (window.innerWidth > 767) {
                    return;
                }
                setTimeout(() => {
                    this.changeSlide();
                },);
            },
            immediate: true
        }
    },
    methods: {
        changeSlide(slide) {
            this.$nextTick(() => {
                const items = document.querySelectorAll('.module-card');

                if (!items || items.length === 0) {
                    console.warn('Элементы не найдены в контейнере.');
                    return;
                }

                const itemModule = items[this.activeSlide === null ? 0 : this.activeSlide];
                const moduleSize = itemModule.getBoundingClientRect();
                this.carouselHeight = moduleSize.height + 10 + 'px'
            });
        }
    },
    mounted() {
        document.addEventListener('scroll', animateBlock);

        function animateBlock() {

            const modulesContainer = document.querySelector('.course-modules-cards')
            if (!modulesContainer) return;

            const rect = modulesContainer.getBoundingClientRect();
            const isVisible =
                rect.top < window.innerHeight * (1 - 0.3) && rect.bottom > window.innerHeight * 0.3;
            if (!isVisible) return;

            document.querySelectorAll('.course-card').forEach((el, idx) => {
                el.classList.add('animate__animated', 'animate__fadeIn', 'animate__slow');
                if (idx === 1) el.classList.add('animate__delay-1s');
                if (idx === 2) el.classList.add('animate__delay-2s');
                if (idx === 3) el.classList.add('animate__delay-3s');
            });
        }
    }
}
</script>
<style>
.course-card {
    opacity: 0;
}
</style>
