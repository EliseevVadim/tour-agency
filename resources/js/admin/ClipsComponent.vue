<template>
    <div class="clips-content container">
        <h3 class="mb-4 fw-bold">Клипы</h3>
        <form @submit.prevent="addClip" class="row align-items-end mb-2">
            <div class="form-group col-md-6">
                <label for="video_url">URL видео:</label>
                <input type="text" id="video_url" v-model="newClip.video_url" class="form-control" required>
            </div>
            <div class="col-md-6">
                <button type="submit" class="btn btn-success">Добавить</button>
            </div>
        </form>

        <div id="clips-container" class="row">
            <div v-for="clip in clips" :key="clip.id" class="col-md-2 mb-4">
                <div class="card">
                    <img :src="clip.thumbnail_url" class="card-img-top" :alt="clip.title">
                    <div class="card-body d-flex flex-wrap gap-1">
                        <a :href="clip.video_url" target="_blank" class="d-none btn btn-primary w-100">Просмотреть</a>
                        <button @click="deleteClip(clip.id)" class="btn btn-danger ml-2 w-100">Удалить</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'ClipsComponent',
    data() {
        return {
            clips: [],
            newClip: {
                video_url: '',
                thumbnail_url: ''
            }
        };
    },
    mounted() {
        this.fetchClips();
    },
    methods: {
        fetchClips() {
            axios.get('/api/clips')
                .then(response => {
                    this.clips = response.data;
                })
                .catch(error => {
                    console.error('Ошибка при получении клипов:', error);
                });
        },
        addClip() {
            axios.post('/admin/api/clips', this.newClip)
                .then(() => {
                    this.fetchClips();
                    this.newClip = {
                        video_url: '',
                        thumbnail_url: ''
                    };
                })
                .catch(error => {
                    console.error('Ошибка при добавлении клипа:', error);
                });
        },
        deleteClip(id) {
            axios.delete(`/admin/api/clips/${id}`)
                .then(() => {
                    this.fetchClips();
                })
                .catch(error => {
                    console.error('Ошибка при удалении клипа:', error);
                });
        }
    }
};
</script>

<style scoped>
.clip-block {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
    display: flex;
    align-items: center;
}

.clip-block img {
    max-width: 100px;
    margin-right: 10px;
}

.clip-block a {
    margin-right: 10px;
}

.clip-block button {
    margin-left: auto;
}
</style>
