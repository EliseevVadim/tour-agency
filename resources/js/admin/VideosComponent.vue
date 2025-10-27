<template>
    <div class="videos-content container">
        <h3 class="mb-4 fw-bold">Видео</h3>
        <form @submit.prevent="addVideo" class="row align-items-end mb-2">
            <div class="form-group col-md-6">
                <label for="video_url">URL видео:</label>
                <input type="text" id="video_url" v-model="newVideo.video_url" class="form-control" required>
            </div>
            <div class="col-md-6">
                <button type="submit" class="btn btn-success">Добавить</button>
            </div>
        </form>

        <div id="videos-container" class="row">
            <div v-for="video in videos" :key="video.id" class="col-md-2 mb-4">
                <div class="card">
                    <img :src="video.thumbnail_url" class="card-img-top" :alt="video.title">
                    <div class="card-body d-flex flex-wrap gap-1">
                        <a :href="video.video_url" target="_blank" class="d-none btn btn-primary w-100">Просмотреть</a>
                        <button @click="deleteVideo(video.id)" class="btn btn-danger ml-2 w-100">Удалить</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "VideoComponent",
    data() {
        return {
            videos: [],
            newVideo: {
                video_url: '',
                thumbnail_url: ''
            }
        };
    },
    mounted() {
        this.fetchVideos();
    },
    methods: {
        fetchVideos() {
            axios.get('/api/videos')
                .then(response => {
                    this.videos = response.data;
                })
                .catch(error => {
                    console.error('Ошибка при получении видео:', error);
                });
        },
        addVideo() {
            axios.post('/admin/api/videos', {video_url: this.newVideo.video_url})
                .then(() => {
                    this.fetchVideos();
                    this.newVideo = {
                        video_url: ''
                    };
                })
                .catch(error => {
                    console.error('Ошибка при добавлении видео:', error);
                });
        },
        deleteVideo(id) {
            axios.delete(`/admin/api/videos/${id}`)
                .then(() => {
                    this.fetchVideos();
                })
                .catch(error => {
                    console.error('Ошибка при удалении видео:', error);
                });
        }
    }
}
</script>


<style scoped>

</style>
