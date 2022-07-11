<?php $fields = get_fields(); ?>

<div class="media text">
   <?php foreach([1,2] as $section):?>
      <div class="blue-media-text <?php $i%2 == 1 ? 'has-media-on-right': ''; ?>">
         <div class="decor-img" style="background-image: url()"></div>
         <div class="bmt-content">
            <h2><?php echo $section['heading'];?></h2>
            <p><?php echo $section['content'];?></p>
            <?php if($btn = $section['btn_link']): ?>
               <a href="<?php echo $btn['url'];?>" target="<?php echo $btn['target']?:'_self';?>" class="">
                  <?php echo $btn['title']; ?>
               </a>
            <?php endif;?>
         </div>
      </div>
   <?php endforeach;?>
</div>