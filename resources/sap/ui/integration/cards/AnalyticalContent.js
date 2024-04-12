/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./AnalyticalContentRenderer","./BaseContent","sap/ui/integration/library","sap/ui/integration/util/BindingResolver","sap/base/Log","sap/base/util/merge","sap/ui/core/Core"],function(A,B,l,a,L,m,C){"use strict";var b=l.CardActionArea;var V,F,c,P;var d={"Top":"top","Bottom":"bottom","Left":"left","Right":"right"};var e={"TopLeft":"topLeft","Center":"center"};var T={"Left":"left","Center":"center","Right":"right"};var f={"Line":"line","StackedColumn":"stacked_column","StackedBar":"stacked_bar","Donut":"donut"};var g={"Chart":"Chart","Full":"Full"};var h=B.extend("sap.ui.integration.cards.AnalyticalContent",{metadata:{library:"sap.ui.integration"},renderer:A});h.prototype.exit=function(){B.prototype.exit.apply(this,arguments);if(this._oPopover){this._oPopover.destroy();}};h.prototype.loadDependencies=function(o){return new Promise(function(r,i){C.loadLibrary("sap.viz",{async:true}).then(function(){sap.ui.require(["sap/viz/ui5/controls/VizFrame","sap/viz/ui5/controls/common/feeds/FeedItem","sap/viz/ui5/controls/Popover","sap/viz/ui5/data/FlattenedDataset"],function(_,j,k,n){V=_;F=j;P=k;c=n;r();},function(E){i(E);});}).catch(function(){i("Analytical content type is not available with this distribution.");});});};h.prototype.onDataChanged=function(){this._createChart();var o=this.getAggregation("_content");if(o){var v=o._getVizDataset(),n=v&&v._FlatTableD&&v._FlatTableD._data&&Array.isArray(v._FlatTableD._data)&&(!v._FlatTableD._data.length);if(n){this.getParent()._handleError("No data available",true);}}};h.prototype._createChart=function(){var o=this.getParsedConfiguration();if(!o.chartType){L.error("\"sap.card\".content.chartType is mandatory property.",null,"sap.ui.integration.widgets.Card");return;}var r=a.resolveValue(o,this,"/");var i=new V({uiConfig:{applicationSet:"fiori"},height:"100%",width:"100%",vizType:f[r.chartType]||r.chartType,vizProperties:this._getVizProperties(r),dataset:this._getDataset(o,r),feeds:this._getFeeds(r)});this.setAggregation("_content",i);this._attachActions(o);if(r.popover&&r.popover.active){this._attachPopover();}};h.prototype._attachActions=function(o){var i={area:b.Content,actions:o.actions,control:this};if(o.actionableArea===g.Chart){i.eventName="selectData";i.actionControl=this.getAggregation("_content");this._oActions.setBindingPathResolver(function(E){var I=E.getParameter("data")[0].data._context_row_number;return this.getBindingContext().getPath()+"/"+I;}.bind(this));}else{i.eventName="press";}this._oActions.attach(i);};h.prototype._attachPopover=function(){if(this._oPopover){this._oPopover.destroy();}this._oPopover=new P();this._oPopover.connect(this.getAggregation("_content").getVizUid());};h.prototype._getVizProperties=function(r){if(!r){return null;}var t=r.title,o=r.legend,p=r.plotArea;var v={title:{style:{fontWeight:"normal"},layout:{respectPlotPosition:false}},legend:{},legendGroup:{layout:{}},plotArea:{window:{start:"firstDataPoint",end:"lastDataPoint"}},categoryAxis:{title:{}},valueAxis:{title:{}},interaction:{noninteractiveMode:true}};if(r.actions||r.popover){var i=r.actionableArea===g.Chart||r.popover&&r.popover.active;v.interaction.noninteractiveMode=!i;}if(t){v.title.text=t.text;v.title.visible=t.visible;v.title.alignment=T[t.alignment];L.warning("\"sap.card\".content.title is deprecated. Use \"sap.card\".content.chartProperties instead",null,"sap.ui.integration.widgets.Card");}if(o){v.legend.visible=o.visible;v.legendGroup.layout.position=d[o.position];v.legendGroup.layout.alignment=e[o.alignment];L.warning("\"sap.card\".content.legend is deprecated. Use \"sap.card\".content.chartProperties instead",null,"sap.ui.integration.widgets.Card");}if(p){if(p.dataLabel){v.plotArea.dataLabel=p.dataLabel;}if(p.categoryAxisText){v.categoryAxis.title.visible=p.categoryAxisText.visible;}if(p.valueAxisText){v.valueAxis.title.visible=p.valueAxisText.visible;}L.warning("\"sap.card\".content.plotArea is deprecated. Use \"sap.card\".content.chartProperties instead",null,"sap.ui.integration.widgets.Card");}m(v,r.chartProperties);return v;};h.prototype._getDataset=function(o,r){var M,D;if(o.dimensions){D=o.dimensions.map(function(j,i){return{name:r.dimensions[i].name||r.dimensions[i].label,value:j.value,displayValue:j.displayValue,dataType:j.dataType};});}if(o.measures){M=o.measures.map(function(j,i){return{name:r.measures[i].name||r.measures[i].label,value:j.value};});}return new c({measures:M,dimensions:D,data:{path:this.getBindingContext().getPath()}});};h.prototype._getFeeds=function(r){var i=r.feeds;if(r.measureAxis||r.dimensionAxis){L.warning("\"sap.card\".content.measureAxis and \"sap.card\".content.dimensionAxis are deprecated. Use \"sap.card\".content.feeds instead",null,"sap.ui.integration.widgets.Card");i=[{uid:r.measureAxis,type:"Measure",values:r.measures.map(function(M){return M.label;})},{uid:r.dimensionAxis,type:"Dimension",values:r.dimensions.map(function(D){return D.label;})}];}return i.map(function(o){return new F(o);});};return h;});