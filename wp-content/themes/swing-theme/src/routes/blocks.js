import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GettingStartedSteps from '../components/get-started-steps.svelte'

export function getTL(trigger) {
   let defaults = { opacity: 0, duration: 0.35, stagger: 0.1, ease:' power1.out'}
   let scrollTrigger = { trigger: trigger }
   return gsap.timeline({
      defaults: defaults,
      scrollTrigger: scrollTrigger
   })
}

export function partnerSlider() {
   let $partnersSlider = $('.partners-slider')
   if(!$partnersSlider.length) return

   // const tl = getTL($partnersSlider)

   $partnersSlider.slick({
      arrows: true,
      autoplay: true, 
      autoplaySpeed: 2000, 
      dots: false,
      slidesToShow: 8,
      responsive: [
         { breakpoint: 1500, settings: { slidesToShow: 6 }},
         { breakpoint: 1200, settings: { slidesToShow: 5 }},
         { breakpoint: 900,  settings: { slidesToShow: 4 }},
         { breakpoint: 700,  settings: { slidesToShow: 3 }},
      ]
   })
}
export function storiesSlider() {
   let $storiesSlider = $('.stories-wrap.slick')
   if(!$storiesSlider.length) return

   // const tl = getTL($partnersSlider)

   $storiesSlider.slick({
      arrows: true,
      autoplay: true, 
      autoplaySpeed: 10000, 
      dots: false,
      slidesToShow: 1,
      responsive: [
         { breakpoint: 1500, settings: { slidesToShow: 6 }},
         { breakpoint: 1200, settings: { slidesToShow: 5 }},
         { breakpoint: 900,  settings: { slidesToShow: 4 }},
         { breakpoint: 700,  settings: { slidesToShow: 3 }},
      ]
   })
}

export function gettingStartedSteps() {
   let $container = $('.get-started-steps')
   if(!$container.length) return

   new GettingStartedSteps({
      target: $container[0]
   })

}

export function _gettingStartedSteps() {

   // const tl = getTL($partnersSlider)

   $(".frame").each(function (idx, item) {
      //slideNum = $(this).data("slide");
    
      // window.addEventListener('wheel', (function () {
        var $wrap = $(item).parent();
        console.log($wrap)
        // Call Sly on frame
        //$(item + '[data-slide="' + slideNum + '"]').sly({
        $(item).sly({
          horizontal: 1,
          itemNav: "centered",
          smart: 1,
          activateOn: "click",
          mouseDragging: 1,
          touchDragging: 1,
    //      releaseSwing: 1,
          startAt: 0,
          scrollBar: $wrap.find(".scrollbar"),
          scrollBy: 0,
          speed: 0,
          //elasticBounds: 1,
          //easing: 'easeOutExpo',
          dragHandle: 1,
          swingSpeed: 0.1,
          dynamicHandle: 1,
          clickBar: 1,
          //scrollTrap: 1,
          scrollHijack: 2000,
    
          // Buttons
          prev: $wrap.find(".prev"),
          next: $wrap.find(".next")
        });
      })();//, {passive:false});
    //});
   
}