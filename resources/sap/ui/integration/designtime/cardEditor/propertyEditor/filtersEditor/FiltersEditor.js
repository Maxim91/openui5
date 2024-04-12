/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/baseEditor/propertyEditor/BasePropertyEditor","sap/ui/integration/designtime/cardEditor/propertyEditor/complexMapEditor/ComplexMapEditor","sap/base/util/restricted/_merge","sap/ui/integration/cards/filters/DateRangeFilter"],function(B,C,_,D){"use strict";var F=C.extend("sap.ui.integration.designtime.cardEditor.propertyEditor.filtersEditor.FiltersEditor",{metadata:{library:"sap.ui.integration"},renderer:B.getMetadata().getRenderer().render});F.configMetadata=Object.assign({},C.configMetadata,{allowedValues:{defaultValue:[],mergeStrategy:"intersection"}});F.prototype.onBeforeConfigChange=function(c){var o={};if(c["allowKeyChange"]){o={template:{key:{label:this.getI18nProperty("CARD_EDITOR.FILTER.KEY"),path:"key",type:"string",enabled:c.allowKeyChange,allowBindings:false,validators:[{type:"isUniqueKey",config:{keys:function(){return Object.keys(this.getValue());}.bind(this),currentKey:function(p){return p.getValue();}}}]},type:{label:this.getI18nProperty("CARD_EDITOR.FILTER.TYPE"),path:"type",type:"select",items:(c["allowedTypes"]||[]).map(function(k){return{key:k};}),allowCustomValues:true,allowBindings:false},label:{label:this.getI18nProperty("CARD_EDITOR.FILTER.LABEL"),path:"label",type:"string"},description:{label:this.getI18nProperty("CARD_EDITOR.FILTER.DESCRIPTION"),type:"string",path:"description",allowCustomValues:true,allowBindings:false},value:{label:this.getI18nProperty("CARD_EDITOR.FILTER.VALUE"),path:"sValue",type:"string",visible:"{= ${type} === 'Select'}"},itemPath:{label:this.getI18nProperty("CARD_EDITOR.FILTER.ITEM.PATH"),path:"item/path",type:"string",visible:"{= ${type} === 'Select'}",enabled:"{= ${items} === undefined || ${items} === null}"},itemTemplateKey:{label:this.getI18nProperty("CARD_EDITOR.FILTER.ITEM.TEMPLATE.KEY"),path:"item/template/key",type:"string",visible:"{= ${type} === 'Select'}",enabled:"{= ${items} === undefined || ${items} === null}"},itemTemplateTitle:{label:this.getI18nProperty("CARD_EDITOR.FILTER.ITEM.TEMPLATE.TITLE"),path:"item/template/title",type:"string",visible:"{= ${type} === 'Select'}",enabled:"{= ${items} === undefined || ${items} === null}"},itemData:{label:this.getI18nProperty("CARD_EDITOR.FILTER.ITEM.DATA"),path:"data",type:"json",visible:"{= ${type} === 'Select'}",enabled:"{= ${items} === undefined || ${items} === null}"},items:{label:this.getI18nProperty("CARD_EDITOR.FILTER.ITEMS"),path:"items",type:"json",visible:"{= ${type} === 'Select'}",enabled:"{= ${item/template/key} === undefined || ${item/template/key} === ''}"},dateRangeOptions:{label:this.getI18nProperty("CARD_EDITOR.FILTER.OPTIONS"),path:"options",type:"multiSelect",items:this.getAllDateRangeOptions(),visible:"{= ${type} === 'DateRange'}"},dateRangeValueOption:{label:this.getI18nProperty("CARD_EDITOR.FILTER.VALUE.OPTION"),path:"dValue/option",type:"select",items:"{selectedOptions}",visible:"{= ${type} === 'DateRange'}"},dateRangeValues:{label:this.getI18nProperty("CARD_EDITOR.FILTER.VALUE.VALUES"),path:"dValue/values",type:"textArea",visible:"{= ${type} === 'DateRange'}"}}};}else{o={collapsibleItems:false,showItemLabel:false,template:{type:{label:this.getI18nProperty("CARD_EDITOR.FILTER.TYPE"),type:"select",path:"type",items:(c["allowedTypes"]||[]).map(function(k){return{key:k};}),allowCustomValues:false,allowBindings:false}}};}var a=_({},o,c);return C.prototype.onBeforeConfigChange.call(this,a);};F.prototype.getAllDateRangeOptions=function(){var d=new D();var o=d.getOptions();var a=[];for(var k in o){if(o.hasOwnProperty(k)){a.push({key:o[k],title:o[k]});}}return a;};return F;});