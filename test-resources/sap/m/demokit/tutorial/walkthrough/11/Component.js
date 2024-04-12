sap.ui.define(['sap/ui/core/UIComponent'],
	function (UIComponent) {
		"use strict";

		var Component = UIComponent.extend("sap.m.tutorial.walkthrough.11.Component", {

			metadata: {
				config: {
					sample: {
						iframe: "webapp/index.html",
						stretch: true,
						files: [
							"webapp/controller/App.controller.js",
							"webapp/i18n/i18n.properties",
							"webapp/view/App.view.xml",
							"webapp/Component.js",
							"webapp/index.html",
							"webapp/manifest.json",
							"ui5.yaml",
							"package.json"
						]
					}
				}
			}

		});

		return Component;

	});
