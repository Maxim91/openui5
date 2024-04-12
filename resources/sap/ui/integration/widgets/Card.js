/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./CardRenderer","../cards/Footer","../controls/ActionsToolbar","sap/ui/base/Interface","sap/ui/thirdparty/jquery","sap/ui/core/Core","sap/ui/integration/util/Manifest","sap/ui/integration/util/ServiceManager","sap/base/Log","sap/base/util/merge","sap/base/util/deepEqual","sap/base/util/each","sap/ui/integration/util/DataProviderFactory","sap/ui/model/json/JSONModel","sap/ui/integration/model/ObservableModel","sap/ui/model/resource/ResourceModel","sap/ui/integration/model/ContextModel","sap/base/util/LoaderExtensions","sap/f/CardBase","sap/f/library","sap/ui/integration/library","sap/ui/integration/util/Destinations","sap/ui/integration/util/LoadingProvider","sap/ui/integration/util/HeaderFactory","sap/ui/integration/util/ContentFactory","sap/ui/integration/util/BindingResolver","sap/ui/integration/formatters/IconFormatter","sap/ui/integration/cards/filters/FilterBarFactory","sap/ui/integration/cards/actions/CardActions","sap/ui/integration/util/CardObserver","sap/m/IllustratedMessage","sap/m/IllustratedMessageType","sap/m/IllustratedMessageSize","sap/ui/integration/util/Utils","sap/m/HBox","sap/m/library"],function(C,F,A,I,q,a,b,S,L,m,d,c,D,J,O,R,f,g,h,l,i,j,k,H,n,B,o,p,r,s,t,u,v,U,w,x){"use strict";var M={TYPE:"/sap.card/type",DATA:"/sap.card/data",HEADER:"/sap.card/header",HEADER_POSITION:"/sap.card/headerPosition",CONTENT:"/sap.card/content",FOOTER:"/sap.card/footer",SERVICES:"/sap.ui5/services",APP_TYPE:"/sap.app/type",PARAMS:"/sap.card/configuration/parameters",DESTINATIONS:"/sap.card/configuration/destinations",CSRF_TOKENS:"/sap.card/configuration/csrfTokens",FILTERS:"/sap.card/configuration/filters",ERROR_MESSAGES:"/sap.card/configuration/messages"};var y=["parameters","filters","paginator","form","context","i18n"];var z=["visibleItems","allItems"];var E=l.cards.HeaderPosition;var G=i.CardArea;var K=i.CardDataMode;var N="Card is destroyed!";var P=x.FlexRendertype;var Q=x.FlexJustifyContent;var T=x.FlexAlignItems;var V="module:";var W=h.extend("sap.ui.integration.widgets.Card",{metadata:{library:"sap.ui.integration",properties:{manifest:{type:"any",defaultValue:""},parameters:{type:"object",defaultValue:null},dataMode:{type:"sap.ui.integration.CardDataMode",group:"Behavior",defaultValue:K.Active},baseUrl:{type:"sap.ui.core.URI",defaultValue:null},manifestChanges:{type:"object[]"}},aggregations:{actionDefinitions:{type:"sap.ui.integration.ActionDefinition",multiple:true,forwarding:{getter:"_getActionsToolbar",aggregation:"actionDefinitions"}},_header:{type:"sap.f.cards.IHeader",multiple:false,visibility:"hidden"},_filterBar:{type:"sap.ui.integration.cards.filters.FilterBar",multiple:false,visibility:"hidden"},_content:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_footer:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_extension:{type:"sap.ui.integration.Extension",multiple:false,visibility:"hidden"},_loadingProvider:{type:"sap.ui.core.Element",multiple:false,visibility:"hidden"}},events:{action:{allowPreventDefault:true,parameters:{actionSource:{type:"sap.ui.core.Control"},manifestParameters:{type:"object"},parameters:{type:"object"},type:{type:"sap.ui.integration.CardActionType"}}},configurationChange:{parameters:{changes:{type:"object"}}},manifestReady:{},manifestApplied:{}},associations:{host:{},openerReference:{visibility:"hidden"}}},renderer:C});W.prototype.init=function(){h.prototype.init.call(this);this.setAggregation("_loadingProvider",new k());this._initModels();this._oContentFactory=new n(this);this._oCardObserver=new s(this);this._bFirstRendering=true;this._aFundamentalErrors=[];if(this.getProperty("dataMode")===K.Auto){this._oCardObserver.createObserver(this);}this._oLimitedInterface=new I(this,["getDomRef","setVisible","getParameters","getCombinedParameters","getManifestEntry","resolveDestination","request","refresh","refreshData","showMessage","getBaseUrl","getRuntimeUrl","getTranslatedText","getModel","triggerAction","addActionDefinition","removeActionDefinition","insertActionDefinition","getActionDefinition","indexOfActionDefinition","destroyActionDefinition","showLoadingPlaceholders","hideLoadingPlaceholders","showCard","hide","getOpener"]);};W.prototype._initModels=function(){this.setModel(new J());this.setModel(new J(),"parameters");this.setModel(new J(),"filters");this.setModel(new J(),"paginator");this.setModel(new J(),"form");this.setModel(new f(),"context");};W.prototype.clone=function(){var e=h.prototype.clone.apply(this,arguments);e._initModels();return e;};W.prototype._initReadyState=function(){this._aReadyPromises=[];this._awaitEvent("_headerReady");this._awaitEvent("_filterBarReady");this._awaitEvent("_contentReady");this._awaitEvent("_cardReady");Promise.all(this._aReadyPromises).then(function(){this._bReady=true;this.fireEvent("_ready");}.bind(this));};W.prototype._clearReadyState=function(){this._bReady=false;this._aReadyPromises=[];};W.prototype.onBeforeRendering=function(){if(this.getDataMode()!==K.Active){return;}this.startManifestProcessing();};W.prototype.onAfterRendering=function(){var e=this.getDomRef();if(this.getDataMode()===K.Auto&&this._bFirstRendering){this._oCardObserver.oObserver.observe(e);}this._bFirstRendering=false;};W.prototype.startManifestProcessing=function(){if(!U.isBindingSyntaxComplex()){this._logFundamentalError("Cannot parse manifest. Complex binding syntax is not enabled - "+"To enable it, set the 'compatVersion' configuration option to 'edge', e.g.: data-sap-ui-compatVersion='edge' - "+"sap.ui.integration.widgets.Card");}if(this._bApplyManifest||this._bApplyParameters){this._clearReadyState();this._initReadyState();}var e=this.getManifest();if(e&&this._bApplyManifest){this._cleanupOldManifest();this.createManifest(e,this.getBaseUrl());}if(!this._bApplyManifest&&this._bApplyParameters){this._oCardManifest.processParameters(this._getContextAndRuntimeParams());this._applyManifestSettings();}this._bApplyManifest=false;this._bApplyParameters=false;this._refreshActionsMenu();};W.prototype.setManifest=function(e){if(!d(this.getProperty("manifest"),e)){this.destroyActionDefinitions();}if(!e){this._destroyManifest();}this._bApplyManifest=true;this.setProperty("manifest",e);return this;};W.prototype.setManifestChanges=function(e){this.setProperty("manifestChanges",e);this._bApplyManifest=true;return this;};W.prototype.setParameters=function(e){this.setProperty("parameters",e);this._bApplyParameters=true;return this;};W.prototype.setParameter=function(e,X){var Y=this.getParameters()||{};Y[e]=X;this.setParameters(Y);return this;};W.prototype.setHost=function(e){this.setAssociation("host",e);var X=this.getHostInstance();if(e&&!X){L.error("Host with id '"+e+"' is not available during card initialization. It must be available for host specific features to work.","Make sure that the host already exists, before assigning it to the card.","sap.ui.integration.widgets.Card");return this;}this.getModel("context").setHost(X);if(this._oDestinations){this._oDestinations.setHost(X);}if(this._oDataProviderFactory){this._oDataProviderFactory.setHost(X);}if(X&&X.bUseExperimentalCaching){this.addStyleClass("sapFCardExperimentalCaching");}else{this.removeStyleClass("sapFCardExperimentalCaching");}return this;};W.prototype.createManifest=function(X,Y){var Z={};this._isManifestReady=false;if(typeof X==="string"){Z.manifestUrl=X;X=null;}if(this._oCardManifest){this._oCardManifest.destroy();}this._oCardManifest=new b("sap.card",X,Y,this.getManifestChanges());this._oCardManifest.load(Z).then(function(){if(this.bIsDestroyed){throw new Error(N);}this._registerManifestModulePath();this._isManifestReady=true;this.fireManifestReady();return this._loadExtension();}.bind(this)).then(this._applyManifest.bind(this)).catch(function(e){if(e.message!==N){this._applyManifest();return;}this._logFundamentalError(e.message);}.bind(this));};W.prototype._loadExtension=function(){var e=this._oCardManifest.get("/sap.card/extension"),X;if(!e){return null;}if(e.startsWith(V)){X=e.replace(V,"");}else{X=this._oCardManifest.get("/sap.app/id").replace(/\./g,"/")+"/"+e;}return new Promise(function(Y,Z){sap.ui.require([X],function($){var _=new $();_._setCard(this,this._oLimitedInterface);this.setAggregation("_extension",_);Y();}.bind(this),function($){this._logFundamentalError("Failed to load "+X+". Check if the path is correct. Reason: "+$);Z($);}.bind(this));}.bind(this));};W.prototype._logFundamentalError=function(e){L.error(e);this._aFundamentalErrors.push(e);};W.prototype.getFundamentalErrors=function(){return this._aFundamentalErrors;};W.prototype._applyManifest=function(){var e=this._oCardManifest;if(!e.get("/sap.card")){this._logFundamentalError("There must be a 'sap.card' section in the manifest.");}if(e&&e.getResourceBundle()){this._enhanceI18nModel(e.getResourceBundle());}this.getModel("context").resetHostProperties();if(this._hasContextParams()){this._resolveContextParams().then(function(X){this._oContextParameters=X;this._applyManifestWithParams();}.bind(this));return;}this._applyManifestWithParams();};W.prototype._applyManifestWithParams=function(){var e=this._oCardManifest,X=this._getContextAndRuntimeParams();e.processParameters(X);this._prepareToApplyManifestSettings();this._applyManifestSettings();};W.prototype._loadDefaultTranslations=function(){if(this._defaultTranslationsLoaded){return;}var e=a.getLibraryResourceBundle("sap.ui.integration");this._enhanceI18nModel(e);this._defaultTranslationsLoaded=true;this._oIntegrationRb=e;};W.prototype._enhanceI18nModel=function(e){var X=this.getModel("i18n");if(X){if(X.getResourceBundle().oUrlInfo.url!==e.oUrlInfo.url){X.enhance(e);}return;}X=new R({bundle:e});this.setModel(X,"i18n");};W.prototype._hasContextParams=function(){var e=this._oCardManifest.get(M.PARAMS),X,Y;for(X in e){Y=e[X].value;if(typeof Y==="string"&&Y.indexOf("{context>")!==-1){return true;}}return false;};W.prototype._resolveContextParams=function(){var e=this.getModel("context"),X=this._oCardManifest.get(M.PARAMS),Y={},Z,$;for(Z in X){$=X[Z].value;if(typeof $==="string"&&$.indexOf("{context>")!==-1){Y[Z]=$;}}B.resolveValue(Y,this,"/");return e.waitForPendingProperties().then(function(){return B.resolveValue(Y,this,"/");}.bind(this));};W.prototype._getContextAndRuntimeParams=function(){var e=this._oContextParameters||{},X=this.getParameters()||{};return m(e,X);};W.prototype._awaitEvent=function(e){this._aReadyPromises.push(new Promise(function(X){this.attachEventOnce(e,function(){X();});}.bind(this)));};W.prototype.isReady=function(){return this._bReady;};W.prototype.refresh=function(){if(this.getDataMode()===K.Active){this._bApplyManifest=true;this.invalidate();}};W.prototype.refreshData=function(){if(!this.isReady()){return;}var e=this.getCardHeader(),X=this.getCardContent(),Y=this.getAggregation("_filterBar");if(this._oDataProvider){this._oDataProvider.triggerDataUpdate();}if(e){e.refreshData();}if(X&&X.isA("sap.ui.integration.cards.BaseContent")){X.refreshData();}else{this.destroyAggregation("_content");this._destroyTemporaryContent();this._applyContentManifestSettings();}if(Y){Y.refreshData();}};W.prototype._refreshActionsMenu=function(){var e=this.getCardHeader(),X=this.getHostInstance(),Y=this.getAggregation("_extension"),Z=[];if(!e){return;}if(X){Z=Z.concat(X.getActions()||[]);}if(Y){Z=Z.concat(Y.getActions()||[]);}if(d(Z,this._getActionsToolbar()._aActions)){return;}this._getActionsToolbar().initializeContent(this);};W.prototype.exit=function(){h.prototype.exit.call(this);this._destroyManifest();this._oCardObserver.destroy();this._oCardObserver=null;this._oContentFactory=null;this._bFirstRendering=null;if(this._oActionsToolbar){this._oActionsToolbar.destroy();this._oActionsToolbar=null;}};W.prototype._destroyManifest=function(){if(this._oCardManifest){this._oCardManifest.destroy();this._oCardManifest=null;}if(this._oServiceManager){this._oServiceManager.destroy();this._oServiceManager=null;}if(this._oDestinations){this._oDestinations.destroy();this._oDestinations=null;}if(this._oIconFormatter){this._oIconFormatter.destroy();this._oIconFormatter=null;}if(this._oActionsToolbar){this._oActionsToolbar.destroy();this._oActionsToolbar=null;}this.destroyAggregation("_header");this.destroyAggregation("_filterBar");this.destroyAggregation("_content");this.destroyAggregation("_footer");this._cleanupOldManifest();};W.prototype._cleanupOldManifest=function(){this._aReadyPromises=null;this.getModel("filters").setData({});this.getModel("parameters").setData({});this.getModel("paginator").setData({});this.setModel(null,"i18n");this._oContextParameters=null;this._deregisterCustomModels();this.destroyAggregation("_extension");this._destroyTemporaryContent();if(this._oDataProviderFactory){this._oDataProviderFactory.destroy();this._oDataProviderFactory=null;this._oDataProvider=null;}};W.prototype._registerManifestModulePath=function(){if(!this._oCardManifest){return;}this._sAppId=this._oCardManifest.get("/sap.app/id");if(this._sAppId){g.registerResourcePath(this._sAppId.replace(/\./g,"/"),this._oCardManifest.getUrl()||"/");}else{this._logFundamentalError("Card sap.app/id entry in the manifest is mandatory");}};W.prototype.getManifest=function(){var e=this.getProperty("manifest");if(e&&typeof e==="object"){return q.extend(true,{},e);}return e;};W.prototype.getParameters=function(){var e=this.getProperty("parameters");if(e&&typeof e==="object"){return q.extend(true,{},e);}return e;};W.prototype.getCombinedParameters=function(){if(!this._isManifestReady){L.error("The manifest is not ready. Consider using the 'manifestReady' event.","sap.ui.integration.widgets.Card");return null;}var e=this._oCardManifest.getProcessedParameters(this._getContextAndRuntimeParams()),X={},Y;for(Y in e){X[Y]=e[Y].value;}return X;};W.prototype.getManifestEntry=function(e){if(!this._isManifestReady){L.error("The manifest is not ready. Consider using the 'manifestReady' event.","sap.ui.integration.widgets.Card");return null;}return this._oCardManifest.get(e);};W.prototype.getManifestRawJson=function(){if(!this._oCardManifest||!this._oCardManifest){L.error("The manifest is not ready. Consider using the 'manifestReady' event.","sap.ui.integration.widgets.Card");return{};}return this._oCardManifest.getInitialJson();};W.prototype.getManifestWithMergedChanges=function(){if(!this._oCardManifest||!this._oCardManifest._oManifest){L.error("The manifest is not ready. Consider using the 'manifestReady' event.","sap.ui.integration.widgets.Card");return{};}return q.extend(true,{},this._oCardManifest._oManifest.getRawJson());};W.prototype.resolveDestination=function(e){return this._oDestinations.getUrl(e);};W.prototype.showMessage=function(e,X){if(this._createContentPromise){this._createContentPromise.then(function(Y){Y.showMessage(e,X);});}else{L.error("'showMessage' cannot be used before the card instance is ready. Consider using the event 'manifestApplied' event.","sap.ui.integration.widgets.Card");}};W.prototype.getTranslatedText=function(e,X,Y){var Z=this.getModel("i18n"),$;if(!Z){L.warning("There are no translations available. Either the i18n configuration is missing or the method is called too early.");return null;}$=Z.getResourceBundle();return $.getText(e,X,Y);};W.prototype.getDataProviderFactory=function(){if(!this._oDataProviderFactory){L.error("The DataProviderFactory instance is not ready yet. Consider using the event 'manifestApplied'.","sap.ui.integration.widgets.Card");return null;}return this._oDataProviderFactory;};W.prototype.getRuntimeUrl=function(e){var X=this._sAppId,Y,Z=e&&e.trim().replace(/^\//,"");if(X===null){L.error("The manifest is not ready so the URL can not be resolved. Consider using the 'manifestReady' event.","sap.ui.integration.widgets.Card");return null;}if(!X||e.startsWith("http://")||e.startsWith("https://")||e.startsWith("//")){return e;}Y=X.replace(/\./g,"/");return sap.ui.require.toUrl(Y)+"/"+Z;};W.prototype._prepareToApplyManifestSettings=function(){var e=this._oCardManifest.get(M.APP_TYPE),X=this.getAggregation("_extension");if(e&&e!=="card"){L.error("sap.app/type entry in manifest is not 'card'");}if(this._oDataProviderFactory){this._oDataProviderFactory.destroy();}this._oDestinations=new j(this.getHostInstance(),this._oCardManifest.get(M.DESTINATIONS));this._oIconFormatter=new o({destinations:this._oDestinations,card:this});this._oDataProviderFactory=new D({host:this.getHostInstance(),destinations:this._oDestinations,extension:X,csrfTokensConfig:this._oCardManifest.get(M.CSRF_TOKENS),card:this});this._registerCustomModels();if(X){X.onCardReady();}};W.prototype._applyManifestSettings=function(){this._setParametersModelData();this._applyServiceManifestSettings();this._applyFilterBarManifestSettings();this._applyDataManifestSettings();this._applyHeaderManifestSettings();this._applyContentManifestSettings();this._applyFooterManifestSettings();this.fireManifestApplied();};W.prototype._setParametersModelData=function(){var e={},X=this.getCombinedParameters(),Y;for(Y in X){if(z.indexOf(Y)>=0){L.warning("The parameter name '"+Y+"' is reserved for cards. Can not be used for creating custom parameter.");}else{e[Y]={value:X[Y]};}}this.getModel("parameters").setData(e);};W.prototype._applyDataManifestSettings=function(){var e=this._oCardManifest.get(M.DATA),X;if(!e){this.fireEvent("_cardReady");return;}this.bindObject(e.path||"/");if(this._oDataProvider){this._oDataProvider.destroy();}this._oDataProvider=this._oDataProviderFactory.create(e,this._oServiceManager);this.getAggregation("_loadingProvider").setDataProvider(this._oDataProvider);if(e.name){X=this.getModel(e.name);}else if(this._oDataProvider){X=new O();this.setModel(X);}if(!X){this.fireEvent("_cardReady");return;}X.attachEvent("change",function(){var Y=this.getAggregation("_content");if(Y&&!Y.isA("sap.ui.integration.cards.BaseContent")){this.destroyAggregation("_content");this._destroyTemporaryContent();this._applyContentManifestSettings();}if(this._createContentPromise){this._createContentPromise.then(function(Z){Z.onDataChanged();this.onDataRequestComplete();}.bind(this));}else{this.onDataRequestComplete();}}.bind(this));if(this._oDataProvider){this._oDataProvider.attachDataRequested(function(){this._showLoadingPlaceholders();}.bind(this));this._oDataProvider.attachDataChanged(function(Y){X.setData(Y.getParameter("data"));});this._oDataProvider.attachError(function(Y){this._handleError("Data service unavailable. "+Y.getParameter("message"));this.onDataRequestComplete();}.bind(this));this._oDataProvider.triggerDataUpdate();}else{this.fireEvent("_cardReady");}};W.prototype._applyServiceManifestSettings=function(){var e=this._oCardManifest.get(M.SERVICES);if(!e){return;}if(!this._oServiceManager){this._oServiceManager=new S(e,this);}};W.prototype.getCardHeader=function(){return this.getAggregation("_header");};W.prototype.getCardHeaderPosition=function(){if(!this._oCardManifest){return"Top";}return this._oCardManifest.get(M.HEADER_POSITION)||E.Top;};W.prototype.getCardContent=function(){return this.getAggregation("_content");};W.prototype._getActionsToolbar=function(){if(!this._oActionsToolbar){this._oActionsToolbar=new A();this._oActionsToolbar.setCard(this);}return this._oActionsToolbar;};W.prototype._applyHeaderManifestSettings=function(){var e=this.createHeader();this.destroyAggregation("_header");if(!e){this.fireEvent("_headerReady");return;}e.attachEvent("_error",function(X){this._handleError(X.getParameter("message"));}.bind(this));this.setAggregation("_header",e);if(e.isReady()){this.fireEvent("_headerReady");}else{e.attachEvent("_ready",function(){this.fireEvent("_headerReady");}.bind(this));}};W.prototype._applyFilterBarManifestSettings=function(){var e=this.createFilterBar();this.destroyAggregation("_filterBar");if(!e){this.fireEvent("_filterBarReady");return;}e.attachEventOnce("_filterBarDataReady",function(){this.fireEvent("_filterBarReady");}.bind(this));this.setAggregation("_filterBar",e);};W.prototype._applyFooterManifestSettings=function(){var e=this.createFooter();this.destroyAggregation("_footer");if(e){this.setAggregation("_footer",e);}};W.prototype.getHostInstance=function(){var e=this.getHost();if(!e){return null;}return a.byId(e);};W.prototype._applyContentManifestSettings=function(){var e=this._oCardManifest.get(M.TYPE),X=this.getContentManifest(),Y=e+" "+this._oRb.getText("ARIA_ROLEDESCRIPTION_CARD");this._ariaText.setText(Y);if(!X){this.fireEvent("_contentReady");return;}this._setTemporaryContent(e,X);if(this._bIsPreviewMode){this.fireEvent("_contentReady");return;}this._createContentPromise=this.createContent({cardType:e,contentManifest:X,serviceManager:this._oServiceManager,dataProviderFactory:this._oDataProviderFactory,iconFormatter:this._oIconFormatter,appId:this._sAppId}).then(function(Z){this._setCardContent(Z);return Z;}.bind(this));this._createContentPromise.catch(function(Z){if(Z){this._handleError(Z);}}.bind(this));};W.prototype.createHeader=function(){var e=this._oCardManifest.get(M.HEADER),X=new H(this);return X.create(e,this._getActionsToolbar());};W.prototype.createFilterBar=function(){var e=this._oCardManifest.get(M.FILTERS),X=new p(this);return X.create(e,this.getModel("filters"));};W.prototype.createFooter=function(){var e=this._oCardManifest.get(M.FOOTER);if(!e){return null;}return F.create(this,e);};W.prototype.getContentManifest=function(){var e=this._oCardManifest.get(M.TYPE),X=e&&e.toLowerCase()==="component",Y=this._oCardManifest.get(M.CONTENT),Z=!!Y;if(Z&&!e){this._logFundamentalError("Card type property is mandatory!");return null;}if(!Z&&!X){return null;}if(X){Y=m(Y,{componentManifest:this._oCardManifest.getJson()});}return Y;};W.prototype.createContent=function(e){e.cardManifest=this._oCardManifest;return this._oContentFactory.create(e);};W.prototype._setCardContent=function(e){if(this._bShowContentLoadingPlaceholders){e.showLoadingPlaceholders();this._bShowContentLoadingPlaceholders=false;}e.attachEvent("_error",function(Y){this._handleError(Y.getParameter("logMessage"));}.bind(this));var X=this.getAggregation("_content");if(X&&X!==this._oTemporaryContent){X.destroy();}this.setAggregation("_content",e);if(e.isReady()){this.fireEvent("_contentReady");}else{e.attachReady(function(){this.fireEvent("_contentReady");}.bind(this));}};W.prototype._setTemporaryContent=function(e,X){var Y=this._getTemporaryContent(e,X),Z=this.getAggregation("_content");if(Z&&Z!==Y){Z.destroy();}this.setAggregation("_content",Y);};W.prototype._preserveMinHeightInContent=function(e){e.addEventDelegate({onAfterRendering:function(){if(!this._oCardManifest){return;}var X=this._oCardManifest.get(M.TYPE),Y=this._oCardManifest.get(M.CONTENT),Z=this._oContentFactory.getClass(X),$;if(!Z){return;}$=Z.getMetadata().getRenderer().getMinHeight(Y,e,this);if(this.getHeight()==="auto"){e.$().css({"min-height":$});}}},this);};W.prototype._destroyPreviousContent=function(e){if(e&&!e.hasStyleClass("sapFCardErrorContent")){e.destroy();if(e===this._oTemporaryContent){this._oTemporaryContent=null;}}};W.prototype._destroyTemporaryContent=function(){if(this._oTemporaryContent){this._oTemporaryContent.destroy();this._oTemporaryContent=null;}};W.prototype._handleError=function(e,X){this._loadDefaultTranslations();if(!X){L.error(e,null,"sap.ui.integration.widgets.Card");}this.fireEvent("_error",{message:e});var Y=this._oCardManifest.get(M.ERROR_MESSAGES),Z=this._getIllustratedMessage(Y,X),$=this._oCardManifest.get(M.CONTENT),_=m({},this.getCardContent());if($){this._handleNoDataItems(_,Z,X);this._destroyPreviousContent(this.getCardContent());this._preserveMinHeightInContent(Z);this.setAggregation("_content",Z);this.fireEvent("_contentReady");}else{this.getCardHeader().setAggregation("_error",Z);}};W.prototype._getIllustratedMessage=function(e,X){var Y=u.UnableToLoad,Z=v.Spot,$,_;if(X&&!e){switch(this._oCardManifest.get(M.TYPE)){case"List":case"Timeline":Y=u.NoData;$=this._oIntegrationRb.getText("CARD_NO_ITEMS_ERROR_LISTS");break;case"Table":Y=u.NoEntries;$=this._oIntegrationRb.getText("CARD_NO_ITEMS_ERROR_LISTS");break;case"Analytical":Y=u.NoEntries;$=this._oIntegrationRb.getText("CARD_NO_ITEMS_ERROR_CHART");}}if(e&&e.noData&&X){var a1=e.noData;Y=u[a1.type];Z=v[a1.size];$=a1.title;_=a1.description;}var b1=new t({illustrationType:Y,illustrationSize:Z,title:$,description:_?_:" "});var c1=new w({renderType:P.Bare,justifyContent:Q.Center,alignItems:T.Center,width:"100%",items:[b1]}).addStyleClass("sapFCardErrorContent");return c1;};W.prototype._handleNoDataItems=function(e,X,Y){if(Y&&this._oCardManifest.get(M.TYPE)==="List"){X._oCardOriginalContent=e;}};W.prototype._getTemporaryContent=function(e,X){var Y=this.getAggregation("_loadingProvider");if(!this._oTemporaryContent&&Y){this._oTemporaryContent=Y.createContentPlaceholder(X,e,this);this._oTemporaryContent.addEventDelegate({onAfterRendering:function(){if(!this._oCardManifest){return;}var Z=this._oContentFactory.getClass(e).getMetadata().getRenderer().getMinHeight(X,this._oTemporaryContent,this);if(this.getHeight()==="auto"){this._oTemporaryContent.$().css({"min-height":Z});}}},this);}return this._oTemporaryContent;};W.prototype.setDataMode=function(e){if(this._oDataProviderFactory&&e===K.Inactive){this._oDataProviderFactory.destroy();this._oDataProviderFactory=null;}this.setProperty("dataMode",e,true);if(this.getProperty("dataMode")===K.Active){this.refresh();}if(this.getProperty("dataMode")===K.Auto){this._oCardObserver.createObserver(this);if(!this._bFirstRendering){this._oCardObserver.oObserver.observe(this.getDomRef());}}return this;};W.prototype.loadDesigntime=function(){if(this._oDesigntime){return Promise.resolve(this._oDesigntime);}if(!this._oCardManifest){return new Promise(function(X,Y){this.attachManifestReady(function(){this.loadDesigntime().then(X,Y);}.bind(this));}.bind(this));}var e=this._oCardManifest.get("/sap.app/id");if(!e){return Promise.reject("App id not maintained");}return new Promise(function(X,Y){var Z=this._oCardManifest.get("/sap.card/configuration/editor");if(Z===undefined){Z=this._oCardManifest.get("/sap.card/designtime");}var $=this._oCardManifest.get("/sap.app/id").replace(/\./g,"/")+"/"+Z;if($){sap.ui.require([$],function(_){_=new _();_._readyPromise(this._oLimitedInterface,this).then(function(){this._oDesigntime=_;X(_);}.bind(this));}.bind(this),function(){Y({error:$+" not found"});});}else{Y();}}.bind(this));};W.prototype.showLoadingPlaceholders=function(e){var X;switch(e){case G.Header:X=this.getCardHeader();if(X){X.showLoadingPlaceholders();}break;case G.Filters:X=this.getAggregation("_filterBar");if(X){X.showLoadingPlaceholders();}break;case G.Content:if(this._createContentPromise){this._createContentPromise.then(function(Y){Y.showLoadingPlaceholders();});}else{this._bShowContentLoadingPlaceholders=true;}break;default:this.showLoadingPlaceholders(G.Header);this.showLoadingPlaceholders(G.Filters);this.showLoadingPlaceholders(G.Content);this.getAggregation("_loadingProvider").setLoading(true);}return this;};W.prototype.hideLoadingPlaceholders=function(e){var X;switch(e){case G.Header:X=this.getCardHeader();if(X){X.hideLoadingPlaceholders();}break;case G.Filters:X=this.getAggregation("_filterBar");if(X){X.hideLoadingPlaceholders();}break;case G.Content:if(this._createContentPromise){this._createContentPromise.then(function(Y){Y.hideLoadingPlaceholders();});}else{this._bShowContentLoadingPlaceholders=false;}break;default:this.hideLoadingPlaceholders(G.Header);this.hideLoadingPlaceholders(G.Filters);this.hideLoadingPlaceholders(G.Content);this.getAggregation("_loadingProvider").setLoading(false);}return this;};W.prototype.isLoading=function(){var e=this.getAggregation("_loadingProvider");return e?e.getLoading():false;};W.prototype.getFocusDomRef=function(){var e=this.getCardHeader();if(e&&e.getFocusDomRef()){return e.getFocusDomRef();}return this.getDomRef();};W.prototype._showLoadingPlaceholders=function(){this.getAggregation("_loadingProvider").setLoading(true);};W.prototype.onDataRequestComplete=function(){var e=this.getCardContent(),X=this.getAggregation("_loadingProvider");this.fireEvent("_cardReady");this.hideLoadingPlaceholders(G.Header);this.hideLoadingPlaceholders(G.Filters);if(e&&e.isA("sap.ui.integration.cards.BaseContent")&&e.isReady()){this.hideLoadingPlaceholders(G.Content);}if(X){X.setLoading(false);}this._fireContentDataChange();};W.prototype.request=function(e){return this._oDataProviderFactory.create({request:e}).setAllowCustomDataType(true).getData();};W.prototype.triggerAction=function(e){r.fireAction({card:this,host:this.getHostInstance(),action:e,parameters:e.parameters,source:this});};W.prototype._setPreviewMode=function(e){this._bIsPreviewMode=e;if(e){this.addStyleClass("sapFCardPreview");}else{this.removeStyleClass("sapFCardPreview");}this._bApplyManifest=true;this.invalidate();};W.prototype.getBindingNamespaces=function(){var e={},X=this.getAggregation("_extension");if(X){e.extension={formatters:X.getFormatters()};}return e;};W.prototype._registerCustomModels=function(){var e=this._oCardManifest.findDataSections();if(!this._aCustomModels){this._aCustomModels=[];}this._deregisterCustomModels();e.forEach(function(X){var Y=X&&X.name;if(!Y){return;}if(y.indexOf(Y)>-1){L.error("The model name (data section name) '"+Y+"' is reserved for cards. Can not be used for creating a custom model.");return;}if(this._aCustomModels.indexOf(Y)>-1){L.error("The model name (data section name) '"+Y+"' is already used.");return;}this.setModel(new O(),Y);this._aCustomModels.push(Y);}.bind(this));};W.prototype._deregisterCustomModels=function(){if(!this._aCustomModels){return;}this._aCustomModels.forEach(function(e){this.getModel(e).destroy();this.setModel(null,e);}.bind(this));this._aCustomModels=[];};W.prototype._fireConfigurationChange=function(e){var X=this.getHostInstance();if(!this._bReady){return;}this.fireConfigurationChange({changes:e});if(X){X.fireCardConfigurationChange({card:this,changes:e});}};W.prototype._fireContentDataChange=function(){this.fireEvent("_contentDataChange");};W.prototype.isSkeleton=function(){return false;};W.prototype.getContentPageSize=function(e){var X=parseInt(B.resolveValue(e,this).maxItems)||0,Y=this.getAggregation("_footer"),Z;if(!Y){return X;}Z=Y.getAggregation("paginator");if(!Z){return X;}if(Z.getPageSize()){return Z.getPageSize();}return X;};W.prototype.hasPaginator=function(){var e=this._oCardManifest.get(M.FOOTER);return e&&e.paginator;};W.prototype.showCard=function(e){var X=this._createChildCard(e);e._cardId=X.getId();this.triggerAction({type:"ShowCard",parameters:e});return Promise.resolve(X);};W.prototype.hide=function(){this.triggerAction({type:"HideCard"});};W.prototype.getOpener=function(){var e=a.byId(this.getAssociation("openerReference"));if(!e){return null;}return e._oLimitedInterface;};W.prototype._createChildCard=function(e){var X=e.manifest,Y=e.baseUrl,Z=e.data,$=this._createCard({width:e.width,host:this.getHostInstance(),parameters:e.parameters});$.setAssociation("openerReference",this);if(Z){c(Z,function(_,a1){var b1=new J(a1);$.setModel(b1,_);});}if(typeof X==="string"){$.setManifest(this.getRuntimeUrl(X));if(Y){$.setBaseUrl(Y);}}else{$.setManifest(X);$.setBaseUrl(Y||this.getRuntimeUrl("/"));}return $;};W.prototype._createCard=function(e){return new W(e);};return W;});
