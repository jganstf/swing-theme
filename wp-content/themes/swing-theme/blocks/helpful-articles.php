<?php 
   $fields = get_fields(); 
   $whitepapers = $fields['white_paper_selection'];
   $posts = $fields['posts'];
?>

<div class="helpful-articles">
   <?php if($heading = $fields['heading']):?>
      <h2><span class="letters"><?php echo $heading;?></span></h2>
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
               <a class="link-learn-more" href="<?php echo get_permalink($item);?>">
                  <span>learn more</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"> <polygon points="11.293 4.707 17.586 11 4 11 4 13 17.586 13 11.293 19.293 12.707 20.707 21.414 12 12.707 3.293 11.293 4.707"/> </svg>
               </a>
            </div>
         </div>
      <?php endforeach; endif ?>
   </div>

   <?php 
   if($whitepapers) {
      include( locate_template('blocks/whitepaper.php', false, false, $args=['whitepapers' => $whitepapers]));
   }?>
</div>