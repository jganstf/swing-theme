<?php
/**
 * Enqueue all styles and scripts
 */

//TODO - https://kinsta.com/blog/eliminate-render-blocking-javascript-css/
function pvc_scripts() {
	$theme = wp_get_theme();
	$theme_uri = get_template_directory_uri();

	wp_deregister_script( 'wp-embed' );

	// Deregister the jquery version bundled with WordPress.
	wp_dequeue_script( 'jquery' );
	wp_deregister_script( 'jquery' );
   // if(is_front_page()) {
	wp_enqueue_script( 'jquery', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js', array(), null, true );
   // } else {
	// wp_enqueue_script( 'jquery', 'https://cdn.jsdelivr.net/npm/cash-dom@8.1.0/dist/cash.min.js', array(), null, true );
   // }
	
	// fonts - change this to whatever fonts you need 
	//TODO reduce
	//https://fonts.googleapis.com/css%3Ffamily=Lato:400,500,700|Ubuntu:400,500,700.css"
	// wp_enqueue_style( 'fonts', 'https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap', false, $theme->version);
	
	//font awesome
	// wp_enqueue_style('font-awesome', 'https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css',  false, null);

   //sal style
	// wp_enqueue_style('saljs-css', 'https://cdn.jsdelivr.net/npm/sal.js@0.8.5/dist/sal.css',  false, null);
	
	// owl
	// wp_enqueue_style('owl-styles', 'https://cdn.jsdelivr.net/npm/owl.carousel@2.3.4/dist/assets/owl.carousel.min.css',  false, $theme->version);
	// wp_enqueue_script('owl', 'https://cdn.jsdelivr.net/npm/owl.carousel@2.3.4/dist/owl.carousel.min.js',  ['jquery'], null, true);

	// slick
	wp_enqueue_style('slick-styles', 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css', false, $theme->version);
	wp_enqueue_style('slick-theme', 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css', false, $theme->version);
	wp_enqueue_script('slick', 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js', ['jquery'], $theme->version, true);
	wp_enqueue_script('waypoints', 'https://cdn.jsdelivr.net/npm/waypoints@4.0.1/lib/jquery.waypoints.min.js', ['jquery'], $theme->version, true);
	

	//lozad - lazy image loading
	// wp_enqueue_script('lozad', "https://cdn.jsdelivr.net/npm/lozad@1.16.0/dist/lozad.min.js", null, $theme->version, true);
	
	//lity
	// wp_enqueue_style('lity', "https://cdn.jsdelivr.net/npm/lity@2.4.1/dist/lity.min.css", false, $theme->version);
	// wp_enqueue_script('lity', "https://cdn.jsdelivr.net/npm/lity@2.4.1/dist/lity.min.js", ['jquery'], $theme->version, true);
	
	// wp_enqueue_script('isotope-layout', "https://cdn.jsdelivr.net/npm/isotope-layout@3.0.6/dist/isotope.pkgd.min.js", ['jquery'], $theme->version, true);

	//svelte/bundle
	// wp_enqueue_style('component-css', $theme_uri . "/assets/js/src/styles/_components.css",  false, $theme->version);
	wp_enqueue_style('theme-css', $theme_uri . "/assets/css/bundle.css",  false, $theme->version);
	
	// theme js
	// wp_enqueue_script('theme-js', $theme_uri . "/assets/js/portage-aad57b4f.js", ['jquery'], $theme->version, true);
	// wp_enqueue_script('home-js', $theme_uri . "/src/js/home.js", ['jquery'], $theme->version, true);
	// wp_enqueue_script('fittext-js', $theme_uri . "/assets/js/jquery.fittext.js", ['jquery'], $theme->version, true);
	wp_enqueue_script('theme-js', $theme_uri . "/assets/js/bundle.js", ['jquery'], $theme->version, true);
}
add_action( 'wp_enqueue_scripts', 'pvc_scripts', 10 );

// use jquery instead of cash on gravity forms pages
function gform_enqueue_custom_script() {
	wp_dequeue_script( 'jquery' );
	wp_deregister_script( 'jquery' );
	wp_enqueue_script( 'jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js', array(), null, true );
}
// add_action( 'gform_enqueue_scripts', 'gform_enqueue_custom_script', 10);