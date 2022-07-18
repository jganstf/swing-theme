<?php $fields = get_fields(); ?>
<div class="careers-life">
   <h2><?php echo $fields['heading']?:'Enjoy your work, and have a life too'; ?></h2>
   <div class="life-grid _grid-two">
      <?php foreach($fields['statements'] as $item):?>
         <div class="grid-item bg3 card d-flex align-items-center">
            <div class="icon-img" style="background-image: url(<?php echo $item['image']['sizes']['medium']; ?>)"></div>
            <h3><?php echo $item['content']; ?></h3>
         </div>
      <?php endforeach;?>
   </div>
</div>