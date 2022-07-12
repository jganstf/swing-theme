<?php 
   $fields = get_fields(); 
   $whitepapers = $fields['white_paper_selection'];
   $posts = $fields['posts'];
   // if(!$posts) {
   //    $posts = get_posts([
   //       'post_status'    => 'publish',
   //       'post_type'      => 'post',
   //       'posts_per_page' => 3 //!
   //    ]);
   // }
?>

<div class="helpful-articles">
   <?php if($heading = $fields['heading']):?>
      <h2><?php echo $heading;?></h2>
   <?php endif;?> 
   <div class="ha-wrap grid-three">
      <?php if($posts): 
         foreach($posts as $item):?>
         <div class="help-art grid-item">
            <div class="help-art-img" style="background-image: url('https://picsum.photos/800/800')"></div>
            <div class="help-art-content card">
               <!-- <time><?php //echo date('F d, Y', strtotime($item->post_date));?>) -->
               <h3><?php echo $item->post_title;?></h3>
               <!-- <p><?php //echo $item->post_title;?></p> -->
               <a href="<?php echo get_permalink($item);?>">
                  <span>learn more</span>
               </a>
            </div>
         </div>
      <?php endforeach; endif ?>
   </div>

   <?php include( locate_template('blocks/whitepaper.php', false, false, $args=['whitepapers' => $whitepapers]));?>
</div>