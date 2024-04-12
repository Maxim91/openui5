/*
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../library","./RowMode","../utils/TableUtils"],function(l,R,T){"use strict";var F=R.extend("sap.ui.table.rowmodes.FixedRowMode",{metadata:{library:"sap.ui.table",properties:{rowCount:{type:"int",defaultValue:10,group:"Appearance"},fixedTopRowCount:{type:"int",defaultValue:0,group:"Appearance"},fixedBottomRowCount:{type:"int",defaultValue:0,group:"Appearance"},rowContentHeight:{type:"int",defaultValue:0,group:"Appearance"},hideEmptyRows:{type:"boolean",defaultValue:false,group:"Appearance"}}},constructor:function(i){Object.defineProperty(this,"bLegacy",{value:typeof i==="boolean"?i:false});R.apply(this,arguments);}});var a={};F.prototype.attachEvents=function(){R.prototype.attachEvents.apply(this,arguments);T.addDelegate(this.getTable(),a,this);};F.prototype.detachEvents=function(){R.prototype.detachEvents.apply(this,arguments);T.removeDelegate(this.getTable(),a);};F.prototype.registerHooks=function(){R.prototype.registerHooks.apply(this,arguments);T.Hook.register(this.getTable(),T.Hook.Keys.Table.RefreshRows,this._onTableRefreshRows,this);};F.prototype.deregisterHooks=function(){R.prototype.deregisterHooks.apply(this,arguments);T.Hook.deregister(this.getTable(),T.Hook.Keys.Table.RefreshRows,this._onTableRefreshRows,this);};F.prototype.getRowCount=function(){if(this.bLegacy){var t=this.getTable();return t?t.getVisibleRowCount():0;}return this.getProperty("rowCount");};F.prototype.getFixedTopRowCount=function(){if(this.bLegacy){var t=this.getTable();return t?t.getFixedRowCount():0;}return this.getProperty("fixedTopRowCount");};F.prototype.getFixedBottomRowCount=function(){if(this.bLegacy){var t=this.getTable();return t?t.getFixedBottomRowCount():0;}return this.getProperty("fixedBottomRowCount");};F.prototype.getRowContentHeight=function(){if(this.bLegacy){var t=this.getTable();return t?t.getRowHeight():0;}return this.getProperty("rowContentHeight");};F.prototype.setHideEmptyRows=function(h){this.setProperty("hideEmptyRows",h);if(h){this.disableNoData();}else{this.enableNoData();}return this;};F.prototype.getMinRequestLength=function(){return Math.max(0,this.getRowCount());};F.prototype.updateTableRows=function(){if(this.getHideEmptyRows()&&this.getComputedRowCounts().count===0){var r=this.getRowCount();if(r>0){return this.getRowContexts(r).length>0;}}else{return R.prototype.updateTableRows.call(this);}};F.prototype.getComputedRowCounts=function(){var r=this.getRowCount();var f=this.getFixedTopRowCount();var i=this.getFixedBottomRowCount();if(this.getHideEmptyRows()){r=Math.min(r,this.getTotalRowCountOfTable());}return this.computeStandardizedRowCounts(r,f,i);};F.prototype.getTableStyles=function(){return{height:"auto"};};F.prototype.getTableBottomPlaceholderStyles=function(){if(!this.getHideEmptyRows()){return undefined;}var r=Math.max(0,this.getRowCount()-this.getComputedRowCounts().count);return{height:r*this.getBaseRowHeightOfTable()+"px"};};F.prototype.getRowContainerStyles=function(){var h=this.getComputedRowCounts().count*this.getBaseRowHeightOfTable()+"px";if(this.bLegacy&&!T.isVariableRowHeightEnabled(this.getTable())){return{minHeight:h};}else{return{height:h};}};F.prototype.renderRowStyles=function(r){var i=this.getRowContentHeight();if(i>0){r.style("height",this.getBaseRowHeightOfTable()+"px");}};F.prototype.renderCellContentStyles=function(r){var i=this.getRowContentHeight();if(this.bLegacy){return;}if(i<=0){i=this.getDefaultRowContentHeightOfTable();}if(i>0){r.style("max-height",i+"px");}};F.prototype.getBaseRowContentHeight=function(){return Math.max(0,this.getRowContentHeight());};F.prototype._onTableRefreshRows=function(){var r=this.getRowCount();if(r>0){if(T.isVariableRowHeightEnabled(this.getTable())){r++;}this.initTableRowsAfterDataRequested(r);this.getRowContexts(r);}};a.onAfterRendering=function(e){var t=this.getTable();var r=e&&e.isMarked("renderRows");if(!r&&t.getRows().length>0){this.fireRowsUpdated(T.RowsUpdateReason.Render);}};return F;});
