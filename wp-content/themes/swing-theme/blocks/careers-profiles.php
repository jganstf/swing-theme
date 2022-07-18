<?php $fields = get_fields(); ?>
<div class="careers-profiles bg3 slick">
   <?php foreach($fields['profiles'] as $profile):?>
      <div class="cprofile br">
         <div class="d-md-flex">
            <div>
               <h2><?php echo $profile['heading']; ?></h2>
               <p><?php echo $profile['content']; ?></p>
            </div>
            <div class="decor-img" style="background-image: url(<?php echo $profile['img']['sizes']['large'];?>)"></div>
         </div>
      </div>
   <?php endforeach;?>
</div>