/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/base/Object','sap/ui/base/Metadata','sap/ui/core/mvc/ControllerMetadata','sap/ui/core/mvc/OverrideExecution','sap/base/util/uid',"sap/base/Log"],function(B,M,C,O,u,L){"use strict";var a=B.extend("sap.ui.core.mvc.ControllerExtension",{metadata:{stereotype:"controllerextension",methods:{"byId":{"public":true,"final":true},"getView":{"public":true,"final":true},"getInterface":{"public":false,"final":true}}},_setController:function(c){this.base=c;},byId:function(i){var n=this.getMetadata().getNamespace();i=n+"."+i;return this.base?this.base.byId(i):undefined;},getView:function(){return this.base.getView();},getInterface:function(){var m={};var o=this.getMetadata();var p=o.getAllPublicMethods();p.forEach(function(s){var f=this[s];if(typeof f==='function'){m[s]=function(){var t=f.apply(this,arguments);return(t instanceof a)?t.getInterface():t;}.bind(this);}}.bind(this));this.getInterface=function(){return m;};return m;}},C);a.override=function(e){var c=M.createClass(this,"anonymousExtension~"+u(),{},C);c.getMetadata()._staticOverride=e;c.getMetadata()._override=this.getMetadata()._override;return c;};a.overrideMethod=function(m,o,c,b,s){var f=o[m];var d=c[m];s=s||O.Instead;function w(e){(function(d,f,b,e){o[m]=function(){if(e){d.apply(b,arguments);return f.apply(o,arguments);}else{f.apply(o,arguments);return d.apply(b,arguments);}};})(d,f,b,e);}if(typeof d==='function'&&b){d=d.bind(b);}switch(s){case O.Before:if(f&&typeof f==="function"){w(true);}else if(typeof d==="function"){o[m]=d;}else{L.error("Controller extension failed: lifecycleMethod '"+m+"', is not a function");}break;case O.After:if(f&&typeof f==="function"){w(false);}else if(typeof d==="function"){o[m]=d;}else{L.error("Controller extension failed: lifecycleMethod '"+m+"', is not a function");}break;case O.Instead:default:if(m in o){L.debug("Overriding  member '"+m+"' of extension "+this.getMetadata().getName());if(!this.getMetadata().isMethodFinal(m)){o[m]=d;}else{L.error("Error in ControllerExtension.override: Method '"+m+"' of extension '"+this.getMetadata().getName()+"' is flagged final and cannot be overridden!");}}else{o[m]=d;}break;}};return a;});