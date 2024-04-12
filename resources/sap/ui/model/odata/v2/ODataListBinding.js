/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/assert","sap/base/Log","sap/base/util/deepEqual","sap/base/util/each","sap/base/util/isEmptyObject","sap/base/util/uid","sap/ui/model/ChangeReason","sap/ui/model/Context","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/model/FilterProcessor","sap/ui/model/FilterType","sap/ui/model/ListBinding","sap/ui/model/Sorter","sap/ui/model/SorterProcessor","sap/ui/model/odata/CountMode","sap/ui/model/odata/Filter","sap/ui/model/odata/ODataUtils","sap/ui/model/odata/OperationMode"],function(a,L,d,e,b,u,C,c,F,f,g,h,j,S,k,l,O,m,n){"use strict";var o=["changeSetId","error","expand","groupId","inactive","success"];var p=j.extend("sap.ui.model.odata.v2.ODataListBinding",{constructor:function(M,P,i,s,t,v){j.apply(this,arguments);this.sFilterParams=null;this.sSortParams=null;this.sRangeParams=null;this.sCustomParams=this.oModel.createCustomParams(this.mParameters);this.mCustomParams=v&&v.custom;this.iStartIndex=0;this.iLength=0;this.bPendingChange=false;this.aAllKeys=null;this.aKeys=[];this.sCountMode=(v&&v.countMode)||this.oModel.sDefaultCountMode;this.sOperationMode=(v&&v.operationMode)||this.oModel.sDefaultOperationMode;this.bCreatePreliminaryContext=(v&&v.createPreliminaryContext)||M.bPreliminaryContext;this.bUsePreliminaryContext=(v&&v.usePreliminaryContext)||M.bPreliminaryContext;this.bRefresh=false;this.bNeedsUpdate=false;this.bDataAvailable=false;this.bIgnoreSuspend=false;this.bPendingRefresh=false;this.sGroupId=undefined;this.sRefreshGroupId=undefined;this.bLengthRequested=false;this.bUseExtendedChangeDetection=false;this.bFaultTolerant=v&&v.faultTolerant;this.bLengthFinal=false;this.iLastEndIndex=0;this.aLastContexts=null;this.aLastContextData=null;this.bInitial=true;this.mRequestHandles={};this.oCountHandle=null;this.bSkipDataEvents=false;this.bUseExpandedList=false;this.oCombinedFilter=null;this.sDeepPath=M.resolveDeep(P,i);this.bCanonicalRequest=v&&v.bCanonicalRequest;this.mNormalizeCache={};this.bTransitionMessagesOnly=!!(v&&v.transitionMessagesOnly);this.sCreatedEntitiesKey=v&&v.createdEntitiesKey||"";this.oCreatedPersistedToRemove=new Set();this.oModel.checkFilterOperation(this.aApplicationFilters);if(v&&(v.batchGroupId||v.groupId)){this.sGroupId=v.groupId||v.batchGroupId;}this.iThreshold=(v&&v.threshold)||0;this.bThresholdRejected=false;if(this.sCountMode==l.None){this.bThresholdRejected=true;}if(!this.checkExpandedList()){this._removePersistedCreatedContexts();this.resetData();}},metadata:{publicMethods:["getLength"]}});p.prototype.attachCreateActivate=function(i,s){this.attachEvent("createActivate",i,s);};p.prototype.detachCreateActivate=function(i,s){this.detachEvent("createActivate",i,s);};p.prototype._updateLastStartAndLength=function(s,i,M,K){if(K){this._checkKeepCurrentSupported(M);}else{this.iLastStartIndex=s;this.iLastLength=i;this.iLastMaximumPrefetchSize=M;}};p.prototype.getAllCurrentContexts=function(){var i=this._getCreatedContexts(),t=this;this.aKeys.forEach(function(K){i.push(t.oModel.getContext("/"+K));});return i;};p.prototype.getContexts=function(s,t,M,K){var v,w,x;if(this.bInitial||this._hasTransientParentContext()){return[];}if(!this.bLengthFinal&&this.sOperationMode==n.Auto&&(this.sCountMode==l.Request||this.sCountMode==l.Both)){if(!this.bLengthRequested){this._getLength();this.bLengthRequested=true;}return[];}if(!this.bLengthFinal&&!this.bPendingRequest&&!this.bLengthRequested){this._getLength();this.bLengthRequested=true;}this._updateLastStartAndLength(s,t,M,K);if(!s){s=0;}if(!t){t=this._getMaximumLength();}if(!M){M=0;}if(this.sOperationMode==n.Auto){if(this.iThreshold>=0){M=Math.max(this.iThreshold,M);}}v=this._getContexts(s,t);if(this.useClientMode()){if(!this.aAllKeys&&!this.bPendingRequest&&this.oModel.getServiceMetadata()){this.loadData();v.dataRequested=true;}}else{x=this._getSkipAndTop(s,t,M);if(this.oModel.getServiceMetadata()){if(!this.bPendingRequest&&x){this.loadData(x.skip,x.top);v.dataRequested=true;}}}if(this.isFirstCreateAtEnd()&&this.bPendingRequest&&v.length&&v[0].isTransient()!==undefined){v.length=0;}if(this.bRefresh){this.bRefresh=false;if(!v.dataRequested&&v.length>0){this._fireChange({reason:C.Change});}}else if(!K){w=[];for(var i=0;i<v.length;i++){w.push(this.getContextData(v[i]));}if(this.bUseExtendedChangeDetection){if(this.aLastContexts&&s<this.iLastEndIndex){v.diff=this.diffData(this.aLastContextData,w);}}this.iLastEndIndex=s+t;this.aLastContexts=v.slice(0);this.aLastContextData=w;}return v;};p.prototype.getCurrentContexts=function(){return this.aLastContexts||[];};p.prototype.getEntryKey=function(i){return i.getPath();};p.prototype.getEntryData=function(i){return JSON.stringify(i.getObject(this.mParameters));};p.prototype._getContexts=function(s,t){var v,i,E,K,A=this.isFirstCreateAtEnd(),w=[],x=this._getCreatedContexts(),y=x.length,D=this.oModel.resolveDeep(this.sPath,this.oContext);if(!s){s=0;}if(!t){t=this._getMaximumLength();}E=s+t;for(i=s;i<E;i+=1){if(!A&&i<y){v=x[i];}else if(A&&i>=this.iLength){if(i-this.iLength>=y){break;}v=x[i-this.iLength];}else{K=this.aKeys[A?i:i-y];if(!K){break;}v=this.oModel.getContext('/'+K,D+K.substr(K.indexOf("(")));}w.push(v);}return w;};p.prototype.setContext=function(i){var H,R,s=i&&i.isRefreshForced(),P=i&&i.isPreliminary(),U=i&&i.isUpdated();if(this.bInitial||!this.isRelative()){return;}if(P&&!this.bUsePreliminaryContext){return;}if(U&&this.bUsePreliminaryContext&&this.oContext===i){this._fireChange({reason:C.Context});return;}if(c.hasChanged(this.oContext,i)){H=this.isResolved()&&!this._hasTransientParentContext();this.oContext=i;R=this.getResolvedPath();this.sDeepPath=this.oModel.resolveDeep(this.sPath,this.oContext);if(!this._checkPathType()){L.error("List Binding is not bound against a list for "+R);}this.checkDataState();if(!R||this._hasTransientParentContext()){this.aAllKeys=null;this.aKeys=[];this.iLength=0;this.bLengthFinal=true;if(H){this._fireChange({reason:C.Context});}return;}this._initSortersFilters();if(this.checkExpandedList()&&!s){this.abortPendingRequest();this._fireChange({reason:C.Context});}else{this._removePersistedCreatedContexts();this._refresh();}}};p.prototype._cleanupCreatedPersisted=function(){var i=false,s=this.oModel._getObject(this.sPath,this.oContext),t=this;function v(E){t.oModel._discardEntityChanges(E,true);i=true;}if(this.oCreatedPersistedToRemove.size&&!this.bSuspended){this.oCreatedPersistedToRemove.forEach(v);this.oCreatedPersistedToRemove.clear();}if(s&&s.sideEffects){this._getCreatedPersistedContexts().forEach(function(w){var E=t.oModel.getKey(w);if(!s.includes(E)){if(t.bSuspended){t.oCreatedPersistedToRemove.add(E);}else{v(E);}}});}return i;};p.prototype.checkExpandedList=function(s){var i,t=this.oModel._getObject(this.sPath,this.oContext),v=this.bUseExpandedList,w=this;if(!this.isResolved()||t===undefined||!this._isExpandedListUsable()){this.bUseExpandedList=false;this.aExpandRefs=undefined;return false;}else{this.bUseExpandedList=true;if(Array.isArray(t)){if(!s&&(this.oModel._isReloadNeeded("/"+t[0],this.mParameters)||this.oModel._isReloadNeeded("/"+t[t.length-1],this.mParameters))){this.bUseExpandedList=false;this.aExpandRefs=undefined;return false;}this.aExpandRefs=t;if(t.sideEffects){i=this._getCreatedPersistedContexts().map(function(x){return w.oModel.getKey(x);});if(i.length){t=t.filter(function(E){return!i.includes(E);});}}this.aAllKeys=t;this.iLength=t.length;this.bLengthFinal=true;this.bDataAvailable=true;this._initSortersFilters();this.applyFilter();this.applySort();if(this.aExpandRefs.sideEffects&&!v){this.aExpandRefs=undefined;this.bUseExpandedList=false;return this.bUseExpandedList;}}else{this.aExpandRefs=undefined;this.aAllKeys=null;this.aKeys=[];this.iLength=0;this.bLengthFinal=true;this.bDataAvailable=true;}return true;}};p.prototype.updateExpandedList=function(K){if(this.aExpandRefs){for(var i=0;i<K.length;i++){this.aExpandRefs[i]=K[i];}this.aExpandRefs.length=K.length;}};p.prototype.useClientMode=function(){return(this.sOperationMode===n.Client||this.sOperationMode===n.Auto&&!this.bThresholdRejected||this.sOperationMode!==n.Server&&this.bUseExpandedList);};p.prototype._addFilterQueryOption=function(U,i){var E=this._getCreatedPersistedExcludeFilter();if(this.sFilterParams&&i){if(E){U.push("$filter=("+this.sFilterParams.slice(8)+")%20and%20"+E);}else{U.push(this.sFilterParams);}}else if(E){U.push("$filter="+E);}};p.prototype._getCreatedPersistedContexts=function(){return this._getCreatedContexts().filter(function(i){return!i.isTransient();});};p.prototype._getCreatedPersistedExcludeFilter=function(){var E,i,s=this._getCreatedPersistedContexts(),t=this;if(s.length>0){i=s.map(function(v){var P=v.getPath();return t._getFilterForPredicate(P.slice(P.indexOf("(")));});E="not("+m._createFilterParams(i.length===1?i[0]:new F({filters:i}),this.oModel.oMetadata,this.oEntityType)+")";}return E;};p.prototype.loadData=function(s,t){var G,v=u(),I=false,P=[],w=this.sPath,x=this;if(s||t){this.sRangeParams="$skip="+s+"&$top="+t;this.iStartIndex=s;}else{s=this.iStartIndex;}if(this.sRangeParams&&!this.useClientMode()){P.push(this.sRangeParams);}if(this.sSortParams){P.push(this.sSortParams);}this._addFilterQueryOption(P,!this.useClientMode());if(this.sCustomParams){P.push(this.sCustomParams);}if(this.sCountMode==l.InlineRepeat||!this.bLengthFinal&&(this.sCountMode===l.Inline||this.sCountMode===l.Both)){P.push("$inlinecount=allpages");I=true;}function y(D){if(I&&D.__count!==undefined){x.iLength=parseInt(D.__count);x.bLengthFinal=true;if(x.sOperationMode==n.Auto){if(x.iLength<=x.mParameters.threshold){x.bThresholdRejected=false;}else{x.bThresholdRejected=true;delete x.mRequestHandles[v];x.bPendingRequest=false;x.bNeedsUpdate=true;return;}}}if(x.useClientMode()){x.aKeys=[];e(D.results,function(i,z){x.aKeys[i]=x.oModel._getKey(z);});x.updateExpandedList(x.aKeys);x.aAllKeys=x.aKeys.slice();x.iLength=x.aKeys.length;x.bLengthFinal=true;x.applyFilter();x.applySort();}else if(D.results.length>0){e(D.results,function(i,z){x.aKeys[s+i]=x.oModel._getKey(z);});if(x.iLength<s+D.results.length){x.iLength=s+D.results.length;x.bLengthFinal=false;}if(!D.__next&&(D.results.length<t||t===undefined)){x.iLength=s+D.results.length;x.bLengthFinal=true;}}else{if(x.bFaultTolerant&&D.__next){x.iLength=s;x.bLengthFinal=true;}if(s===0){x.iLength=0;x.aKeys=[];x.bLengthFinal=true;}if(s===x.iLength){x.bLengthFinal=true;}}delete x.mRequestHandles[v];x.bPendingRequest=false;x.bNeedsUpdate=true;x.bIgnoreSuspend=true;x.oModel.callAfterUpdate(function(){x.fireDataReceived({data:D});});}function E(i){var A=i.statusCode==0;delete x.mRequestHandles[v];x.bPendingRequest=false;if(x.bFaultTolerant){x.iLength=x.aKeys.length;x.bLengthFinal=true;x.bDataAvailable=true;}else if(!A){x.aKeys=[];x.aAllKeys=[];x.iLength=0;x.bLengthFinal=true;x.bDataAvailable=true;x._fireChange({reason:C.Change});}if(!x.bSkipDataEvents){x.fireDataReceived();}}if(this.isRelative()){w=this.getResolvedPath();}if(w){this.bPendingRequest=true;if(!this.bSkipDataEvents){this.fireDataRequested();}this.bSkipDataEvents=false;G=this.sRefreshGroupId?this.sRefreshGroupId:this.sGroupId;this.mRequestHandles[v]=this.oModel.read(this.sPath,{headers:this.bTransitionMessagesOnly?{"sap-messages":"transientOnly"}:undefined,context:this.oContext,groupId:G,urlParameters:P,success:y,error:E,canonicalRequest:this.bCanonicalRequest,updateAggregatedMessages:this.bRefresh});}};p.prototype.isLengthFinal=function(){return this.bLengthFinal;};p.prototype.getLength=function(){var R=this.iLength+this._getCreatedContexts().length;if(this.bLengthFinal||this.iLength===0){return R;}return R+(this.iLastMaximumPrefetchSize||this.iLastLength||10);};p.prototype._getLength=function(){var G,P,i=[],t=this;if(this.sCountMode!==l.Request&&this.sCountMode!==l.Both){return;}this._addFilterQueryOption(i,this.sOperationMode!==n.Auto);if(this.mParameters&&this.mParameters.custom){var s={custom:{}};e(this.mParameters.custom,function(w,V){s.custom[w]=V;});i.push(this.oModel.createCustomParams(s));}function _(D){t.iLength=parseInt(D);t.bLengthFinal=true;t.bLengthRequested=true;t.oCountHandle=null;if(t.sOperationMode==n.Auto){if(t.iLength<=t.mParameters.threshold){t.bThresholdRejected=false;}else{t.bThresholdRejected=true;}t._fireChange({reason:C.Change});}}function v(E){delete t.mRequestHandles[P];var w="Request for $count failed: "+E.message;if(E.response){w+=", "+E.response.statusCode+", "+E.response.statusText+", "+E.response.body;}L.warning(w);}P=this.getResolvedPath();if(P){G=this.sRefreshGroupId?this.sRefreshGroupId:this.sGroupId;this.oCountHandle=this.oModel.read(this.sPath+"/$count",{context:this.oContext,withCredentials:this.oModel.bWithCredentials,groupId:G,urlParameters:i,success:_,error:v,canonicalRequest:this.bCanonicalRequest});}};p.prototype._getMaximumLength=function(){var i=this.oModel.iSizeLimit;if(this.bLengthFinal){i=Math.min(i,this.iLength+this._getCreatedContexts().length);}return i;};p.prototype.refresh=function(i,G){if(typeof i==="string"){G=i;i=false;}this._removePersistedCreatedContexts();this.sRefreshGroupId=G;this._refresh(i);this.sRefreshGroupId=undefined;};p.prototype._refresh=function(s,t,E){var v,R,w=false;if(this._hasTransientParentContext()){return;}if(!s){if(E){R=this.getResolvedPath();if(R){v=this.oModel.oMetadata._getEntityTypeByPath(R);if(v&&(v.entityType in E)){w=true;}}}if(t&&!w){e(this.aKeys,function(i,K){if(K in t){w=true;return false;}return true;});}if(!t&&!E){w=true;}}if(s||w){if(this.bSuspended&&!this.bIgnoreSuspend&&!s){this.bPendingRefresh=true;return;}this.bPendingRefresh=false;this.abortPendingRequest(true);this.resetData();this._fireRefresh({reason:C.Refresh});}};p.prototype._fireRefresh=function(P){if(this.getResolvedPath()){this.bRefresh=true;this.fireEvent("refresh",P);}};p.prototype._checkPathType=function(){var P=this.getResolvedPath();if(P){if(!this._mPathType||!this._mPathType[P]){this._mPathType={};var I=P.lastIndexOf("/");var t,E;if(I>1){E=this.oModel.oMetadata._getEntityTypeByPath(P.substring(0,I));if(E){t=this.oModel.oMetadata._getEntityAssociationEnd(E,P.substring(I+1));if(t&&t.multiplicity==="*"){this._mPathType[P]=true;}}}else if(I===0){var M,N=P.substring(1);M=this.oModel.oMetadata._findEntitySetByName(N);if(M){this._mPathType[P]=true;}else{var s=this.oModel.oMetadata._getFunctionImportMetadataByName(N);for(var i=0;i<s.length;i++){var v=s[i];if(v.entitySet){M=this.oModel.oMetadata._findEntitySetByName(v.entitySet);if(M){this._mPathType[P]=true;}}}}}}return!!this._mPathType[P];}return true;};p.prototype.initialize=function(){if(this.oModel.oMetadata&&this.oModel.oMetadata.isLoaded()&&this.bInitial&&!this._hasTransientParentContext()){if(!this._checkPathType()){L.error("List Binding is not bound against a list for "+this.getResolvedPath());}this.bInitial=false;this._initSortersFilters();if(!this.bSuspended){if(this.bDataAvailable){this._fireChange({reason:C.Change});}else{this.resetData();this._fireRefresh({reason:C.Refresh});}}this.checkDataState();}return this;};p.prototype.checkUpdate=function(i,s){var t,v,E,w,x,y=false,z=this.sChangeReason?this.sChangeReason:C.Change,A=this._cleanupCreatedPersisted(),B=this;if((this.bSuspended&&!this.bIgnoreSuspend&&!i)||this.bPendingRequest){return;}if(this.bInitial){if(this.oContext&&this.oContext.isUpdated()){this.initialize();}return;}this.bIgnoreSuspend=false;if(!i&&!this.bNeedsUpdate){x=this.aExpandRefs;w=this.aKeys.slice();E=this.checkExpandedList(true);if(!E&&this.useClientMode()){this.applyFilter();this.applySort();}if(!d(x,this.aExpandRefs)){y=true;}else if(s){if(this.aKeys.length!==w.length){y=true;}else{for(var K in s){if(this.aKeys.indexOf(K)>-1||w.indexOf(K)>-1){y=true;break;}}}}else{y=true;}if(y&&this.aLastContexts){y=false;t=this._getContexts(this.iLastStartIndex,this.iLastLength);if(this.aLastContexts.length!==t.length){y=true;}else{e(this.aLastContextData,function(I,D){v=B.getContextData(t[I]);if(D!==v){y=true;return false;}return true;});}}}if(i||y||this.bNeedsUpdate||A){this.bNeedsUpdate=false;this._fireChange({reason:z});}this.sChangeReason=undefined;};p.prototype.resetData=function(){this.aKeys=[];this.aAllKeys=null;this.iLength=0;this.bLengthFinal=this._hasTransientParentContext()||!this.isResolved();this.sChangeReason=undefined;this.bDataAvailable=false;this.bLengthRequested=false;this.bThresholdRejected=false;if(this.sCountMode==l.None){this.bThresholdRejected=true;}};p.prototype.abortPendingRequest=function(A){if(!b(this.mRequestHandles)){this.bSkipDataEvents=true;e(this.mRequestHandles,function(P,R){R.abort();});if(A&&this.oCountHandle){this.oCountHandle.abort();}this.mRequestHandles={};this.bPendingRequest=false;}};p.prototype.getDownloadUrl=function(s){var P=[],i;if(s){P.push("$format="+encodeURIComponent(s));}if(this.sSortParams){P.push(this.sSortParams);}if(this.sFilterParams){P.push(this.sFilterParams);}if(this.sCustomParams){P.push(this.sCustomParams);}i=this.getResolvedPath();return i&&this.oModel._createRequestUrl(i,null,P);};p.prototype._moveCreatedPersistedToAllKeys=function(){var t=this,i=this._getCreatedPersistedContexts().map(function(s){return t.oModel.getKey(s);});if(i.length){this.aAllKeys=this.aAllKeys.concat(i);this._removePersistedCreatedContexts();return true;}return false;};p.prototype.sort=function(s,R){var i=false;this.bIgnoreSuspend=true;if(!s){s=[];}if(s instanceof S){s=[s];}this.aSorters=s;if(!this.useClientMode()){this.createSortParams(s);}if(!this.bInitial){this.addComparators(s,true);if(this.useClientMode()){if(this.aAllKeys){if(this._moveCreatedPersistedToAllKeys()||!s.length){this.applyFilter();}this.applySort();this._fireChange({reason:C.Sort});}else{this.sChangeReason=C.Sort;}}else{this.iLength+=this._removePersistedCreatedContexts().length;this.aKeys=[];this.abortPendingRequest(false);this.sChangeReason=C.Sort;this._fireRefresh({reason:this.sChangeReason});}this._fireSort({sorter:s});i=true;}if(R){return i;}else{return this;}};p.prototype.addComparators=function(E,s){var P,t,i=this.oEntityType,v;if(!i){L.warning("Cannot determine sort/filter comparators, as entitytype of the collection is unknown!");return;}E.forEach(function(w){if(w.aFilters){this.addComparators(w.aFilters);}else if(!w.fnCompare){P=this.oModel.oMetadata._getPropertyMetadata(i,w.sPath);t=P&&P.type;a(P,"PropertyType for property "+w.sPath+" of EntityType "+i.name+" not found!");v=m.getComparator(t);if(s){w.fnCompare=q(v);}else{w.fnCompare=v;r(t,w);}}}.bind(this));};function q(i){return function(v,V){if(v===V){return 0;}if(v===null){return-1;}if(V===null){return 1;}return i(v,V);};}function r(t,i){switch(t){case"Edm.Decimal":case"Edm.Int64":if(typeof i.oValue1=="number"){i.oValue1=i.oValue1.toString();}if(typeof i.oValue2=="number"){i.oValue2=i.oValue2.toString();}break;case"Edm.Byte":case"Edm.Int16":case"Edm.Int32":case"Edm.SByte":if(typeof i.oValue1=="string"){i.oValue1=parseInt(i.oValue1);}if(typeof i.oValue2=="string"){i.oValue2=parseInt(i.oValue2);}break;case"Edm.Float":case"Edm.Single":case"Edm.Double":if(typeof i.oValue1=="string"){i.oValue1=parseFloat(i.oValue1);}if(typeof i.oValue2=="string"){i.oValue2=parseFloat(i.oValue2);}break;default:}}p.prototype.applySort=function(){var t=this,i;this.aKeys=k.apply(this.aKeys,this.aSorters,function(R,P){i=t.oModel.getContext('/'+R);return t.oModel.getProperty(P,i);});};p.prototype.createSortParams=function(s){this.sSortParams=m.createSortParams(s);};p.prototype.filter=function(i,s,R){var t=false;this.bIgnoreSuspend=true;if(!i){i=[];}if(i instanceof F){i=[i];}this.oModel.checkFilterOperation(i);if(s===h.Application){this.aApplicationFilters=i;}else{this.aFilters=i;}if(!this.aFilters||!Array.isArray(this.aFilters)){this.aFilters=[];}if(!this.aApplicationFilters||!Array.isArray(this.aApplicationFilters)){this.aApplicationFilters=[];}this.convertFilters();this.oCombinedFilter=g.combineFilters(this.aFilters,this.aApplicationFilters);if(!this.useClientMode()){this.createFilterParams(this.oCombinedFilter);}if(!this.bInitial){this.addComparators(this.aFilters);this.addComparators(this.aApplicationFilters);if(this.useClientMode()){if(this.aAllKeys){this._moveCreatedPersistedToAllKeys();this.applyFilter();this.applySort();this._fireChange({reason:C.Filter});}else{this.sChangeReason=C.Filter;}}else{this._removePersistedCreatedContexts();this.resetData();this.abortPendingRequest(true);this.sChangeReason=C.Filter;this._fireRefresh({reason:this.sChangeReason});}if(s===h.Application){this._fireFilter({filters:this.aApplicationFilters});}else{this._fireFilter({filters:this.aFilters});}t=true;}if(R){return t;}else{return this;}};p.prototype.convertFilters=function(){this.aFilters=this.aFilters.map(function(i){return i instanceof O?i.convert():i;});this.aApplicationFilters=this.aApplicationFilters.map(function(i){return i instanceof O?i.convert():i;});};p.prototype.applyFilter=function(){var t=this,i;this.oCombinedFilter=g.combineFilters(this.aFilters,this.aApplicationFilters);this.aKeys=g.apply(this.aAllKeys,this.oCombinedFilter,function(R,P){i=t.oModel.getContext('/'+R);return t.oModel.getProperty(P,i);},this.mNormalizeCache);this.iLength=this.aKeys.length;};p.prototype.createFilterParams=function(i){this.sFilterParams=m.createFilterParams(i,this.oModel.oMetadata,this.oEntityType);};p.prototype._initSortersFilters=function(){var R=this.getResolvedPath();if(!R){return;}this.oEntityType=this._getEntityType();this.addComparators(this.aSorters,true);this.addComparators(this.aFilters);this.addComparators(this.aApplicationFilters);this.convertFilters();this.oCombinedFilter=g.combineFilters(this.aFilters,this.aApplicationFilters);if(!this.useClientMode()){this.createSortParams(this.aSorters);this.createFilterParams(this.oCombinedFilter);}};p.prototype._getEntityType=function(){var R=this.getResolvedPath();if(R){var E=this.oModel.oMetadata._getEntityTypeByPath(R);a(E,"EntityType for path "+R+" could not be found!");return E;}return undefined;};p.prototype.resume=function(){this.bIgnoreSuspend=false;this.bSuspended=false;if(this.bPendingRefresh){this._refresh();}else{this.checkUpdate();}};p.prototype.suspend=function(){if(this.bInitial){this.bPendingRefresh=true;}j.prototype.suspend.apply(this,arguments);};p.prototype._checkDataStateMessages=function(D,R){if(R){D.setModelMessages(this.oModel.getMessagesByPath(this.sDeepPath,true));}};p.prototype._getFilterForPredicate=function(P){var i=[],K=P.slice(1,-1).split(","),t=this;K.forEach(function(s){var v=s.split("="),w=v[0],V=v[1];if(v.length===1){V=w;w=t.oModel.oMetadata.getKeyPropertyNamesByPath(t.sDeepPath)[0];}i.push(new F(w,f.EQ,m.parseValue(decodeURIComponent(V))));});if(i.length===1){return i[0];}return new F({and:true,filters:i});};p.prototype.create=function(i,A,P){var s,t,R,v={context:this.oContext,properties:i,refreshAfterChange:false},w=this.isFirstCreateAtEnd(),x=this;A=!!A;if(w===undefined){w=A;}if(w&&!this.bLengthFinal){throw new Error("Must know the final length to create at the end");}Object.keys(P||{}).forEach(function(y){if(!o.includes(y)){throw new Error("Parameter '"+y+"' is not supported");}});if(this._hasTransientParentContext()){throw new Error("Parent context is transient");}if(this.bUseExpandedList){throw new Error("The collection has been read via $expand while reading the parent"+" entity");}if(!this.oModel.oMetadata.isLoaded()){throw new Error("Metadata is not loaded");}R=this.getResolvedPath();t=this.oModel._getCreatedContextsCache();Object.assign(v,P);if(!("expand"in v)&&this.mParameters){v.expand=this.mParameters.expand;}s=this.oModel.createEntry(this.sPath,v);t.addContext(s,R,this.sCreatedEntitiesKey,A);if(v.inactive){s.fetchActivated().then(function(){x.fireEvent("createActivate");});}this._fireChange({reason:C.Add});return s;};p.prototype.requestFilterForMessages=function(i){var D=this.sDeepPath,s=null,t=[],P=new Set(),R=this.getResolvedPath(),v=this;if(!R){return Promise.resolve(null);}this.oModel.getMessagesByPath(D,true).forEach(function(M){var w;if(!i||i(M)){M.aFullTargets.forEach(function(x){if(x.startsWith(D)){w=x.slice(D.length).split("/")[0];if(w){P.add(w);}}});}});P.forEach(function(w){t.push(v._getFilterForPredicate(w));});if(t.length===1){s=t[0];}else if(t.length>1){s=new F({filters:t});}return Promise.resolve(s);};p.prototype.isFirstCreateAtEnd=function(){return this.oModel._getCreatedContextsCache().isAtEnd(this.getResolvedPath(),this.sCreatedEntitiesKey);};p.prototype._getCreatedContexts=function(){return this.oModel._getCreatedContextsCache().getContexts(this.getResolvedPath(),this.sCreatedEntitiesKey);};p.prototype._getSkipAndTop=function(s,i,M){var I,t,v=this._getCreatedContexts(),w=this.isFirstCreateAtEnd()===false,K=w&&this.aKeys.length?v.concat(this.aKeys):this.aKeys;t=m._getReadIntervals(K,s,i,M,this.bLengthFinal?this.iLength:undefined);I=m._mergeIntervals(t);if(I&&w&&this.aKeys.length){I.start-=v.length;I.end-=v.length;}return I&&{skip:I.start,top:I.end-I.start};};p.prototype._removePersistedCreatedContexts=function(){return this.oModel._getCreatedContextsCache().removePersistedContexts(this.getResolvedPath(),this.sCreatedEntitiesKey);};p.prototype.getCount=function(){if(!this.isLengthFinal()){return undefined;}return this.getLength()-this._getCreatedContexts().filter(function(i){return i.isInactive();}).length;};p.prototype._hasTransientParentContext=function(){return this.isRelative()&&!!(this.oContext&&this.oContext.isTransient&&this.oContext.isTransient());};p.prototype._isExpandedListUsable=function(){if(this.mCustomParams||(this.sOperationMode===n.Server&&(this.aApplicationFilters.length>0||this.aFilters.length>0||this.aSorters.length>0))){return false;}return true;};p.prototype._refreshForSideEffects=function(A,G){if(!this._isExpandedListUsable()&&A.has(this.oEntityType)){this.sRefreshGroupId=G;this._refresh();this.sRefreshGroupId=undefined;}};return p;});
