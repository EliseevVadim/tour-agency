<template>
    <section class="team-section container">
        <h2 class="team-section-title text-center">Наша команда:</h2>
        <ssr-carousel show-dots :slidesPerPage="1">
            <div v-for="(slide, slideIndex) in slides" :key="slideIndex" class="carousel-slide">
                <div class="team-members-container">
                    <div v-for="(member, memberIndex) in slide"
                         :key="member.id"
                         class="team-member"
                         :class="{ 'top-row': memberIndex < 5, 'bottom-row': memberIndex >= 5 }">
                        <img :src="member.imageUrl" :alt="member.name">
                        <div class="team-member-content">
                            <h3>{{ member.name }}</h3>
                            <p>{{ member.position }}</p>
                        </div>
                    </div>
                    <div v-for="emptySlot in emptySlots(slide.length)" :key="'empty-' + emptySlot"
                         class="team-member empty-slot"></div>
                </div>
            </div>
        </ssr-carousel>
    </section>
</template>

<script>
export default {
    name: "TeamList",
    data() {
        return {
            members: [
                {id: 1, imageUrl: '/img/member-sample.png', name: 'Алексей Мишанков', position: 'Бос'},
                {id: 2, imageUrl: '/img/member-sample.png', name: 'Алексей Мишанков', position: 'Бос'},
                {id: 3, imageUrl: '/img/member-sample.png', name: 'Алексей Мишанков', position: 'Бос'},
                {id: 4, imageUrl: '/img/member-sample.png', name: 'Алексей Мишанков', position: 'Бос'},
                {id: 5, imageUrl: '/img/member-sample.png', name: 'Алексей Мишанков', position: 'Бос'},
                {id: 6, imageUrl: '/img/member-sample.png', name: 'Алексей Мишанков', position: 'Бос'},
                {id: 7, imageUrl: '/img/member-sample.png', name: 'Алексей Мишанков', position: 'Бос'},
                {id: 8, imageUrl: '/img/member-sample.png', name: 'Алексей Мишанков', position: 'Бос'},
                {id: 9, imageUrl: '/img/member-sample.png', name: 'Алексей Мишанков', position: 'Бос'},
                {id: 10, imageUrl: '/img/member-sample.png', name: 'Алексей Мишанков', position: 'Бос'},
                {id: 11, imageUrl: '/img/member-sample.png', name: 'Алексей Мишанков', position: 'Бос'},
                {id: 12, imageUrl: '/img/member-sample.png', name: 'Алексей Мишанков', position: 'Бос'},
                {id: 13, imageUrl: '/img/member-sample.png', name: 'Алексей Мишанков', position: 'Бос'},
                {id: 14, imageUrl: '/img/member-sample.png', name: 'Алексей Мишанков', position: 'Бос'},
            ],
            slides: [] // Important: Define slides here
        }
    },
    created() {
        this.createSlides();
    },
    methods: {
        createSlides() {
            const membersPerSlide = 10;
            let tempSlides = [];
            for (let i = 0; i < this.members.length; i += membersPerSlide) {
                tempSlides.push(this.members.slice(i, i + membersPerSlide));
            }
            this.slides = tempSlides;
        },
        emptySlots(memberCount) {
            const slotsNeeded = 10 - memberCount;
            return Array(Math.max(0, slotsNeeded)).fill(null).map((_, index) => index);
        }
    }
}
</script>
