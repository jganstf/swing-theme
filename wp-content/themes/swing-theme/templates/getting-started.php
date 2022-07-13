<?php /* Template Name: Getting Started */

$fields = get_fields();
get_header();
while(have_posts()): the_post(); ?>

<main id="main-content" class="main-content-wrap">
   <div class="main">
      <div class="inner-wrap">
         <?php the_content(); ?>
         <?php //include(locate_template('template-parts/helpful-articles.php', false, false));?>
         <?php include(locate_template('template-parts/call-to-action.php', false, false));?>

      </div>
   </div>
</main>

<?php
endwhile;
get_footer();