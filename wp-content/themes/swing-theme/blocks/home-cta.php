<?php $fields = get_fields(); ?>

<div class="home-join">
   <div class="row justify-content-between">
      <div class="col-md-6">
         <h2><?php echo $fields['heading'];?></h2>
         <p><?php echo $fields['content'];?></p>
         <div class="btns-wrap d-sm-flex">
            <?php foreach($fields['buttons'] as $btn):
               $btn = $btn['btn_link']; ?>
               <a href="<?php echo $btn['url'];?>" target="<?php echo $btn['target']?:'_self';?>" class="btn">
                  <?php echo $btn['title']; ?>
               </a>
            <?php endforeach;?>
         </div>
      </div>
      <div class="partners col-md-6 grid-three">
         <?php foreach($fields['partners'] as $partner): ?>
            <div class="partner grid-item">
               <img src="<?php echo $partner['sizes']['medium'];?>" alt="" width="<?php echo $partner['image']['sizes']['medium-width'];?>" height="<?php echo $partner['image']['sizes']['medium-height'];?>" />
            </div>
         <?php endforeach;?>
      </div>
   </div>
</div>