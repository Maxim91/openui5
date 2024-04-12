/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/initial/_internal/StorageUtils","sap/ui/fl/initial/_internal/StorageResultMerger","sap/ui/fl/initial/_internal/storageResultDisassemble","sap/ui/fl/write/api/Version","sap/ui/fl/Utils"],function(S,a,s,V,U){"use strict";function _(C,o,p){if(!o.layers||(o.layers[0]!=="ALL"&&o.layers.indexOf("CUSTOMER")===-1)){delete C.version;return C;}if(p.version!==undefined){C.version=p.version;return C;}var v=U.getUrlParameter(V.UrlParameter);if(v===null){delete C.version;}else{C.version=parseInt(v);}return C;}function b(p,C){var h=C.map(function(o){var i=Object.assign({},p,{url:o.url,path:o.path});i=_(i,o,p);return o.loadConnectorModule.loadFlexData(i).then(function(r){return r||S.getEmptyFlexDataResponse();}).catch(S.logAndResolveDefault.bind(undefined,S.getEmptyFlexDataResponse(),o,"loadFlexData"));});return Promise.all(h);}function c(r){var F=[];r.forEach(function(R){if(Array.isArray(R)){F=F.concat(R);}else{F.push(R);}});return F;}function d(r){return r.map(function(R){return s(R);});}function e(r){return Promise.resolve(r).then(c).then(d).then(c).then(a.merge);}function f(p){return S.getStaticFileConnector().then(b.bind(this,p));}var g={};g.completeFlexData=function(p){if(!p||!p.reference){return Promise.reject("No reference was provided");}return Promise.all([f(p),p.partialFlexData]).then(e);};g.loadFlexData=function(p){if(!p||!p.reference){return Promise.reject("No reference was provided");}return S.getLoadConnectors().then(b.bind(this,p)).then(e);};return g;});
