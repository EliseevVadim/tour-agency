<template>
    <div class="franchisors-content" :class="`franchisors-content_${pageType}`">
        <div class="loader" v-if="loading">
            <div class="loader__dot"></div>
            <div class="loader__dot"></div>
            <div class="loader__dot"></div>
        </div>

        <app-header :isPageHotels="isHotelsPage" class="hero-section-absolute hero-section_dark"/>

        <div class="hero-content-wrapper">
            <div class="hero-background-video">
                <video class="h-100 w-100" autoplay muted loop playsinline>
                    <source :src="pageConfig.heroImage" type="video/mp4">
                </video>
            </div>

            <div class="hero-main-text">
                <h1 v-if="isHotelsPage" class="hero-main-title">
                    Лучшие
                    <br class="desktop-br">
                    отели
                </h1>

                <h1 v-else class="hero-main-title">
                    Фирменные
                    <br class="desktop-br">
                    медиа
                    <br class="mobile-br">
                    и офлайн-офисы
                </h1>
            </div>

            <div class="scroll-indicator">
                <div class="scroll-arrow-container">
                    <svg class="scroll-arrow" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
                    </svg>
                </div>
            </div>
        </div>

        <section class="franchisors-section container-xl">
            <div class="franchisors-section__container">
                <div class="franchisors-section__intro">
                    <template v-if="isHotelsPage">
                        <p>
                            На этой странице вы найдете информацию <br class="mobile-br desktop-br">
                            <strong>о лучших отелях,</strong>
                            которые команда туристической компании "В ПУТЬ"<br class="mobile-br desktop-br">
                            посетила лично и рекомендует для наших туристов.
                        </p>

                        <p>
                            Выберите страну, которая <br class="mobile-br br-small"> вам интересна, и посмотрите<br
                            class="mobile-br br-small"><br class="desktop-br">
                            отели, которые мы рекомендуем <br class="mobile-br br-small"> для вашего отдыха.
                        </p>
                    </template>

                    <template v-else>
                        <p>
                            На этой странице вы найдете информацию о наших <br class="mobile-br desktop-br">
                            <strong>фирменных медиа и офлайн-офисах,</strong>
                            созданных специально<br class="mobile-br desktop-br">
                            для того, чтобы ваш отдых был комфортным и незабываемым.
                        </p>

                        <p>
                            Выберите город, который <br class="mobile-br br-small"> вам интересен, и свяжитесь<br
                            class="mobile-br br-small"><br class="desktop-br">
                            напрямую с нашей компанией <br class="mobile-br br-small"> в вашем регионе — мы всегда <br
                            class="mobile-br desktop-br">
                            готовы помочь вам организовать идеальный отдых!
                        </p>
                    </template>
                </div>

                <form class="franchisors-section__search" @submit.prevent>
                    <input v-model="searchQuery" class="franchisors-section__input" type="text"
                           :placeholder="pageConfig.searchPlaceholder">

                    <button class="franchisors-section__button" type="submit">
                        Найти
                    </button>
                </form>

                <div class="franchisors-section__cards">
                    <FranchisorCard v-for="item in filteredItems" :key="item.id"
                                    :type="pageType" :name="item.name" :city="item.city" :country="item.country"
                                    :phone="item.phone" :stars="item.stars" :socials="item.socials" :text="item.text"
                                    :image="item.image" :link="item.link"/>
                </div>
            </div>
        </section>

        <app-footer></app-footer>
    </div>
</template>

<script>
import FranchisorCard from "./components/FranchisorCard.vue";

