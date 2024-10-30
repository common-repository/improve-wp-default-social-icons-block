<?php
/**
 * Registers Social Icons Blocks Styles
 */
class SIB_Block_Styles {

	/**
	 * Initialize class for adding styles
	 *
	 * @return void
	 */
	public static function init() {

		//rounded-shape style
		register_block_style(
			'core/social-links',
			[
				'name'         => 'rounded-shape',
				'label'        => esc_html__( 'Rounded Shape', SIB_TEXT_DOMAIN ),
				'inline_style' => '.wp-block-social-links.is-style-rounded-shape .wp-social-link { -webkit-border-radius: 10%; border-radius: 10%; }',
			]
		);

		//square-shape style
		register_block_style(
			'core/social-links',
			[
				'name'         => 'square-shape',
				'label'        => esc_html__( 'Square Shape', SIB_TEXT_DOMAIN ),
				'inline_style' => '.wp-block-social-links.is-style-square-shape .wp-social-link { -webkit-border-radius: 0; border-radius: 0;}',
			]
		);

		// diamond square shape style
		register_block_style(
			'core/social-links',
			[
				'name'         => 'diamond-square-shape',
				'label'        => esc_html__( 'Diamond Square Shape', SIB_TEXT_DOMAIN ),
				'inline_style' => '.wp-block-social-links.is-style-diamond-square-shape .wp-social-link { -webkit-border-radius: 0; border-radius: 0; transform: rotate(-45deg); }
				.wp-block-social-links.is-style-diamond-square-shape .wp-social-link svg { transform: rotate(45deg); }
				.wp-block-social-links.is-style-diamond-square-shape .wp-social-link:hover { transform: rotate(-45deg) scale(1.1); }',
			]
		);

		// diamond rounded corner shape style
		register_block_style(
			'core/social-links',
			[
				'name'         => 'diamond-rounded-square-shape',
				'label'        => esc_html__( 'Diamond Rounded Square Shape', SIB_TEXT_DOMAIN ),
				'inline_style' => '.wp-block-social-links.is-style-diamond-rounded-square-shape .wp-social-link { -webkit-border-radius: 10%; border-radius: 10%; transform: rotate(-45deg); }
				.wp-block-social-links.is-style-diamond-rounded-square-shape .wp-social-link svg { transform: rotate(45deg); }
				.wp-block-social-links.is-style-diamond-rounded-square-shape .wp-social-link:hover { transform: rotate(-45deg) scale(1.1); }',
			]
		);

		// parallelogram-shape style
		register_block_style(
			'core/social-links',
			[
				'name'         => 'parallelogram-shape',
				'label'        => esc_html__( 'Parallelogram Shape', SIB_TEXT_DOMAIN ),
				'inline_style' => '.wp-block-social-links.is-style-parallelogram-shape .wp-social-link { -webkit-border-radius: 0; border-radius: 0; transform: skew(20deg); }
				.wp-block-social-links.is-style-parallelogram-shape .wp-social-link:hover { transform: skew(20deg) scale(1.1); }',
			]
		);

		// parallelogram-rounded-shape style
		register_block_style(
			'core/social-links',
			[
				'name'         => 'parallelogram-rounded-shape',
				'label'        => esc_html__( 'Parallelogram Rounded Shape', SIB_TEXT_DOMAIN ),
				'inline_style' => '.wp-block-social-links.is-style-parallelogram-rounded-shape .wp-social-link { -webkit-border-radius: 10%; border-radius: 10%; transform: skew(20deg); }',
			]
		);

	}
}
