<?php

// Block categories
add_filter( 'block_categories_all', function( $categories, $post ) {
   return array_merge(
      $categories,
      array(
         array(
            'slug' => 'theme-blocks',
            'title' => 'Theme Blocks',
         ),
      )
   );
}, 10, 2 );

add_action('acf/init', 'theme_register_blocks' );
function theme_register_blocks() {
   if( ! function_exists('acf_register_block') ) {
      return;
   }
	acf_register_block([
		'name'			=> 'theme-partners-slider',
		'title'			=> 'Partners Slider',
		'render_template'	=> 'blocks/partners-slider.php',
		'category'		=> 'theme-blocks',
		'icon'			=> 'thumbs-up',
		'mode'			=> 'edit',
      'keywords'		=> ['partners', 'slider', 'swing', 'for', 'schools'],
      'supports' => ['align' => false],
   ]);
	acf_register_block([
		'name'			=> 'theme-helpful-articles',
		'title'			=> 'Helpful Articles',
		'render_template'	=> 'blocks/helpful-articles.php',
		'category'		=> 'theme-blocks',
		'icon'			=> 'thumbs-up',
		'mode'			=> 'edit',
      'keywords'		=> ['whitepaper', 'helpful', 'articles', 'swing', 'education'],
      'supports' => ['align' => false],
   ]);
	// acf_register_block([
	// 	'name'			=> 'theme-whitepaper-block',
	// 	'title'			=> 'Whitepaper',
	// 	'render_template'	=> 'blocks/whitepaper.php',
	// 	'category'		=> 'theme-blocks',
	// 	'icon'			=> 'thumbs-up',
	// 	'mode'			=> 'edit',
   //    'keywords'		=> ['whitepaper', 'swing', 'education'],
   //    'supports' => ['align' => false],
   // ]);
	acf_register_block([
		'name'			=> 'swing-hero-full-width',
		'title'			=> 'Full-Width Hero',
		'render_template'	=> 'blocks/full-width-hero.php',
		'category'		=> 'theme-blocks',
		'icon'			=> 'thumbs-up',
		'mode'			=> 'edit',
      'keywords'		=> ['full-width', 'hero', 'swing', 'education'],
      'supports' => ['align' => false],
   ]);
	acf_register_block([
		'name'			=> 'swing-hero-contained',
		'title'			=> 'Contained Hero',
		'render_template'	=> 'blocks/hero-contained.php',
		'category'		=> 'theme-blocks',
		'icon'			=> 'thumbs-up',
		'mode'			=> 'edit',
      'keywords'		=> ['contained', 'hero', 'swing', 'education'],
      'supports' => ['align' => false],
   ]);
	acf_register_block([
		'name'			=> 'swing-testimonial-slider',
		'title'			=> 'Testimonial Slider',
		'render_template'	=> 'blocks/testimonial-slider.php',
		'category'		=> 'theme-blocks',
		'icon'			=> 'thumbs-up',
		'mode'			=> 'edit',
      'keywords'		=> ['testimonial', 'slider', 'swing', 'education'],
      'supports' => ['align' => false],
   ]);
	acf_register_block([
		'name'			=> 'swing-stats',
		'title'			=> 'Swing Stats',
		'render_template'	=> 'blocks/swing-stats.php',
		'category'		=> 'theme-blocks',
		'icon'			=> 'thumbs-up',
		'mode'			=> 'edit',
      'keywords'		=> ['stats', 'swing', 'education'],
      'supports' => ['align' => false],
   ]);
	acf_register_block([
		'name'			=> 'swing-cards',
		'title'			=> 'Swing Cards',
		'render_template'	=> 'blocks/swing-cards.php',
		'category'		=> 'theme-blocks',
		'icon'			=> 'thumbs-up',
		'mode'			=> 'edit',
      'keywords'		=> ['cards', 'swing', 'education'],
      'supports' => ['align' => false],
   ]);
	acf_register_block([
		'name'			=> 'swing-stats',
		'title'			=> 'Swing Stats',
		'render_template'	=> 'blocks/swing-stats.php',
		'category'		=> 'theme-blocks',
		'icon'			=> 'thumbs-up',
		'mode'			=> 'edit',
      'keywords'		=> ['stats', 'swing', 'education'],
      'supports' => ['align' => false],
   ]);
	acf_register_block([
		'name'			=> 'swing-home-cta',
		'title'			=> 'Home Join CTA',
		'render_template'	=> 'blocks/home-cta.php',
		'category'		=> 'theme-blocks',
		'icon'			=> 'thumbs-up',
		'mode'			=> 'edit',
      'keywords'		=> ['cta', 'home', 'join', 'swing', 'education'],
      'supports' => ['align' => false],
   ]);
	acf_register_block([
		'name'			=> 'swing-text-cards-rotator',
		'title'			=> 'Swing Text & Cards Rotator',
		'render_template'	=> 'blocks/text-cards-rotator.php',
		'category'		=> 'theme-blocks',
		'icon'			=> 'thumbs-up',
		'mode'			=> 'edit',
      'keywords'		=> ['for', 'subs', 'cards', 'text', 'rotator', 'swing', 'education'],
      'supports' => ['align' => false],
   ]);
	acf_register_block([
		'name'			=> 'swing-media-text',
		'title'			=> 'Swing Media Text',
		'render_template'	=> 'blocks/media-text-single.php',
		'category'		=> 'theme-blocks',
		'icon'			=> 'thumbs-up',
		'mode'			=> 'edit',
      'keywords'		=> ['for', 'subs', 'media', 'text', 'swing', 'education'],
      'supports' => ['align' => false],
   ]);
}

