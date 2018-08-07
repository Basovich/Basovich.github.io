(function ($) {

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
    tl.to(".logo", 1, {'height': '90px', 'width': '90px', 'transform': 'matrix(1, 0, 0, 1, 0, 0)'}, 'logo');


    /*.staggerTo('.letter', .2, {autoAlpha:1, scale:1, transformOrigin: "1px 1px 0px"}, 0.05)
    .to(".logo", 1, {autoAlpha:1})
    .staggerTo('.letter', .2, {autoAlpha:0, scale:1, transformOrigin: "1px 1px 0px"}, 0.03)
    .to(".name", .5, {autoAlpha:1, y:0}, "-=0.15")*/


    // init controller
    // var controller = new ScrollMagic.Controller();

    // create a scene
    //  var logoOnLoad = new ScrollMagic.Scene({
    //          triggerElement: '.block_3', // с этого блока начнеться анимация
    //          //duration: "40%", // через сколько проиграть анимаци обратно - скрыть элемент
    //          triggerHook: 0.1, // отметка начала анимации - если поднять вышее нее, то возвращает в положение до анимации, если только не включить reverse
    //          //reverse: false // анимация играет только 1 раз, надо удалить свойство duration
    //      })
    //          .setClassToggle('.block_3', 'bg_color')	// добавляем класс, когда блок с id в зоне видимости
    //          .addIndicators() // добавляет отметки при пересичении которых начинаеться анимация начала анимации
    //          .addTo(controller)
    //  ;


}(jQuery));