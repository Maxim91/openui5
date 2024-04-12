/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device"],function(D){"use strict";var O={apiVersion:2};O.render=function(r,c){var s,h=c.getHeaderTitle(),a=null,R=sap.uxap.ObjectPageLayout._getLibraryResourceBundle(),i=c.getHeaderContent()&&c.getHeaderContent().length>0&&c.getShowHeaderContent(),I=c.getShowTitleInHeaderContent()&&c.getShowHeaderContent(),b=i||I,u=c.getUseIconTabBar(),t=c.getToggleHeaderOnTitleClick()&&c.getHeaderTitle()&&c.getHeaderTitle().supportsToggleHeaderOnTitleClick(),d=c._getAriaLabelText("ROOT",true),H=c._getAriaLabelText("HEADER",true),B=c.getBackgroundDesignAnchorBar(),l=c.getLandmarkInfo(),e=c._getHeaderTag(l),f=c._getFooterTag(l),g=l&&l.getHeaderRole(),j=l&&l.getHeaderLabel(),k=l&&l.getRootRole(),m=l&&l.getRootLabel(),n=l&&l.getNavigationRole();if(c.getShowAnchorBar()&&c._getInternalAnchorBarVisible()){a=c.getAggregation("_anchorBar");}r.openStart("div",c);if(!k){r.attr("role","main");}r.attr("aria-roledescription",R.getText("ROOT_ROLE_DESCRIPTION"));if(!m){r.attr("aria-label",d);}r.class("sapUxAPObjectPageLayout");if(t){r.class("sapUxAPObjectPageLayoutTitleClickEnabled");}if(!b){r.class("sapUxAPObjectPageLayoutNoHeaderContent");}if(!a||!a.getVisible()){r.class("sapUxAPObjectPageLayoutNoAnchorBar");}r.style("height",c.getHeight());r.accessibilityState(c,c._formatLandmarkInfo(l,"Root"));r.openEnd();r.openStart(e,c.getId()+"-headerTitle");if(!g){r.attr("role","banner");}r.attr("aria-roledescription",R.getText("HEADER_ROLE_DESCRIPTION"));if(!j){r.attr("aria-label",H);}r.attr("data-sap-ui-customfastnavgroup",true).class("sapUxAPObjectPageHeaderTitle").class("sapContrastPlus").accessibilityState(c,c._formatLandmarkInfo(l,"Header")).openEnd();if(h){r.renderControl(h);}this._renderHeaderContentDOM(r,c,c._bHeaderInTitleArea,"-stickyHeaderContent");r.openStart("div",c.getId()+"-stickyAnchorBar");r.attr("data-sap-ui-customfastnavgroup",true);if(!n){r.attr("role","navigation");}r.attr("aria-roledescription",R.getText("NAVIGATION_ROLE_DESCRIPTION"));if(!c._bHeaderInTitleArea){r.attr("aria-hidden","true");}r.class("sapUxAPObjectPageStickyAnchorBar").class("sapUxAPObjectPageNavigation").class("ui-helper-clearfix");if(B){r.class("sapUxAPObjectPageNavigation"+B);}r.accessibilityState(c,c._formatLandmarkInfo(l,"Navigation"));r.openEnd();this._renderAnchorBar(r,c,a,c._bHeaderInTitleArea);r.close("div");r.close(e);r.openStart("div",c.getId()+"-opwrapper").class("sapUxAPObjectPageWrapper");if(h&&(!h.supportsTitleInHeaderContent()||!(c.getShowTitleInHeaderContent()&&h.getShowTitleSelector()))){r.class("sapUxAPObjectPageWrapperTransform");}r.openEnd();r.openStart("div",c.getId()+"-scroll").class("sapUxAPObjectPageScroll").openEnd();this._renderHeaderContentDOM(r,c,!c._bHeaderInTitleArea,"-headerContent",true);r.openStart("section",c.getId()+"-anchorBar");r.attr("data-sap-ui-customfastnavgroup",true);if(!n){r.attr("role","navigation");}r.attr("aria-roledescription",R.getText("NAVIGATION_ROLE_DESCRIPTION"));r.class("sapUxAPObjectPageNavigation").class("ui-helper-clearfix").class("sapContrastPlus");if(B){r.class("sapUxAPObjectPageNavigation"+B);}r.accessibilityState(c,c._formatLandmarkInfo(l,"Navigation"));r.openEnd();this._renderAnchorBar(r,c,a,!c._bHeaderInTitleArea);r.close("section");r.openStart("section",c.getId()+"-sectionsContainer");r.class("sapUxAPObjectPageContainer");r.class("ui-helper-clearfix");if(!a){r.class("sapUxAPObjectPageContainerNoBar");}r.accessibilityState(c,c._formatLandmarkInfo(l,"Content"));r.openEnd();s=c._getSectionsToRender();if(Array.isArray(s)){s.forEach(function(S){r.renderControl(S);if(u){c._oCurrentTabSection=S;}});}r.close("section");this.renderFooterContent(r,c);r.openStart("div",c.getId()+"-spacer").openEnd().close("div");r.close("div");r.close("div");this._renderFooterContentInternal(r,c,f,l,R);r.close("div");};O._renderAnchorBar=function(r,c,a,R){var s=c.getAggregation("sections"),h;if(R){h=c._getHeaderContent();if(c.getIsChildPage()&&h&&h.supportsChildPageDesign()){r.openStart("div",c.getId()+"-childPageBar");if(Array.isArray(s)&&s.length>1){r.class('sapUxAPObjectChildPage');}r.openEnd();r.close("div");}if(a){r.renderControl(a);}}};O._renderHeaderContentDOM=function(r,c,R,i,a){r.openStart("header",c.getId()+i).class("ui-helper-clearfix").class("sapUxAPObjectPageHeaderDetails").class("sapUxAPObjectPageHeaderDetailsDesign-"+c._getHeaderDesign());if(a){r.class("sapContrastPlus");}r.attr("data-sap-ui-customfastnavgroup",true).openEnd();if(R){this.renderHeaderContent(r,c);}r.close("header");};O.renderHeaderContent=function(r,c){r.renderControl(c._getHeaderContent());};O.renderFooterContent=function(r,c){};O._renderFooterContentInternal=function(r,o,f,l,R){var F=o.getFooter(),b=l&&l.getFooterRole();if(!F){return;}r.openStart(f,o.getId()+"-footerWrapper");r.class("sapUxAPObjectPageFooter").class("sapMFooter-CTX").class("sapContrast").class("sapContrastPlus");if(!o.getShowFooter()){r.class("sapUiHidden");}if(!b){r.attr("role","region");}r.attr("aria-roledescription",R.getText("FOOTER_ROLE_DESCRIPTION"));r.accessibilityState(o,o._formatLandmarkInfo(l,"Footer"));r.openEnd();F.addStyleClass("sapUxAPObjectPageFloatingFooter");r.renderControl(F);r.close(f);};O._rerenderHeaderContentArea=function(r,c){var h=c._bHeaderInTitleArea?"stickyHeaderContent":"headerContent",$;this.renderHeaderContent(r,c);$=c.$(h)[0];if($){r.flush($);}};return O;},true);
