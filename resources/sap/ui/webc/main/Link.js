/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/webc/common/WebComponent","./library","sap/ui/core/EnabledPropagator","./thirdparty/Link"],function(e,a,t){"use strict";var i=a.LinkDesign;var n=a.WrappingType;var p=e.extend("sap.ui.webc.main.Link",{metadata:{library:"sap.ui.webc.main",tag:"ui5-link-ui5",properties:{accessibilityAttributes:{type:"object",defaultValue:{}},accessibleName:{type:"string",defaultValue:""},design:{type:"sap.ui.webc.main.LinkDesign",defaultValue:i.Default},enabled:{type:"boolean",defaultValue:true,mapping:{type:"attribute",to:"disabled",formatter:"_mapEnabled"}},href:{type:"string",defaultValue:""},target:{type:"string",defaultValue:""},text:{type:"string",defaultValue:"",mapping:"textContent"},wrappingType:{type:"sap.ui.webc.main.WrappingType",defaultValue:n.None}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,mapping:{type:"property",to:"accessibleNameRef",formatter:"_getAriaLabelledByForRendering"}}},events:{click:{parameters:{}}},designtime:"sap/ui/webc/main/designtime/Link.designtime"}});t.call(p.prototype);return p});