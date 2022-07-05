<?php

// Rest api stuff
add_action('rest_api_init', function () {
	$namespace = 'theme/v1';
	register_rest_route( $namespace, 'get-projects', array(
		'methods'  => 'GET',
		'callback' => 'get_projects',
		//TODO 'permission_callback' => function( WP_REST_Request $request ) {
		// 	return current_user_can( 'manage_options' );
		// },
	));
	register_rest_route( $namespace, 'get-team', array(
		'methods'  => 'GET',
		'callback' => 'get_team',
		//TODO 'permission_callback' => function( WP_REST_Request $request ) {
		// 	return current_user_can( 'manage_options' );
		// },
	));
	register_rest_route( $namespace, 'news-portage', array(
		'methods'  => 'GET',
		'callback' => 'get_portage_news',
	));
	register_rest_route( $namespace, 'news-insight', array(
		'methods'  => 'GET',
		'callback' => 'get_portage_news',//TODO
	));
	register_rest_route( $namespace, 'insight-subcategories', array(
		'methods'  => 'GET',
		'callback' => 'get_insight_subcategories',
	));
	register_rest_route( $namespace, 'get-insight-posts', array(
		'methods'  => 'GET',
		'callback' => 'get_insight_posts',
	));
	register_rest_route( $namespace, 'get-news-posts', array(
		'methods'  => 'GET',
		'callback' => 'get_cat_posts',
	));
});


function get_insight_posts() {
	return array_map(function($p){
		return [
			'url' => get_permalink($p),
			'img' => get_the_post_thumbnail_url($p, '2048x2048'),
			'name' => $p->post_title,
			'publish_date' => date('M d, Y', strtotime($p->post_date)),
			//TODO 'category' => get_the_category($p->ID)[0],
		];
	}, get_posts([
		'post_type' 	=> 'post',
		'post_status' 	=> 'publish',
		'posts_per_page' => -1,
		'orderby' 		=> 'title',
		'order' 			=> 'ASC',
		'tax_query' => [
			[
				'taxonomy' => 'category',
				'field'    => 'slug',
				'terms'    => $_GET['category'],
			],
		],
	]));
}


function get_post_category($request) {}
function get_cat_posts($request) {
	error_log(json_encode($request->get_param('category'), JSON_PRETTY_PRINT));//debug
	return get_posts([
		'post_status' => 'publish',
		'post_type' => 'post',
		'posts_per_page' => -1,
		'tax_query' => [
			[
				'taxonomy'        => 'category',
				'field'           => 'slug',
				'terms'           =>  $request->get_param('category'),
				'operator'        => 'IN',
			]
		]
			]);
}

function get_insight_subcategories() {
	$cats = get_categories(['taxonomy' => 'category']);
	$insight_cat = array_values(array_filter(
		$cats,
		function($cat) {
			return $cat->slug == 'insight';
		}
	))[0];
	if(!$insight_cat){ return [];}
	return array_values(array_filter(
		$cats,
		function($cat) use($insight_cat){
			return $cat->category_parent == $insight_cat->term_id;
		}
	));
}
function get_portage_news() {
	return array_map(function($p){
		return [
			'url' => get_permalink($p),
			'img' => get_the_post_thumbnail_url($p, '2048x2048'),
			'name' => $p->post_title,
			'publish_date' => date('M d, Y', strtotime($p->post_date)),
			'category' => get_the_category($p->ID)[0],
			'source' => get_field('article_source', $p->ID),
			'ext_url' => get_field('external_link', $p->ID),
		];
	}, get_posts([
		'post_type' 	=> 'post',
		'post_status' 	=> 'publish',
		'posts_per_page' => -1,
		'orderby' 		=> 'title',
		'order' 			=> 'ASC',
	]));
}

function get_team($request) {
	return array_map(function($p){
		return [
			'url' => get_permalink($p),
			'img' => get_the_post_thumbnail_url($p),
			'name' => $p->post_title,
			'position' => get_field('position', $p->ID),
			// 'location' => get_field('location', $p->ID),
		];
	}, get_posts([
		'post_type' 	=> 'team',
		'post_status' 	=> 'publish',
		'posts_per_page' => -1,
		'orderby' 		=> 'title',
		'order' 			=> 'ASC',
	]));
}
function get_projects($request) {
	//TODO if($projects = get_transient('projects')) {
	// 	return json_decode($projects);
	// }
	$projects = array_map(function($p){
		$post_fields = get_fields($p->ID);
		return [
			'url' => get_permalink($p),
			'img' => get_the_post_thumbnail_url($p->ID, 'large'),//get_the_post_thumbnail_url($p),
			'title' => $p->post_title,
			'content' => $p->post_content,
			'website_link' => $post_fields['website_link'],
			'case_study_link' => $post_fields['case_study_link'],
			'info_points' => $post_fields['informational_points'],
			'popup_image' => $post_fields['popup_image'],
			'funds' => get_the_terms($p->ID, 'projects_funds'),
			'geographies' => get_the_terms($p->ID, 'projects_geographies'),
			'sectors' => get_the_terms($p->ID, 'projects_sectors'),
			'statuses' => get_the_terms($p->ID, 'projects_statuses'),
		];
	}, get_posts([
		'post_type' 	=> 'projects',
		'post_status' 	=> 'publish',
		'posts_per_page' => -1,
		'orderby' 		=> 'title',
		'order' 			=> 'ASC',
	]));
	// set_transient('projects', json_encode($projects), 600);
	return $projects;
}