/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/documentation/sdk/controller/BaseController","sap/ui/Device","sap/ui/VersionInfo","sap/ui/model/json/JSONModel","sap/base/Log"],function(B,D,V,J,L){"use strict";return B.extend("sap.ui.documentation.sdk.controller.Welcome",{onInit:function(){this.getRouter().getRoute("welcome").attachPatternMatched(this._onMatched,this);V.load().then(function(v){var m=new J({isOpenUI5:v&&v.gav&&/openui5/i.test(v.gav)});this.getView().setModel(m,"welcomeView");}.bind(this));this._onOrientationChange({landscape:D.orientation.landscape});},onBeforeRendering:function(){this._deregisterOrientationChange();},onAfterRendering:function(){this._registerOrientationChange();},onExit:function(){this._deregisterOrientationChange();},navigateToDetails:function(e){var h=e.oSource.getHref()||e.oSource.getTarget();h=h.replace("#/","").split('/');var p=h[0];var a=h[1];e.preventDefault();this.getRouter().navTo(p,{id:a},true);},onGetStarted:function(){this.getRouter().parse("topic/8b49fc198bf04b2d9800fc37fecbb218");},onDownloadButtonPress:function(e){var i=this.getView().getModel("welcomeView").getProperty("/isOpenUI5"),u=i?"https://openui5.org/releases/":"https://tools.hana.ondemand.com/#sapui5";window.open(u,"_blank");},_onMatched:function(){try{this.hideMasterSide();}catch(e){L.error(e);}}});});
