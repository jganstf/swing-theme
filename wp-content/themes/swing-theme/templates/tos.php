<?php /* Template Name:  Terms of Service */
$fields = get_fields();
get_header();
while(have_posts()): the_post(); ?>

<main id="main-content" class="main-content-wrap">
   <div class="page-default-content main">
      <div class="inner-wrap">

<div class="hero-tos">
   <div class="tos-update-contact d-sm-flex justify-content-between">
      <p>Last Updated: <time><?php echo date('F d, Y', strtotime($post->post_date)); ?></time></p>
      <?php if($email = get_field('email_address', 'options')): ?>
         <a class="tos-contact-link" href="mailto:<?php echo $email;?>" rel="noreferrer">
            Contact: <?php echo $email; ?>
         </a>
      <?php endif;?>
   </div>
   <div class="hero-tos-content blue-section">
      <h1>Terms of Service</h1>
      <p>
      Please read this Website Master Terms of Service and Privacy Policy (“Website Terms”) carefully before using this Website, <a href="/"> www.swingeducation.com</a>, or any of the Services (collectively the “Platform & Services”) made available through the Website, as offered by Swing Education, Inc. (“Swing Education”). These Terms are legally binding and govern your use of the Platform & Services, including related mobile and web service and services from third parties that are incorporated, used, or made available by the Platform & Services. This document is available on the Swing Website at <a href="#TODO">www.swingeducation.com/tc.</a>
      </p>
   </div>
</div>

<div class="d-lg-flex">
   <article class="page-content-wrap">
      <?php the_content(); ?>
      <?php include(locate_template('template-parts/call-to-action.php', false, false));?>
   </article>

   <aside class="tos-page-nav-wrap bg2">
      <nav class="tos-page-nav"></nav>
   </aside>
</div>


      </div>
   </div>
</main>

<?php
endwhile;
get_footer();