<template>
    <a v-if="tourUrl" :href="tourUrl" class="tour-card-link">
        <div class="tour-card slide">
            <img :src="imageUrl" :alt="altText">
            <div v-if="badgeType" class="tour-card__badge">
                <p class="tour-badge__text fw-medium">{{ badgeText }}</p>
            </div>
        </div>
    </a>
    <div v-else class="tour-card slide">
        <img :src="imageUrl" :alt="altText">
        <div v-if="badgeType" class="tour-card__badge">
            <p class="tour-badge__text fw-medium">{{ badgeText }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "TourCard",
    props: {
        tourUrl: {
            type: String,
            required: true,
            default: ''
        },
        imageUrl: {
            type: String,
            required: true,
            default: '/img/sample-tour.jpg'
        },
        altText: {
            type: String,
            required: true,
            default: ''
        },
        badgeText: {
            type: String,
            default: ''
        },
        badgeType: {
            type: String,
            default: '',
            validator: function (value) {
                return ['new', 'sale', 'discount', ''].indexOf(value) !== -1;
            }
        }
    },
}
</script>
