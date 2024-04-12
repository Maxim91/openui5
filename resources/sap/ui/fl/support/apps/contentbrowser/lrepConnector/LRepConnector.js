/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/Utils","sap/ui/thirdparty/jquery"],function(U,q){"use strict";var L={};L.sContentPathPrefix="/sap/bc/lrep/content";L.sGetXcsrfTokenUrl="/sap/bc/lrep/actions/getcsrftoken/";L._sXcsrfToken=undefined;L.getContent=function(l,c,r,R,b){var t=this;var g=new Promise(function(f,a){c=encodeURI(c);var s=t._getLayerSuffix(l);var C=t._getContextSuffix(s,R,r);var u=L.sContentPathPrefix+(c?"":"/")+c+s+C;t._sendContentRequest(u,f,a,b);});return g;};L.saveFile=function(l,n,f,F,c,t,p){return new Promise(function(r,R){if(!l||n===undefined||!f||!F){R();}var C=n+f+"."+F;C=encodeURI(C);var s=this._getLayerSuffix(l);var a=this._getChangeListSuffix(t);var P=this._getPackageSuffix(p);var u=L.sContentPathPrefix+C+s+a+P;this._getTokenAndSendPutRequest(u,c,r,R);}.bind(this));};L.deleteFile=function(l,n,f,F,t){return new Promise(function(r,R){if(!l||n===undefined||!f||!F){R();}var c=n+f+"."+F;c=encodeURI(c);var s=this._getLayerSuffix(l);var C=this._getChangeListSuffix(t);var u=L.sContentPathPrefix+c+s+C;this._getTokenAndSendDeletionRequest(u,r,R);}.bind(this));};L._getXcsrfToken=function(){var t=this;return new Promise(function(r,R){if(t._sXcsrfToken){r(t._sXcsrfToken);}q.ajax({url:L.sGetXcsrfTokenUrl,type:"HEAD",beforeSend:function(o){o.setRequestHeader("X-CSRF-Token","fetch");var c=U.getClient();if(c){o.setRequestHeader("sap-client",c);}},success:function(d,m,j){t._sXcsrfToken=j.getResponseHeader("x-csrf-token");r(t._sXcsrfToken);},error:function(j,T,e){L._reportError(j,T,e);R(e);}});});};L._getLayerSuffix=function(l){if(l==="All"){return"";}return"?layer="+l;};L._getChangeListSuffix=function(c){return c?"&changelist="+c:"";};L._getPackageSuffix=function(p){return p?"&package="+p:"";};L._getContextSuffix=function(l,r,R){var s="";if(!r){s+=(l?"&":"?");s+="dt=true";}if(R){s+=(l||s?"&":"?");s+="metadata=true";}return s;};L._reportError=function(j,t,e){sap.ui.require(["sap/ui/fl/support/apps/contentbrowser/utils/ErrorUtils"],function(E){E.displayError("Error",j.status,t+": "+e);});};L._sendContentRequest=function(u,r,R,b){var o={url:u,type:"GET",success:function(d){r(d);},error:function(j,t,e){L._reportError(j,t,e);R(e);}};if(b){o.dataType="text";}q.ajax(o);};L._getTokenAndSendPutRequest=function(u,d,r,R){var t=this;L._getXcsrfToken().then(function(x){t._sendPutRequest(x,u,d,r,R);});};L._sendPutRequest=function(x,u,d,r,R){q.ajax({url:u,contentType:"text/plain",dataType:"text",data:d,beforeSend:function(o){o.setRequestHeader("X-CSRF-Token",x);},type:"PUT",success:function(){r();},error:function(j,t,e){L._reportError(j,t,e);R(e);}});};L._getTokenAndSendDeletionRequest=function(u,r,R){var t=this;this._getXcsrfToken().then(function(x){t._sendDeletionRequest(x,u,r,R);});};L._sendDeletionRequest=function(x,u,r,R){q.ajax({url:u,beforeSend:function(o){o.setRequestHeader("X-CSRF-Token",x);},type:"DELETE",success:function(d){r(d);},error:function(j,t,e){L._reportError(j,t,e);R(e);}});};return L;});
