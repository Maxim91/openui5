/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","./PanelRenderer","sap/ui/layout/VerticalLayout","sap/base/Log","sap/ui/layout/HorizontalLayout","sap/m/HBox","sap/m/VBox","sap/m/ImageContent","sap/m/Link","sap/m/Label","sap/m/Text","sap/m/Button","sap/m/FlexItemData","sap/ui/model/json/JSONModel","sap/ui/model/BindingMode","sap/ui/base/ManagedObjectObserver","sap/ui/mdc/p13n/subcontroller/LinkPanelController","sap/ui/mdc/p13n/Engine","sap/ui/mdc/mixin/AdaptationMixin","sap/ui/mdc/link/PanelItem","sap/ui/core/CustomData"],function(C,P,V,L,H,a,b,I,c,d,T,B,F,J,e,M,f,E,A,g,h){"use strict";var i=C.extend("sap.ui.mdc.link.Panel",{metadata:{library:"sap.ui.mdc",designtime:"sap/ui/mdc/designtime/link/Panel.designtime",defaultAggregation:"items",properties:{enablePersonalization:{type:"boolean",defaultValue:true,invalidate:true},metadataHelperPath:{type:"string"},beforeNavigationCallback:{type:"function"}},aggregations:{items:{type:"sap.ui.mdc.link.PanelItem",multiple:true,singularName:"item"},additionalContent:{type:"sap.ui.core.Control",multiple:true},_content:{type:"sap.ui.layout.VerticalLayout",visibility:"hidden",multiple:false}},events:{beforeSelectionDialogOpen:{},afterSelectionDialogClose:{}}},renderer:P});i.prototype.init=function(){C.prototype.init.call(this);E.getInstance().registerAdaptation(this,{controller:{LinkItems:f}});A.call(i.prototype);E.getInstance().defaultProviderRegistry.attach(this,"Global");sap.ui.require([this.getMetadataHelperPath()||"sap/ui/mdc/Link"],function(j){this._oMetadataHelper=j;}.bind(this));var m=new J({countAdditionalContent:0,countItemsWithIcon:0,countItemsWithoutIcon:0,showResetEnabled:false,runtimeItems:[],contentTitle:""});m.setDefaultBindingMode(e.TwoWay);m.setSizeLimit(1000);this.setModel(m,"$sapuimdclinkPanel");this._oObserver=new M(_.bind(this));this._oObserver.observe(this,{properties:["enablePersonalization"],aggregations:["items","additionalContent"]});};var r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc");i.prototype.applySettings=function(){this._createContent();C.prototype.applySettings.apply(this,arguments);};i.prototype.exit=function(o){if(this._oObserver){this._oObserver.disconnect();this._oObserver=null;}if(this._oMetadataHelper){this._oMetadataHelper=null;}};i.prototype._createContent=function(){var v=new V({content:[this._createAdditionalContentArea(),this._createSeparator(),this._createLinkArea(),this._createFooterArea()]});this.setAggregation("_content",v);};i.prototype._createAdditionalContentArea=function(){var o=new b({fitContainer:false,items:this.getAdditionalContent()});return o;};i.prototype._createSeparator=function(){var s=new b({fitContainer:false,visible:{parts:[{path:"$sapuimdclinkPanel>/countAdditionalContent"},{path:"$sapuimdcLink>/metadata"}],formatter:function(j,m){return j>0&&m.length>0;}}});s.addStyleClass("mdcbaseinfoPanelSeparator");s.setModel(this._getInternalModel(),"$sapuimdclinkPanel");s.setModel(this.getModel("$sapuimdcLink"),"$sapuimdcLink");return s;};i.prototype._createLinkArea=function(){var l=new b({fitContainer:false,items:{path:"$sapuimdclinkPanel>/runtimeItems",templateShareable:false,factory:this._fnLinkItemFactory.bind(this)}});l.addStyleClass("mdcbaseinfoPanelSectionLinks");l.setModel(this._getInternalModel(),"$sapuimdclinkPanel");return l;};i.prototype._fnLinkItemFactory=function(s,o){var j=new I({src:"{$sapuimdclinkPanel>icon}",visible:{path:"$sapuimdclinkPanel>icon",formatter:function(n){return!!n;}}});var l=new c({text:"{$sapuimdclinkPanel>text}",href:"{$sapuimdclinkPanel>href}",target:"{$sapuimdclinkPanel>target}",visible:{path:"$sapuimdclinkPanel>href",formatter:function(n){return!!n;}},press:this.onPressLink.bind(this),wrapping:true,customData:new h({key:"internalHref",value:"{$sapuimdclinkPanel>internalHref}"})});var k=new d({text:"{$sapuimdclinkPanel>text}",visible:{path:"$sapuimdclinkPanel>href",formatter:function(n){return!n;}},wrapping:true});var t=new T({text:"{$sapuimdclinkPanel>description}",visible:{path:"$sapuimdclinkPanel>description",formatter:function(D){return!!D;}},wrapping:true});var v=new b({items:[l,k,t]});var m=new a({layoutData:new F({styleClass:o.getProperty("description")?"mdcbaseinfoPanelItemsGroup":"mdcbaseinfoPanelItemsWithoutGroup"}),items:[j,v]});var p=new H({visible:"{$sapuimdclinkPanel>visible}",content:[m]});p.addStyleClass("mdcbaseinfoPanelListItem");return p;};i.prototype._createFooterArea=function(){var R=new B(this.getId()+"--idSectionPersonalizationButton",{type:"Transparent",text:r.getText("info.POPOVER_DEFINE_LINKS"),press:this.onPressLinkPersonalization.bind(this)});var o=new a({visible:{path:"$sapuimdcLink>/metadata",formatter:function(m){return m.length>0;}},justifyContent:"End",items:[R]});o.addStyleClass("mdcbaseinfoPanelPersonalizationButton");return o;};i.prototype.onPressLink=function(o){var l=o.getSource();if(this.getBeforeNavigationCallback()&&l&&l.getTarget()!=="_blank"){var u=l&&l.getCustomData()&&l.getCustomData()[0].getValue();var s=u?l.getCustomData()[0].getValue():l.getHref();o.preventDefault();this.getBeforeNavigationCallback()(o).then(function(n){if(n){i.navigate(s);}});}};i.oNavigationPromise=undefined;i.navigate=function(s){if(s.indexOf("#")===0&&sap.ushell&&sap.ushell.Container&&sap.ushell.Container.getServiceAsync){if(!i.oNavigationPromise){i.oNavigationPromise=sap.ushell.Container.getServiceAsync("CrossApplicationNavigation").then(function(o){o.toExternal({target:{shellHash:s.substring(1)}});i.oNavigationPromise=undefined;});}}else{window.location.href=s;}};i.prototype.onPressLinkPersonalization=function(){sap.ui.require([this.getMetadataHelperPath()||"sap/ui/mdc/Link"],function(j){var m=this._getInternalModel();var k=j.retrieveBaseline(this);var l=k;var u=function(s){var S=s._oListControl.getItems().filter(function(o){return o.getSelected();});S=S.map(function(o){var q=s._getP13nModel().getProperty(o.getBindingContext(s.P13N_MODEL).sPath);return{id:q.name,description:q.description,href:q.href,internalHref:q.internalHref,target:q.target,text:q.text,visible:q.visible};});var n=i._showResetButtonEnabled(l,S);this._getInternalModel().setProperty("/showResetEnabled",n);};var p=this.getParent();if(p.isA("sap.m.Popover")){p.setModal(true);}E.getInstance().uimanager.show(this,"LinkItems").then(function(D){var R=D.getCustomHeader().getContentRight()[0];var s=D.getContent()[0];R.setModel(m,"$sapuimdclinkPanel");R.bindProperty("enabled",{path:'$sapuimdclinkPanel>/showResetEnabled'});u.call(this,s);s.attachChange(function(o){u.call(this,s);}.bind(this));D.attachAfterClose(function(){if(p.isA("sap.m.Popover")){p.setModal(false);}});}.bind(this));}.bind(this));};i._showResetButtonEnabled=function(m,s){var S=false;var j=i._getVisibleItems(s);var k=i._getVisibleItems(m);if(s.length!==m.length){S=true;}else if(k.length&&j.length){var l=i._allItemsIncludedInArray(k,j);var n=i._allItemsIncludedInArray(j,k);S=!l||!n;}return S;};i._allItemsIncludedInArray=function(m,j){var k=true;m.forEach(function(o){var l=i._getItemsById(o.id,j);if(l.length===0){k=false;}});return k;};i._getItemsById=function(s,m){return m.filter(function(o){return o.id===s;});};i._getItemById=function(s,j){return i._getItemsById(s,j)[0];};i._getVisibleItems=function(m){return m.filter(function(o){return o.id!==undefined&&o.visible;});};i.prototype._getInternalModel=function(){return this.getModel("$sapuimdclinkPanel");};i.prototype._propagateDefaultIcon=function(s){if(!s){return;}var m=this._getInternalModel();m.getProperty("/runtimeItems").forEach(function(o,j){if(o.icon){return;}m.setProperty("/runtimeItems/"+j+"/icon","sap-icon://chain-link");});};function _(o){var m=this._getInternalModel();if(o.object.isA("sap.ui.mdc.link.Panel")){switch(o.name){case"additionalContent":var j=o.child?[o.child]:o.children;j.forEach(function(n){switch(o.mutation){case"insert":this.getAggregation("_content").getContent()[0].addItem(n);break;case"remove":break;default:L.error("Mutation '"+o.mutation+"' is not supported yet.");}}.bind(this));m.setProperty("/countAdditionalContent",j.length);break;case"items":var k=o.child?[o.child]:o.children;k.forEach(function(p){var R=m.getProperty("/runtimeItems/");switch(o.mutation){case"insert":m.setProperty("/countItemsWithIcon",p.getIcon()?m.getProperty("/countItemsWithIcon")+1:m.getProperty("/countItemsWithIcon"));m.setProperty("/countItemsWithoutIcon",p.getIcon()?m.getProperty("/countItemsWithoutIcon"):m.getProperty("/countItemsWithoutIcon")+1);R.splice(this.indexOfItem(p),0,p.getJson());m.setProperty("/runtimeItems",R);this._propagateDefaultIcon(m.getProperty("/countItemsWithIcon")>0&&m.getProperty("/countItemsWithoutIcon")>0);this._oObserver.observe(p,{properties:["visible"]});break;case"remove":m.setProperty("/countItemsWithIcon",p.getIcon()?m.getProperty("/countItemsWithIcon")-1:m.getProperty("/countItemsWithIcon"));m.setProperty("/countItemsWithoutIcon",p.getIcon()?m.getProperty("/countItemsWithoutIcon"):m.getProperty("/countItemsWithoutIcon")-1);var n=R.find(function(q){return q.id===p.getId();});R.splice(R.indexOf(n),1);m.setProperty("/runtimeItems",R);this._propagateDefaultIcon(m.getProperty("/countItemsWithIcon")>0&&m.getProperty("/countItemsWithoutIcon")>0);this._oObserver.unobserve(p);p.destroy();this.invalidate();break;default:L.error("Mutation '"+o.mutation+"' is not supported yet.");}},this);break;case"enablePersonalization":this._getPersonalizationButton().setVisible(o.current);break;default:L.error("The property or aggregation '"+o.name+"' has not been registered.");}}else if(o.object.isA("sap.ui.mdc.link.PanelItem")){switch(o.name){case"visible":var p=o.object;var l=this.indexOfItem(p);if(p.getVisibleChangedByUser()){m.setProperty("/runtimeItems/"+l+"/visible",p.getVisible());}else{m.setProperty("/baselineItems/"+l+"/visible",p.getVisible());m.setProperty("/runtimeItems/"+l+"/visible",p.getVisible());}break;default:L.error("The '"+o.name+"' of PanelItem is not supported yet.");}}this._updateContentTitle();}i.prototype.getContentTitle=function(){var m=this._getInternalModel();return m.getProperty("/contentTitle");};i.prototype.getCurrentState=function(){var j=[],s;this.getItems().forEach(function(o,k){s=o&&o.getId();if(o.getVisible()){j.push({name:s});}});return{items:j};};i.prototype.initPropertyHelper=function(){var j=this._oMetadataHelper.retrieveAllMetadata(this);return Promise.resolve({getProperties:function(){var k=[];j.forEach(function(o){k.push({name:o.id,getName:function(){return o.id;},getLabel:function(){return o.text;},text:o.text,href:o.href,internalHref:o.internalHref,description:o.description,target:o.target,visible:o.visible});});return k;}});};i.prototype._updateContentTitle=function(){var m=this._getInternalModel();var j=this.getAdditionalContent();var o=this._getPersonalizationButton().getId();if(j.length>0){o=j[0];}else{var k=this.getItems();if(k.length>0){o=k[0];}}m.setProperty("/contentTitle",o);};i.prototype._getPersonalizationButton=function(){return this.getAggregation("_content").getContent()[3].getItems()[0];};return i;});