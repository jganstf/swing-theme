<?php $fields = get_fields(); ?>

<div class="careers-about">
   <div class="decor-img" style="background-image: url(<?php echo $fields['img']['sizes']['large'];?>)"></div>
   <h2><?php echo $fields['heading']; ?></h2>
   <?php echo $fields['content']; ?>
</div>