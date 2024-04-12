/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
// The SandboxModel is used in the manifest instead of OData V4 model for the following purposes:
// Certain constructor parameters are taken from URL parameters. For the "non-realOData" case, a
// mock server for the back-end requests is set up.
sap.ui.define([
	"sap/ui/core/sample/common/SandboxModelHelper",
	"sap/ui/model/odata/v4/ODataModel"
], function (SandboxModelHelper, ODataModel) {
	"use strict";

	var oMockData = {
			sFilterBase : "/sap/opu/odata/sap/ZUI5_EDM_TYPES/",
			mFixture : {
				"EdmTypesCollection?$select=Boolean,Byte,GlobalUID,ID,Int16,Int32,SByte,String&$skip=0&$top=100" : {
					source : "EdmTypesV2.json"
				},
				"EdmTypesCollection('1')?$select=Binary,Boolean,Byte,Date,DateTime,DateTimeOffset,Decimal,Double,Float,GlobalUID,ID,Int16,Int32,Int64,SByte,Single,String,Time" : {
					source : "EdmTypesV2_SingleEntity.json"
				}
			},
			sSourceBase : "sap/ui/core/sample/odata/v4/ConsumeV2Service/data"
		};

	return ODataModel.extend("sap.ui.core.sample.odata.v4.ConsumeV2Service.SandboxModel", {
		constructor : function (mParameters) {
			return SandboxModelHelper.adaptModelParametersAndCreateModel(mParameters, oMockData);
		}
	});
});
