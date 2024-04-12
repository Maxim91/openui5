sap.ui.define(["sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(e){"use strict";const i=(i,t,n)=>n?e.html`<${e.scopeTag("ui5-responsive-popover",t,n)} class="ui5-breadcrumbs-popover" hide-arrow content-only-on-desktop placement-type="Bottom" horizontal-align="Left" _hide-header @keydown="${i._onkeydown}"><${e.scopeTag("ui5-list",t,n)} mode="SingleSelect" separators="None" @ui5-selection-change="${e.ifDefined(i._onOverflowListItemSelect)}">${e.repeat(i._overflowItemsData,(e,i)=>e._id||i,(e,s)=>o(e,s,i,t,n))}</${e.scopeTag("ui5-list",t,n)}><div slot="footer" class="ui5-breadcrumbs-popover-footer"><${e.scopeTag("ui5-button",t,n)} design="Transparent" @click="${i._closeRespPopover}">${e.ifDefined(i._cancelButtonText)}</${e.scopeTag("ui5-button",t,n)}></div></${e.scopeTag("ui5-responsive-popover",t,n)}>`:e.html`<ui5-responsive-popover class="ui5-breadcrumbs-popover" hide-arrow content-only-on-desktop placement-type="Bottom" horizontal-align="Left" _hide-header @keydown="${i._onkeydown}"><ui5-list mode="SingleSelect" separators="None" @ui5-selection-change="${e.ifDefined(i._onOverflowListItemSelect)}">${e.repeat(i._overflowItemsData,(e,i)=>e._id||i,(e,s)=>o(e,s,i,t,n))}</ui5-list><div slot="footer" class="ui5-breadcrumbs-popover-footer"><ui5-button design="Transparent" @click="${i._closeRespPopover}">${e.ifDefined(i._cancelButtonText)}</ui5-button></div></ui5-responsive-popover>`;const o=(i,o,t,n,s)=>s?e.html`<${e.scopeTag("ui5-li",n,s)} id="${e.ifDefined(i._id)}-li" accessible-name="${e.ifDefined(i.accessibleName)}" data-ui5-stable="${e.ifDefined(i.stableDomRef)}">${e.ifDefined(i.textContent)}</${e.scopeTag("ui5-li",n,s)}>`:e.html`<ui5-li id="${e.ifDefined(i._id)}-li" accessible-name="${e.ifDefined(i.accessibleName)}" data-ui5-stable="${e.ifDefined(i.stableDomRef)}">${e.ifDefined(i.textContent)}</ui5-li>`;return i});