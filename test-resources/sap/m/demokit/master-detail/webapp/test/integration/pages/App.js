sap.ui.define(["sap/ui/test/Opa5","sap/ui/test/matchers/Properties"],function(e,s){"use strict";e.createPageObjects({onTheAppPage:{viewName:"App",actions:{iCloseTheMessageBox:function(){return this.waitFor({searchOpenDialogs:true,id:"serviceErrorMessageBox",success:function(s){s.destroy();e.assert.ok(true,"The MessageBox was closed")}})}},assertions:{iShouldSeeTheMessageBox:function(){return this.waitFor({searchOpenDialogs:true,controlType:"sap.m.Dialog",matchers:new s({type:"Message"}),success:function(){e.assert.ok(true,"The correct MessageBox was shown")}})},theAppShowsFCLDesign:function(t){return this.waitFor({id:"layout",matchers:new s({layout:t}),success:function(){e.assert.ok(true,"the app shows "+t+" layout")},errorMessage:"The app does not show "+t+" layout"})}}}})});