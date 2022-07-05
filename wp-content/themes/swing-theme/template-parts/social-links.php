<?php 
if (!isset($option_fields)) { //defined
  $option_fields = get_fields('options');
} 
?>

<div class="social-links">
   <div class="footer-social-icons d-flex">
      <?php foreach($option_fields['social_links'] as $s):?>
         <a href="<?php echo $s['link'] ?>" target="_blank" rel="noopener" class="social-icon">
            <?php insert_svg($s['label']); ?>
            <span class="sr-only">Visit <?php echo $s['label'];?> profile</span>
         </a>
      <?php endforeach;?>
   </div>
</div>
