<?php
define("IS_LOCAL", wp_get_environment_type() == 'local');

//Uncomment for error Logging in debug.txt
ini_set( 'error_log', get_template_directory() . '/debug.txt' );

require_once 'library/util/svg-includes.php';
require_once 'library/util/menu-walker.php';
require_once 'library/util/remote-media/remote-media.php';

require_once 'library/theme-setup.php';
require_once 'library/theme-enqueue.php';
//TODO require_once 'library/theme-gutenberg.php';
require_once 'library/theme-blocks.php';
require_once 'library/theme-rest.php';

//Custom Post Types
// require_once 'library/cpt/team.php';
require_once 'library/cpt/testimonials.php';


//dev setup automation
if(IS_LOCAL) { require_once 'library/develop-setup.php'; }



function insert_picture() {//TODO
}