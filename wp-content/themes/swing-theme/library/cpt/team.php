<?php

// Register Custom Post Type
function theme_team_post_type() {
  $labels = array(
    'name'                  => 'Team',
    'singular_name'         => 'Team',
    'menu_name'             => 'Team',
    'name_admin_bar'        => 'Team',
    'archives'              => 'Team Archives',
    'parent_item_colon'     => 'Team Store',
    'all_items'             => 'All Team Members',
    'add_new_item'          => 'Add New Member',
    'add_new'               => 'Add New Member',
    'new_item'              => 'New Team Member',
    'edit_item'             => 'Edit Team Member',
    'update_item'           => 'Update Team Member',
    'view_item'             => 'View Team Member',
    'search_items'          => 'Search Team Member',
    'not_found'             => 'Team Member Not found',
    'not_found_in_trash'    => 'Team Member Not found in Trash',
    'featured_image'        => 'Featured Image',
    'set_featured_image'    => 'Set featured image',
    'remove_featured_image' => 'Remove featured image',
    'use_featured_image'    => 'Use as featured image',
    'insert_into_item'      => 'Insert into Team Member',
    'uploaded_to_this_item' => 'Uploaded to this Team Member',
    'items_list'            => 'Team list',
    'items_list_navigation' => 'Team list navigation',
    'filter_items_list'     => 'Filter Team list',
  );

  $args = array(
    'label'                 => 'Team',
    'description'           => 'Team Members',
    'labels'                => $labels,
    'supports'              => array( 'title', 'editor', 'thumbnail' ),
    'hierarchical'          => false,
    'public'                => true,
    'show_ui'               => true,
    'show_in_menu'          => true,
    'show_in_rest'			    => true,    
    // 'menu_position'         => 7,
    'menu_icon'             => 'dashicons-groups',
    'show_in_admin_bar'     => true,
    'show_in_nav_menus'     => true,
    'show_admin_column'     => true,
    'show_admin_column'     => true,
    'can_export'            => true,
    'has_archive'           => false,
    'exclude_from_search'   => false,
    'publicly_queryable'    => true,
    'capability_type'       => 'page',
  );

  register_post_type( 'team', $args );
}
add_action( 'init', 'theme_team_post_type', 0 );
