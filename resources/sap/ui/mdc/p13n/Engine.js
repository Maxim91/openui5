/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/p13n/AdaptationProvider","sap/base/util/merge","sap/base/Log","sap/ui/mdc/util/PropertyHelper","sap/ui/mdc/p13n/modification/FlexModificationHandler","sap/m/MessageStrip","sap/ui/core/library","sap/ui/core/Element","sap/ui/mdc/p13n/modules/DefaultProviderRegistry","sap/ui/mdc/p13n/UIManager","sap/ui/mdc/p13n/modules/StateHandlerRegistry","sap/ui/mdc/p13n/modules/xConfigAPI"],function(A,m,L,P,F,M,c,E,D,U,S,x){"use strict";var b="Engine: This class is a singleton. Please use the getInstance() method instead.";var d=c.MessageType;var _=new WeakMap();var e;var f=A.extend("sap.ui.mdc.p13n.Engine",{constructor:function(){A.call(this);if(e){throw Error(b);}this._aRegistry=[];this._aStateHandlers=[];this.defaultProviderRegistry=D.getInstance(this);this.uimanager=U.getInstance(this);this.stateHandlerRegistry=S.getInstance();}});f.prototype.registerAdaptation=function(C,o){if(!o.hasOwnProperty("controller")){throw new Error("Please provide atleast a configuration 'controller' containing a map of key-value pairs (key + Controller class) in order to register adaptation.");}if(this._getRegistryEntry(C)){this.deregisterAdaptation(C);}var a=Object.keys(o.controller);a.forEach(function(k){var g=o.controller[k];if(!this.getController(C,k)){if(this._aRegistry.indexOf(C.getId())<0){this._aRegistry.push(C.getId());}var h=new g(C);this.addController(h,k);}}.bind(this));};f.prototype.deregisterAdaptation=function(C){var r=this._getRegistryEntry(C);Object.keys(r.controller).forEach(function(k){var o=r.controller[k];o.destroy();delete r.controller[k];});_.delete(C);var i=this._aRegistry.indexOf(C.getId());this._aRegistry.splice(i,1);};f.prototype._setModificationHandler=function(C,o){if(!o.isA("sap.ui.mdc.p13n.modification.ModificationHandler")){throw new Error("Only sap.ui.mdc.p13n.modification.ModificationHandler derivations are allowed for modification");}var a=this._determineModification(C);a.handler=o;this._getRegistryEntry(C).modification=a;};var q=function(C,t){var a=function(p){if(C._pModificationQueue===p){delete C._pModificationQueue;}};C._pModificationQueue=C._pModificationQueue instanceof Promise?C._pModificationQueue.then(t):t();C._pModificationQueue.then(a.bind(null,C._pModificationQueue));return C._pModificationQueue;};f.prototype.createChanges=function(g){var k=g.key;var n=g.state;var h=!!g.applyAbsolute;var s=!!g.suppressAppliance;var i=!!g.applySequentially;if(!k||!g.control||!n){throw new Error("To create changes via Engine, atleast a 1)Control 2)Key and 3)State needs to be provided.");}var C=f.getControlInstance(g.control);var j=function(){return this.initAdaptation(C,k).then(function(){var o=this.getController(C,k);var l=o.getChangeOperations();var r=this._getRegistryEntry(C);var p=o.getCurrentState();var t=m(p instanceof Array?[]:{},p);var u={existingState:g.stateBefore||t,applyAbsolute:h,changedState:n,control:o.getAdaptationControl(),changeOperations:l,deltaAttributes:["name"],propertyInfo:r.helper.getProperties().map(function(a){return{name:a.name};})};var v=o.getDelta(u);if(!s){return this._processChanges(C,v);}return v||[];}.bind(this));}.bind(this);if(i){return q(C,j);}else{return j.apply(this);}};f.prototype.reset=function(C,k){k=k instanceof Array?k:[k];var s=[];k.forEach(function(K){s=s.concat(this.getController(C,K).getSelectorForReset());}.bind(this));var r={selectors:s,selector:C};var o=this._determineModification(C);return o.handler.reset(r,o.payload).then(function(){this.stateHandlerRegistry.fireChange(C);return this.initAdaptation(C,k).then(function(p){k.forEach(function(K){var a=this.getController(C,K);a.update(p);}.bind(this));}.bind(this));}.bind(this));};f.prototype.waitForChanges=function(C){var o=this._determineModification(C);return o.handler.waitForChanges({element:C},o.payload);};f.prototype.isModificationSupported=function(C){var o=this._determineModification(C);return o.handler.isModificationSupported({element:C},o.payload);};f.prototype._processChanges=function(C,a){if(a instanceof Array&&a.length>0){var o=this._determineModification(C);return o.handler.processChanges(a,o.payload).then(function(a){var g=f.getControlInstance(C);this.stateHandlerRegistry.fireChange(g);return a;}.bind(this));}else{return Promise.resolve([]);}};f.prototype.getRTASettingsActionHandler=function(C,p,k){var r;var a=f.hasForReference(C,"sap.ui.mdc.p13n.PersistenceProvider");if(a.length>0&&!C.isA("sap.ui.mdc.link.Panel")){return Promise.reject("Please do not use a PeristenceProvider in RTA.");}var o=this.getModificationHandler(C);var t=new F();var R=new Promise(function(g,h){r=g;});t.processChanges=function(g){r(g);return Promise.resolve(g);};this._setModificationHandler(C,t);this.uimanager.show(C,k).then(function(g){var h=g.getCustomHeader();if(h){h.getContentRight()[0].setVisible(false);}g.addStyleClass(p.styleClass);if(p.fnAfterClose instanceof Function){g.attachAfterClose(p.fnAfterClose);}});R.then(function(){this._setModificationHandler(C,o);t.destroy();}.bind(this));return R;};f.prototype.enhanceXConfig=function(C,a){var o=f.getControlInstance(C);var r=this._getRegistryEntry(C);return Promise.resolve().then(function(){return x.enhanceConfig(o,a).then(function(g){if(r){r.xConfig=g;}});});};f.prototype.readXConfig=function(C,a){var o=f.getControlInstance(C);return x.readConfig(o,a)||{};};f.prototype.externalizeKeys=function(C,i){var o={};Object.keys(i).forEach(function(I){var a=this.getController(f.getControlInstance(C),I);if(a){o[a.getStateKey()]=i[I];}}.bind(this));return o;};f.prototype.internalizeKeys=function(C,o){var a=this.getRegisteredControllers(C),i={};a.forEach(function(I){var s=this.getController(C,I).getStateKey();if(o.hasOwnProperty(s)){i[I]=o[s];}}.bind(this));return i;};f.prototype.applyState=function(C,s,a){return this.retrieveState(C).then(function(o){var g=[],h=[],i={};if(C.validateState instanceof Function){i=C.validateState(this.externalizeKeys(C,s));}if(i.validation===d.Error){L.error(i.message);}Object.keys(s).forEach(function(j){var k=this.getController(C,j);if(!k){return;}var l=this.createChanges({control:C,key:j,state:k.sanityCheck(s[j]),suppressAppliance:true,applyAbsolute:a});g.push(l);}.bind(this));return Promise.all(g).then(function(r){r.forEach(function(j){if(j&&j.length>0){h=h.concat(j);}});return this._processChanges(C,h);}.bind(this));}.bind(this));};f.prototype.diffState=function(C,o,n){var a=[],g={};o=m({},o);n=m({},n);this.getRegisteredControllers(C).forEach(function(k){a.push(this.createChanges({control:C,stateBefore:o[k],state:n[k],applyAbsolute:true,key:k,suppressAppliance:true}));}.bind(this));return Promise.all(a).then(function(h){this.getRegisteredControllers(C).forEach(function(k,i){var s=this.getController(C,k).changesToState(h[i],o[k],n[k]);g[k]=s;}.bind(this));return g;}.bind(this));};f.prototype.retrieveState=function(C){var v=this.checkXStateInterface(C);if(!v){throw new Error("The control needs to implement the interface IxState.");}return C.initialized().then(function(){return f.getInstance().waitForChanges(C).then(function(){var r={};f.getInstance().getRegisteredControllers(C).forEach(function(k){r[k]=f.getInstance().getController(C,k).getCurrentState();});return m({},r);});});};f.prototype.checkXStateInterface=function(C){if(!C){return false;}if(!this.isModificationSupported(C)){return false;}if(!C.isA("sap.ui.mdc.IxState")){return false;}return true;};f.prototype.initAdaptation=function(C,k,a){this.verifyController(C,k);return this._retrievePropertyHelper(C,a);};f.prototype.addController=function(C,k,p){var r=this._createRegistryEntry(C.getAdaptationControl(),p);r.controller[k]=C;};f.prototype.getController=function(C,k){var r=this._getRegistryEntry(C);if(r&&r.controller.hasOwnProperty(k)){return r.controller[k];}};f.prototype.verifyController=function(C,k){var K=k instanceof Array?k:[k];K.forEach(function(s){if(!this.getController(C,s)){var o=f.getControlInstance(C);throw new Error("No controller registered yet for "+o.getId()+" and key: "+s);}}.bind(this));};f.prototype.getUISettings=function(C,k){var K=Array.isArray(k)?k:[k];this.verifyController(C,K);var p=this._getRegistryEntry(C).helper;var u={};K.forEach(function(s){var o=this.getController(C,s);var a=o.getAdaptationUI(p);if(a instanceof Promise){u[s]={};u[s]={resetEnabled:o.getResetEnabled(),containerSettings:o.getUISettings(),adaptationUI:a};}}.bind(this));return u;};f.prototype.isRegisteredForModification=function(C){var r=this._getRegistryEntry(C);return r&&!!r.modification;};f.prototype.getRegisteredControllers=function(C){var r=this._getRegistryEntry(C);return Object.keys(r.controller);};f.prototype._getRegistryEntry=function(C){var o=f.getControlInstance(C);return _.get(o);};f.prototype.getModificationHandler=function(C){var o=this._determineModification(C);return o.handler;};f.prototype._createRegistryEntry=function(C,p){var o=f.getControlInstance(C);if(!_.has(o)){_.set(o,{modification:p&&p.modification?p.modification:null,controller:{},activeP13n:null,helper:null,xConfig:null});}return _.get(o);};f.prototype._determineModification=function(C){var r=this._getRegistryEntry(C);if(r&&r.modification){return r.modification;}var p=f.hasForReference(C,"sap.ui.mdc.p13n.PersistenceProvider");var v=f.hasForReference(C,"sap.ui.fl.variants.VariantManagement");var a=p.length?p:undefined;var h=a?a[0].getMode():"Standard";var H={undefined:F,Global:F,Transient:F,Standard:F,Auto:F};var g=H[h];if(!g){throw new Error("Please provide a valid ModificationHandler! - valid Modification handlers are:"+Object.keys(H));}var o={handler:g.getInstance(),payload:{hasVM:v&&v.length>0,hasPP:p&&p.length>0,mode:h}};if(r&&!r.modification){r.modification=o;}return o;};f.hasForReference=function(C,s){var a=C&&C.getId?C.getId():C;var r=E.registry.filter(function(o){if(!o.isA(s)){return false;}var g=o.getFor();for(var n=0;n<g.length;n++){if(g[n]===a||f.hasControlAncestorWithId(a,g[n])){return true;}}return false;});return r;};f.hasControlAncestorWithId=function(C,a){var o;if(C===a){return true;}o=sap.ui.getCore().byId(C);while(o){if(o.getId()===a){return true;}if(typeof o.getParent==="function"){o=o.getParent();}else{return false;}}return false;};f.getControlInstance=function(C){return typeof C=="string"?sap.ui.getCore().byId(C):C;};f.prototype.hasActiveP13n=function(C){return!!this._getRegistryEntry(C).activeP13n;};f.prototype.setActiveP13n=function(C,k){this._getRegistryEntry(C).activeP13n=k;};f.prototype.validateP13n=function(C,k,p){var o=this.getController(C,k);var a=f.getControlInstance(C);var g=this._getRegistryEntry(C).controller;var t={};Object.keys(g).forEach(function(s){t[s]=g[s].getCurrentState();});if(o&&o.model2State instanceof Function){t[k]=o.model2State();var i=a.validateState(this.externalizeKeys(a,t),k);var h;if(i.validation!==d.None){h=new M({type:i.validation,text:i.message});}if(p.setMessageStrip instanceof Function){p.setMessageStrip(h);}else{L.warning("message strip could not be provided - the adaptation UI needs to implement 'setMessageStrip'");}return i;}else{return undefined;}};f.prototype.handleP13n=function(C,k){var a=[];k.forEach(function(s){var o=this.getController(C,s);var p=this.createChanges({control:C,key:s,state:o.getP13nData(),suppressAppliance:true,applyAbsolute:true}).then(function(i){return o.getBeforeApply().then(function(g){var h=g?g.concat(i):i;return h;});});a.push(p);}.bind(this));return Promise.all(a).then(function(g){var h=[];g.forEach(function(t){h=h.concat(t);});if(h.length>0){f.getInstance()._processChanges(C,h);}});};f.prototype._retrievePropertyHelper=function(C,a){var r=this._getRegistryEntry(C);var o=f.getControlInstance(C);if(a){if(r.helper){r.helper.destroy();}r.helper=new P(a);return Promise.resolve(r.helper);}if(r.helper){return Promise.resolve(r.helper);}return o.initPropertyHelper().then(function(p){r.helper=p;return p;},function(h){throw new Error(h);});};f.getInstance=function(){if(!e){e=new f();}return e;};f.prototype._getRegistry=function(){var r={stateHandlerRegistry:this.stateHandlerRegistry,defaultProviderRegistry:this.defaultProviderRegistry,controlRegistry:{}};this._aRegistry.forEach(function(k){var C=sap.ui.getCore().byId(k);r.controlRegistry[k]=_.get(C);});return r;};f.prototype.destroy=function(){A.prototype.destroy.apply(this,arguments);e=null;this._aRegistry=null;_.delete(this);this.defaultProviderRegistry.destroy();this.defaultProviderRegistry=null;this.stateHandlerRegistry.destroy();this.stateHandlerRegistry=null;this.uimanager.destroy();this.uimanager=null;};return f;});
