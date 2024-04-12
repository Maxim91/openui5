/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/Core","sap/ui/core/IntervalTrigger","sap/ui/core/format/DateFormat","sap/ui/core/date/UniversalDate","sap/ui/core/InvisibleText","sap/m/Text"],function(C,a,I,D,U,b,T){"use strict";var c=60000;var B=C.extend("sap.f.cards.BaseHeader",{metadata:{library:"sap.f","abstract":true,properties:{dataTimestamp:{type:"string",defaultValue:""},dataTimestampUpdating:{type:"boolean",defaultValue:false,visibility:"hidden"},focusable:{type:"boolean",defaultValue:true,visibility:"hidden"}},aggregations:{_dataTimestamp:{type:"sap.m.Text",multiple:false,visibility:"hidden"},toolbar:{type:"sap.ui.core.Control",multiple:false},_error:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}}}});B.prototype.init=function(){this._oRb=a.getLibraryResourceBundle("sap.f");this._oToolbarDelegate={onfocusin:this._onToolbarFocusin,onfocusout:this._onToolbarFocusout};};B.prototype.exit=function(){this._removeTimestampListener();if(this._oToolbarDelegate){this._oToolbarDelegate=null;}this._oRb=null;};B.prototype.onBeforeRendering=function(){var t=this.getToolbar();if(t){t.addStyleClass("sapFCardHeaderToolbar");t.removeEventDelegate(this._oToolbarDelegate,this);}};B.prototype.onAfterRendering=function(){var t=this.getToolbar();if(t){t.addEventDelegate(this._oToolbarDelegate,this);}};B.prototype.getFocusDomRef=function(){return this.getDomRef("focusable");};B.prototype._onToolbarFocusin=function(){var d=this.getDomRef();if(d){this.getDomRef().classList.add("sapFCardHeaderToolbarFocused");}};B.prototype._onToolbarFocusout=function(){var d=this.getDomRef();if(d){this.getDomRef().classList.remove("sapFCardHeaderToolbarFocused");}};B.prototype.setDataTimestamp=function(d){var o=this.getDataTimestamp();if(o&&!d){this.destroyAggregation("_dataTimestamp");this._removeTimestampListener();}this.setProperty("dataTimestamp",d);if(d){this._updateDataTimestamp();this._addTimestampListener();}return this;};B.prototype.setDataTimestampUpdating=function(d){var t=this._createDataTimestamp();this.setProperty("dataTimestampUpdating",d);if(d){t.setText("updating...");t.addStyleClass("sapFCardDataTimestampUpdating");this._removeTimestampListener();}else{t.removeStyleClass("sapFCardDataTimestampUpdating");}return this;};B.prototype._createDataTimestamp=function(){var d=this.getAggregation("_dataTimestamp");if(!d){d=new T({wrapping:false,textAlign:"End"});d.addStyleClass("sapFCardDataTimestamp");this.setAggregation("_dataTimestamp",d);}return d;};B.prototype._updateDataTimestamp=function(){var d=this._createDataTimestamp(),s=this.getDataTimestamp(),o,u,f;if(!s){d.setText("");return;}o=D.getDateTimeInstance({relative:true});u=new U(s);f=o.format(u);if(u.getTime()+59000>(new Date()).getTime()){f="now";}d.setText(f);d.removeStyleClass("sapFCardDataTimestampUpdating");};B.prototype._addTimestampListener=function(){B.getTimestampIntervalTrigger().addListener(this._updateDataTimestamp,this);this._bHasTimestampListener=true;};B.prototype._removeTimestampListener=function(){if(!this._bHasTimestampListener){return;}B.getTimestampIntervalTrigger().removeListener(this._updateDataTimestamp,this);this._bHasTimestampListener=false;};B.getTimestampIntervalTrigger=function(){if(!B._oTimestampIntervalTrigger){B._oTimestampIntervalTrigger=new I(c);}return B._oTimestampIntervalTrigger;};B.prototype.getAriaRole=function(){return"group";};B.prototype.getTitleAriaRole=function(){return"heading";};B.prototype.getFocusableElementAriaRole=function(){return this.hasListeners("press")?"button":null;};B.prototype.getAriaHeadingLevel=function(){return"3";};B.prototype.getAriaRoleDescription=function(){return this.hasListeners("press")?this._oRb.getText("ARIA_ROLEDESCRIPTION_INTERACTIVE_CARD_HEADER"):this._oRb.getText("ARIA_ROLEDESCRIPTION_CARD_HEADER");};B.prototype._isInsideGridContainer=function(){var p=this.getParent();if(!p){return false;}p=p.getParent();if(!p){return false;}return p.isA("sap.f.GridContainer");};return B;});
