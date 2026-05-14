<template>
    <div class="social-page-container">
        <app-header class="hero-section_dark"></app-header>
        <header class="container social-header text-center">
            <h1 class="fw-800 text-white">ТУРИСТИЧЕСКАЯ <br> КОМПАНИЯ "В ПУТЬ"</h1>
            <p class="fw-medium text-white page-subtitle">нажми на соцсеть в которой <br> хочешь следить за нами</p>
        </header>

        <section class="social-section container position-relative">
            <div class="social-icons-bg position-absolute">
                <img class="social-icon tg-icon" src="/img/socials/tg-icon.png" alt="icon telegram">
                <img class="social-icon youtube-icon" src="/img/socials/youtube-icon.png" alt="icon youtube">
                <img v-if="false" class="social-icon insta-icon" src="/img/socials/instagram-icon.png"
                     alt="icon instagram">
                <img class="social-icon tiktok-icon" src="/img/socials/tiktok-icon.png" alt="icon tiktok">
            </div>

            <div class="person-wrapper position-relative">
                <div class="w-100 position-absolute layer-controls">
                    <img src="/img/socials/square-bg.png" class="square-bg-left" alt="square">
                    <img src="/img/socials/shape-bg.png" class="polygon-bg-right" alt="polygon">
                </div>
                <img class="person-image" src="/img/socials/social-persons.png" alt="social persons">
            </div>
            <div class="g-3 g-lg-5 row row-cols-2">
                <div v-for="(item, idx) in socials" class="">
                    <a :href="item.link" class="social-card h-100">
                        <img alt="" class="social-image w-100" :src="'/img/socials/' + (idx + 1) +'.jpg'">
                        <div class="social-link-button" :style="'background-color:'+ item.color">
                            {{ item.title }} {{ item.note }}
                            <span style="font-size: 1.5em;">⟶</span>
                        </div>
                    </a>
                </div>
            </div>
            <p class="mt-4 color-lightgray">* - принадлежит Meta, признанной экстремистской и запрещенной в России</p>
        </section>

        <app-footer></app-footer>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Contacts",
    data() {
        return {
            socials: [
                {
                    title: 'Youtube',
                    link: 'https://www.youtube.com/@put_club',
                    color: '#fe0000'
                },
                {
                    title: 'Vkontakte',
                    link: 'https://vk.com/put_club',
                    color: '#0077ff'
                },
                {
                    title: 'Telegram',
                    link: 'https://t.me/put_club',
                    color: '#35ade1'
                },
                {
                    title: 'Instagram',
                    link: 'https://instagram.com/put_club',
                    color: '#fc145c',
                    note: "*"
                },
               /* {
                    title: 'Dzen',
                    link: 'https://dzen.ru/put_club',
                    color: '#373737'
                },*/
                {
                    title: 'Rutube',
                    link: 'https://rutube.ru/channel/37334628/',
                    color: '#e31425'
                },
                /*{
                    title: 'Одноклассники',
                    link: 'https://ok.ru/group/70000033103318',
                    color: '#ff7800'
                },
                {
                    title: 'TikTok',
                    link: 'https://www.tiktok.com/@put_club',
                    color: '#00f1ea'
                },
                {
                    title: 'Yappi',
                    link: 'https://yappy.media/n/put_club',
                    color: '#32ffa1'
                },*/
                {
                    title: 'Max',
                    link: 'https://max.ru/put_club',
                    color: '#35ade1'
                }
            ]
        }
    },
    methods: {
        fetchSocials() {
            /* axios.get('/api/contacts')
                 .then(response => {
                     this.contacts = response.data;
                 })
                 .catch(error => {
                     console.error('Ошибка при получении контактов:', error);
                     if (error.response) {
                         console.error('Error response data:', error.response.data);
                     }
                 });*/
        }
    },
    mounted() {
        this.fetchSocials();
    }
}
</script>
<style>
.color-lightgray {
    color: black;
    font-size: 10px;
}
</style>
