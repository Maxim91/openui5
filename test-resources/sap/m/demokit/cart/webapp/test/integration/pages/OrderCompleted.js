sap.ui.define(["sap/ui/test/Opa5","sap/ui/test/actions/Press"],function(e,t){"use strict";e.createPageObjects({onOrderCompleted:{viewName:"OrderCompleted",actions:{iPressOnTheReturnToShopButton:function(){return this.waitFor({id:"returnToShopButton",actions:new t})}},assertions:{iShouldSeeTheOrderCompletedPage:function(){return this.waitFor({id:"returnToShopButton",success:function(t){e.assert.ok(t,"Found the order completed page")}})}}}})});