/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/Element','./Label','./StepInput','./DateTimePicker','sap/ui/unified/Calendar','sap/ui/unified/DateRange','sap/ui/unified/calendar/MonthPicker','sap/ui/unified/calendar/CustomMonthPicker'],function(E,L,S,D,C,a,M,b){"use strict";var c=E.extend("sap.m.DynamicDateOption",{metadata:{library:"sap.m",properties:{key:{type:"string"},valueTypes:{type:"string[]",multiple:true}}}});c.prototype.getText=function(o){return this.getKey();};c.prototype.getValueHelpUITypes=function(o){throw new Error("Need implementation for method getValueHelpUITypes. Option: "+this.getKey());};c.prototype.createValueHelpUI=function(o,f){var v=o.getValue()&&Object.assign({},o.getValue()),p=this.getValueHelpUITypes(o),d=p.length,e=[],I;if(!o.aControlsByParameters){o.aControlsByParameters={};}o.aControlsByParameters[this.getKey()]=[];if(v&&v.values){v.values=v.values.map(function(g){if(g instanceof Date){return o._reverseConvertDate(g);}return g;});}for(var i=0;i<p.length;i++){if(p[i].getText()){e.push(new L({text:p[i].getText(),width:"100%"}));}I=this._createControl(i,p[i].getType(),v,f,d);e.push(I);o.aControlsByParameters[this.getKey()].push(I);}return e;};c.prototype.validateValueHelpUI=function(o){var p=this.getValueHelpUITypes();for(var i=0;i<p.length;i++){var I=o.aControlsByParameters[this.getKey()][i];switch(p[i].getType()){case"int":if(I._isLessThanMin(I.getValue())||I._isMoreThanMax(I.getValue())){return false;}break;case"month":case"custommonth":case"date":case"daterange":if(!I.getSelectedDates()||I.getSelectedDates().length==0){return false;}break;case"datetime":if(!I.getDateValue()){return false;}break;}}return true;};c.prototype.getValueHelpOutput=function(o){var p=this.getValueHelpUITypes(),r={},O;r.operator=this.getKey();r.values=[];for(var i=0;i<p.length;i++){var I=o.aControlsByParameters[this.getKey()][i];switch(p[i].getType()){case"int":O=I.getValue();break;case"month":case"date":if(!I.getSelectedDates().length){return null;}O=I.getSelectedDates()[0].getStartDate();break;case"custommonth":if(!I.getSelectedDates()||!I.getSelectedDates().length){return null;}O=[I.getSelectedDates()[0].getStartDate().getMonth(),I.getSelectedDates()[0].getStartDate().getFullYear()];break;case"datetime":if(!I.getDateValue()){return null;}O=I.getDateValue();break;case"daterange":if(!I.getSelectedDates().length){return null;}var e=I.getSelectedDates()[0].getEndDate()||I.getSelectedDates()[0].getStartDate();O=[I.getSelectedDates()[0].getStartDate(),e];break;default:break;}if(Array.isArray(O)){r.values=Array.prototype.concat.apply(r.values,O);}else{O&&r.values.push(O);}}return r;};c.prototype.getGroup=function(){return 0;};c.prototype.getGroupHeader=function(){var g=(this.getGroup()>-1&&this.getGroup()<7)?this.getGroup():0;return sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("DDR_OPTIONS_GROUP_"+g);};c.prototype.format=function(v){throw new Error("Need implementation for method format. Option: "+this.getKey());};c.prototype.parse=function(v){throw new Error("Need implementation for method parse. Option: "+this.getKey());};c.prototype.toDates=function(v){throw new Error("Need implementation for method toDates. Option: "+this.getKey());};c.prototype.enhanceFormattedValue=function(){return false;};c.prototype._createControl=function(i,u,v,f,d){var I;switch(u){case"int":I=this._createIntegerControl(v,i,f);break;case"date":I=this._createDateControl(v,i,f);break;case"datetime":if(d===1){I=this._createDateTimeInnerControl(v,i,f);}else if(d===2){I=this._createDateTimeControl(v,i,f);}break;case"daterange":I=this._createDateRangeControl(v,i,f);break;case"month":I=this._createMonthControl(v,i,f);break;case"custommonth":I=this._createCustomMonthControl(v,i,f);break;default:break;}return I;};c.prototype._createIntegerControl=function(v,i,f){var o=new S({width:"120px"});if(v&&this.getKey()===v.operator){o.setValue(v.values[i]);}if(f instanceof Function){o.attachChange(function(){f(this);},this);}return o;};c.prototype._createDateTimeControl=function(v,i,f){var o=new D();if(v&&this.getKey()===v.operator){o.setDateValue(v.values[i]);}if(f instanceof Function){o.attachChange(function(){f(this);},this);}return o;};c.prototype._createDateControl=function(v,i,f){var o=new C({width:"100%"});if(v&&this.getKey()===v.operator){o.addSelectedDate(new a({startDate:v.values[i]}));}if(f instanceof Function){o.attachSelect(function(){f(this);},this);}return o;};c.prototype._createDateTimeInnerControl=function(v,i,f){var o=new D({width:"100%"}),p;o._createPopup();o._createPopupContent();p=o._oPopupContent;p.setForcePhoneView(true);p.getCalendar().removeAllSelectedDates();if(v&&this.getKey()===v.operator){var V=new Date(v.values[i]);p.getCalendar().addSelectedDate(new a({startDate:V}));p.getClocks()._setTimeValues(V);}if(f instanceof Function){p.getClocks().getAggregation("_clocks").forEach(function(d){d.attachChange(function(e){f(this);}.bind(this));}.bind(this));if(p.getClocks().getAggregation("_buttonAmPm")){p.getClocks().getAggregation("_buttonAmPm").attachSelectionChange(function(e){f(this);}.bind(this));}p.getCalendar().attachSelect(function(){f(this);},this);}return p;};c.prototype._createDateRangeControl=function(v,i,f){var o=new C({intervalSelection:true,width:"100%"});if(v&&this.getKey()===v.operator){o.addSelectedDate(new a({startDate:v.values[i],endDate:v.values[i+1]}));}if(f instanceof Function){o.attachSelect(function(){f(this);},this);}return o;};c.prototype._createMonthControl=function(v,i,f){var o=new M(),d=new Date(),m=(v&&this.getKey()===v.operator)?v.values[i]:d.getMonth();o.setMonth(m);o.addSelectedDate(new a({startDate:d}));if(f instanceof Function){o.attachSelect(function(){f(this);},this);}return o;};c.prototype._createCustomMonthControl=function(v,i,f){var o=new b(),d=new Date(),m=(v&&i>=0&&this.getKey()===v.operator)?v.values[i]:d.getMonth(),y=(v&&i>=0&&this.getKey()===v.operator)?v.values[i+1]:d.getFullYear();d.setDate(1);d.setMonth(m);d.setYear(y);o.addSelectedDate(new a({startDate:d}));if(f instanceof Function){o.attachSelect(function(){f(this);},this);}return o;};return c;});