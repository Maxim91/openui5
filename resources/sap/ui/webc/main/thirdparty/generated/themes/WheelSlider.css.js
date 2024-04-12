sap.ui.define(["sap/ui/webc/common/thirdparty/base/asset-registries/Themes","sap/ui/webc/common/thirdparty/theming/generated/themes/sap_fiori_3/parameters-bundle.css","./sap_fiori_3/parameters-bundle.css"],function(e,i,r){"use strict";function l(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var o=l(i);e.registerThemePropertiesLoader("@ui5/webcomponents-theming","sap_fiori_3",()=>o);e.registerThemePropertiesLoader("@ui5/webcomponents","sap_fiori_3",()=>r);var t={packageName:"@ui5/webcomponents",fileName:"themes/WheelSlider.css",content:'.ui5-wheelslider-root{overflow:hidden;height:100%;vertical-align:middle;text-align:center;box-sizing:border-box;font-family:"72override",var(--sapFontFamily);justify-content:space-between;flex-direction:column;display:inline-flex;width:var(--_ui5_wheelslider_item_width)}.ui5-wheelslider-root .ui5-wheelslider-label{box-sizing:border-box;height:2rem;line-height:2rem;width:var(--_ui5_wheelslider_item_width);font-size:var(--sapFontSmallSize);color:var(--_ui5_wheelslider_label_text_color);text-align:center;vertical-align:middle;visibility:hidden}.ui5-wheelslider-root .ui5-wheelslider-arrow{visibility:hidden;box-sizing:border-box;height:1.5rem;user-select:none;outline:none}:host([expanded]) .ui5-wheelslider-arrow{visibility:var(--_ui5_wheelslider_arrows_visibility);box-sizing:border-box;border-color:transparent;cursor:pointer}:host([expanded]) .ui5-wheelslider-arrow:hover{visibility:var(--_ui5_wheelslider_arrows_visibility);box-sizing:border-box;border-color:inherit;cursor:pointer}.ui5-wheelslider-root .ui5-wheelslider-inner{position:relative;overflow:hidden;height:100%;box-sizing:border-box;user-select:none;list-style:none;margin-top:0}:host([expanded]) .ui5-wheelslider-inner{margin-top:0}.ui5-wheelslider-root .ui5-wheelslider-inner .ui5-wheelslider-item{height:var(--_ui5_wheelslider_item_height);line-height:var(--_ui5_wheelslider_item_height);width:var(--_ui5_wheelslider_item_width);box-sizing:border-box;background:var(--_ui5_wheelslider_selected_item_background_color);border:.625px solid var(--_ui5_wheelslider_item_border_color);font-size:var(--_ui5_wheelslider_item_text_size);color:var(--_ui5_wheelslider_collapsed_item_text_color);text-align:center;border-radius:var(--_ui_wheelslider_item_border_radius);cursor:pointer}.ui5-wheelslider-root .ui5-wheelslider-inner .ui5-wheelslider-item:hover{background:var(--_ui_wheelslider_item_hover_color);border-color:var(--_ui5_wheelslider_item_hovered_border_color)}.ui5-wheelslider-root .ui5-wheelslider-inner .ui5-wheelslider-item:focus{outline:1px dotted #000;outline-offset:-3px}.ui5-wheelslider-root .ui5-wheelslider-inner .ui5-wheelslider-selection-frame{width:var(--_ui5_wheelslider_item_width);height:var(--_ui5_wheelslider_item_height);position:absolute;box-sizing:border-box;visibility:hidden;z-index:1}.ui5-wheelslider-root .ui5-wheelslider-inner .ui5-wheelslider-wrapper>ul{transition:all .4s;margin:0;padding:0;position:absolute;top:var(--_ui5_wheelslider_selection_frame_margin_top);height:3000px;cursor:pointer;list-style-type:none}.ui5-wheelslider-root.ui5-phone .ui5-wheelslider-inner .ui5-wheelslider-wrapper>ul{top:var(--_ui5_wheelslider_mobile_selection_frame_margin_top)}:host([expanded]) .ui5-wheelslider-inner .ui5-wheelslider-wrapper>ul{list-style-type:none;top:0;padding-top:calc(var(--_ui5_wheelslider_item_height)*2)}:host([expanded]) .ui5-wheelslider-root.ui5-phone .ui5-wheelslider-inner .ui5-wheelslider-wrapper>ul{list-style-type:none;top:0;padding-top:calc(var(--_ui5_wheelslider_item_height)*4)}.ui5-wheelslider-root .ui5-wheelslider-inner .ui5-wheelslider-wrapper{height:var(--_ui5_wheelslider_height);position:relative;overflow:hidden;outline:none}.ui5-wheelslider-root.ui5-phone .ui5-wheelslider-inner .ui5-wheelslider-wrapper{height:var(--_ui5_wheelslider_mobile_height)}:host([expanded]){height:100%;cursor:default;margin:0;justify-content:space-between;flex-direction:column;display:inline-flex}:host([expanded]) .ui5-wheelslider-label{display:block;visibility:visible}.ui5-wheelslider-root .ui5-wheelslider-inner{max-height:100%;height:var(--_ui5_wheelslider_height)}.ui5-wheelslider-root.ui5-phone .ui5-wheelslider-inner{height:var(--_ui5_wheelslider_mobile_height)}:host([expanded]) .ui5-wheelslider-inner .ui5-wheelslider-item{background:var(--_ui5_wheelslider_item_background_color);color:var(--_ui5_wheelslider_item_text_color);border:1px solid var(--_ui5_wheelslider_item_expanded_border_color);border-radius:var(--_ui_wheelslider_item_border_radius);offset-position:auto;cursor:auto}:host([expanded]) .ui5-wheelslider-inner .ui5-wheelslider-item:hover{background:var(--_ui_wheelslider_item_expanded_hover_color);border-color:var(--_ui5_wheelslider_item_hovered_border_color)}:host([expanded]) .ui5-wheelslider-inner .ui5-wheelslider-item:active{background:var(--_ui5_wheelslider_active_item_background_color);color:var(--_ui5_wheelslider_active_item_text_color)}:host([expanded]) .ui5-wheelslider-inner .ui5-wheelslider-item:focus{outline:1px dotted #000;outline-offset:-3px}:host([expanded]) .ui5-wheelslider-inner .ui5-wheelslider-selection-frame{visibility:visible;-webkit-box-shadow:inset 0 0 0 2px var(--_ui5_wheelslider_selection_frame_color);-moz-box-shadow:inset 0 0 0 2px var(--_ui5_wheelslider_selection_frame_color);box-shadow:inset 0 0 0 2px var(--_ui5_wheelslider_selection_frame_color);border-radius:var(--_ui_wheelslider_item_border_radius);margin-top:var(--_ui5_wheelslider_selection_frame_margin_top)}:host([expanded]) .ui5-wheelslider-root.ui5-phone .ui5-wheelslider-inner .ui5-wheelslider-selection-frame{margin-top:var(--_ui5_wheelslider_mobile_selection_frame_margin_top)}:host([expanded]) .ui5-wheelslider-inner .ui5-wheelslider-selection-frame:hover+.ui5-wheelslider-wrapper ul>li.ui5-wheelslider-item[aria-selected=true]{background:var(--_ui_wheelslider_item_expanded_hover_color)}:host([expanded]) .ui5-wheelslider-inner .ui5-wheelslider-selection-frame:active+ul>li.ui5-wheelslider-item[aria-selected=true]{background:var(--_ui5_wheelslider_selected_item_background_color);color:#d3d3d3}.ui5-wheelslider-root:focus{outline:none}'};return t});