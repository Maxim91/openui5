sap.ui.define(["sap/ui/webc/common/thirdparty/base/asset-registries/Themes","sap/ui/webc/common/thirdparty/theming/generated/themes/sap_fiori_3/parameters-bundle.css","./sap_fiori_3/parameters-bundle.css"],function(e,i,o){"use strict";function t(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var r=t(i);e.registerThemePropertiesLoader("@ui5/webcomponents-theming","sap_fiori_3",()=>r);e.registerThemePropertiesLoader("@ui5/webcomponents-fiori","sap_fiori_3",()=>o);var s={packageName:"@ui5/webcomponents-fiori",fileName:"themes/WizardPopover.css",content:".ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}.ui5-wizard-responsive-popover{box-shadow:var(--sapContent_Shadow1)}.ui5-wizard-responsive-popover-list{list-style:none;margin:0;padding:0}.ui5-responsive-popover-footer{display:flex;justify-content:flex-end;padding:.25rem 0;width:100%}.ui5-wizard-popover .ui5-wizard-responsive-popover-list [ui5-button]{width:200px}.ui5-wizard-dialog .ui5-wizard-responsive-popover-list [ui5-button]{width:100%}"};return s});