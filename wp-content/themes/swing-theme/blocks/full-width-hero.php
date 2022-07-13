<?php 
   $fields = get_fields(); 
   $has_bg_blue = $fields['hero_settings']['has_blue_bg'];
   $no_overflow = $fields['hero_settings']['hide_image_overflow'];
?>
<div class="hero hero-full-width <?php if($has_bg_blue) { echo 'blue-section'; } ?> <?php if($no_overflow) { echo 'hide-overflow'; } ?>">
   <?php include( locate_template('template-parts/hero-content.php', false, false));?>
</div>