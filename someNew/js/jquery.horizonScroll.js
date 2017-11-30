// Semicolon to prevent breakage with concatenation.
;
(function ($) {
    'use strict';

    $.fn.horizon = function (options, i) {
        if (options === 'scrollLeft') {
            scrollLeft();
        } else if (options === 'scrollRight') {
            scrollRight();
        } else if (options === 'scrollTo') { // TODO: Should verify i here
            scrollTo(i, $.fn.horizon.defaults.scrollDuration);
        } else {
            $.extend($.fn.horizon.defaults, options);

            $.fn.horizon.defaults.sections = this;
            $.fn.horizon.defaults.limit = this.length;
            $.fn.horizon.defaults.i = 0;

            sizeSections();

            $(document).on('mousewheel DOMMouseScroll', function (e) {
                // Equalize event object.
                var evt = window.event || e;
                // Convert to originalEvent if possible.
                evt = evt.originalEvent ? evt.originalEvent : evt;
                // Check for detail first, because it is used by Opera and FF.
                var delta = evt.detail ? evt.detail * (-40) : evt.wheelDelta;

                scrollAction(delta);
            }).on('click', '.horizon-next', function () {
                scrollRight();
            }).on('click', '.horizon-prev', function () {
                scrollLeft();
            });

            if ($.fn.horizon.defaults.swipe) {
                $(document).swipe({
                    // Generic swipe handler for all directions.
                    swipe: function (event, direction, distance, duration, fingerCount) {
                        if (scrolls[direction]) {
                            scrolls[direction]();
                        }
                    },
                    /*click: function (event, target) {
                     event.preventDefault();
                     event.stopPropagation();
                     event.stopImmediatePropagation();

                     //$(target).click();
                     },
                     tap: function (event, target) {
                     event.preventDefault();
                     event.stopPropagation();
                     event.stopImmediatePropagation();

                     $(target).click();
                     },*/
                    // Default is 75px, set to 0 for demo so any distance triggers swipe
                    threshold: 75
                });
            }

            $(window).on('resize', function () {
                sizeSections();
            }).on('keydown', function (e) {
                if (scrolls[e.which]) {
                    scrolls[e.which]();
                    e.preventDefault();
                }
            });

            return this;
        }
    };

    $.fn.horizon.defaults = {
        scrollTimeout: null,
        scrollEndDelay: 250,
        scrollDuration: 750,
        i: 0,
        limit: 0,
        docWidth: 0,
        sections: null,
        swipe: true,
        fnCallback: function (i) {
        }
    };

// HTML animate does not work in webkit. BODY does not work in opera.
// For animate, we must do both.
// http://stackoverflow.com/questions/8790752/callback-of-animate-gets-called-twice-jquery
    var scrollTo = function (index, speed) {
        if (index > ($.fn.horizon.defaults.limit - 1) || index < 0) {
            return;
        }
        if (index === 8) {
            return;
        }

        $.fn.horizon.defaults.i = index;

        var $section = $($.fn.horizon.defaults.sections[index]);
        $('html,body').animate({scrollLeft: $section.offset().left}, speed, 'swing', $.fn.horizon.defaults.fnCallback(index));

        if (index === 0) {
            $('.horizon-prev').hide();
            $('.horizon-next').show();
        } else if (index === 7) {
            $('.horizon-prev').show();
            $('.horizon-next').hide();
        } else {
            $('.horizon-next').show();
            $('.horizon-prev').show();
        }

        // Стрелка вперед
        $('.horizon-next').prop("disabled", true);
        setTimeout(function () {
            $('.horizon-next').prop("disabled", false);
        }, 1000);
        // Стрелка назад
        $('.horizon-prev').prop("disabled", true);

        setTimeout(function () {
            $('.horizon-prev').prop("disabled", false);
        }, 1000);

        // Ссылки в блоке контента
        $('.slider-nav__list li').prop("disabled", true);

        setTimeout(function () {
            $('.slider-nav__list li').prop("disabled", false);
        }, 1000);
    };

    var scrollLeft = function () {

        var i2 = $.fn.horizon.defaults.i - 1;

        if (i2 > -1) {
            scrollTo(i2, $.fn.horizon.defaults.scrollDuration);
        }

        viewActiveScrollStr();
        viewActivLinkScrollToggle();

        if(i2 < 0) {
            return;
        } else {
            var num = $.fn.horizon.defaults.i;

            var $showSlideText = $('.slider__content').eq(i2);

            $('.slider__content').eq(num + 1).css("opacity", "0");

            $showSlideText.css("opacity", "0");

            setTimeout(function () {
                $showSlideText.animate(
                    {
                        "opacity": "1"
                    },
                    300);
            }, 500);
        }
    };

    var scrollRight = function () {

        var i2 = $.fn.horizon.defaults.i + 1;
        if (i2 < $.fn.horizon.defaults.limit) {
            scrollTo(i2, $.fn.horizon.defaults.scrollDuration);
        }        

        viewActiveScrollStr();
        viewActivLinkScrollToggle();

        if(i2 > 7) {
            return;
        } else {
            var num = $.fn.horizon.defaults.i;

            var $showSlideText = $('.slider__content').eq(i2);

            $('.slider__content').eq(num - 1).css("opacity", "0");

            $showSlideText.css("opacity", "0");

            setTimeout(function () {
                $showSlideText.animate(
                    {
                        "opacity": "1"
                    },
                    300);
            }, 500);
        }
    };


// Executes on 'scrollbegin'.
    var scrollBeginHandler = function (delta) {
        // Scroll up, Scroll down.
        if (delta > 1) {
            scrollLeft();
        } else if (delta < -1) {
            scrollRight();
        }
    };

// Executes on 'scrollend'.
    var scrollEndHandler = function () {
        $.fn.horizon.defaults.scrollTimeout = null;
    };

    var scrollAction = function (delta) {
        if ($.fn.horizon.defaults.scrollTimeout === null) {
            scrollBeginHandler(delta);
        } else {
            clearTimeout($.fn.horizon.defaults.scrollTimeout);
        }

        $.fn.horizon.defaults.scrollTimeout = setTimeout(scrollEndHandler, $.fn.horizon.defaults.scrollEndDelay);
    };

    var sizeSections = function () {
        console.log('Sizing sections...');

        var iInnerWidth = $(window).innerWidth();

        $.fn.horizon.defaults.docWidth = iInnerWidth;
        $.fn.horizon.defaults.sections.each(function () {
            $(this).width(iInnerWidth);
        });

        $('html').width($.fn.horizon.defaults.limit * iInnerWidth);

        // scrollTo($.fn.horizon.defaults.i, 0);
        scrollTo(0, $.fn.horizon.defaults.scrollDuration);
    };

    var scrolls = {
        'right': scrollLeft,
        'down': scrollLeft,
        'left': scrollRight,
        'up': scrollRight,
        37: scrollLeft,
        38: scrollLeft,
        39: scrollRight,
        40: scrollRight
    };

    /*************************************
           *** МОИ ДОБАВЛЕНИЯ ***
    **************************************/

    // Меняем цвет индикатора-ленту  под картинкой
    var viewActiveScrollStr = function () {
        var i2 = $.fn.horizon.defaults.i;

        if (i2 <= 7) {
            $('.view-scroll .scroll-str--active').removeClass('scroll-str--active');
            $('.view-scroll div').eq(i2).addClass('scroll-str--active');
        }
    };

    //Меняем цвет активным ссылкам переключателям слайдера
    var viewActivLinkScrollToggle = function () {
        var i2 = $.fn.horizon.defaults.i;

        if (i2 <= 7) {
            $('.slider-nav__list .slider-nav__list-item--active').removeClass('slider-nav__list-item--active');
            $('.slider-nav__list li').eq(i2).addClass('slider-nav__list-item--active');
        }
    };
    
    // Событие - переключатель скролла по ссылкам
    $('.slider-nav__list').on('click', 'li', function() {

        // Узнаем на каком елементе был клик и записываем его индекс
        var i2 = $(this).index();
        console.log(i2);
        var num = $.fn.horizon.defaults.i;

        scrollTo(i2, $.fn.horizon.defaults.scrollDuration);

        viewActiveScrollStr();
        viewActivLinkScrollToggle();



        $('.slider__content').eq(num).css("opacity", "0");

        var $showSlideText = $('.slider__content').eq(i2);

        $showSlideText.css("opacity", "0");

        setTimeout(function () {
            $showSlideText.animate(
                {
                    "opacity": "1"
                },
                300);
        }, 500);
    });
})
(jQuery);



// SCROLLING NOTES
// http://stackoverflow.com/questions/4989632/differentiate-between-scroll-up-down-in-jquery
// http://stackoverflow.com/questions/4289473/javascript-do-an-action-after-user-is-done-scrolling
