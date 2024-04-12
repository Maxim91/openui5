sap.ui.require(["sap/ui/test/Opa5","sap/ui/test/actions/Press","sap/ui/test/matchers/Properties","sap/ui/test/matchers/Ancestor"],function(e,i,s,r){"use strict";var t="Overview",o="preview",n="previewIcon";e.createPageObjects({onThePreviewPage:{actions:{iPressTheCloseButton:function(){return this.waitFor({id:"closePreview",viewName:t,actions:new i,errorMessage:"Did not find the close preview button"})},iCopyToClipBoard:function(){return this.waitFor({id:"previewCopy",viewName:t,success:function(e){return this.waitFor({controlType:"sap.m.Button",matchers:[new r(e),new s({icon:"sap-icon://copy"})],actions:new i})},errorMessage:"Did not find the copy button"})}},assertions:{iShouldSeeTheIcon:function(i){return this.waitFor({id:n,viewName:t,matchers:new s({src:"sap-icon://"+i}),success:function(s){e.assert.ok(true,'The icon "'+i+'" is shown in the preview area')},errorMessage:'Did not display the icon "'+i+'" in the preview area'})},iShouldSeeTheRememberedObject:function(){return this.waitFor({success:function(){return this.iShouldSeeTheIcon(this.getContext().currentItem.name)}})},iShouldSeeARandomIcon:function(){return this.waitFor({id:n,viewName:t,matchers:function(e){return e.getSrc().replace("sap-icon://","").length>0},success:function(){e.assert.ok(true,"A random icon is shown in the preview area")},errorMessage:"Did not display a random icon in the preview area"})},iShouldSeeThePreviewArea:function(){return this.waitFor({id:o,viewName:t,success:function(){e.assert.ok(true,"The preview area is visible")},errorMessage:"The preview area is not visible"})},iShouldNotSeeThePreviewArea:function(){return this.waitFor({id:o,viewName:t,visible:false,matchers:new s({visible:false}),success:function(){e.assert.ok(true,"The preview area is not visible")},errorMessage:"The preview area is visible"})},iShouldSeeTheCopyArea:function(){return this.waitFor({id:"previewCopy",viewName:t,success:function(){e.assert.ok(true,"The copy area is visible")},errorMessage:"The copy area is not visible"})},iShouldSeeTheUseCasesArea:function(){return this.waitFor({id:"previewUseCases",viewName:t,success:function(){e.assert.ok(true,"The use cases area is visible")},errorMessage:"The use cases area is not visible"})},iShouldSeeTheInfoArea:function(){return this.waitFor({id:"previewInfo",viewName:t,success:function(){e.assert.ok(true,"The info area is visible")},errorMessage:"The info area is not visible"})},iShouldSeeTheUnicodeInfo:function(){return this.waitFor({id:"unicodeInfo",viewName:t,success:function(i){e.assert.ok(i.getText().length>4,"The unicode is displayed")},errorMessage:"The unicode info is not displayed"})},iShouldSeeTheCategoryInfo:function(){return this.waitFor({id:"categoryInfo",viewName:t,success:function(i){e.assert.ok(i.getText().length>0,"The category info is displayed")},errorMessage:"The category info is not displayed"})}}}})});