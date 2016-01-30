<?php
/**
 * sip functions and definitions.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package sip
 */

if ( ! function_exists( 'sip_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function sip_setup() {
	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on sip, use a find and replace
	 * to change 'sip' to the name of your theme in all the template files.
	 */
	load_theme_textdomain( 'sip', get_template_directory() . 'lib/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => esc_html__( 'Primary', 'sip' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );

	/*
	 * Enable support for Post Formats.
	 * See https://developer.wordpress.org/themes/functionality/post-formats/
	 */
	add_theme_support( 'post-formats', array(
		'aside',
		'image',
		'video',
		'quote',
		'link',
	) );

	// Set up the WordPress core custom background feature.
	add_theme_support( 'custom-background', apply_filters( 'sip_custom_background_args', array(
		'default-color' => 'ffffff',
		'default-image' => '',
	) ) );
}
endif;
add_action( 'after_setup_theme', 'sip_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function sip_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'sip_content_width', 640 );
}
add_action( 'after_setup_theme', 'sip_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function sip_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar', 'sip' ),
		'id'            => 'sidebar-1',
		'description'   => '',
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );
}
add_action( 'widgets_init', 'sip_widgets_init' );

/**
 * Enqueue scripts.
 */
function sip_scripts() {

	wp_enqueue_script( 'sip-navigation', get_template_directory_uri() . 'assets/js/components/navigation.js', array(), '20120206', true );

	wp_enqueue_script( 'sip-skip-link-focus-fix', get_template_directory_uri() . 'assets/js/components/skip-link-focus-fix.js', array(), '20130115', true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'sip_scripts' );

/**
 * Enqueue styles.
 */
function sip_styles() {

	if ( SCRIPT_DEBUG || WP_DEBUG ) :
		wp_register_style( 'sip-style',	get_template_directory_uri() . '/assets/css/app.css', '', '1.2', 'screen' );
		wp_enqueue_style( 'sip-style' );

		wp_register_style( 'sip-animate',	get_template_directory_uri() . '/assets/css/animate.css', '', '1.2', 'screen' );
		wp_enqueue_style( 'sip-animate' );
	
	else :
		wp_register_style( 'sip-style',	get_template_directory_uri() . '/assets/css/app-min.css', '', '1.2', 'screen' );
		wp_enqueue_style( 'sip-style' );

		wp_register_style( 'sip-animate',	get_template_directory_uri() . '/assets/css/animate-min.css', '', '1.2', 'screen' );
		wp_enqueue_style( 'sip-animate' );
	
	endif;	
}
add_action( 'wp_enqueue_scripts', 'sip_styles' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/lib/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/lib/inc/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/lib/inc/extras.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/lib/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
require get_template_directory() . '/lib/inc/jetpack.php';
