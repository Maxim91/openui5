/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/model/type/Date','sap/ui/model/odata/type/ODataType','sap/ui/model/odata/type/DateTimeBase','./InputBase','./ValueStateHeader','sap/ui/core/Core','sap/ui/core/LocaleData','sap/ui/core/library','sap/ui/core/format/DateFormat','./DateTimeFieldRenderer',"sap/base/util/deepEqual","sap/base/Log","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/cursorPos"],function(S,O,D,I,V,C,L,c,a,b,d,f,q){"use strict";var g=c.CalendarType;var h=c.ValueState;var i=I.extend("sap.m.DateTimeField",{metadata:{"abstract":true,library:"sap.m",properties:{displayFormat:{type:"string",group:"Appearance",defaultValue:null},valueFormat:{type:"string",group:"Data",defaultValue:null},dateValue:{type:"object",group:"Data",defaultValue:null},initialFocusedDateValue:{type:"object",group:"Data",defaultValue:null}}}});i.prototype.setValue=function(v){v=this.validateProperty("value",v);var o=this.getValue();if(v===o){return this;}else{this.setLastValue(v);}this.setProperty("value",v);this._bValid=true;var j;if(v){try{j=this._parseValue(v);}catch(e){}if(Array.isArray(j)){j=j[0];}if(!j||!j.getTime||j.getTime()<this._oMinDate.getTime()||j.getTime()>this._oMaxDate.getTime()){this._bValid=false;f.warning("Value can not be converted to a valid date",this);}}this.setProperty("dateValue",j);if(this.getDomRef()){var s;if(j){s=this._formatValue(j);}else{s=v;}if(this._$input.val()!==s){this._$input.val(s);this._curpos=this._$input.cursorPos();}}return this;};i.prototype.setDateValue=function(o){if(!this._isValidDate(o)){throw new Error("Date must be a JavaScript date object; "+this);}if(d(this.getDateValue(),o)){return this;}o=this._dateValidation(o);var v=this._formatValue(o,true);if(v!==this.getValue()){this.setLastValue(v);}this.setProperty("value",v);if(this.getDomRef()){var s=this._formatValue(o);if(this._$input.val()!==s){this._$input.val(s);this._curpos=this._$input.cursorPos();}}return this;};i.prototype.setValueFormat=function(v){this.setProperty("valueFormat",v,true);var s=this.getValue();if(s){this._handleDateValidation(this._parseValue(s));}return this;};i.prototype.setDisplayFormat=function(s){this.setProperty("displayFormat",s,true);this.updateDomValue(this._formatValue(this.getDateValue()));this.setPlaceholder(this._getPlaceholder());return this;};i.prototype.getDisplayFormatType=function(){return null;};i.prototype.onfocusin=function(e){if(!q(e.target).hasClass("sapUiIcon")){this.addStyleClass("sapMFocus");}if(!q(e.target).hasClass("sapMInputBaseIconContainer")&&!(this._oPopup&&this._oPopup.isOpen())){this.openValueStateMessage();}else if(this._oValueStateHeader){this._oValueStateHeader.setValueState(this.getValueState()).setText(this._getTextForPickerValueStateContent()).setVisible(this.getValueState()!==h.None);}};i.prototype._getValueStateHeader=function(){var v;if(!this._oValueStateHeader){v=this.getValueState();this._oValueStateHeader=new V({text:this._getTextForPickerValueStateContent(),valueState:v,visible:v!==h.None});}return this._oValueStateHeader;};i.prototype._dateValidation=function(o){this._bValid=true;this.setProperty("dateValue",o);return o;};i.prototype._handleDateValidation=function(o){this._bValid=true;this.setProperty("dateValue",o);};i.prototype._getPlaceholder=function(){var p=this.getPlaceholder();if(!p){p=this._getDisplayFormatPattern();if(!p){p=this._getDefaultDisplayStyle();}if(this._checkStyle(p)){p=this._getLocaleBasedPattern(p);}}return p;};i.prototype._getLocaleBasedPattern=function(p){return L.getInstance(sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale()).getDatePattern(p);};i.prototype._getTimezoneFormatter=function(){if(!this._timezoneFormatter){this._timezoneFormatter=a.getDateTimeWithTimezoneInstance({showTimezone:false});}return this._timezoneFormatter;};i.prototype._parseValue=function(v,j){var B=this.getBinding("value"),o=B&&B.getType&&B.getType(),F=this._getFormatter(j),k,l,m,s;if(this._isSupportedBindingType(o)){try{m=o.parseValue(v,"string");if(typeof(m)==="string"&&o instanceof D){m=D.prototype.parseValue.call(o,v,"string");}k=o.oFormatOptions;if(k&&k.source&&k.source.pattern=="timestamp"){m=new Date(m);}else if(k&&k.source&&typeof k.source.pattern==="string"){m=o.oInputFormat.parse(v);}}catch(e){}if(m&&((o.oFormatOptions&&this._isFormatOptionsUTC(o.oFormatOptions))||(o.oConstraints&&o.oConstraints.isDateOnly))){s=this._getTimezoneFormatter().format(m,"UTC");l=this._getTimezoneFormatter().parse(s,sap.ui.getCore().getConfiguration().getTimezone())[0];m=l;}return m;}return F.parse(v);};i.prototype._formatValue=function(o,v){if(!o){return"";}var B=this.getBinding("value"),e=B&&B.getType&&B.getType(),F,j,s;if(this._isSupportedBindingType(e)){if((e.oFormatOptions&&e.oFormatOptions.UTC)||(e.oConstraints&&e.oConstraints.isDateOnly)){s=this._getTimezoneFormatter().format(o,sap.ui.getCore().getConfiguration().getTimezone());j=this._getTimezoneFormatter().parse(s,"UTC")[0];o=j;}F=e.oFormatOptions;if(F&&F.source&&F.source.pattern=="timestamp"){o=o.getTime();}else if(e.oOutputFormat){return e.oOutputFormat.format(o);}return e.formatValue(o,"string");}return this._getFormatter(!v).format(o);};i.prototype._isSupportedBindingType=function(B){return!!B&&B.isA(["sap.ui.model.type.Date","sap.ui.model.odata.type.DateTime","sap.ui.model.odata.type.DateTimeOffset"]);};i.prototype._isFormatOptionsUTC=function(B){return(B.UTC||(B.source&&B.source.UTC));};i.prototype._getDefaultDisplayStyle=function(){return"medium";};i.prototype._getDefaultValueStyle=function(){return"short";};i.prototype._getFormatter=function(e){var p=this._getBoundValueTypePattern(),r=false,F,B=this.getBinding("value"),s;if(B&&B.oType&&B.oType.oOutputFormat){r=!!B.oType.oOutputFormat.oFormatOptions.relative;s=B.oType.oOutputFormat.oFormatOptions.calendarType;}if(!p){if(e){p=(this.getDisplayFormat()||this._getDefaultDisplayStyle());s=this.getDisplayFormatType();}else{p=(this.getValueFormat()||this._getDefaultValueStyle());s=g.Gregorian;}}if(!s){s=sap.ui.getCore().getConfiguration().getCalendarType();}if(e){if(p===this._sUsedDisplayPattern&&s===this._sUsedDisplayCalendarType){F=this._oDisplayFormat;}}else{if(p===this._sUsedValuePattern&&s===this._sUsedValueCalendarType){F=this._oValueFormat;}}if(F){return F;}return this._getFormatterInstance(F,p,r,s,e);};i.prototype._getFormatterInstance=function(F,p,r,s,e){if(this._checkStyle(p)){F=this._getFormatInstance({style:p,strictParsing:true,relative:r,calendarType:s},e);}else{F=this._getFormatInstance({pattern:p,strictParsing:true,relative:r,calendarType:s},e);}if(e){this._sUsedDisplayPattern=p;this._sUsedDisplayCalendarType=s;this._oDisplayFormat=F;}else{this._sUsedValuePattern=p;this._sUsedValueCalendarType=s;this._oValueFormat=F;}return F;};i.prototype._getFormatInstance=function(A,e){return a.getInstance(A);};i.prototype._checkStyle=function(p){return(p==="short"||p==="medium"||p==="long"||p==="full");};i.prototype._getDisplayFormatPattern=function(){var p=this._getBoundValueTypePattern();if(p){return p;}p=this.getDisplayFormat();if(this._checkStyle(p)){p=this._getLocaleBasedPattern(p);}return p;};i.prototype._getBoundValueTypePattern=function(){var B=this.getBinding("value"),o=B&&B.getType&&B.getType();if(o instanceof S){return o.getOutputPattern();}if(o instanceof O&&o.oFormat){return o.oFormat.oFormatOptions.pattern;}return undefined;};i.prototype._isValidDate=function(o){return!o||Object.prototype.toString.call(o)==="[object Date]";};i.prototype._getTextForPickerValueStateContent=function(){return this.getValueStateText()||this._getDefaultTextForPickerValueStateContent();};i.prototype._getDefaultTextForPickerValueStateContent=function(){var v=this.getValueState(),r,t;if(v===h.None){t="";}else{r=C.getLibraryResourceBundle("sap.ui.core");t=r.getText("VALUE_STATE_"+v.toUpperCase());}return t;};return i;});
