/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/**
 * Initialization Code and shared classes of library sap.ui.testlib
 */
sap.ui.define([
	"sap/ui/core/library", // library dependencies
	"sap/ui/core/Core"
], function() {
	"use strict";

	// delegate further initialization of this library to the Core
	sap.ui.getCore().initLibrary({
		name : "sap.ui.testlib",
		dependencies : ["sap.ui.core"],
		types: [
		],
		interfaces: [
		],
		controls: [
			"sap.ui.testlib.TestButton"
		],
		elements: [
		],
		version: "1.2.3"
	});

	return sap.ui.testlib;

});
