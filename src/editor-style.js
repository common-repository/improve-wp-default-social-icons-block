wp.domReady(() => { //
	document.addEventListener('readystatechange', event => {
		// When window loaded ( external resources are loaded too- `css`,`src`, etc...)
		if (event.target.readyState === "complete") {
			editorStyle();
			wp.data.subscribe( () => {
				editorStyle();
			})
		}
	});
});


function editorStyle() {
	let block_ids = wp.data.select('core/block-editor').getBlockOrder();
	block_ids.map(block_id => {
		let block = wp.data.select('core/block-editor').getBlock(block_id);

		if ('core/social-links' !== block.name ) {
			return;
		}

		if (null === block) {
			return;
		}

		if (block.innerBlocks && block.innerBlocks.length) {
			block.innerBlocks.map( child_block => {
				let social_icon_button = document.querySelector(`#block-${child_block.clientId} .components-button.wp-social-link`);

				if (null == social_icon_button) {
					return;
				} else {
					var existing_inline_style_str = social_icon_button.getAttribute('style')
				}

				if ( 'core/social-link' == child_block.name ) {
					let { sibBackgroundColor, sibColor, sibHoverBackgroundColor, sibHoverColor } = child_block.attributes
					let inline_styles = [];
					if (sibBackgroundColor) {
						inline_styles.push(`background-color: ${sibBackgroundColor}`);
						if (social_icon_button.getAttribute('data-background-color') != sibBackgroundColor) {
							social_icon_button.setAttribute('data-background-color', sibBackgroundColor);
						}
					} else {
						if (social_icon_button.getAttribute('data-background-color') != '') {
							social_icon_button.setAttribute('data-background-color', '');
						}
					}

					if (sibColor) {
						inline_styles.push(`color: ${sibColor}`);
						if (social_icon_button.getAttribute('data-color') != sibColor) {
							social_icon_button.setAttribute('data-color', sibColor);
						}
					} else {
						if (social_icon_button.getAttribute('data-color') != '') {
							social_icon_button.setAttribute('data-color', '');
						}
					}

					if (sibHoverBackgroundColor) {
						if (social_icon_button.getAttribute('data-hover-background-color') != sibHoverBackgroundColor) {
							social_icon_button.setAttribute('data-hover-background-color', sibHoverBackgroundColor);
						}
					} else {
						if (social_icon_button.getAttribute('data-hover-background-color') != '') {
							social_icon_button.setAttribute('data-hover-background-color', '');
						}
					}

					if (sibHoverColor) {
						if (social_icon_button.getAttribute('data-hover-color') != sibHoverColor) {
							social_icon_button.setAttribute('data-hover-color', sibHoverColor);
						}
					} else {
						if (social_icon_button.getAttribute('data-hover-color') != '') {
							social_icon_button.setAttribute('data-hover-color', '');
						}
					}

					if ( ! inline_styles.length ) {
						if (null !== existing_inline_style_str ) {
							social_icon_button.removeAttribute( 'style')
						}
					} else {
						let inline_style_str = inline_styles.join('; ')+';"';
						if ( existing_inline_style_str !== inline_style_str ) {
							social_icon_button.setAttribute( 'style', inline_style_str );
						}
					}

				}
			} )
		}
	});
}
