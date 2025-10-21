<template>
    <section class="container-fluid container-xl tour-section">
        <h2>Туры дня:</h2>
        <div class="tour-slider">
            <ssr-carousel show-arrows
                          :gutter="25"
                          feather
                          peek="20"
                          :slides-per-page='1'
                          paginate-by-slide
                          :responsive='responsive'>
                <template #back-arrow='{ disabled }'>
                    <span class="tour-carousel-left-icon" :class="{'disabled': disabled}"></span>
                </template>
                <template #next-arrow='{ disabled }'>
                    <span class="tour-carousel-right-icon" :class="{'disabled': disabled}"></span>
                </template>

                    <tour-card v-for="tour in tours"
                               :key="tour.id"
                               :imageUrl="tour.imageUrl"
                               :altText="tour.altText"
                               :badgeText="tour.badgeText"
                               :badgeType="tour.badgeType"/>
            </ssr-carousel>
        </div>
    </section>
</template>

<script>
export default {
    name: "TourSlider",
    data() {
        return {
            tours: [
                {
                    id: 1,
                    altText: 'Отель на Мальдивах',
                    badgeText: 'Новинка',
                    badgeType: 'new',
                },
                {
                    id: 2,
                    altText: 'Горящие туры в Турцию',
                    badgeText: 'Акция',
                    badgeType: 'sale',
                },
                {
                    id: 3,
                    altText: 'Скидки на экскурсии в Египте',
                    badgeText: 'Скидка',
                    badgeType: 'discount',
                },
                {
                    id: 4,
                    altText: 'Горящие туры в Турцию',
                },
                {
                    id: 5,
                    altText: 'Скидки на экскурсии в Египте',
                }
            ],
            responsive: [
                {
                    minWidth: 768,
                    slidesPerPage: 2,
                },
                {
                    minWidth: 1024,
                    slidesPerPage: 3,
                },
                {
                    minWidth: 1366,
                    slidesPerPage: 4,
                }
            ]
        }
    }
}
</script>
