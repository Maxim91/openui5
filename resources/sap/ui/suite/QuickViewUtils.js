/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery",'sap/ui/core/Control','sap/ui/core/Element'],function(q,C,E){"use strict";var Q={createQuickView:function(s,a,t,f){var m=new sap.ui.model.odata.ODataModel(s,false);var o=new sap.ui.ux3.QuickView({firstTitle:"{title}",firstTitleHref:"{titleLinkURL}",type:"{Thing/text}",icon:"{imageURL}"});o.setModel(m);o.bindObject("/QuickviewConfigs(name='"+a+"',thingKey='"+t+"')",{expand:"Thing,QVAttributes/Attribute,QVActions/Action"});var M=new d();M.bindAggregation("items",{path:"QVAttributes",factory:function(i,b){var e=new c(i,{label:"{Attribute/label}",link:"{valueLinkURL}",order:"{order}"});e.bindProperty("value","value",f&&f[b.getProperty("Attribute/name")]);return e;}});o.addContent(M);return o;},createQuickViewData:function(o,s,a,t,f){var m=new sap.ui.model.odata.ODataModel(s,false);o.removeAllContent();o.setModel(m);o.bindProperty("firstTitle","title");o.bindProperty("firstTitleHref","titleLinkURL");o.bindProperty("type","Thing/text");o.bindProperty("icon","imageURL");o.bindObject("/QuickviewConfigs(name='"+a+"',thingKey='"+t+"')",{expand:"Thing,QVAttributes/Attribute,QVActions/Action"});var M=new d();M.bindAggregation("items",{path:"QVAttributes",factory:function(i,b){var e=new c(i,{label:"{Attribute/label}",link:"{valueLinkURL}",order:"{order}"});e.bindProperty("value","value",f&&f[b.getProperty("Attribute/name")]);return e;}});o.addContent(M);},createDataSetQuickView:function(s,a,t,p,S){var m=new sap.ui.model.odata.ODataModel(s,false);if(S){m.setSizeLimit(S);}var o=new sap.ui.ux3.QuickView({type:t,showActionBar:false});o.setModel(m);o.addContent(this._createDSContent(o,a,p));return o;},createDataSetQuickViewData:function(o,s,a,t,p,S){var m=new sap.ui.model.odata.ODataModel(s,false);if(S){m.setSizeLimit(S);}o.removeAllContent();o.setType(t);o.setShowActionBar(false);o.setModel(m);o.addContent(this._createDSContent(o,a,p));},_createDSContent:function(o,s,p){var a=new sap.ui.commons.layout.MatrixLayout();var r=new sap.ui.commons.layout.MatrixLayoutRow();q.each(p,function(i,P){var b;if(P.href){b=new sap.ui.commons.Link({text:P.value,href:P.href});}else{b=new sap.ui.commons.TextView({text:P.value});}var e=new sap.ui.commons.layout.MatrixLayoutCell({content:[b]});e.addStyleClass("quickViewDS");r.addCell(e);});a.bindAggregation("rows",s,r);return a;}};var c=E.extend("sap.ui.suite.hcm.QvItem",{metadata:{properties:{label:"string",value:"string",link:"string",order:"string",type:"string"}}});var d=C.extend("sap.ui.suite.hcm.QvContent",{metadata:{aggregations:{"items":{type:"sap.ui.suite.hcm.QvItem",multiple:true}}},init:function(){this._sorted=false;},exit:function(){if(this._oML){this._oML.destroy();}},renderer:function(r,o){r.write("<div");r.writeControlData(o);r.write(">");r.renderControl(o._createQVContent(o));r.write("</div>");},_createQVContent:function(o){var m=new sap.ui.commons.layout.MatrixLayout({widths:["75px"]}),I=o.getItems(),M,a,l,t,L;if(this._oML){this._oML.destroy();}o._sortItems(o);for(var i=0;i<I.length;i++){M=new sap.ui.commons.layout.MatrixLayoutRow();a=new sap.ui.commons.layout.MatrixLayoutCell({vAlign:'Top'});l=new sap.ui.commons.Label({text:I[i].getLabel()+':'});a.addContent(l);M.addCell(a);a=new sap.ui.commons.layout.MatrixLayoutCell();if(I[i].getLink()){L=new sap.ui.commons.Link({text:I[i].getValue(),href:I[i].getLink()});a.addContent(L);}else{t=new sap.ui.commons.TextView({text:I[i].getValue()});a.addContent(t);}M.addCell(a);m.addRow(M);}this._oML=m;return m;},_sortItems:function(o){if(!o._sorted){var I=o.removeAllAggregation("items",true);I.sort(function(a,b){return(parseInt(a.getOrder())-parseInt(b.getOrder()));});q.each(I,function(i,a){o.addAggregation("items",a,false);});o._sorted=true;}}});return Q;},true);
