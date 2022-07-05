<?php /* Template Name: Getting Started */

$fields = get_fields();
get_header();
while(have_posts()): the_post(); ?>

<main id="main-content" class="main-content-wrap">
   <!-- <div class="gs-hero blue-section">
      <div class="main">
         <div class="inner-wrap rel">
            <div class="decor-img cover" style="background-image: url(<?php //echo get_the_post_thumbnail_url($post->ID, '2048x2048');?>)"></div>
            <div class="gs-hero-content">
               <h1><?php //echo $fields['hero_heading']?:$post->post_title; ?></h1>
               <p><?php //echo $fields['hero_content']; ?></p>
            </div>
         </div>
      </div>
   </div> -->
   
   <div class="main">
      <div class="inner-wrap">
         <?php include(locate_template('template-parts/home/home-hero.php', false, false));?>

         <?php include(locate_template('template-parts/call-to-action.php', false, false));?>

      </div>
   </div>
</main>

<?php
endwhile;
get_footer();