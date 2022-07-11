<?php 
$fields = get_fields(); 
$testimonies = $fields['testimonies']; 
?>

<div class="testimonial-slider-wrap">
   <div class="testimonial-slider slick">
      <?php foreach($testimonies as $slide):?>
         <div class="testimonial">
            <!-- //TODO quotation marks --> 
            <?php echo $slide->post_content; ?>
            <cite>
               <?php echo $slide->post_title; ?>
               <br/>
               <span><?php echo get_field('citation_title', $slide); ?></span>
            </cite>
         </div>
      <?php endforeach;?>
   </div>
</div>