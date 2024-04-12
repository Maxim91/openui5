sap.ui.define(["sap/ui/demo/iconexplorer/controller/Overview.controller","sap/ui/demo/iconexplorer/controller/BaseController","sap/ui/base/ManagedObject","sap/ui/model/json/JSONModel","sap/ui/demo/iconexplorer/test/unit/helper/FakeI18nModel","sap/ui/demo/iconexplorer/model/formatter","sap/m/Input"],function(t,e,o,r,n,i,s){"use strict";QUnit.module("Overview controller tests",{beforeEach:function(){this.oOverviewController=new t;this.oRouterStub={navTo:sinon.stub()};this.oViewStub=new o;this.oViewModelStub=new r({fontName:"SAP-icons"});this.oComponentStub=new o;this.oComponentStub.setModel(new n,"i18n");sinon.stub(this.oOverviewController,"getRouter").returns(this.oRouterStub);sinon.stub(this.oOverviewController,"getOwnerComponent").returns(this.oComponentStub);sinon.stub(this.oOverviewController,"getView").returns(this.oViewStub);this.oGetModelStub=sinon.stub(this.oOverviewController,"getModel");this.oGetModelStub.withArgs("view").returns(this.oViewModelStub);this.oOverviewController._oCurrentQueryContext={}},afterEach:function(){this.oOverviewController.destroy();this.oViewStub.destroy();this.oViewModelStub.destroy();this.oComponentStub.destroy();this.oGetModelStub.restore()}});QUnit.test("Should keep the context and set the new value when updating the hash",function(t){this.oOverviewController._oCurrentQueryContext.tab="test";this.oOverviewController._oCurrentQueryContext.icon="test";this.oOverviewController._oCurrentQueryContext.tag="test";this.oOverviewController._oCurrentQueryContext.cat="test";this.oOverviewController._oCurrentQueryContext.search="test";this.oOverviewController._updateHash("icon","new");sinon.assert.calledWith(this.oRouterStub.navTo,"overview",{fontName:"SAP-icons",query:{tab:"test",icon:"new",tag:"test",cat:"test",search:"test"}})});QUnit.test("Should write the parameter to the hash if key and value are passed",function(t){this.oOverviewController._updateHash("foo","bar");sinon.assert.calledWith(this.oRouterStub.navTo,"overview",{fontName:"SAP-icons",query:{foo:"bar"}})});QUnit.test("Should update the tab properly in the hash",function(t){this.oOverviewController._updateHash("tab","test");sinon.assert.calledWith(this.oRouterStub.navTo,"overview",{fontName:"SAP-icons",query:{tab:"test"}})});QUnit.test("Should update the icon properly in the hash",function(t){this.oOverviewController._updateHash("icon","test");sinon.assert.calledWith(this.oRouterStub.navTo,"overview",{fontName:"SAP-icons",query:{icon:"test"}})});QUnit.test("Should update the tag properly in the hash",function(t){this.oOverviewController._updateHash("tag","test");sinon.assert.calledWith(this.oRouterStub.navTo,"overview",{fontName:"SAP-icons",query:{tag:"test"}})});QUnit.test("Should update the category properly in the hash",function(t){this.oOverviewController._updateHash("cat","test");sinon.assert.calledWith(this.oRouterStub.navTo,"overview",{fontName:"SAP-icons",query:{cat:"test"}})});QUnit.test("Should update the search properly in the hash",function(t){this.oOverviewController._updateHash("search","test");sinon.assert.calledWith(this.oRouterStub.navTo,"overview",{fontName:"SAP-icons",query:{search:"test"}})});QUnit.test("Should reset tag and search in the hash when passing reset",function(t){this.oOverviewController._oCurrentQueryContext.tab="test";this.oOverviewController._oCurrentQueryContext.icon="test";this.oOverviewController._oCurrentQueryContext.tag="test";this.oOverviewController._oCurrentQueryContext.cat="test";this.oOverviewController._oCurrentQueryContext.search="test";this.oOverviewController._updateHash("reset");sinon.assert.calledWith(this.oRouterStub.navTo,"overview",{fontName:"SAP-icons",query:{tab:"test",icon:"test"}})});QUnit.test("Should reset search in the hash when passing no value",function(t){this.oOverviewController._oCurrentQueryContext.search="test";this.oOverviewController._updateHash("search");sinon.assert.calledWith(this.oRouterStub.navTo,"overview",{fontName:"SAP-icons",query:{}})});QUnit.test("Should reset tag in the hash when passing no value",function(t){this.oOverviewController._oCurrentQueryContext.tag="test";this.oOverviewController._updateHash("tag");sinon.assert.calledWith(this.oRouterStub.navTo,"overview",{fontName:"SAP-icons",query:{}})});QUnit.test("Should reset icon in the hash when passing no value",function(t){this.oOverviewController._oCurrentQueryContext.icon="test";this.oOverviewController._updateHash("icon");sinon.assert.calledWith(this.oRouterStub.navTo,"overview",{fontName:"SAP-icons",query:{}})});QUnit.test("Should reset tag if category was changed",function(t){this.oOverviewController._oCurrentQueryContext.tag="test";this.oOverviewController._oCurrentQueryContext.cat="test";this.oOverviewController._updateHash("cat","new");sinon.assert.calledWith(this.oRouterStub.navTo,"overview",{fontName:"SAP-icons",query:{cat:"new"}})});QUnit.test("Should reset tag if category was changed to favorites",function(t){this.oOverviewController._oCurrentQueryContext.tag="test";this.oOverviewController._oCurrentQueryContext.tab="details";this.oOverviewController._updateHash("tab","favorites");sinon.assert.calledWith(this.oRouterStub.navTo,"overview",{fontName:"SAP-icons",query:{tab:"favorites"}})});QUnit.test("Should reset tag if category was changed from favorites",function(t){this.oOverviewController._oCurrentQueryContext.tag="test";this.oOverviewController._oCurrentQueryContext.tab="favorites";this.oOverviewController._updateHash("tab","details");sinon.assert.calledWith(this.oRouterStub.navTo,"overview",{fontName:"SAP-icons",query:{tab:"details"}})});QUnit.test("Handler for the 'Copy unicode' button correctly recognized unicode and calls the _copyStringToClipboard function with correct parameter",function(t){sinon.stub(this.oOverviewController,"_copyStringToClipboard");sinon.stub(this.oOverviewController,"byId").withArgs("preview").returns({getBindingContext:function(){return{getObject:function(){return{name:"iconName"}}}}});this.oGetModelStub.withArgs().returns({getUnicodeHTML:function(){return"&#xe034;"}});this.oOverviewController.onCopyUnicodeToClipboard();t.strictEqual(this.oOverviewController._copyStringToClipboard.callCount,1,"String copied to clipbiard exactly once");t.strictEqual(this.oOverviewController._copyStringToClipboard.getCalls()[0].args[0],"xe034","Correct string copied to clipboard")});QUnit.test("Handler for the 'Copy code' button calls the _copyStringToClipboard function with correct parameter",function(t){var e="sap-icon://excel-attachment",o="previewCopyCode",r=new s(o,{value:e});sinon.stub(this.oOverviewController,"_copyStringToClipboard");sinon.stub(this.oOverviewController,"getResourceBundle").returns({getText:function(){return"Unicode"}});sinon.stub(this.oOverviewController,"byId").withArgs(o).returns(r);this.oOverviewController.onCopyCodeToClipboard();t.strictEqual(this.oOverviewController._copyStringToClipboard.callCount,1,"String copied to clipbiard exactly once");t.strictEqual(this.oOverviewController._copyStringToClipboard.getCalls()[0].args[0],e,"Correct string copied to clipboard");r.destroy()});QUnit.test("Handler for the 'Copy icon' button calls the _copyStringToClipboard function with correct parameter",function(t){var e="sap-icon://excel-attachment",o="previewCopyCode",r="icon",n=new s(o,{value:e});sinon.stub(this.oOverviewController,"byId").withArgs(o).returns(n);sinon.stub(this.oOverviewController,"_copyStringToClipboard");this.oGetModelStub.withArgs().returns({getUnicode:function(){return r}});this.oOverviewController.onCopyIconToClipboard();t.strictEqual(this.oOverviewController._copyStringToClipboard.callCount,1,"String copied to clipboard exactly once");t.strictEqual(this.oOverviewController._copyStringToClipboard.getCalls()[0].args[0],r,"Correct string copied to clipboard");n.destroy();this.oOverviewController.byId.restore();this.oOverviewController._copyStringToClipboard.restore()});QUnit.test("The formatter for the unicode copy field cuts off the unnecessary characters",function(t){var e="&#xe000;",o="xe000",r=sinon.stub(this.oOverviewController,"getResourceBundle").returns({getText:function(e,r){t.strictEqual(e,"previewInfoUnicodeWithParams","Resource bundle called with correct i18n key");t.strictEqual(r[0],o,"Raw unicode has been transformed correctly")}});this.oGetModelStub.withArgs().returns({getUnicodeHTML:function(){return e}});i.getUnicodeTextByName.bind(this.oOverviewController)("iconName");r.restore()});QUnit.module("Overview controller: searching by unicode filter factory tests",{beforeEach:function(){this.oOverviewController=new t;this.oGetModelStub=sinon.stub(this.oOverviewController,"getModel").returns({getUnicodeHTML:function(){return"&#xe000;"}})},afterEach:function(){this.oOverviewController.destroy()}});QUnit.test("The filter produced by the factory function returns true if the model returns unicode string that contains query string",function(t){var e=this.oOverviewController._unicodeFilterFactory("xe000"),o;o=e("iconName");t.ok(o,"The unicode of the icon satisfies the query")});QUnit.test("The filter produced by the factory function returns false if the model returns unicode string that does not contain query string",function(t){var e=this.oOverviewController._unicodeFilterFactory("xe021"),o;o=e("iconName");t.notOk(o,"The unicode of the icon does not satisfy the query")})});