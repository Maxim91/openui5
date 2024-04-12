/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/thirdparty/jquery','./library','sap/ui/core/Control','sap/ui/core/ValueStateSupport','./TextFieldRenderer','sap/ui/core/library','sap/ui/Device','sap/ui/events/KeyCodes','sap/ui/dom/jquery/cursorPos','sap/ui/dom/jquery/selectText'],function(q,l,C,V,T,c,D,K){"use strict";var A=c.AccessibleRole;var a=c.Design;var I=c.ImeMode;var b=c.TextAlign;var d=c.ValueState;var e=c.TextDirection;var f=C.extend("sap.ui.commons.TextField",{metadata:{interfaces:["sap.ui.commons.ToolbarItem","sap.ui.core.IFormContent"],library:"sap.ui.commons",deprecated:true,properties:{value:{type:"string",group:"Data",defaultValue:'',bindable:"bindable"},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:e.Inherit},enabled:{type:"boolean",group:"Behavior",defaultValue:true},editable:{type:"boolean",group:"Behavior",defaultValue:true},required:{type:"boolean",group:"Appearance",defaultValue:false},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},maxLength:{type:"int",group:"Behavior",defaultValue:0},valueState:{type:"sap.ui.core.ValueState",group:"Data",defaultValue:d.None},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:b.Begin},imeMode:{type:"sap.ui.core.ImeMode",group:"Behavior",defaultValue:I.Auto},design:{type:"sap.ui.core.Design",group:"Appearance",defaultValue:a.Standard},helpId:{type:"string",group:"Behavior",defaultValue:''},accessibleRole:{type:"sap.ui.core.AccessibleRole",group:"Accessibility",defaultValue:A.Textbox},name:{type:"string",group:"Misc",defaultValue:null},placeholder:{type:"string",group:"Appearance",defaultValue:null}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{change:{parameters:{newValue:{type:"string"}}},liveChange:{parameters:{liveValue:{type:"string"}}}}}});f.prototype.init=function(){};f.prototype.onfocusin=function(E){if(this.getEditable()&&this.getEnabled()&&this.getRenderer().onfocus){this.getRenderer().onfocus(this);}};f.prototype.onsapfocusleave=function(E){this._doOnEscape(E);this._checkChange(E);if(this.getEditable()&&this.getEnabled()&&this.getRenderer().onblur){this.getRenderer().onblur(this);}var F=q(this.getFocusDomRef());if(F.data("sap.InNavArea")===false){F.data("sap.InNavArea",true);}};f.prototype.onsapenter=function(E){this._checkChange(E);};f.prototype._checkChange=function(E){var i=this.getInputDomRef(),n=i&&i.value,o=this.getValue();if(this.getEditable()&&this.getEnabled()&&(o!=n)){this.setProperty("value",n,true);this.fireChange({newValue:n});}};f.prototype.onselectstart=function(E){if(!this.getEnabled()){E.preventDefault();E.stopPropagation();}};f.prototype._checkCursorPosForNav=function(E,F){var r=sap.ui.getCore().getConfiguration().getRTL();var B=F?r:!r;var $=q(this.getInputDomRef());var p=$.cursorPos();var L=$.val().length;if(r){p=L-p;}if((!B&&p!=L)||(B&&p!=0)){E.stopPropagation();}};f.prototype.onsapnext=function(E){if(E.keyCode!=K.ARROW_DOWN){if(q(this.getFocusDomRef()).data("sap.InNavArea")&&E.keyCode!=K.END){E.preventDefault();return;}this._checkCursorPosForNav(E,true);}};f.prototype.onsapprevious=function(E){if(E.keyCode!=K.ARROW_UP){if(q(this.getFocusDomRef()).data("sap.InNavArea")&&E.keyCode!=K.HOME){E.preventDefault();return;}this._checkCursorPosForNav(E,false);}};f.prototype.onsapnextmodifiers=f.prototype.onsapnext;f.prototype.onsappreviousmodifiers=f.prototype.onsapprevious;f.prototype.onsapend=f.prototype.onsapnext;f.prototype.onsaphome=f.prototype.onsapprevious;f.prototype.onsapexpand=function(E){var i=q(this.getFocusDomRef()).data("sap.InNavArea");if(i||i===false){E.stopPropagation();return;}};f.prototype.onsapcollapse=f.prototype.onsapexpand;f.prototype.onsapescape=function(E){var v=this.getProperty("value");this._bEsc=true;this._sValue=v;var i=this.getInputDomRef();if(i&&i.value!==v&&!this._propagateEsc){E.stopPropagation();}if(!D.browser.firefox){this._doOnEscape(E);}};f.prototype.onkeydown=function(E){if(E.which==K.Z&&E.ctrlKey&&!E.altKey){E.preventDefault();}};f.prototype.onkeypress=function(E){this._doOnEscape(E);var k=E.which;if(k>0&&k!==K.ESCAPE){var F=q(this.getFocusDomRef());if(F.data("sap.InNavArea")){F.data("sap.InNavArea",false);}}};f.prototype._doOnEscape=function(E){if(this._bEsc){var i=this.getInputDomRef();if(i){if(i.value!==this._sValue){q(i).val(this._sValue);}var F=q(this.getFocusDomRef());if(F.data("sap.InNavArea")===false){F.data("sap.InNavArea",true);}}this._fireLiveChange(E);this._bEsc=undefined;this._sValue=undefined;}};f.prototype.onkeyup=function(E){if(E.keyCode==K.F2){var F=q(this.getFocusDomRef());if(F.data("sap.InNavArea")){F.data("sap.InNavArea",false);}else if(F.data("sap.InNavArea")===false){F.data("sap.InNavArea",true);}}};f.prototype.oninput=function(E){this._fireLiveChange(E);};f.prototype._fireLiveChange=function(E){if(this.getEnabled()&&this.getEditable()){var L=q(this.getInputDomRef()).val();this.fireLiveChange({liveValue:L});}};f.prototype.setValueState=function(v){var o=this.getValueState();this.setProperty("valueState",v,true);v=this.getValueState();if(o==v){return this;}if(!this.getDomRef()){return this;}if(this.getRenderer().setValueState){this.getRenderer().setValueState(this,o,v);}if(this.delayedCallId){clearTimeout(this.delayedCallId);this.delayedCallId=null;}if(d.Success==v){this.delayedCallId=setTimeout(function(){this.removeValidVisualization();}.bind(this),3000);}return this;};f.prototype.removeValidVisualization=function(){if(this.getRenderer().removeValidVisualization){this.getRenderer().removeValidVisualization(this);}};f.prototype.setEditable=function(E){var o=this.getEditable();this.setProperty('editable',E,true);E=this.getEditable();if(o!=E){if(this.getDomRef()&&this.getRenderer().setEditable){this.getRenderer().setEditable(this,E);}}return this;};f.prototype.setEnabled=function(E){var o=this.getEnabled();this.setProperty('enabled',E,true);E=this.getEnabled();if(o!=E){if(this.getDomRef()&&this.getRenderer().setEnabled){this.getRenderer().setEnabled(this,E);}}return this;};f.prototype.setRequired=function(r){var o=this.getRequired();this.setProperty('required',r,true);r=this.getRequired();if(o!=r){if(this.getDomRef()){if(this.getRenderer().setRequired){this.getRenderer().setRequired(this,r);}}this.fireEvent("requiredChanged",{required:r});}return this;};f.prototype.setDesign=function(s){var o=this.getDesign();this.setProperty('design',s,true);s=this.getDesign();if(o!=s){if(this.getDomRef()){if(this.getRenderer().setDesign){this.getRenderer().setDesign(this,s);}}}return this;};f.prototype.setValue=function(v){var n=v;if(n&&n.length>this.getMaxLength()&&this.getMaxLength()>0){n=n.substring(0,this.getMaxLength());}this.setProperty("value",n,true);n=this.getValue();var i=this.getInputDomRef();if(i&&i.value!==n){if(!D.support.input.placeholder){if(n){this.$().removeClass('sapUiTfPlace');i.value=n;}else if(document.activeElement!==i){this.$().addClass('sapUiTfPlace');var p=this.getPlaceholder();if(this.getRenderer().convertPlaceholder){p=this.getRenderer().convertPlaceholder(this);}i.value=p;}else{i.value="";}}else{i.value=n;}this._sRenderedValue=n;}return this;};f.prototype.setTooltip=function(t){this._refreshTooltipBaseDelegate(t);this.setAggregation("tooltip",t,true);var i=this.getInputDomRef();if(i){var s=V.enrichTooltip(this,this.getTooltip_AsString());q(i).attr("title",s||"");if(this._getRenderOuter()){q(this.getDomRef()).attr("title",s||"");}}return this;};f.prototype.getInputDomRef=function(){if(!this._getRenderOuter()){return this.getDomRef()||null;}else{return this.getDomRef("input")||null;}};f.prototype.applyFocusInfo=function(F){this.focus();this._restoreUnsavedUserInput(F.userinput);return this;};f.prototype.getFocusInfo=function(){return{id:this.getId(),userinput:this._getUnsavedUserInputInfo()};};f.prototype.getLiveValue=function(){var i=this.getInputDomRef();if(i){return q(i).val();}else{return this.getValue();}};f.prototype.ondrop=function(E){if(D.browser.firefox){this.focus();}};f.prototype._getRenderOuter=function(){if(this.bRenderOuter==undefined){var r=this.getRenderer();if(r.renderOuterAttributes||r.renderOuterContentBefore||r.renderOuterContent){this.bRenderOuter=true;}else{this.bRenderOuter=false;}}return this.bRenderOuter;};f.prototype.getIdForLabel=function(){if(!this._getRenderOuter()){return this.getId();}else{return this.getId()+'-input';}};f.prototype.getFocusDomRef=function(){return this.getInputDomRef();};f.prototype._getUnsavedUserInputInfo=function(){var $=this.$();if($.length&&$.hasClass("sapUiTfFoc")&&!$.hasClass("sapUiTfPlace")&&this.getEnabled()&&this.getEditable()){var g=q(this.getInputDomRef());var v=g.val();var s=this.getValue();var S=0;var i=0;if(typeof(g.get(0).selectionStart)==="number"){S=g.get(0).selectionStart;i=g.get(0).selectionEnd;}return{userinput:v,value:s,cursorPos:g.cursorPos(),selStart:S,selEnd:i};}return null;};f.prototype._restoreUnsavedUserInput=function(u){if(u&&this.getEnabled()&&this.getEditable()&&this.getValue()==u.value){var v=u.userinput;if(v&&v.length>this.getMaxLength()&&this.getMaxLength()>0){v=v.substring(0,this.getMaxLength());}var $=q(this.getInputDomRef());if(v!=u.value){$.val(v);}$.cursorPos(u.cursorPos);if(u.selStart!=u.selEnd){$.selectText(u.selStart,u.selEnd);}}};f.prototype.getAccessibilityInfo=function(){return{role:"textbox",type:sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons").getText("ACC_CTR_TYPE_INPUT"),description:this.getValue()||"",focusable:this.getEnabled(),enabled:this.getEnabled(),editable:this.getEnabled()&&this.getEditable()};};return f;});
