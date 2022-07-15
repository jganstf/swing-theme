import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import sidePanel from 'side-panel-menu-thing'

import Modal from '../components/popup-get-started.svelte'

const { $ } = window

const $body = $(document.body)

export default {
	init() {
		gsap.registerPlugin(ScrollTrigger)
		const mobileMenu = new sidePanel({
			target: $body[0],
			props: {
				target: $body[0],
				content: document.getElementById('mobile-menu'),
				fixed: true,
				width: 320,
			},
		})
		$('#toggle_nav').on('click', mobileMenu.show)

		$(document).on(
			'click',
			'.menu-section .menu-item-has-children > a',
			function (e) {
				e.preventDefault()
				let $el = $(this)
				$el.parent().toggleClass('show-subnav')
			}
		)

		testimonialSlider()
		textCardsBlock()
		animate()
	},
	finalize() {
		// JavaScript to be fired on all pages, after page specific JS is fired
		// class to hide outlines if not using keyboard
		$body.on('mousedown', function () {
			$body.addClass('using-mouse')
		})
		$body.on('keydown', function () {
			$body.removeClass('using-mouse')
		})

		new Modal({
			target: document.body,
		})
	},
}

function animate() {
	animateError404()
	// animateCTA()
	// animateFooter()
}
function animateError404() {
	if (!$('.error404').length) {
		return
	}
	const tl = gsap.timeline({
		defaults:{
			duration: 0.5,
			opacity: 0,
		},
		// scrollTrigger:{trigger:'.call-to-action'}
	})

	tl.from('h1', {delay: 0.5, y: -16})
	tl.from('h1 ~ p', {y: 16}, '-=0.5')
	tl.from('h1 ~ .btn', {}, '-=0.2')
}
function animateCTA() {
	if (!$('.call-to-action').length) {
		return
	}
	const tl = gsap.timeline({
		defaults:{},
		scrollTrigger:{trigger:'.call-to-action'}
	})
}
function animateFooter() {
	const tl = gsap.timeline({
		defaults:{},
		scrollTrigger:{trigger:'footer'}
	})
}

/**
 * Testimonial Slider Block
 */
function testimonialSlider() { //first found on for schools page
	const $testimonialSlider = $('.testimonial-slider')
	if(!$testimonialSlider.length) {
		return
	}

	$testimonialSlider.slick({
		// adaptiveHeight: true, //TODO flex? - for subs
		arrows: false,
		dots: true,
		fade: true,
		slidesToShow: 1,
		slidesToScroll: 1,
	})
}



/**
 * Text Cards Rotator Block
 */
function textCardsBlock() { //first found on for subs page under hero
	const $textCards = $('.text-cards-rotator .cards.slick')
	if(!$textCards.length) {
		return
	}

	$textCards.slick({
		//TODO adaptiveHeight: true,
		arrows: false,
		dots: false,
		fade: true,
		slidesToShow: 1,
		slidesToScroll: 1,
	})
	
	let $dots = $('.slick-dots li')
	$dots.each((idx, el) => {
		$(el).click(function() {
			$dots.removeClass('slick-active')
			$dots.find('button').attr('aria-selected', false)
			$textCards.slick('slickGoTo', idx)
			el.classList.add('slick-active')
			$(el).find('button').attr('aria-selected', true)
		})
	})	
}