<template>
    <article class="franchisor-card" :class="`franchisor-card_${type}`">
        <div class="franchisor-card__image-wrapper">
            <img class="franchisor-card__image" :src="image" :alt="name">
        </div>

        <div class="franchisor-card__content">
            <h3 class="franchisor-card__name">
                {{ name }}
            </h3>

            <div class="franchisor-card__tags">
                <span class="franchisor-card__tag">
                    {{ type === 'hotels' ? country : city }}
                </span>

                <span v-if="type === 'franchisors'" class="franchisor-card__tag">
                    {{ phone }}
                </span>
                <span v-if="type === 'hotels'" class="franchisor-card__stars">
                    <svg v-if="false" class="franchisor-card__star-icon" viewBox="0 0 24 24">
                        <path fill="currentColor"
                              d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/>
                    </svg>
                     {{ stars }} {{ starsWord }}
                </span>
            </div>

            <p class="franchisor-card__text">
                {{ text }}
            </p>

            <a class="franchisor-card__button" :href="link">
                Перейти
            </a>
        </div>
    </article>
</template>

<script>
export default {
    name: 'FranchisorCard',

    props: {
        type: {
            type: String,
            default: 'franchisors',
            validator: value => ['franchisors', 'hotels'].includes(value),
        },
        name: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            default: '',
        },
        country: {
            type: String,
            default: '',
        },
        phone: {
            type: String,
            default: '',
        },
        stars: {
            type: Number,
            default: 0,
        },
        text: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        link: {
            type: String,
            default: '#'
        }
    },
    computed: {
        starsWord() {
            const count = Number(this.stars);

            if (count === 1) {
                return 'звезда';
            }

            if (count >= 2 && count <= 4) {
                return 'звезды';
            }

            return 'звезд';
        },
    }
}
</script>

<style scoped>
.franchisor-card {
    display: grid;
    grid-template-columns: 320px 1fr;
    gap: 48px;
    align-items: center;
    width: 100%;
    padding: 20px;
    background: #ffffff;
    border-radius: 40px;
    box-shadow: 0 4px 40px 0 #00000033;
}

.franchisor-card__image-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    overflow: hidden;
}

.franchisor-card__image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}


.franchisor-card__image-wrapper::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;

    background: radial-gradient(
        ellipse 31.81% 60% at 0% 100%,
        rgba(240, 45, 0, 0.45) 0%,
        rgba(240, 45, 0, 0) 100%
    );
}

.franchisor-card__content {
    padding-right: 48px;
}

.franchisor-card__name {
    margin: 0 0 8px;
    font-size: 46px;
    font-weight: 500;
    line-height: 1;
}

.franchisor-card__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 27px;
}

.franchisor-card__tag {
    padding: 9px 18px;
    border: 2px solid transparent;
    border-radius: 100px;

    background: linear-gradient(#fff, #fff) padding-box,
    linear-gradient(to right, #F3000E, #FF5100) border-box;

    font-size: 18px;
    font-weight: bold;
    line-height: 1;
}

.franchisor-card__text {
    margin: 0 0 27px;
    font-size: 24px;
    line-height: 1;
}

.franchisor-card__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 333px;
    min-height: 60px;
    padding: 12px 32px;
    border-radius: 100px;
    background: linear-gradient(90deg, #F3000E 0%, #FF5100 100%);
    color: #ffffff;
    font-size: 24px;
    font-weight: bold;
    line-height: 1;
    text-decoration: none;
    text-transform: uppercase;
}

.franchisor-card__header {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 22px;
}

.franchisor-card__stars {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    min-height: 24px;
    padding: 3px 0;
    color: #000000;
    font-size: 13px;
    font-weight: 700;
    line-height: 1;
}

.franchisor-card__star-icon {
    width: 17px;
    height: 17px;
    color: #ff2b13;
}

@media (max-width: 767px) {
    .franchisor-card {
        display: flex;
        flex-direction: column;
        gap: 24px;
        padding: 12px;
        border-radius: 40px;
    }

    .franchisor-card__content {
        width: 100%;
        padding: 0;
    }

    .franchisor-card__image-wrapper {
        border-radius: 28px;
    }

    .franchisor-card__name {
        font-size: 32px;
    }

    .franchisor-card__tag {
        min-height: 32px;
        font-size: 14px;
    }

    .franchisor-card__text {
        font-size: 16px;
        line-height: 1;
    }

    .franchisor-card__button {
        width: 100%;
        min-width: 0;
        font-size: 24px;
    }
}
</style>
