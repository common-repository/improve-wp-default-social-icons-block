<?php
/**
 * Plugin Name:     Improve WP Default Social Icons Block
 * Plugin URI:      https://profiles.wordpress.org/pmbaldha/
 * Description:     Enhance WP WordPress Default Social Icons block by extending it. It provides rounded, square social icons styles. You can give icon color and background color to social icons.
 * Author:          Prashant Baldha
 * Author URI:      https://profiles.wordpress.org/pmbaldha/
 * Text Domain:     improve-wp-default-social-icons-block
 * Domain Path:     /languages
 * Version:         0.1.0
 *
 * @package         Improve_Wp_Default_Social_Icons_Block
 */

define( 'SIB_PLUGIN_URL', trailingslashit( plugin_dir_url( __FILE__ ) ) );
define( 'SIB_PLUGIN_DIR', trailingslashit( plugin_dir_path(__FILE__) ) );

define( 'SIB_TEXT_DOMAIN', 'improve-wp-default-social-icons-block');


require_once( SIB_PLUGIN_DIR.'classes/class.block.styles.php' );
SIB_Block_Styles::init();

class SIB_Plugin {

	public static function init() {
		add_action( 'enqueue_block_editor_assets', array( __CLASS__, 'enqueue_block_editor_assets' ) );
		add_action( 'enqueue_block_assets', array( __CLASS__, 'enqueue_block_assets' ) );

		add_action( 'plugin_loaded', [ __CLASS__, 'plugin_loaded' ] );
		add_action( 'init', [ __CLASS__, 'register_block_core_social_link' ], 9999 );
	}

	public static function plugin_loaded() {
		remove_action( 'init', 'register_block_core_social_link' );
		remove_action( 'init', 'gutenberg_register_block_core_social_link' );

		remove_action( 'init', 'register_legacy_social_link_blocks' );
		remove_action( 'init', 'gutenberg_register_legacy_social_link_blocks' );
	}

	public static function enqueue_block_editor_assets() {
		try {
			$asset_file = require(SIB_PLUGIN_DIR . 'build/index.asset.php');
		} catch (Exception $e) {
			throw new Exception('build/index.asset.php file not found');
		}
		wp_enqueue_script( 'sib_enqueue_block_editor_assets', SIB_PLUGIN_URL.'build/index.js',
		$asset_file['dependencies'],
		$asset_file['version'] );
		wp_localize_script( 'sib_enqueue_block_editor_assets', 'sib_data',
			array( 
				'text_domain' => SIB_TEXT_DOMAIN,
			)
		);
	}

	public static function enqueue_block_assets() {
		wp_enqueue_script( 'sib_enqueue_block_assets', SIB_PLUGIN_URL.'js/social-link-colors.js',
		array('wp-dom-ready', 'wp-dom'),
		filemtime(SIB_PLUGIN_DIR . 'js/social-link-colors.js') );
	}

	/**
	 * Registers the `core/social-link` blocks.
	 */
	public static function register_block_core_social_link() {
		// It is required when gutenberg plugin active
		unregister_block_type('core/social-link');

		if ( self::is_plugin_active( 'gutenberg/gutenberg.php' ) && file_exists( WP_PLUGIN_DIR.'/gutenberg/build/block-library/blocks/social-link/social-link/block.json' ) ) {
			$path = trailingslashit( WP_PLUGIN_DIR ) . 'gutenberg/build/block-library/blocks/social-link/social-link/block.json';
		} else { // WP core path
			$path = trailingslashit( ABSPATH . WPINC ) . 'blocks/social-link/block.json';
		}

		$metadata = json_decode( file_get_contents( $path ), true );

		// To do register_block_type_from_metadata
		// register_block_type_from_metadata function is not exists in current WP version.
		register_block_type(
			'core/social-link',
			array_merge(
				$metadata,
				array(
					'render_callback' => [ __CLASS__, 'render_block_core_social_link' ],
				)
			)
		);
	}

