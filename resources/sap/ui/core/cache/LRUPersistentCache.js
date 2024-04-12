/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/performance/Measurement"],function(L,M){"use strict";var a={name:"LRUPersistentCache",defaultOptions:{databaseName:"ui5-cachemanager-db",_contentStoreName:"content-store",_metadataStoreName:"metadata-store",_metadataKey:"metadataKey"},_db:{},init:function(){this._metadata={};this._mru=-1;this._lru=-1;return l(this);},_destroy:function(){if(this._db.close){this._db.close();}this._metadata=null;this._ui5version=null;},set:function(e,i){if(E(e)){L.warning("Cache Manager ignored 'set' for key ["+e+"]");return Promise.resolve();}if(e==null){return Promise.reject("Cache Manager does not accept undefined or null as key");}if(typeof i==="undefined"){return Promise.reject("Cache Manager does not accept undefined as value");}L.debug("Cache Manager LRUPersistentCache: adding item with key ["+e+"]...");var p=this,H="[sync ] fnSet: total[sync]  key ["+e+"]",J="[sync ] fnSet: txStart[sync]  key ["+e+"]",K="[sync ] fnSet: storeOpen[sync]  key ["+e+"]",N="[sync ] fnSet: putContent[sync]  key ["+e+"]",O="[sync ] fnSet: putMetadata[sync]  key ["+e+"]",P="[sync ] fnSet: serialize[sync]  key ["+e+"]";return new Promise(function Y(Q,R){M.start(H,"CM",s);var S,T,U,V,W;W=q(p._metadata);V=new n(e,i,typeof i,++p._mru,P,s).serialize();M.start(J,"CM",s);var X=p._db.transaction([p.defaultOptions._contentStoreName,p.defaultOptions._metadataStoreName],"readwrite");M.end(J);X.onerror=function(Z){var $="Cache Manager cannot complete add/put transaction for entry with key: "+V.oData.key+". Details: "+B(Z);L.error($);p._metadata=W;r(p);R($);};X.onabort=function(Z){p._metadata=W;r(p);var $=t(p);if(y(Z)&&$>0){L.warning("Cache Manager is trying to free some space to add/put new item");x(p,e,i).then(function(){L.debug("Cache Manager LRUPersistentCache: set completed after freeing space. ItemCount changed from "+$+" to "+t(p));Q();},function(a1){var b1="Cache Manager LRUPersistentCache: set unsuccessful. Cannot free space to add/put entry. Details: "+a1;L.error(b1);R(b1);});}else{var _="Cache Manager LRUPersistentCache: set failed: "+B(Z);L.error(_);R(_);}};X.oncomplete=function(){L.debug("Cache Manager LRUPersistentCache: adding item with key ["+e+"]... done");Q();};M.start(K,"CM",s);S=X.objectStore(p.defaultOptions._contentStoreName);U=X.objectStore(p.defaultOptions._metadataStoreName);M.end(K);M.start(N,"CM",s);T=S.put(V.oData,V.oData.key);M.end(N);M.end(H);T.onsuccess=function(){u(p,V);M.start(O,"CM",s);U.put(p._metadata,p.defaultOptions._metadataKey);M.end(O);};if(L.getLevel()>=L.Level.DEBUG){L.debug("Cache Manager LRUPersistentCache: measurements: "+H+": "+M.getMeasurement(H).duration+"; "+P+": "+M.getMeasurement(P).duration+"; "+J+": "+M.getMeasurement(J).duration+"; "+K+": "+M.getMeasurement(K).duration+"; "+N+": "+M.getMeasurement(N).duration+"; "+O+": "+M.getMeasurement(O).duration);}});},has:function(e){if(E(e)){L.warning("Cache Manager ignored 'has' for key ["+e+"]");return Promise.resolve(false);}return this.get(e).then(function(i){return typeof i!=="undefined";});},_getCount:function(){return Promise.resolve(t(this));},_getAll:function(e){var i=this,p,H="[sync ] _getAll: deserialize";return new Promise(function(J,K){var N=[],O=i._db.transaction([i.defaultOptions._contentStoreName],"readonly"),P=O.objectStore(i.defaultOptions._contentStoreName);O.onerror=function(Q){K(B(Q));};O.oncomplete=function(Q){J(N);};P.openCursor().onsuccess=function(Q){var R=Q.target.result;if(R&&R.value){p=new n(R.value,H,m).deserialize();N.push({key:p.oData.key,value:p.oData.value});R.continue();}};});},_loadMetaStructure:function(){var i=this;return new Promise(function(p,H){var J=i._db.transaction([i.defaultOptions._metadataStoreName],"readonly");J.onerror=function(O){if(!J.errorHandled){J.errorHandled=true;var P="Cache Manager cannot complete transaction for read metadata. Details: "+J.error;L.error(P);H(P);}};var K=J.objectStore(i.defaultOptions._metadataStoreName);try{var N=K.get(i.defaultOptions._metadataKey);N.onsuccess=function(O){i._metadata=N.result?N.result:o(i._ui5version);if(i._metadata.__ui5version!==i._ui5version){i.reset().then(p,function(e){L.error("Cannot reset the cache. Details:"+e);J.abort();});}else{if(!i._metadata.timestamps){i._metadata.timestamps={};}p();}};N.onerror=function(O){L.error("Cache Manager cannot complete transaction for read metadata items. Details: "+O.message);H(O.message);};}catch(e){L.error("Cache Manager cannot read metadata entries behind key: "+i.defaultOptions._metadataKey+". Details: "+e.message);H(e.message);}});},get:function(e){if(E(e)){L.warning("Cache Manager ignored 'get' for key ["+e+"]");return Promise.resolve();}return g(this,e);},del:function(e){if(E(e)){L.warning("Cache Manager ignored 'del' for key ["+e+"]");return Promise.resolve();}return d(this,e);},delWithFilters:function(e){var i=this,p=e||{};return new Promise(function(H,J){var K=q(i._metadata),T=i._db.transaction([i.defaultOptions._contentStoreName,i.defaultOptions._metadataStoreName],"readwrite"),N=T.objectStore(i.defaultOptions._contentStoreName),O=T.objectStore(i.defaultOptions._metadataStoreName),P=N.openCursor(),Q=p.prefix||"";function R(){i._metadata=K;r(i);}function S(U){R();J(B(U));}T.onerror=S;T.onabort=S;T.oncomplete=function(U){H();};P.onsuccess=function(U){var V=U.target.result,W,X;if(!V){O.put(i._metadata,i.defaultOptions._metadataKey);return;}W=V.value.key;if(W.indexOf(Q)===0&&(!p.olderThan||!(W in i._metadata.timestamps)||i._metadata.timestamps[W]<=p.olderThan)){X=V.delete();X.onsuccess=function(){L.debug('Deleted '+W+'!');z(i,W);};}V.continue();};});},reset:function(){var i=this;return new Promise(function(p,H){var J,K,N,O,P;P=i._db.transaction([i.defaultOptions._contentStoreName,i.defaultOptions._metadataStoreName],"readwrite");P.onerror=P.onabort=function(Q){if(!P.errorHandled){P.errorHandled=true;var R="Cache Manager LRUPersistentCache: transaction for reset() failed. Details: "+P.error;L.error(R);H(R);}};P.oncomplete=function(Q){p();};J=P.objectStore(i.defaultOptions._contentStoreName);K=P.objectStore(i.defaultOptions._metadataStoreName);try{N=J.clear();N.onerror=function(){P.abort();};N.onsuccess=function(){O=K.clear();O.onerror=function(){P.abort();};O.onsuccess=function(){i._metadata=o(sap.ui.version);r(i);};};}catch(e){P.abort();}});}};var m="LRUPersistentCache,get",s="LRUPersistentCache,set",b=0;function c(i,p){var H;i._metadata.timestamps[p.oData.key]=Date.now();H=i._db.transaction([i.defaultOptions._contentStoreName,i.defaultOptions._metadataStoreName],"readwrite");H.onerror=H.onabort=function(J){L.warning("Cache Manager cannot persist the information about usage of an entry. This may lead to earlier removal of the entry if browser storage space is over. Details: "+H.error);};try{H.objectStore(i.defaultOptions._metadataStoreName).put(i._metadata,i.defaultOptions._metadataKey);}catch(e){L.warning("Cache Manager cannot persist the information about usage of an entry. This may lead to earlier removal of the entry if browser storage space is over. Details: "+e.message);}}function d(e,i){return new Promise(function(p,H){var J,K;J=e._db.transaction([e.defaultOptions._contentStoreName,e.defaultOptions._metadataStoreName],"readwrite");K=q(e._metadata);function N(P){e._metadata=K;r(e);var Q="Cache Manager LRUPersistentCache: cannot delete item with key: "+i+". Details: "+B(P);L.error(Q);H(Q);}J.onerror=N;J.onabort=N;J.oncomplete=function(){if(t(e)===0){e._lru=-1;e._mru=-1;e._metadata=o(e._ui5version);}L.debug("Cache Manager LRUPersistentCache: item with key "+i+" deleted");p();};L.debug("Cache Manager LRUPersistentCache: deleting item ["+i+"]");var O=J.objectStore(e.defaultOptions._contentStoreName).delete(i);O.onsuccess=function(){L.debug("Cache Manager LRUPersistentCache: request for deleting item ["+i+"] is successful, updating metadata...");z(e,i);J.objectStore(e.defaultOptions._metadataStoreName).put(e._metadata,e.defaultOptions._metadataKey);};});}function g(i,H){if(i.getCounter===undefined){i.getCounter=0;}i.getCounter++;var J="[sync ] fnGet"+i.getCounter+": total[sync]  key ["+H+"]",K="[sync ] fnGet"+i.getCounter+": txStart[sync]  key ["+H+"]",N="[sync ] fnGet"+i.getCounter+": storeOpen[sync]  key ["+H+"]",O="[sync ] fnGet"+i.getCounter+": access result[sync]  key ["+H+"]",P="[sync ] fnGet"+i.getCounter+": putMetadata[sync]  key ["+H+"]",Q="[sync ] fnGet"+i.getCounter+": deserialize[sync]  key ["+H+"]",R="[sync ]  _instance.get",S="[sync ]  getRequest.onSuccess";L.debug("Cache Manager LRUPersistentCache: get for key ["+H+"]...");M.start(R,"CM",m);var p=new Promise(function Z(T,U){var V,W,X,Y;M.start(J,"CM",m);M.start(K,"CM",m);W=i._db.transaction([i.defaultOptions._contentStoreName,i.defaultOptions._metadataStoreName],"readwrite");M.end(K);W.onerror=function($){var _="Cache Manager cannot complete delete transaction for entry with key: "+H+". Details: "+W.error;L.error(_);U(_);};try{M.start(N,"CM",m);X=W.objectStore(i.defaultOptions._contentStoreName).get(H);M.end(N);X.onsuccess=function($){M.start(S,"CM",m);M.start(O,"CM",m);Y=new n(X.result,Q,m);M.end(O);G("Cache Manager LRUPersistentCache: accessing the result",H,O);if(Y.oData){M.start(P,"CM",m);if(Y.oData.lu!==i._mru){Y.oData.lu=++i._mru;u(i,Y);}c(i,Y);M.end(P);V=Y.deserialize().oData.value;}M.end(S);L.debug("Cache Manager LRUPersistentCache: get for key ["+H+"]...done");T(V);};X.onerror=function($){L.error("Cache Manager cannot get entry with key: "+H+". Details: "+$.message);U($.message);};}catch(e){L.error("Cache Manager cannot get entry with key: "+H+". Details: "+e.message);U(e.message);return;}M.end(J);});M.end(R);return p;}function f(e){var K=v(e);if(K==undefined){var i="Cache Manager LRUPersistentCache: deleteItemAndUpdateMetadata cannot find item to delete";L.debug(i);return Promise.reject(i);}return j(e,K).then(function(){return Promise.resolve().then(function(){z(e,K);return h(e).then(function(){return K;},function(){L.warning("Cache Manager LRUPersistentCache: Free space algorithm deleted item "+"but the metadata changes could not be persisted. This won't break the functionality.");return K;});});});}function h(i){return new Promise(function(p,H){try{var J=i._db.transaction([i.defaultOptions._contentStoreName,i.defaultOptions._metadataStoreName],"readwrite");J.onerror=K;J.onabort=K;J.oncomplete=function(){L.debug("Cache Manager LRUPersistentCache: persistMetadata - metadata was successfully updated");p();};J.objectStore(i.defaultOptions._metadataStoreName).put(i._metadata,i.defaultOptions._metadataKey);}catch(e){K(null,e);}function K(N,O){var P="Cache Manager LRUPersistentCache: persistMetadata error - metadata was not successfully persisted. Details: "+B(N)+". Exception: "+(O?O.message:"");L.debug(P);H(P);}});}function j(e,i){return new Promise(function(p,H){var J=e._db.transaction([e.defaultOptions._contentStoreName,e.defaultOptions._metadataStoreName],"readwrite");function K(N){var O="Cache Manager LRUPersistentCache: internalDel cannot complete delete transaction for entry with key: "+i+". Details: "+B(N);L.warning(O);H(N);}J.onerror=K;J.onabort=K;J.oncomplete=function(){if(t(e)===0){e._lru=0;e._mru=0;e._metadata=o(e._ui5version);}L.debug("Cache Manager LRUPersistentCache: internalDel deleting item ["+i+"]...done");p();};L.debug("Cache Manager LRUPersistentCache: internalDel deleting item ["+i+"]...");J.objectStore(e.defaultOptions._contentStoreName).delete(i);});}function k(e,i,p){return new Promise(function(H,J){var K,N,O,P="[sync ] internalSet: serialize[sync]  key ["+i+"]";O=q(e._metadata);var Q=new n(i,p,typeof p,++e._mru,P,s).serialize();L.debug("Cache Manager: LRUPersistentCache: internal set with parameters: key ["+Q.oData.key+"], access index ["+Q.oData.lu+"]");N=e._db.transaction([e.defaultOptions._contentStoreName,e.defaultOptions._metadataStoreName],"readwrite");N.onerror=R;N.onabort=R;function R(S){L.debug("Cache Manager: LRUPersistentCache: internal set failed. Details: "+B(S));e._metadata=O;r(e);J(S);}N.oncomplete=function(){L.debug("Cache Manager: LRUPersistentCache: Internal set transaction completed. ItemCount: "+t(e));H();};K=N.objectStore(e.defaultOptions._contentStoreName).put(Q.oData,Q.oData.key);K.onsuccess=function(){u(e,Q);N.objectStore(e.defaultOptions._metadataStoreName).put(e._metadata,e.defaultOptions._metadataKey);};});}function u(e,i){if(e._metadata.__byKey__[i.oData.key]!=null){var p=e._metadata.__byKey__[i.oData.key];delete e._metadata.__byIndex__[p];L.debug("Cache Manager LRUPersistentCache: set/internalset - item already exists, so its indexes are updated");}e._metadata.__byIndex__[i.oData.lu]=i.oData.key;e._metadata.__byKey__[i.oData.key]=i.oData.lu;A(e);}function l(i){i._ui5version=sap.ui.version;return new Promise(function N(p,H){var J;L.debug("Cache Manager "+"_initIndexedDB started");function K(){try{J=window.indexedDB.open(i.defaultOptions.databaseName,1);}catch(e){L.error("Could not open Cache Manager database. Details: "+e.message);H(e.message);}}K();J.onerror=function(e){L.error("Could not initialize Cache Manager database. Details: "+e.message);H(e.error);};J.onsuccess=function(e){var O=F("init_onsuccess");i._db=J.result;i._db.onversionchange=function(e){if(!e.newVersion){e.target.close();}};i._loadMetaStructure().then(function(){L.debug("Cache Manager "+" metadataLoaded. Serialization support: "+C()+", resolving initIndexDb promise");p(i);},H);O.endSync();};J.onupgradeneeded=function(O){var P=O.target.result;P.onerror=function(O){L.error("Cache Manager error. Details: "+O.message);H(P.error);};try{var Q=P.createObjectStore(i.defaultOptions._contentStoreName);P.createObjectStore(i.defaultOptions._metadataStoreName);}catch(e){L.error("Could not initialize Cache Manager object store. Details: "+e.message);throw e;}Q.createIndex("ui5version","ui5version",{unique:false});};});}function I(e,i,p,H){this.key=e;this.sOrigType=p;this.value=i;this.lu=H;}function n(e,i,p,H,J,K){if(arguments.length===3){this.oData=e;this.sMeasureId=i;this.sMsrCat=p;}else{this.oData=new I(e,i,p,H);}}n.prototype.deserialize=function(){if(C()&&this.oData.sOrigType==="object"){M.start(this.sMeasureId,this.sMeasureId,this.sMsrCat);this.oData.value=JSON.parse(this.oData.value);M.end(this.sMeasureId);G("Cache Manager LRUPersistentCache: de-serialization the result",this.oData.key,this.sMeasureId);}return this;};n.prototype.serialize=function(){if(C()&&this.oData.sOrigType==="object"){M.start(this.sMeasureId,this.sMeasureId,this.sMsrCat);this.oData.value=JSON.stringify(this.oData.value);M.end(this.sMeasureId);G("Cache Manager LRUPersistentCache: serialization of the value",this.oData.key,this.sMeasureId);}return this;};function o(e){return{timestamps:{},__byKey__:{},__byIndex__:{},__ui5version:e};}function q(e){var i=o(e.__ui5version);for(var p in e.__byIndex__){i.__byIndex__[p]=e.__byIndex__[p];}for(var H in e.__byKey__){i.__byKey__[H]=e.__byKey__[H];}for(var H in e.timestamps){i.timestamps[H]=e.timestamps[H];}return i;}function r(e){var i=w(e._metadata.__byIndex__);e._mru=i.mru;e._lru=i.lru;L.debug("Cache Manager LRUPersistentCache: LRU counters are assigned to the CM: "+JSON.stringify(i));}function t(e){return Object.keys(e._metadata.__byKey__).length;}function v(e){var K=e._metadata.__byIndex__[e._lru];if(K==undefined&&!A(e)){return null;}else{return e._metadata.__byIndex__[e._lru];}}function w(e){var i=-1,p=-1,H=Number.MAX_VALUE,J=Object.keys(e),K=J.length;if(K===0){return{mru:-1,lru:-1};}else{while(++i<K){var N=parseInt(J[i]);if(p<N){p=N;}if(H>N){H=N;}}return{mru:p,lru:H};}}function x(e,i,p){return new Promise(function(H,J){var K=0;_(e,i,p);function _(e,i,p){K++;L.debug("Cache Manager LRUPersistentCache: cleanAndStore: freeing space attempt ["+(K)+"]");f(e).then(function(N){L.debug("Cache Manager LRUPersistentCache: cleanAndStore: deleted item with key ["+N+"]. Going to put "+i);return k(e,i,p).then(H,function(O){if(y(O)){L.debug("Cache Manager LRUPersistentCache: cleanAndStore: QuotaExceedError during freeing up space...");if(t(e)>0){_(e,i,p);}else{J("Cache Manager LRUPersistentCache: cleanAndStore: even when the cache is empty, the new item with key ["+i+"] cannot be added");}}else{J("Cache Manager LRUPersistentCache: cleanAndStore: cannot free space: "+B(O));}});},J);}});}function y(e){return(e&&e.target&&e.target.error&&e.target.error.name==="QuotaExceededError");}function z(e,i){var p=e._metadata.__byKey__[i];delete e._metadata.__byKey__[i];delete e._metadata.__byIndex__[p];if(e._metadata.timestamps[i]){delete e._metadata.timestamps[i];}A(e);}function A(e){while(e._lru<=e._mru&&e._metadata.__byIndex__[e._lru]==undefined){e._lru++;}return(e._lru<=e._mru);}function B(e){if(!e){return"";}var R=e.message;if(e.target&&e.target.error&&e.target.error.name){R+=" Error name: "+e.target.error.name;}return R;}function C(){return sap.ui.getCore().getConfiguration().isUI5CacheSerializationSupportOn();}function D(){return sap.ui.getCore().getConfiguration().getUI5CacheExcludedKeys();}function E(e){return D().some(function(i){return e.indexOf(i)>-1;});}function F(O,e){b++;var i="[async]  "+O+"["+e+"]- #"+(b),p="[sync ]  "+O+"["+e+"]- #"+(b);M.start(i,"CM",["LRUPersistentCache",O]);M.start(p,"CM",["LRUPersistentCache",O]);return{sMeasureAsync:i,sMeasureSync:p,endAsync:function(){M.end(this.sMeasureAsync);},endSync:function(){M.end(this.sMeasureSync);}};}function G(e,K,i){if(L.getLevel()>=L.Level.DEBUG){L.debug(e+" for key ["+K+"] took: "+M.getMeasurement(i).duration);}}return a;});