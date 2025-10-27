<template>
    <div class="review-card slide">
        <div class="review-card__image-container">
            <img :src="backgroundImage" alt="Background" class="review-card__background-image" />
            <div class="review-card__profile-image-container">
                <img :src="profileImage" alt="Аватар" class="review-card__profile-image" />
            </div>
        </div>
        <div class="review-card__content">
            <h3 class="review-card__name">{{ name }}</h3>
            <p class="review-card__location">{{ gender }} в <span class="underline">{{ location }}</span></p>
            <p class="review-card__text">{{ text }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "ReviewCard",
    props: {
        name: {
            type: String,
            required: true
        },
        gender: {
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
        backgroundImage: {
            type: String,
            required: true
        },
        profileImage: {
            type: String,
            required: true
        }
    }
}
</script>
<style scoped>
.review-card__location:first-letter{
    text-transform: capitalize;
}
</style>
