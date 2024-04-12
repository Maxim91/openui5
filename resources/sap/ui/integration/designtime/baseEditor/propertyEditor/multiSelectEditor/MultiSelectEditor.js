/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/baseEditor/propertyEditor/BasePropertyEditor","sap/ui/integration/designtime/baseEditor/util/isValidBindingString"],function(B,i){"use strict";var M=B.extend("sap.ui.integration.designtime.baseEditor.propertyEditor.multiSelectEditor.MultiSelectEditor",{xmlFragment:"sap.ui.integration.designtime.baseEditor.propertyEditor.multiSelectEditor.MultiSelectEditor",metadata:{library:"sap.ui.integration"},renderer:B.getMetadata().getRenderer().render});M.configMetadata=Object.assign({},B.configMetadata,{allowBindings:{defaultValue:true,mergeStrategy:"mostRestrictiveWins"},allowCustomValues:{defaultValue:false,mergeStrategy:"mostRestrictiveWins",mostRestrictiveValue:true}});M.prototype.getDefaultValidators=function(){var c=this.getConfig();return Object.assign({},B.prototype.getDefaultValidators.call(this),{isValidBinding:{type:"isValidBinding",isEnabled:c.allowBindings},notABinding:{type:"notABinding",isEnabled:!c.allowBindings},isSelectedKey:{type:"isSelectedKey",config:{keys:function(p){return p.getConfig().items.map(function(I){return I.key;});}},isEnabled:!c.allowCustomValues}});};M.prototype._onSelectionFinish=function(e){var s=e.getParameter("selectedItems");s=s.map(function(S){return S.getKey();});this.setValue(s);};return M;});