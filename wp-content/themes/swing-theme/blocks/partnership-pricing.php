<?php $fields = get_fields(); ?>

<div class="partnership-pricing light-blue-bg">
   <h2><?php echo $fields['heading']; ?></h2>
   <?php echo $fields['content']; ?>
   <p><strong>Included in every plan:</strong></p>
   <div class="part-price-stat-wrap">
      <?php foreach($fields['statements'] as $stat):?>
         <div class="part-price-stat card">
            <div class="d-flex align-items-center">
               <!-- //TODO <div class="pps-icon" style="background-image: url(<?php echo $stat['img']['sizes']['medium'];?>)"></div> -->
               <div>
                  <h3><?php echo $stat['heading']; ?></h3>
                  <p><?php  echo $stat['content']; ?></p>
               </div>
            </div>
         </div>
      <?php endforeach;?>
   </div>
</div>