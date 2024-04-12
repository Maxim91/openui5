/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core","sap/ui/mdc/library","sap/ui/mdc/ActionToolbar","sap/m/OverflowToolbarRenderer","sap/m/OverflowToolbarButton","sap/m/OverflowToolbarToggleButton","sap/m/Title","sap/ui/mdc/library","sap/ui/mdc/chart/ChartTypeButton","sap/ui/mdc/chart/ChartSettings","./ChartSelectionDetails","sap/m/ToolbarSeparator"],function(C,a,A,O,b,c,T,M,d,e,f,g){"use strict";var h=A.extend("sap.ui.mdc.chart.ChartToolbar",{metadata:{library:"sap.ui.mdc",interfaces:[],defaultAggregation:"",properties:{},aggregations:{},associations:{},events:{}},renderer:O});var i=sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc");h.prototype.init=function(){A.prototype.init.apply(this,arguments);};h.prototype.createToolbarContent=function(m){this._chartInternalButtonsToEnable=[];var t=new T(m.getId()+"-title",{text:m.getHeader()});this.addBegin(t);if(m.getVariant()){this.addVariantManagement(m.getVariant());}this._oChartSelectionDetails=new f(m.getId()+"-selectionDetails",{});this._oChartSelectionDetails.attachBeforeOpen(function(E){this._updateSelectionDetailsActions(m);}.bind(this));this.addEnd(this._oChartSelectionDetails);var p=m.getP13nMode()||[];if(p.indexOf("Item")>-1&&(!m.getIgnoreToolbarActions().length||m.getIgnoreToolbarActions().indexOf(M.ChartToolbarActionType.DrillDownUp)<0)){this._oDrillDownBtn=new b(m.getId()+"-drillDown",{icon:"sap-icon://drill-down",tooltip:i.getText("chart.CHART_DRILLDOWN_TITLE"),text:i.getText("chart.CHART_DRILLDOWN_TITLE"),enabled:false,press:function(E){m._showDrillDown(this._oDrillDownBtn);}.bind(this)});this.addEnd(this._oDrillDownBtn);this._chartInternalButtonsToEnable.push(this._oDrillDownBtn);}if(!m.getIgnoreToolbarActions().length||m.getIgnoreToolbarActions().indexOf(M.ChartToolbarActionType.Legend)<0){this._oLegendBtn=new c(m.getId()+"btnLegend",{type:"Transparent",text:i.getText("chart.LEGENDBTN_TEXT"),tooltip:i.getText("chart.LEGENDBTN_TOOLTIP"),icon:"sap-icon://legend",pressed:"{$mdcChart>/legendVisible}",enabled:false});this.addEnd(this._oLegendBtn);this._chartInternalButtonsToEnable.push(this._oLegendBtn);}if(!m.getIgnoreToolbarActions().length||m.getIgnoreToolbarActions().indexOf(M.ChartToolbarActionType.ZoomInOut)){this.oZoomInButton=new b(m.getId()+"btnZoomIn",{icon:"sap-icon://zoom-in",tooltip:i.getText("chart.TOOLBAR_ZOOM_IN"),text:i.getText("chart.TOOLBAR_ZOOM_IN"),enabled:false,press:function j(o){m.zoomIn();this.toggleZoomButtons(m);}.bind(this)});this.oZoomOutButton=new b(m.getId()+"btnZoomOut",{icon:"sap-icon://zoom-out",tooltip:i.getText("chart.TOOLBAR_ZOOM_OUT"),text:i.getText("chart.TOOLBAR_ZOOM_OUT"),enabled:false,press:function j(o){m.zoomOut();this.toggleZoomButtons(m);}.bind(this)});this.addEnd(this.oZoomInButton);this.addEnd(this.oZoomOutButton);}if(p.indexOf("Sort")>-1||p.indexOf("Item")>-1){this._oSettingsBtn=new b(m.getId()+"-chart_settings",{icon:"sap-icon://action-settings",tooltip:i.getText('chart.PERSONALIZATION_DIALOG_TITLE'),text:i.getText('chart.PERSONALIZATION_DIALOG_TITLE'),enabled:false,press:function(E){var p=m.getP13nMode();var I=p.indexOf("Type");if(I>-1){p.splice(I,1);}if(m.isPropertyHelperFinal()){m.getEngine().uimanager.show(m,p);}else{m.finalizePropertyHelper().then(function(){m.getEngine().uimanager.show(m,p);});}}});this.addEnd(this._oSettingsBtn);this._chartInternalButtonsToEnable.push(this._oSettingsBtn);}if(m._getTypeBtnActive()){this._oChartTypeBtn=new d(m);this._oChartTypeBtn.setEnabled(false);this.addEnd(this._oChartTypeBtn);this._chartInternalButtonsToEnable.push(this._oChartTypeBtn);}};h.prototype.addVariantManagement=function(v){if(v){if(this._oVariantManagement){this.removeBetween(this._oVariantManagement);}this._oVariantManagement=v;this.addBetween(this._oVariantManagement);}};h.prototype.toggleZoomButtons=function(m){var z=this._getZoomEnablement(m);if(z.enabled){this.oZoomInButton.setEnabled(z.enabledZoomIn);this.oZoomOutButton.setEnabled(z.enabledZoomOut);}else{this.oZoomInButton.setEnabled(false);this.oZoomOutButton.setEnabled(false);}};h.prototype.updateToolbar=function(m){this.toggleZoomButtons(m);if(!this._toolbarInitialUpdated){this.setEnabled(true);this._chartInternalButtonsToEnable.forEach(function(B){B.setEnabled(true);});this._toolbarInitialUpdated=true;}var s=m.getSelectionHandler();if(s){this._oChartSelectionDetails.attachSelectionHandler(s.eventId,s.listener);}};h.prototype._getZoomEnablement=function(m){var z;try{z=m.getZoomState();}catch(j){z={enabled:false};}if(z&&z.hasOwnProperty("currentZoomLevel")&&z.currentZoomLevel!=null&&z.enabled){var t={enabled:true};t.enabledZoomOut=z.currentZoomLevel>0;t.enabledZoomIn=z.currentZoomLevel<1;return t;}else{return{enabled:false};}};h.prototype._updateSelectionDetailsActions=function(m){var s=m.getSelectionDetailsActions(),o;if(s){var S=this._oChartSelectionDetails.getItems();S.forEach(function(I){var k=s.getDetailsItemActions();k.forEach(function(l){o=l.clone();I.addAction(o);});});var D=s.getDetailsActions();this._oChartSelectionDetails.removeAllActions();D.forEach(function(k){o=k.clone();this._oChartSelectionDetails.addAction(o);}.bind(this));var j=s.getActionGroups();this._oChartSelectionDetails.removeAllActionGroups();j.forEach(function(k){o=k.clone();this._oChartSelectionDetails.addActionGroup(o);}.bind(this));}};return h;});