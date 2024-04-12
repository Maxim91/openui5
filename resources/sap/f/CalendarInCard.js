/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/m/Button','sap/m/Toolbar','sap/ui/core/Core','sap/ui/core/date/UniversalDate','sap/ui/core/format/DateFormat','sap/ui/core/IconPool','sap/ui/core/InvisibleText','sap/ui/dom/containsOrEquals','sap/ui/unified/Calendar','sap/ui/unified/calendar/CalendarDate','sap/ui/unified/calendar/CalendarUtils','./CalendarInCardRenderer'],function(B,T,C,U,D,I,a,c,b,d,e,f){"use strict";var g=b.extend("sap.f.CalendarInCard",{metadata:{library:"sap.f"}});g.prototype.init=function(){b.prototype.init.apply(this,arguments);this.setProperty("_currentPicker","month");};g.prototype.onBeforeRendering=function(){var m=this.getAggregation("month"),F=this._getFocusedDate().toLocalJSDate();m[0].displayDate(F);this._iSize=0;switch(this._iMode){case 0:this._oPickerBtn.setText(this._formatPickerText(F));break;case 1:this._oPickerBtn.setText(this._formatMonthPickerText());break;case 2:case 3:this._oPickerBtn.setText(this._formatYearPickerText());break;}this._updateTodayButtonState();};g.prototype.onAfterRendering=function(E){};g.prototype.onsaptabnext=function(E){};g.prototype.onsaptabprevious=function(E){};g.prototype._initializeHeader=function(){var n=this.getId()+"--Head",r=C.getLibraryResourceBundle("sap.f"),p=new B(n+"-PrevBtn",{icon:I.getIconURI('slim-arrow-left'),tooltip:r.getText("CALENDAR_BTN_PREV"),type:"Transparent",press:function(){this._handlePrevious();}.bind(this)}),N=new B({icon:I.getIconURI('slim-arrow-right'),tooltip:r.getText("CALENDAR_BTN_NEXT"),type:"Transparent",press:function(){this._handleNext();}.bind(this)}),h=new T(n,{ariaLabelledBy:a.getStaticId("sap.f","CALENDAR_NAVIGATION")});this._oTodayBtn=new B({text:r.getText("CALENDAR_TODAY"),ariaLabelledBy:a.getStaticId("sap.f","CALENDAR_NAVIGATE_TO_TODAY"),type:"Transparent",press:function(){this._handleTodayPress();}.bind(this)});this._oPickerBtn=new B({type:"Transparent",ariaLabelledBy:a.getStaticId("sap.f","CALENDAR_SELECT_RANGE"),press:function(){this._handlePickerButtonPress();}.bind(this)});h.addContent(p).addContent(this._oTodayBtn).addContent(N).addContent(this._oPickerBtn);this.setAggregation("header",h);};g.prototype._handlePickerButtonPress=function(){switch(this._iMode){case 0:this._showMonthPicker();this._oPickerBtn.getDomRef().focus();break;case 1:this._showYearPicker();this._oPickerBtn.getDomRef().focus();break;case 2:this._showYearRangePicker();break;}};g.prototype._handleTodayPress=function(){var o=new Date(),h=d.fromLocalJSDate(o);this.getAggregation("month")[0].setDate(o);this.getSelectedDates()[0].setStartDate(o);this._setFocusedDate(h);if(this._iMode===3){o.setFullYear(o.getFullYear()-(this._getYearRangePicker().getRangeSize()/2));this._getYearRangePicker().setDate(o);this._oPickerBtn.setText(this._formatYearPickerText());}else if(this._iMode===2){this._getYearPicker().setDate(o);this._oPickerBtn.setText(this._formatYearPickerText());}else if(this._iMode===1){this.displayDate(o);this._getMonthPicker()._iYear=o.getFullYear();this._getMonthPicker().setMonth(o.getMonth());this._oPickerBtn.setText(this._formatMonthPickerText());}else{this._oPickerBtn.setText(this._formatPickerText());}this._addMonthFocusDelegate();this._updateTodayButtonState();this.fireStartDateChange();this.fireSelect();};g.prototype._formatPickerText=function(F){var o=F?F:this.getSelectedDates()[0].getStartDate(),r=C.getConfiguration().getRTL(),h=D.getDateInstance({format:"yMMMM"}),s=h.format(o),R,E;if(!r){R=s;if(E){R+=" - "+E;}}else{if(E){R=E+" - "+s;}else{R=s;}}return R;};g.prototype._formatYearPickerText=function(){var i=this._getYearPicker().getDate().getFullYear(),y=this._getYearPicker().getYears(),s=i-Math.floor(y/2),E=i+y/2-1;return""+s+" - "+E;};g.prototype._formatMonthPickerText=function(){return D.getDateInstance({format:"y"}).format(this.getStartDate());};g.prototype._showMonthPicker=function(s){var o=this._getFocusedDate(),m=this._getMonthPicker();this.setProperty("_currentPicker","monthPicker");m._setYear(o.getYear());if(!s){m.setMonth(o.getMonth());this._setDisabledMonths(o.getYear(),m);}this._iMode=1;this._togglePrevNext(o,false);this._oPickerBtn.setText(this._formatMonthPickerText());};g.prototype._showYearPicker=function(){var o=this._getFocusedDate(),y=this._getYearPicker();this.setProperty("_currentPicker","yearPicker");this._togglePrevNexYearPicker();this._iMode=2;y.setDate(o.toLocalJSDate());this._oPickerBtn.setText(this._formatYearPickerText());};g.prototype._showYearRangePicker=function(){b.prototype._showYearRangePicker.apply(this,arguments);this._oPickerBtn.setVisible(false);};g.prototype._selectMonth=function(){b.prototype._selectMonth.apply(this,arguments);this._oPickerBtn.setText(this._formatPickerText());this._updateTodayButtonState();};g.prototype._selectYear=function(){b.prototype._selectYear.apply(this,arguments);this._oPickerBtn.setText(this._formatMonthPickerText());this._showMonthPicker();this._updateTodayButtonState();};g.prototype._selectYearRange=function(){var y=this.getAggregation("yearRangePicker"),r=y.getRangeSize(),p=this.getPrimaryCalendarType(),s=d.fromLocalJSDate(y.getDate(),p),F=this._getFocusedDate();s.setMonth(F.getMonth(),F.getDate());s.setYear(s.getYear()+Math.floor(r/2));F.setYear(s.getYear());this._setFocusedDate(F);this._showYearPicker();this._oPickerBtn.setVisible(true).setText(this._formatYearPickerText());this._updateTodayButtonState();};g.prototype._handlePrevious=function(){b.prototype._handlePrevious.apply(this,arguments);this._handleArrowNavigation(-1);};g.prototype._handleNext=function(){b.prototype._handleNext.apply(this,arguments);this._handleArrowNavigation(1);};g.prototype._handleArrowNavigation=function(i){var m,y,Y;if(this._iMode===3){Y=this._getYearRangePicker();Y.getDate().setFullYear(Y.getDate().getFullYear()+(i*Y.getYears()));this._oPickerBtn.setText(this._formatYearPickerText());}else if(this._iMode===2){y=this._getYearPicker();y.getDate().setFullYear(y.getDate().getFullYear()+(i*y.getYears()));this._oPickerBtn.setText(this._formatYearPickerText());}else if(this._iMode===1){m=this._getMonthPicker();this._getFocusedDate().setYear(m._iYear);this.getAggregation("month")[0].getDate().setYear(m._iYear);this._oPickerBtn.setText(this._formatMonthPickerText());}else{this._oPickerBtn.setText(this._formatPickerText(this._getFocusedDate().toLocalJSDate()));}this._updateTodayButtonState();};g.prototype._dateMatchesVisibleRange=function(){var o=d.fromLocalJSDate(new Date()),s,i,y,Y,S;switch(this._iMode){case 0:s=this.getSelectedDates().length?this.getSelectedDates()[0].getStartDate():this.getStartDate();i=s.getDate()===o.getDate();return i&&e._isSameMonthAndYear(d.fromLocalJSDate(this.getStartDate()),o);case 1:return e._isSameMonthAndYear(d.fromLocalJSDate(this.getStartDate()),o);case 2:return e._isSameMonthAndYear(d.fromLocalJSDate(this._getYearPicker().getDate()),o);case 3:y=this._getYearRangePicker();Y=y.getDate();S=new Date(Y.getFullYear()+(y.getRangeSize()/2),Y.getMonth(),Y.getDate());return e._isSameMonthAndYear(d.fromLocalJSDate(S),o);}};g.prototype._updateTodayButtonState=function(){if(this._oTodayBtn){this._oTodayBtn.setEnabled(!this._dateMatchesVisibleRange());}};g.prototype._updateHeader=function(){};g.prototype.onsapescape=function(){this.fireCancel();this._closePickers();this._oPickerBtn.setVisible(true);this._oPickerBtn.setText(this._formatPickerText());};g.prototype._updateHeadersButtons=function(){};g.prototype._togglePrevNext=function(){};g.prototype._togglePrevNexYearPicker=function(){};g.prototype._initializeSecondMonthHeader=function(){};g.prototype._updateHeadersYearPrimaryText=function(){};g.prototype._updateHeadersYearAdditionalText=function(){};g.prototype._updateActiveHeaderYearButtonVisibility=function(){};g.prototype._setHeaderText=function(){};return g;});
