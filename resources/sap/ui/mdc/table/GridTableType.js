/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./TableTypeBase","../library"],function(T,l){"use strict";var I,a,b,c,d,e,f,g;var R=l.RowCountMode;var G=T.extend("sap.ui.mdc.table.GridTableType",{metadata:{library:"sap.ui.mdc",properties:{rowCountMode:{type:"sap.ui.mdc.RowCountMode",defaultValue:R.Auto},rowCount:{type:"int",defaultValue:10},selectionLimit:{type:"int",defaultValue:200},showHeaderSelector:{type:"boolean",defaultValue:true}}}});G.prototype.updateRelevantTableProperty=function(t,p,v){if(!t||!t.isA("sap.ui.table.Table")){return;}if(p==="rowCountMode"){var r=t.getRowMode();var h=false;if(r&&(v===R.Fixed&&!r.isA("sap.ui.table.rowmodes.FixedRowMode")||v===R.Auto&&!r.isA("sap.ui.table.rowmodes.AutoRowMode"))){h=r.getHideEmptyRows();r.destroy();r=null;}if(!r){var i=v===R.Fixed?e:f;t.setRowMode(new i({hideEmptyRows:h}));}this._updateTableRowCount(t,v,this.getRowCount());}else if(p==="rowCount"){this._updateTableRowCount(t,this.getRowCountMode(),v);}else if(p==="selectionLimit"){t.getPlugins()[0].setLimit(v).setEnableNotification(v>0);}else if(p==="showHeaderSelector"){t.getPlugins()[0].setShowHeaderSelector(v);}};G.prototype._updateTableRowCount=function(t,m,v){if(m===R.Fixed){t.getRowMode().setRowCount(v);}else{t.getRowMode().setMinRowCount(v);}};G.updateDefault=function(t){if(t){t.setRowMode(new f({minRowCount:10}));}};G.loadGridTableLib=function(){if(!this._oGridTableLibLoaded){this._oGridTableLibLoaded=sap.ui.getCore().loadLibrary("sap.ui.table",true);}return this._oGridTableLibLoaded;};G.loadTableModules=function(){if(!I){return new Promise(function(r,h){this.loadGridTableLib().then(function(){sap.ui.require(["sap/ui/table/Table","sap/ui/table/Column","sap/ui/table/RowAction","sap/ui/table/RowActionItem","sap/ui/table/plugins/MultiSelectionPlugin","sap/ui/table/rowmodes/FixedRowMode","sap/ui/table/rowmodes/AutoRowMode","sap/ui/table/RowSettings"],function(i,j,k,m,M,F,A,n){I=i;a=j;b=k;c=m;d=M;e=F;f=A;g=n;r();},function(){h("Failed to load some modules");});});}.bind(this));}else{return Promise.resolve();}};G.createTable=function(i,s){return new I(i,s);};G.createColumn=function(i,s){var C=new a(i,s);C.attachColumnMenuOpen(function(E){E.preventDefault();});C._menuHasItems=function(){return true;};return C;};G.createMultiSelectionPlugin=function(t,E){return new d(t.getId()+"--multiSelectPlugin",{selectionMode:T.getSelectionMode(t),selectionChange:E});};G.enableColumnResizer=function(t,i){i.getColumns().forEach(function(C){C.setResizable(true);C.setAutoResizable(true);});i.detachColumnResize(t._onColumnResize,t);i.attachColumnResize(t._onColumnResize,t);};G.disableColumnResizer=function(t,i){i.getColumns().forEach(function(C){C.setResizable(false);C.setAutoResizable(false);});i.detachColumnResize(t._onColumnResize,t);};G.updateSelection=function(t){var s=T.getSelectionMode(t);t._oTable.getPlugins()[0].setSelectionMode(s);};G.removeRowActions=function(t){var i=t._oTable.getRowActionTemplate();if(i){i.destroy();}t._oTable.setRowActionTemplate();t._oTable.setRowActionCount();};G.updateRowSettings=function(t,r,h){var i=new g(undefined,r.getAllSettings());this.updateRowActions(t.getParent(),r,h);t.getRowSettingsTemplate().destroy();t.setRowSettingsTemplate(i);};G.updateRowActions=function(t,r){this.removeRowActions(t);if(!r){return;}if(!r.isBound("rowActions")&&(!r.getRowActions()||r.getRowActions().length==0)){return;}var o=r.getAllActions();if("templateInfo"in o){var h=o.templateInfo;o.items.template=new c({type:h.type,visible:h.visible,icon:h.icon,text:h.text,press:[this._onRowActionPress,t]});delete o.templateInfo;}else{o.items=o.items.map(function(j){var k=new c({type:j.isBound("type")?j.getBindingInfo("type"):j.getType(),visible:j.isBound("visible")?j.getBindingInfo("visible"):j.getVisible(),icon:j.isBound("icon")?j.getBindingInfo("icon"):j._getIcon(),text:j.isBound("text")?j.getBindingInfo("text"):j._getText(),press:[this._onRowActionPress,t]});k.data("rowAction",j);return k;},this);}var i=new b(t.getId()+"--rowAction",o);t._oTable.setRowActionTemplate(i);t._oTable.setRowActionCount(r.getRowActionCount());};G._onRowActionPress=function(E){var i=E.getParameter("item");var r=this.getRowSettings().getAllActions();if(this.getRowSettings().isBound("rowActions")){var A=r.items.model;var o=i.getBindingContext(A);if(!this._oRowActionItem){this._oRowActionItem=r.items.template.clone();}this._oRowActionItem.setBindingContext(o,r.items.model);this._oRowActionItem.setModel(this.getModel(A),A);this.getRowSettings().addDependent(this._oRowActionItem);}else{this._oRowActionItem=i.data("rowAction");}var h=E.getParameter("row");this._oRowActionItem.firePress({bindingContext:h.getBindingContext()});};return G;});
