sap.ui.define(["sap/ui/webc/common/thirdparty/base/asset-registries/Themes","sap/ui/webc/common/thirdparty/theming/generated/themes/sap_fiori_3/parameters-bundle.css","./sap_fiori_3/parameters-bundle.css"],function(t,o,e){"use strict";function a(t){return t&&typeof t==="object"&&"default"in t?t["default"]:t}var r=a(o);t.registerThemePropertiesLoader("@ui5/webcomponents-theming","sap_fiori_3",()=>r);t.registerThemePropertiesLoader("@ui5/webcomponents","sap_fiori_3",()=>e);var s={packageName:"@ui5/webcomponents",fileName:"themes/Toast.css",content:':host{font-family:"72override",var(--sapFontFamily);color:var(--sapList_TextColor);font-size:var(--sapFontSize)}:host([open]) .ui5-toast-root{display:block}.ui5-toast-root{position:fixed;display:none;box-sizing:border-box;max-width:15rem;overflow:hidden;padding:1rem;background:var(--_ui5_toast_background);box-shadow:var(--_ui5_toast_shadow);border-radius:var(--sapElement_BorderCornerRadius);transition-property:opacity;opacity:1;font-family:inherit;color:inherit;font-weight:inherit;font-size:inherit;word-wrap:break-word;text-align:center;text-overflow:ellipsis;white-space:pre-line}@media screen and (-ms-high-contrast:active){.ui5-toast-root{border:1px solid var(--sapPageFooter_BorderColor)}}:host(:not([placement])) .ui5-toast-root{bottom:var(--_ui5_toast_vertical_offset);left:50%;transform:translateX(-50%)}:host([placement=TopStart]) .ui5-toast-root{top:var(--_ui5_toast_vertical_offset);left:var(--_ui5_toast_horizontal_offset)}:host([placement=MiddleStart]) .ui5-toast-root{left:var(--_ui5_toast_horizontal_offset);top:50%;transform:translateY(-50%)}:host([placement=BottomStart]) .ui5-toast-root{left:var(--_ui5_toast_horizontal_offset);bottom:var(--_ui5_toast_vertical_offset)}:host([placement=TopCenter]) .ui5-toast-root{top:var(--_ui5_toast_vertical_offset);left:50%;transform:translateX(-50%)}:host([placement=MiddleCenter]) .ui5-toast-root{left:50%;top:50%;transform:translate(-50%,-50%)}:host([placement=BottomCenter]) .ui5-toast-root{bottom:var(--_ui5_toast_vertical_offset);left:50%;transform:translateX(-50%)}:host([placement=TopEnd]) .ui5-toast-root{right:var(--_ui5_toast_horizontal_offset);top:var(--_ui5_toast_vertical_offset)}:host([placement=MiddleEnd]) .ui5-toast-root{right:var(--_ui5_toast_horizontal_offset);top:50%;transform:translateY(-50%)}:host([placement=BottomEnd]) .ui5-toast-root{right:var(--_ui5_toast_horizontal_offset);bottom:var(--_ui5_toast_vertical_offset)}'};return s});