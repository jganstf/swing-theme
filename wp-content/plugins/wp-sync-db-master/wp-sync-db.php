<?php
/*
Plugin Name: WP Sync DB
Description: Sync database between different installs.
Author: Pixel Studio
Version: 1.7.1
Author URI: https://pixelstudio.id
Plugin URI: http://github.com/hrsetyono/wp-sync-db
Network: True
*/

$GLOBALS['wpsdb_meta']['wp-sync-db']['version'] = '1.7';
$GLOBALS['wpsdb_meta']['wp-sync-db']['folder'] = basename( plugin_dir_path( __FILE__ ) );

define( 'WPSDB_ROOT', plugin_dir_url(__FILE__) );

// Define the directory seperator if it isn't already
if( !defined( 'DS' ) ) {
  if (strtoupper(substr(PHP_OS, 0, 3)) == 'WIN') {
    define('DS', '\\');
  }
  else {
    define('DS', '/');
  }
}

function wp_sync_db_loaded() {
  // if neither WordPress admin nor running from wp-cli, exit quickly to prevent performance impact
  if ( !is_admin() && ! ( defined( 'WP_CLI' ) && WP_CLI ) ) return;

  require_once 'class/wpsdb-base.php';
  require_once 'class/wpsdb-addon.php';
  require_once 'class/wpsdb.php';

  global $wpsdb;
  $wpsdb = new WPSDB( __FILE__ );
}

add_action( 'plugins_loaded', 'wp_sync_db_loaded' );

function wp_sync_db_init() {
  // if neither WordPress admin nor running from wp-cli, exit quickly to prevent performance impact
  if ( !is_admin() && ! ( defined( 'WP_CLI' ) && WP_CLI ) ) return;

  load_plugin_textdomain( 'wp-sync-db', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
}

add_action( 'init', 'wp_sync_db_init' );


require_once 'module-cli/_load.php';
require_once 'module-media-files/_load.php';