/*
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./PluginBase","../utils/TableUtils","sap/base/util/deepClone"],function(P,T,d){"use strict";function a(C,G){var R="TBL_ROW_GROUP_TITLE";var v=[G.property.label,C.getProperty(G.property.path,true)];if(G.textProperty){R="TBL_ROW_GROUP_TITLE_FULL";v.push(C.getProperty(G.textProperty.path,true));}return T.getResourceText(R,v);}var V=P.extend("sap.ui.table.plugins.V4Aggregation",{metadata:{library:"sap.ui.table",properties:{totalSummaryOnTop:{type:"string",defaultValue:"Off"},totalSummaryOnBottom:{type:"string",defaultValue:"Fixed"},groupSummary:{type:"string",defaultValue:"Bottom"},groupHeaderFormatter:{type:"function"}}}});V.prototype.isApplicable=function(C){return P.prototype.isApplicable.apply(this,arguments)&&C.getMetadata().getName()==="sap.ui.table.Table";};V.prototype.activate=function(){var B=this.getTableBinding();if(B&&!B.isA("sap.ui.model.odata.v4.ODataListBinding")){return;}P.prototype.activate.apply(this,arguments);};V.prototype.onActivate=function(t){this.setRowCountConstraints({fixedTop:false,fixedBottom:false});T.Grouping.setToDefaultGroupMode(t);T.Hook.register(t,T.Hook.Keys.Row.UpdateState,this.updateRowState,this);T.Hook.register(t,T.Hook.Keys.Row.Expand,e,this);T.Hook.register(t,T.Hook.Keys.Row.Collapse,c,this);};V.prototype.onDeactivate=function(t){this._mGroup=undefined;this._mAggregate=undefined;this._aGroupLevels=undefined;this._mColumnState=undefined;this.setRowCountConstraints();r(this);T.Grouping.setToDefaultFlatMode(t);T.Hook.deregister(t,T.Hook.Keys.Row.UpdateState,this.updateRowState,this);T.Hook.deregister(this,T.Hook.Keys.Row.Expand,e,this);T.Hook.deregister(this,T.Hook.Keys.Row.Collapse,c,this);var B=t.getBinding();if(B){B.setAggregation();}};function r(p){var t=p.getTable();if(t){t.getColumns().forEach(function(C){C._setCellContentVisibilitySettings();});}}function u(p){var t=p.getTable();var G=p.getGroupSummary();if(!t||!p._mColumnState){return;}t.getColumns().forEach(function(C){var m=p._mColumnState[C.getId()];if(m){C._setCellContentVisibilitySettings({groupHeader:{expanded:!!m.subtotals&&(G==="Top"||G==="TopAndBottom"),collapsed:!!m.subtotals&&(G==="Bottom"||G==="TopAndBottom")},summary:{group:!!m.subtotals,total:!!m.grandTotal}});}else{C._setCellContentVisibilitySettings();}});}V.prototype.onTableRowsBound=function(B){if(!B.getModel().isA("sap.ui.model.odata.v4.ODataModel")){this.deactivate();}};V.prototype.onTableBindRows=function(B){B.parameters=B.parameters||{};B.parameters.$$aggregation=this.getAggregationInfo();};V.prototype.updateRowState=function(s){var l=s.context.getValue("@$ui5.node.level");var C=s.context.getValue("@$ui5.node.isTotal");var i=s.context.getValue("@$ui5.node.isExpanded")===undefined;var I=l===0&&C;var f=l>0&&!i;var j=!f&&C;s.level=l;s.expandable=f;s.expanded=s.context.getValue("@$ui5.node.isExpanded")===true;if(I||j){s.type=s.Type.Summary;s.level++;}else if(f){s.type=s.Type.GroupHeader;}if(f){var G=this._aGroupLevels[l-1];var k=this.getGroupHeaderFormatter();var m=k?k(s.context,G.property.name):undefined;if(m===undefined){s.title=a(s.context,G);}else if(typeof m!=="string"){throw new Error("The group header title must be a string or undefined");}else{s.title=m;}}};V.prototype.setPropertyInfos=function(p){this._aPropertyInfos=p;};V.prototype.getPropertyInfos=function(){return this._aPropertyInfos||[];};V.prototype.findPropertyInfo=function(p){return this.getPropertyInfos().find(function(o){return o.name===p;});};V.prototype.isPropertyAggregatable=function(p){return(p.extension&&p.extension.defaultAggregate)?true:false;};V.prototype.setAggregationInfo=function(A){A=Object.assign({columnState:{}},A);if(!Array.isArray(A.visible)){this._mGroup=undefined;this._mAggregate=undefined;this._aGroupLevels=undefined;this._sSearch=undefined;}else{var f=[];var i=[];var j;this._mGroup=this.getPropertyInfos().reduce(function(G,p){if(p.key){G[p.path]={};j=g(this,p);if(j){G[p.path].additionally=j;i.concat(j);}}return G;}.bind(this),{});this._mAggregate={};var v=A.visible.concat();if(A.groupLevels){A.groupLevels.forEach(function(G){if(v.indexOf(G)<0){v.push(G);}});}v.forEach(function(s){var p=this.findPropertyInfo(s);if(p&&p.groupable){this._mGroup[p.path]={};j=g(this,p);if(j){this._mGroup[p.path].additionally=j;i=i.concat(j);}}if(p&&this.isPropertyAggregatable(p)){this._mAggregate[p.path]={};if(A.grandTotal&&(A.grandTotal.indexOf(s)>=0)){this._mAggregate[p.path].grandTotal=true;}if(A.subtotals&&(A.subtotals.indexOf(s)>=0)){this._mAggregate[p.path].subtotals=true;}if(p.unit){var U=this.findPropertyInfo(p.unit);if(U){this._mAggregate[p.path].unit=U.path;f.push(U.path);}}if(p.extension.defaultAggregate.contextDefiningProperties){p.extension.defaultAggregate.contextDefiningProperties.forEach(function(C){var D=this.findPropertyInfo(C);if(D){this._mGroup[D.path]={};j=g(this,p);if(j){this._mGroup[D.path].additionally=j;i=i.concat(j);}}}.bind(this));}}}.bind(this));this._aGroupLevels=[];if(A.groupLevels){A.groupLevels.forEach(function(G){var p=this.findPropertyInfo(G);this._aGroupLevels.push({property:p,textProperty:this.findPropertyInfo(p.text)});}.bind(this));}Object.keys(this._mGroup).forEach(function(k){if(this._mAggregate.hasOwnProperty(k)){if(this._mAggregate[k].grandTotal||this._mAggregate[k].subtotals){delete this._mGroup[k];return;}else{delete this._mAggregate[k];}}if(this._mGroup[k].additionally){this._mGroup[k].additionally=this._mGroup[k].additionally.filter(function(s){return f.indexOf(s)===-1;});}if(i.indexOf(k)>-1){delete this._mGroup[k];}}.bind(this));this._sSearch=A.search;}this._mColumnState=A.columnState;u(this);this.updateAggregation();};V.prototype.getAggregationInfo=function(){if(!Object.keys(this._mGroup||{}).length&&!Object.keys(this._mAggregate||{}).length){return;}var A={aggregate:d(this._mAggregate),group:d(this._mGroup),groupLevels:this._aGroupLevels?this._aGroupLevels.map(function(G){return G.property.path;}):undefined,search:this._sSearch};if(A.aggregate){h(this,A);b(this,A);}return A;};function g(p,o){if(o.text){var t=p.findPropertyInfo(o.text);if(t){return[t.path];}}return null;}function e(R){var B=R.getRowBindingContext();if(B){B.expand();}}function c(R){var B=R.getRowBindingContext();if(B){B.collapse();}}V.prototype.setTotalSummaryOnTop=function(v){this.setProperty("totalSummaryOnTop",v,true);this.updateAggregation();};V.prototype.setTotalSummaryOnBottom=function(v){this.setProperty("totalSummaryOnBottom",v,true);this.updateAggregation();};V.prototype.setGroupSummary=function(v){this.setProperty("groupSummary",v,true);u(this);this.updateAggregation();};V.prototype.updateAggregation=function(){var B=this.getTableBinding();if(B){B.setAggregation(this.getAggregationInfo());}};function h(p,A){var t=p.getTotalSummaryOnTop();var s=p.getTotalSummaryOnBottom();var S=t==="On"||t==="Fixed";var f=s==="On"||s==="Fixed";var H=Object.keys(A.aggregate).some(function(k){return A.aggregate[k].grandTotal;});if(S&&f){A.grandTotalAtBottomOnly=false;}else if(f){A.grandTotalAtBottomOnly=true;}else if(S){A.grandTotalAtBottomOnly=undefined;}else{Object.keys(A.aggregate).forEach(function(k){delete A.aggregate[k].grandTotal;});}p.setRowCountConstraints({fixedTop:t==="Fixed"&&H,fixedBottom:s==="Fixed"&&H});}function b(p,A){var G=p.getGroupSummary();if(G==="Top"){A.subtotalsAtBottomOnly=undefined;}else if(G==="Bottom"){A.subtotalsAtBottomOnly=true;}else if(G==="TopAndBottom"){A.subtotalsAtBottomOnly=false;}else{Object.keys(A.aggregate).forEach(function(k){delete A.aggregate[k].subtotals;});}}return V;});
