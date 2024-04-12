/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/Device','sap/ui/base/EventProvider','sap/ui/core/InvisibleText','sap/ui/core/ValueStateSupport','sap/m/library','sap/ui/core/library','sap/m/List',"sap/m/inputUtils/scrollToItem","sap/m/inputUtils/SuggestionsPopoverDialogMixin","sap/m/inputUtils/SuggestionsPopoverPopoverMixin"],function(D,E,I,V,l,c,L,s,S,a){"use strict";var b=l.ListMode;var d=l.ListSeparators;var C="sapMSuggestionsPopover",e="sapUiNoContentPadding";var f=c.ValueState;var g=E.extend("sap.m.SuggestionsPopover",{constructor:function(){E.apply(this,arguments);this._sPopoverContentWidth=null;this._sOldValueState=f.None;if(D.system.phone){S.apply(g.prototype);}else{a.apply(g.prototype);}},destroy:function(){this._destroySuggestionPopup();}});g.M_EVENTS={SELECTION_CHANGE:"selectionChange"};g.prototype.isOpen=function(){var p=this.getPopover();return p&&p.isOpen();};g.prototype.setPopover=function(p){this._oPopover=p;};g.prototype.getPopover=function(){return this._oPopover;};g.prototype.destroyPopover=function(){if(this._oPopover){this._oPopover.destroy();}this._oPopover=null;};g.prototype.setInputLabels=function(G){this._fnInputLabels=G;};g.prototype.createSuggestionPopup=function(p,o,h){var P,i=this.getItemsContainer();o=o||[];P=this.createPopover(p,o,h);this.setPopover(P);P.addStyleClass(C);P.addStyleClass(e);P.addAriaLabelledBy(I.getStaticId("sap.m","INPUT_AVALIABLE_VALUES"));if(i){this.addContent(i);}};g.prototype.initContent=function(p,o){var h=o,P=this.getPopover();if(!P){return;}if(!h){h=new L(p+"-popup-list",{showNoData:false,mode:b.SingleSelectMaster,rememberSelections:false,width:"100%",showSeparators:d.None,busyIndicatorDelay:0});}this.addContent(h);};g.prototype._destroySuggestionPopup=function(){this.destroyPopover();this._oValueStateHeader=null;};g.prototype.addContent=function(o){this.getPopover().addContent(o);};g.prototype.getItemsContainer=function(){var p=this.getPopover(),h=p&&p.getContent();return h&&h.filter(function(o){return(o.isA("sap.m.List")&&o.getId().indexOf("-popup-list")>-1)||o.isA("sap.m.Table");})[0];};g.prototype.handleListNavigation=function(p,o){var P=this.getPopover();if(o.isMarked()){return;}if(!p.getEnabled()||!p.getEditable()){return;}if(!P||!P.isOpen()){return;}o.preventDefault();o.stopPropagation();var h=this.getItemsContainer(),v=this._getValueStateHeader(),H=v&&v.getVisible(),F=p.hasStyleClass("sapMFocus"),i=h&&h.getItems().filter(function(k){return k.getVisible&&k.getVisible();}),j=i.indexOf(this.getFocusedListItem()),n;switch(o.type){case"sapdown":n=this.handleArrowDown(i,j,F,H);break;case"sapup":n=this.handleArrowUp(i,j,F,H);break;case"sapend":n=this.handleEnd(i,H);break;case"saphome":n=this.handleHome(i,H);break;case"sappagedown":n=this.handlePageDown(i,j,H);break;case"sappageup":n=this.handlePageUp(i,j,H);break;}this.updateFocus(p,n);if(p.handleSelectionFromList){p.handleSelectionFromList(n);}else{this.handleSelectionFromList(n);}this.updateAriaActiveDescendant(p,n);if(D.system.desktop&&n){s(n,this.getPopover());}};g.prototype.handleArrowDown=function(h,i,F,H){if(F&&!H){return h[0];}if(!F&&!this.getValueStateActiveState()){if(i===h.length-1){return h[i];}return h[i+1];}if(this.getValueStateActiveState()){this.setValueStateActiveState(false);return h[0];}else{this.setValueStateActiveState(true);}};g.prototype.handleArrowUp=function(h,i,F,H){if(F){return;}if(i>0){return h[i-1];}if(H){this.setValueStateActiveState(!this.getValueStateActiveState());}};g.prototype.handleEnd=function(h,H){if(H){this.setValueStateActiveState(false);}return h.length&&h[h.length-1];};g.prototype.handleHome=function(h,H){if(H){this.setValueStateActiveState(true);return;}return h.length&&h[0];};g.prototype.handlePageDown=function(h,i,H){if(H){this.setValueStateActiveState(false);}return h[Math.min(h.length-1,i+10)];};g.prototype.handlePageUp=function(h,i,H){if(i-10>=0){return h[i-10];}if(H){this.setValueStateActiveState(true);return;}return h[0];};g.prototype.updateFocus=function(p,i){var o=this.getItemsContainer(),P=this.getFocusedListItem(),v=this._getValueStateHeader(),h=v&&v.getVisible();o&&o.removeStyleClass("sapMListFocus");P&&P.removeStyleClass("sapMLIBFocused");p.hasStyleClass("sapMFocus")&&p.removeStyleClass("sapMFocus");h&&v.removeStyleClass("sapMPseudoFocus");if(i){i.addStyleClass("sapMLIBFocused");o.addStyleClass("sapMListFocus");this.updateListDataAttributes(o);}else if(this.getValueStateActiveState()){v.addStyleClass("sapMPseudoFocus");}else{p.addStyleClass("sapMFocus");}};g.prototype.updateListDataAttributes=function(o){if(!o){return;}var v=o.getVisibleItems();if(!v){return;}v.forEach(function(i){var j=i.getDomRef();if(j&&j.hasAttribute("data-sap-ui-first-suggestion-item")){j.removeAttribute("data-sap-ui-first-suggestion-item");}if(j&&j.hasAttribute("data-sap-ui-last-suggestion-item")){j.removeAttribute("data-sap-ui-last-suggestion-item");}});if(v[0]){var F=v[0].getDomRef();F&&F.setAttribute("data-sap-ui-first-suggestion-item","");}if(v[v.length-1]){var h=v[v.length-1].getDomRef();h&&h.setAttribute("data-sap-ui-last-suggestion-item","");}};g.prototype.handleSelectionFromList=function(i){var o=this.getItemsContainer(),p=this.getFocusedListItem(),h=i&&i.isA("sap.m.GroupHeaderListItem");if(!i||h){o.removeSelections(true);}else{o.setSelectedItem(i,true);}this.fireEvent(g.M_EVENTS.SELECTION_CHANGE,{previousItem:p,newItem:i});};g.prototype.updateAriaActiveDescendant=function(p,i){var o=p.getFocusDomRef(),v=this._getValueStateHeader(),F=v&&v.getFormattedText(),h;if(p.hasStyleClass("sapMFocus")){o.removeAttribute("aria-activedescendant");return;}if(i){o.setAttribute("aria-activedescendant",i.getId());return;}if(this.getValueStateActiveState()){h=F?F.getId():v.getId();o.setAttribute("aria-activedescendant",h);}};g.prototype.getFocusedListItem=function(){var o=this.getItemsContainer(),h=o&&o.getItems()||[];for(var i=0;i<h.length;i++){if(h[i].hasStyleClass("sapMLIBFocused")){return h[i];}}};g.prototype.setValueStateActiveState=function(A){this.bMessageValueStateActive=A;};g.prototype.getValueStateActiveState=function(){return this.bMessageValueStateActive;};g.prototype.updateValueState=function(v,h,i){var j=i&&v!==f.None;h=h||V.getAdditionalText(v);if(!this.getPopover()){return this;}if(this.getInput()){this.getInput().setValueState(v);}var o=this._getValueStateHeader();o.setValueState(v);if(o&&typeof h==="string"){o.setText(h);}else if(o&&typeof h==="object"){o.setFormattedText(h);}if(o){o.setVisible(j);}this._alignValueStateStyles(v);return this;};g.prototype._handleValueStateLinkNav=function(p,o){if(!this.getValueStateActiveState()||(this.getValueStateActiveState()&&document.activeElement.tagName==="A")){return;}var v=this.getValueStateLinks(),h=v[v.length-1];o.preventDefault();v[0].focus();this._getValueStateHeader().removeStyleClass("sapMPseudoFocus");v.forEach(function(i){i.addDelegate({onsapup:function(o){p.getFocusDomRef().focus();this.handleListNavigation(p,o);},onsapdown:function(o){p.getFocusDomRef().focus();this.handleListNavigation(p,o);}},this);},this);h.addDelegate({onsaptabnext:function(o){this.setValueStateActiveState(false);p.onsapfocusleave(o);this.getPopover().close();setTimeout(function(){p.closeValueStateMessage();},0);}},this);v[0].addDelegate({onsaptabprevious:function(o){o.preventDefault();p.getFocusDomRef().focus();this._getValueStateHeader().addStyleClass("sapMPseudoFocus");p.removeStyleClass("sapMFocus");}},this);};g.prototype.getValueStateLinks=function(){var h=this._getValueStateHeader(),F=h&&typeof h.getFormattedText==="function"&&h.getFormattedText(),i=F&&typeof F.getControls==="function"&&F.getControls();return i||[];};g.prototype._alignValueStateStyles=function(v){var p=C+"ValueState",o=C+this._sOldValueState+"State",h=C+v+"State",P=this.getPopover();P.addStyleClass(p);P.removeStyleClass(o);P.addStyleClass(h);this._sOldValueState=v;};g.prototype.decorateParent=function(p){p.addEventDelegate({onsaptabnext:this._handleValueStateLinkNav.bind(this,p),onsaptabprevious:this._handleValueStateLinkNav.bind(this,p)},this);};g.prototype.getInput=function(){return null;};g.prototype.getPickerTitle=function(){return null;};g.prototype.getOkButton=function(){return null;};g.prototype.getCancelButton=function(){return null;};g.prototype.getFilterSelectedButton=function(){return null;};g.prototype.setOkPressHandler=function(){return null;};g.prototype.setCancelPressHandler=function(){return null;};g.prototype.setShowSelectedPressHandler=function(){return null;};g.prototype.resizePopup=function(){};g.prototype._getValueStateHeader=function(){return null;};g.prototype._createValueStateHeader=function(){return null;};return g;});
