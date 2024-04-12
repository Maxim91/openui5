sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel","sap/ui/model/Filter","sap/ui/model/Sorter","sap/ui/model/FilterOperator","sap/m/GroupHeaderListItem","sap/ui/Device","sap/ui/core/Fragment","../model/formatter"],function(e,t,i,r,s,a,o,n,l){"use strict";return e.extend("sap.ui.demo.masterdetail.controller.Master",{formatter:l,onInit:function(){var e=this.byId("list"),t=this._createViewModel(),i=e.getBusyIndicatorDelay();this._oGroupFunctions={UnitNumber:function(e){var t=e.getProperty("UnitNumber"),i,r;if(t<=20){i="LE20";r=this.getResourceBundle().getText("masterGroup1Header1")}else{i="GT20";r=this.getResourceBundle().getText("masterGroup1Header2")}return{key:i,text:r}}.bind(this)};this._oList=e;this._oListFilterState={aFilter:[],aSearch:[]};this.setModel(t,"masterView");e.attachEventOnce("updateFinished",function(){t.setProperty("/delay",i)});this.getView().addEventDelegate({onBeforeFirstShow:function(){this.getOwnerComponent().oListSelector.setBoundMasterList(e)}.bind(this)});this.getRouter().getRoute("master").attachPatternMatched(this._onMasterMatched,this);this.getRouter().attachBypassed(this.onBypassed,this)},onUpdateFinished:function(e){this._updateListItemCount(e.getParameter("total"))},onSearch:function(e){if(e.getParameters().refreshButtonPressed){this.onRefresh();return}var t=e.getParameter("query");if(t){this._oListFilterState.aSearch=[new i("Name",s.Contains,t)]}else{this._oListFilterState.aSearch=[]}this._applyFilterSearch()},onRefresh:function(){this._oList.getBinding("items").refresh()},onOpenViewSettings:function(e){var t="filter";if(e.getSource().isA("sap.m.Button")){var i=e.getSource().getId();if(i.match("sort")){t="sort"}else if(i.match("group")){t="group"}}if(!this._pViewSettingsDialog){this._pViewSettingsDialog=n.load({id:this.getView().getId(),name:"sap.ui.demo.masterdetail.view.ViewSettingsDialog",controller:this}).then(function(e){this.getView().addDependent(e);e.addStyleClass(this.getOwnerComponent().getContentDensityClass());return e}.bind(this))}this._pViewSettingsDialog.then(function(e){e.open(t)})},onConfirmViewSettingsDialog:function(e){var t=e.getParameters().filterItems,r=[],a=[];t.forEach(function(e){switch(e.getKey()){case"Filter1":r.push(new i("UnitNumber",s.LE,100));break;case"Filter2":r.push(new i("UnitNumber",s.GT,100));break;default:break}a.push(e.getText())});this._oListFilterState.aFilter=r;this._updateFilterBar(a.join(", "));this._applyFilterSearch();this._applySortGroup(e)},_applySortGroup:function(e){var t=e.getParameters(),i,s,a=[];if(t.groupItem){i=t.groupItem.getKey();s=t.groupDescending;var o=this._oGroupFunctions[i];a.push(new r(i,s,o))}i=t.sortItem.getKey();s=t.sortDescending;a.push(new r(i,s));this._oList.getBinding("items").sort(a)},onSelectionChange:function(e){var t=e.getSource(),i=e.getParameter("selected");if(!(t.getMode()==="MultiSelect"&&!i)){this._showDetail(e.getParameter("listItem")||e.getSource())}},onBypassed:function(){this._oList.removeSelections(true)},createGroupHeader:function(e){return new a({title:e.text,upperCase:false})},onNavBack:function(){history.go(-1)},_createViewModel:function(){return new t({isFilterBarVisible:false,filterBarLabel:"",delay:0,title:this.getResourceBundle().getText("masterTitleCount",[0]),noDataText:this.getResourceBundle().getText("masterListNoDataText"),sortBy:"Name",groupBy:"None"})},_onMasterMatched:function(){this.getModel("appView").setProperty("/layout","OneColumn")},_showDetail:function(e){var t=!o.system.phone;this.getModel("appView").setProperty("/layout","TwoColumnsMidExpanded");this.getRouter().navTo("object",{objectId:e.getBindingContext().getProperty("ObjectID")},t)},_updateListItemCount:function(e){var t;if(this._oList.getBinding("items").isLengthFinal()){t=this.getResourceBundle().getText("masterTitleCount",[e]);this.getModel("masterView").setProperty("/title",t)}},_applyFilterSearch:function(){var e=this._oListFilterState.aSearch.concat(this._oListFilterState.aFilter),t=this.getModel("masterView");this._oList.getBinding("items").filter(e,"Application");if(e.length!==0){t.setProperty("/noDataText",this.getResourceBundle().getText("masterListNoDataWithFilterOrSearchText"))}else if(this._oListFilterState.aSearch.length>0){t.setProperty("/noDataText",this.getResourceBundle().getText("masterListNoDataText"))}},_updateFilterBar:function(e){var t=this.getModel("masterView");t.setProperty("/isFilterBarVisible",this._oListFilterState.aFilter.length>0);t.setProperty("/filterBarLabel",this.getResourceBundle().getText("masterFilterBarText",[e]))}})});