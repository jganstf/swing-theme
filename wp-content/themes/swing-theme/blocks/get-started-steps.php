<?php 
$fields = get_fields(); 
echo '<script>console.log('.json_encode($fields, JSON_PRETTY_PRINT).');</script>';//debug
?>

<div class="get-started-steps is-style-light-blue-bg"></div>

<!-- <div class="get-started-steps is-style-light-blue-bg">
   <h2><?php //echo $fields['heading']; ?></h2>
   <p><?php  //echo $fields['content']; ?></p>
   <div class="gs-steps-nav">
      <?php foreach($fields['steps'] as $i => $step):?>
      <?php endforeach;?>
   </div>
   <div class="gs-steps">
      <?php foreach($fields['steps'] as $step):?>
      <?php endforeach;?>
   </div>
</div>

<div id="frame" class="frame" style="overflow: hidden;">
   <ul>
      <li>0</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
   </ul>
  
</div>
<div class="scrollbar">
	<div class="handle"></div>
</div> -->