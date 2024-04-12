sap.ui.define(["sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(e){"use strict";const i=(i,t,r)=>e.html`<div class="ui5-textarea-root" style="${e.styleMap(i.styles.main)}" @focusin="${i._onfocusin}" @focusout="${i._onfocusout}">${i.growing?a(i):undefined}<textarea id="${e.ifDefined(i._id)}-inner" class="ui5-textarea-inner" placeholder="${e.ifDefined(i.placeholder)}" ?disabled="${i.disabled}" ?readonly="${i.readonly}" aria-label="${e.ifDefined(i.ariaLabelText)}" aria-describedby="${e.ifDefined(i.ariaDescribedBy)}" aria-invalid="${e.ifDefined(i.ariaInvalid)}" aria-required="${e.ifDefined(i.required)}" maxlength="${e.ifDefined(i._exceededTextProps.calcedMaxLength)}" .value="${e.ifDefined(i.value)}" @input="${i._oninput}" @change="${i._onchange}" @keyup="${i._onkeyup}" @keydown="${i._onkeydown}" data-sap-focus-ref part="textarea"></textarea>${i.showExceededText?d(i):undefined}${i.hasValueState?n(i):undefined}<slot name="formSupport"></slot></div> `;const a=(i,a,d)=>e.html`<div id="${e.ifDefined(i._id)}-mirror" style="${e.styleMap(i.styles.mirror)}" class="ui5-textarea-mirror" aria-hidden="true">${e.repeat(i._mirrorText,(e,i)=>e._id||i,(e,i)=>t(e))}</div>`;const t=(i,a,t,d,n)=>e.html`${e.ifDefined(i.text)}<br />`;const d=(i,a,t)=>e.html`<span class="ui5-textarea-exceeded-text">${e.ifDefined(i._exceededTextProps.exceededText)}</span>`;const n=(i,a,t)=>e.html`<span id="${e.ifDefined(i._id)}-valueStateDesc" class="ui5-hidden-text">${e.ifDefined(i.ariaValueStateHiddenText)}</span>`;return i});