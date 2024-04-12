/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../library","sap/ui/core/Element"],function(L,E){"use strict";var T=L.TableType;var C=E.extend("sap.ui.mdc.table.CreationRow",{metadata:{library:"sap.ui.mdc",properties:{applyEnabled:{type:"boolean",group:"Behavior",defaultValue:true},busy:{type:"boolean",group:"Behavior",defaultValue:false},visible:{type:"boolean",group:"Appearance",defaultValue:true}},events:{apply:{allowPreventDefault:true}}}});C.prototype.init=function(){this._sTableType="";this._oInnerCreationRow=null;this._mBindingContexts={};};C.prototype.exit=function(){if(this._oInnerCreationRow){this._oInnerCreationRow.destroy();this._oInnerCreationRow=null;}this._mBindingContexts=null;};C.prototype.setBusy=function(b){this.setProperty('busy',b,true);if(this._oInnerCreationRow){this._oInnerCreationRow.setBusy(b);}return this;};C.prototype.setBindingContext=function(o,m){E.prototype.setBindingContext.call(this,o,m);this._mBindingContexts[m]={context:o,modelName:m};if(this._oInnerCreationRow){this._oInnerCreationRow.setBindingContext(o,m);}return this;};C.prototype.setApplyEnabled=function(e){this.setProperty("applyEnabled",e,true);if(this._oInnerCreationRow){this._oInnerCreationRow.setApplyEnabled(e);}return this;};C.prototype.setVisible=function(v){this.setProperty("visible",v,true);if(this._oInnerCreationRow){this._oInnerCreationRow.setVisible(v);this._getTable()._oTable.getRowMode().setHideEmptyRows(v);}return this;};C.prototype._onInnerApply=function(e){if(!this.fireApply()){e.preventDefault();}};C.prototype.update=function(){return this._updateInnerCreationRow();};C.prototype._updateInnerCreationRow=function(){var t=this._getTable();var n=t?t._getStringType():"";var p;if(this._sTableType===n||!t||!t._oTable){return Promise.resolve();}this._sTableType=n;if(n===T.Table){p=this._createGridTableCreationRow();t._oTable.getRowMode().setHideEmptyRows(this.getVisible());}else{p=this._createResponsiveTableCreationRow();}return p.then(function(I){i(t,I);});};function g(m){return new Promise(function(r,a){sap.ui.require([m],function(M){r(M);},function(e){a(e);});});}C.prototype._createGridTableCreationRow=function(){return g("sap/ui/table/CreationRow").then(function(C){c(this);this._oInnerCreationRow=new C(this.getId()+"-inner",{visible:this.getVisible(),applyEnabled:this.getApplyEnabled(),apply:[this._onInnerApply,this]});this._getTable()._oTable.getRowMode().setHideEmptyRows(this.getVisible());for(var m in this._mBindingContexts){var b=this._mBindingContexts[m];this._oInnerCreationRow.setBindingContext(b.context,b.modelName);}return this._oInnerCreationRow;}.bind(this));};C.prototype._createResponsiveTableCreationRow=function(){c(this);return Promise.resolve();};function i(m,I){if(m&&m._oTable&&I){m._oTable.setCreationRow(I);}}function c(m){if(m&&m._oInnerCreationRow){m._oInnerCreationRow.destroy();m._oInnerCreationRow=null;}}C.prototype._getTable=function(){var p=this.getParent();return p&&p.isA("sap.ui.mdc.Table")?p:null;};return C;});
