<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
   <meta charset="UTF-8">
   <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
   <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=5.0">
   <?php wp_head(); ?>
   <?php // fix slideout logged in style ?>
   <?php if (is_user_logged_in()) { ?>
   <style>
      @media screen and (max-width: 600px) {
         #wpadminbar {
            position: fixed !important;
         }
      }
   </style>
   <?php } ?>
</head>


<body <?php body_class(); ?>>
  <a data-role="skip-link" href="#main-content"> <span class="sr-only">skip to main content</span> </a>
  <?php //include(locate_template('template-parts/mobile-menu.php',false,false));?>
  <?php include(locate_template('template-parts/navbar.php',false,false));?>
