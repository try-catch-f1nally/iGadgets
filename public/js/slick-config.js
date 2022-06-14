$(document).ready(function () {
    $('.slick-carousel').slick({
        autoplay: false,
        infinite: false,
        prevArrow: '<div class="slick-prev"><i class="bi-chevron-left"></i></div>',
        nextArrow: '<div class="slick-next"><i class="bi-chevron-right"></i></div>',
        mobileFirst: true,
        responsive: [
            {
                breakpoint: 370,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 5
                }
            }
        ]
    });
});