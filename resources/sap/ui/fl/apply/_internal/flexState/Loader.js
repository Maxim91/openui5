/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/apply/_internal/flexState/ManifestUtils","sap/ui/fl/initial/_internal/Storage","sap/ui/fl/Utils"],function(M,A,U){"use strict";function g(s){if(typeof s==="string"){s={id:s};}s.idIsLocal=true;return s;}function m(b,F){if(b){[F.changes,F.variantChanges,F.variantDependentControlChanges,F.variantManagementChanges].forEach(function(a){a.forEach(function(o){if(!o.selector.idIsLocal){o.selector=g(o.selector);if(o.dependentSelector){Object.keys(o.dependentSelector).forEach(function(c){if(Array.isArray(o.dependentSelector[c])){o.dependentSelector[c]=o.dependentSelector[c].map(g);}else{o.dependentSelector[c]=g(o.dependentSelector[c]);}});}}});});}return F;}function i(o){return o&&!!M.getOvpEntry(o);}function f(F){return{changes:F,cacheKey:F.cacheKey};}return{loadFlexData:function(p){var c=M.getBaseComponentNameFromManifest(p.manifest);if(p.partialFlexData){return A.completeFlexData({reference:p.reference,componentName:c,partialFlexData:p.partialFlexData}).then(f);}var C=p.reInitialize?undefined:M.getCacheKeyFromAsyncHints(p.reference,p.asyncHints);return A.loadFlexData({preview:M.getPreviewSectionFromAsyncHints(p.asyncHints),reference:p.reference,componentName:c,cacheKey:C,siteId:U.getSiteIdByComponentData(p.componentData),appDescriptor:p.manifest.getRawJson?p.manifest.getRawJson():p.manifest,version:p.version,allContexts:p.allContexts}).then(m.bind(undefined,i(p.manifest))).then(f);}};});
