(function ($) {
    "use strict";

    /*START animation logo*/
    var tl = new TimelineLite();

    tl.from(".logo", 1, {autoAlpha: 0, y: 100})
    tl.to(".logo", .3, {'transform': 'rotate(5deg)', 'transformOrigin': '50% 2%',})
    tl.to(".logo", .3, {'transform': 'rotate(-15deg)', 'transformOrigin': '50% 2%',})
    tl.to(".logo", .3, {'transform': 'rotate(15deg)', 'transformOrigin': '50% 2%',})
    tl.to(".logo", .3, {'transform': 'rotate(-10deg)', 'transformOrigin': '50% 2%',})
    tl.to(".logo", .3, {'transform': 'rotate(8deg)', 'transformOrigin': '50% 2%',})
    tl.to(".logo", .3, {'transform': 'rotate(-4deg)', 'transformOrigin': '50% 2%',})
    tl.to(".logo", .3, {'transform': 'rotate(0deg)', 'transformOrigin': '50% 2%',})
    tl.from(".logo__text", 1, {autoAlpha: 0, y: -10})
    tl.to(".main-menu", 1, {'height': '100px'}, 'logo')
    tl.to(".logo", 1, {'height': '80px', 'width': '80px', 'transform': 'matrix(1, 0, 0, 1, 0, 7)'}, 'logo');
    /*END animation logo*/

    /*START parallax photo on mousse*/
    (function(){
        var x;
        var y;
        var x2;
        var y2;
        var l = -parseInt($('.slide').width() - $('.head-page-slider').width()) / 40;
        var t = -parseInt($('.slide').height() - $('.head-page-slider').height()) / 40;
        $('.slide').css('transform', 'translateX(' + (l / 50) + 'px)' + ' translateY(' + (t / 50) + 'px)');
        $('.slide-item').mouseenter(function (e) {
            var x = e.pageX;
            var y = e.pageY;
            $('.slide-item').mousemove(function (b, d) {
                var x2 = b.pageX;
                var y2 = b.pageY;
                var p = x2-x;
                var d = y2-y;
                var tl = new TimelineLite();
                tl.to('.slide', 1.5, {x: l - p / 50, y: t - d / 50});
            });
        });
    })();
    /*END parallax photo on mousse*/

    /*START mini-slider*/
    $('.menu-gallery .img-title').on("click", function () {
        var num = $(this).index();

        $('.menu-gallery .img-title').removeClass('active');
        $('.menu-gallery .content').removeClass('active');
        $('.img-slide-group').removeClass('active');


        $(this).addClass('active');
        $('.menu-gallery .content').eq(num).addClass('active');
        $('.img-slide-group').eq(num).addClass('active');

    });
    /*END mini-slider*/


    /*START parallax on scroll*/
    var rellax_1 = new Rellax('.bg-parallax', {
        speed: -2,
        center: true,
        wrapper: null,
        round: true,
        vertical: true,
        horizontal: false
    });

    var rellax_2 = new Rellax('.bg-img', {
        speed: -2,
        center: true,
        wrapper: null,
        round: true,
        vertical: true,
        horizontal: false
    });
    /*END parallax on scroll*/














}(jQuery));