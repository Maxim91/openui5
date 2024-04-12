/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/FlexController","sap/ui/fl/Utils","sap/ui/fl/Layer","sap/ui/fl/apply/_internal/changes/Applier","sap/ui/fl/apply/_internal/flexState/FlexState","sap/ui/fl/apply/_internal/flexState/ManifestUtils","sap/ui/fl/variants/VariantModel","sap/base/Log","sap/ui/performance/Measurement"],function(F,U,L,A,a,M,V,b,c){"use strict";var d={};d._instanceCache={};d._componentInstantiationPromises=new WeakMap();d.create=function(C){var f=d._instanceCache[C];if(!f){f=new F(C);d._instanceCache[C]=f;}return f;};d.createForControl=function(C){try{var o=U.getAppComponentForControl(C);var s=M.getFlexReferenceForControl(o||C);return d.create(s);}catch(E){b.error(E.message,undefined,"sap.ui.fl.FlexControllerFactory");}};function e(r,C){if(U.getUshellContainer()){return Promise.resolve(r);}var R=window.sessionStorage.getItem("sap.ui.rta.restart."+L.CUSTOMER);if(R){var s=M.getFlexReferenceForControl(C);if(R!==s&&R!=="true"){b.error("an application component was started "+"which does not match the component for which the restart was triggered:\n"+"Triggering component: "+R+"\n"+"Started component: "+s);return Promise.resolve(r);}window.sessionStorage.removeItem("sap.ui.rta.restart."+L.CUSTOMER);return new Promise(function(f,g){Promise.all([sap.ui.getCore().loadLibrary("sap.ui.rta",{async:true}),C.rootControlLoaded()]).then(function(){sap.ui.require(["sap/ui/rta/api/startKeyUserAdaptation"],function(h){h({rootControl:C});f(r);});}).catch(function(E){g(E);});});}return Promise.resolve(r);}d.getChangesAndPropagate=function(C,v){if(U.isApplicationComponent(C)){var s=C.getId();a.clearFilteredResponse(M.getFlexReferenceForControl(C));var r=a.initialize({componentId:s,asyncHints:v.asyncHints}).then(_.bind(this,C));d._componentInstantiationPromises.set(C,r);return r;}else if(U.isEmbeddedComponent(C)){var o=U.getAppComponentForControl(C);if(o&&U.isApplicationComponent(o)){var i=Promise.resolve();if(d._componentInstantiationPromises.has(o)){i=d._componentInstantiationPromises.get(o);}return i.then(function(){var E=o.getModel(U.VARIANT_MODEL_NAME);if(!E){return _(o);}return E;}).then(function(f){C.setModel(f,U.VARIANT_MODEL_NAME);});}return Promise.resolve();}};function _(o){var m=o.getManifestObject();var f=d.createForControl(o,m);var v;return f._oChangePersistence.loadChangesMapForComponent(o).then(function(g){var p=A.applyAllChangesForControl.bind(A,g,o,f);p._bIsSapUiFlFlexControllerApplyChangesOnControl=true;o.addPropagationListener(p);v=new V({},{flexController:f,appComponent:o});return v.initialize();}).then(function(){o.setModel(v,U.VARIANT_MODEL_NAME);c.end("flexProcessing");return v;}).then(function(r){return e(r,o);});}return d;},true);
