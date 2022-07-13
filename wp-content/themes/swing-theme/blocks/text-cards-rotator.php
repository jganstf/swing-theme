<?php 
/* First Found on 'For Subs' Page after hero */
$fields = get_fields();
$cards = $fields['cards']; 
$total = strval(count($cards)); 
?>

<div class="text-cards-rotator">
   <div class="d-md-flex align-items-center">
      <div class="tcr-content w-50">
         <h2><?php echo $fields['heading']; ?></h2>
         <p><?php echo $fields['content']; ?></p>
         <ul class="slick-dots" style="" role="tablist">
            <!-- TODO leading zero -->
            <?php foreach($cards as $i => $card):?>
               <li <?php if($i == 0) { echo 'class="slick-active"';}?> role="presentation">
                  <button type="button" role="tab" id="slick-slide-control0<?php echo strval($i);?>" aria-controls="slick-slide0<?php echo strval($i);?>" aria-label="<?php echo strval($i + 1);?> of <?php echo $total;?>" tabindex="<?php echo strval($i);?>" <?php if($i == 0) { echo 'aria-selected="true"';}?>><?php echo strval($i);?></button>
               </li>
            <?php endforeach;?>
         </ul>
      </div>
      <div class="tcr-cards cards slick w-50">
         <?php foreach($cards as $card):?>
            <div class="card bg3">
               <!-- card template -->
               <div class='icon-img' style='background-image: url(<?php echo $card['img'];?>)'></div>
               <h3><?php echo $card['heading']; ?></h3>
               <p><?php echo $card['content']; ?></p>
            </div>
         <?php endforeach;?>
      </div>
   </div>
</div>