export default {
    name: "FranchisorsPage",

    components: {
        FranchisorCard,
    },

    props: {
        pageType: {
            type: String,
            default: 'franchisors',
            validator: value => ['franchisors', 'hotels'].includes(value),
        },
    },

    data() {
        return {
            loading: false,
            searchQuery: '',
            items: [],
        };
    },

    computed: {
        isHotelsPage() {
            return this.pageType === 'hotels';
        },

        pageConfig() {
            if (this.isHotelsPage) {
                return {
                    apiUrl: '/api/hotels',
                    heroImage: '/videos/3.mp4',
                    searchPlaceholder: 'Введите название страны',
                    filterField: 'country',
                };
            }

            return {
                apiUrl: '/api/franchisors',
                heroImage: '/videos/1.mp4',
                heroAlt: 'hero franchisors section',
                searchPlaceholder: 'Введите название города',
                filterField: 'city',
            };
        },

        filteredItems() {
            if (!this.searchQuery.trim()) {
                return this.items;
            }

            const query = this.searchQuery.toLowerCase().trim();
            const field = this.pageConfig.filterField;

            return this.items.filter(item =>
                String(item[field] || '').toLowerCase().includes(query)
            );
        },
    },

    created() {
        this.fetchItems();
    },

    methods: {
        async fetchItems() {
            this.loading = true;

            try {
                const response = await axios.get(this.pageConfig.apiUrl);
                const data = response.data.data || [];

                this.items = data.map(item => {
                    if (this.isHotelsPage) {
                        return {
                            id: item.id,
                            name: item.name,
                            country: item.country,
                            stars: Number(item.stars || 0),
                            socials: item.socials || [],
                            text: item.description,
                            image: item.image_url,
                            link: item.link || '#',
                        };
                    }

                    return {
                        id: item.id,
                        name: item.name,
                        city: item.city,
                        phone: item.phone,
                        text: item.description,
                        image: item.image_url,
                        link: item.link || '#',
                    };
                });
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
                this.items = [];
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>

<style scoped>
.hero-content-wrapper::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
    z-index: -1;
}

.franchisors-content_franchisors .hero-background-video video {
    object-position: 60%;
}

.hero-main-title {
    color: white;
    font-weight: 700;
    text-transform: uppercase;
}

.mobile-br {
    display: none;
}

.desktop-br {
    display: block;
}

@media (min-width: 1024px) {
    h1, .h1 {
        font-size: 60px;
    }
}

@media (max-width: 399px) {
    .franchisors-section__intro .mobile-br.desktop-br {
        display: block !important;
    }

    .franchisors-section__intro .mobile-br.br-small {
        display: block;
    }
}

@media (min-width: 399.98px) {
    .franchisors-section__intro .mobile-br.br-small {
        display: none;
    }
}

@media (max-width: 767px) {
    .mobile-br {
        display: block;
    }

    .desktop-br {
        display: none;
    }
}

.franchisors-section {
    padding-bottom: 100px;
}

.franchisors-section__intro {
    margin: 0 auto 120px;
    text-align: center;
}

.franchisors-section__intro p {
    margin: 0 0 24px;
    font-size: 32px;
    line-height: 1;
}

.franchisors-section__intro p:last-child {
    margin-bottom: 0;
}

.franchisors-section__intro strong {
    font-weight: 700;
}

.franchisors-section__search {
    display: flex;
    width: 100%;
    max-width: 840px;
    height: 60px;
    margin: 0 auto 65px;
    border-radius: 12px;
    overflow: hidden;
    background: #F1F0F1;
}

.franchisors-section__input {
    flex: 1;
    min-width: 0;
    height: 100%;
    padding: 0 30px;
    border: none;
    outline: none;
    background: transparent;
    font-size: 24px;
}

.franchisors-section__input::placeholder {
    color: #9c9c9c;
}

.franchisors-section__button {
    width: 132px;
    height: 100%;
    border: none;
    border-radius: 16px;
    background: linear-gradient(90deg, #F3000E 0%, #FF5100 100%);
    color: #ffffff;
    font-size: 24px;
    font-weight: 700;
    text-transform: uppercase;
    cursor: pointer;
}

.franchisors-section__cards {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.desktop-br {
    display: block;
}

@media (max-width: 767px) {
    .franchisors-section__container {
        max-width: 100%;
    }

    .franchisors-section__intro {
        margin-bottom: 48px;
    }

    .franchisors-section__intro p {
        margin-bottom: 22px;
        font-size: 16px;
        line-height: 1.05;
    }

    .desktop-br {
        display: none;
    }

    .franchisors-section__search {
        height: 48px;
        margin-bottom: 48px;
        border-radius: 12px;
    }

    .franchisors-section__input {
        padding: 0 16px;
        font-size: 16px;
    }

    .franchisors-section__button {
        width: 99px;
        border-radius: 16px;
        font-size: 16px;
    }

    .franchisors-section__cards {
        gap: 24px;
    }
}
</style>
