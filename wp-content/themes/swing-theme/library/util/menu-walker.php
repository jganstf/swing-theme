<?php
/* https://awhitepixel.com/blog/wordpress-menu-walkers-tutorial/
/* https://developer.wordpress.org/reference/classes/walker_nav_menu/

- start_lvl — Starts the list before the elements are added.
- start_el — Starts the element output.
- end_el — Ends the element output, if needed.
- end_lvl — Ends the list of after the elements are added.
/*/
class Theme_Menu_Walker extends Walker_Nav_Menu {
   // function start_lvl(&$output, $depth=0, $args=null) {  }
   
   function start_el(&$output, $item, $depth=0, $args=null, $id=0) {
		$output .= "<li class='" .  implode(" ", $item->classes) . "'>";
 
		if ($item->url && $item->url != '#') {
			if (in_array('external-link', $item->classes)) {
				$output .= '<a class="header-link" href="' . $item->url . '" target="_blank">';
			} else {
				$output .= '<a class="header-link" href="' . $item->url . '">';
			}
		} else {
			$output .= '<span>';
		}
 
		$output .= $item->title;
		
		if ($args->show_carets && ($args->walker->has_children || in_array('menu-item-has-children', $item->classes))) {
         $output .= '<i class="caret fa fa-angle-down"></i>';
		}
      // else if ($args->show_external && in_array('external', $item->classes)) {
      // else if (in_array('external-link', $item->classes)) {
		// 	$output .= '<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M7.54813 3.41483H7.74813V3.21483V2.44446V2.24446H7.54813H1.38518C1.06288 2.24446 0.8 2.50733 0.8 2.82964V13.6148C0.8 13.9371 1.06301 14.2001 1.38532 14.2001L12.1704 14.2C12.4927 14.2 12.7555 13.9371 12.7555 13.6148V7.45186V7.25186H12.5555H11.7852H11.5852V7.45186V13.0296H1.97037V3.41483H7.54813Z" fill="black" stroke="black" stroke-width="0.4"/> <path d="M14.1996 0.999756V0.799756H13.9996H9.9183H9.7183V0.999756V1.80222V2.00222H9.9183H12.1372L6.63573 7.51901L6.49489 7.66024L6.63573 7.80146L7.1959 8.36319L7.33727 8.50496L7.47889 8.36343L12.9993 2.84657V5.07228V5.27228H13.1993H13.9996H14.1996V5.07228V0.999756Z" fill="black" stroke="black" stroke-width="0.4"/> </svg> ';
		// }
 
		if ($item->url && $item->url != '#') {
			$output .= '</a>';
		} else {
			$output .= '</span>';
		}

		if($item->description) {
			$output .= '<span class="link-description">' . wp_trim_words($item->description, 10) . '</span>';
		}
	}
   
   // function end_el(&$output, $item, $depth=0, $args=null, $id=0) { 
	// 	if($item->menu_item_parent != "0") {
	// 		$output .= "<div class='sub-menu-side'></div>";
	// 	}
	// }
	
   // function end_lvl(&$output, $depth=0, $args=null) { 
	// 	// error_log(json_encode($output, JSON_PRETTY_PRINT));//debug
	// }
   
   // function display_element($element, &$children_elements, $max_depth, $depth, $args, &$output) { }
}