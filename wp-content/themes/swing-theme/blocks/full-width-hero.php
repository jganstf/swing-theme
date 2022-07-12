<?php 
   global $post;
   $fields = get_fields(); 
   $is_bg_blue =  $fields['is_bg_blue'];
?>
<div class="hero hero-full-width <?php if($is_bg_blue) { echo 'blue-section'; } ?>">
   <?php include( locate_template('template-parts/hero-content.php', false, false, $args=[]));?>
</div>