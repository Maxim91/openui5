/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/valuehelp/content/FixedList","sap/ui/mdc/util/loadModules","sap/ui/model/ParseException"],function(F,l,P){"use strict";var B=F.extend("sap.ui.mdc.valuehelp.content.Bool",{metadata:{library:"sap.ui.mdc",interfaces:["sap.ui.mdc.valuehelp.ITypeaheadContent"]}});B.prototype.init=function(){F.prototype.init.apply(this,arguments);this.setUseFirstMatch(true);this.setUseAsValueHelp(true);this.setFilterList(false);this.setCaseSensitive(false);this._oObserver.observe(this,{properties:["config"]});};B.prototype.exit=function(){if(this._oModel){this._oModel.destroy();this._oModel=undefined;}F.prototype.exit.apply(this,arguments);};B.prototype.getContent=function(){return this._retrievePromise("boolContent",function(){return l(["sap/ui/mdc/field/ListFieldHelpItem","sap/ui/model/json/JSONModel"]).then(function(m){var L=m[0];var J=m[1];this._oModel=new J({"type":"","items":[{"key":true,"text":"true"},{"key":false,"text":"false"}]});_.call(this,this.getConfig());var i=new L(this.getId()+"-Item",{key:{path:"$Bool>key"},text:{path:"$Bool>text"}});this.bindAggregation("items",{path:"$Bool>/items",template:i});this.setModel(this._oModel,"$Bool");return F.prototype.getContent.apply(this,arguments);}.bind(this));}.bind(this));};B.prototype.getItemForValue=function(c){return Promise.resolve().then(function(){var g=this.getConfig();var t=c.dataType||(g&&g.dataType);if(t){if(c.checkKey){if(c.parsedValue===true||c.parsedValue===false){return{key:c.parsedValue,description:t.formatValue(c.parsedValue,"string")};}else{c.checkDescription=true;}}if(c.checkDescription&&c.value){var T=t.formatValue(true,"string");if(T.toLowerCase().startsWith(c.value.toLowerCase())){return{key:true,description:T};}var f=t.formatValue(false,"string");if(f.toLowerCase().startsWith(c.value.toLowerCase())){return{key:false,description:f};}}var e=this._oResourceBundle.getText("valuehelp.VALUE_NOT_EXIST",[c.value]);var E=c.exception||P;throw new E(e);}else{throw new Error("Type missing");}}.bind(this));};B.prototype.shouldOpenOnClick=function(){return false;};B.prototype._observeChanges=function(c){if(c.type==="property"&&c.name==="config"){_.call(this,c.current);}F.prototype._observeChanges.apply(this,arguments);};function _(c){if(this._oModel&&c){var t=c.dataType;var d=this._oModel.getData();if(t&&d["type"]!==t.getMetadata().getName()){d["type"]=t.getMetadata().getName();var I=d["items"];for(var i=0;i<I.length;i++){var o=I[i];o["text"]=t.formatValue(o["key"],"string");}this._oModel.checkUpdate(true);}}}return B;});
