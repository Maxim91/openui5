/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BaseController","sap/ui/documentation/sdk/controller/util/APIInfo","sap/ui/documentation/sdk/controller/util/DocuInfo","sap/ui/model/json/JSONModel","sap/ui/documentation/sdk/controller/util/ControlsInfo","sap/ui/documentation/sdk/controller/util/ToolsInfo",'sap/ui/documentation/sdk/model/libraryData'],function(B,A,D,J,C,T,l){"use strict";var R={API:"api",TOPIC:"topic",TOOLS:"tools",ENTITY:"entity",DEMO_APPS:"demoApps"};var p={};p[R.API]={getData:A.getIndexJsonPromise,formatNode:function(n){return{name:n.name,href:R.API+"/"+n.name,hidden:n.visibility!=="public"};}};p[R.TOPIC]={getData:function(c){return D.getDocuIndexPromise(c);},formatNode:function(n){return{name:n.text,href:R.TOPIC+"/"+n.key};}};p[R.ENTITY]={getData:C.loadData,formatNode:function(n){return{name:n.id,href:R.ENTITY+"/"+n.id};}};p[R.DEMO_APPS]={getData:l.getDemoAppsData,formatNode:function(n){return{name:n.name,href:n.ref};}};p[R.TOOLS]={getData:T.getToolsConfig,formatNode:function(n){return{name:n.text,href:n.href,hidden:!n.href};}};function f(n,t){var a=[],N,F;for(var i=0;i<n.length;i++){N=n[i];F=p[t].formatNode(N);if(F.hidden!==true){a.push(F);}}return a;}return B.extend("sap.ui.documentation.sdk.controller.Sitemap",{onInit:function(){this.oPage=this.byId("sitemapPage");this.oModel=new J();this.getView().setModel(this.oModel);this._oData={};this.getRouter().getRoute("sitemap").attachPatternMatched(this._onMatched,this);},_onMatched:function(){this.hideMasterSide();this.oPage.setBusy(true);this._loadResources().then(function(){this.oPage.setBusy(false);this.oModel.setData(this._oData);}.bind(this)).catch(function(){this.onRouteNotFound();}.bind(this));this.appendPageTitle(this.getModel("i18n").getProperty("SITEMAP_TITLE"));},_loadResources:function(){var P=Object.keys(R).map(function(k){var t=R[k];return p[t].getData(this.getConfig()).then(function(d){this._onDataLoaded({data:d,type:t});}.bind(this));},this);return Promise.all(P);},_onDataLoaded:function(P){switch(P.type){case R.API:this._onApiRefData(P.data);break;case R.TOPIC:this._onTopicsData(P.data);break;case R.ENTITY:this._onSamplesData(P.data);break;case R.DEMO_APPS:this._onDemoAppsData(P.data);break;case R.TOOLS:this._onToolsData(P.data);break;}},_getDocuIndexPromise:function(){return D.getDocuIndexPromise(this.getConfig());},_onApiRefData:function(r){var t=R.API,P;P=r.reduce(function(a,e){if(e.visibility==="public"&&e.nodes){return a.concat(f(e.nodes,t));}return a;},[]);this._oData[t]=P;},_onTopicsData:function(r){var t=R.TOPIC;this._oData[t]=f(r,t);},_onSamplesData:function(r){var t=R.ENTITY;this._oData[t]=f(r.entities,t);},_onDemoAppsData:function(r){var t=R.DEMO_APPS;this._oData[t]=f(r.demoApps,t);},_onToolsData:function(r){var t=R.TOOLS;this._oData[t]=f(r,t);},onNavButtonPress:function(){this.getRouter().myNavBack("welcome");}});});