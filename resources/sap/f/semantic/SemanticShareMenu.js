/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/IconPool","sap/ui/base/EventProvider","sap/ui/base/ManagedObjectObserver","sap/ui/core/library","sap/m/library","sap/m/OverflowToolbarButton","sap/m/OverflowToolbarLayoutData","./SemanticContainer"],function(I,E,M,c,m,O,a,S){"use strict";var B=m.ButtonType;var A=c.aria.HasPopup;var b=S.extend("sap.f.semantic.SemanticShareMenu",{constructor:function(C,p){S.call(this,C,p);this._aShareMenuActions=[];this._aCustomShareActions=[];this._oObserver=new M(b.prototype._onShareMenuButtonChanges.bind(this));this._onShareButtonClickRef=this._onShareButtonClick.bind(this);this._setMode(b._Mode.initial);}});b._Mode={initial:"initial",menu:"menu"};b.prototype.addCustomAction=function(C){this._onControlAdded(C);this._oObserver.observe(C,{properties:["visible"]});this._callContainerAggregationMethod("insertButton",C,this._getCustomActionInsertIndex());this._aCustomShareActions.push(C);return this;};b.prototype.insertCustomAction=function(C,i){if(this._aCustomShareActions.indexOf(C)<0){this._onControlAdded(C);this._oObserver.observe(C,{properties:["visible"]});this._aCustomShareActions.splice(i,0,C);}this._callContainerAggregationMethod("insertButton",C,this._getCustomActionInsertIndex(i));return this;};b.prototype.getCustomActions=function(){return this._aCustomShareActions;};b.prototype.indexOfCustomAction=function(C){return this._aCustomShareActions.indexOf(C);};b.prototype.removeCustomAction=function(C){var r=this._callContainerAggregationMethod("removeButton",C);this._oObserver.unobserve(C,{properties:["visible"]});this._aCustomShareActions.splice(this._aCustomShareActions.indexOf(C),1);this._onControlRemoved();return r;};b.prototype.removeAllCustomActions=function(){var r=[];this._aCustomShareActions.forEach(function(C){var R=this._callContainerAggregationMethod("removeButton",C);if(R){r.push(C);}},this);this._aCustomShareActions=[];this._onControlRemoved();return r;};b.prototype.destroyCustomActions=function(){this.removeAllCustomActions(true).forEach(function(C){C.destroy();});return this;};b.prototype.addContent=function(s){var C=this._getControl(s);if(this._aShareMenuActions.indexOf(s)<0){this._onControlAdded(C);this._oObserver.observe(C,{properties:["visible"]});this._aShareMenuActions.push(s);}this._preProcessOverflowToolbarButton(C);this._callContainerAggregationMethod("insertButton",C,this._getSemanticActionInsertIndex(s));return this;};b.prototype.removeContent=function(s){var C=this._getControl(s);this._oObserver.unobserve(C,{properties:["visible"]});this._callContainerAggregationMethod("removeButton",C);this._aShareMenuActions.splice(this._aShareMenuActions.indexOf(s),1);this._postProcessOverflowToolbarButton(s);this._onControlRemoved();return this;};b.prototype.destroy=function(){if(this._oShareMenuBtn){this._oShareMenuBtn.destroy();}this._oShareMenuBtn=null;this._aShareMenuActions=null;this._aCustomShareActions=null;return S.prototype.destroy.call(this);};b.prototype.exit=function(){this._oObserver.disconnect();this._oObserver=null;};b.prototype._getMode=function(){return this._mode;};b.prototype._setMode=function(s){if(this._getMode()===s){return this;}if(s===b._Mode.initial){if(this._getMode()){this._fireContentChanged(true);}this._mode=b._Mode.initial;return this;}if(s===b._Mode.menu){this._mode=b._Mode.menu;this._fireContentChanged(false);}return this;};b.prototype._fireContentChanged=function(e){E.prototype.fireEvent.call(this._getParent(),"_shareMenuContentChanged",{"bEmpty":e});};b.prototype._onShareButtonClick=function(){var C=this._getContainer();C.openBy(this._oShareMenuBtn);};b.prototype._getVisibleActions=function(){var d=this._aShareMenuActions.concat(this._aCustomShareActions),v=d.map(function(o){return this._getControl(o);},this).filter(function(o){return o.getVisible();});return v;};b.prototype._onShareMenuButtonChanges=function(){var v=this._getVisibleActions();this._getShareMenuButton().setVisible(v.length>1);this.fireEvent("_visibleActionsChanged",{"visibleActionsCount":v.length});};b.prototype._getShareMenuButton=function(){var C=this._getContainer();if(!this._oShareMenuBtn){this._oShareMenuBtn=new O(C.getId()+"-shareButton",{ariaHasPopup:A.Menu,icon:I.getIconURI("action"),tooltip:sap.ui.getCore().getLibraryResourceBundle("sap.f").getText("SEMANTIC_CONTROL_ACTION_SHARE"),layoutData:new a({closeOverflowOnInteraction:false}),text:sap.ui.getCore().getLibraryResourceBundle("sap.f").getText("SEMANTIC_CONTROL_ACTION_SHARE"),type:B.Transparent,press:this._onShareButtonClickRef});}return this._oShareMenuBtn;};b.prototype._getCustomActionInsertIndex=function(i){var C=this._aCustomShareActions.length;if(i===undefined){return this._aShareMenuActions.length+C;}i=i>=C?C:i;i+=this._aShareMenuActions.length;return i;};b.prototype._getSemanticActionInsertIndex=function(s){this._aShareMenuActions.sort(this._sortControlByOrder.bind(this));return this._aShareMenuActions.indexOf(s);};b.prototype._onControlAdded=function(C){if(this._isInitialMode()){this._setMode(b._Mode.menu,C);}};b.prototype._onControlRemoved=function(){var i=this._aShareMenuActions.length,C=this._aCustomShareActions.length,e=(i+C)===0;if(this._isMenuMode()&&e){this._setMode(b._Mode.initial);}};b.prototype._preProcessOverflowToolbarButton=function(o){if(o instanceof O){o._bInOverflow=true;}};b.prototype._postProcessOverflowToolbarButton=function(o){if(o instanceof O){delete o._bInOverflow;}};b.prototype._isInitialMode=function(){return this._getMode()===b._Mode.initial;};b.prototype._isMenuMode=function(){return this._getMode()===b._Mode.menu;};return b;});
