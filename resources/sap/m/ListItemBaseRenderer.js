/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Core","sap/ui/Device","sap/ui/core/InvisibleText","sap/ui/core/InvisibleRenderer"],function(l,C,D,I,a){"use strict";var L=l.ListType;var b=l.ListMode;var c={apiVersion:2};c.renderInvisible=function(r,o){a.render(r,o,o.TagName);};c.renderHighlight=function(r,o){var h=o.getHighlight();if(h=="None"){return;}r.openStart("div");r.class("sapMLIBHighlight");r.class("sapMLIBHighlight"+h);r.openEnd();r.close("div");};c.isModeMatched=function(m,o){var O=(sap.ui.require("sap/m/ListBaseRenderer")||{}).ModeOrder||{};return O[m]==o;};c.renderMode=function(r,o,O){var m=o.getMode();if(!this.isModeMatched(m,O)){return;}var M=o.getModeControl(true);if(M){this.renderModeContent(r,o,M);}};c.renderModeContent=function(r,o,m){this.decorateMode(m,o);r.renderControl(m);};c.decorateMode=function(m,o){m.removeStyleClass("sapMLIBSelectAnimation sapMLIBUnselectAnimation");if(!C.getConfiguration().getAnimation()||!o.getListProperty("modeAnimationOn")){return;}var M=o.getMode(),s=o.getListProperty("lastMode");if(!s||s==M){return;}if(M==b.None){m.addStyleClass("sapMLIBUnselectAnimation");}else{m.addStyleClass("sapMLIBSelectAnimation");}};c.renderCounter=function(r,o){var i=o.getCounter();if(i){this.renderCounterContent(r,o,i);}};c.renderCounterContent=function(r,o,i){r.openStart("div",o.getId()+"-counter");r.attr("aria-label",C.getLibraryResourceBundle("sap.m").getText("LIST_ITEM_COUNTER",i));r.class("sapMLIBCounter");r.openEnd();r.text(i);r.close("div");};c.renderType=function(r,o){var t=o.getTypeControl(true);if(t){r.renderControl(t);}};c.openItemTag=function(r,o){r.openStart(o.TagName,o);};c.closeItemTag=function(r,o){r.close(o.TagName);};c.renderTabIndex=function(r,o){r.attr("tabindex","-1");};c.renderTooltip=function(r,o){var t=o.getTooltip_AsString();if(t){r.attr("title",t);}};c.addFocusableClasses=function(r,o){if(D.system.desktop){r.class("sapMLIBFocusable");this.addLegacyOutlineClass(r,o);}};c.addLegacyOutlineClass=function(r,o){};c.getAriaAnnouncement=function(k,B){return I.getStaticId("sap.m",B||"LIST_ITEM_"+k.toUpperCase());};c.getAriaRole=function(o){return"option";};c.getAriaLabelledBy=function(o){if(!o.getContentAnnouncement&&o.getAriaLabelledBy().length){return o.getId();}};c.getAriaDescribedBy=function(o){if(o.getContentAnnouncement){return"";}var d=[],t=o.getType();if(o.getListProperty("showUnread")&&o.getUnread()){d.push(this.getAriaAnnouncement("unread"));}if(o.getMode()==b.Delete){d.push(this.getAriaAnnouncement("delete"));}if(t==L.Navigation){d.push(this.getAriaAnnouncement("navigation"));}else{if(t==L.Detail||t==L.DetailAndActive){d.push(this.getAriaAnnouncement("detail"));}if(t==L.Active||t==L.DetailAndActive){d.push(this.getAriaAnnouncement("active"));}}return d.join(" ");};c.getAccessibilityState=function(o){var A=this.getAriaLabelledBy(o),s=this.getAriaDescribedBy(o),m={role:this.getAriaRole(o)};if(o.isSelectable()){m.selected=o.getProperty("selected");}if(A){m.labelledby={value:A.trim(),append:true};}if(s){m.describedby={value:s.trim(),append:true};}if(o.getNavigated()){m.current=true;}return m;};c.renderLIContent=function(r,o){};c.renderLIAttributes=function(r,o){};c.renderContentFormer=function(r,o){this.renderHighlight(r,o);this.renderMode(r,o,-1);};c.renderContentLatter=function(r,o){this.renderCounter(r,o);this.renderType(r,o);this.renderMode(r,o,1);this.renderNavigated(r,o);};c.renderLIContentWrapper=function(r,o){r.openStart("div",o.getId()+"-content").class("sapMLIBContent").openEnd();this.renderLIContent(r,o);r.close("div");};c.renderNavigated=function(r,o){if(!o.getNavigated()){return;}r.openStart("div");r.class("sapMLIBNavigated");r.openEnd();r.close("div");};c.render=function(r,o){if(!o.getVisible()){this.renderInvisible(r,o);return false;}this.openItemTag(r,o);r.class("sapMLIB");r.class("sapMLIB-CTX");r.class("sapMLIBShowSeparator");r.class("sapMLIBType"+o.getType());if(D.system.desktop&&o.isActionable()){r.class("sapMLIBActionable");r.class("sapMLIBHoverable");}if(o.getSelected()){r.class("sapMLIBSelected");}if(o.getListProperty("showUnread")&&o.getUnread()){r.class("sapMLIBUnread");}this.addFocusableClasses(r,o);this.renderTooltip(r,o);this.renderTabIndex(r,o);if(C.getConfiguration().getAccessibility()){r.accessibilityState(o,this.getAccessibilityState(o));}this.renderLIAttributes(r,o);r.openEnd();this.renderContentFormer(r,o);this.renderLIContentWrapper(r,o);this.renderContentLatter(r,o);this.closeItemTag(r,o);};return c;},true);
