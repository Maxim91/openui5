/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Context","./ODataBinding","./lib/_Helper","sap/base/Log","sap/ui/base/SyncPromise","sap/ui/model/ChangeReason"],function(C,a,_,L,S,b){"use strict";function O(){a.call(this);this.mAggregatedQueryOptions={};this.bAggregatedQueryOptionsInitial=true;this.aChildCanUseCachePromises=[];this.bHasPathReductionToParent=false;this.iPatchCounter=0;this.bPatchSuccess=true;this.oReadGroupLock=undefined;this.oRefreshPromise=null;this.oResumePromise=undefined;}a(O.prototype);var c="sap.ui.model.odata.v4.ODataParentBinding";O.prototype.attachPatchCompleted=function(f,l){this.attachEvent("patchCompleted",f,l);};O.prototype.detachPatchCompleted=function(f,l){this.detachEvent("patchCompleted",f,l);};O.prototype.doSuspend=function(){};O.prototype.firePatchCompleted=function(s){if(this.iPatchCounter===0){throw new Error("Completed more PATCH requests than sent");}this.iPatchCounter-=1;this.bPatchSuccess=this.bPatchSuccess&&s;if(this.iPatchCounter===0){this.fireEvent("patchCompleted",{success:this.bPatchSuccess});this.bPatchSuccess=true;}};O.prototype.attachPatchSent=function(f,l){this.attachEvent("patchSent",f,l);};O.prototype.detachPatchSent=function(f,l){this.detachEvent("patchSent",f,l);};O.prototype.firePatchSent=function(){this.iPatchCounter+=1;if(this.iPatchCounter===1){this.fireEvent("patchSent");}};O.prototype._findEmptyPathParentContext=function(o){if(this.sPath===""&&this.oContext.getBinding){return this.oContext.getBinding()._findEmptyPathParentContext(this.oContext);}return o;};O.prototype.aggregateQueryOptions=function(q,B,e,i){var A=_.merge({},e&&this.mLateQueryOptions||this.mAggregatedQueryOptions),t=this;function m(f,Q,M,I,g){function h(E){var k=!f.$expand[E],s=M+"/"+E;if(k){f.$expand[E]={};if(e&&t.oModel.getMetaModel().fetchObject(s).getResult().$isCollection){return false;}}return m(f.$expand[E],Q.$expand[E],s,true,k);}function j(s){if(!f.$select.includes(s)){f.$select.push(s);}return true;}return(i||!I||Object.keys(f).every(function(n){return n in Q||n==="$count"||n==="$expand"||n==="$select";}))&&Object.keys(Q).every(function(n){switch(n){case"$count":if(Q.$count){f.$count=true;}return true;case"$expand":f.$expand=f.$expand||{};return Object.keys(Q.$expand).every(h);case"$select":f.$select=f.$select||[];return Q.$select.every(j);default:if(g){f[n]=Q[n];return true;}return Q[n]===f[n];}});}if(m(A,q,B)){if(!e){this.mAggregatedQueryOptions=A;}else{this.mLateQueryOptions=A;}return true;}return false;};O.prototype.changeParameters=function(p){var B=Object.assign({},this.mParameters),s,k,t=this;function u(n){if(t.oModel.bAutoExpandSelect&&(n==="$expand"||n==="$select")){throw new Error("Cannot change "+n+" parameter in auto-$expand/$select mode: "+JSON.stringify(p[n])+" !== "+JSON.stringify(B[n]));}if(n==="$filter"||n==="$search"){s=b.Filter;}else if(n==="$orderby"&&s!==b.Filter){s=b.Sort;}else if(!s){s=b.Change;}}if(!p){throw new Error("Missing map of binding parameters");}for(k in p){if(k.startsWith("$$")){if(p[k]===B[k]){continue;}throw new Error("Unsupported parameter: "+k);}if(p[k]===undefined&&B[k]!==undefined){u(k);delete B[k];}else if(B[k]!==p[k]){u(k);if(typeof p[k]==="object"){B[k]=_.clone(p[k]);}else{B[k]=p[k];}}}if(s){if(this.hasPendingChanges(true)){throw new Error("Cannot change parameters due to pending changes");}this.applyParameters(B,s);}};O.prototype.checkUpdateInternal=function(f){var t=this;function u(){return S.all(t.getDependentBindings().map(function(D){return D.checkUpdateInternal();}));}if(f!==undefined){throw new Error("Unsupported operation: "+c+"#checkUpdateInternal must not"+" be called with parameters");}return this.oCachePromise.then(function(o){if(o&&t.bRelative){return t.fetchResourcePath(t.oContext).then(function(r){if(o.getResourcePath()===r){return u();}return t.refreshInternal("");});}return u();});};O.prototype.createInCache=function(u,v,s,t,i,A,e,f){var g=this;return this.oCachePromise.then(function(o){var p;if(o){p=_.getRelativePath(s,g.getResolvedPath());return o.create(u,v,p,t,i,A,e,f).then(function(h){if(g.mCacheByResourcePath){delete g.mCacheByResourcePath[o.getResourcePath()];}return h;});}return g.oContext.getBinding().createInCache(u,v,s,t,i,A,e,f);});};O.prototype.createReadGroupLock=function(g,l,i){var G,t=this;function e(){t.oModel.addPrerenderingTask(function(){i-=1;if(i>0){Promise.resolve().then(e);}else if(t.oReadGroupLock===G){L.debug("Timeout: unlocked "+G,null,c);t.removeReadGroupLock();}});}this.removeReadGroupLock();this.oReadGroupLock=G=this.lockGroup(g,l);if(l){i=2+(i||0);e();}};O.prototype.createRefreshPromise=function(){var p,r;p=new Promise(function(e){r=e;});p.$resolve=r;this.oRefreshPromise=p;return p;};O.prototype.deleteFromCache=function(g,e,p,E,D,f){return this.withCache(function(o,s){return o._delete(g,e,s,E,D,f);},p,true);};O.prototype.destroy=function(){this.aChildCanUseCachePromises=[];this.removeReadGroupLock();this.oResumePromise=undefined;a.prototype.destroy.call(this);};O.prototype.fetchIfChildCanUseCache=function(o,s,v,i){var B=this.getBaseForPathReduction(),e=_.getMetaPath(o.getPath()),f,g,D=o.getPath().includes("(...)"),I=o.getIndex(),h=s[0]==="#",m=this.oModel.getMetaModel(),p,r=this.oModel.resolve(s,o),t=this;function j(){if(h){return m.fetchObject(e+"/");}return _.fetchPropertyAndType(t.oModel.oInterface.fetchMetadata,k(r));}function k(P){var I;P=_.getMetaPath(P);I=P.indexOf("@");return I>0?P.slice(0,I):P;}if(D&&!r.includes("/$Parameter/")||this.getRootBinding().isSuspended()||this.mParameters&&this.mParameters.$$aggregation){return S.resolve(r);}f=this.oCachePromise.isRejected()||I!==undefined&&I!==C.VIRTUAL||o.isKeepAlive()||this.oCache===null||this.oCache&&this.oCache.hasSentRequest();p=[this.doFetchQueryOptions(this.oContext),j(),v];g=S.all(p).then(function(R){var l=R[2],w,n=R[0],P=R[1],q,u;if(Array.isArray(P)){return undefined;}u=m.getReducedPath(r,B);q=_.getRelativePath(k(u),e);if(q===undefined){t.bHasPathReductionToParent=true;return t.oContext.getBinding().fetchIfChildCanUseCache(t.oContext,_.getRelativePath(r,t.oContext.getPath()),v);}if(D||q==="$count"||q.endsWith("/$count")){return u;}if(t.bAggregatedQueryOptionsInitial){t.selectKeyProperties(n,e);t.mAggregatedQueryOptions=_.clone(n);t.bAggregatedQueryOptionsInitial=false;}if(h){w={$select:[q.slice(1)]};return t.aggregateQueryOptions(w,e,f,i)?u:undefined;}if(q===""||P&&(P.$kind==="Property"||P.$kind==="NavigationProperty")){w=_.wrapChildQueryOptions(e,q,l,t.oModel.oInterface.fetchMetadata);if(w){return t.aggregateQueryOptions(w,e,f,i)?u:undefined;}return undefined;}if(q==="value"){return t.aggregateQueryOptions(l,e,f,i)?u:undefined;}L.error("Failed to enhance query options for auto-$expand/$select as the path '"+r+"' does not point to a property",JSON.stringify(P),c);return undefined;}).then(function(R){if(t.mLateQueryOptions){if(t.oCache){t.oCache.setLateQueryOptions(t.mLateQueryOptions);}else if(t.oCache===null){return t.oContext.getBinding().fetchIfChildCanUseCache(t.oContext,t.sPath,S.resolve(t.mLateQueryOptions)).then(function(P){return P&&R;});}}return R;});this.aChildCanUseCachePromises.push(g);this.oCachePromise=S.all([this.oCachePromise,g]).then(function(R){var l=R[0];if(!f&&l&&!l.hasSentRequest()&&!t.oOperation){if(t.bSharedRequest){l.setActive(false);l=t.createAndSetCache(t.mAggregatedQueryOptions,l.getResourcePath(),o);}else{l.setQueryOptions(_.merge({},t.oModel.mUriParameters,t.mAggregatedQueryOptions));}}return l;});this.oCachePromise.catch(function(E){t.oModel.reportError(t+": Failed to enhance query options for "+"auto-$expand/$select for child "+s,c,E);});return g;};O.prototype.fetchResolvedQueryOptions=function(o){var f,m,M,e=this.oModel,q=this.getQueryOptionsFromParameters();if(!(e.bAutoExpandSelect&&q.$select)){return S.resolve(q);}f=e.oInterface.fetchMetadata;M=_.getMetaPath(e.resolve(this.sPath,o));m=Object.assign({},q,{$select:[]});return S.all(q.$select.map(function(s){var g=M+"/"+s;if(g.endsWith(".*")){g=g.slice(0,-1);}return _.fetchPropertyAndType(f,g).then(function(){var w=_.wrapChildQueryOptions(M,s,{},f);if(w){_.aggregateExpandSelect(m,w);}else{_.addToSelect(m,[s]);}});})).then(function(){return m;});};O.prototype.getBaseForPathReduction=function(){var p,P;if(!this.isRoot()){p=this.oContext.getBinding();P=p.getUpdateGroupId();if(P===this.getUpdateGroupId()||!this.oModel.isApiGroup(P)){return p.getBaseForPathReduction();}}return this.getResolvedPath();};O.prototype.getInheritableQueryOptions=function(){if(this.mLateQueryOptions){return _.merge({},this.mCacheQueryOptions,this.mLateQueryOptions);}return this.mCacheQueryOptions||_.getQueryOptionsForPath(this.oContext.getBinding().getInheritableQueryOptions(),this.sPath);};O.prototype.getGeneration=function(){return this.bRelative&&this.oContext.getGeneration&&this.oContext.getGeneration()||0;};O.prototype.getQueryOptionsForPath=function(p,o){if(Object.keys(this.mParameters).length){return _.getQueryOptionsForPath(this.getQueryOptionsFromParameters(),p);}o=o||this.oContext;if(!this.bRelative||!o.getQueryOptionsForPath){return{};}return o.getQueryOptionsForPath(_.buildPath(this.sPath,p));};O.prototype.getResumePromise=function(){return this.oResumePromise;};O.prototype.hasPendingChangesInDependents=function(i){return this.getDependentBindings().some(function(D){var o=D.oCache,h,I=i;if(I){if(D.oContext.isKeepAlive()){return false;}if(D.oContext.getIndex()!==undefined){I=false;}}if(o!==undefined){if(o&&o.hasPendingChangesForPath("",false,I&&D.mParameters&&D.mParameters.$$ownRequest)){return true;}}else if(D.hasPendingChangesForPath("")){return true;}if(D.mCacheByResourcePath){h=Object.keys(D.mCacheByResourcePath).some(function(p){var e=D.mCacheByResourcePath[p];return e!==o&&e.hasPendingChangesForPath("");});if(h){return true;}}return D.hasPendingChangesInDependents(I);})||this.oModel.withUnresolvedBindings("hasPendingChangesInCaches",this.getResolvedPath().slice(1));};O.prototype.isPatchWithoutSideEffects=function(){return this.mParameters.$$patchWithoutSideEffects||!this.isRoot()&&this.oContext&&this.oContext.getBinding().isPatchWithoutSideEffects();};O.prototype.isMeta=function(){return false;};O.prototype.onDelete=function(s){var o=this.findContextForCanonicalPath(s);if(o){this.resetChangesForPath(this.getRelativePath(o.getPath()),[]);this.oModel.getDependentBindings(o).forEach(function(B){B.resetChanges();});this._delete(null,s.slice(1),o);}};O.prototype.refreshDependentListBindingsWithoutCache=function(){return S.all(this.getDependentBindings().map(function(D){if(D.filter&&D.oCache===null){return D.refreshInternal("");}if(D.refreshDependentListBindingsWithoutCache){return D.refreshDependentListBindingsWithoutCache();}}));};O.prototype.removeReadGroupLock=function(){if(this.oReadGroupLock){this.oReadGroupLock.unlock(true);this.oReadGroupLock=undefined;}};O.prototype.resetChangesInDependents=function(p){this.getDependentBindings().forEach(function(D){p.push(D.oCachePromise.then(function(o){if(o){o.resetChangesForPath("");}D.resetInvalidDataState();}).unwrap());if(D.mCacheByResourcePath){Object.keys(D.mCacheByResourcePath).forEach(function(P){D.mCacheByResourcePath[P].resetChangesForPath("");});}D.resetChangesInDependents(p);});};O.prototype.resolveRefreshPromise=function(p){if(this.oRefreshPromise){this.oRefreshPromise.$resolve(p.catch(function(e){if(!e.canceled){throw e;}}));this.oRefreshPromise=null;}return p;};O.prototype._resume=function(A){var t=this;function e(){t.bSuspended=false;if(t.oResumePromise){t.resumeInternal(true);t.oResumePromise.$resolve();t.oResumePromise=undefined;}}if(this.oOperation){throw new Error("Cannot resume an operation binding: "+this);}if(!this.isRoot()){throw new Error("Cannot resume a relative binding: "+this);}if(!this.bSuspended){throw new Error("Cannot resume a not suspended binding: "+this);}if(A){this.createReadGroupLock(this.getGroupId(),true,1);this.oModel.addPrerenderingTask(e);}else{this.createReadGroupLock(this.getGroupId(),true);e();}};O.prototype.resume=function(){this._resume(false);};O.prototype.resumeAsync=function(){this._resume(true);return Promise.resolve(this.oResumePromise);};O.prototype.selectKeyProperties=function(q,m){_.selectKeyProperties(q,this.oModel.getMetaModel().getObject(m+"/"));};O.prototype.suspend=function(){var r;if(this.oOperation){throw new Error("Cannot suspend an operation binding: "+this);}if(!this.isRoot()){throw new Error("Cannot suspend a relative binding: "+this);}if(this.bSuspended){throw new Error("Cannot suspend a suspended binding: "+this);}if(this.hasPendingChanges(true)){throw new Error("Cannot suspend a binding with pending changes: "+this);}this.bSuspended=true;this.oResumePromise=new S(function(e){r=e;});this.oResumePromise.$resolve=r;this.removeReadGroupLock();this.doSuspend();};O.prototype.updateAggregatedQueryOptions=function(n){var A=Object.keys(n),t=this;if(this.mAggregatedQueryOptions){A=A.concat(Object.keys(this.mAggregatedQueryOptions));A.forEach(function(N){if(t.bAggregatedQueryOptionsInitial||N!=="$select"&&N!=="$expand"){if(n[N]===undefined){delete t.mAggregatedQueryOptions[N];}else{t.mAggregatedQueryOptions[N]=n[N];}}});}};O.prototype.visitSideEffects=function(g,p,o,n,P,s){var D=o?this.oModel.getDependentBindings(o):this.getDependentBindings();D.forEach(function(e){var f=_.buildPath(s,_.getMetaPath(e.getPath())),h;if(e.oCache){h=_.stripPathPrefix(f,p);if(h.length){P.push(e.requestSideEffects(g,h));}}else if(n[f]){P.push(e.refreshInternal("",g));}else{e.visitSideEffects(g,p,null,n,P,f);}});};function d(p){if(this){O.apply(this,arguments);}else{Object.assign(p,O.prototype);}}["adjustPredicate","destroy","doDeregisterChangeListener","getGeneration","hasPendingChangesForPath"].forEach(function(m){d.prototype[m]=O.prototype[m];});return d;},false);
