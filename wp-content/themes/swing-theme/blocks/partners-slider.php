<?php $fields = get_fields(); ?>

<div class="partners-slider">
   <?php foreach($fields['partners'] as $partner):?>
      <div class="partner">
         <img src="<?php echo $partner['image']['sizes']['medium'];?>" alt="<?php echo $partner['image']['alt'];?>" width="<?php echo $partner['image']['sizes']['medium-width'];?>" height="<?php echo $partner['image']['sizes']['medium-height'];?>">
      </div>
   <?php endforeach;?>
</div>