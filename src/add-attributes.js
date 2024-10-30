const { addFilter } = wp.hooks;

/**
 * Add spacing control attribute to block.
 *
 * @param {object} settings Current block settings.
 * @param {string} name Name of block.
 *
 * @returns {object} Modified block settings.
 */
const addSocialIconsAttributes = ( settings, name ) => {
	// console.warn('Jay shree Swaminarayan')
	// Do nothing if it's another block than our defined ones.
	const allowedBlocks = [
		'core/social-links',
		'core/social-link',
	]
    if ( !allowedBlocks.includes( name ) ) {
        return settings;
    }

    // Use Lodash's assign to gracefully handle if attributes are undefined
	settings.attributes = lodash.assign( settings.attributes, {
        sibBackgroundColor: {
			type: 'string',
			default: '',
		},
		sibColor: {
			type: 'string',
			default: '',
		},
		sibHoverBackgroundColor: {
			type: 'string',
			default: '',
		},
		sibHoverColor: {
			type: 'string',
			default: '',
        },
	} );

    return settings;
};

addFilter( 'blocks.registerBlockType', 'sib/attribute/addSocialIconsAttributes', addSocialIconsAttributes );
