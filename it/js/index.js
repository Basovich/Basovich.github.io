"use strict";
(function ($) {

    $('.slider-preview').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        vertical:true,
        arrows:true,
        speed: 500,
        infinite: false,
        pauseOnHover:true,
        pauseOnDotsHover:true,
        draggable: false,
        swipe: false,
        useTransform: true,
        prevArrow: '<div class="prev-slide"></div>',
        nextArrow: '<div class="next-slide"></div>'
    });

    $('.big-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:true,
        speed: 500,
        infinite: false,
        pauseOnHover:true,
        pauseOnDotsHover:true,
        draggable: false,
        swipe: false,
        useTransform: true,
        fade: true,
        prevArrow: '<div class="prev-slide"></div>',
        nextArrow: '<div class="next-slide"></div>'
    });


    // Open and close select
    $('.nice-select').on('click', function(e) {
        $('.nice-select').not($(this)).removeClass('open');
        $(this).toggleClass('open');
    });
    // close select if click target it`s not select
    $(document).on('mouseup', function (e){
        var select = $(".nice-select"),
            calendar = $('.data-input-fields');

        if (!select.is(e.target)
            && select.has(e.target).length === 0) {
            select.removeClass('open');
        }

        if (!calendar.is(e.target)
            && calendar.has(e.target).length === 0) {
            calendar.removeClass('isOpened');
        }
    });
    //записываем выбор в селект
    $('.option').on('click', function() {
        var value = $(this).text();
        $(this).parents('.nice-select').find('span.current').text(value);
        $(this).parents('.nice-select').find('.option').removeClass('selected').removeClass('focus');
        $(this).addClass('selected').addClass('focus');
    });


    //Slick
    $('.slider-preview .slide.slick-slide').on('click', function() {

        // console.log($(this));
        // console.log($(this).attr('data-slick-index'));
        $('.big-slider').slick('slickGoTo', ($(this).attr('data-slick-index')) );
    });


    $('.data-input-fields').on('click', function() {
        $(this).toggleClass('isOpened');
    });


})(jQuery);