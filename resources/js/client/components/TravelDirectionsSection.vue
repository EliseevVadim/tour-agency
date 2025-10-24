<template>
    <section class="travel-directions-section">
        <div class="coconut-background coconut-right"></div>
        <div class="line-gradient-background"></div>

        <div class=" container-fluid overflow-hidden">
            <h2 class="travel-directions-title text-center">Наши направления:</h2>

            <ssr-carousel show-arrows show-dots :slidesPerPage="1" overflow-visible
                          paginate-by-slide peek-right='3%' peek-left='3%' gutter='30'
                          :responsive='responsive'>

                <template #back-arrow='{ disabled }'>
                    <span class="carousel-left-icon" :class="{'disabled': disabled}"></span>
                </template>
                <template #next-arrow='{ disabled }'>
                    <span class="carousel-right-icon" :class="{'disabled': disabled}"></span>
                </template>

                <div class="travel-card slide" v-for="slide in slides">
                    <div class="travel-card__image-container">
                        <img :src="slide.travelImageUrl" alt="Background" class="travel-card__background-image" />
                    </div>
                </div>
            </ssr-carousel>
        </div>
    </section>
</template>

<script>
export default {
    name: "TravelDirectionsSection",
    data(){
        return {
            slides: [
                {
                    id: 1,
                    travelImageUrl: '/img/travel-sample-1.png',
                    videoUrl: ''
                },
                {
                    id: 2,
                    travelImageUrl: '/img/travel-sample-2.png',
                    videoUrl: ''
                },
                {
                    id: 3,
                    travelImageUrl: '/img/travel-sample-1.png',
                    videoUrl: ''
                },
                {
                    id: 4,
                    travelImageUrl: '/img/travel-sample-1.png',
                    videoUrl: ''
                }
            ],
            responsive: [
                {
                    minWidth: 768,
                    slidesPerPage: 2,
                },
                {
                    minWidth: 1024,
                    slidesPerPage: 2,
                },
                {
                    minWidth: 1366,
                    slidesPerPage: 3,
                }
            ]
        }
    }
}
</script>
