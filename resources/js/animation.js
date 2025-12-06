export function initPromoAnimation() {
    const animateCSS = (element, animation, prefix = 'animate__') => {
        return new Promise((resolve, reject) => {
            const animationName = `${prefix}${animation}`;
            const node = document.querySelector(element);

            node.classList.add(`${prefix}animated`, animationName);

            function handleAnimationEnd(event) {
                event.stopPropagation();
                node.classList.remove(`${prefix}animated`, animationName);
                resolve('Animation ended');
            }

            node.addEventListener('animationend', handleAnimationEnd, {once: true});
        });
    };

    const threshold = 0.1;

    const phoneContainer = document.querySelector('.phone-mockup-container');
    const phoneScreen = document.querySelector('.phone-screen');
    const floatingCards = document.querySelectorAll('.floating-card');
    const textBlock = document.querySelector('.promo-content .text-block');

    const checkVisibilityDiscount = () => {
        const rect = phoneContainer.getBoundingClientRect();
        const isVisible =
            rect.top < window.innerHeight * (1 - threshold) && rect.bottom > window.innerHeight * threshold;

        if (!isVisible) return;

        window.removeEventListener('scroll', checkVisibilityDiscount);
        phoneScreen.classList.add('animate__fadeIn', 'animate__fast');
        textBlock.classList.add('animate__fadeInLeft', 'animate__slower')

        floatingCards.forEach(async (card, idx) => {
            if (card.classList.contains('card-1') || card.classList.contains('card-3')) {
                card.classList.add('animate__fadeInLeft');
            } else if (card.classList.contains('card-2')) {
                card.classList.add('animate__fadeInRight');
            }

            animateCSS('.floating-card', 'animate__fadeInLeft').then((message) => {
                card.classList.add('is-active', 'opacity-100');
            });
            animateCSS('.floating-card', 'animate__fadeInRight').then((message) => {
                card.classList.add('is-active');
            });
        });
    };

    const benefitsContainer = document.querySelector('.benefits-container');
    const benefitsItems = document.querySelectorAll('.benefits-item');
    const checkVisibilityBenefits = () => {
        const rect = benefitsContainer.getBoundingClientRect();
        const isVisible =
            rect.top < window.innerHeight * (1 - threshold) && rect.bottom > window.innerHeight * threshold;

        if (!isVisible) return;

        window.removeEventListener('scroll', checkVisibilityBenefits);

        benefitsItems.forEach(async (card, idx) => {
            card.classList.add('animate__fadeInUp');
        });
    };

    window.addEventListener('scroll', checkVisibilityDiscount);
    checkVisibilityDiscount();

    window.addEventListener('scroll', checkVisibilityBenefits);
    checkVisibilityBenefits();
}
