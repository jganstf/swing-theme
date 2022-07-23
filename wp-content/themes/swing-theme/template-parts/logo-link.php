<?php $logo = get_fields('options')['logo']; ?>
<a href="<?php echo get_site_url() ?>" class="logo-link">
   <img src="<?php echo $logo['sizes']['medium'];?>" alt="<?php echo get_bloginfo() ?> Logo" width="<?php echo $logo['sizes']['medium-width'];?>" height="<?php echo $logo['sizes']['medium-height'];?>">
</a>