import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
const { $ } = window

export default {
	init() {
      gsap.registerPlugin(ScrollTrigger)

      let $careerProfiles = $('.careers-profiles.slick')
      if($careerProfiles.length) {
         $careerProfiles.slick({
            arrows: false,
            dots: true, 
            fade: true,
            slideToShow: 1, 
         })
      }

      $('.cprofile').click(() => {
         console.log('click')
      })
	},
	finalize() {
		// JavaScript to be fired on the home page, after the init JS
	},
}