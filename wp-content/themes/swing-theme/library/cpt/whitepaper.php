<?php

/**
 * Registers the `whitepaper` post type.
 */
function whitepaper_init() {
	register_post_type(
		'whitepaper',
		[
			'labels'                => [
				'name'                  => __( 'White Papers', 'swing-theme' ),
				'singular_name'         => __( 'White Paper', 'swing-theme' ),
				'all_items'             => __( 'All White Papers', 'swing-theme' ),
				'archives'              => __( 'White Paper Archives', 'swing-theme' ),
				'attributes'            => __( 'White Paper Attributes', 'swing-theme' ),
				'insert_into_item'      => __( 'Insert into White Paper', 'swing-theme' ),
				'uploaded_to_this_item' => __( 'Uploaded to this White Paper', 'swing-theme' ),
				'featured_image'        => _x( 'Featured Image', 'whitepaper', 'swing-theme' ),
				'set_featured_image'    => _x( 'Set featured image', 'whitepaper', 'swing-theme' ),
				'remove_featured_image' => _x( 'Remove featured image', 'whitepaper', 'swing-theme' ),
				'use_featured_image'    => _x( 'Use as featured image', 'whitepaper', 'swing-theme' ),
				'filter_items_list'     => __( 'Filter White Papers list', 'swing-theme' ),
				'items_list_navigation' => __( 'White Papers list navigation', 'swing-theme' ),
				'items_list'            => __( 'White Papers list', 'swing-theme' ),
				'new_item'              => __( 'New White Paper', 'swing-theme' ),
				'add_new'               => __( 'Add New', 'swing-theme' ),
				'add_new_item'          => __( 'Add New White Paper', 'swing-theme' ),
				'edit_item'             => __( 'Edit White Paper', 'swing-theme' ),
				'view_item'             => __( 'View White Paper', 'swing-theme' ),
				'view_items'            => __( 'View White Papers', 'swing-theme' ),
				'search_items'          => __( 'Search White Papers', 'swing-theme' ),
				'not_found'             => __( 'No White Papers found', 'swing-theme' ),
				'not_found_in_trash'    => __( 'No White Papers found in trash', 'swing-theme' ),
				'parent_item_colon'     => __( 'Parent White Paper:', 'swing-theme' ),
				'menu_name'             => __( 'White Papers', 'swing-theme' ),
			],
			'public'                => true,
			'hierarchical'          => false,
			'show_ui'               => true,
			'show_in_nav_menus'     => true,
			'supports'              => [ 'title', 'editor', 'excerpt', 'thumbnail' ],
			'has_archive'           => true,
			'rewrite'               => true,
			'query_var'             => true,
			'menu_position'         => null,
			'menu_icon'             => 'dashicons-admin-post',
			'show_in_rest'          => true,
			'rest_base'             => 'whitepaper',
			'rest_controller_class' => 'WP_REST_Posts_Controller',
		]
	);
	$tax_args = array(
		'label'                 => 'Category',
		'description'           => 'Categories',
		'labels'                => $tax_labels,
		'show_in_rest'          => true,
		'supports'              => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
		'hierarchical'          => true,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 5,
		'menu_icon'             => 'dashicons-tickets-alt',
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'show_admin_column'     => true,
		'can_export'            => true,
		'has_archive'           => false,
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'page',
	 );
	 register_taxonomy( 'whitepaper_categories', 'whitepaper', $tax_args );
}

add_action( 'init', 'whitepaper_init' );

/**
 * Sets the post updated messages for the `whitepaper` post type.
 *
 * @param  array $messages Post updated messages.
 * @return array Messages for the `whitepaper` post type.
 */
function whitepaper_updated_messages( $messages ) {
	global $post;

	$permalink = get_permalink( $post );

	$messages['whitepaper'] = [
		0  => '', // Unused. Messages start at index 1.
		/* translators: %s: post permalink */
		1  => sprintf( __( 'White Paper updated. <a target="_blank" href="%s">View White Paper</a>', 'swing-theme' ), esc_url( $permalink ) ),
		2  => __( 'Custom field updated.', 'swing-theme' ),
		3  => __( 'Custom field deleted.', 'swing-theme' ),
		4  => __( 'White Paper updated.', 'swing-theme' ),
		/* translators: %s: date and time of the revision */
		5  => isset( $_GET['revision'] ) ? sprintf( __( 'White Paper restored to revision from %s', 'swing-theme' ), wp_post_revision_title( (int) $_GET['revision'], false ) ) : false, // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		/* translators: %s: post permalink */
		6  => sprintf( __( 'White Paper published. <a href="%s">View White Paper</a>', 'swing-theme' ), esc_url( $permalink ) ),
		7  => __( 'White Paper saved.', 'swing-theme' ),
		/* translators: %s: post permalink */
		8  => sprintf( __( 'White Paper submitted. <a target="_blank" href="%s">Preview White Paper</a>', 'swing-theme' ), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
		/* translators: 1: Publish box date format, see https://secure.php.net/date 2: Post permalink */
		9  => sprintf( __( 'White Paper scheduled for: <strong>%1$s</strong>. <a target="_blank" href="%2$s">Preview White Paper</a>', 'swing-theme' ), date_i18n( __( 'M j, Y @ G:i', 'swing-theme' ), strtotime( $post->post_date ) ), esc_url( $permalink ) ),
		/* translators: %s: post permalink */
		10 => sprintf( __( 'White Paper draft updated. <a target="_blank" href="%s">Preview White Paper</a>', 'swing-theme' ), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
	];

	return $messages;
}

add_filter( 'post_updated_messages', 'whitepaper_updated_messages' );

/**
 * Sets the bulk post updated messages for the `whitepaper` post type.
 *
 * @param  array $bulk_messages Arrays of messages, each keyed by the corresponding post type. Messages are
 *                              keyed with 'updated', 'locked', 'deleted', 'trashed', and 'untrashed'.
 * @param  int[] $bulk_counts   Array of item counts for each message, used to build internationalized strings.
 * @return array Bulk messages for the `whitepaper` post type.
 */
function whitepaper_bulk_updated_messages( $bulk_messages, $bulk_counts ) {
	global $post;

	$bulk_messages['whitepaper'] = [
		/* translators: %s: Number of White Papers. */
		'updated'   => _n( '%s White Paper updated.', '%s White Papers updated.', $bulk_counts['updated'], 'swing-theme' ),
		'locked'    => ( 1 === $bulk_counts['locked'] ) ? __( '1 White Paper not updated, somebody is editing it.', 'swing-theme' ) :
						/* translators: %s: Number of White Papers. */
						_n( '%s White Paper not updated, somebody is editing it.', '%s White Papers not updated, somebody is editing them.', $bulk_counts['locked'], 'swing-theme' ),
		/* translators: %s: Number of White Papers. */
		'deleted'   => _n( '%s White Paper permanently deleted.', '%s White Papers permanently deleted.', $bulk_counts['deleted'], 'swing-theme' ),
		/* translators: %s: Number of White Papers. */
		'trashed'   => _n( '%s White Paper moved to the Trash.', '%s White Papers moved to the Trash.', $bulk_counts['trashed'], 'swing-theme' ),
		/* translators: %s: Number of White Papers. */
		'untrashed' => _n( '%s White Paper restored from the Trash.', '%s White Papers restored from the Trash.', $bulk_counts['untrashed'], 'swing-theme' ),
	];

	return $bulk_messages;
}

add_filter( 'bulk_post_updated_messages', 'whitepaper_bulk_updated_messages', 10, 2 );
