/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./AnnotationParser","sap/base/assert","sap/base/Log","sap/base/util/extend","sap/base/util/isEmptyObject","sap/ui/base/EventProvider","sap/ui/thirdparty/jquery"],function(A,a,L,e,b,E,q){"use strict";var O=E.extend("sap.ui.model.odata.ODataAnnotations",{constructor:function(o){E.apply(this,arguments);if(arguments.length!==1){if(typeof arguments[2]==="object"){o=arguments[2];}o.urls=arguments[0];o.metadata=arguments[1];}this.oMetadata=o.metadata;this.oAnnotations=o.annotationData?o.annotationData:{};this.bLoaded=false;this.bAsync=o&&o.async;this.xPath=null;this.oError=null;this.bValidXML=true;this.oRequestHandles=[];this.oLoadEvent=null;this.oFailedEvent=null;this.mCustomHeaders=o.headers?e({},o.headers):{};if(o.urls){this.addUrl(o.urls);if(!this.bAsync){a(!b(this.oMetadata),"Metadata must be available for synchronous annotation loading");if(this.oError){L.error("OData annotations could not be loaded: "+this.oError.message);}}}},metadata:{publicMethods:["parse","getAnnotationsData","attachFailed","detachFailed","attachLoaded","detachLoaded"]}});O.prototype.getAnnotationsData=function(){return this.oAnnotations;};O.prototype.isLoaded=function(){return this.bLoaded;};O.prototype.isFailed=function(){return this.oError!==null;};O.prototype.fireLoaded=function(p){this.fireEvent("loaded",p);return this;};O.prototype.attachLoaded=function(d,f,l){this.attachEvent("loaded",d,f,l);return this;};O.prototype.detachLoaded=function(f,l){this.detachEvent("loaded",f,l);return this;};O.prototype.fireFailed=function(p){this.fireEvent("failed",p);return this;};O.prototype.attachFailed=function(d,f,l){this.attachEvent("failed",d,f,l);return this;};O.prototype.detachFailed=function(f,l){this.detachEvent("failed",f,l);return this;};O.prototype.setHeaders=function(h){this.mCustomHeaders=e({},h);};O.prototype._createXMLDocument=function(x,X){var o=null;if(typeof x==="string"){X=x;x=null;}if(x){o=x;}else{o=new DOMParser().parseFromString(X,'application/xml');}return o;};O.prototype._documentHasErrors=function(x){return x.getElementsByTagName("parsererror").length>0;};O.prototype._mergeAnnotationData=function(m,s){if(!this.oAnnotations){this.oAnnotations={};}A.merge(this.oAnnotations,m);this.bLoaded=true;if(!s){this.fireLoaded({annotations:m});}};O.prototype.setXML=function(x,X,o){var d={success:function(){},error:function(){},fireEvents:false};o=e({},d,o);var c=this._createXMLDocument(x,X);var p=function(c){var r={xmlDoc:c};var f=A.parse(this.oMetadata,c);if(f){r.annotations=f;o.success(r);this._mergeAnnotationData(f,!o.fireEvents);}else{o.error(r);if(o.fireEvents){this.fireFailed(r);}}}.bind(this,c);if(this._documentHasErrors(c)){o.error({xmlDoc:c});return false;}else{var m=this.oMetadata.getServiceMetadata();if(!m||b(m)){this.oMetadata.attachLoaded(p);}else{p();}return true;}};O.prototype.addUrl=function(u){var t=this;var U=u;if(Array.isArray(u)&&u.length==0){return Promise.resolve({annotations:this.oAnnotations});}if(!Array.isArray(u)){U=[u];}return new Promise(function(r,R){var l=0;var m={annotations:null,success:[],fail:[]};var f=function(d){l++;if(d.type==="success"){m.success.push(d);}else{m.fail.push(d);}if(l===U.length){m.annotations=t.oAnnotations;if(m.success.length>0){var s={annotations:t.oAnnotations,results:m};t.fireLoaded(s);}if(m.success.length<U.length){var o=new Error("At least one annotation failed to load/parse/merge");o.annotations=m.annotations;o.success=m.success;o.fail=m.fail;R(o);}else{r(m);}}};var i=0;if(t.bAsync){var p=Promise.resolve();for(i=0;i<U.length;++i){var c=t._loadFromUrl.bind(t,U[i]);p=p.then(c,c).then(f,f);}}else{for(i=0;i<U.length;++i){t._loadFromUrl(U[i]).then(f,f);}}});};O.prototype._loadFromUrl=function(u){var t=this;return new Promise(function(r,R){var m={url:u,async:t.bAsync,headers:e({},t.mCustomHeaders,{"Accept-Language":sap.ui.getCore().getConfiguration().getLanguageTag()})};var o;var f=function(j,S){if(o&&o.bSuppressErrorHandlerCall){return;}t.oError={type:"fail",url:u,message:S,statusCode:j.status,statusText:j.statusText,responseText:j.responseText};if(t.bAsync){t.oFailedEvent=setTimeout(t.fireFailed.bind(t,t.oError),0);}else{t.fireFailed(t.oError);}R(t.oError);};var s=function(d,S,j){t.setXML(j.responseXML,j.responseText,{success:function(D){r({type:"success",url:u,message:S,statusCode:j.status,statusText:j.statusText,responseText:j.responseText});},error:function(D){f(j,"Malformed XML document");},url:u});};q.ajax(m).done(s).fail(f);});};O.prototype.destroy=function(){for(var i=0;i<this.oRequestHandles.length;++i){if(this.oRequestHandles[i]){this.oRequestHandles[i].bSuppressErrorHandlerCall=true;this.oRequestHandles[i].abort();this.oRequestHandles[i]=null;}}E.prototype.destroy.apply(this,arguments);if(this.oLoadEvent){clearTimeout(this.oLoadEvent);}if(this.oFailedEvent){clearTimeout(this.oFailedEvent);}};return O;});
