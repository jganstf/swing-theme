<?php $fields = get_fields(); ?>

<div class="about-partners">
   <div class="d-flex justify-content-center flex-wrap">
      <?php foreach($fields['partners'] as $partner):
         $img = $partner['sizes']['medium']; ?>
         <div class="about-partner">
            <img src="<?php echo $partner['sizes']['medium'];?>" alt="<?php echo $partner['alt'];?>" width="<?php echo $partner['sizes']['medium-width'];?>" height="<?php echo $partner['sizes']['medium-height'];?>"/>
         </div>
      <?php endforeach;?>
   </div>
</div>