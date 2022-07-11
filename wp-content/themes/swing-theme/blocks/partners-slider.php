<?php $fields = get_fields(); ?>

<div class="partners-slider">
   <?php foreach($fields['partners'] as $p):?>
      <div class="partner">
         <img src="<?php echo $partner['iamge']['sizes']['medium'];?>" alt="<?php echo $partner['iamge']['alt'];?>">
      </div>
   <?php endforeach;?>
</div>