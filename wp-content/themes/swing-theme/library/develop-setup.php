<?php
/** TODO list
 * - delte default sample pages/posts
 * - run wp-cli - generate sitemap, menus, set home page, generate pages, templates
 * 
 */
// delete default sample page and post
// set home and news page

// Rest api stuff - TODO nonce
add_action('rest_api_init', function () {
	$namespace = 'dev/v1';
	register_rest_route( $namespace, '/generic', array(
		'methods'  => 'GET',
		'callback' => 'generate_generic_page',
		'permission_callback' => function( WP_REST_Request $request ) {
			return current_user_can( 'manage_options' );
		},
	));
	register_rest_route( $namespace, '/setup', array(
		'methods'  => 'GET',
		'callback' => 'insert_temporary_team',
		'permission_callback' => function( WP_REST_Request $request ) {
			return current_user_can( 'manage_options' );
		},
	));
});

/**
 * 
 * 
 * 
 * 
 * 
 * 
 */
function insert_pages() { }

// generate generics testing
function generate_generic_page() {
   $sample = get_page_by_title('Sample Page');
   wp_update_post([
      ID => $sample->ID,
      post_status => 'draft',
      post_title => 'Generic',
      post_content => '<!-- wp:paragraph {"key": "value"} --> <p>Welcome to the world of blocks.</p> <!-- /wp:paragraph -->'
   ]);
}

function setupMainNavigation() { }

function setup() {

   // $setupDaat = wp_json_file_decode( 'setup.json', ['associative' => false ] );

   // create_templates();
   $file = 'templates/portfolio.php';
   if(!copy('page.php', $file)) {
      //seek add template name - https://stackoverflow.com/questions/3004041/how-to-replace-a-particular-line-in-a-text-file-using-php
      error_log("failed to copy $file...\n");//debug
   }

   insert_pages();

   // wp_trash_posts();

   //set home page
   if ( $home = get_page_by_title( 'Front Page' ))
   {
      update_option( 'page_on_front', $home->ID );
      update_option( 'show_on_front', 'page' );
   }
   if ( $news_blog = get_page_by_title( 'News' )?:get_page_by_title( 'Blog' ))
   {
      // Set the blog page
      $blog   = get_page_by_title( 'Blog' );
      update_option( 'page_for_posts', $blog->ID );   
   }
}
