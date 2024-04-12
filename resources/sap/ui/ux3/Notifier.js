/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/thirdparty/jquery','sap/ui/commons/Callout','sap/ui/core/Element','./library','sap/ui/core/library','sap/ui/Device','sap/base/Log',"sap/ui/base/EventProvider"],function(q,C,E,l,c,D,L,a){"use strict";var M=c.MessageType;var N=E.extend("sap.ui.ux3.Notifier",{metadata:{deprecated:true,library:"sap.ui.ux3",properties:{icon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},title:{type:"string",group:"Misc",defaultValue:null}},aggregations:{messages:{type:"sap.ui.core.Message",multiple:true,singularName:"message"},views:{type:"sap.ui.core.Control",multiple:true,singularName:"view",visibility:"hidden"}},events:{messageSelected:{parameters:{message:{type:"sap.ui.core.Message"},notifier:{type:"sap.ui.ux3.Notifier"}}}}}});var b=function(){this.fireEvent("_childControlCalling",{type:"openCallout",callout:this._oCallout,notifier:this});};var f=function(o){if(o.getSource()){o.getSource().destroyContent();}if(this._oCallout){this._oCallout.$().css("display","none");}};N.prototype.hasItems=function(){if(this.getMessages().length>0){return true;}return false;};N.prototype.init=function(){this._oCallout=new C(this.getId()+"-callout",{beforeOpen:q.proxy(b,this),open:function(o){this.$().css({position:"fixed",display:"block"});},close:q.proxy(f,this),collision:"none"});this._oCallout.addStyleClass("sapUiNotifierCallout");if(D.browser.mobile){this._oCallout.setOpenDelay(0);}this._oCallout.setMyPosition("begin bottom");this._oCallout.setAtPosition("begin top");this._oCallout.setTip=function(){C.prototype.setTip.apply(this,arguments);var $=this.$("arrow");$.css("bottom","-24px");var r=sap.ui.getCore().getConfiguration().getRTL();if(!r){$.css("left","6px");}};this.setTooltip(this._oCallout);this.setTooltip=function(){L.warning("Setting toolstips for notifiers deactivated");return this;};this._proxyEnableMessageSelect=q.proxy(e,this);this.attachEvent(a.M_EVENTS.EventHandlerChange,this._proxyEnableMessageSelect);};var e=function(o){var s=o.getParameter("EventId");if(s==="messageSelected"){if(o.getParameter("type")==="listenerAttached"){this._bEnableMessageSelect=true;}else if(o.getParameter("type")==="listenerDetached"){this._bEnableMessageSelect=false;}this.fireEvent("_enableMessageSelect",{enabled:this._bEnableMessageSelect,notifier:this});}};N.prototype.exit=function(o){this._oCallout=undefined;if(this._oMessageView){this._oMessageView.destroy();delete this._oMessageView;}this.detachEvent(a.M_EVENTS.EventHandlerChange,this._proxyEnableMessageSelect);delete this._proxyEnableMessageSelect;};N.prototype.onclick=function(o){o.preventDefault();this.$().trigger("mouseover");};var F=function(t,m,T){var s=m?m.getLevel():M.None;T.fireEvent("_childControlCalling",{type:t,notifier:T,level:s,message:m,callout:T._oCallout});};N.prototype.addMessage=function(m){this.addAggregation("messages",m);F("added",m,this);return this;};N.prototype.insertMessage=function(m,i){this.insertAggregation("messages",m,i);F("added",m,this);return this;};N.prototype.removeMessage=function(m){var r=this.removeAggregation("messages",m);if(r){F("removed",r,this);}return r;};N.prototype.removeAllMessages=function(){var r=this.removeAllAggregation("messages");if(r.length>0){F("removed",null,this);}return r;};N.prototype.destroyMessages=function(){var i=this.getMessages().length;this.destroyAggregation("messages");if(i>0){F("removed",null,this);}return this;};return N;});
