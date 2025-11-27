<script>
export default {
    name: "Contacts"
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
                    <div class="contact-item telegram">
                        <div class="contacts-wrapper-icon">
                            <img src="/img/icons/telegram.svg" alt="Telegram"/>
                        </div>
                        <span>Telegram</span>
                    </div>
                    <div class="contact-item whatsapp">
                        <div class="contacts-wrapper-icon">
                            <img src="/img/icons/whatsapp.png" alt="Whatsapp"/>
                        </div>
                        <span>Whatsapp</span>
                    </div>
                    <div class="contact-item max">
                        <div class="contacts-wrapper-icon">
                            <img src="/img/icons/max.png" alt="Max"/>
                        </div>
                        <span>Max</span>
                    </div>
                    <div class="contact-item vkontakte">
                        <div class="contacts-wrapper-icon">
                            <img src="/img/icons/vk.png" alt="Vkontakte"/>
                        </div>
                        <span>Vkontakte</span>
                    </div>
                    <div class="contact-item viber">
                        <div class="contacts-wrapper-icon">
                            <img src="/img/icons/viber.png" alt="Viber"/>
                        </div>
                        <span>Viber</span>
                    </div>
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
                                <a class="phone-plate btn btn-cta py-2 align-content-center" href="tel:+79888883603">
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
