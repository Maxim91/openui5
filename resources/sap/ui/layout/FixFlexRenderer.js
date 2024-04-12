/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var F={apiVersion:2};F.render=function(r,c){r.openStart("div",c).class("sapUiFixFlex");if(c.getMinFlexSize()!==0){r.class("sapUiFixFlexInnerScrolling");}if(!c.getVertical()){r.class("sapUiFixFlexRow");}r.openEnd();if(c.getFixFirst()){this.renderFixChild(r,c);this.renderFlexChild(r,c);}else{this.renderFlexChild(r,c);this.renderFixChild(r,c);}r.close("div");};F.renderFixChild=function(r,c){r.openStart("div",c.getId()+"-Fixed").class("sapUiFixFlexFixed");if(c.getFixContentSize()!=="auto"){if(c.getVertical()){r.style("height",c.getFixContentSize());}else{r.style("width",c.getFixContentSize());}}r.openEnd();c.getFixContent().forEach(r.renderControl,r);r.close("div");};F.renderFlexChild=function(r,c){r.openStart("div",c.getId()+"-Flexible").class("sapUiFixFlexFlexible").openEnd();r.openStart("div",c.getId()+"-FlexibleContainer").class("sapUiFixFlexFlexibleContainer");if(c.getMinFlexSize()!==0){if(c.getVertical()){r.style("min-height",c.getMinFlexSize()+"px");}else{r.style("min-width",c.getMinFlexSize()+"px");}}r.openEnd();r.renderControl(c.getFlexContent());r.close("div").close("div");};return F;},true);
