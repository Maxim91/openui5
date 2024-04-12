/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core","sap/ui/core/Popup","../Plugin","../Support","sap/ui/thirdparty/jquery","sap/base/util/uid"],function(C,P,a,S,q,u){"use strict";var b=a.extend("sap.ui.core.support.plugins.Selector",{constructor:function(s){a.apply(this,["sapUiSupportSelector","",s]);this._aEventIds=[this.getId()+"Highlight"];this._oPopup=new P();}});b.prototype.isToolPlugin=function(){return false;};b.prototype.onsapUiSupportSelectorHighlight=function(e){h(e.getParameter("id"),this,e.getParameter("sendInfo"));};b.prototype.init=function(s){a.prototype.init.apply(this,arguments);var p;if(!this._sPopupId){this._sPopupId=this.getId()+"-"+u();var r=C.createRenderManager();r.openStart("div",this._sPopupId).style("border","2px solid rgb(0, 128, 0)").style("background-color","rgba(0, 128, 0, .55)").openEnd().close("div");r.flush(C.getStaticAreaRef(),false,true);r.destroy();p=q(document.getElementById(this._sPopupId));this._oPopup.setContent(p[0]);}else{p=q(document.getElementById(this._sPopupId));}var t=this;this._fSelectHandler=function(e){if(!e.shiftKey||!e.altKey||!e.ctrlKey){return;}var i=q(e.target).closest("[data-sap-ui]").attr("id");if(h(i,t,true)){e.stopPropagation();e.preventDefault();}};this._fCloseHandler=function(e){t._oPopup.close(0);};p.on("click",this._fCloseHandler);q(document).on("mousedown",this._fSelectHandler);};b.prototype.exit=function(s){this._oPopup.close(0);if(this._fCloseHandler){q(document.getElementById(this._sPopupId)).off("click",this._fCloseHandler);this._fCloseHandler=null;}if(this._fSelectHandler){q(document).off("mousedown",this._fSelectHandler);this._fSelectHandler=null;}a.prototype.exit.apply(this,arguments);};function h(i,p,s){if(i){var e=C.byId(i);if(e){var j=q(document.getElementById(p._sPopupId));var r=e.$();if(r.is(":visible")){j.width(r.outerWidth());j.height(r.outerHeight());p._oPopup.open(0,"BeginTop","BeginTop",r[0],"0 0","none");if(s){S.getStub().sendEvent(p.getId()+"Select",g(e,p));}setTimeout(function(){p._oPopup.close(0);},1000);return true;}}}return false;}function g(e,p){return{"id":e.getId()};}return b;});