<?php $fields = get_fields(); ?>

<div class="about-card-rotator before-bg3 d-md-flex">
   <div class="acr-content">
      <h2 class="hdr-md"><?php echo $fields['heading']; ?></h2>
      <p><?php echo $fields['content']; ?></p>
      <div class="acr-cards-wrap slick">
         <?php foreach($fields['cards'] as $card):
            //echo '<script>console.log('.json_encode($card, JSON_PRETTY_PRINT).');</script>';//debug
            ?>
            <div class="acr-card d-flex flex-column flex-md-row align-items-center">
               <div class="acr-card-img" style="background-image: url(<?php echo $card['img']['sizes']['medium'];?>)"></div>
               <div class="acr-card-content">
                  <h3><?php echo $card['heading']; ?></h3>
                  <p><?php echo $card['content']; ?></p>
               </div>
            </div>
         <?php endforeach;?>
      </div>
   </div>
   <div class="acr-img" style="background-image: url(<?php echo $fields['img']['sizes']['2048x2048'];?>)"></div>
</div>