/**
 * Theme Youtube Callback Function.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */
function theme_block_youtube($block, $content = '', $is_preview = false, $post_id = 0) {
  $fields = get_fields();
  $videos = $fields['videos'];
  ob_start();
  if ($videos) { ?>
    <div class="youtube-grid">
      <?php foreach ($videos as $video) { ?>
        <?php
          $url = $video['url'];
          $title = $video['title'];
          $vid_id = get_youtube_id($url)
        ?>
        <a href="<?php echo $url ?>" target="_blank" rel="noopener noreferrer" data-ytsrc="<?php echo $vid_id ?>">
          <div class="ytg-img">
            <img src="https://img.youtube.com/vi/<?php echo $vid_id ?>/mqdefault.jpg" alt="">
            <svg viewBox="0 0 295 295"><path d="M279 80c-11-20-26-38-44-51a6 6 0 00-7 9 137 137 0 0155 109A136 136 0 11147 12a6 6 0 000-12 148 148 0 10132 80z"/><path d="M110 79c-2 1-3 3-3 5v132a6 6 0 0012 0V95l88 53-65 42a6 6 0 107 10l73-48a6 6 0 000-10L116 79h-6z"/></svg>
          </div>
          <?php if ($title) { ?>
            <h3><?php echo $title ?></h3>
          <?php } ?>
        </a>
      <?php } ?>
    </div>
  <?php }
  $youtube_block = ob_get_clean();
  echo $youtube_block;
}

/////////////////////////////////////////////////////////

function theme_register_blocks_style() {
   if ( function_exists( 'register_block_style' ) ) {
      register_block_style(
         'core/group',
         array(
            'name'         => 'swing-blue-bg',
            'label'        => __( 'Swing Blue Background', 'textdomain' ),
            'is_default'   => false,
            'inline_style' => '.wp-block-group.is-style-swing-blue',
         )
      );
      register_block_style(
         'core/group',
         array(
            'name'         => 'light-blue-bg',
            'label'        => __( 'Light Blue Background', 'textdomain' ),
            'is_default'   => false,
            'inline_style' => '.wp-block-group.is-style-light-blue { color: red; }',
            // 'style_handle' => 'testing',
         )
      );
      //TODO
      // register_block_style(
      //    'acf/swing-page-hero',
      //    array(
      //       'name'         => 'hero-about',
      //       'label'        => __( 'About Page Hero', 'textdomain' ),
      //       'is_default'   => false,
      //       'inline_style' => '.hero.ph-about',
      //    )
      // );
      // register_block_style(
      //    'acf/swing-page-hero',
      //    array(
      //       'name'         => 'hero-getting-started',
      //       'label'        => __( 'Getting Started Hero', 'textdomain' ),
      //       'is_default'   => false,
      //       'inline_style' => '.hero.ph-getting-started',
      //    )
      // );
  }
}
add_action('acf/init', 'theme_register_blocks_style' );
