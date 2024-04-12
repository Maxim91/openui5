/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/mdc/valuehelp/base/Container','sap/ui/mdc/valuehelp/base/DialogTab','sap/ui/mdc/util/loadModules','sap/ui/Device','sap/m/VBox','sap/m/FlexItemData','sap/ui/model/resource/ResourceModel','sap/ui/mdc/util/Common','sap/ui/mdc/enum/SelectType','sap/base/strings/formatMessage'],function(C,D,l,a,V,F,R,b,S,f){"use strict";var M,c,B,d,I,e;var P,H,T,g,h;var j=C.extend("sap.ui.mdc.valuehelp.Dialog",{metadata:{library:"sap.ui.mdc",interfaces:["sap.ui.mdc.valuehelp.IDialogContainer"],properties:{_selectedContentKey:{type:"string",visibility:"hidden"},_quickSelectEnabled:{type:"boolean",visibility:"hidden",defaultValue:false},_selectableContents:{type:"object[]",visibility:"hidden",defaultValue:[]},groupConfig:{type:"object",defaultValue:{}}},defaultAggregation:"content"}});function _(){if(a.system.desktop){return"700px";}if(a.system.tablet){return a.orientation.landscape?"600px":"600px";}}function k(){if(a.system.desktop){return"1080px";}if(a.system.tablet){return a.orientation.landscape?"920px":"600px";}}function m(N){var i=this.getContent();return i.filter(function(q){return!!q.getVisible()&&q.getGroup&&q.getGroup()===N;}).length>1;}j.prototype._handleContentSelectionChange=function(N){this.fireRequestDelegateContent({container:this.getId(),contentId:N});this._getRetrieveDelegateContentPromise().then(function(){var s=this.getProperty("_selectedContentKey");var i=this.getContent();var q=s&&i&&i.find(function(r){return r.getId()===s;});if(q){if(q.setCollectiveSearchSelect){q.setCollectiveSearchSelect(undefined);}q.onHide();this._unbindContent(q);}this._renderSelectedContent(N);}.bind(this));};j.prototype._onTabBarSelect=function(E){var N=E&&E.getParameter("key");this._handleContentSelectionChange(N);};j.prototype.invalidate=function(O){if(O){var i=this.getContent();var q=i.indexOf(O);if(this._oIconTabBar&&q!==-1&&!this._bIsBeingDestroyed){var r=this._oIconTabBar.getItems();if(r[q]){r[q].invalidate(O);}}else{C.prototype.invalidate.apply(this,arguments);}}};j.prototype._getUIAreaForContent=function(){var i=this.getAggregation("_container");if(i){return i.getUIArea();}return C.prototype._getUIAreaForContent.apply(this,arguments);};j.prototype._handleConfirmed=function(E){this.fireConfirm({close:true});};j.prototype._handleClosed=function(E){var i=this.getSelectedContent();if(i){i.onHide();}this.getContent().forEach(function(i){i.onContainerClose();});this.setProperty("_selectedContentKey",this._sInitialContentKey);C.prototype._handleClosed.apply(this,arguments);};j.prototype._getContainer=function(){if(!this.getModel("$i18n")){this.setModel(new R({bundleName:"sap/ui/mdc/messagebundle",async:false}),"$i18n");}var i=this.getAggregation("_container");if(!i){return this._retrievePromise("dialog",function(){return l(["sap/m/Dialog","sap/m/Button","sap/ui/model/base/ManagedObjectModel","sap/m/library"]).then(function(q){M=q[0];B=q[1];d=q[2];c=q[3];var r=c.ButtonType;if(!this._oResourceBundle){this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc");}this.oButtonOK=new B(this.getId()+"-ok",{text:this._oResourceBundle.getText("valuehelp.OK"),enabled:"{$valueHelp>/_valid}",type:r.Emphasized,press:this._handleConfirmed.bind(this),visible:{parts:['$valueHelp>/_config/maxConditions','$help>/_quickSelectEnabled'],formatter:function(t,Q){return t!==1||!Q;}}});this.oButtonCancel=new B(this.getId()+"-cancel",{text:this._oResourceBundle.getText("valuehelp.CANCEL"),press:this._handleCanceled.bind(this)});this._oManagedObjectModel=new d(this);var i=new M(this.getId()+"-dialog",{contentHeight:_(),contentWidth:k(),horizontalScrolling:false,verticalScrolling:false,title:{parts:['$help>/title','$help>/_selectableContents'],formatter:function(t,u){if(u&&u.length==1){var w=u[0];var x=w.getFormattedShortTitle()?w.getFormattedShortTitle():w.getTitle();if(x){t=this._oResourceBundle.getText("valuehelp.DIALOGSHORTTITLECOLONTITLE",[x,t]);}}return t;}.bind(this)},stretch:a.system.phone,resizable:true,draggable:true,afterOpen:this._handleOpened.bind(this),afterClose:this._handleClosed.bind(this),buttons:[this.oButtonOK,this.oButtonCancel]});i.setModel(this._oManagedObjectModel,"$help");this.setAggregation("_container",i,true);i.isPopupAdaptationAllowed=function(){return false;};i.addStyleClass("sapMdcValueHelp");i.addStyleClass("sapMdcValueHelpTitle");i.addStyleClass("sapMdcValueHelpTitleShadow");var v=new V(this.getId()+"-Content",{fitContainer:true});v.addStyleClass("sapMdcValueHelpPanel");i.addContent(v);var s=[];s.push(this._getIconTabBar(i));if(n(this.getMaxConditions(),this.getContent())){s.push(this._getTokenizerPanel());}return Promise.all(s).then(function(t){t.forEach(function(u){v.addItem(u);});return i;});}.bind(this));}.bind(this));}return i;};j.prototype._handleSelect=function(E){C.prototype._handleSelect.apply(this,arguments);if(this.getProperty("_quickSelectEnabled")&&this._isSingleSelect()){this.fireConfirm({close:true});}};j.prototype._observeChanges=function(i){if(i.name==="content"){var q=this.getContent();this.setProperty("_quickSelectEnabled",q&&q.every(function(s){return s.isQuickSelectSupported();}));this._updateInitialContentKey();if(i.mutation==="insert"&&!this.getProperty("_selectedContentKey")){this.setProperty("_selectedContentKey",this._sInitialContentKey);}this.setProperty("_selectableContents",this._getSelectableContents());if(n(this.getMaxConditions(),this.getContent())){var r=this.getAggregation("_container");if(r&&r.getContent()[0].getItems().length===1){Promise.all([this._getTokenizerPanel()]).then(function(s){s.forEach(function(t){r.getContent()[0].addItem(t);});});}}}C.prototype._observeChanges.apply(this,arguments);};j.prototype._updateInitialContentKey=function(){var i=this.getContent().find(function(q){return!!q.getVisible();});this._sInitialContentKey=i&&i.getId();};j.prototype.getSelectedContent=function(){var s=this.getProperty("_selectedContentKey");return this.getContent().find(function(i){return i.getId()===s;});};j.prototype._getSelectableContents=function(){var s=this.getSelectedContent();var i=s&&s.getGroup&&s.getGroup();var q=s?i:"";var v=[q];return this.getContent().filter(function(r){if(!r.getVisible()){return false;}var G=r.getGroup&&r.getGroup();var t=G&&m.call(this,G);if(t&&(r!==s)){if(v.indexOf(G)>=0){return false;}else{v.push(G);}}return true;}.bind(this));};j.prototype._updateGroupSelectModel=function(){if(this._oGroupSelectModel){var s=this.getSelectedContent();var i=s&&s.getGroup&&s.getGroup();var r=i?this.getContent().filter(function(v){return!!v.getVisible()&&v.getGroup&&v.getGroup()===i;}):[];this._oGroupSelectModel.setData(r.reduce(function(v,w){v.entries.push({key:w.getId(),text:w.getFormattedTitle()});return v;},{entries:[]}));if(this._oGroupSelect){var q=this._oGroupSelect.getSelectedItemKey();var t=r.map(function(v){return v.getId();});var u=this.getProperty("_selectedContentKey");if(t.indexOf(q)==-1||(q!==u)){this._oGroupSelect.setSelectedItemKey(r[0].getId());}}}};j.prototype._retrieveGroupSelect=function(){return this._retrievePromise("collectiveSearchSelect",function(){return l(["sap/ui/mdc/filterbar/vh/CollectiveSearchSelect","sap/ui/core/Item","sap/ui/model/json/JSONModel"]).then(function(i){var q=i[0];var r=i[1];var J=i[2];if(!this._oGroupSelectModel){this._oGroupSelectModel=new J();}if(!this._oGroupSelect){var s=new r(this.getId()+"-collSearchItem",{key:"{$select>key}",text:"{$select>text}",enabled:true});this._oGroupSelect=new q(this.getId()+"--Select",{title:"{$i18n>COL_SEARCH_SEL_TITLE}",items:{path:"$select>/entries",template:s},select:function(E){this._handleContentSelectionChange(E.getParameter("key"));}.bind(this),selectedItemKey:this.getSelectedContent().getId()});this._oGroupSelect.setModel(this._oGroupSelectModel,"$select");}return this._oGroupSelect;}.bind(this));}.bind(this));};j.prototype._getIconTabBar=function(i){if(!this._oIconTabBar){return l(["sap/m/IconTabBar","sap/m/IconTabFilter"]).then(function(q){I=q[0];e=q[1];var r=c.IconTabHeaderMode;this._oIconTabBar=new I(this.getId()+"-ITB",{expandable:false,upperCase:false,stretchContentHeight:true,headerMode:r.Inline,select:this._onTabBarSelect.bind(this),layoutData:new F({growFactor:1}),selectedKey:"{path: '$help>/_selectedContentKey', mode: 'OneWay'}",visible:{parts:['$help>/_selectableContents'],formatter:function(t){if(t&&t.length==1){this.addStyleClass("sapMdcNoHeader");i.removeStyleClass("sapMdcValueHelpTitleShadow");}else{this.removeStyleClass("sapMdcNoHeader");i.addStyleClass("sapMdcValueHelpTitleShadow");}return true;}}});this._oIconTabBar.addStyleClass("sapUiNoContentPadding");var s=new e(this.getId()+"-ITF",{key:{path:"$help>id"},content:new D(this.getId()+"-DT",{content:{path:"$help>displayContent"}}),text:{parts:['$help>','$valueHelp>/conditions'],formatter:function(t,u){var v="none";if(t){var G=t.getGroup&&t.getGroup();var w=t.getCount(u,G);v=G?this._getFormattedContentGroupLabel(G,w):t.getFormattedTitle(w);}return v;}.bind(this)}});this._oIconTabBar.bindAggregation("items",{path:"/_selectableContents",model:"$help",templateShareable:false,template:s});return this._oIconTabBar;}.bind(this));}return this._oIconTabBar;};j.prototype._getFormattedContentGroupLabel=function(G,i){var q=this.getGroupConfig();var r=q&&q[G];var t=r&&(i?r.label:r.nnLabel);t=t&&f(t,i?i:"");t=t||this._oResourceBundle.getText(i?"valuehelp.SELECTFROMLIST":"valuehelp.SELECTFROMLISTNONUMBER",i);return t;};j.prototype._getTokenizerPanel=function(q){if(!this.oTokenizerPanel){return l(['sap/m/Panel','sap/m/HBox','sap/m/VBox','sap/m/Tokenizer','sap/m/Token','sap/ui/model/Filter','sap/ui/mdc/field/ConditionType']).then(function(s){P=s[0];H=s[1];V=s[2];T=s[3];g=s[4];h=s[5];var t=s[6];var u=c.BackgroundDesign;var v=c.ButtonType;this.oTokenizerPanel=new P(this.getId()+"-TokenPanel",{backgroundDesign:u.Transparent,expanded:true,visible:{parts:['$valueHelp>/_config/maxConditions','$help>/content'],formatter:n},headerText:{parts:['$valueHelp>/conditions','$help>/_selectableContents'],formatter:function(x,y){var z=0;for(var i=0;i<x.length;i++){var A=x[i];if(A.isEmpty!==true){z++;}}var E;if(y&&y.length==1){E=y[0].getFormattedTokenizerTitle(z);return E;}else{E=this._oResourceBundle.getText("valuehelp.TOKENIZERTITLE");if(z===0){E=this._oResourceBundle.getText("valuehelp.TOKENIZERTITLENONUMBER");}return f(E,z);}}.bind(this)}});this.oTokenizerPanel.addStyleClass("sapMdcTokenizerPanel");var w=new H(this.getId()+"-TokenBox",{fitContainer:true,width:"100%"});var r=o.call(this);this._oConditionType=new t(r);this._oConditionType._bVHTokenizer=true;this.oTokenizer=new T(this.getId()+"-Tokenizer",{width:"100%",tokenDelete:function(E){if(E.getParameter("tokens")){var x=E.getParameter("tokens");var y=this.getModel("$valueHelp").getObject("/conditions");var z=[];x.forEach(function(A,i){var G=A.getBindingContext("$valueHelp").sPath;var J=parseInt(G.slice(G.lastIndexOf("/")+1));z.push(y[J]);});this.fireSelect({type:S.Remove,conditions:z});}}.bind(this),layoutData:new F({growFactor:1,maxWidth:"calc(100% - 2rem)"})});this.oTokenizer.addAriaDescribedBy(this.oTokenizer.getTokensInfoId());this.oTokenizer.addStyleClass("sapMdcTokenizer");p.call(this,true);this.oRemoveAllBtn=new B(this.getId()+"-TokenRemoveAll",{press:function(E){this.fireSelect({type:S.Set,conditions:[]});}.bind(this),type:v.Transparent,icon:"sap-icon://decline",tooltip:"{$i18n>valuehelp.REMOVEALLTOKEN}",layoutData:new F({growFactor:0,baseSize:"2rem"})});this.oRemoveAllBtn.addStyleClass("sapUiTinyMarginBegin");w.addItem(this.oTokenizer);w.addItem(this.oRemoveAllBtn);this.oTokenizerPanel.addContent(w);return this.oTokenizerPanel;}.bind(this));}else{var r=o.call(this);this._oConditionType.setFormatOptions(r);}return this.oTokenizerPanel;};function n(i,q){var v=i!==1;if(v&&q&&q.every(function(r){return!r.getRequiresTokenizer();})){v=false;}return v;}function o(){var v=this.getModel("$valueHelp");var i=v?v.getProperty("/_config"):{};var q=this.getParent();var r=this._getControl();return{maxConditions:-1,valueType:i.dataType,operators:i.operators,display:i.display,fieldHelpID:q&&q.getId(),control:r,delegate:r&&r.getControlDelegate&&r.getControlDelegate(),delegateName:r&&r.getDelegate&&r.getDelegate()&&r.getDelegate().name,payload:r&&r.getPayload&&r.getPayload(),convertWhitespaces:true};}function p(i){if(this.oTokenizer){var q=this.oTokenizer.getBindingInfo("tokens");if(i){if(!q){var r=new h({path:'isEmpty',operator:'NE',value1:true});var t=new g(this.getId()+"-Token",{text:{path:'$valueHelp>',type:this._oConditionType}});this.oTokenizer.bindAggregation("tokens",{path:'/conditions',model:"$valueHelp",templateShareable:false,template:t,filters:r});}}else if(q){this.oTokenizer.unbindAggregation("tokens");}}}j.prototype._open=function(i){if(i){this._updateInitialContentKey();var r=function(){this._renderSelectedContent(this._sInitialContentKey,function(){i.open();this.getContent().forEach(function(q){q.onContainerOpen();});}.bind(this));}.bind(this);if(n(this.getMaxConditions(),this.getContent())&&i.getContent()[0].getItems().length===1){Promise.all([this._getTokenizerPanel()]).then(function(q){q.forEach(function(s){i.getContent()[0].addItem(s);});r();});}else{if(this.oTokenizer){p.call(this,true);}r();}}};j.prototype._renderSelectedContent=function(N,i){var q=this.getContent().find(function(t){return t.getId()===N;});if(!q){throw new Error("sap.ui.mdc.ValueHelp: No content found.");}var r=[q.getContent(),q.onBeforeShow()];var s=q.getGroup&&q.getGroup();var G;if(s&&m.call(this,s)){G=this._retrieveGroupSelect();r.push(G);}return Promise.all(r).then(function(t){this._bindContent(q);this.setProperty("_selectedContentKey",N);this.setProperty("_selectableContents",this._getSelectableContents());this._oManagedObjectModel.checkUpdate(true,false,function(u){if(u.getPath()==="displayContent"){return true;}});if(G){this._updateGroupSelectModel();}if(q.setCollectiveSearchSelect){q.setCollectiveSearchSelect(G?this._oGroupSelect:undefined);}if(i){i();}return this._retrievePromise("open").then(function(){q.onShow();return q;});}.bind(this));};j.prototype._close=function(){var i=this.getAggregation("_container");if(i){i.close();if(this.oTokenizer){p.call(this,false);}}};j.prototype.getValueHelpIcon=function(){return"sap-icon://value-help";};j.prototype.getAriaAttributes=function(i){return{contentId:null,ariaHasPopup:"dialog",role:null,roleDescription:null};};j.prototype.isMultiSelect=function(){return this.getMaxConditions()!==1;};j.prototype.exit=function(){b.cleanup(this,["_oManagedObjectModel","_oResourceBundle","oButtonOK","oButtonCancel","oTokenizerPanel","oTokenizer","_oIconTabBar","_oGroupSelect","_oGroupSelectModel","_sInitialContentKey"]);};return j;});
