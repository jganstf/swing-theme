<?php
/**
 * Enqueue all styles and scripts
 */

function swing_scripts() {
	$theme = wp_get_theme();
	$theme_uri = get_template_directory_uri();

	wp_deregister_script( 'wp-embed' );

	// Deregister the jquery version bundled with WordPress.
	wp_dequeue_script( 'jquery' );
	wp_deregister_script( 'jquery' );
   if(true) {//TODO is_front_page() || is_page('partnership')) {
		
		wp_enqueue_script( 'jquery', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js', array(), null, true );
		// wp_enqueue_script( 'fittext', 'https://cdn.jsdelivr.net/npm/fittext.js@1.2.0/jquery.fittext.js', array('jquery'), null, true );
		wp_enqueue_script('passive', $theme_uri . "/assets/js/passive.js", ['jquery'], $theme->version, true);
		
		// slick
		wp_enqueue_style('slick-styles', 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css', false, $theme->version);
		wp_enqueue_style('slick-theme', 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css', false, $theme->version);
		wp_enqueue_script('slick', 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js', ['jquery'], $theme->version, true);

   } else {
		
		wp_enqueue_script( 'jquery', 'https://cdn.jsdelivr.net/npm/cash-dom@8.1.0/dist/cash.min.js', array(), null, true );

   }

	//lozad - lazy image loading
	// wp_enqueue_script('lozad', "https://cdn.jsdelivr.net/npm/lozad@1.16.0/dist/lozad.min.js", null, $theme->version, true);
	
	//lity - modals
	wp_enqueue_style('lity', "https://cdn.jsdelivr.net/npm/lity@2.4.1/dist/lity.min.css", false, $theme->version);
	wp_enqueue_script('lity', "https://cdn.jsdelivr.net/npm/lity@2.4.1/dist/lity.min.js", ['jquery'], $theme->version, true);
	

	//svelte/bundle
	wp_enqueue_style('theme-css', $theme_uri . "/assets/css/bundle.css",  false, $theme->version);
	
	// theme js
	wp_enqueue_script('theme-js', $theme_uri . "/assets/js/bundle.js", ['jquery'], $theme->version, true);
}
add_action( 'wp_enqueue_scripts', 'swing_scripts', 10 );