<?php $fields = get_fields(); 
echo '<script>console.log('.json_encode($fields['partners'], JSON_PRETTY_PRINT).');</script>';//debug?>

<div class="partners-slider">
   <?php foreach($fields['partners'] as $partner):?>
      <div class="partner">
         <img src="<?php echo $partner['image']['sizes']['medium'];?>" alt="<?php echo $partner['image']['alt'];?>">
      </div>
   <?php endforeach;?>
</div>