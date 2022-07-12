<?php
  $option_fields = get_fields('options');
  $social_links = $option_fields['social_links'];
?>

<footer>
   <div class="main">
      <div class="inner-wrap">
         <div class="footer-main">
            <div class="d-flex justify-content-between">
               <div class="footer-logo">
                  <?php include( locate_template('template-parts/logo-link.php', false, false, $args=[]));?>
               </div>
               <div class="footer-social">
                  <?php include( locate_template('template-parts/social-links.php',false,false, $args=['social' => $social_links]) ); ?>
               </div>
            </div>
            <div class="footer-links">
               <div class="col">
                  <h4>Swing For Subs</h4>
                  <?php
                     wp_nav_menu( array(
                        // 'menu' => 'Footer Navigation',
                        'theme_location' => 'footer-one',
                        'container' => false, // remove nav container
                        'items_wrap' => '<ul id="%1$s" class="%2$s">%3$s</ul>',
                        'menu_class' => 'menu-section-list flex-grow-1 _list-reset', // adding custom nav class
                        'depth' => 1, // limit the depth of the nav
                     ) );
                     ?>
               </div>
               <div class="col">
                  <h4>Swing For Schools</h4>
                  <?php
                     wp_nav_menu( array(
                        // 'menu' => 'Footer Navigation',
                        'theme_location' => 'footer-two',
                        'container' => false, // remove nav container
                        'items_wrap' => '<ul id="%1$s" class="%2$s">%3$s</ul>',
                        'menu_class' => 'menu-section-list flex-grow-1 _list-reset', // adding custom nav class
                        'depth' => 1, // limit the depth of the nav
                     ) );
                     ?>
               </div>
               <div class="col">
                  <h4>Resources</h4>
                  <?php
                     wp_nav_menu( array(
                        // 'menu' => 'Footer Navigation',
                        'theme_location' => 'footer-three',
                        'container' => false, // remove nav container
                        'items_wrap' => '<ul id="%1$s" class="%2$s">%3$s</ul>',
                        'menu_class' => 'menu-section-list flex-grow-1 _list-reset', // adding custom nav class
                        'depth' => 1, // limit the depth of the nav
                     ) );
                     ?>
               </div>
               <div class="col">
                  <h4>Company</h4>
                  <?php
                     wp_nav_menu( array(
                        // 'menu' => 'Footer Navigation',
                        'theme_location' => 'footer-four',
                        'container' => false, // remove nav container
                        'items_wrap' => '<ul id="%1$s" class="%2$s">%3$s</ul>',
                        'menu_class' => 'menu-section-list flex-grow-1 _list-reset', // adding custom nav class
                        'depth' => 1, // limit the depth of the nav
                     ) );
                     ?>
               </div>
            </div>
         </div>
         <div class="footer-bottom d-sm-flex justify-content-between align-items-end">
            <div>
               <div class="d-flex">
                  <div class="footer-copyright">
                     <p translate="no">
                        © <?php echo date('Y') ?> SWING EDUCATION, SAN MATEO, CS 94402
                        <br/>
                        Swing, Swing Education, and the logo at the top of the page are trademarks of Swing Education, Inc
                     </p>
                  </div>
               </div>
               <div class="footer-terms">
                  <a href="/terms">Terms of Service</a>
               </div>
            </div>
            <!-- <div class="verification">
               <div id="swing-trustlock">
                  <iframe id="TL_iFrame_id_5762_498_1548468535" src="https://app.trustlock.co/iframe/5762/my-badge/498" frameborder="0" vspace="0" hspace="0" scrolling="no" style="width: -webkit-fill-available;"></iframe>
               </div>
               <?php //foreach($option_fields['verifications'] as $v): ?>
                  <!-- <img src="<?php //echo $v['image']['sizes']['thumbnail']; ?>" alt="<?php //echo $v['image']['alt']; ?>" weight="<?php //echo $v['image']['weight']; ?>" height="<?php //echo $v['image']['height']; ?>"/> -- >
               <?php //endforeach;?>
            </div> -->
         </div>
      </div>
   </div>
</footer>

<script>
if (!('customElements' in window)) {
  window.requestAnimationFrame = window.requestAnimationFrame.bind(window);
  window.setTimeout = window.setTimeout.bind(window);
  document.write(
    '<script src="https://cdn.jsdelivr.net/combine/npm/promise-polyfill@8.1.0/dist/polyfill.min.js,npm/classlist-polyfill@1.2.0/src/index.js,npm/mdn-polyfills@5.19.0/Array.prototype.fill.js,npm/@webcomponents/webcomponentsjs@2.4.1/webcomponents-bundle.min.js"><\/script>'
  )
}
</script>

<?php wp_footer(); ?>

<?php if ($footer_code = $option_fields['footer_code']) {
  // additional footer code for analytics and whatnot
  echo $footer_code;
} ?>

</body>

</html>