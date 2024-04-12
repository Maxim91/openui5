sap.ui.define(['sap/ui/webc/common/thirdparty/base/renderer/LitRenderer'], function (litRender) { 'use strict';

	const block0 = (context, tags, suffix) => suffix ? litRender.html`<${litRender.scopeTag("ui5-responsive-popover", tags, suffix)} id="${litRender.ifDefined(context._id)}-overflowMenu" horizontal-align="Right" placement-type="Bottom" content-only-on-desktop hide-arrow _hide-header class="ui5-tab-container-responsive-popover"><${litRender.scopeTag("ui5-list", tags, suffix)} mode="SingleSelect" separators="None" @ui5-item-click="${litRender.ifDefined(context._onOverflowListItemClick)}">${ litRender.repeat(context._overflowItems, (item, index) => item._id || index, (item, index) => block1(item)) }</${litRender.scopeTag("ui5-list", tags, suffix)}><div slot="footer" class="ui5-responsive-popover-footer"><${litRender.scopeTag("ui5-button", tags, suffix)} design="Transparent" @click="${context._closeRespPopover}">${litRender.ifDefined(context.popoverCancelButtonText)}</${litRender.scopeTag("ui5-button", tags, suffix)}></div></${litRender.scopeTag("ui5-responsive-popover", tags, suffix)}>` : litRender.html`<ui5-responsive-popover id="${litRender.ifDefined(context._id)}-overflowMenu" horizontal-align="Right" placement-type="Bottom" content-only-on-desktop hide-arrow _hide-header class="ui5-tab-container-responsive-popover"><ui5-list mode="SingleSelect" separators="None" @ui5-item-click="${litRender.ifDefined(context._onOverflowListItemClick)}">${ litRender.repeat(context._overflowItems, (item, index) => item._id || index, (item, index) => block1(item)) }</ui5-list><div slot="footer" class="ui5-responsive-popover-footer"><ui5-button design="Transparent" @click="${context._closeRespPopover}">${litRender.ifDefined(context.popoverCancelButtonText)}</ui5-button></div></ui5-responsive-popover>`;
	const block1 = (item, index, context, tags, suffix) => litRender.html`${litRender.ifDefined(item.overflowPresentation)}`;

	return block0;

});
