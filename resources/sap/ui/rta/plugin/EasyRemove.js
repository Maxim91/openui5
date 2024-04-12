/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/rta/plugin/Remove","sap/m/Button","sap/ui/thirdparty/jquery"],function(R,B,q){"use strict";var E=R.extend("sap.ui.rta.plugin.EasyRemove",{metadata:{library:"sap.ui.rta",properties:{},associations:{},events:{}}});E.prototype.registerElementOverlay=function(o){var c=o.getElement();if(c.getMetadata().getName()==="sap.uxap.ObjectPageSection"&&this.hasStableId(o)){o.addStyleClass("sapUiRtaPersDelete");}if(o.hasStyleClass("sapUiRtaPersDelete")&&o.$().children(".sapUiRtaPersDeleteClick").length<=0){var a=function(o){this.handler([o]);}.bind(this);var d=this._addButton(o);d.attachBrowserEvent("contextmenu",function(e){e.stopPropagation();e.preventDefault();});var O=function(e){var o=sap.ui.getCore().byId(e.currentTarget.id.replace("-DeleteIcon",""));a(o);e.stopPropagation();e.preventDefault();};d.attachBrowserEvent("click",O).attachBrowserEvent("tap",O);}R.prototype.registerElementOverlay.apply(this,arguments);};E.prototype._isEditable=function(o){if(o._oDeleteButton){o._oDeleteButton.setEnabled(this.isEnabled([o]));}return R.prototype._isEditable.apply(this,arguments);};E.prototype._addButton=function(o){var e=this.isEnabled([o]);var i=o.getId()+"-DeleteIcon";var h=q("<div class='sapUiRtaPersDeleteClick' draggable='true'> </div>");var H=q("<div class='sapUiRtaPersDeleteIconOuter'> </div>");o._oDeleteButton=new B(i,{icon:"sap-icon://less",tooltip:sap.ui.getCore().getLibraryResourceBundle("sap.ui.rta").getText("CTX_REMOVE"),enabled:e}).placeAt(H.get(0));h.append(H);o.$().append(h);h[0].addEventListener("dragstart",function(a){a.stopPropagation();a.preventDefault();});return o._oDeleteButton;};E.prototype.deregisterElementOverlay=function(o){var c=o.getElement();if(c.getMetadata().getName()==="sap.uxap.ObjectPageSection"){o.removeStyleClass("sapUiRtaPersDelete");if(o._oDeleteButton){o._oDeleteButton.destroy();}}};return E;});
