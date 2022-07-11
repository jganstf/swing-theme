<?php /*Template Name: About */

$fields = get_fields();
get_header();
while(have_posts()): the_post(); ?>

<main id="main-content" class="main-content-wrap">
   
   <?php //include(locate_template('template-parts/hero.php', false, false));?>
   
   <div class="page-default-content main">
      <div class="inner-wrap">

         <?php the_content(); ?>

         <div class="media-text">

         </div>
         <div class="about-slider"></div>
         <div class="founders"></div>
         <div class="board"></div>
         <div class="partners"></div>
         <div class="news-press"></div>

         <?php include(locate_template('template-parts/call-to-action.php', false, false));?>

      </div>
   </div>
</main>

<?php
endwhile;
get_footer();