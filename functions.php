<?php

add_action( 'wp_enqueue_scripts', 'enqueue_theme_scripts' );

function get_revved_path($ver, $path) {
	if( isset( $ver[ $path ] ) ) {
		return get_template_directory_uri() . '/' . $ver[ $path ];
	} else {
		return get_template_directory_uri() . '/' . $path;
	}
}
function enqueue_theme_scripts() {
	wp_enqueue_script( 'modernizr', get_template_directory_uri() . '/assets/scripts/modernizr.min.js', array(), false, false );
	$ver = json_decode( file_read_contents( dirname( __FILE__ ) . '/assets/assets.json', true ) );

	if(defined('WP_DEBUG')) {
		wp_enqueue_style( 'main', get_template_directory_uri() . '/assets/styles/main.css', array(), false, 'all' );
		wp_enqueue_script( 'vendor', get_template_directory_uri() . '/assets/scripts/vendor.js', array(), false, true );
		wp_enqueue_script( 'main', get_template_directory_uri() . '/assets/scripts/main.js', array(), false, true );
		wp_enqueue_script( 'livereload', '//localhost:35729/livereload.js', array(), false, true );
		// vendor
	} else {
		$main_css_path = get_revved_path( $ver, 'assets/styles/main.min.css' );
		wp_enqueue_style( 'main', $main_css_path, array(), null, 'all' );

		$vendor_js_path = get_revved_path( $ver, 'assets/scripts/vendor.min.js' );
		wp_enqueue_script( 'vendor', $vendor_js_path, array(), null, true );

		$main_js_path = get_revved_path( $ver, 'assets/scripts/main.min.js' );
		wp_enqueue_script( 'main', $main_js_path, array(), null, true );
		// vendor
	}

}