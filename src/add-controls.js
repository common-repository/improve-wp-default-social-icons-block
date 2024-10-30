const { createHigherOrderComponent } = wp.compose;
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
const { Fragment } = wp.element;
// const { InspectorControls } = wp.blockEditor;
const { PanelBody, Button } = wp.components;
const { __ } = wp.i18n;

const wpData = wp.data
const blockEditorDataSelect = wpData.select('core/block-editor')


const addControl =  createHigherOrderComponent( ( BlockEdit ) => {
    return ( props ) => {
		if ( 'core/social-links' !== props.name) {
			return  <BlockEdit { ...props } />
        }

		const { clientId } = props
		const {sibBackgroundColor, sibColor, sibHoverBackgroundColor, sibHoverColor } = props.attributes;

		let currentBlock = blockEditorDataSelect.getBlock(clientId);
		if (currentBlock && currentBlock.innerBlocks && currentBlock.innerBlocks.length ) {
			currentBlock.innerBlocks.forEach(function (block) {
				wpData.dispatch('core/block-editor').updateBlockAttributes(block.clientId, {
                        sibBackgroundColor,
                        sibColor,
                        sibHoverBackgroundColor,
						sibHoverColor,
					})
			})
		}

        const setBackgroundColor = (color) => {
            props.setAttributes({
                sibBackgroundColor: color,
            });
        }

        const setColor = (color) => {
            props.setAttributes({
                sibColor: color,
            });
		}

		const setHoverBackgroundColor = (color) => {
            props.setAttributes({
                sibHoverBackgroundColor: color,
            });
        }

        const setHoverColor = (color) => {
            props.setAttributes({
                sibHoverColor: color,
            });
        }

        return (
            <Fragment>
                <BlockEdit { ...props } />
                <InspectorControls>
                    {/*
                    <PanelBody title={ __('Icons', sib_data.text_domain) }>
                    </PanelBody>
                    */}
                    <PanelColorSettings
                    title={ __( 'Icon Colors', sib_data.text_domain ) }
                    colorSettings={ [
                        {
                            value: sibBackgroundColor,
                            onChange: setBackgroundColor,
                            label: __( 'Background Color', sib_data.text_domain ),
                        },
                        {
                            value: sibColor,
                            onChange: setColor,
                            label: __( 'Icon Color', sib_data.text_domain ),
						},
						{
                            value: sibHoverBackgroundColor,
                            onChange: setHoverBackgroundColor,
                            label: __( 'Hover Background Color', sib_data.text_domain ),
                        },
                        {
                            value: sibHoverColor,
                            onChange: setHoverColor,
                            label: __( 'Hover Icon Color', sib_data.text_domain ),
                        },
                    ] }
                ></PanelColorSettings>
                </InspectorControls>

            </Fragment>
        );
    };
}, "withInspectorControl" );

wp.hooks.addFilter( 'editor.BlockEdit', 'sib/with-inspector-controls', addControl );
