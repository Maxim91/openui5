sap.ui.define(["sap/ui/demo/worklist/model/models","sap/ui/Device"],function(e,t){"use strict";QUnit.module("createDeviceModel",{afterEach:function(){this.oDeviceModel.destroy()}});function i(i,o){this.stub(t,"system",{phone:o});this.oDeviceModel=e.createDeviceModel();i.strictEqual(this.oDeviceModel.getData().system.phone,o,"IsPhone property is correct")}QUnit.test("Should initialize a device model for desktop",function(e){i.call(this,e,false)});QUnit.test("Should initialize a device model for phone",function(e){i.call(this,e,true)});function o(i,o){this.stub(t,"support",{touch:o});this.oDeviceModel=e.createDeviceModel();i.strictEqual(this.oDeviceModel.getData().support.touch,o,"IsTouch property is correct")}QUnit.test("Should initialize a device model for non touch devices",function(e){o.call(this,e,false)});QUnit.test("Should initialize a device model for touch devices",function(e){o.call(this,e,true)});QUnit.test("The binding mode of the device model should be one way",function(t){this.oDeviceModel=e.createDeviceModel();t.strictEqual(this.oDeviceModel.getDefaultBindingMode(),"OneWay","Binding mode is correct")})});