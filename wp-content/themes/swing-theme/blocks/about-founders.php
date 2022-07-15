<?php $fields = get_fields(); ?>

<div class="about-founders">
   <h2>Founders</h2>
   <div class="founders grid-three">
      <?php foreach($fields['members'] as $member): ?>
         <div class="founder team-card grid-item">
            <div class="tm-img" style="background-image: url(<?php echo $member['img']['sizes']['large'];?>)">
               <div class="tm-social-wrap">
                  <a href="<?php echo $member['linkedin'] ?>" target="_blank" rel="noopener" class="social-icon">
                     <?php insert_svg('linkedin'); ?>
                     <span class="sr-only">Visit <?php echo 'linkedin';?> profile</span>
                  </a>
               </div>
            </div>
            <div class="card">
               <p class="tm-pre"><?php echo $member['title']?:'Co-Founder & CEO';?></p>
               <h3 class="hdr-md"><?php echo $member['name'];?></h3>
               <p><?php echo $member['content'];?></p>
            </div>
         </div>
      <?php endforeach;?>
   </div>
</div>
</div>