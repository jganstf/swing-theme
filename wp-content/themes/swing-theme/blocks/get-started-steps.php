<?php $fields = get_fields(); 
echo '<script>console.log('.json_encode($fields, JSON_PRETTY_PRINT).');</script>';//debug?>
<div class="get-started-steps is-style-light-blue-bg">
   <h2><?php echo $fields['heading']; ?></h2>
   <p><?php echo $fields['content']; ?></p>
   <div class="gs-steps-nav">
      <?php foreach($fields['steps'] as $i => $step):?>
      <?php endforeach;?>
   </div>
   <div class="gs-steps">
      <?php foreach($fields['steps'] as $step):?>
      <?php endforeach;?>
   </div>
</div>