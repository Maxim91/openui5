/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core","sap/ui/base/DataType","sap/ui/Device","sap/ui/thirdparty/jquery","sap/ui/core/library","sap/f/library","sap/m/library","sap/ui/layout/library"],function(C,D,a,q){"use strict";var t=sap.ui.getCore().initLibrary({name:"sap.uxap",dependencies:["sap.ui.core","sap.f","sap.m","sap.ui.layout"],designtime:"sap/uxap/designtime/library.designtime",types:["sap.uxap.BlockBaseColumnLayout","sap.uxap.BlockBaseFormAdjustment","sap.uxap.Importance","sap.uxap.ObjectPageConfigurationMode","sap.uxap.ObjectPageHeaderDesign","sap.uxap.ObjectPageHeaderPictureShape","sap.uxap.ObjectPageSubSectionLayout","sap.uxap.ObjectPageSubSectionMode"],interfaces:["sap.uxap.IHeaderTitle","sap.uxap.IHeaderContent"],controls:["sap.uxap.AnchorBar","sap.uxap.BlockBase","sap.uxap.BreadCrumbs","sap.uxap.HierarchicalSelect","sap.uxap.ObjectPageHeader","sap.uxap.ObjectPageDynamicHeaderTitle","sap.uxap.ObjectPageDynamicHeaderContent","sap.uxap.ObjectPageHeaderActionButton","sap.uxap.ObjectPageHeaderContent","sap.uxap.ObjectPageLayout","sap.uxap.ObjectPageSection","sap.uxap.ObjectPageSectionBase","sap.uxap.ObjectPageSubSection"],elements:["sap.uxap.ModelMapping","sap.uxap.ObjectPageAccessibleLandmarkInfo","sap.uxap.ObjectPageHeaderLayoutData","sap.uxap.ObjectPageLazyLoader"],version:"1.103.1",extensions:{flChangeHandlers:{"sap.uxap.ObjectPageHeader":"sap/uxap/flexibility/ObjectPageHeader","sap.uxap.ObjectPageLayout":"sap/uxap/flexibility/ObjectPageLayout","sap.uxap.ObjectPageSection":"sap/uxap/flexibility/ObjectPageSection","sap.uxap.ObjectPageSubSection":"sap/uxap/flexibility/ObjectPageSubSection","sap.uxap.ObjectPageDynamicHeaderTitle":"sap/uxap/flexibility/ObjectPageDynamicHeaderTitle","sap.uxap.ObjectPageHeaderActionButton":"sap/uxap/flexibility/ObjectPageHeaderActionButton","sap.ui.core._StashedControl":{"unstashControl":{"changeHandler":"default","layers":{"USER":true}},"stashControl":{"changeHandler":"default","layers":{"USER":true}}}},"sap.ui.support":{publicRules:true}}});t.BlockBaseColumnLayout=D.createType('sap.uxap.BlockBaseColumnLayout',{isValid:function(v){return/^(auto|[1-4]{1})$/.test(v);}},D.getType('string'));t.BlockBaseFormAdjustment={BlockColumns:"BlockColumns",OneColumn:"OneColumn",None:"None"};t.ObjectPageConfigurationMode={JsonURL:"JsonURL",JsonModel:"JsonModel"};t.ObjectPageHeaderDesign={Light:"Light",Dark:"Dark"};t.ObjectPageHeaderPictureShape={Circle:"Circle",Square:"Square"};t.ObjectPageSubSectionLayout={TitleOnTop:"TitleOnTop",TitleOnLeft:"TitleOnLeft"};t.ObjectPageSubSectionMode={Collapsed:"Collapsed",Expanded:"Expanded"};t.Importance={Low:"Low",Medium:"Medium",High:"High"};t.Utilities={getClosestOPL:function(c){while(c&&!(c instanceof sap.uxap.ObjectPageLayout)){c=c.getParent();}return c;},isPhoneScenario:function(r){if(a.system.phone){return true;}return t.Utilities._isCurrentMediaSize("Phone",r);},isTabletScenario:function(r){return t.Utilities._isCurrentMediaSize("Tablet",r);},_isCurrentMediaSize:function(m,r){return r&&r.name===m;},getChildPosition:function(e,c){var E=e instanceof q?e:q(e),$=c instanceof q?c:q(c),b=q(document.documentElement),o=E.position(),O=E.offsetParent(),A;while(!O.is($)&&!O.is(b)){A=O.position();o.top+=A.top;o.left+=A.left;O=O.offsetParent();}return o;}};return t;});
