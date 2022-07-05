const { $ } = window

import anime from 'animejs/lib/anime.es.js';
// import { Waypoint } from 'waypoints';

export default {
	init() {
		// $('.home-hero').slick({
		// 	dots: true,
		// 	slidesToShow: 1,
		// 	autoplay: true,
		// 	autoplaySpeed: 5000,
		// 	speed: 1000,
		// 	fade: true,
		// 	cssEase: 'linear'
		// })
		$('.slick').slick({
			arrows: false,
			dots: true,
			fade: true,
			slidesToShow: 1
		 });

		 animateHome()
	},
	finalize() {
		// JavaScript to be fired on the home page, after the init JS
	},
}

function animateHome() {
	animateJoin();
}
function animateJoin() {
	var waypoint = new Waypoint({
		element: $('.home-join')[0],
		handler: function(direction) {
		  console.log('Scrolled to waypoint!')
		  anime({
			  targets: '.home-join',
			  translateY: 50,
			//   opacity: [0, 1],
			//   rotate: '1turn',
			//   backgroundColor: '#FFF',
			  duration: 350
		  });
		}
	})
}