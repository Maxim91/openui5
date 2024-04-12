/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/documentation/sdk/controller/BaseController","sap/ui/documentation/sdk/controller/util/SearchUtil","sap/ui/documentation/sdk/controller/util/Highlighter","sap/ui/model/json/JSONModel","sap/m/GroupHeaderListItem","sap/base/Log"],function(B,S,H,J,G,L){"use strict";return B.extend("sap.ui.documentation.sdk.controller.SearchPage",{onInit:function(){this.setModel(new J(),"searchView");this.getRouter().getRoute("search").attachPatternMatched(this._onTopicMatched,this);},onAfterRendering:function(){var c={useExternalStyles:false,shouldBeObserved:true,isCaseSensitive:false};if(!this.highlighter){this.highlighter=new H(this.getView().getDomRef(),c);}},onExit:function(){this.highlighter.destroy();},_onTopicMatched:function(a){var q=decodeURIComponent(a.getParameter("arguments").searchParam),o=a.getParameter("arguments")["?options"],c=o&&o.category,l=this.byId("allList"),s=this._findSectionForCategory(c),b=s?s.getId():null,O=this.getModel("searchView").getProperty("/lastProcessedQuery"),p='';try{this.hideMasterSide();}catch(e){L.error(e);}if(q===O){this.getView().byId("searchPage").setSelectedSection(b);return;}this.getModel("searchData").setProperty("/query",q);l.setBusy(true);S.search(q,{includeDeprecated:this.getModel("searchData").getProperty("/includeDeprecated")}).then(function(r){this.getModel("searchView").setProperty("/lastProcessedQuery",q);this.getModel("searchData").setProperty("/matches",r.matches);this.getView().byId("searchPage").setSelectedSection(b);l.setBusy(false);}.bind(this));if(this.highlighter){this.highlighter.highlight(q);}p=this.getModel("i18n").getResourceBundle().getText("SEARCH_PAGE_TITLE",[q]);this.appendPageTitle(p);},formatTableTitle:function(p,v,i){var V=i>0?"1 - "+v:"0";return this.formatMessage(p,V,i);},onDeprecatedFlagChange:function(e){var i=e.getParameter("selected"),q=this.getModel("searchData").getProperty("/query");S.search(q,{includeDeprecated:i}).then(function(r){this.getModel("searchData").setProperty("/matches",r.matches);}.bind(this));},_findSectionForCategory:function(c){var s=this.getView().byId("searchPage").getSections().filter(function(o){return(o.data("category")==c);});return s.length&&s[0];},_modifyLinks:function(){var v=this.getView(),i=[].concat(v.byId("allList").getItems(),v.byId("apiList").getItems(),v.byId("documentationList").getItems(),v.byId("samplesList").getItems()),l=i.length,I;while(l--){I=i[l];if(I._getLinkSender){I._getLinkSender().setHref(I.getCustomData()[0].getValue());}}},getGroupHeader:function(g){return new G({title:g.key,upperCase:false});},categoryAPIFormatter:function(c){return c==="API Reference";},categoryDocFormatter:function(c){return c==="Documentation";},categoryExploredFormatter:function(c){return c==="Samples";},onAllLoadMore:function(e){this.getModel("searchView").setProperty("/visibleAllLength",e.getParameter("actual"));this._modifyLinks();},onAPILoadMore:function(e){this.getModel("searchView").setProperty("/visibleAPILength",e.getParameter("actual"));this._modifyLinks();},onDocLoadMore:function(e){this.getModel("searchView").setProperty("/visibleDocLength",e.getParameter("actual"));this._modifyLinks();},onExploredLoadMore:function(e){this.getModel("searchView").setProperty("/visibleExploredLength",e.getParameter("actual"));this._modifyLinks();},onSwitchTab:function(e){var c=e.getParameter("section").data("category"),r={searchParam:this.getModel("searchView").getProperty("/lastProcessedQuery")};if(c){r["?options"]={category:c};}this.getRouter().navTo("search",r);}});});
