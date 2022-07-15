<?php $fields = get_fields(); ?>
<div class="home-about light-blue">
   <h2 class="h2-dark-blue">
      <span class="text-wrapper">
         <span class="letters">
            <?php echo $fields['heading'];?>
         </span>
      </span>
   </h2>
   <p><?php echo $fields['content'];?></p>
   <div class="grid-three">
      <?php foreach($fields['cards'] as $card):?>
         <div class="card grid-item">
            <h3 class="h3-dark-blue mb-4"><?php echo $card['heading']; ?></h3>
            <p class="hdr-md mb-4"><strong><?php echo $card['statement']; ?></strong></p>
            <p><?php echo $card['content']; ?></p>
            <div class="icon-img" style="background-image: url(<?php echo $card['img']['sizes']['medium']; ?>)"></div>
         </div>
      <?php endforeach;?>
   </div>
</div>