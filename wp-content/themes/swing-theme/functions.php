<?php
define("IS_LOCAL", wp_get_environment_type() == 'local');

//Uncomment for error Logging in debug.txt
ini_set('error_log', get_template_directory() . '/debug.txt');

require_once 'library/util/svg-includes.php';
require_once 'library/util/menu-walker.php';
require_once 'library/util/remote-media/remote-media.php';

require_once 'library/theme-setup.php';
require_once 'library/theme-enqueue.php';
//TODO require_once 'library/theme-gutenberg.php';
require_once 'library/theme-blocks.php';
require_once 'library/theme-rest.php';

//Custom Post Types
// require_once 'library/cpt/team.php';
require_once 'library/cpt/stories.php';
require_once 'library/cpt/testimonials.php';
require_once 'library/cpt/whitepaper.php';


//dev setup automation
if (IS_LOCAL) {
   require_once 'library/develop-setup.php';
}



function insert_picture($img, $size)
{ //TODO
?>
   <picture>
      <div class="decor-img" style="background-image: url(<?php echo pathinfo($img['sizes'][$size])['filename'] . '.webp'; ?>"></div>
      <div class="decor-img" style="background-image: url(<?php echo $img['sizes'][$size]; ?>)"></div>

      <!-- 
      <source media="(min-width:650px)" srcset="img_pink_flowers.jpg">
      <source media="(min-width:465px)" srcset="img_white_flower.jpg">
      <img src="img_orange_flowers.jpg" alt="Flowers" style="width:auto;"> 
      -->
   </picture>
<?php
}

function social_share($soc_name)
{
   $share_options = [
      'facebook' => 'https://www.facebook.com/sharer/sharer.php?u=' . get_the_permalink(),
      'twitter'  => 'https://twitter.com/intent/tweet?text=' . get_the_title() . '&url=' . get_the_permalink(),
      'linkedin' => 'https://www.linkedin.com/cws/share?url=' . get_the_permalink(),
      'email'    => 'mailto:?subject=I wanted you to see this: ' . get_the_title() . '&amp;body=' . get_the_permalink()
   ];

   echo $share_options[$soc_name];
}

function get_breadcrumb()
{
   echo '<a href="' . home_url() . '" rel="nofollow">Home</a>';
   if (is_category() || is_single()) {
      echo "&nbsp;&nbsp;>&nbsp;&nbsp;";
      the_category(' &bull; ');
      if (is_single()) {
         echo " &nbsp;&nbsp;>&nbsp;&nbsp; ";
         the_title();
      }
   } elseif (is_page()) {
      echo "&nbsp;&nbsp;>&nbsp;&nbsp;";
      echo the_title();
   } elseif (is_search()) {
      echo "&nbsp;&nbsp;>&nbsp;&nbsp;Search Results for... ";
      echo '"<em>';
      echo the_search_query();
      echo '</em>"';
   }
}
