<?php

// Rest api stuff
add_action('rest_api_init', function () {
	$namespace = 'swing/v1';
	// register_rest_route( $namespace, 'get-projects', array(
	// 	'methods'  => 'GET',
	// 	'callback' => 'get_posts',
	// 	//TODO 'permission_callback' => function( WP_REST_Request $request ) {
	// 	// 	return current_user_can( 'manage_options' );
	// 	// },
	// ));
});
