<template>
    <section class="target-audience-section container container-xl">
        <h2 class="section-header text-center title-course">{{ sectionTitle }}</h2>

        <div class="target-audience-list">
            <div v-for="segment in audienceSegments" :key="segment.id" class="audience-wrapper">
                <span class="card-number">{{ segment.number }}</span>
                <div class="audience-card">
                    <div class="card-header">
                        <h3 class="card-title">{{ segment.title }}</h3>
                    </div>
                    <p class="card-description">{{ segment.description }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'TargetAudienceSection',

    data() {
        return {
            sectionTitle: 'ТЕБЕ К НАМ, ЕСЛИ:',

            audienceSegments: [
                {
                    id: 1,
                    number: '01',
                    title: 'Ты мечтаешь о свободе, хочешь работать в динамичной, яркой и вдохновляющей сфере?',
                    description: 'Мы обучим тебя всем тонкостям работы в туристической индустрии: от подбора туров до общения с клиентами и построения своей клиентской базы.',
                },
                {
                    id: 2,
                    number: '02',
                    title: 'Ты хочешь начать с частичного дохода.',
                    description: 'Не обязательно сразу погружаться в туризм с головой. Благодаря гибкому графику и возможности работать из любой точки мира, ты можешь начать совмещать туризм с основной работой.',
                },
                {
                    id: 3,
                    number: '03',
                    title: 'Ты хочешь путешествовать с большими скидками.',
                    description: 'Мы научим тебя, как экономить на турах — для себя, семьи или друзей. Пройдя наш курс, ты откроешь для себя целый мир доступных поездок!',
                },
                {
                    id: 4,
                    number: '04',
                    title: 'Ты уже действующий турагент.',
                    description: 'Если ты уже работаешь в сфере туризма, наш курс поможет тебе выйти на новый, современный уровень.',
                }
            ]
        };
    },
    mounted() {
        function animateBlock() {
            const targetContainer = document.querySelector('.target-audience-list');
            if (!targetContainer) {
                return;
            }

            const audienceElements = document.querySelectorAll('.audience-wrapper');
            if (audienceElements.length === 0) {
                return;
            }

            audienceElements.forEach((el, idx) => {
                el.classList.add('animate__animated', 'animate__fadeIn', 'animate__faster');
                if (idx === 0) el.classList.add('animate__delay-1s');
                if (idx === 1) el.classList.add('animate__delay-1-5s');
                if (idx === 2) el.classList.add('animate__delay-2s');
                if (idx === 3) el.classList.add('animate__delay-2-5s');
            });
        }
        setTimeout(animateBlock, 50);
    }
};
</script>
<style scoped>
.audience-wrapper {
    opacity: 0;
}
</style>
