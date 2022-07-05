import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
// import sidePanel from 'side-panel-menu-thing'

const { $ } = window

const $body = $(document.body)

export default {
	init() {
		gsap.registerPlugin(ScrollTrigger)
		// const mobileMenu = new sidePanel({
		// 	target: $body[0],
		// 	props: {
		// 		target: $body[0],
		// 		content: document.getElementById('mobile-menu'),
		// 		fixed: true,
		// 		width: 320,
		// 	},
		// })
		// $('#toggle_nav').on('click', mobileMenu.show)

		// $(document).on(
		// 	'click',
		// 	'.menu-section .menu-item-has-children > a',
		// 	function (e) {
		// 		e.preventDefault()
		// 		let $el = $(this)
		// 		$el.parent().toggleClass('show-subnav')
		// 	}
		// )

		// animate()
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
	},
}

function animate() {
	animateCTA()
	animateFooter()
}
function animateCTA() {
	if (!$('.call-to-action').length) {
		return
	}
}
function animateFooter() {
}