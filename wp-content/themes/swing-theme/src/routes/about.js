import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
const { $ } = window

export default {
	init() {
		aboutCardRotator()
	},
	finalize() {
		// JavaScript to be fired on the home page, after the init JS
	},
}

function aboutCardRotator() {
	const $aboutCardRotator = $('.acr-cards-wrap.slick')
	if(!$aboutCardRotator.length) {
		return
	}

	$aboutCardRotator.slick({
		// adaptiveHeight: true, //TODO flex? - for subs
		arrows: false,
		dots: true,
		fade: true,
		slidesToShow: 1,
		slidesToScroll: 1,
	})
}