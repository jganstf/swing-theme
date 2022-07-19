<?php 
if(!$option_fields) {
   $option_fields = get_fields('option'); 
}
?>

<nav id="mobile-menu">
  <!-- <div class="mobile-search">
    <form role="search" method="get" action="<?php //echo get_site_url() ?>">
      <label for="mobile_search" class="sr-only">Search</label>
      <input type="search" placeholder="Search" autocomplete="off" autocorrect="off" autocapitalize="off" id="mobile_search" spellcheck="false" name="s" />
    </form>
  </div> -->
  <div class="menu-inner">
    <section class="menu-section">
      <?php
        wp_nav_menu( array(
          'menu' => get_term(get_nav_menu_locations()['primary-navigation'], 'nav_menu')->name,
          'container' => false,
          'items_wrap' => '<ul id="%1$s" class="%2$s">%3$s</ul>',
          'menu_class' => 'menu-section-list',
          'depth' => 2,
          'theme_location' => 'Primary Navigation',
          'walker' => new Theme_Menu_Walker(),
          // 'show_carets' => true,
        ) );
      ?>
    </section>
  </div>
</nav>