<?php 
/**
 * Theme functions and definitions
 *
 * @package WordPress
 * @subpackage arcadia
 * @author arcadia, Inc.
 * 
 *
 */
 
 function arcadia_gutenberg_setup() { 
	/**
     * Register support for Gutenberg wide images in your theme
     * 
     */
	add_theme_support( 'align-wide' );
	
	/* 
	* Admin Editor Style 
	*
	*/ 
	//add_theme_support( 'wp-block-styles' );
	
	
	/**
    * Default Font style
    * 
    */
	
	add_theme_support( 'editor-font-sizes', array(
        array(
			'name' => __( 'Extra Small', 'arcadia' ),
			'size' => 16,
			'slug' => 'extra-small'
		),
        array(
			'name' => __( 'Small', 'arcadia' ),
			'size' => 18,
			'slug' => 'small'
		),
		array(
			'name' => __( 'Medium', 'arcadia' ),
			'size' => 24, //
			'slug' => 'medium'
		),
		array(
			'name' => __( 'Large', 'arcadia' ),
			'size' => 71,
			'slug' => 'large'
		),
		array(
			'name' => __( 'Extra Large', 'arcadia' ),
			'size' => 105,
			'slug' => 'extra-large'
		)
		
	) );
     // Editor Color Palette
     add_theme_support( 'editor-color-palette', array(
		array(
			'name'  => __( 'Mostly Black', 'arcadia' ),
			'slug'  => 'mostly-black',
			'color'	=> '#09071a',
		),
		array(
			'name'  => __( 'Deep Space', 'arcadia' ),
			'slug'  => 'black-rock',
			'color'	=> '#090322',
		),
		array(
			'name'  => __( 'Arcadia Bright Green', 'arcadia' ),
			'slug'  => 'bright-turquoise',
			'color' => '#1ef3b3',
		),
		array(
			'name'  => __( 'Abbey', 'arcadia' ),
			'slug'  => 'abbey',
			'color' => '#4e4b62',
		),
		array(
			'name'	=> __( 'White', 'arcadia' ),
			'slug'	=> 'white-arcadia',
			'color'	=> '#FFFFFF',
		),
        array(
			'name'	=> __( 'Arcadia Bright Blue', 'arcadia' ),
			'slug'	=> 'bright-turquoise',
			'color'	=> '#21E4F2',
		),
        array(
			'name'	=> __( 'Shark', 'arcadia' ),
			'slug'	=> 'shark',
			'color'	=> '#212526',
		),
		array(
			'name'  => __( 'Oslo Gray', 'arcadia' ),
			'slug'  => 'oslo-gray',
			'color'	=> '#817f91',
		),
		array(
			'name'  => __( 'Grey Dark', 'arcadia' ),
			'slug'  => 'grey-dark-arcadia',
			'color' => '#707579',
		),
		array(
			'name'  => __( 'Midnight', 'arcadia' ),
			'slug'  => 'steel-gray',
			'color' => '#1b182c',
		),
		array(
			'name'	=> __( 'Arcadia Deep Green', 'arcadia' ),
			'slug'	=> 'genoa',
			'color'	=> '#178165',
		),
		array(
			'name'  => __( 'Mist', 'arcadia' ),
			'slug'  => 'seashell',
			'color'	=> '#f3f3f5',
		),
		array(
			'name'  => __( 'Persian Red', 'arcadia' ),
			'slug'  => 'persian-red',
			'color' => '#C4302B',
		),
         array(
			'name'  => __( 'Purple Pizzazz', 'arcadia' ),
			'slug'  => 'purple-pizzazz',
			'color' => '#FF00CC',
		),
         array(
			'name'  => __( 'Arcadia Bright Pink', 'arcadia' ),
			'slug'  => 'electric-violet',
			'color' => '#E421F2',
		),
         array(
			'name'  => __( 'Swans Down', 'arcadia' ),
			'slug'  => 'swans-down',
			'color' => '#25A27D34',
		),
         array(
			'name'  => __( 'Woodsmoke', 'arcadia' ),
			'slug'  => 'woodsmoke',
			'color' => '#101213',
		)
	) );
 
 }
 
 add_action( 'after_setup_theme', 'arcadia_gutenberg_setup' );

