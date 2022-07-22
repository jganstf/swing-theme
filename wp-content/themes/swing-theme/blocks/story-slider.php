<?php $fields = get_fields(); 
echo '<script>console.log('.json_encode($fields, JSON_PRETTY_PRINT).');</script>';//debug?>

<div class="story-slider">
   <div class="story-slider-content">
      <h2><?php echo $fields['heading']; ?></h2>
   </div>
   <div class="stories-wrap slick">
      <?php 
      if( $stories = $fields['stories'] ):
         foreach( $fields['stories'] as $story ): ?>
            <div class="story d-flex">
               <div class="story-img" style="background-image: url(<?php echo $story['content_group']['img']['sizes']['large'];?>)"></div>
               <div class="story-content">
                  <h3><?php echo $story['heading']; ?></h3>
                  <p><?php echo $story['content_group']['content']; ?></p>
               </div>
            </div>
         <?php endforeach;
      endif;?>
   </div>
</div> 