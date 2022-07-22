<?php $fields = get_fields(); ?>

<div class="cards-grid<?php if($fields['settings']['overlap_next_section']) { echo ' overlap-section'; } ?>">
   <?php echo $fields['overview_content']; ?>
   <div class="cards-container<?php if($fields['settings']['enable_horizontal_scroll']) { echo ' cards-overflow'; } ?>">
   <!-- <div class="cards-container-inner"> -->
      <!-- <ul> -->
         <?php foreach($fields['cards'] as $card): ?>
            <div class="card bg3 slidee">
               <div class="icon-img" style="background-image: url(<?php echo $card['img']['url'];?>)"></div>
               <?php if($heading = $card['heading']): ?>
                  <h3><?php echo $heading; ?></h3>
               <?php endif;?>
               <p><?php echo $card['content']; ?></p>
            </div>
         <?php endforeach;?>
      <!-- </ul> -->
   <!-- </div> -->
   </div>
   
   <div class="scrollbar-custom">
      <div class="scrollbar-custom-thumb"></div>
   </div>
   <!-- <div id="test-scrollbar" class="scrollbar">
      <div class="handle"></div>
   </div> -->
</div>