/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/core/Core","sap/ui/core/InvisibleText","sap/ui/core/library"],function(D,C,I,c){"use strict";var H=c.aria.HasPopup;var S={apiVersion:2};S.render=function(r,s){if(!s.getVisible()){return;}var p=s.getPlaceholder()||C.getLibraryResourceBundle("sap.m").getText("FACETFILTER_SEARCH",true),v=s.getValue(),w=s.getProperty("width"),i=s.getId(),b=s.getShowRefreshButton(),a=s.getShowSearchButton(),A={describedby:{value:S._getDescribedBy(s),append:true}},t,R=s.getRefreshButtonTooltip(),d;r.openStart("div",s).class("sapMSF");if(w){r.style("width",w);}if(v){r.class("sapMSFVal");}if(!s.getEnabled()){r.class("sapMSFDisabled");}r.openEnd();r.openStart('form',i+"-F").class('sapMSFF');if(!a){r.class("sapMSFNS");}else if(b){r.class('sapMSFReload');}r.openEnd();r.voidStart('input',i+"-I").class("sapMSFI").attr("type","search").attr("autocomplete","off");if(s.getEnableSuggestions()){r.attr("aria-haspopup",H.ListBox.toLowerCase());}if(D.browser.safari){r.attr("autocorrect","off");}var T=s.getTooltip_AsString();if(T){r.attr("title",T);}if(s.getEnableSuggestions()&&D.system.phone){r.attr("inputmode","none");}if(!s.getEnabled()){r.attr("disabled","disabled");}if(p){r.attr("placeholder",p);}if(s.getMaxLength()){r.attr("maxLength",s.getMaxLength());}r.attr("value",v);A.disabled=null;r.accessibilityState(s,A);r.voidEnd();if(s.getEnabled()){r.openStart("div",i+"-reset").class("sapMSFR").class("sapMSFB").attr("aria-hidden",true);d=v===""?this.oSearchFieldToolTips.SEARCH_BUTTON_TOOLTIP:this.oSearchFieldToolTips.RESET_BUTTON_TOOLTIP;r.attr("title",d);if(D.browser.firefox){r.class("sapMSFBF");}if(!a){r.class("sapMSFNS");}r.openEnd().close("div");if(a){r.openStart("div",i+"-search").class("sapMSFS").class("sapMSFB").attr("aria-hidden",true);if(D.browser.firefox){r.class("sapMSFBF");}if(b){t=R===""?this.oSearchFieldToolTips.REFRESH_BUTTON_TOOLTIP:R;}else{t=this.oSearchFieldToolTips.SEARCH_BUTTON_TOOLTIP;}r.attr("title",t).openEnd().close("div");}}r.close("form");if(s.getEnableSuggestions()){r.openStart("span",i+"-SuggDescr").class("sapUiPseudoInvisibleText").attr("role","status").attr("aria-live","polite").openEnd().close("span");}r.close("div");};S._getDescribedBy=function(s){var d=I.getStaticId("sap.m","SEARCHFIELD_ARIA_DESCRIBEDBY");if(s.getEnabled()&&s.getShowRefreshButton()){d+=" "+I.getStaticId("sap.m","SEARCHFIELD_ARIA_F5");}return d;};return S;},true);