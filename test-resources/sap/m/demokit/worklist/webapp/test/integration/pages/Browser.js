sap.ui.define(["sap/ui/test/Opa5","./Common"],function(t,e){"use strict";t.createPageObjects({onTheBrowser:{baseClass:e,actions:{iPressOnTheBackwardsButton:function(){return this.waitFor({success:function(){t.getWindow().history.back()}})},iPressOnTheForwardsButton:function(){return this.waitFor({success:function(){t.getWindow().history.forward()}})},iChangeTheHashToSomethingInvalid:function(){return this.waitFor({success:function(){t.getHashChanger().setHash("somethingInvalid")}})},iChangeTheHashToTheRememberedItem:function(){return this.waitFor({success:function(){var e=this.getContext().currentItem.id;t.getHashChanger().setHash("Objects/"+e)}})}},assertions:{}}})});