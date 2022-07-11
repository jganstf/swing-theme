<?php
/**
 * The template for displaying 404 pages (not found)
 */

get_header(); ?>

<main id="main_content" class="main-content-wrap">
   <div class="main">
      <div class="inner-wrap">
         <article class="page-default-content text-align-center">
            <h1>404</h1>
            <p>Oh no! It looks like this page got lost on the way to a sub assignment. Please try searching again or use the button below to go back to the home page.</p>
            <a href="/" class="btn white">Back to Home</a>
            <div class="img-wrap">
               <div class="decor-img" style="background-image: url(<?php echo imgdir() . '/404.jpg';?>)"></div>
            </div>
         </article>
      </div>
   </div>
</main>

<?php get_footer();