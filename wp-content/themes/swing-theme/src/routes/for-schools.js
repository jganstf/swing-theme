import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const { $ } = window

export default {
	init() {
		gsap.registerPlugin(ScrollTrigger)

      // $('.cards-overflow').scroll((e) => console.log($($('.cards-container').find('.card')[0]).offset()))
      var options = {
         horizontal: 1,
         itemNav: 'basic',
         speed: 300,
         mouseDragging: 1,
         touchDragging: 1,
         //scrollbar
         scrollBar: '#test-scrollbar',
         dragHandle: true,
         // dynamicHandle: true,
      };
      // var frame = new Sly('#test', options).init();


		animateForSchools()
	},
	finalize() {
		// JavaScript to be fired on the home page, after the init JS
	},
}

function animateForSchools() {

}