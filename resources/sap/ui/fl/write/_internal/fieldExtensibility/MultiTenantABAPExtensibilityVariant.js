/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/write/_internal/fieldExtensibility/ABAPExtensibilityVariant","sap/ui/fl/write/_internal/fieldExtensibility/Utils"],function(A,U){"use strict";var e="/sap/opu/odata/sap/APS_PREDEFINED_FIELD_SRV/GetExtensionDataByResourcePath";var n={semanticObject:"PredefinedCustomField",action:"configure"};var M=A.extend("sap.ui.fl.write._internal.fieldExtensibility.MultiTenantABAPExtensibilityVariant",{getExtensionData:function(){return this._oExtensionDataPromise.then(function(E){if(this._containsData(E)){return this._convertExtensionData(E);}return null;}.bind(this));},getNavigationUri:function(){return this._oExtensionDataPromise.then(function(E){if(this._containsData(E)){return U.getNavigationUriForIntent({target:n,params:{businessObjectNodeName:E.BusinessObjectNodeName,cdsEntityName:E.CdsEntityName,serviceVersion:this._mServiceInfo.serviceVersion,serviceName:this._mServiceInfo.serviceName}});}return null;}.bind(this));},getTexts:function(){return this._oExtensionDataPromise.then(function(E){if(this._containsData(E)){return{tooltip:U.getText("BTN_ADD_FIELD"),headerText:U.getText("BUSINESS_OBJECT_NODE_TITLE")};}return null;}.bind(this));},isActive:function(){return this._oExtensionDataPromise.then(function(E){return this._containsData(E);}.bind(this));},_containsData:function(E){return Boolean(E&&E.BusinessObjectNodeName&&E.CdsEntityName);},_convertExtensionData:function(E){return{extensionData:[{businessContext:E.BusinessObjectNodeName,description:E.BusinessObjectNodeDescription}]};},_determineExtensionData:function(){return new Promise(function(r,R){U.isNavigationSupportedForIntents([n]).then(function(N){var i=N.some(function(b){return b===true;});if(i){U.executeRequest(e,{ResourcePath:this._sServiceUri,EntitySetName:this._mBindingInfo.entitySetName}).then(function(o){if(o.errorOccurred===false){r(this._extractExtensionDataFromResponse(o.result));}else{R(o);}}.bind(this));}else{r(null);}}.bind(this));}.bind(this));},_extractExtensionDataFromResponse:function(r){return r.GetExtensionDataByResourcePath;}});return M;});
