/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library','sap/ui/core/Control','sap/ui/core/EnabledPropagator','sap/ui/core/IconPool','./ButtonRenderer','sap/ui/Device'],function(l,C,E,I,B,D){"use strict";var a=l.ButtonStyle;var b=C.extend("sap.ui.commons.Button",{metadata:{interfaces:["sap.ui.commons.ToolbarItem","sap.ui.core.IFormContent"],library:"sap.ui.commons",deprecated:true,properties:{text:{type:"string",group:"Appearance",defaultValue:''},enabled:{type:"boolean",group:"Behavior",defaultValue:true},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},helpId:{type:"string",group:"Behavior",defaultValue:''},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:''},iconHovered:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:''},iconSelected:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:''},iconFirst:{type:"boolean",group:"Appearance",defaultValue:true},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},styled:{type:"boolean",group:"Appearance",defaultValue:true},lite:{type:"boolean",group:"Appearance",defaultValue:false},style:{type:"sap.ui.commons.ButtonStyle",group:"Appearance",defaultValue:a.Default}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{press:{}}}});E.call(b.prototype);b.prototype.onclick=function(e){if(this.getEnabled()&&this.getVisible()){this.firePress({});}e.preventDefault();e.stopPropagation();};b.prototype.onsapenter=function(e){e.stopPropagation();};b.prototype.onmousedown=function(e){this.handleMouseDown(e,true);};b.prototype.handleMouseDown=function(e,f){if(this.getEnabled()&&this.getRenderer().onactive){this.getRenderer().onactive(this);}if(f&&(D.browser.webkit||(D.browser.firefox&&navigator.platform.indexOf("Mac")===0))){if(D.browser.mobile&&D.browser.webkit){this.focus();}setTimeout(function(){this.focus();}.bind(this),0);}};b.prototype.onmouseup=function(e){if(this.getEnabled()&&this.getRenderer().ondeactive){this.getRenderer().ondeactive(this);}};b.prototype.onmouseout=function(e){if(this.getEnabled()&&this.getRenderer().onmouseout){this.getRenderer().onmouseout(this);}};b.prototype.onmouseover=function(e){if(this.getEnabled()&&this.getRenderer().onmouseover){this.getRenderer().onmouseover(this);}};b.prototype.onfocusout=function(e){if(this.getEnabled()&&this.getRenderer().onblur){this.getRenderer().onblur(this);}};b.prototype.onfocusin=function(e){if(this.getEnabled()&&this.getRenderer().onfocus){this.getRenderer().onfocus(this);}};b.prototype.setIcon=function(i){this._setIcon(i,"icon");return this;};b.prototype.setIconHovered=function(i){this._setIcon(i,"iconHovered");return this;};b.prototype.setIconSelected=function(i){this._setIcon(i,"iconSelected");return this;};b.prototype._setIcon=function(i,p){var s=this.getProperty(p);if(s==i){return;}var u=false;if(I.isIconURI(s)){u=true;}var U=false;if(I.isIconURI(i)){U=true;}var S=true;if((!s&&i)||(s&&!i)||(u!=U)){S=false;}this.setProperty(p,i,S);if(S==true&&this.getDomRef()&&this.getRenderer().changeIcon){this.getRenderer().changeIcon(this);}};b.prototype.getAccessibilityInfo=function(){var d=this.getText()||this.getTooltip_AsString();if(!d&&this.getIcon()){var i=I.getIconInfo(this.getIcon());if(i){d=i.text||i.name;}}return{role:"button",type:sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons").getText("ACC_CTR_TYPE_BUTTON"),description:d,focusable:this.getEnabled(),enabled:this.getEnabled()};};return b;});