add_action('admin_footer', 'gb_admin_add_js_arcadia');
function gb_admin_add_js_arcadia() {
	echo "<script type='text/javascript'>wp.domReady( () => {

            wp.blocks.registerBlockStyle( 'core/spacer', {
                name: 'default',
                label: 'Default',
                isDefault: true,
            });

            wp.blocks.registerBlockStyle( 'core/spacer', {
                name: 'spacer-10',
                label: 'Spacer 10',
            } );

             wp.blocks.registerBlockStyle( 'core/spacer', {
                name: 'spacer-20',
                label: 'Spacer 20',
            } );

             wp.blocks.registerBlockStyle( 'core/spacer', {
                name: 'spacer-30',
                label: 'Spacer 30',
            } );
            wp.blocks.registerBlockStyle( 'core/spacer', {
                name: 'spacer-40',
                label: 'Spacer 40',
            } ); 
            wp.blocks.registerBlockStyle( 'core/spacer', {
                name: 'spacer-50',
                label: 'Spacer 50',
            } );
            wp.blocks.registerBlockStyle( 'core/spacer', {
                name: 'spacer-60',
                label: 'Spacer 60',
            } );
            wp.blocks.registerBlockStyle( 'core/spacer', {
                name: 'spacer-70',
                label: 'Spacer 70',
            } );
            wp.blocks.registerBlockStyle( 'core/spacer', {
                name: 'spacer-80',
                label: 'Spacer 80',
            } );
            wp.blocks.registerBlockStyle( 'core/spacer', {
                name: 'spacer-90',
                label: 'Spacer 90',
            } );
            wp.blocks.registerBlockStyle( 'core/spacer', {
                name: 'spacer-100',
                label: 'Spacer 100',
            } );
            wp.blocks.registerBlockStyle( 'core/spacer', {
                name: 'spacer-110',
                label: 'Spacer 110',
            } );
            wp.blocks.registerBlockStyle( 'core/spacer', {
                name: 'spacer-120',
                label: 'Spacer 120',
            } );
            wp.blocks.registerBlockStyle( 'core/spacer', {
                name: 'spacer-130',
                label: 'Spacer 130',
            } );
            wp.blocks.registerBlockStyle( 'core/spacer', {
                name: 'spacer-140',
                label: 'Spacer 140',
            } );
            wp.blocks.registerBlockStyle( 'core/spacer', {
                name: 'spacer-150',
                label: 'Spacer 150',
            } );
            
            wp.blocks.registerBlockStyle( 'core/column', {
                name: 'add-padding-32',
                label: 'Padding Added',
            } ); 
            wp.blocks.registerBlockStyle( 'core/column', {
                name: 'add-hover',
                label: 'Hover Style',
            } );
            wp.blocks.registerBlockStyle( 'core/group', {
                name: 'position-relative',
                label: 'Position Relative',
            } );
            wp.blocks.registerBlockStyle( 'core/cover', {
                name: 'bg-position-rh-center',
                label: 'Position Right Center',
            } );
            wp.blocks.registerBlockStyle( 'core/cover', {
                name: 'bg-position-top-full',
                label: 'Position Top Full',
            } );
        } );
           </script>";
}

/**
 * Returns the settings required by legacy widgets blocks.
 *
 * @return array Legacy widget settings.
 */
