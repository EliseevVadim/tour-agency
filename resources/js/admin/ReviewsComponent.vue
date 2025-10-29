<template>
    <div class="clips-content container">
        <h3 class="mb-4 fw-bold">Отзывы</h3>

        <button class="btn btn-success" @click="showAddForm = true" v-if="!showAddForm">
            <i class="bi bi-person-plus"></i> Добавить отзыв
        </button>

        <div v-if="showAddForm" class="card mb-4">
            <div class="card-body">
                <h2 class="card-title mb-3">Новый отзыв</h2>
                <form @submit.prevent="addReview" enctype="multipart/form-data">
                    <div class="mb-3">
                        <label for="addAvatarFile" class="form-label">Аватар пользователя:</label>
                        <input type="file" id="addAvatarFile" class="form-control" required
                               @change="handleImageUpload($event, 'avatar')" accept="image/*">
                        <small class="form-text text-muted">Поддерживаются форматы: JPG, JPEG, PNG.</small>
                        <div v-if="newReview.previewAvatarUrl" class="mt-2">
                            <img :src="newReview.previewAvatarUrl" alt="Превью аватара"
                                 style="max-width: 150px; max-height: 150px;">
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="addPhotosFile" class="form-label">Фотографии с путешествия:</label>
                        <input type="file" id="addPhotosFile" class="form-control"
                               @change="handleImageUpload($event, 'photos')" multiple accept="image/*">
                        <small class="form-text text-muted">Поддерживаются форматы: JPG, JPEG, PNG. Можно выбрать
                            несколько файлов.</small>
                        <div v-if="newReview.previewPhotosUrls && newReview.previewPhotosUrls.length > 0" class="mt-2">
                            <div v-for="(url, index) in newReview.previewPhotosUrls" :key="index"
                                 class="d-inline-block me-2 mb-2">
                                <img :src="url" alt="Превью фотографии"
                                     style="max-width: 100px; max-height: 100px; border: 1px solid #ccc;">
                            </div>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="addName" class="form-label">Имя:</label>
                        <input autocomplete="off" type="text" id="addName" class="form-control" v-model="newReview.name"
                               required placeholder="Анна Иванова">
                    </div>

                    <div class="mb-3">
                        <label for="addName" class="form-label">*был(а) в</label>
                        <input autocomplete="off" type="text" id="addName" class="form-control"
                               v-model="newReview.pre_location"
                               required placeholder="была в">
                    </div>

                    <div class="mb-3">
                        <label for="addCountry" class="form-label">Страна (*в какой?):</label>
                        <input autocomplete="off" type="text" id="addCountry" class="form-control"
                               v-model="newReview.country" required placeholder="Грузии">
                    </div>

                    <div class="mb-3">
                        <label for="addReviewText" class="form-label">Текст отзыва:</label>
                        <textarea id="addReviewText" class="form-control" v-model="newReview.review_text" rows="4"
                                  required></textarea>
                    </div>

                    <button type="submit" class="btn btn-success me-2">Добавить</button>
                    <button type="button" class="btn btn-secondary" @click="cancelForm">Отмена</button>
                </form>
            </div>
        </div>

        <div class="table-responsive" v-if="!showAddForm">
            <table class="table table-striped table-hover">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Аватар</th>
                    <th scope="col">Имя</th>
                    <th scope="col">Местоположение</th>
                    <th scope="col">Дополнительные фото</th>
                    <th scope="col">Текст отзыва</th>
                    <th scope="col">Действия</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(review, index) in reviews" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>
                        <img :src="'/img/reviews/avatars/' + review.avatar" :alt="review.name" class="img-thumbnail"
                             width="50">
                    </td>
                    <td>{{ review.name }}</td>
                    <td>{{ review.pre_location }} {{ review.country }}</td>
                    <td>
                        <div v-if="review.photos && review.photos.length > 0" class="d-flex">
                            <img
                                v-for="(photo, photoIndex) in review.photos.slice(0, 3)"
                                :key="photoIndex"
                                :src="'/img/reviews/' + photo"
                                :alt="'Фото ' + (photoIndex + 1) + ' для отзыва ' + review.name"
                                class="img-thumbnail mr-1"
                                width="50"
                                style="margin-right: 5px;"
                            >
                            <span v-if="review.photos.length > 3"
                                  class="badge badge-secondary align-self-center">+{{ review.photos.length - 3 }}</span>
                        </div>
                        <span v-else>Нет фото</span>
                    </td>
                    <td>
                        {{ review.review_text.substring(0, 50) }}{{ review.review_text.length > 50 ? '...' : '' }}
                    </td>
                    <td>
                        <button class="btn btn-danger btn-sm" @click="deleteReview(review.id)">
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
    name: "ReviewsComponent",
    data() {
        return {
            reviews: [],
            showAddForm: false,
            newReview: {
                image_url: '',
                name: '',
                pre_location: '',
                country: '',
                avatarFile: null,
                previewAvatarUrl: null,
                photosFile: [],
                previewPhotosUrls: [],
                review_text: '',
            },
            editingReview: {
                id: null,
                image_url: '',
                name: '',
                position: ''
            }
        }
    },
    methods: {
        handleImageUpload(event, type) {
            const files = event.target.files;

            if (type === 'avatar') {
                if (files && files.length > 0) {
                    const file = files[0];
                    this.newReview.avatarFile = file;
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        this.newReview.previewAvatarUrl = e.target.result;
                    };
                    reader.readAsDataURL(file);
                } else {
                    this.newReview.avatarFile = null;
                    this.newReview.previewAvatarUrl = null;
                }
            } else if (type === 'photos') {
                this.newReview.photosFile = Array.from(files);
                this.newReview.previewPhotosUrls = [];

                Array.from(files).forEach(file => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        this.newReview.previewPhotosUrls.push(e.target.result);
                    };
                    reader.readAsDataURL(file);
                });
            }
        },
        async fetchReviews() {
            try {
                const response = await axios.get('/api/reviews');
                this.reviews = response.data;
            } catch (error) {
                console.error('Ошибка при загрузке данных команды:', error);
            }
        },
        addReview() {
            const formData = new FormData();
            formData.append('name', this.newReview.name);
            formData.append('pre_location', this.newReview.pre_location);
            formData.append('country', this.newReview.country);
            formData.append('review_text', this.newReview.review_text);

            if (this.newReview.avatarFile) {
                formData.append('avatar', this.newReview.avatarFile);
            }

            this.newReview.photosFile.forEach((file, index) => {
                formData.append(`photos[${index}]`, file);
            });

            axios.post('/admin/api/review', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    this.fetchReviews();
                    this.resetForm();
                    this.showAddForm = false;
                })
                .catch(error => {
                    console.error('Ошибка при добавлении отзыва:', error);
                });
        },
        async deleteReview(id){
            if (confirm('Вы уверены, что хотите удалить этот отзыв?')) {
                try {
                    await axios.delete(`/admin/api/review/${id}`);
                    this.reviews = this.reviews.filter(review => review.id !== id);
                } catch (error) {
                    console.error('Ошибка при удалении отзыва:', error);
                    alert('Произошла ошибка при удалении.');
                }
            }
        },
        cancelForm() {
            this.showAddForm = false;
            this.resetForm();
        },
        resetForm() {
            this.newReview = {
                name: '',
                gender: 'male',
                country: '',
                avatarFile: null,
                previewAvatarUrl: null,
                photosFile: [],
                previewPhotosUrls: [],
                review_text: '',
                id: null
            };
            document.getElementById('addAvatarFile').value = '';
            document.getElementById('addPhotosFile').value = '';
        }
    },
    mounted() {
        this.fetchReviews();
    }
}
</script>
