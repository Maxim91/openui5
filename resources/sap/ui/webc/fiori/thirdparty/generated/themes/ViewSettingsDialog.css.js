sap.ui.define(["sap/ui/webc/common/thirdparty/base/asset-registries/Themes","sap/ui/webc/common/thirdparty/theming/generated/themes/sap_fiori_3/parameters-bundle.css","./sap_fiori_3/parameters-bundle.css"],function(e,i,t){"use strict";function n(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var r=n(i);e.registerThemePropertiesLoader("@ui5/webcomponents-theming","sap_fiori_3",()=>r);e.registerThemePropertiesLoader("@ui5/webcomponents-fiori","sap_fiori_3",()=>t);var a={packageName:"@ui5/webcomponents-fiori",fileName:"themes/ViewSettingsDialog.css",content:"[on-desktop] .ui5-vsd-content{height:var(--_ui5_vsd_content_height);min-width:350px}[on-desktop] [expand-content].ui5-vsd-content{height:var(--_ui5_vsd_expand_content_height);min-width:350px}.ui5-vsd-header{width:100%;padding-bottom:.25rem}.ui5-vsd-content{margin:0 .1px 0 -1rem}.ui5-vsd-title{font-size:var(--sapFontHeader5Size)}.ui5-vsd-header-container{display:flex;align-items:center;justify-content:space-between;height:var(--_ui5_vsd_header_container);line-height:var(--_ui5_vsd_header_container)}.ui5-vsd-header-end{display:flex}.ui5-vsd-sub-header{height:var(--_ui5_vsd_sub_header_container_height);line-height:var(--_ui5_vsd_sub_header_container_height)}.ui5-vsd-header-start{display:flex;align-items:center}.ui5-vsd-back-button{margin-inline-end:.5rem}.ui5-vsd-footer{width:100%;display:flex;justify-content:flex-end;margin:.1875rem 0}.ui5-vsd-footer [ui5-button]:first-child{margin-right:.5rem;min-width:4rem}.ui5-vsd-sort{width:100%;height:100%}[ui5-li-groupheader]{overflow:hidden}[ui5-dialog]::part(content){padding-top:0;padding-bottom:0;padding-right:0}:host [ui5-li]::part(native-li){padding-inline-start:var(--_ui5_vsd_content_li_padding)}:host [ui5-li].ui5-vsd-filterItemList::part(native-li){padding-inline-start:1rem}"};return a});