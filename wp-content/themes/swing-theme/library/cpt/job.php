<?php

// Register Custom Post Type
function theme_job_post_type() {
  $labels = array(
    'name'                  => 'Job',
    'singular_name'         => 'Job',
    'menu_name'             => 'Job',
    'name_admin_bar'        => 'Job',
    'archives'              => 'Job Archives',
    'parent_item_colon'     => 'Job Store',
    'all_items'             => 'All Jobs',
    'add_new_item'          => 'Add New Job',
    'add_new'               => 'Add New Job',
    'new_item'              => 'New Job',
    'edit_item'             => 'Edit Job',
    'update_item'           => 'Update Job',
    'view_item'             => 'View Job',
    'search_items'          => 'Search Job',
    'not_found'             => 'Job Not found',
    'not_found_in_trash'    => 'Job Not found in Trash',
    'featured_image'        => 'Featured Image',
    'set_featured_image'    => 'Set featured image',
    'remove_featured_image' => 'Remove featured image',
    'use_featured_image'    => 'Use as featured image',
    'insert_into_item'      => 'Insert into Job',
    'uploaded_to_this_item' => 'Uploaded to this Job',
    'items_list'            => 'Job list',
    'items_list_navigation' => 'Job list navigation',
    'filter_items_list'     => 'Filter Job list',
  );

  $args = array(
    'label'                 => 'Job',
    'description'           => 'Jobs',
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

  register_post_type( 'job', $args );
  
  //Taxonomy
  $tax_labels = array(
    'name'                  => 'State',
    'singular_name'         => 'State',
    'menu_name'             => 'States',
    'name_admin_bar'        => 'States',
    'archives'              => 'State Archives',
    'parent_item_colon'     => 'Parent State:',
    'all_items'             => 'All States',
    'add_new_item'          => 'Add New State',
    'add_new'               => 'Add New State',
    'new_item'              => 'New State',
    'edit_item'             => 'Edit State',
    'update_item'           => 'Update State',
    'view_item'             => 'View State',
    'search_items'          => 'Search State',
    'not_found'             => 'Not found',
    'not_found_in_trash'    => 'Not found in Trash',
    'featured_image'        => 'Featured Image',
    'set_featured_image'    => 'Set featured image',
    'remove_featured_image' => 'Remove featured image',
    'use_featured_image'    => 'Use as featured image',
    'insert_into_item'      => 'Insert into State',
    'uploaded_to_this_item' => 'Uploaded to this State',
    'items_list'            => 'States list',
    'items_list_navigation' => 'States list navigation',
    'filter_items_list'     => 'Filter States list',
  );
  $tax_args = array(
    'label'                 => 'State',
    'description'           => 'States',
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
  register_taxonomy( 'job_state', 'job', $tax_args );
  
}
add_action( 'init', 'theme_job_post_type', 0 );


add_action('init', 'add_us_states', 100);

function add_us_states()
{
    $state_array = array (
        'AL'=>"Alabama",  
        'AK'=>"Alaska",  
        'AZ'=>"Arizona",  
        'AR'=>"Arkansas",  
        'CA'=>"California",  
        'CO'=>"Colorado",  
        'CT'=>"Connecticut",  
        'DE'=>"Delaware",  
        'DC'=>"District Of Columbia",  
        'FL'=>"Florida",  
        'GA'=>"Georgia",  
        'HI'=>"Hawaii",  
        'ID'=>"Idaho",  
        'IL'=>"Illinois",  
        'IN'=>"Indiana",  
        'IA'=>"Iowa",  
        'KS'=>"Kansas",  
        'KY'=>"Kentucky",  
        'LA'=>"Louisiana",  
        'ME'=>"Maine",  
        'MD'=>"Maryland",  
        'MA'=>"Massachusetts",  
        'MI'=>"Michigan",  
        'MN'=>"Minnesota",  
        'MS'=>"Mississippi",  
        'MO'=>"Missouri",  
        'MT'=>"Montana",
        'NE'=>"Nebraska",
        'NV'=>"Nevada",
        'NH'=>"New Hampshire",
        'NJ'=>"New Jersey",
        'NM'=>"New Mexico",
        'NY'=>"New York",
        'NC'=>"North Carolina",
        'ND'=>"North Dakota",
        'OH'=>"Ohio",  
        'OK'=>"Oklahoma",  
        'OR'=>"Oregon",  
        'PA'=>"Pennsylvania",  
        'RI'=>"Rhode Island",  
        'SC'=>"South Carolina",  
        'SD'=>"South Dakota",
        'TN'=>"Tennessee",  
        'TX'=>"Texas",  
        'UT'=>"Utah",  
        'VT'=>"Vermont",  
        'VA'=>"Virginia",  
        'WA'=>"Washington",  
        'WV'=>"West Virginia",  
        'WI'=>"Wisconsin",  
        'WY'=>"Wyoming"
        );

    // Loop through array and insert terms
    foreach($state_array as $abbr => $name)
    {
        if(!get_term_by('name', ucwords(strtolower($name)), 'job_state'))
            wp_insert_term(ucwords(strtolower($name)), 'job_state');
    }
}

