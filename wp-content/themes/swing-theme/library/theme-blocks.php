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
		'name'			=> 'careers-about',
		'title'			=> 'Career About',
		'render_template'	=> 'blocks/careers-about.php',
		'category'		=> 'theme-blocks',
		'icon'			=> 'thumbs-up',
		'mode'			=> 'edit',
      'keywords'		=> ['careers', 'about', 'swing', 'education'],
      'supports' => ['align' => false],
   ]);
	acf_register_block([
		'name'			=> 'careers-profiles',
		'title'			=> 'Career Profiles',
		'render_template'	=> 'blocks/careers-profiles.php',
		'category'		=> 'theme-blocks',
		'icon'			=> 'thumbs-up',
		'mode'			=> 'edit',
      'keywords'		=> ['profiles', 'swing', 'education', 'careers'],
      'supports' => ['align' => false],
   ]);
	acf_register_block([
		'name'			=> 'careers-profiles',
		'title'			=> 'Career Profiles',
		'render_template'	=> 'blocks/careers-profiles.php',
		'category'		=> 'theme-blocks',
		'icon'			=> 'thumbs-up',
		'mode'			=> 'edit',
      'keywords'		=> ['profiles', 'swing', 'education', 'careers'],
      'supports' => ['align' => false],
   ]);
	acf_register_block([
		'name'			=> 'career-life-grid',
		'title'			=> 'Careers Life',
		'render_template'	=> 'blocks/careers-life-grid.php',
		'category'		=> 'theme-blocks',
		'icon'			=> 'thumbs-up',
		'mode'			=> 'edit',
      'keywords'		=> ['life', 'swing', 'careers'],
      'supports' => ['align' => false],
   ]);
	acf_register_block([
		'name'			=> 'career-open-positions',
		'title'			=> 'Careers Open Positions',
		'render_template'	=> 'blocks/careers-positions.php',
		'category'		=> 'theme-blocks',
		'icon'			=> 'thumbs-up',
		'mode'			=> 'edit',
      'keywords'		=> ['open', 'positions', 'swing', 'careers'],
      'supports' => ['align' => false],
   ]);
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
		'name'			=> 'partnership-states',
		'title'			=> 'Partnership States',
		'render_template'	=> 'blocks/partnership-states.php',
		'category'		=> 'theme-blocks',
		'icon'			=> 'thumbs-up',
		'mode'			=> 'edit',
      'keywords'		=> ['partnership', 'states', 'hero', 'swing', 'education'],
      'supports' => ['align' => false],
   ]);
	acf_register_block([
		'name'			=> 'partnership-pricing',
		'title'			=> 'Partnership Pricing',
		'render_template'	=> 'blocks/partnership-pricing.php',
		'category'		=> 'theme-blocks',
		'icon'			=> 'thumbs-up',
		'mode'			=> 'edit',
      'keywords'		=> ['partnership', 'pricing', 'hero', 'swing', 'education'],
      'supports' => ['align' => false],
   ]);
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
	// acf_register_block([
	// 	'name'			=> 'swing-media-text',
	// 	'title'			=> 'Swing Media Text',
	// 	'render_template'	=> 'blocks/media-text-single.php',
	// 	'category'		=> 'theme-blocks',
	// 	'icon'			=> 'thumbs-up',
	// 	'mode'			=> 'edit',
   //    'keywords'		=> ['for', 'subs', 'media', 'text', 'swing', 'education'],
   //    'supports' => ['align' => false],
   // ]);
	acf_register_block([
		'name'			=> 'swing-story-slider',
		'title'			=> 'Swing Stories Slider',
		'render_template'	=> 'blocks/story-slider.php',
		'category'		=> 'theme-blocks',
		'icon'			=> 'thumbs-up',
		'mode'			=> 'edit',
      'keywords'		=> ['story', 'slider', 'stories', 'swing', 'education'],
      'supports' => ['align' => false],
   ]);
	acf_register_block([
		'name'			=> 'swing-get-started-steps',
		'title'			=> 'Get Started Steps',
		'render_template'	=> 'blocks/get-started-steps.php',
		'category'		=> 'theme-blocks',
		'icon'			=> 'thumbs-up',
		'mode'			=> 'edit',
      'keywords'		=> ['get', 'started', 'step', 'swing', 'education'],
      'supports' => ['align' => false],
   ]);
	acf_register_block([
		'name'			=> 'swing-about-card-rotator',
		'title'			=> 'About Card Rotator',
		'render_template'	=> 'blocks/about-card-rotator.php',
		'category'		=> 'theme-blocks',
		'icon'			=> 'thumbs-up',
		'mode'			=> 'edit',
      'keywords'		=> ['about', 'rotator', 'card', 'swing', 'education'],
      'supports' => ['align' => false],
   ]);
	acf_register_block([
		'name'			=> 'swing-about-founders',
		'title'			=> 'About Founders',
		'render_template'	=> 'blocks/about-founders.php',
		'category'		=> 'theme-blocks',
		'icon'			=> 'thumbs-up',
		'mode'			=> 'edit',
      'keywords'		=> ['about', 'founders', 'swing', 'education'],
      'supports' => ['align' => false],
   ]);
	acf_register_block([
		'name'			=> 'swing-about-board',
		'title'			=> 'About Board',
		'render_template'	=> 'blocks/about-board.php',
		'category'		=> 'theme-blocks',
		'icon'			=> 'thumbs-up',
		'mode'			=> 'edit',
      'keywords'		=> ['about', 'board', 'swing', 'education'],
      'supports' => ['align' => false],
   ]);
	acf_register_block([
		'name'			=> 'swing-about-partners',
		'title'			=> 'About Partners',
		'render_template'	=> 'blocks/about-partners.php',
		'category'		=> 'theme-blocks',
		'icon'			=> 'thumbs-up',
		'mode'			=> 'edit',
      'keywords'		=> ['about', 'partners', 'swing', 'education'],
      'supports' => ['align' => false],
   ]);
	acf_register_block([
		'name'			=> 'swing-about-news-press',
		'title'			=> 'About News & Press',
		'render_template'	=> 'blocks/about-news-press.php',
		'category'		=> 'theme-blocks',
		'icon'			=> 'thumbs-up',
		'mode'			=> 'edit',
      'keywords'		=> ['about', 'news', 'press', 'swing', 'education'],
      'supports' => ['align' => false],
   ]);
	acf_register_block([
		'name'			=> 'home-about',
		'title'			=> 'Home About',
		'render_template'	=> 'blocks/home-about.php',
		'category'		=> 'theme-blocks',
		'icon'			=> 'thumbs-up',
		'mode'			=> 'edit',
      'keywords'		=> ['home', 'about', 'swing', 'education'],
      'supports' => ['align' => false],
   ]);
	acf_register_block([
		'name'			=> 'home-testimonials',
		'title'			=> 'Home Testimonials',
		'render_template'	=> 'blocks/home-testimonials.php',
		'category'		=> 'theme-blocks',
		'icon'			=> 'thumbs-up',
		'mode'			=> 'edit',
      'keywords'		=> ['home', 'testimonials', 'swing', 'education'],
      'supports' => ['align' => false],
   ]);
	acf_register_block([
		'name'			=> 'home-cta',
		'title'			=> 'Home Join Call to Action',
		'render_template'	=> 'blocks/home-cta.php',
		'category'		=> 'theme-blocks',
		'icon'			=> 'thumbs-up',
		'mode'			=> 'edit',
      'keywords'		=> ['home', 'join', 'cta', 'swing', 'education'],
      'supports' => ['align' => false],
   ]);
   acf_register_block([
		'name'			=> 'swing-posts',
		'title'			=> 'Posts',
		'render_template'	=> 'blocks/swing-posts.php',
		'category'		=> 'theme-blocks',
		'icon'			=> 'thumbs-up',
		'mode'			=> 'edit',
      'keywords'		=> ['posts'],
      'supports' => ['align' => false],
   ]);
   acf_register_block([
		'name'			=> 'swing-newsletter',
		'title'			=> 'Newsletter',
		'render_template'	=> 'blocks/swing-newsletter.php',
		'category'		=> 'theme-blocks',
		'icon'			=> 'thumbs-up',
		'mode'			=> 'edit',
      'keywords'		=> ['swing', 'newsletter'],
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
