<?php $fields = get_fields(); ?>

<div class="testimonial-slider slick">
   <?php foreach([1,2,3] as $slide):?>
      <div class="testimonial">
         <p><?php echo $slide->post_content; ?>
         <cite>
            <?php echo $slide->post_title; ?>
            <br/>
            <?php echo get_field('citation_title', $slide); ?>
         </cite>
      </div>
   <?php endforeach;?>
</div>