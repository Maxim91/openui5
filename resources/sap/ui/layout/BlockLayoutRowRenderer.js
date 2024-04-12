/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library'],function(l){"use strict";var B=l.BlockBackgroundType;var a={apiVersion:2};a.render=function(r,b){this.startRow(r,b);this.renderContent(r,b);this.endRow(r,b);};a.startRow=function(r,b){r.openStart("div",b).class("sapUiBlockLayoutRow");this.addRowRenderingClass(r,b);r.openEnd();};a.addRowRenderingClass=function(r,b){if(b.getScrollable()){r.class("sapUiBlockScrollingRow");if(b.getContent().length>=6){r.class("sapUiBlockScrollingNarrowCells");}}else{r.class("sapUiBlockHorizontalCellsRow");}};a.renderContent=function(r,b){var c=b.getContent(),s=b.getScrollable(),L=b.getParent().getBackground(),A=b.getAccentCells(),C=0,f;c.forEach(function(o,e){(e%2)==0?o.addStyleClass("sapUiBlockLayoutOddCell"):o.addStyleClass("sapUiBlockLayoutEvenCell");if(s){o.addStyleClass("sapUiBlockScrollableCell");}else{o.addStyleClass("sapUiBlockHorizontalCell");}});switch(L){case B.Mixed:if(A.length>0){b._processMixedCellStyles(A[A.length-1],c);}break;case B.Accent:b._processAccentCellStyles(A,c);break;}var d=b._getCellArangementForCurrentSize();if(s){c.forEach(r.renderControl,r);}else if(d){for(var i=0;i<d.length;i++){var S=d[i];r.openStart("div");r.style("display","flex");r.openEnd();for(var j=0;j<S.length;j++){f=S[j];c[C]._setFlexWidth(f);r.renderControl(c[C]);C++;}r.close("div");}}};a.endRow=function(r){r.close("div");};return a;},true);
