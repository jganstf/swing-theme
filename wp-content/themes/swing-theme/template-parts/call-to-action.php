<?php 

$fields = get_fields(); 
$heading = $btns = $fields['cta_heading'];
$btns = $fields['cta_links']
// if(!$option_fields){ //debug
//    $option_fields = get_fields('options');
// }
// if(!$heading = $fields['cta_heading']){ $heading = $option_fields['cta_heading']; }
// if(!$btns = $fields['cta_links']){ $link = $option_fields['cta_links']; }
?>

<?php if($heading && $tbns): ?>
<div class="call-to-action blue-section">
   <h2><?php echo $heading; ?></h2>
   <?php if($btns): foreach($btns as $btn): $btn = $btn['btn_link']; ?>
      <a href="<?php echo $btn['url'];?>" target="<?php echo $btn['target']?:'_self';?>" class="btn">
         <?php echo $btn['title']; ?>
      </a>
   <?php endforeach; endif; ?>
</div>
<?php endif;?>