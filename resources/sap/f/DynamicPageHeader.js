/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/Device","sap/ui/core/Control","sap/ui/core/library","sap/m/ToggleButton","sap/m/Button","./DynamicPageHeaderRenderer","sap/ui/core/InvisibleMessage"],function(l,D,C,a,T,B,b,I){"use strict";var c=a.InvisibleMessageMode;var d=C.extend("sap.f.DynamicPageHeader",{metadata:{library:"sap.f",properties:{pinnable:{type:"boolean",group:"Appearance",defaultValue:true},backgroundDesign:{type:"sap.m.BackgroundDesign",group:"Appearance"}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true},_pinButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_collapseButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"}},designtime:"sap/f/designtime/DynamicPageHeader.designtime"}});d._getResourceBundle=function(){return sap.ui.getCore().getLibraryResourceBundle("sap.f");};d.ARIA={ARIA_CONTROLS:"aria-controls",ARIA_LABEL:"aria-label",LABEL_EXPANDED:d._getResourceBundle().getText("EXPANDED_HEADER"),LABEL_COLLAPSED:d._getResourceBundle().getText("SNAPPED_HEADER"),LABEL_PINNED:d._getResourceBundle().getText("PIN_HEADER"),TOOLTIP_COLLAPSE_BUTTON:d._getResourceBundle().getText("COLLAPSE_HEADER_BUTTON_TOOLTIP"),STATE_TRUE:"true",STATE_FALSE:"false"};d.prototype.init=function(){this._bShowCollapseButton=true;this._oInvisibleMessage=null;};d.prototype.onAfterRendering=function(){this._initARIAState();this._initPinButtonARIAState();if(!this._oInvisibleMessage){this._oInvisibleMessage=I.getInstance();}};d.prototype._togglePinButton=function(v){this._getPinButton().setPressed(v);};d.prototype._setShowPinBtn=function(v){this._getPinButton().$().toggleClass("sapUiHidden",!v);};d.prototype._pinUnpinFireEvent=function(){this.fireEvent("_pinUnpinPress");};d.prototype._onCollapseButtonPress=function(){this.fireEvent("_headerVisualIndicatorPress");};d.prototype._onCollapseButtonMouseOver=function(){this.fireEvent("_visualIndicatorMouseOver");};d.prototype._onCollapseButtonMouseOut=function(){this.fireEvent("_visualIndicatorMouseOut");};d.prototype._initARIAState=function(){var $=this.$();$.attr(d.ARIA.ARIA_LABEL,d.ARIA.LABEL_EXPANDED);};d.prototype._initPinButtonARIAState=function(){var $;if(this.getPinnable()){$=this._getPinButtonJQueryRef();$.attr(d.ARIA.ARIA_CONTROLS,this.getId());}};d.prototype._updateARIAState=function(e){var $=this.$();if(e){$.attr(d.ARIA.ARIA_LABEL,d.ARIA.LABEL_EXPANDED);}else{$.attr(d.ARIA.ARIA_LABEL,d.ARIA.LABEL_COLLAPSED);}};d.prototype._getPinButton=function(){if(!this.getAggregation("_pinButton")){var p=new T({id:this.getId()+"-pinBtn",icon:"sap-icon://pushpin-off",tooltip:d.ARIA.LABEL_PINNED,press:this._pinUnpinFireEvent.bind(this)}).addStyleClass("sapFDynamicPageHeaderPinButton");this.setAggregation("_pinButton",p,true);}return this.getAggregation("_pinButton");};d.prototype._getCollapseButton=function(){if(!this.getAggregation("_collapseButton")){var o=new B({id:this.getId()+"-collapseBtn",icon:"sap-icon://slim-arrow-up",press:this._onCollapseButtonPress.bind(this),tooltip:d.ARIA.TOOLTIP_COLLAPSE_BUTTON}).addStyleClass("sapFDynamicPageToggleHeaderIndicator");o.onmouseover=this._onCollapseButtonMouseOver.bind(this);o.onmouseout=this._onCollapseButtonMouseOut.bind(this);this.setAggregation("_collapseButton",o,true);}return this.getAggregation("_collapseButton");};d.prototype._toggleCollapseButton=function(t){this._setShowCollapseButton(t);this._getCollapseButton().$().toggleClass("sapUiHidden",!t);};d.prototype._getShowCollapseButton=function(){return this._bShowCollapseButton&&!!this.getContent().length;};d.prototype._setShowCollapseButton=function(v){this._bShowCollapseButton=!!v;};d.prototype._focusCollapseButton=function(){var t=this._getCollapseButton().getTooltip()+" "+d._getResourceBundle().getText("EXPANDED_HEADER");this._getCollapseButton().$().trigger("focus");this._oInvisibleMessage.announce(t,c.Polite);};d.prototype._focusPinButton=function(){this._getPinButtonJQueryRef().trigger("focus");};d.prototype._getPinButtonJQueryRef=function(){return this._getPinButton().$();};d.prototype._getState=function(){var e=this.getContent(),h=e.length>0,H=this.getPinnable()&&h&&!D.system.phone,p=this._getPinButton(),o=this._getCollapseButton();o.toggleStyleClass("sapUiHidden",!this._getShowCollapseButton());return{content:e,headerHasContent:h,headerPinnable:H,hasContent:e.length>0,pinButton:p,collapseButton:o};};return d;});