function gutenberg_get_legacy_widget_settings_custome_arcadia() {
	$settings = array();
	/**
	 * TODO: The hardcoded array should be replaced with a mechanism to allow
	 * core and third party blocks to specify they already have equivalent
	 * blocks, and maybe even allow them to have a migration function.
	 */
	$core_widgets = array(
        'WP_Widget_Pages',
		'WP_Widget_Calendar',
		'WP_Widget_Archives',
		'WP_Widget_Media_Audio',
		'WP_Widget_Media_Image',
		'WP_Widget_Media_Gallery',
		'WP_Widget_Media_Video',
		'WP_Widget_Meta',
		'WP_Widget_Text',
		'WP_Widget_Recent_Comments',
		'WP_Widget_RSS',
		'WP_Widget_Tag_Cloud',
		'WP_Widget_Custom_HTML'
	);

	$has_permissions_to_manage_widgets = current_user_can( 'edit_theme_options' );
	$available_legacy_widgets          = array();
	global $wp_widget_factory;
	if ( ! empty( $wp_widget_factory ) ) {
		foreach ( $wp_widget_factory->widgets as $class => $widget_obj ) {
			$available_legacy_widgets[ $class ] = array(
				'name'              => html_entity_decode( $widget_obj->name ),
				// wp_widget_description is not being used because its input parameter is a Widget Id.
				// Widgets id's reference to a specific widget instance.
				// Here we are iterating on all the available widget classes even if no widget instance exists for them.
				'description'       => isset( $widget_obj->widget_options['description'] ) ?
					html_entity_decode( $widget_obj->widget_options['description'] ) :
					null,
				'isReferenceWidget' => false,
				'isHidden'          => in_array( $class, $core_widgets, true ),
			);
		}
	}
	global $wp_registered_widgets;
	if ( ! empty( $wp_registered_widgets ) ) {
		foreach ( $wp_registered_widgets as $widget_id => $widget_obj ) {

			$block_widget_start = 'blocks-widget-';
			if (
				( is_array( $widget_obj['callback'] ) &&
				isset( $widget_obj['callback'][0] ) &&
				( $widget_obj['callback'][0] instanceof WP_Widget ) ) ||
				// $widget_id starts with $block_widget_start.
				strncmp( $widget_id, $block_widget_start, strlen( $block_widget_start ) ) === 0
			) {
				continue;
			}
			$available_legacy_widgets[ $widget_id ] = array(
				'name'              => html_entity_decode( $widget_obj['name'] ),
				'description'       => html_entity_decode( wp_widget_description( $widget_id ) ),
				'isReferenceWidget' => true,
			);
		}
	}

	$settings['hasPermissionsToManageWidgets'] = $has_permissions_to_manage_widgets;
	$settings['availableLegacyWidgets']        = $available_legacy_widgets;

	return gutenberg_experiments_editor_settings( $settings );
}

/**
 * Extends default editor settings with values supporting legacy widgets.
 *
 * @param array $settings Default editor settings.
 *
 * @return array Filtered editor settings.
 */
function gutenberg_legacy_widget_settings_custom_arcadia( $settings ) {
	return array_merge( $settings, gutenberg_get_legacy_widget_settings_custome_arcadia() );
}
add_filter( 'block_editor_settings', 'gutenberg_legacy_widget_settings_custom_arcadia' );

/* ACF Custom Block*/
add_action('acf/init', 'arcadia_acf_block_init');
function arcadia_acf_block_init() {
	
	// check function exists
	if( function_exists('acf_register_block') ) {
		
		// register a vertical text block
		acf_register_block(array(
			'name'				=> 'vertical-text',
			'title'				=> __('Vertical Text'),
			'description'		=> __('Vertical Text'),
			'render_callback'	=> 'arcadia_acf_block_render_callback',
			'category'			=> 'arcadia-custom-blocks',
			'icon'				=> 'pressthis',
            'mode'              => 'preview',
			'keywords'			=> array( 'Vertical', 'Text' ),
		));
        // register a button block
		acf_register_block(array(
			'name'				=> 'button-custom',
			'title'				=> __('Custom Button'),
			'description'		=> __('Custom Button'),
			'render_callback'	=> 'arcadia_acf_block_render_callback',
			'category'			=> 'arcadia-custom-blocks',
			'icon'				=> 'admin-links',
            'mode'              => 'preview',
			'keywords'			=> array( 'Button'),
		));
        // register a Gradient Text block
		acf_register_block(array(
			'name'				=> 'gradient-text',
			'title'				=> __('Gradient Text'),
			'description'		=> __('Gradient Text'),
			'render_callback'	=> 'arcadia_acf_block_render_callback',
			'category'			=> 'arcadia-custom-blocks',
			'icon'				=> 'pressthis',
            'mode'              => 'preview',
			'keywords'			=> array( 'Gradient','Text'),
		));
        // register a recent resources block
		acf_register_block(array(
			'name'				=> 'recent-resources',
			'title'				=> __('Recent Resources'),
			'description'		=> __('Recent Resources'),
			'render_callback'	=> 'arcadia_acf_block_render_callback',
			'category'			=> 'arcadia-custom-blocks',
			'icon'				=> 'excerpt-view',
            'mode'              => 'preview',
			'keywords'			=> array( 'Recent','Resources'),
		));
	}
}
function arcadia_acf_block_render_callback( $block ) {
	
	// convert name ("acf/testimonial") into path friendly slug ("testimonial")
	$slug = str_replace('acf/', '', $block['name']);
	
	// include a template part from within the "template-parts/block" folder
	if( file_exists( get_theme_file_path("/acf/block/content-{$slug}.php") ) ) {
		include( get_theme_file_path("/acf/block/content-{$slug}.php") );
	}
}