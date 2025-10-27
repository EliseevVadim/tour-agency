<template>
    <section class="reviews-section">
        <div class="container-fluid overflow-hidden">
            <h2 class="reviews-title text-center">Отзывы клиентов:</h2>
            <div class="reviews-slider">
                <ssr-carousel show-arrows :slides-per-page='1'
                              paginate-by-slide overflow-visible peek-right='10%' gutter='29'
                              :responsive='responsive'>
                    <template #back-arrow='{ disabled }'>
                        <span class="carousel-left-icon reviews-carousel-left-icon" :class="{'disabled': disabled}"></span>
                    </template>
                    <template #next-arrow='{ disabled }'>
                        <span class="carousel-right-icon reviews-carousel-right-icon" :class="{'disabled': disabled}"></span>
                    </template>

                    <review-card v-for="review in reviews"
                                 :key="review.id"
                                 :name="review.name"
                                 :gender="review.gender"
                                 :location="review.location"
                                 :text="review.text"
                                 :background-image="review.backgroundImage"
                                 :profile-image="review.profileImage"/>
                </ssr-carousel>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "ReviewSlider",
    data() {
        return {
            reviews: [
                {
                    id: 1,
                    name: "Нина Александровна",
                    gender: "была",
                    location: "Грузии",
                    text: "Спасибо за организацию отличного путешествия которое запомнится на всю жизнь!",
                    backgroundImage: '/img/review-sample-bg.png',
                    profileImage: '/img/avatar-sample.png'
                },
                {
                    id: 2,
                    name: "Нина Александровна",
                    gender: "была",
                    location: "Италии",
                    text: "Все было организовано безупречно, гид — профессионал своего дела!",
                    backgroundImage: '/img/review-sample-bg.png',
                    profileImage: '/img/avatar-sample.png'
                },
                {
                    id: 3,
                    name: "Нина Александровна",
                    gender: "была",
                    location: "Японии",
                    text: "Невероятные впечатления! Отдельное спасибо за подборку ресторанов.",
                    backgroundImage: '/img/review-sample-bg.png',
                    profileImage: '/img/avatar-sample.png'
                },
                {
                    id: 4,
                    name: "Нина Александровна",
                    gender: "была",
                    location: "Японии",
                    text: "Невероятные впечатления! Отдельное спасибо за подборку ресторанов.",
                    backgroundImage: '/img/review-sample-bg.png',
                    profileImage: '/img/avatar-sample.png'
                },
                {
                    id: 5,
                    name: "Нина Александровна",
                    gender: "была",
                    location: "Японии",
                    text: "Невероятные впечатления! Отдельное спасибо за подборку ресторанов.",
                    backgroundImage: '/img/review-sample-bg.png',
                    profileImage: '/img/avatar-sample.png'
                }
            ],
            responsive: [
                {
                    minWidth: 270,
                    slidesPerPage: 1,
                    center: true,
                    peek: 20,
                    gutter: 15
                },
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
