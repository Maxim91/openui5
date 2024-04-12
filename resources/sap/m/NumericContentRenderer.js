/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library"],function(l){"use strict";var r=sap.ui.getCore().getLibraryResourceBundle("sap.m");var D=l.DeviationIndicator,L=l.LoadState,V=l.ValueColor;var N={apiVersion:2};N.render=function(R,c){var s=c.getState();var w=c.getWithMargin();var W=w?"":"WithoutMargin";R.openStart("div",c);var t=c.getTooltip_AsString();if(typeof t!=="string"){t="";}R.attr("aria-label",t);R.attr("role","img");R.attr("aria-roledescription",r.getText("NUMERIC_CONTENT_ROLE_DESCRIPTION"));if(s===L.Failed||s===L.Loading){R.attr("aria-disabled","true");}if(c.getAnimateTextChange()){R.class("sapMNCAnimation");}if(c.getWidth()){R.style("width",c.getSize());}R.class("sapMNC");R.class(W);if(c.hasListeners("press")){R.attr("tabindex",0);R.class("sapMPointer");}R.openEnd();R.openStart("div");R.class("sapMNCInner");R.class(W);R.openEnd();this._renderValue(R,c,W);R.close("div");R.close("div");};N._prepareAndRenderIcon=function(R,c,i,n){if(i){var s,C=c.getState();for(s in L){if(L.hasOwnProperty(s)&&s!==C){i.removeStyleClass(s);}else if(L.hasOwnProperty(s)&&s===C){i.addStyleClass(s);}}i.addStyleClass("sapMNCIconImage");var S={sapMNCLargeFontSize:false,sapMNCMediumFontSize:false,sapMNCSmallFontSize:false};S[n]=true;Object.keys(S).forEach(function(k){i.toggleStyleClass(k,S[k]);});R.renderControl(i);}};N._renderScaleAndIndicator=function(R,c,w,v,s,n){var i=D.None!==c.getIndicator()&&v!=="";var S=s&&v;if(i||S){var a=c.getState();var C=c.getValueColor();R.openStart("div",c.getId()+"-indicator");R.class("sapMNCIndScale");R.class(w);R.class(a);R.class(a);if(n){R.class(n);}R.openEnd();R.renderControl(c._oIndicatorIcon);if(S){R.openStart("div",c.getId()+"-scale");R.class("sapMNCScale");R.class(a);R.class(C);R.openEnd();R.text(s);R.close("div");}R.close("div");}};N._renderValue=function(R,c,w){var v=c.getValue();var s=c.getScale();if(c.getFormatterValue()){var f=c._parseFormattedValue(v);s=f.scale;v=f.value;}var e=c.getNullifyValue()?"0":"";R.openStart("div",c.getId()+"-value");R.class("sapMNCValue");R.class(w);if(c.getValueColor()===V.None){R.class("Neutral");}else{R.class(c.getValueColor());}R.class(c.getState());R.openEnd();if(c.getState()===L.Loading){R.openStart("div").class("sapMNCContentShimmerPlaceholderItem");R.openEnd();R.openStart("div").class("sapMNCContentShimmerPlaceholderRows").openEnd();R.openStart("div").class("sapMNCContentShimmerPlaceholderItemHeader").class("sapMNCLoadingShimmer").openEnd().close("div");R.close("div");R.close("div");R.close("div");}else{var m=c._getMaxDigitsData();this._prepareAndRenderIcon(R,c,c._oIcon,m.fontClass);var C=c.getTruncateValueTo()||m.maxLength;R.openStart("span",c.getId()+"-value-inner");if(m.fontClass){R.class(m.fontClass);}R.openEnd();if(v.length>=C&&(v[C-1]==="."||v[C-1]===",")){R.text(v.substring(0,C-1));}else{R.text(v?v.substring(0,C):e);}R.close("span");this._renderScaleAndIndicator(R,c,w,v,s,m.fontClass);R.close("div");}};return N;},true);