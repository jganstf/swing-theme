<?php 
$fields = get_fields(); 
foreach(['subs', 'schools'] as $key) {
   $fields[$key] = array_map(function($p) {
      $p->post_content = wp_strip_all_tags($p->post_content);
      $p->citation_title = get_field('citation_title', $p);
      return $p;
   }, $fields[$key]);
}
// add_action('wp_enqueue_scripts', function() {
   wp_localize_script(
      'theme-js', 
      'homeTestimonials', 
      $fields
   //    [ 
   //       'subs' => array_map(function($t) {
   //          return array_merge(
   //             (array)$t,
   //             [
   //                'citation_title' => get_field('citation_title', $t)
   //             ]
   //          );
   //       },
   //       get_posts([
   //          'post_type' => 'testimonials',
   //          'post_status' => 'publish',
   //          'posts_per_page' => -1,
   //          'tax_query' => [
   //             [
   //                'taxonomy' => 'testimonials_categories',
   //                'field'    => 'slug',
   //                'terms'    => 'subs',
   //             ]
   //          ]
   //       ])),
   //       'schools' => array_map(function($t) {
   //          return array_merge(
   //             (array)$t,
   //             [
   //                'citation_title' => get_field('citation_title', $t)
   //             ]
   //          );
   //       },
   //       get_posts([
   //          'post_type' => 'testimonials',
   //          'post_status' => 'publish',
   //          'posts_per_page' => -1,
   //          'tax_query' => [
   //             [
   //                'taxonomy' => 'testimonials_categories',
   //                'field'    => 'slug',
   //                'terms'    => 'schools',
   //             ]
   //          ]
   //       ])),
   //    ]
   );
   // }, 10);
?>
<div id="home-testimonials-wrap"></div>