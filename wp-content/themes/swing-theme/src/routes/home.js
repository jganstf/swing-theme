import HomeTestimonials from '../components/home-testimonials.svelte'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import anime from 'animejs/lib/anime.es.js';
// import { Waypoint } from 'waypoints';


const { $ } = window


export default {
	init() {
		gsap.registerPlugin(ScrollTrigger)

		// $('.slick').slick({
		// 	arrows: false,
		// 	dots: true,
		// 	fade: true,
		// 	slidesToShow: 1
		//  });

		// toggleSwitch()
		let $testimonialsWrap = $('#home-testimonials-wrap')
		if( $testimonialsWrap.length ) {
			new HomeTestimonials({
				target: $testimonialsWrap[0],
				// props: $testimonialsWrap.data()
			})
		}
		animateHome()
	},
	finalize() {
		// JavaScript to be fired on the home page, after the init JS
	},
}

function animateHome() {
	animateHero();
	animateAbout();
	animateJoin();
}

function animateHero() {
	let $hero = $('.home .hero')
	if( !$hero.length ) return

	const tl = gsap.timeline({
		defaults: { 
			duration: 0.35,
			opacity: 1,
			stagger: 0.1,
			x: 0,
			y: 0,
		},
		scrollTrigger: {
			trigger: '.home .hero',
			// start: 'top bottom-=250px'
		}
	})
	
	var textWrapper = $hero.find('h1')[0]
	textWrapper.innerHTML = textWrapper.textContent.replace(/\S+/g, "<span class='word'>$&</span>")
	gsap.set('.hero .word', { y: -24, x: 0, rotateZ: 0 })
	gsap.set('.home .hero .btns-wrap', { y: 16 })
	tl.to(
		'.hero .word',
		{
			rotateZ: 0,
			delay: 0.25,
			duration: 0.5,
			ease: "power1.out",//"elastic.out(1,0.5)",
		})
		.to(
			'.home h1 ~ p',
			{ },
			'-=0.35'
		)
		.to(
			'.home .hero .btns-wrap',
			{
				// duration: 0.1,
			},
			// '-=0.35'
		)
}
function animateAbout() {
	let $about = $('.home-about')
	if( !$about.length ) return

	const tl = gsap.timeline({
		defaults: { opacity: 0, },
		scrollTrigger: {
			trigger: '.home-about',
			start: 'top bottom-=250px'
		}
	})
	
	var textWrapper = $about.find('h2 .letters')[0]
	textWrapper.innerHTML = textWrapper.textContent.replace(/\S+/g, "<span class='word'>$&</span>")
	gsap.set('.home-about .word', {opacity: 0, y: 24, x: 0, rotateZ: 0})
	tl.to(
		'.home-about .word',
		{
			y:0,
			delay: 0.25,
			duration: 0.65,
			ease: "elastic.out(1,0.5)",
			stagger: 0.05,
			opacity: 1
		})
		.from(
			'.home-about h2 ~ p',
			{
				y: 16,
				duration: 0.2
			},
			'-=0.85'
		)
		$('.home-about .card').each((idx, el) => {
			gsap.set(el, { opacity: 0, y: 32 })
			gsap.set($(el).find('h3'), { opacity: 0, y: -16 })
			gsap.set($(el).find('h3 ~ p'), { opacity: 0, y: 16 })
			gsap.to(el, 
				{
					scrollTrigger: {
						trigger: el, 
						start: 'top center+=200px',
						onEnter: () => {
							setTimeout(() => {
								gsap.to($(el).find('h3'), { opacity: 1, duration: 0.35, y: 0 })
								gsap.to($(el).find('h3 ~ p'), { opacity: 1, duration: 0.35, y: 0, stagger: 0.1 })
							}, 200*idx)
						}
					},
					opacity: 1,
					y: 0,
					duration: 0.35,
					// stagger: 0.1,
					delay: 0.1*idx
				},
				// '-=0.35'
			)
		})
}
function animateTestimonials() {}
function animateJoin() {
	// var waypoint = new Waypoint({
	// 	element: $('.home-join')[0],
	// 	handler: function(direction) {
	// 	  console.log('Scrolled to waypoint!')
	// 	  anime({
	// 		  targets: '.home-join',
	// 		  translateY: 50,
	// 		//   opacity: [0, 1],
	// 		//   rotate: '1turn',
	// 		//   backgroundColor: '#FFF',
	// 		  duration: 350
	// 	  });
	// 	}
	// })
}