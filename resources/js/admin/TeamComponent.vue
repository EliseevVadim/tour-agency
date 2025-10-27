<template>
    <div class="container mt-4">
        <h3 class="mb-4 fw-bold">Управление командой</h3>

        <button class="btn btn-success"
                @click="showAddForm = true"
                v-if="!showAddForm && !showEditForm">
            <i class="bi bi-person-plus"></i> Добавить сотрудника
        </button>

        <div v-if="showAddForm" class="card mb-4">
            <div class="card-body">
                <h2 class="card-title mb-3">Новый сотрудник</h2>
                <form @submit.prevent="addTeamMember" enctype="multipart/form-data">
                    <div class="mb-3">
                        <label for="addImageFile" class="form-label">Изображение:</label>
                        <input type="file" id="addImageFile" class="form-control" @change="handleImageUpload($event, 'newMember')" accept="image/*">
                        <small class="form-text text-muted">Поддерживаются форматы: JPG, JPEG, PNG, GIF.</small>
                        <div v-if="newMember.previewImageUrl" class="mt-2">
                            <img :src="newMember.previewImageUrl" alt="Превью изображения" style="max-width: 150px; max-height: 150px;">
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="addName" class="form-label">Имя:</label>
                        <input autocomplete="off" type="text" id="addName" class="form-control" v-model="newMember.name" required>
                    </div>
                    <div class="mb-3">
                        <label for="addPosition" class="form-label">Должность:</label>
                        <input autocomplete="off" type="text" id="addPosition" class="form-control" v-model="newMember.position">
                    </div>
                    <button type="submit" class="btn btn-success me-2">Добавить</button>
                    <button type="button" class="btn btn-secondary" @click="cancelForm">Отмена</button>
                </form>
            </div>
        </div>

        <div v-if="showEditForm" class="card mb-4">
            <div class="card-body">
                <h2 class="card-title mb-3">Редактировать сотрудника</h2>
                <form @submit.prevent="updateTeamMember" enctype="multipart/form-data">
                    <div class="mb-3">
                        <label for="editImageFile" class="form-label">Изображение:</label>
                        <input type="file" id="editImageFile" class="form-control" @change="handleImageUpload($event, 'editingMember')" accept="image/*">
                        <small class="form-text text-muted">Поддерживаются форматы: JPG, JPEG, PNG, GIF.</small>
                        <div v-if="editingMember.image_url" class="mt-2">
                            <img :src="getImageSrc(editingMember.image_url)" alt="Текущее изображение" style="max-width: 150px; max-height: 150px;">
                        </div>
                        <div v-if="editingMember.previewImageUrl" class="mt-2">
                            <img :src="editingMember.previewImageUrl" alt="Превью нового изображения" style="max-width: 150px; max-height: 150px;">
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="editName" class="form-label">Имя:</label>
                        <input autocomplete="off" type="text" id="editName" class="form-control" v-model="editingMember.name" required>
                    </div>
                    <div class="mb-3">
                        <label for="editPosition" class="form-label">Должность:</label>
                        <input autocomplete="off" type="text" id="editPosition" class="form-control" v-model="editingMember.position">
                    </div>
                    <button type="submit" class="btn btn-success me-2">Сохранить</button>
                    <button type="button" class="btn btn-secondary" @click="cancelForm">Отмена</button>
                </form>
            </div>
        </div>

        <div class="table-responsive" v-if="!showAddForm && !showEditForm">
            <table class="table table-striped table-hover">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Изображение</th>
                    <th scope="col">Имя</th>
                    <th scope="col">Должность</th>
                    <th scope="col">Действия</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(member, index) in teamData" :key="member.id">
                    <td>{{ index + 1 }}</td>
                    <td>
                        <img :src="'/img/team/' + member.image_url" :alt="member.name" class="img-thumbnail" width="50">
                    </td>
                    <td>{{ member.name }}</td>
                    <td>{{ member.position }}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary me-2" @click="editTeamMember(member)">
                            <i class="bi bi-pencil"></i> Редактировать
                        </button>
                        <button class="btn btn-danger btn-sm" @click="deleteTeamMember(member.id)">
                            <i class="bi bi-trash"></i> Удалить
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            teamData: [],
            showAddForm: false,
            showEditForm: false,
            newMember: {
                image_url: '',
                name: '',
                position: ''
            },
            editingMember: {
                id: null,
                image_url: '',
                name: '',
                position: ''
            }
        };
    },
    methods: {
        async fetchTeamData() {
            try {
                const response = await axios.get('/api/team');
                this.teamData = response.data;
            } catch (error) {
                console.error('Ошибка при загрузке данных команды:', error);
            }
        },

        handleImageUpload(event, memberType) {
            const file = event.target.files[0];

            if (file) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    if (memberType === 'newMember') {
                        this.newMember.previewImageUrl = e.target.result;
                        this.newMember.image_file = file;
                        this.newMember.image_url = null;
                    }
                    else if (memberType === 'editingMember') {
                        this.editingMember.previewImageUrl = e.target.result;
                        this.editingMember.image_file = file;
                        this.editingMember.image_url = null;
                    }
                };
                reader.readAsDataURL(file);
            } else {
                if (memberType === 'newMember') {
                    this.newMember.previewImageUrl = null;
                    this.newMember.image_file = null;
                    this.newMember.image_url = null;
                } else if (memberType === 'editingMember') {
                    this.editingMember.previewImageUrl = null;
                    this.editingMember.image_file = null;
                }
            }
        },

        async addTeamMember() {
            this.formData = new FormData();
            this.formData.append('name', this.newMember.name);
            this.formData.append('position', this.newMember.position);

            if (this.newMember.image_file) {
                this.formData.append('image_url', this.newMember.image_file);
            } else {
                this.formData.append('image_url', '');
            }

            try {
                const response = await axios.post('/admin/api/team', this.formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
                this.teamData.push(response.data);
                this.cancelForm();
            } catch (error) {
                console.error('Ошибка добавления сотрудника:', error.response.data);
                if (error.response && error.response.data && error.response.data.errors) {
                    alert('Ошибка валидации: ' + Object.values(error.response.data.errors).flat().join(' '));
                } else {
                    alert('Не удалось добавить сотрудника.');
                }
            }
        },

        editTeamMember(member) {
            this.editingMember = {...member};
            this.showEditForm = true;
            this.showAddForm = false;
        },

        async updateTeamMember() {
            const formData = new FormData();

            if (this.editingMember.image_file instanceof File) {
                formData.append('image_url', this.editingMember.image_file);
            } else if (this.editingMember.image_url) {
                //formData.append('image_url', null);
            }

            formData.append('name', this.editingMember.name);
            formData.append('position', this.editingMember.position);

            try {
                const response = await axios.post(
                    `/admin/api/team/${this.editingMember.id}`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );

                const idx = this.teamData.findIndex(m => m.id === this.editingMember.id);
                if (idx !== -1) this.teamData[idx] = response.data;
                this.cancelForm();
            } catch (e) {
                console.error('Ошибка обновления', e.response);
            }
        },

        async deleteTeamMember(id) {
            if (confirm('Вы уверены, что хотите удалить этого сотрудника?')) {
                try {
                    await axios.delete(`/admin/api/team/${id}`);
                    this.teamData = this.teamData.filter(member => member.id !== id);
                } catch (error) {
                    console.error('Ошибка при удалении сотрудника:', error);
                    alert('Произошла ошибка при удалении.');
                }
            }
        },

        cancelForm() {
            this.showAddForm = false;
            this.showEditForm = false;
            this.resetForm();
        },

        resetForm() {
            this.newMember = {
                image_url: '',
                name: '',
                position: ''
            };
            this.editingMember = {
                id: null,
                image_url: '',
                name: '',
                position: ''
            };
        },
        getImageSrc(imageUrl) {
            if (!imageUrl) {
                return '/path/to/default/image.png';
            }
            if (imageUrl.startsWith('http') || imageUrl.startsWith('/')) {
                return imageUrl;
            } else {
                return '/img/team/' + imageUrl;
            }
        }
    },
    mounted() {
        this.fetchTeamData();
    }
};
</script>

<style scoped>
.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

input[type="text"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

table {
    border-collapse: collapse;
    margin-top: 5px;
}

th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
}

button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}
</style>
