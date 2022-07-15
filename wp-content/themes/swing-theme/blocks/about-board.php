<?php $fields = get_fields(); ?>

<div class="about-board">
   <h2>The Board</h2>
   <div class="board-members grid-four">
      <?php foreach($fields['members'] as $member):?>
         <div class="board-member team-card grid-item">
            <div class="tm-img" style="background-image: url(<?php echo $member['img']['sizes']['large'];?>)"></div>
            <div class="card">
               <p class="tm-pre"><?php echo $member['title']?:'Board Member';?></p>
               <h3 class="hdr-md"><?php echo $member['name'];?></h3>
               <div class="tm-social-wrap">
                  <a href="<?php echo $member['linkedin'] ?>" target="_blank" rel="noopener" class="social-icon">
                     <?php insert_svg('linkedin'); ?>
                     <span class="sr-only">Visit <?php echo 'linkedin';?> profile</span>
                  </a>
               </div>
            </div>
         </div>
      <?php endforeach;?>
   </div>
</div>