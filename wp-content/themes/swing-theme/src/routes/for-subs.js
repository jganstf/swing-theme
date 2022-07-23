import HomeTestimonials from '../components/home-testimonials.svelte'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const { $ } = window

export default {
	init() {
		gsap.registerPlugin(ScrollTrigger)
		animateForSubs()
	},
	finalize() {
		// JavaScript to be fired on the home page, after the init JS
	},
}

function animateForSubs() {
   animateTextCardRotator()
}

function animateTextCardRotator() { //TODO move to common.js; for each
   let $container = $('.text-cards-rotator')
   if(!$container.length)return

   $('.text-cards-rotator').each((_idx, el) => {
      const tl = gsap.timeline({
         defaults: { opacity: 0, ease:'power1.out', duration: 0.35, stagger: 0.1},
         scrollTrigger: {trigger: el, start: 'center bottom'} //mobile
      })

      var textWrapper = $(el).find('h2 .letters')[0]
      textWrapper.innerHTML = textWrapper.textContent.replace(/\S+/g, "<span class='word'>$&</span>")
      gsap.set($(el).find('.word'), {opacity: 0, y: 24, x: 0, rotateZ: 0})
      tl.to(
         $(el).find('.word'),
         {
            y:0,
            delay: 0.25,
            duration: 0.65,
            ease: "elastic.out(1,0.5)",
            stagger: 0.05,
            opacity: 1
         })
         .from(
            $(el).find('h2 ~ p'),
            {
               y: 16,
               // duration: 0.2
            },
            '-=0.85'
         )
         .from(
            $(el).find('.slick-dots'),
            {
               x: 32,
               duration: 0.2
            },
            '-=0.85'
         )
         .from(
            $(el).find('.tcr-cards'),
            {
               y: 32,
            },
            '-=0.85'
         )
   })
}