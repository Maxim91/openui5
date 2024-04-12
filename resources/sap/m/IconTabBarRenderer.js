/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var I={apiVersion:2};I._aAllIconColors=['sapMITBFilterCritical','sapMITBFilterPositive','sapMITBFilterNegative','sapMITBFilterDefault'];I.render=function(r,i){var c=i.getContent(),h=i._getIconTabHeader();r.openStart("div",i).class("sapMITB");if(i.getStretchContentHeight()){r.class("sapMITBStretch");}if(!i.getApplyContentPadding()){r.class("sapMITBNoContentPadding");}r.class("sapMITBBackgroundDesign"+i.getBackgroundDesign()).openEnd();if(!i._bHideHeader){r.renderControl(h);}r.openStart("div",i.getId()+"-containerContent").class("sapMITBContainerContent");if(!i.getExpanded()){r.class("sapMITBContentClosed");}r.openEnd();r.openStart("div",i.getId()+"-content").class("sapMITBContent").attr("role","tabpanel");if(!i.getExpanded()){r.style("display","none");}if(h.oSelectedItem){r.accessibilityState({labelledby:h.oSelectedItem.getId()});}r.openEnd();if(i.getExpanded()){if(h.oSelectedItem&&h.oSelectedItem.getContent()){var C=h.oSelectedItem.getContent();if(C.length>0){c=C;}}c.forEach(function(o){r.renderControl(o);});}r.close("div").close("div").close("div");};return I;},true);
