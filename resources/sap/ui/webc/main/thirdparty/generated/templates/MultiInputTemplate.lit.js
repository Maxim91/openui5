sap.ui.define(["sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(e){"use strict";const i=(i,a,f)=>f?e.html`<div class="ui5-input-root ui5-input-focusable-element" @focusin="${i._onfocusin}" @focusout="${i._onfocusout}"><div class="ui5-input-content"><span id="${e.ifDefined(i._id)}-hiddenText-nMore" class="ui5-hidden-text">${e.ifDefined(i._tokensCountText)}</span><${e.scopeTag("ui5-tokenizer",a,f)} class="ui5-multi-input-tokenizer" .morePopoverOpener=${e.ifDefined(i)} .popoverMinWidth=${e.ifDefined(i._inputWidth)} .valueState=${e.ifDefined(i.valueState)} ?expanded="${i.expandedTokenizer}" show-more @keydown="${i._onTokenizerKeydown}" @show-more-items-press=${i.showMorePress} @ui5-token-delete=${e.ifDefined(i.tokenDelete)} @focusout="${i._tokenizerFocusOut}"><slot name="tokens"></slot><div slot="valueStateMessage">${i.shouldDisplayDefaultValueStateMessage?n(i):t(i)}</div></${e.scopeTag("ui5-tokenizer",a,f)}><input id="${e.ifDefined(i._id)}-inner" class="ui5-input-inner" style="${e.styleMap(i.styles.innerInput)}" type="${e.ifDefined(i.inputType)}" inner-input ?inner-input-with-icon="${i.icon.length}" ?disabled="${i.disabled}" ?readonly="${i._readonly}" .value="${e.ifDefined(i.value)}" placeholder="${e.ifDefined(i._placeholder)}" maxlength="${e.ifDefined(i.maxlength)}" role="${e.ifDefined(i.accInfo.input.role)}" aria-controls="${e.ifDefined(i.accInfo.input.ariaControls)}" aria-invalid="${e.ifDefined(i.accInfo.input.ariaInvalid)}" aria-haspopup="${e.ifDefined(i.accInfo.input.ariaHasPopup)}" aria-describedby="${e.ifDefined(i.accInfo.input.ariaDescribedBy)}" aria-roledescription="${e.ifDefined(i.accInfo.input.ariaRoledescription)}" aria-autocomplete="${e.ifDefined(i.accInfo.input.ariaAutoComplete)}" aria-expanded="${e.ifDefined(i.accInfo.input.ariaExpanded)}" aria-label="${e.ifDefined(i.accInfo.input.ariaLabel)}" aria-required="${e.ifDefined(i.required)}" @input="${i._handleInput}" @change="${i._handleNativeInputChange}" @keydown="${i._onkeydown}" @keyup="${i._onkeyup}" @click=${i._click} @focusin=${i.innerFocusIn} data-sap-focus-ref step="${e.ifDefined(i.nativeInputAttributes.step)}" min="${e.ifDefined(i.nativeInputAttributes.min)}" max="${e.ifDefined(i.nativeInputAttributes.max)}" />${i.effectiveShowClearIcon?o(i,a,f):undefined}${i.icon.length?u():undefined}<div class="ui5-input-value-state-icon">${e.unsafeHTML(i._valueStateInputIcon)}</div>${i.showValueHelpIcon?s(i,a,f):undefined}${i.showSuggestions?d(i):undefined}${i.accInfo.input.ariaDescription?l(i):undefined}${i.hasValueState?c(i):undefined}</div><slot name="formSupport"></slot></div> `:e.html`<div class="ui5-input-root ui5-input-focusable-element" @focusin="${i._onfocusin}" @focusout="${i._onfocusout}"><div class="ui5-input-content"><span id="${e.ifDefined(i._id)}-hiddenText-nMore" class="ui5-hidden-text">${e.ifDefined(i._tokensCountText)}</span><ui5-tokenizer class="ui5-multi-input-tokenizer" .morePopoverOpener=${e.ifDefined(i)} .popoverMinWidth=${e.ifDefined(i._inputWidth)} .valueState=${e.ifDefined(i.valueState)} ?expanded="${i.expandedTokenizer}" show-more @keydown="${i._onTokenizerKeydown}" @show-more-items-press=${i.showMorePress} @ui5-token-delete=${e.ifDefined(i.tokenDelete)} @focusout="${i._tokenizerFocusOut}"><slot name="tokens"></slot><div slot="valueStateMessage">${i.shouldDisplayDefaultValueStateMessage?n(i):t(i)}</div></ui5-tokenizer><input id="${e.ifDefined(i._id)}-inner" class="ui5-input-inner" style="${e.styleMap(i.styles.innerInput)}" type="${e.ifDefined(i.inputType)}" inner-input ?inner-input-with-icon="${i.icon.length}" ?disabled="${i.disabled}" ?readonly="${i._readonly}" .value="${e.ifDefined(i.value)}" placeholder="${e.ifDefined(i._placeholder)}" maxlength="${e.ifDefined(i.maxlength)}" role="${e.ifDefined(i.accInfo.input.role)}" aria-controls="${e.ifDefined(i.accInfo.input.ariaControls)}" aria-invalid="${e.ifDefined(i.accInfo.input.ariaInvalid)}" aria-haspopup="${e.ifDefined(i.accInfo.input.ariaHasPopup)}" aria-describedby="${e.ifDefined(i.accInfo.input.ariaDescribedBy)}" aria-roledescription="${e.ifDefined(i.accInfo.input.ariaRoledescription)}" aria-autocomplete="${e.ifDefined(i.accInfo.input.ariaAutoComplete)}" aria-expanded="${e.ifDefined(i.accInfo.input.ariaExpanded)}" aria-label="${e.ifDefined(i.accInfo.input.ariaLabel)}" aria-required="${e.ifDefined(i.required)}" @input="${i._handleInput}" @change="${i._handleNativeInputChange}" @keydown="${i._onkeydown}" @keyup="${i._onkeyup}" @click=${i._click} @focusin=${i.innerFocusIn} data-sap-focus-ref step="${e.ifDefined(i.nativeInputAttributes.step)}" min="${e.ifDefined(i.nativeInputAttributes.min)}" max="${e.ifDefined(i.nativeInputAttributes.max)}" />${i.effectiveShowClearIcon?o(i,a,f):undefined}${i.icon.length?u():undefined}<div class="ui5-input-value-state-icon">${e.unsafeHTML(i._valueStateInputIcon)}</div>${i.showValueHelpIcon?s(i,a,f):undefined}${i.showSuggestions?d(i):undefined}${i.accInfo.input.ariaDescription?l(i):undefined}${i.hasValueState?c(i):undefined}</div><slot name="formSupport"></slot></div> `;const n=(i,n,t)=>e.html`${e.ifDefined(i.valueStateText)}`;const t=(i,n,t)=>e.html`${e.repeat(i.valueStateMessageText,(e,i)=>e._id||i,(e,i)=>a(e))}`;const a=(i,n,t,a,o)=>e.html`${e.ifDefined(i)}`;const o=(i,n,t)=>t?e.html`<${e.scopeTag("ui5-icon",n,t)} @click=${i._clear} tabindex="-1" input-icon class="ui5-input-clear-icon" name="decline"></${e.scopeTag("ui5-icon",n,t)}>`:e.html`<ui5-icon @click=${i._clear} tabindex="-1" input-icon class="ui5-input-clear-icon" name="decline"></ui5-icon>`;const u=(i,n,t)=>e.html`<div class="ui5-input-icon-root"><slot name="icon"></slot></div>`;const s=(i,n,t)=>t?e.html`<${e.scopeTag("ui5-icon",n,t)} @click=${i.valueHelpPress} @mousedown=${i.valueHelpMouseDown} @mouseup=${i.valueHelpMouseUp} input-icon name="value-help"></${e.scopeTag("ui5-icon",n,t)}>`:e.html`<ui5-icon @click=${i.valueHelpPress} @mousedown=${i.valueHelpMouseDown} @mouseup=${i.valueHelpMouseUp} input-icon name="value-help"></ui5-icon>`;const d=(i,n,t)=>e.html`<span id="${e.ifDefined(i._id)}-suggestionsText" class="ui5-hidden-text">${e.ifDefined(i.suggestionsText)}</span><span id="${e.ifDefined(i._id)}-selectionText" class="ui5-hidden-text" aria-live="polite" role="status"></span><span id="${e.ifDefined(i._id)}-suggestionsCount" class="ui5-hidden-text" aria-live="polite">${e.ifDefined(i.availableSuggestionsCount)}</span>`;const l=(i,n,t)=>e.html`<span id="${e.ifDefined(i._id)}-descr" class="ui5-hidden-text">${e.ifDefined(i.accInfo.input.ariaDescription)}</span>`;const c=(i,n,t)=>e.html`<span id="${e.ifDefined(i._id)}-valueStateDesc" class="ui5-hidden-text">${e.ifDefined(i.ariaValueStateHiddenText)}</span>`;return i});