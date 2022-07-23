import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
// import sidePanel from 'side-panel-menu-thing'

import LoginModal from '../components/popup-login.svelte'
import GetStartedModal from '../components/popup-get-started.svelte'
import NewsLetterModal from '../components/popup-newsletter.svelte'

import { 
	partnerSlider 
} from './blocks'

const { $ } = window

const $body = $(document.body)

export default {
	init() {
		gsap.registerPlugin(ScrollTrigger)
		mobileMenu()
		testimonialSlider()
		stepSlider()
		textCardsBlock()
		animateWpBlockMediaText()
		helpfulArticles()
		partnerSlider()

		if(window.innerWidth < 767) { //TODO move to route
			postSlider()
		}
		
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

		
		function animateShow() {
			const tl = gsap.timeline({})
			var textWrapper = document.querySelector('.modal h2')
			textWrapper.innerHTML = textWrapper.textContent.replace(/\S+/g, "<span class='word'>$&</span>")
			gsap.set('.modal h2 .word', { opacity: 0, y: 24, x: 0, rotateZ: 0 })
			gsap.set('.modal h2 ~ *', { opacity: 0, y: 24 })
			tl.to('.modal h2 .word', {
				delay: 0.2,
				duration: 0.5,
				ease: "elastic.out(1,0.5)",
				opacity: 1,
				rotateZ: 0,
				stagger: 0.075,
				x: 0,
				y: 0,
			})
			.to('.modal h2 ~ *', {
				duration: 0.3,
				ease: 'power1.out',
				opacity:1, 
				y: 0
			}, '-=0.5')
		}
		let $login = $('.btn-login a')
		if($login.length) {
			$login.attr('data-lity', '')
			$login.click(() => animateShow())
			
			new LoginModal({
				target: document.body,
			})
		}
		let $getStarted = $('.btn-get-started a')
		if($getStarted.length) {
			$getStarted.attr('data-lity', '')
			$getStarted.click(() => animateShow())

			new GetStartedModal({
				target: document.body,
			})
		}
		// new NewsLetterModal({
		// 	target: document.body,
		// })
	},
}

function mobileMenu() {
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
	let $mobileMenu = $('#mobile-menu')
	$mobileMenu.hide()
	$('#mobile-menu .menu-item-has-children').find('.sub-menu').hide()
	// $body.addClass('mm-open')
	let showing = false
	$('#toggle_nav').on('click', () => {
		$mobileMenu.slideToggle(350, ()=> console.log('slide complete'))
		$body.toggleClass('mm-open')
		// if(!showing) 
		// else
		// 	$mobileMenu.hide()
		// showing = !showing
	})
	let current, t, 
	    duration = 250
	$('#mobile-menu .menu-item-has-children > *:first-child').click((e) => {
		e.preventDefault()
		if(t) { return; }

		e.target.classList.toggle('menu-open')
		$(e.target).parent().toggleClass('menu-open')
		
		//hide previous
		if(current) { //open menu
			if(!current.includes(e.target.innerText)) { //different from open
				$('#mobile-menu .menu-item-has-children > *:first-child').parent().find('.sub-menu').slideUp(duration)
				$('#mobile-menu .menu-item-has-children > *:first-child').removeClass('menu-open')
				// $('#mobile-menu .menu-item-has-children > *:first-child').parent().removeClass('menu-open')
				current = e.target.innerText
				//show respective
				setTimeout(() => {
					$(e.target).parent().find('.sub-menu').slideToggle(duration)
				}, duration - 100)
			} else { //closing open menu
				$(e.target).parent().find('.sub-menu').slideToggle(duration)
				$(e.target).removeClass('menu-open')
				// $(e.target).parent().removeClass('menu-open')
				current = null
			}
		} else { //no open menu
			$(e.target).parent().find('.sub-menu').slideToggle(duration)
			current = e.target.innerText
		}

		// space out events
		t = setTimeout(() => {
			// console.log('click')
			t = null
		}, 100);

	})
	let x = window.matchMedia('(max-width: 1100px)') 
	toggleMenu(x)
	x.addListener(toggleMenu)
	function toggleMenu(x) {
		if(x.matches) {
		} else {
			$mobileMenu.hide()
		}
	}
}

