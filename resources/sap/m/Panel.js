/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library','sap/ui/core/Control','sap/ui/core/IconPool','sap/ui/Device','./PanelRenderer','sap/m/Button'],function(l,C,I,D,P,B){"use strict";var a=l.PanelAccessibleRole;var b=l.BackgroundDesign;var c=l.ButtonType;var d=C.extend("sap.m.Panel",{metadata:{library:"sap.m",properties:{headerText:{type:"string",group:"Data",defaultValue:""},width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"100%"},height:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"auto"},expandable:{type:"boolean",group:"Appearance",defaultValue:false},expanded:{type:"boolean",group:"Appearance",defaultValue:false},expandAnimation:{type:"boolean",group:"Behavior",defaultValue:true},backgroundDesign:{type:"sap.m.BackgroundDesign",group:"Appearance",defaultValue:b.Translucent},accessibleRole:{type:"sap.m.PanelAccessibleRole",group:"Accessibility",defaultValue:a.Form}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"},headerToolbar:{type:"sap.m.Toolbar",multiple:false},infoToolbar:{type:"sap.m.Toolbar",multiple:false}},events:{expand:{parameters:{expand:{type:"boolean"},triggeredByInteraction:{type:"boolean"}}}},dnd:{draggable:true,droppable:true},designtime:"sap/m/designtime/Panel.designtime"}});d.prototype.init=function(){this._bInteractiveExpand=false;this.data("sap-ui-fastnavgroup","true",true);};d.prototype.onThemeChanged=function(){this._setContentHeight();};d.prototype.setExpanded=function(e){var t=this;if(e===this.getExpanded()){return this;}this.setProperty("expanded",e,true);if(!this.getExpandable()){return this;}this._toggleExpandCollapse(function(){t.invalidate();});this._toggleButtonIcon(e);this.fireExpand({expand:e,triggeredByInteraction:this._bInteractiveExpand});this._bInteractiveExpand=false;return this;};d.prototype.onBeforeRendering=function(){if(this.getExpandable()&&!this._oExpandButton){this._oExpandButton=this._createExpandButton();}if(sap.ui.getCore().getConfiguration().getAccessibility()){this.$().attr("role",this.getAccessibleRole().toLowerCase());}};d.prototype.onAfterRendering=function(){var $=this.$(),p=this.getDomRef("content"),h,o=this.getDomRef();if(o){o.style.width=this.getWidth();h=this.getHeight();o.style.height=h;if(parseFloat(h)!=0){o.querySelector(".sapMPanelContent").style.height=h;}}this._setContentHeight();if(this.getExpandable()){this.getHeaderToolbar()&&p&&this._oExpandButton.$().attr("aria-controls",p.id);if(!this.getExpanded()){$.children(".sapMPanelExpandablePart").css("display","none");}}};d.prototype.ontap=function(e){var o=this.getDomRef(),w=o&&o.querySelector(".sapMPanelWrappingDiv");if(!this.getExpandable()||this.getHeaderToolbar()||!w){return;}if(w.contains(e.target)){this._bInteractiveExpand=true;this.setExpanded(!this.getExpanded());}};d.prototype.onsapspace=function(e){this.ontap(e);};d.prototype.onsapenter=function(e){this.ontap(e);};d.prototype.exit=function(){if(this._oExpandButton){this._oExpandButton.destroy();this._oExpandButton=null;}};d.prototype._createExpandButton=function(){var t=this,i=this.getExpanded()?I.getIconURI("slim-arrow-down"):I.getIconURI("slim-arrow-right"),T=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("PANEL_ICON"),o;if(!this.getHeaderToolbar()){return I.createControlByURI({src:i,tooltip:T});}o=new B(this.getId()+"-expandButton",{icon:i,tooltip:T,type:c.Transparent,press:function(){t._bInteractiveExpand=true;t.setExpanded(!t.getExpanded());}}).addEventDelegate({onAfterRendering:function(){o.$().attr("aria-expanded",this.getExpanded());}.bind(this)},this);this.addDependent(o);return o;};d.prototype._toggleButtonIcon=function(i){var s=i?I.getIconURI("slim-arrow-down"):I.getIconURI("slim-arrow-right");if(!this._oExpandButton){return;}if(this.getHeaderToolbar()){this._oExpandButton.setIcon(s);}else{this._oExpandButton.setSrc(s);}};d.prototype._setContentHeight=function(){var A,t=this.getDomRef(),p=t&&t.querySelector(".sapMPanelContent");if(this.getHeight()==="auto"||!p){return;}A='calc('+"100%"+' - '+p.offsetTop+'px)';p.style.height=A;};d.prototype._toggleExpandCollapse=function(A){var o={complete:A};if(!this.getExpandAnimation()){o.duration=0;}this.$().children(".sapMPanelExpandablePart").slideToggle(o);};d.prototype._getLabellingElementId=function(){var h=this.getHeaderToolbar(),H=this.getHeaderText(),i=null;if(h){i=h.getTitleId();}else if(H){i=this.getId()+"-header";}return i;};return d;});
