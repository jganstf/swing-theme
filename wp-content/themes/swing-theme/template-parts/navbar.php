<?php 
	$option_fields = get_fields('options');
?>
<div class="navbar-wrap">
  <div class="main">
    <div class="inner-wrap">
      <nav class="navbar">
        <?php include( locate_template('template-parts/logo-link.php', false, false, $args=[]));?>
        <button id="toggle_nav" class="toggle-nav">
          <em class="hamburger">
            <div></div>
            <div></div>
            <div></div>
          </em>
          <span class="sr-only">Toggle mobile menu</span>
        </button>
        <?php
          // header menu
          wp_nav_menu( array(
            'menu' => get_term(get_nav_menu_locations()['primary-navigation'], 'nav_menu')->name,
            // 'theme_location' => 'primary-navigation'
            'container' => true,
            'items_wrap' => '<ul id="%1$s" class="%2$s">%3$s</ul>',
            'menu_class' => 'header-links',
            'depth' => 2,
            'walker' => new Theme_Menu_Walker(),
            'show_carets' => true,
          ) );
        ?>
      </nav>
    </div>
  </div>
</div>
