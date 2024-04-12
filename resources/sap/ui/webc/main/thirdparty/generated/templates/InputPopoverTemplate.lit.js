sap.ui.define(["sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(e){"use strict";const s=(s,t,a)=>e.html`${s.showSuggestions?i(s,t,a):undefined}${s.hasValueStateMessage?m(s,t,a):undefined} `;const i=(s,i,a)=>a?e.html`<${e.scopeTag("ui5-responsive-popover",i,a)} class="${e.classMap(s.classes.popover)}" hide-arrow _disable-initial-focus placement-type="Bottom" horizontal-align="Left" style="${e.styleMap(s.styles.suggestionsPopover)}" @ui5-after-open="${e.ifDefined(s._afterOpenPopover)}" @ui5-after-close="${e.ifDefined(s._afterClosePopover)}" @ui5-scroll="${e.ifDefined(s._scroll)}">${s._isPhone?t(s,i,a):undefined}${!s._isPhone?p(s,i,a):undefined}<${e.scopeTag("ui5-list",i,a)} separators="${e.ifDefined(s.suggestionSeparators)}" @mousedown="${s.onItemMouseDown}" mode="SingleSelect">${e.repeat(s.suggestionsTexts,(e,s)=>e._id||s,(e,t)=>f(e,t,s,i,a))}</${e.scopeTag("ui5-list",i,a)}>${s._isPhone?h(s,i,a):undefined}</${e.scopeTag("ui5-responsive-popover",i,a)}>`:e.html`<ui5-responsive-popover class="${e.classMap(s.classes.popover)}" hide-arrow _disable-initial-focus placement-type="Bottom" horizontal-align="Left" style="${e.styleMap(s.styles.suggestionsPopover)}" @ui5-after-open="${e.ifDefined(s._afterOpenPopover)}" @ui5-after-close="${e.ifDefined(s._afterClosePopover)}" @ui5-scroll="${e.ifDefined(s._scroll)}">${s._isPhone?t(s,i,a):undefined}${!s._isPhone?p(s,i,a):undefined}<ui5-list separators="${e.ifDefined(s.suggestionSeparators)}" @mousedown="${s.onItemMouseDown}" mode="SingleSelect">${e.repeat(s.suggestionsTexts,(e,s)=>e._id||s,(e,t)=>f(e,t,s,i,a))}</ui5-list>${s._isPhone?h(s,i,a):undefined}</ui5-responsive-popover>`;const t=(s,i,t)=>t?e.html`<div slot="header" class="ui5-responsive-popover-header"><div class="row"><span>${e.ifDefined(s._headerTitleText)}</span><${e.scopeTag("ui5-button",i,t)} class="ui5-responsive-popover-close-btn" icon="decline" design="Transparent" @click="${s._closeRespPopover}"></${e.scopeTag("ui5-button",i,t)}></div><div class="row"><div class="input-root-phone"><${e.scopeTag("ui5-input",i,t)} class="ui5-input-inner-phone" type="${e.ifDefined(s.inputType)}" .value="${e.ifDefined(s.value)}" ?show-clear-icon=${s.showClearIcon} placeholder="${e.ifDefined(s.placeholder)}" @input="${s._handleInput}" @change="${s._handleChange}"></${e.scopeTag("ui5-input",i,t)}></div></div>${s.hasValueStateMessage?a(s,i,t):undefined}</div>`:e.html`<div slot="header" class="ui5-responsive-popover-header"><div class="row"><span>${e.ifDefined(s._headerTitleText)}</span><ui5-button class="ui5-responsive-popover-close-btn" icon="decline" design="Transparent" @click="${s._closeRespPopover}"></ui5-button></div><div class="row"><div class="input-root-phone"><ui5-input class="ui5-input-inner-phone" type="${e.ifDefined(s.inputType)}" .value="${e.ifDefined(s.value)}" ?show-clear-icon=${s.showClearIcon} placeholder="${e.ifDefined(s.placeholder)}" @input="${s._handleInput}" @change="${s._handleChange}"></ui5-input></div></div>${s.hasValueStateMessage?a(s,i,t):undefined}</div>`;const a=(s,i,t)=>t?e.html`<div class="${e.classMap(s.classes.popoverValueState)}" style="${e.styleMap(s.styles.suggestionPopoverHeader)}"><${e.scopeTag("ui5-icon",i,t)} class="ui5-input-value-state-message-icon" name="${e.ifDefined(s._valueStateMessageInputIcon)}"></${e.scopeTag("ui5-icon",i,t)}>${s.shouldDisplayDefaultValueStateMessage?o(s):n(s)}</div>`:e.html`<div class="${e.classMap(s.classes.popoverValueState)}" style="${e.styleMap(s.styles.suggestionPopoverHeader)}"><ui5-icon class="ui5-input-value-state-message-icon" name="${e.ifDefined(s._valueStateMessageInputIcon)}"></ui5-icon>${s.shouldDisplayDefaultValueStateMessage?o(s):n(s)}</div>`;const o=(s,i,t)=>e.html`${e.ifDefined(s.valueStateText)}`;const n=(s,i,t)=>e.html`${e.repeat(s.valueStateMessageText,(e,s)=>e._id||s,(e,s)=>l(e))}`;const l=(s,i,t,a,o)=>e.html`${e.ifDefined(s)}`;const p=(s,i,t)=>e.html`${s.hasValueStateMessage?u(s,i,t):undefined}`;const u=(s,i,t)=>t?e.html`<div slot="header" ?focused=${s._isValueStateFocused} class="ui5-responsive-popover-header ${e.classMap(s.classes.popoverValueState)}" style=${e.styleMap(s.styles.suggestionPopoverHeader)}><${e.scopeTag("ui5-icon",i,t)} class="ui5-input-value-state-message-icon" name="${e.ifDefined(s._valueStateMessageInputIcon)}"></${e.scopeTag("ui5-icon",i,t)}>${s.shouldDisplayDefaultValueStateMessage?d(s):c(s)}</div>`:e.html`<div slot="header" ?focused=${s._isValueStateFocused} class="ui5-responsive-popover-header ${e.classMap(s.classes.popoverValueState)}" style=${e.styleMap(s.styles.suggestionPopoverHeader)}><ui5-icon class="ui5-input-value-state-message-icon" name="${e.ifDefined(s._valueStateMessageInputIcon)}"></ui5-icon>${s.shouldDisplayDefaultValueStateMessage?d(s):c(s)}</div>`;const d=(s,i,t)=>e.html`${e.ifDefined(s.valueStateText)}`;const c=(s,i,t)=>e.html`${e.repeat(s.valueStateMessageText,(e,s)=>e._id||s,(e,s)=>r(e))}`;const r=(s,i,t,a,o)=>e.html`${e.ifDefined(s)}`;const f=(s,i,t,a,o)=>e.html`${s.groupItem?$(s,i,t,a,o):v(s,i,t,a,o)}`;const $=(s,i,t,a,o)=>o?e.html`<${e.scopeTag("ui5-li-groupheader",a,o)} data-ui5-key="${e.ifDefined(s.key)}">${e.unsafeHTML(s.text)}</${e.scopeTag("ui5-li-groupheader",a,o)}>`:e.html`<ui5-li-groupheader data-ui5-key="${e.ifDefined(s.key)}">${e.unsafeHTML(s.text)}</ui5-li-groupheader>`;const v=(s,i,t,a,o)=>o?e.html`<${e.scopeTag("ui5-li-suggestion-item",a,o)} image="${e.ifDefined(s.image)}" icon="${e.ifDefined(s.icon)}" additional-text="${e.ifDefined(s.additionalText)}" type="${e.ifDefined(s.type)}" additional-text-state="${e.ifDefined(s.additionalTextState)}" data-ui5-key="${e.ifDefined(s.key)}">${e.unsafeHTML(s.text)}${s.description?g(s):undefined}</${e.scopeTag("ui5-li-suggestion-item",a,o)}>`:e.html`<ui5-li-suggestion-item image="${e.ifDefined(s.image)}" icon="${e.ifDefined(s.icon)}" additional-text="${e.ifDefined(s.additionalText)}" type="${e.ifDefined(s.type)}" additional-text-state="${e.ifDefined(s.additionalTextState)}" data-ui5-key="${e.ifDefined(s.key)}">${e.unsafeHTML(s.text)}${s.description?g(s):undefined}</ui5-li-suggestion-item>`;const g=(s,i,t,a,o)=>e.html`<span slot="richDescription">${e.unsafeHTML(s.description)}</span>`;const h=(s,i,t)=>t?e.html`<div slot="footer" class="ui5-responsive-popover-footer"><${e.scopeTag("ui5-button",i,t)} design="Transparent" @click="${s._closeRespPopover}">OK</${e.scopeTag("ui5-button",i,t)}></div>`:e.html`<div slot="footer" class="ui5-responsive-popover-footer"><ui5-button design="Transparent" @click="${s._closeRespPopover}">OK</ui5-button></div>`;const m=(s,i,t)=>t?e.html`<${e.scopeTag("ui5-popover",i,t)} skip-registry-update _disable-initial-focus prevent-focus-restore hide-arrow class="ui5-valuestatemessage-popover" placement-type="Bottom" horizontal-align="${e.ifDefined(s._valueStatePopoverHorizontalAlign)}"><div slot="header" class="${e.classMap(s.classes.popoverValueState)}" style="${e.styleMap(s.styles.popoverHeader)}"><${e.scopeTag("ui5-icon",i,t)} class="ui5-input-value-state-message-icon" name="${e.ifDefined(s._valueStateMessageInputIcon)}"></${e.scopeTag("ui5-icon",i,t)}>${s.shouldDisplayDefaultValueStateMessage?D(s):y(s)}</div></${e.scopeTag("ui5-popover",i,t)}>`:e.html`<ui5-popover skip-registry-update _disable-initial-focus prevent-focus-restore hide-arrow class="ui5-valuestatemessage-popover" placement-type="Bottom" horizontal-align="${e.ifDefined(s._valueStatePopoverHorizontalAlign)}"><div slot="header" class="${e.classMap(s.classes.popoverValueState)}" style="${e.styleMap(s.styles.popoverHeader)}"><ui5-icon class="ui5-input-value-state-message-icon" name="${e.ifDefined(s._valueStateMessageInputIcon)}"></ui5-icon>${s.shouldDisplayDefaultValueStateMessage?D(s):y(s)}</div></ui5-popover>`;const D=(s,i,t)=>e.html`${e.ifDefined(s.valueStateText)}`;const y=(s,i,t)=>e.html`${e.repeat(s.valueStateMessageText,(e,s)=>e._id||s,(e,s)=>T(e))}`;const T=(s,i,t,a,o)=>e.html`${e.ifDefined(s)}`;return s});