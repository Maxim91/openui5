sap.ui.define(["sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(e){"use strict";const i=(i,t,n)=>e.html`<div class="ui5-panel-root" role="${e.ifDefined(i.accRole)}" aria-label="${e.ifDefined(i.effectiveAccessibleName)}"><div @click="${i._headerClick}" @keydown="${i._headerKeyDown}" @keyup="${i._headerKeyUp}" class="ui5-panel-header" tabindex="${e.ifDefined(i.headerTabIndex)}" role="${e.ifDefined(i.accInfo.role)}" aria-expanded="${e.ifDefined(i.accInfo.ariaExpanded)}" aria-controls="${e.ifDefined(i.accInfo.ariaControls)}" aria-labelledby="${e.ifDefined(i.accInfo.ariaLabelledby)}">${!i.fixed?a(i,t,n):undefined}${i._hasHeader?s():c(i)}</div><div class="ui5-panel-content" id="${e.ifDefined(i._id)}-content" tabindex="-1" style="${e.styleMap(i.styles.content)}" part="content"><slot></slot></div></div>`;const a=(i,a,s)=>e.html`<div class="ui5-panel-header-button-root">${i._hasHeader?t(i,a,s):n(i,a,s)}</div>`;const t=(i,a,t)=>t?e.html`<${e.scopeTag("ui5-button",a,t)} design="Transparent" class="ui5-panel-header-button ${e.classMap(i.classes.headerBtn)}" icon="slim-arrow-right" @click="${i._toggleButtonClick}" .accessibilityAttributes=${e.ifDefined(i.accInfo.button.accessibilityAttributes)} tooltip="${e.ifDefined(i.accInfo.button.title)}" accessible-name="${e.ifDefined(i.accInfo.button.ariaLabelButton)}"></${e.scopeTag("ui5-button",a,t)}>`:e.html`<ui5-button design="Transparent" class="ui5-panel-header-button ${e.classMap(i.classes.headerBtn)}" icon="slim-arrow-right" @click="${i._toggleButtonClick}" .accessibilityAttributes=${e.ifDefined(i.accInfo.button.accessibilityAttributes)} tooltip="${e.ifDefined(i.accInfo.button.title)}" accessible-name="${e.ifDefined(i.accInfo.button.ariaLabelButton)}"></ui5-button>`;const n=(i,a,t)=>t?e.html`<${e.scopeTag("ui5-icon",a,t)} class="ui5-panel-header-button ui5-panel-header-icon ${e.classMap(i.classes.headerBtn)}" name="slim-arrow-right"></${e.scopeTag("ui5-icon",a,t)}>`:e.html`<ui5-icon class="ui5-panel-header-button ui5-panel-header-icon ${e.classMap(i.classes.headerBtn)}" name="slim-arrow-right"></ui5-icon>`;const s=(i,a,t)=>e.html`<slot name="header"></slot>`;const c=(i,a,t)=>e.html`<div id="${e.ifDefined(i._id)}-header-title" role="heading" aria-level="${e.ifDefined(i.headerAriaLevel)}" class="ui5-panel-header-title">${e.ifDefined(i.headerText)}</div>`;return i});