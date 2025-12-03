<script>
import axios from "axios";

export default {
    name: "Contacts",
    data() {
        return {
            contacts: []
        }
    },
    methods: {
        fetchContacts(){
            axios.get('/api/contacts')
                .then(response => {
                    this.contacts = response.data;
                })
                .catch(error => {
                    console.error('Ошибка при получении контактов:', error);
                    if (error.response) {
                        console.error('Error response data:', error.response.data);
                    }
                });
        }
    },
    mounted() {
        this.fetchContacts();
    }
}
</script>

<template>
    <div class="contacts">
        <app-header></app-header>
        <div class="contacts-container">
            <div class="gradient-wrapper"></div>
            <div class="contacts-header">
                <h1 class="text-center text-uppercase text-white fw-800">Контакты</h1>
                <h3 class="text-center text-white">выберите удобный формат связи</h3>
            </div>

            <div class="contacts-wrapper">
                <div class="contact-options">
                    <a :href="contacts.telegram" target="_blank" class="contact-item text-decoration-none text-white telegram">
                        <div class="contacts-wrapper-icon">
                            <img src="/img/icons/telegram.svg" alt="Telegram"/>
                        </div>
                        <span>Telegram</span>
                    </a>
                    <a :href="contacts.whatsapp" target="_blank" class="contact-item text-decoration-none text-white whatsapp">
                        <div class="contacts-wrapper-icon">
                            <img src="/img/icons/whatsapp.png" alt="Whatsapp"/>
                        </div>
                        <span>WhatsApp</span>
                    </a>
                    <a :href="contacts.max" target="_blank" class="contact-item text-decoration-none text-white max">
                        <div class="contacts-wrapper-icon">
                            <img src="/img/icons/max.png" alt="Max"/>
                        </div>
                        <span>Max</span>
                    </a>
                    <a :href="contacts.vk" target="_blank" class="contact-item text-decoration-none text-white vkontakte">
                        <div class="contacts-wrapper-icon">
                            <img src="/img/icons/vk.png" alt="Vkontakte"/>
                        </div>
                        <span>Vkontakte</span>
                    </a>
                    <a :href="contacts.viber" target="_blank" class="contact-item text-decoration-none text-white viber">
                        <div class="contacts-wrapper-icon">
                            <img src="/img/icons/viber.png" alt="Viber"/>
                        </div>
                        <span>Viber</span>
                    </a>
                </div>

                <div class="call-to-action">
                    <p>Вы хотели с нами связаться.</p>
                    <p>Просто нажми на кнопку, мы готовы!</p>
                </div>
            </div>

            <div class="question-prompt-container">
                <div class="background-image"></div>
                <div class="content-wrapper">
                    <div class="prompt-card">
                        <h4 class="fw-800">ОСТАЛИСЬ ВОПРОСЫ?</h4>

                        <div class="d-flex justify-content-between text-area">
                            <div class="align-self-center d-flex icon-area">
                                <img class="phone-icon" alt="Call to action" src="/img/call-to-action.png"/>
                            </div>
                            <div class="align-self-center d-flex flex-column text-area__content">
                                <p>Остались вопросы или нужна помощь?</p>
                                <p class="fw-bold">Звони прямо сейчас, и мы с радостью поможем!</p>
                                <a class="phone-plate btn btn-cta py-2 align-content-center" href="tel:+74951299996">
                                    ПОЗВОНИТЬ
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <app-footer></app-footer>
    </div>
</template>

<style scoped>

</style>
