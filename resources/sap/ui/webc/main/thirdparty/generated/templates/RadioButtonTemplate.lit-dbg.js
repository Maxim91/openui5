sap.ui.define(['sap/ui/webc/common/thirdparty/base/renderer/LitRenderer'], function (litRender) { 'use strict';

	const block0 = (context, tags, suffix) => litRender.html`<div class="ui5-radio-root ${litRender.classMap(context.classes.main)}" role="radio" aria-checked="${litRender.ifDefined(context.checked)}" aria-readonly="${litRender.ifDefined(context.ariaReadonly)}" aria-disabled="${litRender.ifDefined(context.ariaDisabled)}" aria-label="${litRender.ifDefined(context.ariaLabelText)}" aria-describedby="${litRender.ifDefined(context.ariaDescribedBy)}" tabindex="${litRender.ifDefined(context.tabIndex)}" dir="${litRender.ifDefined(context.effectiveDir)}" @click="${context._onclick}" @keydown="${context._onkeydown}" @keyup="${context._onkeyup}" @mousedown="${context._onmousedown}" @mouseup="${context._onmouseup}" @focusout="${context._onfocusout}"><div class='ui5-radio-inner ${litRender.classMap(context.classes.inner)}'><svg class="ui5-radio-svg" focusable="false" aria-hidden="true">${blockSVG1()}</svg><input type='radio' ?checked="${context.checked}" ?readonly="${context.readonly}" ?disabled="${context.disabled}" name="${litRender.ifDefined(context.name)}" data-sap-no-tab-ref/></div>${ context.text ? block1(context, tags, suffix) : undefined }${ context.hasValueState ? block2(context) : undefined }</div>`;
	const block1 = (context, tags, suffix) => suffix ? litRender.html`<${litRender.scopeTag("ui5-label", tags, suffix)} id="${litRender.ifDefined(context._id)}-label" class="ui5-radio-label" for="${litRender.ifDefined(context._id)}" wrapping-type="${litRender.ifDefined(context.wrappingType)}">${litRender.ifDefined(context.text)}</${litRender.scopeTag("ui5-label", tags, suffix)}>` : litRender.html`<ui5-label id="${litRender.ifDefined(context._id)}-label" class="ui5-radio-label" for="${litRender.ifDefined(context._id)}" wrapping-type="${litRender.ifDefined(context.wrappingType)}">${litRender.ifDefined(context.text)}</ui5-label>`;
	const block2 = (context, tags, suffix) => litRender.html`<span id="${litRender.ifDefined(context._id)}-descr" class="ui5-hidden-text">${litRender.ifDefined(context.valueStateText)}</span>`;
	const blockSVG1 = (context, tags, suffix) => litRender.svg`<circle class="ui5-radio-svg-outer" cx="50%" cy="50%" r="50%" /><circle class="ui5-radio-svg-inner" cx="50%" cy="50%" />`;

	return block0;

});
