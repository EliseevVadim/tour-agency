<template>
    <div class="slide slide-review">
        <div class="review-card ">
            <div class="review-header d-flex gap-2 justify-content-between">
                <div class="align-items-center card-header__info d-flex gap-3">
                    <img :src="'/img/reviews/avatars/' + profileImage" alt="Профиль" class="avatar">
                    <div class="user-info text-start">
                        <h3 class="fw-bold">{{ name }}</h3>
                        <p class="text-nowrap">{{ preLocation }} <span class="text-decoration-underline">{{
                                location
                            }}</span></p>
                    </div>
                </div>
                <ssr-carousel v-if="photos.length > 0" class="review-gallery" show-arrows :slides-per-page='3'
                              :gutter='9'>
                    <div v-for="(img, index) in photos" class="slide">
                        <img :src="'/img/reviews/' + img"
                             :alt="'Фото отзыва ' + (index + 1)"
                             @click="openImageModal('/img/reviews/' + img)"
                             class="clickable-image">
                    </div>

                    <template #back-arrow='{ disabled }'>
                        <span v-show="!disabled" class="carousel-left-icon reviews-carousel-left-icon"
                              :class="{'disabled': disabled}"></span>
                    </template>
                    <template #next-arrow='{ disabled }'>
                        <span v-show="!disabled" class="carousel-right-icon reviews-carousel-right-icon"
                              :class="{'disabled': disabled}"></span>
                    </template>
                </ssr-carousel>
            </div>


            <div class="card-body">
                <div class="review-text">
                    <p>
                        {{ text }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ReviewCard",
    props: {
        profileImage: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        preLocation: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        photos: {
            type: Array,
            required: true,
            default: () => []
        }
    },
    methods: {
        openImageModal(imageUrl) {
            this.$emit('open-image-modal', {imageUrl: imageUrl});
        }
    }
}
</script>
<style scoped>
.review-card__location:first-letter {
    text-transform: capitalize;
}
</style>
