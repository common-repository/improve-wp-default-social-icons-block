/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/add-attributes.js":
/*!*******************************!*\
  !*** ./src/add-attributes.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

var addFilter = wp.hooks.addFilter;
/**
 * Add spacing control attribute to block.
 *
 * @param {object} settings Current block settings.
 * @param {string} name Name of block.
 *
 * @returns {object} Modified block settings.
 */

var addSocialIconsAttributes = function addSocialIconsAttributes(settings, name) {
  // console.warn('Jay shree Swaminarayan')
  // Do nothing if it's another block than our defined ones.
  var allowedBlocks = ['core/social-links', 'core/social-link'];

  if (!allowedBlocks.includes(name)) {
    return settings;
  } // Use Lodash's assign to gracefully handle if attributes are undefined


  settings.attributes = lodash.assign(settings.attributes, {
    sibBackgroundColor: {
      type: 'string',
      default: ''
    },
    sibColor: {
      type: 'string',
      default: ''
    },
    sibHoverBackgroundColor: {
      type: 'string',
      default: ''
    },
    sibHoverColor: {
      type: 'string',
      default: ''
    }
  });
  return settings;
};

addFilter('blocks.registerBlockType', 'sib/attribute/addSocialIconsAttributes', addSocialIconsAttributes);

/***/ }),

/***/ "./src/add-controls.js":
/*!*****************************!*\
  !*** ./src/add-controls.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);

var createHigherOrderComponent = wp.compose.createHigherOrderComponent;

var Fragment = wp.element.Fragment; // const { InspectorControls } = wp.blockEditor;

var _wp$components = wp.components,
    PanelBody = _wp$components.PanelBody,
    Button = _wp$components.Button;
var __ = wp.i18n.__;
var wpData = wp.data;
var blockEditorDataSelect = wpData.select('core/block-editor');
var addControl = createHigherOrderComponent(function (BlockEdit) {
  return function (props) {
    if ('core/social-links' !== props.name) {
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(BlockEdit, props);
    }

    var clientId = props.clientId;
    var _props$attributes = props.attributes,
        sibBackgroundColor = _props$attributes.sibBackgroundColor,
        sibColor = _props$attributes.sibColor,
        sibHoverBackgroundColor = _props$attributes.sibHoverBackgroundColor,
        sibHoverColor = _props$attributes.sibHoverColor;
    var currentBlock = blockEditorDataSelect.getBlock(clientId);

    if (currentBlock && currentBlock.innerBlocks && currentBlock.innerBlocks.length) {
      currentBlock.innerBlocks.forEach(function (block) {
        wpData.dispatch('core/block-editor').updateBlockAttributes(block.clientId, {
          sibBackgroundColor: sibBackgroundColor,
          sibColor: sibColor,
          sibHoverBackgroundColor: sibHoverBackgroundColor,
          sibHoverColor: sibHoverColor
        });
      });
    }

    var setBackgroundColor = function setBackgroundColor(color) {
      props.setAttributes({
        sibBackgroundColor: color
      });
    };

    var setColor = function setColor(color) {
      props.setAttributes({
        sibColor: color
      });
    };

    var setHoverBackgroundColor = function setHoverBackgroundColor(color) {
      props.setAttributes({
        sibHoverBackgroundColor: color
      });
    };

    var setHoverColor = function setHoverColor(color) {
      props.setAttributes({
        sibHoverColor: color
      });
    };

    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(Fragment, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(BlockEdit, props), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["InspectorControls"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["PanelColorSettings"], {
      title: __('Icon Colors', sib_data.text_domain),
      colorSettings: [{
        value: sibBackgroundColor,
        onChange: setBackgroundColor,
        label: __('Background Color', sib_data.text_domain)
      }, {
        value: sibColor,
        onChange: setColor,
        label: __('Icon Color', sib_data.text_domain)
      }, {
        value: sibHoverBackgroundColor,
        onChange: setHoverBackgroundColor,
        label: __('Hover Background Color', sib_data.text_domain)
      }, {
        value: sibHoverColor,
        onChange: setHoverColor,
        label: __('Hover Icon Color', sib_data.text_domain)
      }]
    })));
  };
}, "withInspectorControl");
wp.hooks.addFilter('editor.BlockEdit', 'sib/with-inspector-controls', addControl);

/***/ }),

/***/ "./src/editor-style.js":
/*!*****************************!*\
  !*** ./src/editor-style.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

wp.domReady(function () {
  //
  document.addEventListener('readystatechange', function (event) {
    // When window loaded ( external resources are loaded too- `css`,`src`, etc...)
    if (event.target.readyState === "complete") {
      editorStyle();
      wp.data.subscribe(function () {
        editorStyle();
      });
    }
  });
});

function editorStyle() {
  var block_ids = wp.data.select('core/block-editor').getBlockOrder();
  block_ids.map(function (block_id) {
    var block = wp.data.select('core/block-editor').getBlock(block_id);

    if ('core/social-links' !== block.name) {
      return;
    }

    if (null === block) {
      return;
    }

    if (block.innerBlocks && block.innerBlocks.length) {
      block.innerBlocks.map(function (child_block) {
        var social_icon_button = document.querySelector("#block-".concat(child_block.clientId, " .components-button.wp-social-link"));

        if (null == social_icon_button) {
          return;
        } else {
          var existing_inline_style_str = social_icon_button.getAttribute('style');
        }

        if ('core/social-link' == child_block.name) {
          var _child_block$attribut = child_block.attributes,
              sibBackgroundColor = _child_block$attribut.sibBackgroundColor,
              sibColor = _child_block$attribut.sibColor,
              sibHoverBackgroundColor = _child_block$attribut.sibHoverBackgroundColor,
              sibHoverColor = _child_block$attribut.sibHoverColor;
          var inline_styles = [];

          if (sibBackgroundColor) {
            inline_styles.push("background-color: ".concat(sibBackgroundColor));

            if (social_icon_button.getAttribute('data-background-color') != sibBackgroundColor) {
              social_icon_button.setAttribute('data-background-color', sibBackgroundColor);
            }
          } else {
            if (social_icon_button.getAttribute('data-background-color') != '') {
              social_icon_button.setAttribute('data-background-color', '');
            }
          }

          if (sibColor) {
            inline_styles.push("color: ".concat(sibColor));

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

          if (!inline_styles.length) {
            if (null !== existing_inline_style_str) {
              social_icon_button.removeAttribute('style');
            }
          } else {
            var inline_style_str = inline_styles.join('; ') + ';"';

            if (existing_inline_style_str !== inline_style_str) {
              social_icon_button.setAttribute('style', inline_style_str);
            }
          }
        }
      });
    }
  });
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _add_attributes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add-attributes */ "./src/add-attributes.js");
/* harmony import */ var _add_attributes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_add_attributes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _add_controls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./add-controls */ "./src/add-controls.js");
/* harmony import */ var _editor_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editor-style */ "./src/editor-style.js");
/* harmony import */ var _editor_style__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_editor_style__WEBPACK_IMPORTED_MODULE_2__);




/***/ }),

/***/ "@wordpress/block-editor":
/*!**********************************************!*\
  !*** external {"this":["wp","blockEditor"]} ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["wp"]["blockEditor"]; }());

/***/ }),

/***/ "@wordpress/element":
/*!******************************************!*\
  !*** external {"this":["wp","element"]} ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["wp"]["element"]; }());

/***/ })

/******/ });
//# sourceMappingURL=index.js.map