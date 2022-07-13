<?php 
$fields = get_fields(); 
// $fields = $args['fields'];
?>
<div class="_main">
   <div class="inner-wrap">
      <div class="hero-content">
         <h1><?php echo $fields['hero_heading'];?></h1>
         <p><?php echo $fields['hero_content'];?></p>
         <?php if($btns = $fields['hero_buttons']): ?>
            <?php foreach($btns as $i => $btn):
               $btn = $btn['btn_link'];?>
               <a href="<?php echo $btn['url'];?>" target="<?php echo $btn['target']?:'_self';?>" class="btn <?php echo $i != 0 ? 'secondary-btn' : 'primary-btn';?>">
                  <?php echo $btn['title']; ?>
               </a>
            <?php endforeach;?>
         <?php endif;?>
      </div>
      <div class="hero-img">
         <div class="decor-img" style="background-image: url(<?php echo get_the_post_thumbnail_url($post, '2048x2048')?: (wp_get_environment_type() == 'local' ? 'https://picsum.photos/800/800':null);?>)"></div>
      </div>
   </div>
</div>