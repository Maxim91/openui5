/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/core/Component","sap/ui/core/Core","sap/ui/core/Element","sap/ui/fl/apply/_internal/controlVariants/URLHandler","sap/ui/fl/variants/VariantManagement","sap/ui/fl/Utils"],function(L,C,a,E,U,V,b){"use strict";var c={clearVariantParameterInURL:function(p){var u;var A=b.getAppComponentForControl(p.control);var v=A&&A.getModel(b.VARIANT_MODEL_NAME);if(!v){L.error("Variant model could not be found on the provided control");return;}if(p.control instanceof V){var s=v.getLocalId(p.control.getId(),A);var m=U.removeURLParameterForVariantManagement({model:v,vmReference:s});u=m.parameters;}U.update({parameters:u||[],updateURL:true,updateHashEntry:!!v,model:v||{},silent:!v});},activateVariant:function(p){function l(o){L.error(o);return Promise.reject(o);}var e;if(typeof p.element==="string"){e=C.get(p.element);if(!(e instanceof C)){e=a.byId(p.element);if(!(e instanceof E)){return l(Error("No valid component or control found for the provided ID"));}}}else if(p.element instanceof C||p.element instanceof E){e=p.element;}var A=b.getAppComponentForControl(e);if(!A){return l(Error("A valid variant management control or component (instance or ID) should be passed as parameter"));}var v=A.getModel(b.VARIANT_MODEL_NAME);if(!v){return l(Error("No variant management model found for the passed control or application component"));}var s=v.getVariantManagementReference(p.variantReference).variantManagementReference;if(!s){return l(Error("A valid control or component, and a valid variant/ID combination are required"));}return v.waitForVMControlInit(s).then(function(){return v.updateCurrentVariant({variantManagementReference:s,newVariantReference:p.variantReference,appComponent:A});}).catch(function(o){L.error(o);throw o;});},attachVariantApplied:function(p){var o=p.selector.id&&sap.ui.getCore().byId(p.selector.id)||p.selector;var A=b.getAppComponentForControl(o);var v=A.getModel(b.VARIANT_MODEL_NAME);v.attachVariantApplied({vmControlId:p.vmControlId,control:o,callback:p.callback,callAfterInitialVariant:p.callAfterInitialVariant});},detachVariantApplied:function(p){var o=p.selector.id&&sap.ui.getCore().byId(p.selector.id)||p.selector;var A=b.getAppComponentForControl(o);var v=A.getModel(b.VARIANT_MODEL_NAME);v.detachVariantApplied(p.vmControlId,o.getId());}};return c;});
