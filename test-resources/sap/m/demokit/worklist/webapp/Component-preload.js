//@ui5-bundle sap/ui/demo/worklist/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"sap/ui/demo/worklist/Component.js":function(){
sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","./model/models","./controller/ErrorHandler"],function(t,e,s,i){"use strict";return t.extend("sap.ui.demo.worklist.Component",{metadata:{manifest:"json"},init:function(){t.prototype.init.apply(this,arguments);this._oErrorHandler=new i(this);this.setModel(s.createDeviceModel(),"device");this.getRouter().initialize()},destroy:function(){this._oErrorHandler.destroy();t.prototype.destroy.apply(this,arguments)},getContentDensityClass:function(){if(this._sContentDensityClass===undefined){if(document.body.classList.contains("sapUiSizeCozy")||document.body.classList.contains("sapUiSizeCompact")){this._sContentDensityClass=""}else if(!e.support.touch){this._sContentDensityClass="sapUiSizeCompact"}else{this._sContentDensityClass="sapUiSizeCozy"}}return this._sContentDensityClass}})});
},
	"sap/ui/demo/worklist/controller/App.controller.js":function(){
sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel"],function(e,t){"use strict";return e.extend("sap.ui.demo.worklist.controller.App",{onInit:function(){var e,n,o=this.getView().getBusyIndicatorDelay();e=new t({busy:true,delay:0});this.setModel(e,"appView");n=function(){e.setProperty("/busy",false);e.setProperty("/delay",o)};this.getOwnerComponent().getModel().metadataLoaded().then(n);this.getOwnerComponent().getModel().attachMetadataFailed(n);this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass())}})});
},
	"sap/ui/demo/worklist/controller/BaseController.js":function(){
sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/UIComponent","sap/m/library"],function(e,t,r){"use strict";var o=r.URLHelper;return e.extend("sap.ui.demo.worklist.controller.BaseController",{getRouter:function(){return t.getRouterFor(this)},getModel:function(e){return this.getView().getModel(e)},setModel:function(e,t){return this.getView().setModel(e,t)},getResourceBundle:function(){return this.getOwnerComponent().getModel("i18n").getResourceBundle()},onShareEmailPress:function(){var e=this.getModel("objectView")||this.getModel("worklistView");o.triggerEmail(null,e.getProperty("/shareSendEmailSubject"),e.getProperty("/shareSendEmailMessage"))}})});
},
	"sap/ui/demo/worklist/controller/ErrorHandler.js":function(){
sap.ui.define(["sap/ui/base/Object","sap/m/MessageBox"],function(e,s){"use strict";return e.extend("sap.ui.demo.worklist.controller.ErrorHandler",{constructor:function(e){this._oResourceBundle=e.getModel("i18n").getResourceBundle();this._oComponent=e;this._oModel=e.getModel();this._bMessageOpen=false;this._sErrorText=this._oResourceBundle.getText("errorText");this._oModel.attachMetadataFailed(function(e){var s=e.getParameters();this._showServiceError(s.response)},this);this._oModel.attachRequestFailed(function(e){var s=e.getParameters();if(s.response.statusCode!=="404"||s.response.statusCode===404&&s.response.responseText.indexOf("Cannot POST")===0){this._showServiceError(s.response)}},this)},_showServiceError:function(e){if(this._bMessageOpen){return}this._bMessageOpen=true;s.error(this._sErrorText,{id:"serviceErrorMessageBox",details:e,styleClass:this._oComponent.getContentDensityClass(),actions:[s.Action.CLOSE],onClose:function(){this._bMessageOpen=false}.bind(this)})}})});
},
	"sap/ui/demo/worklist/controller/NotFound.controller.js":function(){
sap.ui.define(["./BaseController"],function(e){"use strict";return e.extend("sap.ui.demo.worklist.controller.NotFound",{onLinkPressed:function(){this.getRouter().navTo("worklist")}})});
},
	"sap/ui/demo/worklist/controller/Object.controller.js":function(){
sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel","sap/ui/core/routing/History","../model/formatter"],function(e,t,n,i){"use strict";return e.extend("sap.ui.demo.worklist.controller.Object",{formatter:i,onInit:function(){var e,n=new t({busy:true,delay:0});this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched,this);e=this.getView().getBusyIndicatorDelay();this.setModel(n,"objectView");this.getOwnerComponent().getModel().metadataLoaded().then(function(){n.setProperty("/delay",e)})},onNavBack:function(){var e=n.getInstance().getPreviousHash();if(e!==undefined){history.go(-1)}else{this.getRouter().navTo("worklist",{},true)}},_onObjectMatched:function(e){var t=e.getParameter("arguments").objectId;this.getModel().metadataLoaded().then(function(){var e=this.getModel().createKey("Objects",{ObjectID:t});this._bindView("/"+e)}.bind(this))},_bindView:function(e){var t=this.getModel("objectView"),n=this.getModel();this.getView().bindElement({path:e,events:{change:this._onBindingChange.bind(this),dataRequested:function(){n.metadataLoaded().then(function(){t.setProperty("/busy",true)})},dataReceived:function(){t.setProperty("/busy",false)}}})},_onBindingChange:function(){var e=this.getView(),t=this.getModel("objectView"),n=e.getElementBinding();if(!n.getBoundContext()){this.getRouter().getTargets().display("objectNotFound");return}var i=this.getResourceBundle(),o=e.getBindingContext().getObject(),a=o.ObjectID,s=o.Name;t.setProperty("/busy",false);t.setProperty("/shareSendEmailSubject",i.getText("shareSendEmailObjectSubject",[a]));t.setProperty("/shareSendEmailMessage",i.getText("shareSendEmailObjectMessage",[s,a,location.href]))}})});
},
	"sap/ui/demo/worklist/controller/Worklist.controller.js":function(){
sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel","../model/formatter","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(e,t,i,s,o){"use strict";return e.extend("sap.ui.demo.worklist.controller.Worklist",{formatter:i,onInit:function(){var e,i,s=this.byId("table");i=s.getBusyIndicatorDelay();this._aTableSearchState=[];e=new t({worklistTableTitle:this.getResourceBundle().getText("worklistTableTitle"),shareOnJamTitle:this.getResourceBundle().getText("worklistTitle"),shareSendEmailSubject:this.getResourceBundle().getText("shareSendEmailWorklistSubject"),shareSendEmailMessage:this.getResourceBundle().getText("shareSendEmailWorklistMessage",[location.href]),tableNoDataText:this.getResourceBundle().getText("tableNoDataText"),tableBusyDelay:0});this.setModel(e,"worklistView");s.attachEventOnce("updateFinished",function(){e.setProperty("/tableBusyDelay",i)})},onUpdateFinished:function(e){var t,i=e.getSource(),s=e.getParameter("total");if(s&&i.getBinding("items").isLengthFinal()){t=this.getResourceBundle().getText("worklistTableTitleCount",[s])}else{t=this.getResourceBundle().getText("worklistTableTitle")}this.getModel("worklistView").setProperty("/worklistTableTitle",t)},onPress:function(e){this._showObject(e.getSource())},onNavBack:function(){history.go(-1)},onSearch:function(e){if(e.getParameters().refreshButtonPressed){this.onRefresh()}else{var t=[];var i=e.getParameter("query");if(i&&i.length>0){t=[new s("Name",o.Contains,i)]}this._applySearch(t)}},onRefresh:function(){var e=this.byId("table");e.getBinding("items").refresh()},_showObject:function(e){this.getRouter().navTo("object",{objectId:e.getBindingContext().getProperty("ObjectID")})},_applySearch:function(e){var t=this.byId("table"),i=this.getModel("worklistView");t.getBinding("items").filter(e,"Application");if(e.length!==0){i.setProperty("/tableNoDataText",this.getResourceBundle().getText("worklistNoDataWithSearchText"))}}})});
},
	"sap/ui/demo/worklist/i18n/i18n.properties":'# This is the resource bundle for Worklist\n\n#XTIT: Application name\nappTitle=Worklist\n\n#YDES: Application description\nappDescription=A template for Worklist applications\n\n#~~~ Worklist View ~~~~~~~~~~~~~~~~~~~~~~~~~~\n#XTIT: Worklist view title\nworklistViewTitle=Manage <ObjectsPlural>\n\n#XTIT: Worklist page title\nworklistTitle=Worklist\n\n#XTIT: Table view title\nworklistTableTitle=<ObjectsPlural>\n\n#XTOL: Tooltip for the search field\nworklistSearchTooltip=Enter an <Objects> name or a part of it.\n\n#XBLI: text for a table with no data with filter or search\nworklistNoDataWithSearchText=No matching <ObjectsPlural> found\n\n#XTIT: Table view title with placeholder for the number of items\nworklistTableTitleCount=<Objects> ({0})\n\n#XTIT: The title of the column containing the Name of Objects\ntableNameColumnTitle=<Name>\n\n#XTIT: The title of the column containing the UnitNumber and the unit of measure\ntableUnitNumberColumnTitle=<UnitNumber>\n\n#XBLI: text for a table with no data\ntableNoDataText=No <ObjectsPlural> are currently available\n\n#XLNK: text for link in \'not found\' pages\nbackToWorklist=Show Worklist\n\n#~~~ Object View ~~~~~~~~~~~~~~~~~~~~~~~~~~\n#XTIT: Object view title\nobjectViewTitle=<Objects> Details\n\n#XTIT: Object page title\nobjectTitle=<Objects>\n\n\n#XTIT: Label for the Name\nNameLabel=Name\n\n#XTIT: Label for the UnitNumber\nUnitNumberLabel=UnitNumber\n\n\n#~~~ Share Menu Options ~~~~~~~~~~~~~~~~~~~~~~~\n\n#XTIT: Send E-Mail subject\nshareSendEmailWorklistSubject=<Email subject PLEASE REPLACE ACCORDING TO YOUR USE CASE>\n\n#YMSG: Send E-Mail message\nshareSendEmailWorklistMessage=<Email body PLEASE REPLACE ACCORDING TO YOUR USE CASE>\\r\\n{0}\n\n#XTIT: Send E-Mail subject\nshareSendEmailObjectSubject=<Email subject including object identifier PLEASE REPLACE ACCORDING TO YOUR USE CASE> {0}\n\n#YMSG: Send E-Mail message\nshareSendEmailObjectMessage=<Email body PLEASE REPLACE ACCORDING TO YOUR USE CASE> {0} (id: {1})\\r\\n{2}\n\n\n#~~~ Not Found View ~~~~~~~~~~~~~~~~~~~~~~~\n\n#XTIT: Not found view title\nnotFoundTitle=Not Found\n\n#YMSG: The Objects not found text is displayed when there is no Objects with this id\nnoObjectFoundText=This <Objects> is not available\n\n#YMSG: The Objects not available text is displayed when there is no data when starting the app\nnoObjectsAvailableText=No <ObjectsPlural> are currently available\n\n#YMSG: The not found text is displayed when there was an error loading the resource (404 error)\nnotFoundText=The requested resource was not found\n\n#~~~ Error Handling ~~~~~~~~~~~~~~~~~~~~~~~\n\n#YMSG: Error dialog description\nerrorText=Sorry, a technical error occurred! Please try again later.',
	"sap/ui/demo/worklist/localService/mockserver.js":function(){
sap.ui.define(["sap/ui/core/util/MockServer","sap/ui/model/json/JSONModel","sap/base/util/UriParameters","sap/base/Log"],function(e,t,r,a){"use strict";var o,i="sap/ui/demo/worklist/",n=i+"localService/mockdata";var s={init:function(s){var u=s||{};return new Promise(function(s,c){var p=sap.ui.require.toUrl(i+"manifest.json"),f=new t(p);f.attachRequestCompleted(function(){var t=r.fromQuery(window.location.search),c=sap.ui.require.toUrl(n),p=f.getProperty("/sap.app/dataSources/mainService"),l=sap.ui.require.toUrl(i+p.settings.localUri),d=/.*\/$/.test(p.uri)?p.uri:p.uri+"/";if(!o){o=new e({rootUri:d})}else{o.stop()}e.config({autoRespond:true,autoRespondAfter:u.delay||t.get("serverDelay")||200});o.simulate(l,{sMockdataBaseUrl:c,bGenerateMissingMockData:true});var m=o.getRequests();var v=function(e,t,r){r.response=function(r){r.respond(e,{"Content-Type":"text/plain;charset=utf-8"},t)}};if(u.metadataError||t.get("metadataError")){m.forEach(function(e){if(e.path.toString().indexOf("$metadata")>-1){v(500,"metadata Error",e)}})}var g=u.errorType||t.get("errorType"),h=g==="badRequest"?400:500;if(g){m.forEach(function(e){v(h,g,e)})}o.setRequests(m);o.start();a.info("Running the app with mock data");s()});f.attachRequestFailed(function(){var e="Failed to load application manifest";a.error(e);c(new Error(e))})})},getMockServer:function(){return o}};return s});
},
	"sap/ui/demo/worklist/manifest.json":'{"_version":"1.21.0","sap.app":{"id":"sap.ui.demo.worklist","type":"application","i18n":{"bundleUrl":"i18n/i18n.properties","supportedLocales":[""],"fallbackLocale":""},"title":"{{appTitle}}","description":"{{appDescription}}","applicationVersion":{"version":"1.0.0"},"resources":"resources.json","dataSources":{"mainService":{"uri":"/here/goes/your/serviceUrl/","type":"OData","settings":{"odataVersion":"2.0","localUri":"localService/metadata.xml"}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"sap-icon://task","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"rootView":{"viewName":"sap.ui.demo.worklist.view.App","type":"XML","async":true,"id":"app"},"dependencies":{"minUI5Version":"1.98.0","libs":{"sap.ui.core":{},"sap.m":{},"sap.f":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"sap.ui.demo.worklist.i18n.i18n","supportedLocales":[""],"fallbackLocale":""}},"":{"dataSource":"mainService","preload":true}},"routing":{"config":{"routerClass":"sap.m.routing.Router","type":"View","viewType":"XML","path":"sap.ui.demo.worklist.view","controlId":"app","controlAggregation":"pages","bypassed":{"target":["notFound"]},"async":true},"routes":[{"pattern":"","name":"worklist","target":["worklist"]},{"pattern":"Objects/{objectId}","name":"object","target":["object"]}],"targets":{"worklist":{"name":"Worklist","id":"worklist","level":1,"title":"{i18n>worklistViewTitle}"},"object":{"name":"Object","id":"object","level":2,"title":"{i18n>objectViewTitle}"},"objectNotFound":{"name":"ObjectNotFound","id":"objectNotFound"},"notFound":{"name":"NotFound","id":"notFound"}}}}}',
	"sap/ui/demo/worklist/model/formatter.js":function(){
sap.ui.define([],function(){"use strict";return{numberUnit:function(n){if(!n){return""}return parseFloat(n).toFixed(2)}}});
},
	"sap/ui/demo/worklist/model/models.js":function(){
sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"sap/ui/demo/worklist/view/App.view.xml":'<mvc:View\n\tcontrollerName="sap.ui.demo.worklist.controller.App"\n\tdisplayBlock="true"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"><Shell><App\n\t\t\tid="app"\n\t\t\tbusy="{appView>/busy}"\n\t\t\tbusyIndicatorDelay="{appView>/delay}"/></Shell></mvc:View>',
	"sap/ui/demo/worklist/view/NotFound.view.xml":'<mvc:View\n\tcontrollerName="sap.ui.demo.worklist.controller.NotFound"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"><MessagePage\n\t\ttitle="{i18n>notFoundTitle}"\n\t\ttext="{i18n>notFoundText}"\n\t\ticon="sap-icon://document"\n\t\tid="page"\n\t\tdescription=""><customDescription><Link id="link" text="{i18n>backToWorklist}" press=".onLinkPressed"/></customDescription></MessagePage></mvc:View>',
	"sap/ui/demo/worklist/view/Object.view.xml":'<mvc:View\n\tcontrollerName="sap.ui.demo.worklist.controller.Object"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"\n\txmlns:semantic="sap.f.semantic"><semantic:SemanticPage\n\t\tid="page"\n\t\theaderPinnable="false"\n\t\ttoggleHeaderOnTitleClick="false"\n\t\tbusy="{objectView>/busy}"\n\t\tbusyIndicatorDelay="{objectView>/delay}"><semantic:titleHeading><Title\n\t\t\t\ttext="{Name}"\n\t\t\t\tlevel="H2"/></semantic:titleHeading><semantic:headerContent><ObjectNumber\n\t\t\t\tnumber="{\n\t\t\t\t\tpath: \'UnitNumber\',\n\t\t\t\t\tformatter: \'.formatter.numberUnit\'\n\t\t\t\t}"\n\t\t\t\tunit="{UnitOfMeasure}"\n\t\t\t/></semantic:headerContent><semantic:sendEmailAction><semantic:SendEmailAction id="shareEmail" press=".onShareEmailPress"/></semantic:sendEmailAction></semantic:SemanticPage></mvc:View>',
	"sap/ui/demo/worklist/view/ObjectNotFound.view.xml":'<mvc:View\n\tcontrollerName="sap.ui.demo.worklist.controller.NotFound"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"><MessagePage\n\t\ttitle="{i18n>objectTitle}"\n\t\ttext="{i18n>noObjectFoundText}"\n\t\ticon="sap-icon://product"\n\t\tdescription=""\n\t\tid="page"><customDescription><Link id="link" text="{i18n>backToWorklist}" press=".onLinkPressed" /></customDescription></MessagePage></mvc:View>',
	"sap/ui/demo/worklist/view/Worklist.view.xml":'<mvc:View\n\tcontrollerName="sap.ui.demo.worklist.controller.Worklist"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"\n\txmlns:semantic="sap.f.semantic"><semantic:SemanticPage\n\t\tid="page"\n\t\theaderPinnable="false"\n\t\ttoggleHeaderOnTitleClick="false"><semantic:titleHeading><Title\n\t\t\t\ttext="{i18n>worklistTitle}"\n\t\t\t\tlevel="H2"/></semantic:titleHeading><semantic:content><Table\n\t\t\t\tid="table"\n\t\t\t\twidth="auto"\n\t\t\t\titems="{\n\t\t\t\t\tpath: \'/Objects\',\n\t\t\t\t\tsorter: {\n\t\t\t\t\t\tpath: \'Name\',\n\t\t\t\t\t\tdescending: false\n\t\t\t\t\t}\n\t\t\t\t}"\n\t\t\t\tnoDataText="{worklistView>/tableNoDataText}"\n\t\t\t\tbusyIndicatorDelay="{worklistView>/tableBusyDelay}"\n\t\t\t\tgrowing="true"\n\t\t\t\tgrowingScrollToLoad="true"\n\t\t\t\tupdateFinished=".onUpdateFinished"><headerToolbar><OverflowToolbar><Title\n\t\t\t\t\t\t\tid="tableHeader"\n\t\t\t\t\t\t\ttext="{worklistView>/worklistTableTitle}"\n\t\t\t\t\t\t\tlevel="H3"/><ToolbarSpacer /><SearchField\n\t\t\t\t\t\t\tid="searchField"\n\t\t\t\t\t\t\ttooltip="{i18n>worklistSearchTooltip}"\n\t\t\t\t\t\t\tsearch=".onSearch"><layoutData><OverflowToolbarLayoutData\n\t\t\t\t\t\t\t\t\tmaxWidth="200px"\n\t\t\t\t\t\t\t\t\tpriority="NeverOverflow"/></layoutData></SearchField></OverflowToolbar></headerToolbar><columns><Column id="nameColumn"><Text text="{i18n>tableNameColumnTitle}" id="nameColumnTitle"/></Column><Column id="unitNumberColumn" hAlign="End"><Text text="{i18n>tableUnitNumberColumnTitle}" id="unitNumberColumnTitle"/></Column></columns><items><ColumnListItem\n\t\t\t\t\t\ttype="Navigation"\n\t\t\t\t\t\tpress=".onPress"><cells><ObjectIdentifier\n\t\t\t\t\t\t\t\ttitle="{Name}"/><ObjectNumber\n\t\t\t\t\t\t\t\tnumber="{\n\t\t\t\t\t\t\t\t\tpath: \'UnitNumber\',\n\t\t\t\t\t\t\t\t\tformatter: \'.formatter.numberUnit\'\n\t\t\t\t\t\t\t\t}"\n\t\t\t\t\t\t\t\tunit="{UnitOfMeasure}"/></cells></ColumnListItem></items></Table></semantic:content><semantic:sendEmailAction><semantic:SendEmailAction id="shareEmail" press=".onShareEmailPress"/></semantic:sendEmailAction></semantic:SemanticPage></mvc:View>'
}});
//# sourceMappingURL=Component-preload.js.map