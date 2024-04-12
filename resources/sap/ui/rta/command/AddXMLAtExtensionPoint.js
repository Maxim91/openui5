/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/rta/command/FlexCommand","sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/fl/write/api/ChangesWriteAPI","sap/ui/fl/write/api/ExtensionPointRegistryAPI","sap/ui/fl/Utils"],function(F,J,C,E,U){"use strict";var A=F.extend("sap.ui.rta.command.AddXMLAtExtensionPoint",{metadata:{library:"sap.ui.rta",properties:{fragment:{type:"string",group:"content"},fragmentPath:{type:"string",group:"content"},changeType:{type:"string",defaultValue:"addXMLAtExtensionPoint"}},associations:{},events:{}}});A.prototype.bindProperty=function(n,b){if(n==="fragment"){return this.setFragment(b.bindingString);}return F.prototype.bindProperty.apply(this,arguments);};A.prototype.getAppComponent=function(){var v=this.getSelector().view;return U.getAppComponentForControl(v);};A.prototype._applyChange=function(c){var m={};m[c.getModuleName()]=this.getFragment();sap.ui.require.preload(m);var o=c.change||c;var a=this.getAppComponent();var s=o.getSelector();var v=J.bySelector(s.viewSelector,a);var e=E.getExtensionPointInfo({name:s.name,view:v});var S=e.targetControl;o.setExtensionPointInfo(e);var p={modifier:J,appComponent:a,view:v};return C.apply(Object.assign({change:o,element:S},p)).then(function(r){if(!r.success){return Promise.reject(r.error);}});};return A;},true);
