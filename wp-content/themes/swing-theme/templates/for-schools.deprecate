<?php /* Template Name: For Schools */

$fields = get_fields();
get_header();
while(have_posts()): the_post(); ?>

<main id="main-content" class="main-content-wrap">
   
   <?php //include(locate_template('template-parts/hero.php', false, false));?>
   <div class="hero">
      <div class="main">
         <div class="inner-wrap">
            <div class="hero-content">
               <h1><?php echo $fields['hero_heading'];?></h1>
               <p><?php echo $fields['hero_content'];?></p>
            </div>
            <div class="hero-img">
               <div class="decor-img" style="background-image: url(<?php echo get_the_post_thumbnail_url($p, '2048x2048');?>)"></div>
            </div>
         </div>
      </div>
   </div>
   
   <div class="main">
      <div class="inner-wrap">

         <!-- <div>
            <h2>Substitute teachers at the click of a button</h2>
            <div class="grid-three">
               <?php foreach([1,2,3,4] as $card):?>
                  <div class="card light grid-item">
                     <p>Send a single request that instantly notifies hundreds of high-quality subs in your area for a lightning-fast fill.</p>
                  </div>
               <?php endforeach;?>
            </div>
         </div> -->

         <?php //include(locate_template('blocks/helpful-articles.php', false, false));?>
         <?php //include(locate_template('blocks/whitepaper.php', false, false));?>
         <?php the_content(); ?>
         <?php include(locate_template('template-parts/call-to-action.php', false, false));?>

      </div>
   </div>
</main>

<?php
endwhile;
get_footer();