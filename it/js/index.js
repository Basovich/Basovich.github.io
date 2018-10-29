"use strict";
(function ($) {

    $('.slider-preview').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        // vertical:true,
        arrows:true,
        speed: 500,
        infinite: false,
        pauseOnHover:true,
        pauseOnDotsHover:true,
        swipeToSlide: true
    });

    $('.big-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:true,
        speed: 500,
        infinite: false,
        pauseOnHover:true,
        pauseOnDotsHover:true,
        swipeToSlide: true
    });


    $('.js-select').on('click', function() {
        $(this).find('.list').addClass('show-list');
    });
})(jQuery);