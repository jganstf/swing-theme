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
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

function theme_register_blocks() {
   if( ! function_exists('acf_register_block') ) {
      return;
   }
	acf_register_block([
		'name'			=> 'theme-portfolio-slider',
		'title'			=> 'Portfolio Slider',
		'render_template'	=> 'blocks/portfolio-slider.php',
		'category'		=> 'theme-blocks',
		'icon'			=> 'thumbs-up',
		'mode'			=> 'edit',
      'keywords'		=> ['portfolio', 'slider', 'portagevc'],
      'supports' => ['align' => false],
  ]);
// 	acf_register_block([
// 		'name'			=> 'theme-youtube-grid',
// 		'title'			=> 'Youtube Grid',
// 		'render_callback'	=> 'theme_block_youtube',
// 		'category'		=> 'common',
// 		'icon'			=> 'thumbs-up',
// 		'mode'			=> 'edit',
//       'keywords'		=> ['youtube', 'theme'],
//       'supports' => ['align' => false],
//       // 'enqueue_assets' => function() {
//       //   wp_enqueue_script( 'block-youtube-grid', 'https://cdn.jsdelivr.net/npm/macy@2.5.1/dist/macy.min.js', [], '', true );
//       // }
//       // 'enqueue_script' => 'https://cdn.jsdelivr.net/npm/macy@2.5.1/dist/macy.min.js',
//   ]);
}
add_action('acf/init', 'theme_register_blocks' );

function theme_register_blocks_style() {
   if ( function_exists( 'register_block_style' ) ) {
      register_block_style(
         'core/quote',
         array(
            'name'         => 'blue-quote',
            'label'        => __( 'Blue Quote', 'textdomain' ),
            'is_default'   => true,
            'inline_style' => '.wp-block-quote.is-style-blue-quote { color: blue; }',
         )
      );
  }
}
// add_action('acf/init', 'theme_register_blocks' );
