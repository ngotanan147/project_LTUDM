const swiper = new Swiper('.swiper-container', {
    slidesPerView: 5,
    spaceBetween: 30,
    breakpoints: {
        '1': {
            slidesPerView: 1,
            spaceBetween: 40,
        },
        '700': {
            slidesPerView: 2,
            spaceBetween: 40,
        },

        '900': {
            slidesPerView: 3,
            spaceBetween: 40,
        },

        '1100': {
            slidesPerView: 3,
            spaceBetween: 40,
        },

        '1300': {
            slidesPerView: 4,
            spaceBetween: 40,
        },

    },
    pagination: {
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});