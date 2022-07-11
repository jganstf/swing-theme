<?php // first found on partnership design
$fields = get_fields(); ?>
<div class="swing-stats">
   <div class="d-md-flex justify-content-between">
      <?php foreach($fields['stats'] as $i => $stat ):?>
         <div class="swing-stat">
            <div class="ss-quantity"><?php echo $stat['quantity']; ?></div>
            <div class="ss-item bdy-lg"><?php echo $stat['item']; ?></div>
            <div class="ss-descr bdy-md"><?php echo $stat['descr']; ?></div>
         </div>
      <?php endforeach;?>
   </div>
</div>