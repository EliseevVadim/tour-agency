<template>
    <div class="modal-overlay">
        <template v-if="isNotification">
            <div class="notification-card">
                <div class="notification-body">
                    <p class="body-text support-text text-black mb-3" style="text-align: start;">
                        Информация об условиях обработки и о наличии запретов и условий на обработку неограниченным
                        кругом лиц персональных данных, разрешенных субъектом персональных данных для распространения:
                        Персональные данные (имя, фамилия человека) (далее – ПД), размещенные на сайте, опубликованы с
                        согласия субъектов на распространение.
                        Обработка ПД в любой форме третьими лицами (кроме доступа на сайте в соответствии с согласием):
                        запрещена.
                    </p>

                    <button @click="closeModal" class="close-btn">Закрыть</button>
                </div>
            </div>
        </template>
        <template v-else class="notification-card">
            <div class="notification-header"></div>

            <div class="notification-body">
                <h2 :class="data.class" class="title">{{ data.title }}</h2>
                <p v-if="data.body" class="body-text support-text">{{ data.body }}</p>

                <div v-if="!data.isPresentation" class="support-block">
                    <div class="chat-icon-container">
                        <img class="chat-icon-image" alt="ask Course" src="/img/ask-course.png">
                    </div>
                    <p class="support-text">
                        Если у Вас возникнут какие-либо вопросы, не стесняйтесь обратиться в нашу
                        <a :href="data.support_link_url" target="_blank" class="support-link">
                            {{ data.support_link_text }}
                        </a> — мы всегда готовы помочь!
                    </p>
                </div>

                <button @click="close" class="close-btn">Закрыть</button>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object
        },
        isSuccess: {
            type: Boolean,
            default: true
        },
        isNotification: {
            type: Boolean,
            default: false
        },
        show: {
            type: Boolean,
            default: false
        },
    }
    ,
    computed: {
        isVisible() {
            return this.show;
        }
    }
    ,
    methods: {
        close() {
            this.$emit('close');
        },
        closeModal() {
            this.$emit('update:show', false);
        }
    }
}
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.notification-card {
    background: #fff;
    border-radius: 30px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 550px;
    padding: 0;
    overflow: hidden;
}

.notification-header {
    height: 5px;
    background-color: #E63946;
}

.notification-body {
    padding: 30px;
    text-align: center;
}

.title {
    font-size: 24px;
    font-weight: 500;
}

.body-text {
    margin-top: 35px !important;
}

.chat-icon-container {
    flex-shrink: 1;
    width: 390px;
}

.support-block {
    display: flex;
    align-items: center;
    text-align: left;
    margin-bottom: 35px;
    margin-top: 35px;
    gap: 20px;
}

.support-text {
    font-size: 17px;
    line-height: 1.5;
    margin: 0;
}

.support-link {
    color: black;
    text-decoration: underline;
}

.close-btn {
    padding: 10px 25px;
    background-color: #eee;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
</style>
