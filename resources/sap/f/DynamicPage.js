/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/Core","sap/m/library","sap/ui/base/ManagedObjectObserver","sap/ui/core/ResizeHandler","sap/ui/core/Configuration","sap/ui/core/delegate/ScrollEnablement","sap/ui/Device","sap/ui/base/ManagedObject","sap/f/DynamicPageTitle","sap/f/DynamicPageHeader","./DynamicPageRenderer","sap/base/Log","sap/ui/core/theming/Parameters",'sap/ui/dom/units/Rem',"sap/ui/core/library"],function(l,C,a,L,M,R,b,S,D,c,d,e,f,g,P,h,i){"use strict";var j=L.PageBackgroundDesign;var k=C.extend("sap.f.DynamicPage",{metadata:{library:"sap.f",properties:{preserveHeaderStateOnScroll:{type:"boolean",group:"Behavior",defaultValue:false},headerExpanded:{type:"boolean",group:"Behavior",defaultValue:true},headerPinned:{type:"boolean",group:"Behavior",defaultValue:false},toggleHeaderOnTitleClick:{type:"boolean",group:"Behavior",defaultValue:true},showFooter:{type:"boolean",group:"Behavior",defaultValue:false},backgroundDesign:{type:"sap.m.PageBackgroundDesign",group:"Appearance",defaultValue:j.Standard},fitContent:{type:"boolean",group:"Behavior",defaultValue:false}},associations:{stickySubheaderProvider:{type:"sap.f.IDynamicPageStickyContent",multiple:false}},aggregations:{title:{type:"sap.f.DynamicPageTitle",multiple:false},header:{type:"sap.f.DynamicPageHeader",multiple:false},content:{type:"sap.ui.core.Control",multiple:false},footer:{type:"sap.m.IBar",multiple:false},landmarkInfo:{type:"sap.f.DynamicPageAccessibleLandmarkInfo",multiple:false}},events:{pinnedStateChange:{parameters:{pinned:{type:"boolean"}}}},dnd:{draggable:false,droppable:true},designtime:"sap/f/designtime/DynamicPage.designtime"}});function m(o){if(arguments.length===1){return o&&("length"in o)?o.length>0:!!o;}return Array.prototype.slice.call(arguments).every(function(O){return m(O);});}function n(E){var o;if(!E){return false;}o=E.getBoundingClientRect();return!!(o.width&&o.height);}var A=i.AccessibleLandmarkRole;k.HEADER_MAX_ALLOWED_PINNED_PERCENTAGE=0.6;k.HEADER_MAX_ALLOWED_NON_SROLLABLE_PERCENTAGE=0.6;k.HEADER_MAX_ALLOWED_NON_SROLLABLE_ON_MOBILE=0.3;k.BREAK_POINTS={DESKTOP:1439,TABLET:1024,PHONE:600};k.EVENTS={TITLE_PRESS:"_titlePress",TITLE_MOUSE_OVER:"_titleMouseOver",TITLE_MOUSE_OUT:"_titleMouseOut",PIN_UNPIN_PRESS:"_pinUnpinPress",VISUAL_INDICATOR_MOUSE_OVER:"_visualIndicatorMouseOver",VISUAL_INDICATOR_MOUSE_OUT:"_visualIndicatorMouseOut",HEADER_VISUAL_INDICATOR_PRESS:"_headerVisualIndicatorPress",TITLE_VISUAL_INDICATOR_PRESS:"_titleVisualIndicatorPress"};k.MEDIA={PHONE:"sapFDynamicPage-Std-Phone",TABLET:"sapFDynamicPage-Std-Tablet",DESKTOP:"sapFDynamicPage-Std-Desktop",DESKTOP_XL:"sapFDynamicPage-Std-Desktop-XL"};k.RESIZE_HANDLER_ID={PAGE:"_sResizeHandlerId",TITLE:"_sTitleResizeHandlerId",HEADER:"_sHeaderResizeHandlerId",CONTENT:"_sContentResizeHandlerId"};k.DIV="div";k.HEADER="header";k.FOOTER="footer";k.HEADER_CONTENT_PADDING_BOTTOM=h.toPx("1rem");k.SHOW_FOOTER_CLASS_NAME="sapFDynamicPageActualFooterControlShow";k.HIDE_FOOTER_CLASS_NAME="sapFDynamicPageActualFooterControlHide";k.NAVIGATION_CLASS_NAME="sapFDynamicPageNavigation";k.ARIA_ROLE_DESCRIPTION="DYNAMIC_PAGE_ROLE_DESCRIPTION";k.prototype.init=function(){this._bPinned=false;this._bHeaderInTitleArea=false;this._bExpandingWithAClick=false;this._bSuppressToggleHeaderOnce=false;this._headerBiggerThanAllowedHeight=false;this._oStickySubheader=null;this._bStickySubheaderInTitleArea=false;this._oScrollHelper=new S(this,this.getId()+"-content",{horizontal:false,vertical:true});this._oScrollHelper.setOnAfterScrollToElement(this._onAfterScrollToElement.bind(this));this._oStickyHeaderObserver=null;this._oHeaderObserver=null;this._oSubHeaderAfterRenderingDelegate={onAfterRendering:function(){this._bStickySubheaderInTitleArea=false;this._adjustStickyContent();}};this._setAriaRoleDescription(a.getLibraryResourceBundle("sap.f").getText(k.ARIA_ROLE_DESCRIPTION));};k.prototype.onBeforeRendering=function(){if(!this._preserveHeaderStateOnScroll()){this._attachPinPressHandler();}this._attachTitlePressHandler();this._attachVisualIndicatorsPressHandlers();if(D.system.desktop){this._attachVisualIndicatorMouseOverHandlers();this._attachTitleMouseOverHandlers();}this._attachHeaderObserver();this._addStickySubheaderAfterRenderingDelegate();this._detachScrollHandler();this._detachResizeHandlers();this._toggleAdditionalNavigationClass();};k.prototype.onAfterRendering=function(){var s,o;if(this.getPreserveHeaderStateOnScroll()){setTimeout(this._overridePreserveHeaderStateOnScroll.bind(this),0);}this._cacheDomElements();this._attachResizeHandlers();this._updateMedia(this._getWidth(this));this._attachScrollHandler();this._updateTitlePositioning();this._attachPageChildrenAfterRenderingDelegates();this._updatePinButtonState();this._hidePinButtonIfNotApplicable();if(!this.getHeaderExpanded()){this._snapHeader(false);s=this.getHeader()&&!this.getPreserveHeaderStateOnScroll()&&this._canSnapHeaderOnScroll();if(s){o=this.$wrapper.scrollTop();this._setScrollPosition(o?o:this._getSnappingHeight());}else{this._toggleHeaderVisibility(false);this._moveHeaderToTitleArea();}}this._updateToggleHeaderVisualIndicators();this._updateTitleVisualState();};k.prototype.exit=function(){this._detachResizeHandlers();if(this._oScrollHelper){this._oScrollHelper.destroy();}if(this._oStickyHeaderObserver){this._oStickyHeaderObserver.disconnect();}if(this._oHeaderObserver){this._oHeaderObserver.disconnect();}if(this._oStickySubheader){this._oStickySubheader.removeEventDelegate(this._oSubHeaderAfterRenderingDelegate);}};k.prototype.setShowFooter=function(s){var r=this.setProperty("showFooter",s);this._toggleFooter(s);return r;};k.prototype.setHeader=function(H){var o=this.getHeader();if(H===o){return this;}this._detachHeaderEventListeners();return this.setAggregation("header",H);};k.prototype.destroyHeader=function(){this._detachHeaderEventListeners();return this.destroyAggregation("header");};k.prototype._detachHeaderEventListeners=function(){var H=this.getHeader();if(H){if(this._oStickyHeaderObserver){this._oStickyHeaderObserver.disconnect();}if(this._oHeaderObserver){this._oHeaderObserver.disconnect();}this._deRegisterResizeHandler(k.RESIZE_HANDLER_ID.HEADER);H.detachEvent(k.EVENTS.PIN_UNPIN_PRESS,this._onPinUnpinButtonPress);this._bAlreadyAttachedPinPressHandler=false;H.detachEvent(k.EVENTS.HEADER_VISUAL_INDICATOR_PRESS,this._onCollapseHeaderVisualIndicatorPress);this._bAlreadyAttachedHeaderIndicatorPressHandler=false;H.detachEvent(k.EVENTS.VISUAL_INDICATOR_MOUSE_OVER,this._onVisualIndicatorMouseOver);H.detachEvent(k.EVENTS.VISUAL_INDICATOR_MOUSE_OUT,this._onVisualIndicatorMouseOut);this._bAlreadyAttachedVisualIndicatorMouseOverOutHandler=false;this._bAlreadyAttachedStickyHeaderObserver=false;this._bAlreadyAttachedHeaderObserver=false;}};k.prototype.setStickySubheaderProvider=function(s){var o,O=this.getStickySubheaderProvider();if(s===O){return this;}o=a.byId(O);if(this._oStickySubheader&&o){o._returnStickyContent();o._setStickySubheaderSticked(false);this._oStickySubheader.removeEventDelegate(this._oSubHeaderAfterRenderingDelegate);this._bAlreadyAddedStickySubheaderAfterRenderingDelegate=false;this._oStickySubheader=null;}this.setAssociation("stickySubheaderProvider",s);return this;};k.prototype.setHeaderExpanded=function(H){H=this.validateProperty("headerExpanded",H);if(this._bPinned){return this;}if(this.getHeaderExpanded()===H){return this;}if(this.getDomRef()){this._titleExpandCollapseWhenAllowed();}this.setProperty("headerExpanded",H,true);this._updatePinButtonState();return this;};k.prototype.setToggleHeaderOnTitleClick=function(t){var H=this.getHeaderExpanded(),r=this.setProperty("toggleHeaderOnTitleClick",t,true);t=this.getProperty("toggleHeaderOnTitleClick");this._updateTitleVisualState();this._updateToggleHeaderVisualIndicators();this._updateARIAStates(H);return r;};k.prototype.setFitContent=function(F){var r=this.setProperty("fitContent",F,true);if(m(this.$())){this._updateFitContainer();}return r;};k.prototype.getScrollDelegate=function(){return this._oScrollHelper;};k.prototype._onAfterScrollToElement=function(){var s=this.$wrapper.scrollTop(),o=this._getTitleAreaHeight(),w=this._bStickySubheaderInTitleArea,O;this._toggleHeaderOnScroll();O=o;if(this._bStickySubheaderInTitleArea&&!w&&this.$wrapper.scrollTop()===s){O+=this._getHeight(this._oStickySubheader);}this.$wrapper.scrollTop(s-O);};k.prototype._overridePreserveHeaderStateOnScroll=function(){var o=this._headerBiggerThanAllowedHeight,p;this._headerBiggerThanAllowedHeight=this._headerBiggerThanAllowedToBeFixed();p=o!==this._headerBiggerThanAllowedHeight;if(!this._headerBiggerThanAllowedHeight||!p){return;}if(this.getHeaderExpanded()){this._moveHeaderToContentArea();}else{this._adjustSnap();}this._updateTitlePositioning();};k.prototype._toggleFooter=function(s){var F=this.getFooter(),u,o;if(!m(this.$())||!m(F)||!m(this.$footerWrapper)){return;}o=a.getConfiguration().getAnimationMode();u=o!==b.AnimationMode.none&&o!==b.AnimationMode.minimal;if(m(this.$contentFitContainer)){this.$contentFitContainer.toggleClass("sapFDynamicPageContentFitContainerFooterVisible",s);}if(u){this._toggleFooterAnimation(s,F);}else{this.$footerWrapper.toggleClass("sapUiHidden",!s);}this._updateTitlePositioning();};k.prototype._toggleFooterAnimation=function(s,F){this.$footerWrapper.on("webkitAnimationEnd animationend",this._onToggleFooterAnimationEnd.bind(this,F));if(s){this.$footerWrapper.removeClass("sapUiHidden");}F.toggleStyleClass(k.SHOW_FOOTER_CLASS_NAME,s);F.toggleStyleClass(k.HIDE_FOOTER_CLASS_NAME,!s);};k.prototype._onToggleFooterAnimationEnd=function(F){this.$footerWrapper.off("webkitAnimationEnd animationend");if(F.hasStyleClass(k.HIDE_FOOTER_CLASS_NAME)){this.$footerWrapper.addClass("sapUiHidden");F.removeStyleClass(k.HIDE_FOOTER_CLASS_NAME);}else{F.removeStyleClass(k.SHOW_FOOTER_CLASS_NAME);}};k.prototype._toggleHeaderInTabChain=function(t){var o=this.getTitle(),p=this.getHeader();if(!m(o)||!m(p)){return;}p.$().css("visibility",t?"visible":"hidden");};k.prototype._snapHeader=function(o,u){var p=this.getTitle();if(this._bPinned&&!u){g.debug("DynamicPage :: aborted snapping, header is pinned",this);return;}g.debug("DynamicPage :: snapped header",this);if(this._bPinned&&u){this._unPin(u);this._togglePinButtonPressedState(false);}if(m(p)){p._toggleState(false,u);if(o&&this._bHeaderInTitleArea){this._moveHeaderToContentArea(true);}}if(!m(this.$titleArea)){g.warning("DynamicPage :: couldn't snap header. There's no title.",this);return;}this.setProperty("headerExpanded",false,true);if(this._hasVisibleTitleAndHeader()){this.$titleArea.addClass(D.system.phone&&p.getSnappedTitleOnMobile()?"sapFDynamicPageTitleSnappedTitleOnMobile":"sapFDynamicPageTitleSnapped");this._updateToggleHeaderVisualIndicators();this._togglePinButtonVisibility(false);this._updateTitlePositioning();}this._toggleHeaderInTabChain(false);this._updateARIAStates(false);this._toggleHeaderBackground(true);};k.prototype._expandHeader=function(o,u){var p=this.getTitle();g.debug("DynamicPage :: expand header",this);if(m(p)){p._toggleState(true,u);if(o){this._moveHeaderToTitleArea(true);}}if(!m(this.$titleArea)){g.warning("DynamicPage :: couldn't expand header. There's no title.",this);return;}this.setProperty("headerExpanded",true,true);if(this._hasVisibleTitleAndHeader()){this.$titleArea.removeClass(D.system.phone&&p.getSnappedTitleOnMobile()?"sapFDynamicPageTitleSnappedTitleOnMobile":"sapFDynamicPageTitleSnapped");this._updateToggleHeaderVisualIndicators();if(!this.getPreserveHeaderStateOnScroll()&&!this._headerBiggerThanAllowedToPin()){this._togglePinButtonVisibility(true);}this._updateTitlePositioning();}this._toggleHeaderInTabChain(true);this._updateARIAStates(true);this._toggleHeaderBackground(false);};k.prototype._toggleHeaderVisibility=function(s,u){var E=this.getHeaderExpanded(),o=this.getTitle(),p=this.getHeader();if(this._bPinned&&!u){g.debug("DynamicPage :: header toggle aborted, header is pinned",this);return;}if(m(o)){o._toggleState(E);}if(m(p)){p.$().toggleClass("sapFDynamicPageHeaderHidden",!s);this._updateTitlePositioning();}};k.prototype._toggleHeaderBackground=function(s){this.$headerInContentWrapper.toggleClass("sapFDynamicPageHeaderSolid",s);};k.prototype._moveHeaderToContentArea=function(o){var p=this.getHeader();if(m(p)){p.$().prependTo(this.$headerInContentWrapper);this._bHeaderInTitleArea=false;if(o){this._offsetContentOnMoveHeader();}this.fireEvent("_moveHeader");}};k.prototype._moveHeaderToTitleArea=function(o){var p=this.getHeader();if(m(p)){p.$().prependTo(this.$stickyPlaceholder);this._bHeaderInTitleArea=true;if(o){this._offsetContentOnMoveHeader();}this.fireEvent("_moveHeader");}};k.prototype._offsetContentOnMoveHeader=function(){var o=Math.ceil(this._getHeaderHeight()),p=this.$wrapper.scrollTop(),N;if(!o){return;}N=this._bHeaderInTitleArea?p-o:p+o;N=Math.max(N,0);this._setScrollPosition(N,true);};k.prototype._isHeaderPinnable=function(){var H=this.getHeader();return H&&H.getPinnable()&&this.getHeaderExpanded()&&!this.getPreserveHeaderStateOnScroll();};k.prototype._updatePinButtonState=function(){var s=this.getHeaderPinned()&&this._isHeaderPinnable();this._togglePinButtonPressedState(s);if(s){this._pin();}else{this._unPin();}};k.prototype._pin=function(u){if(this._bPinned){return;}this._bPinned=true;if(u){this.setProperty("headerPinned",true,true);this.fireEvent("pinnedStateChange",{pinned:true});}if(!this._bHeaderInTitleArea){this._moveHeaderToTitleArea(true);this._updateTitlePositioning();}this._updateToggleHeaderVisualIndicators();this.addStyleClass("sapFDynamicPageHeaderPinned");};k.prototype._unPin=function(u){if(!this._bPinned){return;}this._bPinned=false;if(u){this.setProperty("headerPinned",false,true);this.fireEvent("pinnedStateChange",{pinned:false});}this._updateToggleHeaderVisualIndicators();this.removeStyleClass("sapFDynamicPageHeaderPinned");};k.prototype._togglePinButtonVisibility=function(t){var o=this.getHeader();if(m(o)){o._setShowPinBtn(t);}};k.prototype._togglePinButtonPressedState=function(p){var o=this.getHeader();if(m(o)){o._togglePinButton(p);}};k.prototype._hidePinButtonIfNotApplicable=function(){if(this._preserveHeaderStateOnScroll()){this._togglePinButtonVisibility(false);}};k.prototype._isHeaderPinnable=function(){var H=this.getHeader();return H&&H.getPinnable()&&this.getHeaderExpanded()&&!this.getPreserveHeaderStateOnScroll();};k.prototype._restorePinButtonFocus=function(){this.getHeader()._focusPinButton();};k.prototype._getScrollPosition=function(){return m(this.$wrapper)?Math.ceil(this.$wrapper.scrollTop()):0;};k.prototype._setAriaRoleDescription=function(s){this._sAriaRoleDescription=s;return this;};k.prototype._getAriaRoleDescription=function(){return this._sAriaRoleDescription;};k.prototype._setScrollPosition=function(N,s){if(!m(this.$wrapper)){return;}if(this._getScrollPosition()===N){return;}if(s){this._bSuppressToggleHeaderOnce=true;}if(!this.getScrollDelegate()._$Container){this.getScrollDelegate()._$Container=this.$wrapper;}this.getScrollDelegate().scrollTo(0,N);};k.prototype._shouldSnapOnScroll=function(){return!this._preserveHeaderStateOnScroll()&&this._getScrollPosition()>=this._getSnappingHeight()&&this.getHeaderExpanded()&&!this._bPinned;};k.prototype._shouldExpandOnScroll=function(){var I=this._needsVerticalScrollBar();return!this._preserveHeaderStateOnScroll()&&this._getScrollPosition()<this._getSnappingHeight()&&!this.getHeaderExpanded()&&!this._bPinned&&I;};k.prototype._shouldStickStickyContent=function(){var I,s,o;o=this._getScrollPosition();I=o<this._getSnappingHeight()&&!this._bPinned&&!this.getPreserveHeaderStateOnScroll();s=o===0||I&&this._hasVisibleHeader();return!s;};k.prototype._headerScrolledOut=function(){return this._getScrollPosition()>=this._getSnappingHeight();};k.prototype._headerSnapAllowed=function(){return!this._preserveHeaderStateOnScroll()&&this.getHeaderExpanded()&&!this._bPinned;};k.prototype._canSnapHeaderOnScroll=function(){return this._getMaxScrollPosition()>this._getSnappingHeight();};k.prototype._getSnappingHeight=function(){var t=this.getTitle(),$=t&&t.$expandWrapper,o=t&&t.$snappedWrapper,p=t&&t.$expandHeadingWrapper,q=t&&t.$snappedHeadingWrapper,E=$&&$.length?$.height():0,s=q&&q.length?q.height():0,r=p&&p.length?p.height():0,u=o&&o.length?o.height():0,v=Math.ceil(this._getHeaderHeight()||E+u+s+r)-k.HEADER_CONTENT_PADDING_BOTTOM;return v>0?v:0;};k.prototype._getMaxScrollPosition=function(){var $,o;if(m(this.$wrapper)){$=this.$wrapper[0];o=Math.max($.clientHeight,Math.ceil($.getBoundingClientRect().height));return $.scrollHeight-o;}return 0;};k.prototype._needsVerticalScrollBar=function(){return Math.floor(this._getMaxScrollPosition())>0;};k.prototype._getOwnHeight=function(){return this._getHeight(this);};k.prototype._getEntireHeaderHeight=function(){var t=0,H=0,o=this.getTitle(),p=this.getHeader();if(m(o)){t=o.$().outerHeight();}if(m(p)){H=p.$().outerHeight();}return t+H;};k.prototype._headerBiggerThanAllowedToPin=function(o){if(!(typeof o==="number"&&!isNaN(parseInt(o)))){o=this._getOwnHeight();}return this._getEntireHeaderHeight()>k.HEADER_MAX_ALLOWED_PINNED_PERCENTAGE*o;};k.prototype._headerBiggerThanAllowedToBeFixed=function(){var o=this._getOwnHeight();return this._getEntireHeaderHeight()>k.HEADER_MAX_ALLOWED_NON_SROLLABLE_PERCENTAGE*o;};k.prototype._headerBiggerThanAllowedToBeExpandedInTitleArea=function(){var E=this._getEntireHeaderHeight(),o=this._getOwnHeight();if(o===0){return false;}return D.system.phone?E>=k.HEADER_MAX_ALLOWED_NON_SROLLABLE_ON_MOBILE*o:E>=o;};k.prototype._updateTitlePositioning=function(){if(!m(this.$wrapper)||!m(this.$titleArea)||(this._getHeight(this)===0)){return;}var s=this._needsVerticalScrollBar(),w=this.$wrapper.get(0),t=this.$titleArea.get(0).getBoundingClientRect().height,T=this._getTitleAreaWidth();w.style.paddingTop=t+"px";w.style.clipPath='polygon(0px '+Math.floor(t)+'px, '+T+'px '+Math.floor(t)+'px, '+T+'px 0, 100% 0, 100% 100%, 0 100%)';this.toggleStyleClass("sapFDynamicPageWithScroll",s);setTimeout(this._updateFitContainer.bind(this),0);};k.prototype._updateFitContainer=function(N){var o=typeof N!=='undefined'?!N:!this._needsVerticalScrollBar(),F=this.getFitContent(),t=F||o;this.$contentFitContainer.toggleClass("sapFDynamicPageContentFitContainer",t);};k.prototype._updateHeaderARIAState=function(E){var o=this.getHeader();if(m(o)){o._updateARIAState(E);}};k.prototype._updateTitleARIAState=function(E){var o=this.getTitle();if(m(o)){o._updateARIAState(E);}};k.prototype._updateARIAStates=function(E){this._updateHeaderARIAState(E);this._updateTitleARIAState(E);};k.prototype._applyContextualSettings=function(o){var p=o.contextualWidth;this._updateMedia(p);return c.prototype._applyContextualSettings.call(this,o);};k.prototype._updateMedia=function(w){if(!w){return;}if(w<=k.BREAK_POINTS.PHONE){this._updateMediaStyle(k.MEDIA.PHONE);}else if(w<=k.BREAK_POINTS.TABLET){this._updateMediaStyle(k.MEDIA.TABLET);}else if(w<=k.BREAK_POINTS.DESKTOP){this._updateMediaStyle(k.MEDIA.DESKTOP);}else{this._updateMediaStyle(k.MEDIA.DESKTOP_XL);}};k.prototype._updateMediaStyle=function(s){Object.keys(k.MEDIA).forEach(function(o){var E=s===k.MEDIA[o];this.toggleStyleClass(k.MEDIA[o],E);},this);};k.prototype._toggleExpandVisualIndicator=function(t){var o=this.getTitle();if(m(o)){o._toggleExpandButton(t);}};k.prototype._focusExpandVisualIndicator=function(){var o=this.getTitle();if(m(o)){o._focusExpandButton();}};k.prototype._toggleCollapseVisualIndicator=function(t){var o=this.getHeader();if(m(o)){o._toggleCollapseButton(t);}};k.prototype._focusCollapseVisualIndicator=function(){var o=this.getHeader();if(m(o)){o._focusCollapseButton();}};k.prototype._updateToggleHeaderVisualIndicators=function(){var H,o,E,p=this._hasVisibleTitleAndHeader(),q=this.getHeader(),r=false;if(m(q)){r=!!q.getContent().length;}if(!this.getToggleHeaderOnTitleClick()||!p){o=false;E=false;}else{H=this.getHeaderExpanded();o=H;E=D.system.phone&&this.getTitle().getAggregation("snappedTitleOnMobile")?false:!H;}E=E&&r;o=o&&r;this._toggleCollapseVisualIndicator(o);this._toggleExpandVisualIndicator(E);this._updateTitleVisualState();};k.prototype._updateHeaderVisualState=function(H,p){var o=this.getHeader();if(H&&this.getPreserveHeaderStateOnScroll()){this._overridePreserveHeaderStateOnScroll();}if(!this._preserveHeaderStateOnScroll()&&o){if(this._headerBiggerThanAllowedToPin(p)||D.system.phone){this._unPin();this._togglePinButtonVisibility(false);this._togglePinButtonPressedState(false);}else{this._togglePinButtonVisibility(true);this._updatePinButtonState();}if(this.getHeaderExpanded()&&this._bHeaderInTitleArea&&this._headerBiggerThanAllowedToBeExpandedInTitleArea()){this._expandHeader(false);this._setScrollPosition(0);}}else if(this._preserveHeaderStateOnScroll()&&o){this._togglePinButtonVisibility(false);}};k.prototype._updateTitleVisualState=function(){var t=this.getTitle(),T=this._hasVisibleTitleAndHeader()&&this.getToggleHeaderOnTitleClick();this.$().toggleClass("sapFDynamicPageTitleClickEnabled",T&&!D.system.phone);if(m(t)){t._toggleFocusableState(T);}};k.prototype._scrollBellowCollapseVisualIndicator=function(){var H=this.getHeader(),$,o,v,O;if(m(H)){$=this.getHeader()._getCollapseButton().getDomRef();o=$.getBoundingClientRect().height;v=this.$wrapper[0].getBoundingClientRect().height;O=$.offsetTop+o-v+this._getTitleHeight();this._setScrollPosition(O);}};k.prototype._hasVisibleTitleAndHeader=function(){var t=this.getTitle();return m(t)&&t.getVisible()&&this._hasVisibleHeader();};k.prototype._hasVisibleHeader=function(){var H=this.getHeader();return m(H)&&H.getVisible()&&m(H.getContent());};k.prototype._getHeight=function(o){var $;if(!(o instanceof C)){return 0;}$=o.getDomRef();return $?$.getBoundingClientRect().height:0;};k.prototype._getWidth=function(o){return!(o instanceof C)?0:o.$().outerWidth()||0;};k.prototype._getTitleAreaHeight=function(){return m(this.$titleArea)?this.$titleArea.outerHeight()||0:0;};k.prototype._getTitleAreaWidth=function(){return m(this.$titleArea)?this.$titleArea.width()||0:0;};k.prototype._getTitleHeight=function(){return this._getHeight(this.getTitle());};k.prototype._getHeaderHeight=function(){return this._getHeight(this.getHeader());};k.prototype._preserveHeaderStateOnScroll=function(){return this.getPreserveHeaderStateOnScroll()&&!this._headerBiggerThanAllowedHeight;};k.prototype._cacheDomElements=function(){var F=this.getFooter();if(m(F)){this.$footer=F.$();this.$footerWrapper=this.$("footerWrapper");}this.$wrapper=this.$("contentWrapper");this.$headerInContentWrapper=this.$("headerWrapper");this.$contentFitContainer=this.$("contentFitContainer");this.$titleArea=this.$("header");this.$stickyPlaceholder=this.$("stickyPlaceholder");this._cacheTitleDom();this._cacheHeaderDom();};k.prototype._cacheTitleDom=function(){var t=this.getTitle();if(m(t)){this.$title=t.$();}};k.prototype._cacheHeaderDom=function(){var H=this.getHeader();if(m(H)){this.$header=H.$();}};k.prototype._adjustSnap=function(){var o,I,p,q,s,r,$=this.$();if(!m($)){return;}if(!n($[0])){return;}o=this.getHeader();I=!this.getHeaderExpanded();if(!o||!I){return;}p=!this._preserveHeaderStateOnScroll()&&this._canSnapHeaderOnScroll();q=I&&o.$().hasClass("sapFDynamicPageHeaderHidden");if(p&&q){this._toggleHeaderVisibility(true);this._moveHeaderToContentArea(true);return;}if(!p&&!q){this._moveHeaderToTitleArea(true);this._toggleHeaderVisibility(false);return;}if(p){s=this._getScrollPosition();r=this._getSnappingHeight();if(s<r){this._setScrollPosition(r);}}};k.prototype.ontouchmove=function(E){E.setMarked();};k.prototype._onChildControlAfterRendering=function(E){var s=E.srcControl;if(s instanceof d){this._cacheTitleDom();this._deRegisterResizeHandler(k.RESIZE_HANDLER_ID.TITLE);this._registerResizeHandler(k.RESIZE_HANDLER_ID.TITLE,this.$title[0],this._onChildControlsHeightChange.bind(this));}else if(s instanceof e&&s.getDomRef()!==this.$header.get(0)){this._cacheHeaderDom();this._deRegisterResizeHandler(k.RESIZE_HANDLER_ID.HEADER);this._registerResizeHandler(k.RESIZE_HANDLER_ID.HEADER,this.$header[0],this._onChildControlsHeightChange.bind(this));}setTimeout(this._updateTitlePositioning.bind(this),0);};k.prototype._onChildControlsHeightChange=function(E){var N=this._needsVerticalScrollBar(),H=this.getHeader(),o,O;if(N){this._updateFitContainer(N);}this._adjustSnap();if(!this._bExpandingWithAClick){this._updateTitlePositioning();}this._bExpandingWithAClick=false;if(H&&E.target.id===H.getId()){o=E.size.height;O=E.oldSize.height;this._updateHeaderVisualState(o!==O);this._adaptScrollPositionOnHeaderChange(o,O);}};k.prototype._onResize=function(E){var o=this.getTitle(),p=E.size.width,q=E.size.height,H=q!==E.oldSize.height;this._updateHeaderVisualState(H,q);if(m(o)){o._onResize(p);}this._adjustSnap();this._updateTitlePositioning();this._updateMedia(p);};k.prototype._toggleHeaderOnScroll=function(){this._adjustStickyContent();if(this._bSuppressToggleHeaderOnce){this._bSuppressToggleHeaderOnce=false;return;}if(D.system.desktop&&this._bExpandingWithAClick){return;}if(this._preserveHeaderStateOnScroll()){return;}if(this._shouldSnapOnScroll()){this._snapHeader(true,true);}else if(this._shouldExpandOnScroll()){this._expandHeader(false,true);this._toggleHeaderVisibility(true);}else if(!this._bPinned&&this._bHeaderInTitleArea){var o=(this._getScrollPosition()>=this._getSnappingHeight());this._moveHeaderToContentArea(o);this._updateTitlePositioning();}};k.prototype._adjustStickyContent=function(){if(!this._oStickySubheader){return;}var o,s=this._shouldStickStickyContent(),p,q=this.getStickySubheaderProvider();if(s===this._bStickySubheaderInTitleArea){return;}p=a.byId(q);if(!m(p)){return;}o=document.activeElement;p._setStickySubheaderSticked(s);if(s){this._oStickySubheader.$().appendTo(this.$stickyPlaceholder);}else{p._returnStickyContent();}o.focus();this._bStickySubheaderInTitleArea=s;};k.prototype._adaptScrollPositionOnHeaderChange=function(N,o){var H=N-o,p=this.getHeader();if(H&&(!this.getHeaderExpanded()&&(p.$().css("visibility")!=="hidden"))&&!this._bHeaderInTitleArea&&this._needsVerticalScrollBar()){this._setScrollPosition(this._getScrollPosition()+H);}};k.prototype._onTitlePress=function(){if(this.getToggleHeaderOnTitleClick()&&this._hasVisibleTitleAndHeader()){this._titleExpandCollapseWhenAllowed(true);this.getTitle()._focus();}};k.prototype._onExpandHeaderVisualIndicatorPress=function(){this._onTitlePress();if(this._headerBiggerThanAllowedToBeExpandedInTitleArea()){this._scrollBellowCollapseVisualIndicator();}this._focusCollapseVisualIndicator();};k.prototype._onCollapseHeaderVisualIndicatorPress=function(){this._onTitlePress();this._focusExpandVisualIndicator();};k.prototype._onVisualIndicatorMouseOver=function(){var $=this.$();if(m($)){$.addClass("sapFDynamicPageTitleForceHovered");}};k.prototype._onVisualIndicatorMouseOut=function(){var $=this.$();if(m($)){$.removeClass("sapFDynamicPageTitleForceHovered");}};k.prototype._onTitleMouseOver=k.prototype._onVisualIndicatorMouseOver;k.prototype._onTitleMouseOut=k.prototype._onVisualIndicatorMouseOut;k.prototype._titleExpandCollapseWhenAllowed=function(u){var o,s;if(this._bPinned&&!u){return this;}if(this._preserveHeaderStateOnScroll()||!this._canSnapHeaderOnScroll()||!this.getHeader()){if(!this.getHeaderExpanded()){this._expandHeader(false,u);this._toggleHeaderVisibility(true,u);}else{this._snapHeader(false,u);this._toggleHeaderVisibility(false,u);}}else if(!this.getHeaderExpanded()){o=!this._headerBiggerThanAllowedToBeExpandedInTitleArea();this._bExpandingWithAClick=true;this._expandHeader(o,u);this.getHeader().$().removeClass("sapFDynamicPageHeaderHidden");if(!o){this._setScrollPosition(0);}this._bExpandingWithAClick=false;}else{var p=this._bHeaderInTitleArea;this._snapHeader(p,u);if(!p){s=this._getSnappingHeight();this._setScrollPosition(s?(s+k.HEADER_CONTENT_PADDING_BOTTOM):0);}}};k.prototype._onPinUnpinButtonPress=function(){if(this._bPinned){this._unPin(true);}else{this._pin(true);this._restorePinButtonFocus();}};k.prototype._attachResizeHandlers=function(){var o=this._onChildControlsHeightChange.bind(this);this._registerResizeHandler(k.RESIZE_HANDLER_ID.PAGE,this,this._onResize.bind(this));if(m(this.$title)){this._registerResizeHandler(k.RESIZE_HANDLER_ID.TITLE,this.$title[0],o);}if(m(this.$header)){this._registerResizeHandler(k.RESIZE_HANDLER_ID.HEADER,this.$header[0],o);}if(m(this.$contentFitContainer)){this._registerResizeHandler(k.RESIZE_HANDLER_ID.CONTENT,this.$contentFitContainer[0],o);}};k.prototype._registerResizeHandler=function(H,o,p){if(!this[H]){this[H]=R.register(o,p);}};k.prototype._detachResizeHandlers=function(){this._deRegisterResizeHandler(k.RESIZE_HANDLER_ID.PAGE);this._deRegisterResizeHandler(k.RESIZE_HANDLER_ID.TITLE);this._deRegisterResizeHandler(k.RESIZE_HANDLER_ID.HEADER);this._deRegisterResizeHandler(k.RESIZE_HANDLER_ID.CONTENT);};k.prototype._deRegisterResizeHandler=function(H){if(this[H]){R.deregister(this[H]);this[H]=null;}};k.prototype._attachPageChildrenAfterRenderingDelegates=function(){var t=this.getTitle(),H=this.getHeader(),o=this.getContent(),p={onAfterRendering:this._onChildControlAfterRendering.bind(this)};if(m(t)){t.addEventDelegate(p);}if(m(o)){o.addEventDelegate(p);}if(m(H)){H.addEventDelegate(p);}};k.prototype._attachTitlePressHandler=function(){var t=this.getTitle();if(m(t)&&!this._bAlreadyAttachedTitlePressHandler){t.attachEvent(k.EVENTS.TITLE_PRESS,this._onTitlePress,this);this._bAlreadyAttachedTitlePressHandler=true;}};k.prototype._attachPinPressHandler=function(){var H=this.getHeader();if(m(H)&&!this._bAlreadyAttachedPinPressHandler){H.attachEvent(k.EVENTS.PIN_UNPIN_PRESS,this._onPinUnpinButtonPress,this);this._bAlreadyAttachedPinPressHandler=true;}};k.prototype._attachStickyHeaderObserver=function(){var H=this.getHeader();if(m(H)&&!this._bAlreadyAttachedStickyHeaderObserver){if(!this._oStickyHeaderObserver){this._oStickyHeaderObserver=new M(this._adjustStickyContent.bind(this));}this._oStickyHeaderObserver.observe(H,{properties:["visible"]});this._bAlreadyAttachedStickyHeaderObserver=true;}};k.prototype._attachHeaderObserver=function(){var H=this.getHeader();if(m(H)&&!this._bAlreadyAttachedHeaderObserver){if(!this._oHeaderObserver){this._oHeaderObserver=new M(this._onHeaderFieldChange.bind(this));}this._oHeaderObserver.observe(H,{aggregations:["content"],properties:["visible","pinnable"]});this._bAlreadyAttachedHeaderObserver=true;}};k.prototype._onHeaderFieldChange=function(E){if((E.type==="property")&&(E.name==="pinnable")){this._updatePinButtonState();return;}this._updateToggleHeaderVisualIndicators();};k.prototype._attachVisualIndicatorsPressHandlers=function(){var t=this.getTitle(),H=this.getHeader();if(m(t)&&!this._bAlreadyAttachedTitleIndicatorPressHandler){t.attachEvent(k.EVENTS.TITLE_VISUAL_INDICATOR_PRESS,this._onExpandHeaderVisualIndicatorPress,this);this._bAlreadyAttachedTitleIndicatorPressHandler=true;}if(m(H)&&!this._bAlreadyAttachedHeaderIndicatorPressHandler){H.attachEvent(k.EVENTS.HEADER_VISUAL_INDICATOR_PRESS,this._onCollapseHeaderVisualIndicatorPress,this);this._bAlreadyAttachedHeaderIndicatorPressHandler=true;}};k.prototype._addStickySubheaderAfterRenderingDelegate=function(){var s,o=this.getStickySubheaderProvider(),I;s=a.byId(o);if(m(s)&&!this._bAlreadyAddedStickySubheaderAfterRenderingDelegate){I=s.getMetadata().getInterfaces().indexOf("sap.f.IDynamicPageStickyContent")!==-1;if(I){this._oStickySubheader=s._getStickyContent();this._oStickySubheader.addEventDelegate(this._oSubHeaderAfterRenderingDelegate,this);this._bAlreadyAddedStickySubheaderAfterRenderingDelegate=true;this._attachStickyHeaderObserver();}}};k.prototype._attachVisualIndicatorMouseOverHandlers=function(){var H=this.getHeader();if(m(H)&&!this._bAlreadyAttachedVisualIndicatorMouseOverOutHandler){H.attachEvent(k.EVENTS.VISUAL_INDICATOR_MOUSE_OVER,this._onVisualIndicatorMouseOver,this);H.attachEvent(k.EVENTS.VISUAL_INDICATOR_MOUSE_OUT,this._onVisualIndicatorMouseOut,this);this._bAlreadyAttachedVisualIndicatorMouseOverOutHandler=true;}};k.prototype._attachTitleMouseOverHandlers=function(){var t=this.getTitle();if(m(t)&&!this._bAlreadyAttachedTitleMouseOverOutHandler){t.attachEvent(k.EVENTS.TITLE_MOUSE_OVER,this._onTitleMouseOver,this);t.attachEvent(k.EVENTS.TITLE_MOUSE_OUT,this._onTitleMouseOut,this);this._bAlreadyAttachedTitleMouseOverOutHandler=true;}};k.prototype._attachScrollHandler=function(){this._toggleHeaderOnScrollReference=this._toggleHeaderOnScroll.bind(this);this.$wrapper.on("scroll",this._toggleHeaderOnScrollReference);};k.prototype._toggleAdditionalNavigationClass=function(){var s=this._bStickySubheaderProviderExists();this.toggleStyleClass(k.NAVIGATION_CLASS_NAME,s);};k.prototype._bStickySubheaderProviderExists=function(){var s=a.byId(this.getStickySubheaderProvider());return!!s&&s.isA("sap.f.IDynamicPageStickyContent");};k.prototype._detachScrollHandler=function(){if(this.$wrapper){this.$wrapper.off("scroll",this._toggleHeaderOnScrollReference);}};k.prototype._formatLandmarkInfo=function(o,p){if(o){var r=o["get"+p+"Role"]()||"",s=o["get"+p+"Label"]()||"";if(r===A.None){r='';}return{role:r.toLowerCase(),label:s};}return{};};k.prototype._getHeaderTag=function(o){if(o&&o.getHeaderRole()!==A.None){return k.DIV;}return k.HEADER;};k.prototype._getFooterTag=function(o){if(o&&o.getFooterRole()!==A.None){return k.DIV;}return k.FOOTER;};return k;});