function animate() {
	animateError404()
	animateCTA()
	animateFooter()
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
	let $cta = $('.call-to-action')
	if (!$cta.length) {
		return
	}
	const tl = gsap.timeline({
		defaults:{opacity: 0, duration: 0.2, ease:'power1.out'},
		scrollTrigger:{
			trigger:'.call-to-action',
			toggleActions: 'restart none none none'
		}
	})

	var textWrapper = $cta.find('h2 .letters')[0]
	textWrapper.innerHTML = textWrapper.textContent.replace(/\S+/g, "<span class='word'>$&</span>")
	gsap.set($cta.find('.word'), { opacity: 0, y: 24 })
	tl.to(
		$cta.find('.word'),
		{
			y:0,
			// delay: 0.25,
			duration: 0.5,
			ease: "elastic.out(1,0.5)",
			stagger: 0.05,
			opacity: 1
		})
		// .from($cta.find('.btns-wrap'), { y: 32 })
}
function animateFooter() {
	const tl = gsap.timeline({
		defaults:{opacity: 0, ease:'power1.out', duration: 0.35, stagger: 0.1},
		scrollTrigger:{trigger:'footer'}
	})

	tl.from('footer', {duration: 0.65, delay: 0.2})
	gsap.from('footer .social-icon', {y: 16, opacity: 0, ease:'power1.out', duration: 0.3, stagger: 0.2, scrollTrigger: { trigger: '.footer-social-icons', start: 'center bottom'}})
	$('.footer-links .col').each((_idx, el) => {
		gsap.set($(el).children(), {y: 16, opacity: 0 })
		gsap.to($(el).children(), {delay: 0.5+0.1*_idx, scrollTrigger: { trigger: el, start: 'center bottom'}, y: 0, opacity: 1, ease:'power1.out', duration: 0.2, stagger: 0.1})
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
		adaptiveHeight: true, //TODO flex? - for subs
		arrows: false,
		dots: true,
		fade: true,
		slidesToShow: 1,
		slidesToScroll: 1,
	})
}

function postSlider() {
	const $postSlider = $('.post-cards--grid.slick ul');

	if(!$postSlider.length) return

	const $slides = $('.post-cards--grid.slick ul li');

	if(!$postSlider.length) {
		return
	}

	if($slides.length > 1) {
		$postSlider.slick({
			arrows: false,
			dots: true,
			slidesToShow: 1,
			slidesToScroll: 1,
		})
	}
}


/**
 * Step Slider
 */
function stepSlider() { //single Job post

	const $stepSlider = $('.step-slider .slider');
	const $stepSliderNav = $('.step-slider .ss-nav');
	
	if(!$stepSlider.length) {
		return
	}

	$stepSlider.slick({
		// adaptiveHeight: true, //TODO flex? - for subs
		arrows: false,
		dots: false,
		fade: true,
		slidesToShow: 1,
		slidesToScroll: 1,
	});
	
	$($stepSliderNav).find('a[data-slide]').click(function(e) {
	   e.preventDefault();
	   let slideno = $(this).data('slide');
	   $stepSlider.slick('slickGoTo', slideno - 1);
	 });
	
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
			console.log(idx)
			$dots.removeClass('slick-active')
			$dots.find('button').attr('aria-selected', false)
			$textCards.slick('slickGoTo', idx)
			el.classList.add('slick-active')
			$(el).find('button').attr('aria-selected', true)
		})
	})	
}
function helpfulArticles() {
	let $articles = $('.ha-wrap.grid-three')
	if(!$articles.length || !$('.helpful-articles').length) return
	const tl = gsap.timeline({
		defaults: { opacity: 0, stagger: 0.1, duration: 0.35, ease: 'power1.out'},
		scrollTrigger: {
			trigger: '.helpful-articles',
			start: 'top bottom-=200'
		}
	})
	
	let slider, x = window.matchMedia('(max-width: 767px)') //md
	x.addListener(haSlider)
	haSlider(x)
	
	function haSlider(x) {
		if(x.matches) {
			slider = $articles.slick({
				slidesToShow: 1, 
				fade: true,
				dots: true, 
				arrows: false
			})
		} else {
			if( slider ) {
				$articles.slick('unslick')
			}
			slider = null
		}
	}
	
	if($('.helpful-articles h2'.length)) {
		var textWrapper = $('.helpful-articles h2 .letters')[0]
		textWrapper.innerHTML = textWrapper.textContent.replace(/\S+/g, "<span class='word'>$&</span>")
		gsap.set($('.helpful-articles h2 .word'), {opacity: 0, y: 24})
		tl.to('.helpful-articles h2 .word',
		{
			y:0,
			delay: 0.25,
			duration: 0.65,
			ease: "elastic.out(1,0.5)",
			stagger: 0.05,
			opacity: 1
		})
	}
	$('.ha-wrap .grid-item').each((_idx, el) => {
		gsap.fromTo(el, { y:24, opacity: 0}, {opacity:1, y:0, delay: _idx*0.1, scrollTrigger: {trigger: el, start: 'center bottom'}})
		
	})
	gsap.fromTo('.whitepaper-section', { y:24, opacity: 0}, {opacity:1, y:0, scrollTrigger: {trigger: '.whitepaper-section', start: 'center bottom'}})
}



function animateWpBlockMediaText() {
	if(!$('.wp-block-media-text').length) return

	///TODO
	// $left = $('.wp-block-media-text:not(.has-media-on-the-right)')
	// $right = $('.has-media-on-the-right')


}