	/**
	 * Renders the `core/social-link` block on server.
	 *
	 * @param array $attributes The block attributes.
	 *
	 * @return string Rendered HTML of the referenced block.
	 */
	public static function render_block_core_social_link( $attributes ) {
		$service = ( isset( $attributes['service'] ) ) ? $attributes['service'] : 'Icon';
		$url     = ( isset( $attributes['url'] ) ) ? $attributes['url'] : false;
		$label   = ( isset( $attributes['label'] ) ) ?
			$attributes['label'] :
			/* translators: %s: Social Link service name */
			sprintf( __( 'Link to %s' ), block_core_social_link_get_name( $service ) );
		$class_name = isset( $attributes['className'] ) ? ' ' . $attributes['className'] : false;

		// Don't render a link if there is no URL set.
		if ( ! $url ) {
			return '';
		}

		$inline_styles = [];
		$data_attrs = [];
		if ( !empty( $attributes['sibBackgroundColor'] ) ) {
			$inline_styles[] = 'background-color: ' . $attributes['sibBackgroundColor'];
			$data_attrs[] = 'data-background-color="' . esc_attr( $attributes['sibBackgroundColor'] ) . '"';
		} else {
			$data_attrs[] = 'data-background-color=""';
		}

		if ( !empty( $attributes['sibColor'] ) ) {
			$inline_styles[] = 'color: '.$attributes['sibColor'];
			$data_attrs[] = 'data-color="' . esc_attr( $attributes['sibColor'] ) . '"';
 		} else {
			$data_attrs[] = 'data-color=""';
		 }

		if ( !empty( $attributes['sibHoverBackgroundColor'] ) ) {
			$data_attrs[] = 'data-hover-background-color="' . esc_attr( $attributes['sibHoverBackgroundColor'] ) . '"';
		} else {
			$data_attrs[] = 'data-hover-background-color=""';
		}

		if ( !empty( $attributes['sibHoverColor'] ) ) {
			$data_attrs[] = 'data-hover-color="' . esc_attr( $attributes['sibHoverColor'] ) . '"';
		} else {
			$data_attrs[] = 'data-hover-color=""';
		}

		if ( empty( $inline_styles ) ) {
			$inline_style_str = '';
		} else {
			$inline_style_str = 'style="'.implode('; ', $inline_styles).';"';
		}

		if ( empty( $data_attrs ) ) {
			$data_attrs_str = '';
		} else {
			$data_attrs_str = ' '.implode(' ', $data_attrs).' ';
		}

		$icon = block_core_social_link_get_icon( $service );
		return '<li class="wp-social-link wp-social-link-' . esc_attr( $service ) . esc_attr( $class_name ) . '" '.$inline_style_str . $data_attrs_str.'><a href="' . esc_url( $url ) . '" aria-label="' . esc_attr( $label ) . '"> ' . $icon . '</a></li>';
	}

	/**
	 * Determines whether a plugin is active.
	 *
	 * Only plugins installed in the plugins/ folder can be active.
	 *
	 * Plugins in the mu-plugins/ folder can't be "activated," so this function will
	 * return false for those plugins.
	 *
	 * For more information on this and similar theme functions, check out
	 * the {@link https://developer.wordpress.org/themes/basics/conditional-tags/
	 * Conditional Tags} article in the Theme Developer Handbook.
	 *
	 *
	 * @param string $plugin Path to the plugin file relative to the plugins directory.
	 * @return bool True, if in the active plugins list. False, not in the list.
	 */
	private static function is_plugin_active( $plugin ) {
		return in_array( $plugin, (array) get_option( 'active_plugins', array() ) ) || self::is_plugin_active_for_network( $plugin );
	}

	/**
	 * Determines whether the plugin is active for the entire network.
	 *
	 * Only plugins installed in the plugins/ folder can be active.
	 *
	 * Plugins in the mu-plugins/ folder can't be "activated," so this function will
	 * return false for those plugins.
	 *
	 * For more information on this and similar theme functions, check out
	 * the {@link https://developer.wordpress.org/themes/basics/conditional-tags/
	 * Conditional Tags} article in the Theme Developer Handbook.
	 *
	 * @param string $plugin Path to the plugin file relative to the plugins directory.
	 * @return bool True if active for the network, otherwise false.
	 */
	private static function is_plugin_active_for_network( $plugin ) {
		if ( ! is_multisite() ) {
			return false;
		}

		$plugins = get_site_option( 'active_sitewide_plugins' );
		if ( isset( $plugins[ $plugin ] ) ) {
			return true;
		}

		return false;
	}
}

SIB_Plugin::init();
