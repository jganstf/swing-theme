<?php $fields = get_fields(); ?>

<div class="helpful-articles">
   <h2><?php echo $fields['heading']?:'Helpful Articles';?></h2>
   <div class="grid-three">
      <?php foreach([1,2,3,4] as $item):?>
         <div class="h-article grid-item">
            <div class="decor-img" style="background-image: url()"></div>
            <div class="h-art-content">
               <time><?php echo date('F d, Y', strtotime($item->post_date);?>)
               <h3><?php echo $item->post_title;?></h3>
               <p><?php echo $item->post_title;?></p>
               <a href="<?php echo get_permalink($item);?>"> learn more</a>
         </div>
      <?php endforeach;?>
   </div>
   <div class="whitepaper-download">
      <div class="d-flex">
         <div class="decor-img" style="background-image: url()"></div>
         <div class="wd-content">
            <p class="pre-heading">Expert Insight & Guides</p>
            <h3 class="pre-heading">Whitepaper: whitepaper title</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
         </div>
         <a class="btn">Download</a>
      </div>
   </div>
</div>