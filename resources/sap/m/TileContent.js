/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library','sap/ui/core/library','sap/ui/core/Control','./TileContentRenderer'],function(l,C,a,T){"use strict";var P=l.Priority;var L=l.LoadState;var G=l.GenericTileMode;var b=a.extend("sap.m.TileContent",{metadata:{library:"sap.m",properties:{"footer":{type:"string",group:"Appearance",defaultValue:null},"footerColor":{type:"sap.m.ValueColor",group:"Appearance",defaultValue:"Neutral"},"size":{type:"sap.m.Size",group:"Appearance",defaultValue:"Auto",deprecated:true},"unit":{type:"string",group:"Data",defaultValue:null},"disabled":{type:"boolean",group:"Behavior",defaultValue:false},"frameType":{type:"sap.m.FrameType",group:"Appearance",defaultValue:"Auto"},"priority":{type:"sap.m.Priority",group:"Misc",defaultValue:P.None},"priorityText":{type:"string",group:"Misc",defaultValue:null},"state":{type:"sap.m.LoadState",group:"Misc",defaultValue:L.Loaded}},defaultAggregation:"content",aggregations:{"content":{type:"sap.ui.core.Control",multiple:false,bindable:"bindable"}}}});b.prototype.init=function(){this._bRenderFooter=true;this._bRenderContent=true;this._bStateSetManually=false;};b.prototype.onBeforeRendering=function(){var s=this.mProperties.hasOwnProperty("state");if(s&&!this._bStateSetManually){if(this.getParent()&&this.getParent().isA("sap.m.GenericTile")){if(this.getParent().getState()===L.Failed){this.setProperty("state",L.Loaded,true);}else if(this.getParent().getState()===L.Disabled){this.setProperty("state",L.Loaded,true);this.setProperty("disabled",this.getState()===L.Disabled,true);}}}else{if(this.getParent()&&this.getParent().isA("sap.m.GenericTile")){if(this.getParent().getState()===L.Failed){this.setProperty("state",L.Loaded,true);}else if(this.getParent().getState()===L.Disabled){this.setProperty("state",L.Loaded,true);this.setProperty("disabled",this.getState()===L.Disabled,true);}else{this.setProperty("state",this.getParent().getState(),true);}}this._bStateSetManually=true;}if(this.getContent()&&this._oDelegate){if(this.getDisabled()){this.getContent().addDelegate(this._oDelegate);}else{this.getContent().removeDelegate(this._oDelegate);}}};b.prototype.onAfterRendering=function(){var c=this.getContent();if(c){var t=this.$();var d=t.find("*");var s=t.attr("title")||"";var e=c.getTooltip_AsString()||"";if(s===e){s="";}var i='';d.toArray().forEach(function(f){if(f.title){i=i.concat(f.title+" ");}});if(i.trim()!==0){e=e+" "+i;}if(e&&e.trim().length!==0){if(this._getFooterText().trim()!==0){e=e+"\n"+this._getFooterText();}s.trim().length!==0?t.attr("title",s+"\n"+e):t.attr("title",e);}d.removeAttr("title").off("mouseenter");}};b.prototype._getContentType=function(){if(this.getContent()){var c=this.getContent().getMetadata().getName();if(c==="sap.m.NewsContent"||c==="sap.suite.ui.commons.NewsContent"){return"News";}}};b.prototype._getFooterText=function(){var r=sap.ui.getCore().getLibraryResourceBundle('sap.m');var f=this.getFooter();var u=this.getUnit();if(u){if(f){if(sap.ui.getCore().getConfiguration().getRTL()){return r.getText('TILECONTENT_FOOTER_TEXT',[f,u]);}else{return r.getText('TILECONTENT_FOOTER_TEXT',[u,f]);}}else{return u;}}else{return f;}};b.prototype.getAltText=function(){var A="";var i=true;var c=this.getContent();var p=this.getParent();if(c){var o=c.getDomRef();if(c.getAltText){A+=c.getAltText();i=false;}else if(c.getTooltip_AsString()){A+=c.getTooltip_AsString();i=false;}else if(p&&p.isA("sap.m.GenericTile")&&p.getMode()===G.ActionMode){var s=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("TEXT_CONTENT_PRIORITY"),d=this.getPriorityText();if(d&&this.getPriority()){A+=d+" "+s;i=false;}if(c.isA("sap.m.Text")){A+=(i?"":"\n")+c.getText();i=false;}else if(o&&c.isA("sap.m.FormattedText")){A+=(i?"":"\n")+o.innerText;i=false;}}}if(this.getUnit()){A+=(i?"":"\n")+this.getUnit();i=false;}if(this.getFooter()){A+=(i?"":"\n")+this.getFooter();}return A;};b.prototype.getTooltip_AsString=function(){var t=this.getTooltip();var A="";if(typeof t==="string"||t instanceof String){return t;}A=this.getAltText();return A?A:"";};b.prototype.setRenderFooter=function(v){this._bRenderFooter=v;return this;};b.prototype.setRenderContent=function(v){this._bRenderContent=v;return this;};return b;});
