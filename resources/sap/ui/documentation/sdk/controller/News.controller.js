/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/documentation/sdk/controller/BaseController",'sap/ui/model/json/JSONModel',"sap/ui/documentation/sdk/controller/util/NewsInfo","sap/ui/core/Core","sap/m/library"],function(B,J,N,C,m){'use strict';return B.extend('sap.ui.documentation.sdk.controller.News',{onInit:function(){this.getRouter().getRoute("news").attachPatternMatched(this._onMatched,this);this._oModel=new J();this.setModel(this._oModel);N.prepareNewsData(this.getOwnerComponent().getConfigUtil());C.getEventBus().subscribe("newsChanged","onDemoKitNewsChanged",this._syncModelWithNewsInfo,this);},onAfterRendering:function(){this._syncModelWithNewsInfo();},handleNewsItemClose:function(e){var i=e.getSource(),I=i.getCustomData()[0].getValue(),o=this._oModel.getProperty("/new").find(function(i){return i.id===I;});N.moveNewItemToOld(o);},handleMarkAsRead:function(){N.moveAllNewItemsToOld();},handleVisitLink:function(e){var i=e.getSource(),I=i.getCustomData()[0].getValue();m.URLHelper.redirect(I,true);},_syncModelWithNewsInfo:function(){var p=N.getPreparationFailureMessage();if(!p){this._oModel.setProperty("/new",N.getNewNewsArray().slice());this._oModel.setProperty("/old",N.getOldNewsArray().slice());}this._oModel.setProperty("/preparationFailureMessage",p);},_onMatched:function(){try{this.hideMasterSide();}catch(e){}}});});