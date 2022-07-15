<?php $fields = get_fields(); ?>

<div class="story-slider">
   <div class="story-slider-content">
      <h2><?php echo $fields['heading']; ?></h2>
   </div>
   <div class="slick">
      <?php 
      if( $stories = $fields['stories'] ):
         foreach( $fields['stories'] as $story ): ?>
            <div class="story">

            </div>
         <?php endforeach;
      endif;?>
   </div>
</div> 