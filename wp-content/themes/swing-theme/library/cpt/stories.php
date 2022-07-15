<?php

// Register Custom Post Type
function stories_post_type() {
  $labels = array(
    'name'                  => 'Stories',
    'singular_name'         => 'Stories',
    'menu_name'             => 'Stories',
    'name_admin_bar'        => 'Stories',
    'archives'              => 'Story Archives',
    'parent_item_colon'     => 'Story Store',
    'all_items'             => 'All Stories',
    'add_new_item'          => 'Add New Story',
    'add_new'               => 'Add New Story',
    'new_item'              => 'New Story',
    'edit_item'             => 'Edit Story',
    'update_item'           => 'Update Story',
    'view_item'             => 'View Story',
    'search_items'          => 'Search Story',
    'not_found'             => 'Story Not found',
    'not_found_in_trash'    => 'Story Not found in Trash',
    'featured_image'        => 'Featured Image',
    'set_featured_image'    => 'Set featured image',
    'remove_featured_image' => 'Remove featured image',
    'use_featured_image'    => 'Use as featured image',
    'insert_into_item'      => 'Insert into Story',
    'uploaded_to_this_item' => 'Uploaded to this Story',
    'items_list'            => 'Story list',
    'items_list_navigation' => 'Story list navigation',
    'filter_items_list'     => 'Filter Story list',
  );

  $args = array(
    'label'                 => 'Stories',
    'description'           => 'Stories',
    'labels'                => $labels,
    'supports'              => array( 'title', 'editor', 'thumbnail' ),
    'hierarchical'          => true,
    'public'                => true,
    'show_ui'               => true,
    'show_in_menu'          => true,
    'show_in_rest'			    => true,    
    // 'menu_position'         => 7,
    'menu_icon'             => 'dashicons-admin-site',
    'show_in_admin_bar'     => true,
    'show_in_nav_menus'     => true,
    'show_admin_column'     => true,
    'can_export'            => true,
    'has_archive'           => false,
    'exclude_from_search'   => false,
    'publicly_queryable'    => true,
    'capability_type'       => 'page',
  );

  register_post_type( 'stories', $args );

  //Taxonomy
  $tax_labels = array(
    'name'                  => 'Category',
    'singular_name'         => 'Category',
    'menu_name'             => 'Categories',
    'name_admin_bar'        => 'Categories',
    'archives'              => 'Category Archives',
    'parent_item_colon'     => 'Parent Category:',
    'all_items'             => 'All Categories',
    'add_new_item'          => 'Add New Category',
    'add_new'               => 'Add New Category',
    'new_item'              => 'New Category',
    'edit_item'             => 'Edit Category',
    'update_item'           => 'Update Category',
    'view_item'             => 'View Category',
    'search_items'          => 'Search Category',
    'not_found'             => 'Not found',
    'not_found_in_trash'    => 'Not found in Trash',
    'featured_image'        => 'Featured Image',
    'set_featured_image'    => 'Set featured image',
    'remove_featured_image' => 'Remove featured image',
    'use_featured_image'    => 'Use as featured image',
    'insert_into_item'      => 'Insert into category',
    'uploaded_to_this_item' => 'Uploaded to this category',
    'items_list'            => 'Categories list',
    'items_list_navigation' => 'Categories list navigation',
    'filter_items_list'     => 'Filter categories list',
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
  register_taxonomy( 'story_categories', 'stories', $tax_args );
}
add_action( 'init', 'stories_post_type', 0 );