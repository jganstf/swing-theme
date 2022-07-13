<?php /* Template Name: Home */

$fields = get_fields();
get_header();

// add_action('wp_enqueue_scripts', function() {
   wp_localize_script(
      'theme-js', 
      'homeTestimonials', 
      [ 
         'subs' => array_map(function($t) {
            return array_merge(
               (array)$t,
               [
                  'citation_title' => get_field('citation_title', $t)
               ]
            );
         },
         get_posts([
            'post_type' => 'testimonials',
            'post_status' => 'publish',
            'posts_per_page' => -1,
            'tax_query' => [
               [
                  'taxonomy' => 'testimonials_categories',
                  'field'    => 'slug',
                  'terms'    => 'subs',
               ]
            ]
         ])),
         'schools' => array_map(function($t) {
            return array_merge(
               (array)$t,
               [
                  'citation_title' => get_field('citation_title', $t)
               ]
            );
         },
         get_posts([
            'post_type' => 'testimonials',
            'post_status' => 'publish',
            'posts_per_page' => -1,
            'tax_query' => [
               [
                  'taxonomy' => 'testimonials_categories',
                  'field'    => 'slug',
                  'terms'    => 'schools',
               ]
            ]
         ])),
      ]
   );
// }, 10);

while(have_posts()): the_post(); ?>

<main id="main-content" class="main-content-wrap">
   <div class="main page-content-wrap">
      <div class="inner-wrap">
         <?php the_content() ?>
         <div class="home-about light-blue">
            <h2 class="h2-dark-blue"><?php echo $fields['about_heading'];?></h2>
            <p><?php echo $fields['about_content'];?></p>
            <div class="grid-three">
               <?php foreach($fields['about_items'] as $item):?>
                  <div class="card grid-item">
                     <h3 class="h3-dark-blue mb-4"><?php echo $item['heading']; ?></h3>
                     <p class="hdr-md mb-4"><strong><?php echo $item['statement']; ?></strong></p>
                     <p><?php echo $item['content']; ?></p>
                     <div class="icon-img" style="background-image: url(<?php echo $item['img']['sizes']['medium']; ?>)"></div>
                  </div>
               <?php endforeach;?>
            </div>
         </div>
         <div id="home-testimonials-wrap"></div>
         <div class="home-join">
            <div class="row justify-content-between">
               <div class="col-md-6">
                  <h2>Join our community of school partners and substitute teachers.</h2>
                  <p><?php echo $fields['join_content'];?></p>
                  <div class="btns-wrap d-sm-flex">
                     <?php foreach($fields['join_btns'] as $btn):
                        $btn = $btn['btn_link']; ?>
                        <a href="<?php echo $btn['url'];?>" target="<?php echo $btn['target']?:'_self';?>" class="btn">
                           <?php echo $btn['title']; ?>
                        </a>
                     <?php endforeach;?>
                  </div>
               </div>
               <div class="partners col-md-6 grid-three">
                  <?php foreach($fields['partners'] as $partner): ?>
                     <div class="partner grid-item">
                        <img src="<?php echo $partner['image']['sizes']['medium'];?>" alt="" width="<?php echo $partner['image']['sizes']['medium-width'];?>" height="<?php echo $partner['image']['sizes']['medium-height'];?>" />
                     </div>
                  <?php endforeach;?>
               </div>
            </div>
         </div>
         <?php //include(locate_template('template-parts/home/home-cta.php', false, false));?>
      </div>
   </div>
</main>

<?php
endwhile;
get_footer();