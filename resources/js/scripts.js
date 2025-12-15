document.addEventListener('DOMContentLoaded', function() {
    const promoContents = document.querySelectorAll('.promo-content');
    promoContents.forEach(promoContent => {
        const targetLink = promoContent.querySelector('.btn-cta');
        if (promoContent && targetLink) {
            targetLink.addEventListener('click', function(e) {
                e.stopPropagation();
            });

            promoContent.addEventListener('click', function() {
                window.location.href = targetLink.getAttribute('href');
            });

            promoContent.style.cursor = 'pointer';
        }
    });
});
