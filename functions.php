<?php

add_action( 'wp_enqueue_scripts', 'enqueue_theme_scripts' );
function enqueue_theme_scripts() {
	wp_enqueue_script( 'modernizr', get_template_directory_uri() . '/assets/scripts/modernizr.1cb556bb.1cb556bb.1cb556bb.min.js', array(), false, false );
	
	if(defined('WP_DEBUG')) {
		wp_enqueue_style( 'main', get_template_directory_uri() . '/assets/styles/main.css', array(), false, 'all' );
		wp_enqueue_script( 'main', get_template_directory_uri() . '/assets/scripts/main.js', array(), false, true );
		// vendor
	} else {
		wp_enqueue_style( 'main', get_template_directory_uri() . '/assets/styles/main.d8fc02d6.min.css', array(), false, 'all' );
		wp_enqueue_script( 'main', get_template_directory_uri() . '/assets/scripts/main.cb69b98d.cb69b98d.cb69b98d.min.js', array(), false, true );
		// vendor
	}

}