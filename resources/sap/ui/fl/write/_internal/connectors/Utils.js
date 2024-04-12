/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/initial/_internal/connectors/Utils"],function(U){"use strict";function u(p){return U.sendRequest(p.tokenUrl,"HEAD").then(function(r){if(r&&r.xsrfToken){if(p.initialConnector){p.initialConnector.xsrfToken=r.xsrfToken;}p.xsrfToken=r.xsrfToken;return p;}});}function a(p,s,m){return u(p).then(U.sendRequest.bind(undefined,s,m));}function b(s,t,k){if(!t[k]){t[k]=s[k];return;}if(Array.isArray(t[k])){t[k]=t[k].concat(s[k]);return;}if(typeof t[k]==='object'){Object.keys(s[k]).forEach(function(i){b(s[k],t[k],i);});}t[k]=s[k];}return{getRequestOptions:function(i,t,f,c,d){var o={xsrfToken:i.xsrfToken,tokenUrl:t,initialConnector:i};if(f){o.payload=JSON.stringify(f);}if(c){o.contentType=c;}if(d){o.dataType=d;}return o;},sendRequest:function(s,m,p){if(!p.initialConnector||(!p.initialConnector.xsrfToken&&!(m==='GET')&&!(m==='HEAD'))){return a(p,s,m);}return U.sendRequest(s,m,p).then(function(r){return r;}).catch(function(f){if(f.status===403){return a(p,s,m);}throw f;});},mergeResults:function(r){var R={};r.forEach(function(o){Object.keys(o).forEach(function(k){b(o,R,k);});});return R;}};});
