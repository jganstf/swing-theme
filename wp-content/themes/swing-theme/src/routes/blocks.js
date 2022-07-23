import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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