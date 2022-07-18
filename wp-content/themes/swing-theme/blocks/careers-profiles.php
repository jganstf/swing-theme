<?php $fields = get_fields(); ?>
<div class="careers-profiles bg3 slick">
   <?php foreach($fields['profiles'] as $profile):?>
      <div class="cprofile br">
         <h2><?php echo $profile['heading']; ?></h2>
         <p><?php echo $profile['content']; ?></p>
      </div>
   <?php endforeach;?>
</div>