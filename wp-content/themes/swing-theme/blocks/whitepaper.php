<?php 
   // $fields = get_fields();
   $whitepaper = $args['whitepapers'][0];//$fields['whitepaper'];
   $download_link = get_fields('download_link', $whitepaper->ID);
   // if(!$whitepaper) {
   //    $whitepaper = get_posts([
   //       'post_type'      => 'whitepaper',
   //       'post_status'    => 'publish',
   //       'posts_per_page' => 1
   //    ])[0]; //! more than one?
   // }
?>

<div class="whitepaper-section">
   <div class="wht-ppr d-md-flex _align-items-center">
      <!-- <div class="wht-ppr-img-wrap d-flex flex-column"> -->
      <div class="wht-ppr-img" style="background-image: url(<?php echo 'https://picsum.photos/1080/1080';?>)"></div>
      <!-- </div> -->
      <div class="d-xl-flex">
         <div class="wht-ppr-content">
            <p class="pre-heading-label"><?php echo get_the_terms($whitepaper, 'whitepaper_categories')[0]->name;?></p>
            <h3><?php echo $whitepaper->post_title; ?></h3>
            <p><?php echo $whitepaper->post_excerpt ?: wp_trim_words(wp_strip_all_tags($whitepaper->post_content), 30, '...'); ?></p>
         </div>
         <a class="btn" href="<?php echo $download_link;?>" rel="noreferrer">
            <?php echo $btn?:'Download'?>
         </a>
      </div>
   </div>
</div>