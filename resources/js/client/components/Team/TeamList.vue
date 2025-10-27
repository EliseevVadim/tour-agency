<template>
    <section class="team-section container">
        <h2 class="team-section-title text-center">Наша команда:</h2>
        <ssr-carousel class="custom-carousel" v-if="members.length > 0" show-dots :slides-per-page='1' paginate-by-slide>
            <div v-for="(slide, slideIndex) in slides" :key="slideIndex" class="carousel-slide">
                <div class="team-members-container">
                    <div v-for="(member, memberIndex) in slide"
                         :key="memberIndex"
                         class="team-member"
                         :class="{ 'top-row': memberIndex < memberIdx, 'bottom-row': memberIndex >= memberIdx }">
                        <img :src="'/img/team/' + member.image_url" :alt="member.name">
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
import axios from "axios";

export default {
    name: "TeamList",
    data() {
        return {
            members: [],
            slides: [],
            membersPerSlide: 10,
            memberIdx: 5
        }
    },
    created() {
        this.fetchTeam();
    },
    mounted() {

    },
    methods: {
        createSlides() {
            this.membersPerSlide = 10;
            if (window.innerWidth <= 767) {
                this.membersPerSlide = 6;
                this.memberIdx = 3
            }

            let tempSlides = [];
            for (let i = 0; i < this.members.length; i += this.membersPerSlide) {
                tempSlides.push(this.members.slice(i, i + this.membersPerSlide));
            }
            this.slides = tempSlides;
        },
        emptySlots(memberCount) {
            const slotsNeeded = 10 - memberCount;
            return Array(Math.max(0, slotsNeeded)).fill(null).map((_, index) => index);
        },
        fetchTeam() {
            axios.get('/api/team')
                .then(response => {
                    this.members = response.data;
                    this.createSlides();
                })
                .catch(error => {
                    console.error('Ошибка при получении команды:', error);
                    if (error.response) {
                        console.error('Error response data:', error.response.data);
                    }
                });
        }
    }
}
</script>
