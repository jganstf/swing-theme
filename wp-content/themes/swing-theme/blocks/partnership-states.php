<?php $fields = get_fields(); ?>

<div class="partnership-states blue-section">
   <div class="d-md-flex">
      <div class="partner-states-content">
         <h2>Ready to partner with you in Arizona, California, Texas, New Jersey, New York, and Washington D.C.</h2>
         <p>Operating in just six states and the District of Columbia allows our recruitment team to adopt hyper-local strategies to find the best subs for our partners.</p>
         <?php if($btn = $fields['btn_link']): ?>
         <a href="<?php echo $btn['url'];?>" target="<?php echo $btn['target']?:'_self';?>" class="">
            <?php echo $btn['title']?:'Request Demo'; ?>
         </a>
         <?php endif;?>
      </div>
      <div class="partner-states-map">
         <!-- //TODO -->
      </div>
   </div>
</div>