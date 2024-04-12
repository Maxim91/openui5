/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/base/Object","sap/base/Log","sap/base/util/each","sap/ui/dom/includeStylesheet","./theming/ThemeHelper"],function(D,B,L,a,b,T){"use strict";var m=150;var c=B.extend("sap.ui.core.ThemeCheck",{constructor:function(C){this._oCore=C;this._iCount=0;this._CUSTOMCSSCHECK=/\.sapUiThemeDesignerCustomCss/i;this._CUSTOMID="sap-ui-core-customcss";this._customCSSAdded=false;this._themeCheckedForCustom=null;this._sFallbackTheme=null;this._mThemeFallback={};},getInterface:function(){return this;},fireThemeChangedEvent:function(o){d(this);j.apply(this,[true]);if(!o&&!this._sThemeCheckId){this._oCore.fireThemeChanged({theme:this._oCore.getConfiguration().getTheme()});}}});c.themeLoaded=false;function s(i){try{return i.cssRules;}catch(e){return null;}}function h(e){var C=s(e);return!!C&&C.length>0;}c.checkStyle=function(i,l){var S=document.getElementById(i);try{var n=false,k=false,o=false,I=false;n=!S;k=!!(S&&(S.getAttribute("data-sap-ui-ready")==="true"||S.getAttribute("data-sap-ui-ready")==="false"));o=!!(S&&S.sheet&&S.sheet.href===S.href&&h(S.sheet));I=!!(S&&S.innerHTML&&S.innerHTML.length>0);var r=n||o||I||k;if(l){L.debug("ThemeCheck: "+i+": "+r+" (noLinkElement: "+n+", sheet: "+o+", innerHtml: "+I+", linkElementFinishedLoading: "+k+")");}return r;}catch(e){if(l){L.error("ThemeCheck: "+i+": Error during check styles '"+i+"'",e);}}return false;};function d(t){c.themeLoaded=false;if(t._sThemeCheckId){clearTimeout(t._sThemeCheckId);t._sThemeCheckId=null;t._iCount=0;t._sFallbackTheme=null;t._mThemeFallback={};}}function f(t){var e=t._oCore.getLoadedLibraries();var k=t._oCore.getConfiguration().getTheme();var p=t._oCore._getThemePath("sap.ui.core",k)+"custom.css";var I=k.indexOf("sap_")===0||k==="base";var r=true;var F=[];if(t._customCSSAdded&&t._themeCheckedForCustom===k){e[t._CUSTOMID]={};}function n(P,q){var v=c.checkStyle(P+q,true);if(v){var O=document.querySelectorAll("link[data-sap-ui-foucmarker='"+P+q+"']");if(O.length>0){for(var i=0,l=O.length;i<l;i++){O[i].remove();}L.debug("ThemeCheck: Old stylesheets removed for library: "+q);}}return v;}function o(l){var S="sap-ui-theme-"+l;var i=n("sap-ui-theme-",l);if(i&&document.getElementById("sap-ui-themeskeleton-"+l)){i=n("sap-ui-themeskeleton-",l);}r=r&&i;if(r){if(t._themeCheckedForCustom!=k){if(!I&&g(t,l)){var C=p;var v=t._oCore._getLibraryCssQueryParams(e["sap.ui.core"]);if(v){C+=v;}b(C,t._CUSTOMID);t._customCSSAdded=true;L.debug("ThemeCheck: delivered custom CSS needs to be loaded, Theme not yet applied");t._themeCheckedForCustom=k;r=false;return false;}else{var w=document.querySelector("LINK[id='"+t._CUSTOMID+"']");if(w){w.remove();L.debug("ThemeCheck: Custom CSS removed");}t._customCSSAdded=false;}}}if(!I&&i&&!t._mThemeFallback[l]){var x=document.getElementById(S);if(x&&x.getAttribute("data-sap-ui-ready")==="false"&&!(x.sheet&&h(x.sheet))){F.push(l);}}}a(e,o);if(F.length>0){if(!t._sFallbackTheme){for(var q in e){var u=T.getMetadata(q);if(u&&u.Extends&&u.Extends[0]){t._sFallbackTheme=u.Extends[0];break;}}}if(t._sFallbackTheme){F.forEach(function(l){var S="sap-ui-theme-"+l;var i=document.getElementById(S);L.warning("ThemeCheck: Custom theme '"+k+"' could not be loaded for library '"+l+"'. "+"Falling back to its base theme '"+t._sFallbackTheme+"'.");t._oCore._updateThemeUrl(i,t._sFallbackTheme);t._mThemeFallback[l]=true;});r=false;}}if(!r){L.debug("ThemeCheck: Theme not yet applied.");}else{t._themeCheckedForCustom=k;}return r;}function g(t,l){var k=window.document.getElementById("sap-ui-theme-"+l);if(!k){return false;}var n=window.getComputedStyle(k,':after');var o=n?n.getPropertyValue('content'):null;if(!o&&D.browser.safari){var p=document.documentElement;p.classList.add("sapUiThemeDesignerCustomCss");o=window.getComputedStyle(p,":after").getPropertyValue("content");p.classList.remove("sapUiThemeDesignerCustomCss");}if(o&&o!=="none"){try{if(o[0]==="'"||o[0]==='"'){o=o.substring(1,o.length-1);}return o==="true";}catch(e){L.error("Custom check: Error parsing JSON string for custom.css indication.",e);}}var r=k.sheet?s(k.sheet):null;if(!r||r.length===0){L.warning("Custom check: Failed retrieving a CSS rule from stylesheet "+l);return false;}for(var i=0;(i<2&&i<r.length);i++){if(t._CUSTOMCSSCHECK.test(r[i].selectorText)){return true;}}return false;}function j(F){this._iCount++;var e=this._iCount>m;if(!f(this)&&!e){var i;if(this._iCount<=100){i=2;}else if(this._iCount<=110){i=500;}else{i=1000;}this._sThemeCheckId=setTimeout(j.bind(this),i);}else if(!F){d(this);c.themeLoaded=true;this._oCore.fireThemeChanged({theme:this._oCore.getConfiguration().getTheme()});if(e){L.error("ThemeCheck: max. check cycles reached.");}}else{c.themeLoaded=true;}}return c;});