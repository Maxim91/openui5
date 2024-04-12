/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/apply/_internal/flexState/FlexState","sap/ui/fl/Utils","sap/base/Log"],function(F,U,L){"use strict";var C=function(){};function _(c,o){var s=F.getFlexObjectsFromStorageResponse(c);if(o.fileType==="variant"){return s.comp.variants;}if(o.selector.persistencyKey){return s.comp.changes;}return s.changes;}function a(c,s){if(!s){return c;}return c===C.NOTAG?c.replace(/>$/,''.concat('-',s,'>')):c.concat('-',s);}function b(c){return c.replace(/(^W\/|")/g,'');}C.NOTAG="<NoTag>";C.clearEntries=function(){F.clearState();};C.getChangesFillingCache=function(c,p,i){var P=Promise.resolve();if(i){P=F.clearAndInitialize(p);}return P.then(function(){return F.getStorageResponse(c.name);}).catch(function(){return{};});};C.getCacheKey=function(c,A){if(!c||!c.name||!A){L.warning("Not all parameters were passed to determine a flexibility cache key.");return Promise.resolve(C.NOTAG);}return this.getChangesFillingCache(c).then(function(w){if(w&&w.cacheKey){return b(w.cacheKey);}return C.NOTAG;}).then(function(s){var v=A.getModel(U.VARIANT_MODEL_NAME);var d=v?v.getCurrentControlVariantIds():[];return a(s,d.join("-"));});};C.addChange=function(c,o){var d=_(c.name,o);if(!d){return;}d.push(o);};C.updateChange=function(c,o){var d=_(c.name,o);if(!d){return;}for(var i=0;i<d.length;i++){if(d[i].fileName===o.fileName){d.splice(i,1,o);break;}}};C.deleteChange=function(c,o){var d=_(c.name,o);if(!d){return;}for(var i=0;i<d.length;i++){if(d[i].fileName===o.fileName){d.splice(i,1);break;}}};C.removeChanges=function(c,d){var e=F.getFlexObjectsFromStorageResponse(c.name);e.changes=e.changes.filter(function(o){return d.indexOf(o.fileName)===-1;});var v=F.getVariantsState(c.name);Object.keys(v).forEach(function(i){v[i].variants.forEach(function(V){V.controlChanges=V.controlChanges.filter(function(o){return d.indexOf(o.getFileName())===-1;});});});};return C;},true);
