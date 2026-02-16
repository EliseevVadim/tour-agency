<template>
    <div class="container mt-4">
        <h3 class="mb-4 fw-bold">Контакты</h3>

        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Настройки контактных ссылок</h5>

                <form @submit.prevent="saveContacts">
                    <div class="mb-3">
                        <label for="telegramLink" class="form-label">Ссылка на Telegram</label>
                        <input autocomplete="off" class="form-control" id="telegramLink"
                               v-model="contactLinks.telegram">
                    </div>

                    <div class="mb-3">
                        <label for="whatsappLink" class="form-label">Ссылка на WhatsApp</label>
                        <input autocomplete="off" class="form-control" id="whatsappLink"
                               v-model="contactLinks.whatsapp">
                    </div>

                    <div class="mb-3">
                        <label for="maxLink" class="form-label">Ссылка на Max</label>
                        <input autocomplete="off" class="form-control" id="maxLink" v-model="contactLinks.max">
                    </div>

                    <div class="mb-3">
                        <label for="vkLink" class="form-label">Ссылка на ВКонтакте</label>
                        <input autocomplete="off" class="form-control" id="vkLink" v-model="contactLinks.vk">
                    </div>

                    <div class="mb-3">
                        <label for="viberLink" class="form-label">Ссылка на Viber</label>
                        <input autocomplete="off" class="form-control" id="viberLink" v-model="contactLinks.viber">
                    </div>

                    <button type="submit" class="btn btn-primary">Сохранить изменения</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            contactLinks: {
                telegram: '',
                whatsapp: '',
                max: '',
                vk: '',
                viber: '',
            }
        };
    },
    mounted() {
        this.loadContacts();
    },
    methods: {
        async loadContacts() {
            try {
                const response = await axios.get('/api/contacts');
                this.contactLinks = response.data;
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            }
        },
        saveContacts() {
            axios.put('/admin/api/contacts', this.contactLinks).then(response => {
                alert('Ссылки успешно сохранены!');
            })
                .catch(error => {
                    console.error('Ошибка при сохранении:', error.response.data.message || 'Неизвестная ошибка');
                    alert('Ошибка при сохранении: ' + (error.response.data.message || 'Неизвестная ошибка'));
                });
        }
    }
}
</script>
