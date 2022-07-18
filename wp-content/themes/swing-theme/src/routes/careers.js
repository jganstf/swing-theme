import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
const { $ } = window

export default {
	init() {
      gsap.registerPlugin(ScrollTrigger)

      let $careerProfiles = $('.careers-profiles.slick')
      if($careerProfiles.length) {
         $careerProfiles.slick({
            slideToShow: 1, 
            dots: true, 
         })
      }
	},
	finalize() {
		// JavaScript to be fired on the home page, after the init JS
	},
}