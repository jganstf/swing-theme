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
		if($item->description) {
			$output .= '<span class="link-title">'.$item->title.'</span>';
		} else {
			$output .= $item->title;
		}
		
		//TODO
		if (in_array('btn', $item->classes)) {
			// $output .= insert_svg('arrow-right', false);
		}
		
		
		// if ($args->show_carets && ($args->walker->has_children || in_array('menu-item-has-children', $item->classes))) {
      //    $output .= '<i class="caret fa fa-angle-down"></i>';
		// }
      
		if($item->description) {
			$output .= '<span class="link-descr">' . wp_trim_words($item->description, 10) . '</span>';
		}
 
		if ($item->url && $item->url != '#') {
			$output .= '</a>';
		} else {
			$output .= '</span>';
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