(function ($) {
    $(window).scroll(function () {
        // Универсальная фун-ия для скрытия и показа элемента 
        // при прокрутке страницы вертикально, без анимации
        var showHideTitle = function (elem) {
            var offset = elem.offset();

            if ($(this).scrollTop() > offset.top - 70) {
                elem.css("opacity", "0");
            } else if ($(this).scrollTop() < offset.top - 70) {
                elem.css("opacity", "1");
            }
        };

        //Запускаем скритие-появление тайтлов
        showHideTitle($('.title1'));
        showHideTitle($('.title2'));
        showHideTitle($('.title3'));
        showHideTitle($('.title4'));
        showHideTitle($('.title5'));
        showHideTitle($('.title6'));
        showHideTitle($('.title7'));
        showHideTitle($('.title8'));
    });

    // Фун-ия переключатель класса для
    // блоков с фоновыми картинками
    var sticky = function(el1, el2) {
        var offset;

        function refreshVar() {
            offset = el1.offset().top;
        }

        refreshVar();

        $(window).resize(refreshVar);

        $(window).scroll(function () {
            var stickyBGImage = function (elem1, elem2) {
                if ($(this).scrollTop() > offset + 208) {
                    elem2.css('margin-top', '316px');
                    elem1.addClass("sticky-menu");

                } else if ($(this).scrollTop() < offset + 208) {
                    elem1.removeClass("sticky-menu");
                    elem2.css('margin-top', '36px');
                }
            };

            stickyBGImage(el1, el2);
        });
    };
    //Запускаем прилипание низа картинок в меню с событием смены ширины экрана
    $(window).resize(sticky($('.slider-block1'), $('.slider__content1')));
    $(window).resize(sticky($('.slider-block2'), $('.slider__content2')));
    $(window).resize(sticky($('.slider-block3'), $('.slider__content3')));
    $(window).resize(sticky($('.slider-block4'), $('.slider__content4')));
    $(window).resize(sticky($('.slider-block5'), $('.slider__content5')));
    $(window).resize(sticky($('.slider-block6'), $('.slider__content6')));
    $(window).resize(sticky($('.slider-block7'), $('.slider__content7')));
    $(window).resize(sticky($('.slider-block8'), $('.slider__content8')));
}(jQuery));