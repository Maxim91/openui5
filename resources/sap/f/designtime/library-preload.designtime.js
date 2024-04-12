//@ui5-bundle sap/f/designtime/library-preload.designtime.js
/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine('sap/f/designtime/Avatar.designtime',["sap/ui/thirdparty/jquery","sap/m/designtime/Avatar.designtime"],function(q,a){"use strict";return q.extend(a,{templates:{create:"sap/f/designtime/Avatar.create.fragment.xml"}});});
sap.ui.predefine('sap/f/designtime/DynamicPage.designtime',[],function(){"use strict";return{aggregations:{title:{domRef:":sap-domref .sapFDynamicPageTitle"},header:{domRef:":sap-domref .sapFDynamicPageHeader"},content:{domRef:":sap-domref .sapFDynamicPageContent"},footer:{domRef:":sap-domref .sapFDynamicPageActualFooterControl"},landmarkInfo:{ignore:true}},scrollContainers:[{domRef:"> .sapFDynamicPageContentWrapper",aggregations:function(e,u){e.attachEventOnce("_moveHeader",function(){u({index:0});});if(e._bHeaderInTitleArea||e._bPinned||e.getPreserveHeaderStateOnScroll()){return["content"];}else{return["header","content"];}}},{domRef:function(e){return e.$("vertSB-sb").get(0);}}],templates:{create:"sap/f/designtime/DynamicPage.create.fragment.xml"}};});
sap.ui.predefine('sap/f/designtime/DynamicPageHeader.designtime',[],function(){"use strict";return{aggregations:{content:{domRef:":sap-domref .sapFDynamicPageHeaderContent",actions:{move:{changeType:"moveControls"}}}},actions:{remove:{changeType:"hideControl"},reveal:{changeType:"unhideControl"}},name:{singular:"DYNAMIC_PAGE_HEADER_NAME",plural:"DYNAMIC_PAGE_HEADER_NAME_PLURAL"}};});
sap.ui.predefine('sap/f/designtime/DynamicPageTitle.designtime',[],function(){"use strict";return{aggregations:{heading:{domRef:":sap-domref .sapFDynamicPageTitleMainHeadingInner",ignore:function(e){return!e.getHeading();}},expandedHeading:{domRef:function(e){return e.$("expand-heading-wrapper").get(0);},ignore:function(e){return e.getHeading()||!e.getExpandedHeading();}},snappedHeading:{domRef:function(e){return e.$("snapped-heading-wrapper").get(0);},ignore:function(e){return e.getHeading()||!e.getSnappedHeading();}},actions:{domRef:":sap-domref .sapFDynamicPageTitleMainActions",actions:{split:{changeType:"splitMenuButton"},combine:{changeType:"combineButtons"},move:{changeType:"moveActions"}}},content:{domRef:":sap-domref .sapFDynamicPageTitleMainContent",actions:{move:{changeType:"moveControls"}}},snappedContent:{domRef:function(e){return e.$("snapped-wrapper").get(0);},actions:{move:{changeType:"moveControls"}}},expandedContent:{domRef:function(e){return e.$("expand-wrapper").get(0);},actions:{move:{changeType:"moveControls"}}},snappedTitleOnMobile:{ignore:true},navigationActions:{ignore:true},breadcrumbs:{ignore:true}},actions:{remove:{changeType:"hideControl"},reveal:{changeType:"unhideControl"}},name:{singular:"DYNAMIC_PAGE_TITLE_NAME",plural:"DYNAMIC_PAGE_TITLE_NAME_PLURAL"}};});
sap.ui.predefine('sap/f/designtime/SemanticPage.designtime',[],function(){"use strict";var s=function(c,a){return!(c&&c[a]&&c[a]()&&c[a]().getDomRef());};var i=function(c,a){var C;if(!c){return true;}C=c.$().find("sapFDynamicPageTitleActionsBar");return!!(C.length>0&&c[a]().length>0);};return{aggregations:{titleHeading:{domRef:function(c){return c.getTitleHeading().getDomRef();},ignore:function(c){return s(c,"getTitleHeading");}},titleSnappedHeading:{domRef:function(c){return c.getTitleHeading().getDomRef();},ignore:function(c){return s(c,"getTitleSnappedHeading");}},titleExpandedHeading:{domRef:function(c){return c.getTitleHeading().getDomRef();},ignore:function(c){return s(c,"getTitleExpandedHeading");}},titleSnappedOnMobile:{ignore:true},titleBreadcrumbs:{domRef:function(c){return c.getTitleBreadcrumbs().getDomRef();},ignore:function(c){return s(c,"getTitleBreadcrumbs");}},titleSnappedContent:{domRef:":sap-domref .sapFDynamicPageTitleMainSnapContentVisible",actions:{move:{changeType:"moveControls"}},ignore:function(c){return!!(!c||c.getTitleSnappedContent().length===0||c.getHeaderExpanded());}},titleExpandedContent:{domRef:":sap-domref .sapFDynamicPageTitleMainExpandContentVisible",actions:{move:{changeType:"moveControls"}},ignore:function(c){return!!(!c||c.getTitleExpandedContent().length===0||!c.getHeaderExpanded());}},titleContent:{domRef:":sap-domref .sapFDynamicPageTitleMain > .sapFDynamicPageTitleMainInner > .sapFDynamicPageTitleMainContent",actions:{move:{changeType:"moveControls"}},ignore:function(c){return!!(!c||c.getTitleContent().length===0);}},titleMainAction:{domRef:function(c){return c.getTitleMainAction().getDomRef();},ignore:function(c){return s(c,"getTitleMainAction");}},editAction:{domRef:function(c){return c.getEditAction().getDomRef();},ignore:function(c){return s(c,"getEditAction");}},addAction:{domRef:function(c){return c.getAddAction().getDomRef();},ignore:function(c){return s(c,"getAddAction");}},deleteAction:{domRef:function(c){return c.getDeleteAction().getDomRef();},ignore:function(c){return s(c,"getDeleteAction");}},copyAction:{domRef:function(c){return c.getCopyAction().getDomRef();},ignore:function(c){return s(c,"getCopyAction");}},flagAction:{domRef:function(c){return c.getFlagAction().getDomRef();},ignore:function(c){return s(c,"getFlagAction");}},favoriteAction:{domRef:function(c){return c.getFavoriteAction().getDomRef();},ignore:function(c){return s(c,"getFavoriteAction");}},fullScreenAction:{domRef:function(c){return c.getFullScreenAction().getDomRef();},ignore:function(c){return s(c,"getFullScreenAction");}},exitFullScreenAction:{domRef:function(c){return c.getExitFullScreenAction().getDomRef();},ignore:function(c){return s(c,"getExitFullScreenAction");}},closeAction:{domRef:function(c){return c.getCloseAction().getDomRef();},ignore:function(c){return s(c,"getCloseAction");}},titleCustomTextActions:{domRef:":sap-domref .sapFDynamicPageTitleActionsBar",ignore:function(c){return i(c,"getTitleCustomTextActions");}},titleCustomIconActions:{domRef:":sap-domref .sapFDynamicPageTitleActionsBar",ignore:function(c){return i(c,"getTitleCustomIconActions");}},headerContent:{domRef:":sap-domref .sapFDynamicPageHeaderContent",actions:{move:{changeType:"moveControls"}},ignore:function(c){return!(c&&c.getHeaderContent().length>0);}},content:{domRef:":sap-domref .sapFDynamicPageContent",ignore:function(c){return!(c&&c.getContent());}},footerMainAction:{domRef:function(c){return c.getFooterMainAction().getDomRef();},ignore:function(c){return s(c,"getFooterMainAction");}},messagesIndicator:{domRef:function(c){return c.getMessagesIndicator().getDomRef();},ignore:function(c){return s(c,"getMessagesIndicator");}},draftIndicator:{domRef:function(c){return c.getDraftIndicator().getDomRef();},ignore:function(c){return s(c,"getDraftIndicator");}},positiveAction:{domRef:function(c){return c.getPositiveAction().getDomRef();},ignore:function(c){return s(c,"getPositiveAction");}},negativeAction:{domRef:function(c){return c.getNegativeAction().getDomRef();},ignore:function(c){return s(c,"getNegativeAction");}},footerCustomActions:{domRef:":sap-domref .sapFDynamicPageActualFooterControl",ignore:function(c){return!(c&&c.getFooterCustomActions()&&c.getFooterCustomActions().length>0);}},discussInJamAction:{domRef:function(c){return c.getDiscussInJamAction().getDomRef();},ignore:function(c){return s(c,"getDiscussInJamAction");}},saveAsTileAction:{domRef:function(c){return c.getSaveAsTileAction().getDomRef();},ignore:function(c){return s(c,"getSaveAsTileAction");}},shareInJamAction:{domRef:function(c){return c.getShareInJamAction().getDomRef();},ignore:function(c){return s(c,"getShareInJamAction");}},sendMessageAction:{domRef:function(c){return c.getSendMessageAction().getDomRef();},ignore:function(c){return s(c,"getSendMessageAction");}},sendEmailAction:{domRef:function(c){return c.getSendEmailAction().getDomRef();},ignore:function(c){return s(c,"getSendEmailAction");}},printAction:{domRef:function(c){return c.getPrintAction().getDomRef();},ignore:function(c){return s(c,"getPrintAction");}},customShareActions:{domRef:function(c){return c._getActionSheet().getDomRef();},ignore:function(c){return s(c,"_getActionSheet");}},landmarkInfo:{ignore:true}},scrollContainers:[{domRef:":sap-domref .sapFDynamicPageContentWrapper",aggregations:function(e){if(e&&e.getDomRef()&&(e.getDomRef().querySelector(".sapFDynamicPageHeaderPinned")||e.getPreserveHeaderStateOnScroll())){return["content"];}else{return["headerContent","content"];}}},{domRef:function(e){return e.$("vertSB-sb").get(0);}}],templates:{create:"sap/f/designtime/SemanticPage.create.fragment.xml"}};});
sap.ui.predefine('sap/f/designtime/library.designtime',[],function(){"use strict";return{};});
//# sourceMappingURL=library-preload.designtime.js.map