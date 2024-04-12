/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"sap/ui/core/sample/common/pages/Any",
		"sap/ui/core/sample/odata/v4/SalesOrderTP100_V2/pages/Main",
		"sap/base/Log",
		"sap/ui/test/opaQunit"
	], function (Any, Main, Log, opaTest) {
		var sDefaultLanguage = sap.ui.getCore().getConfiguration().getLanguage();

		QUnit.module("sap.ui.core.sample.odata.v4.SalesOrderTP100_V2", {
			before : function () {
				sap.ui.getCore().getConfiguration().setLanguage("en-US");
			},
			after : function () {
				sap.ui.getCore().getConfiguration().setLanguage(sDefaultLanguage);
			}
		});

		//*****************************************************************************
		opaTest("Start sales orders TP100 app and check log", function (Given, When, Then) {
			var aExpectedLogs = [{
					component : "sap.ui.model.odata.v4.lib._V2MetadataConverter",
					level : Log.Level.WARNING,
					message : "Unsupported annotation 'sap:supported-formats'"
				}, {
					component : "sap.ui.model.odata.v4.lib._V2MetadataConverter",
					level : Log.Level.WARNING,
					message : "Unsupported annotation 'sap:semantics'"
				}],
				i;

			for (i = 0; i < 16; i += 1) {
				aExpectedLogs.push({
					component : "sap.ui.model.odata.v4.lib._V2MetadataConverter",
					level : Log.Level.WARNING,
					message : "Unsupported annotation 'sap:value-list'"
				});
			}

			When.onAnyPage.applySupportAssistant();
			Given.iStartMyUIComponent({
				autoWait : true,
				componentConfig : {
					name : "sap.ui.core.sample.odata.v4.SalesOrderTP100_V2"
				}
			});

			When.onTheMainPage.pressMoreButton("SalesOrders");
			When.onTheMainPage.selectSalesOrder(1);
			When.onTheMainPage.pressMoreButton("SalesOrderItems");

			Then.onAnyPage.checkLog(aExpectedLogs);
			Then.onAnyPage.analyzeSupportAssistant();
			Then.iTeardownMyUIComponent();
		});

		QUnit.start();
	});
});
