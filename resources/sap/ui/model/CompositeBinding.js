/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BindingMode","./ChangeReason","./CompositeDataState","./CompositeType","./Context","./PropertyBinding","sap/base/assert","sap/base/Log","sap/base/util/deepEqual","sap/ui/base/DataType","sap/ui/base/SyncPromise"],function(B,C,a,b,c,P,d,L,e,D,S){"use strict";var f=P.extend("sap.ui.model.CompositeBinding",{constructor:function(g,r,i){var m;P.apply(this,[null,""]);this.aBindings=g;this.aValues=null;this.bRawValues=r;this.bPreventUpdate=false;this.bInternalValues=i;this.bMultipleModels=this.aBindings.some(function(o){var h=o.getModel();m=m||h;return m&&h&&h!==m;});},metadata:{publicMethods:["getBindings","attachChange","detachChange"]}});f.prototype.destroy=function(){this.aBindings.forEach(function(o){o.destroy();});P.prototype.destroy.apply(this);};f.prototype.getPath=function(){d(null,"Composite Binding has no path!");return null;};f.prototype.getModel=function(){d(null,"Composite Binding has no model!");return null;};f.prototype.getContext=function(){d(null,"Composite Binding has no context!");return null;};f.prototype.isResolved=function(){return this.aBindings.every(function(o){return o.isResolved();});};f.prototype.setType=function(t,I){var g=this;if(t&&!(t instanceof b)){throw new Error("Only CompositeType can be used as type for composite bindings!");}P.prototype.setType.apply(this,arguments);if(this.oType){t.getPartsIgnoringMessages().forEach(function(i){var o=g.aBindings[i];if(o&&o.supportsIgnoreMessages()&&o.getIgnoreMessages()===undefined){o.setIgnoreMessages(true);}});this.bRawValues=this.oType.getUseRawValues();this.bInternalValues=this.oType.getUseInternalValues();this.oType.processPartTypes(this.aBindings.map(function(o){return o.getType();}));if(this.bRawValues&&this.bInternalValues){throw new Error(this.oType+" has both 'bUseRawValues' & 'bUseInternalValues' set to true. Only one of them is allowed to be true");}}};f.prototype.setContext=function(o,p){var g,F,h=this.aBindings,m=o&&o.getModel(),I=p&&p.fnIsBindingRelevant?p.fnIsBindingRelevant:function(i){return!o||m&&m===h[i].getModel();};h.forEach(function(j,i){var k;if(I(i)){k=j.getContext();g=g||j.isRelative()&&c.hasChanged(k,o);F=F||(g&&k!==o);j.setContext(o);}});if(g){this.checkUpdate(F&&this.getDataState().getControlMessages().length);}};f.prototype.setValue=function(v){if(this.bSuspended){return;}this.aBindings.forEach(function(o,i){var V=v[i],s=o.getBindingMode();if(V!==undefined&&s!==B.OneWay&&s!==B.OneTime){o.setValue(V);}});this.getDataState().setValue(this.getValue());};f.prototype.getValue=function(){return this.aBindings.map(function(o){return o.getValue();});};f.prototype.getOriginalValue=function(){return this.aBindings.map(function(o){return o.getDataState().getOriginalValue();});};f.prototype.getExternalValue=function(){var v=[],i,V;switch(this.sInternalType){case"raw":return this.getRawValue();case"internal":return this.getInternalValue();default:i=this.sInternalType&&D.getType(this.sInternalType);v=this.getCurrentValues();if(this.fnFormatter){V=this.fnFormatter.apply(this,v);}else if(this.oType){V=this.oType.formatValue(v,this.sInternalType);}else if(i instanceof D&&i.isArrayType()){V=v;}else if(v.length>1){V=v.join(" ");}else{V=v[0];}return V;}};f.prototype.setExternalValue=function(v){var i,o,r,p,t=this;if(this.sInternalType==="raw"){this.setRawValue(v);return undefined;}else if(this.sInternalType==="internal"){this.setInternalValue(v);return undefined;}i=this.sInternalType&&D.getType(this.sInternalType);if(this.fnFormatter){L.warning("Tried to use twoway binding, but a formatter function is used");return undefined;}o=this.getDataState();if(this.oType){p=S.resolve().then(function(){var g;if(t.oType.getParseWithValues()){g=t.getCurrentValues();}return t.oType.parseValue(v,t.sInternalType,g);}).then(function(V){var g=t.getValidateValues(V);return S.all([V,t.oType.validateValue(g)]);}).then(function(R){return R[0];}).catch(function(E){o.setInvalidValue(v);t.checkDataState();throw E;});}else if(Array.isArray(v)&&i instanceof D&&i.isArrayType()){p=S.resolve(v);}else if(typeof v=="string"){p=S.resolve(v.split(" "));}else{p=S.resolve([v]);}r=p.then(function(V){t.aBindings.forEach(function(g,I){var s=g.getBindingMode();v=V[I];if(v!==undefined&&s!==B.OneWay&&s!==B.OneTime){if(t.bRawValues){g.setRawValue(v);}else if(t.bInternalValues){g.setInternalValue(v);}else{g.setExternalValue(v);}}});o.setValue(t.getValue());o.setInvalidValue(undefined);});r.catch(function(){});return r.unwrap();};f.prototype.getInternalValue=function(){return this.aBindings.map(function(o){return o.getInternalValue();});};f.prototype.setInternalValue=function(v){var o=this.getDataState(),p,t=this;if(this.oType){p=S.resolve(v).then(function(V){if(!t.bInternalValues){V=t.aBindings.map(function(g,i){return g._internalToRaw(V[i]);});if(!t.bRawValues){V=t.aBindings.map(function(g,i){return g._rawToExternal(V[i]);});}}return t.oType.validateValue(V);}).then(function(){return v;}).catch(function(E){o.setInvalidValue(v);t.checkDataState();throw E;});}else{p=S.resolve(v);}return p.then(function(){t.aBindings.forEach(function(g,i){var V=v[i],s=g.getBindingMode();if(V!==undefined&&s!==B.OneWay&&s!==B.OneTime){g.setInternalValue(V);}});o.setValue(t.getValue());o.setInvalidValue(undefined);}).unwrap();};f.prototype.getRawValue=function(){return this.aBindings.map(function(o){return o.getRawValue();});};f.prototype.setRawValue=function(v){var o=this.getDataState(),p,t=this;if(this.oType){p=S.resolve(v).then(function(V){if(!t.bRawValues){if(t.bInternalValues){V=t.aBindings.map(function(g,i){return g._rawToInternal(V[i]);});}else{V=t.aBindings.map(function(g,i){return g._rawToExternal(V[i]);});}}return t.oType.validateValue(V);}).then(function(){return v;}).catch(function(E){o.setInvalidValue(v);t.checkDataState();throw E;});}else{p=S.resolve(v);}return p.then(function(){t.aBindings.forEach(function(g,i){var V=v[i],s=g.getBindingMode();if(V!==undefined&&s!==B.OneWay&&s!==B.OneTime){g.setRawValue(V);}});o.setValue(t.getValue());o.setInvalidValue(undefined);}).unwrap();};f.prototype.getCurrentValues=function(){if(this.bRawValues){return this.getRawValue();}else if(this.bInternalValues){return this.getInternalValue();}else{return this.aBindings.map(function(o){return o.getExternalValue();});}};f.prototype.getValidateValues=function(v){var g,p,V=v;p=this.aBindings.some(function(h,i){return v[i]===undefined;});if(p){g=this.getCurrentValues();V=g.map(function(h,i){return v[i]===undefined?h:v[i];});}return V;};f.prototype.getBindings=function(){return this.aBindings;};f.prototype.hasValidation=function(){if(this.getType()){return true;}var g=this.getBindings();for(var i=0;i<g.length;++i){if(g[i].hasValidation()){return true;}}return false;};f.prototype.attachChange=function(F,l){var t=this;this.fChangeHandler=function(E){if(t.bSuspended){return;}var o=E.getSource();if(o.getBindingMode()==B.OneTime){o.detachChange(t.fChangeHandler);}t.checkUpdate(true);};this.attachEvent("change",F,l);if(this.aBindings){this.aBindings.forEach(function(o){o.attachChange(t.fChangeHandler);});}};f.prototype.detachChange=function(F,l){var t=this;this.detachEvent("change",F,l);if(this.aBindings){this.aBindings.forEach(function(o){o.detachChange(t.fChangeHandler);});}};f.prototype.attachDataStateChange=function(F,l){var t=this;this.fDataStateChangeHandler=function(E){var o=E.getSource();if(o.getBindingMode()==B.OneTime){o.detachDataStateChange(t.fChangeHandler);}t.checkDataState();};this.attachEvent("DataStateChange",F,l);if(this.aBindings){this.aBindings.forEach(function(o){o.attachEvent("DataStateChange",t.fDataStateChangeHandler);});}};f.prototype.detachDataStateChange=function(F,l){var t=this;this.detachEvent("DataStateChange",F,l);if(this.aBindings){this.aBindings.forEach(function(o){o.detachEvent("DataStateChange",t.fDataStateChangeHandler);});}};f.prototype.attachAggregatedDataStateChange=function(F,l){var t=this;if(!this.fDataStateChangeHandler){this.fDataStateChangeHandler=function(E){var o=E.getSource();if(o.getBindingMode()==B.OneTime){o.detachDataStateChange(t.fChangeHandler);}t.checkDataState();};}this.attachEvent("AggregatedDataStateChange",F,l);if(this.aBindings){this.aBindings.forEach(function(o){o.attachEvent("DataStateChange",t.fDataStateChangeHandler);});}};f.prototype.detachAggregatedDataStateChange=function(F,l){var t=this;this.detachEvent("AggregatedDataStateChange",F,l);if(this.aBindings){this.aBindings.forEach(function(o){o.detachEvent("DataStateChange",t.fDataStateChangeHandler);});}};f.prototype.updateRequired=function(m){var u=false;this.aBindings.forEach(function(o){u=u||o.updateRequired(m);});return u;};f.prototype.initialize=function(){this.bPreventUpdate=true;if(this.aBindings){this.aBindings.forEach(function(o){o.initialize();});}this.bPreventUpdate=false;if(!this.bSuspended){this.checkUpdate(true);}return this;};f.prototype.getDataState=function(){if(!this.oDataState){this.oDataState=new a(this.aBindings.map(function(o){return o.getDataState();}));}return this.oDataState;};f.prototype.suspend=function(){this.bSuspended=true;this.aBindings.forEach(function(o){o.suspend();});};f.prototype.resume=function(){this.aBindings.forEach(function(o){o.resume();});this.bSuspended=false;this.checkUpdate(true);};f.prototype.checkUpdate=function(F){var g=false;if(this.bPreventUpdate||(this.bSuspended&&!F)){return;}if(this.bMultipleModels&&this.aBindings.some(function(h){var m=h.getModel();return m&&m.bDestroyed;})){return;}var o=this.getDataState();var O=this.getOriginalValue();if(F||!e(O,this.aOriginalValues)){this.aOriginalValues=O;o.setOriginalValue(O);g=true;}var v=this.getValue();if(!e(v,this.aValues)||F){this.aValues=v;o.setValue(v);this._fireChange({reason:C.Change});g=true;}if(g){this.checkDataState();}};return f;});
