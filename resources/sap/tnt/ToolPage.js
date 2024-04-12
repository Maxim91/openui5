/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/base/ManagedObjectObserver","sap/ui/core/Control","sap/ui/Device","sap/ui/core/ResizeHandler","./ToolPageRenderer"],function(l,M,C,D,R,T){"use strict";var a=C.extend("sap.tnt.ToolPage",{metadata:{library:"sap.tnt",properties:{sideExpanded:{type:"boolean",group:"Misc",defaultValue:true}},aggregations:{header:{type:"sap.tnt.IToolHeader",multiple:false},subHeader:{type:"sap.tnt.IToolHeader",multiple:false},sideContent:{type:"sap.tnt.SideNavigation",multiple:false},mainContents:{type:"sap.ui.core.Control",multiple:true,singularName:"mainContent"}},events:{}}});a.prototype.init=function(){this._oContentObserver=new M(this._onContentChange.bind(this));this._oContentObserver.observe(this,{aggregations:["subHeader","sideContent"]});this._oContentVisibilityObserver=new M(this._onContentVisibilityChange.bind(this));this._deregisterControl();};a.prototype.exit=function(){this._deregisterControl();if(this._oContentObserver){this._oContentObserver.disconnect();this._oContentObserver=null;}if(this._oContentVisibilityObserver){this._oContentVisibilityObserver.disconnect();this._oContentVisibilityObserver=null;}};a.prototype.onBeforeRendering=function(){this._deregisterControl();};a.prototype.onAfterRendering=function(){this._ResizeHandler=R.register(this.getDomRef(),this._mediaQueryHandler.bind(this));this._updateLastMediaQuery();};a.prototype.toggleSideContentMode=function(){return this.setSideExpanded(!this.getSideExpanded());};a.prototype.setSideExpanded=function(s){this.setProperty("sideExpanded",s,true);var S=this.getSideContent();if(S){var n=D.system.phone?true:s;S.setExpanded(n);}else{return this;}var d=this.getDomRef();if(!d){return this;}if(s){d.querySelector(".sapTntToolPageContentWrapper").classList.remove("sapTntToolPageAsideCollapsed");}else{d.querySelector(".sapTntToolPageContentWrapper").classList.add("sapTntToolPageAsideCollapsed");}return this;};a.prototype._deregisterControl=function(){if(this._ResizeHandler){R.deregister(this._ResizeHandler);this._ResizeHandler=null;}};a.prototype._mediaQueryHandler=function(){var s=this.getSideContent();if(s===null){return;}this._currentMediaQuery=this._getDeviceAsString();if(this._getLastMediaQuery()===this._currentMediaQuery){return;}switch(this._currentMediaQuery){case"Combi":this.setSideExpanded(true);break;case"Tablet":this.setSideExpanded(false);break;case"Phone":this.setSideExpanded(false);s.setExpanded(true);break;default:this.setSideExpanded(true);}this._updateLastMediaQuery();};a.prototype._getLastMediaQuery=function(){return this._lastMediaQuery;};a.prototype._updateLastMediaQuery=function(){this._lastMediaQuery=this._getDeviceAsString();return this;};a.prototype._getDeviceAsString=function(){if(D.system.combi){return"Combi";}if(D.system.phone){return"Phone";}if(D.system.tablet){return"Tablet";}return"Desktop";};a.prototype._onContentChange=function(c){switch(c.mutation){case"insert":this._oContentVisibilityObserver.observe(c.child,{properties:["visible"]});break;case"remove":this._oContentVisibilityObserver.unobserve(c.child,{properties:["visible"]});break;}};a.prototype._onContentVisibilityChange=function(c){this.invalidate();};return a;});
