<?php $fields = get_fields(); ?>

<div class="flexible-pricing">
   <div class="d-flex flex-column">
      <h2><?php echo $fields['headaing']; ?></h2>
      <?php //include( locate_template('template-parts/toggle.php', false, false, $args=[]));?>
      <p>Pay your expected usage upfront and save on your service fee.</p>
      <p><strong>Included in every plan:</strong></p>
      <div class="grid-two">
         <?php foreach([1,2,3,4] as $item):?>
            <div class="pricing-item">
               <h3><?php echo $item['heading'];?></h3>
               <p><?php echo $item['content'];?></p>
            </div>
         <?php endforeach;?>
      </div>
   </div>
</div>