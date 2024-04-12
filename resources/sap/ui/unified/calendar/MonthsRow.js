/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/Control','sap/ui/core/LocaleData','sap/ui/core/delegate/ItemNavigation','sap/ui/unified/calendar/CalendarUtils','sap/ui/unified/calendar/CalendarDate','sap/ui/unified/library','sap/ui/core/format/DateFormat','sap/ui/core/library','sap/ui/core/Locale',"./MonthsRowRenderer","sap/ui/dom/containsOrEquals","sap/ui/thirdparty/jquery","sap/ui/unified/DateRange"],function(C,L,I,a,c,l,D,d,e,M,f,q,g){"use strict";var h=d.CalendarType;var j=C.extend("sap.ui.unified.calendar.MonthsRow",{metadata:{library:"sap.ui.unified",properties:{date:{type:"object",group:"Data"},startDate:{type:"object",group:"Data"},months:{type:"int",group:"Appearance",defaultValue:12},intervalSelection:{type:"boolean",group:"Behavior",defaultValue:false},singleSelection:{type:"boolean",group:"Behavior",defaultValue:true},showHeader:{type:"boolean",group:"Appearance",defaultValue:false}},aggregations:{selectedDates:{type:"sap.ui.unified.DateRange",multiple:true,singularName:"selectedDate"},specialDates:{type:"sap.ui.unified.DateTypeRange",multiple:true,singularName:"specialDate"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},legend:{type:"sap.ui.unified.CalendarLegend",multiple:false}},events:{select:{},focus:{parameters:{date:{type:"object"},notVisible:{type:"boolean"}}}}},renderer:M});j.prototype.init=function(){this._oFormatYyyymm=D.getInstance({pattern:"yyyyMMdd",calendarType:h.Gregorian});this._oFormatLong=D.getInstance({pattern:"MMMM y"});this._mouseMoveProxy=q.proxy(this._handleMouseMove,this);this._rb=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified");};j.prototype.exit=function(){if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation;}if(this._sInvalidateMonths){clearTimeout(this._sInvalidateMonths);}};j.prototype.onAfterRendering=function(){_.call(this);u.call(this);};j.prototype.onsapfocusleave=function(E){if(!E.relatedControlId||!f(this.getDomRef(),sap.ui.getCore().byId(E.relatedControlId).getFocusDomRef())){if(this._bMouseMove){w.call(this,true);s.call(this,this._getDate());this._bMoveChange=false;this._bMousedownChange=false;t.call(this);}if(this._bMousedownChange){this._bMousedownChange=false;t.call(this);}}};j.prototype.removeAllSelectedDates=function(){this._bDateRangeChanged=true;var R=this.removeAllAggregation("selectedDates");return R;};j.prototype.destroySelectedDates=function(){this._bDateRangeChanged=true;var b=this.destroyAggregation("selectedDates");return b;};j.prototype.removeAllSpecialDates=function(){this._bDateRangeChanged=true;var R=this.removeAllAggregation("specialDates");return R;};j.prototype.destroySpecialDates=function(){this._bDateRangeChanged=true;var b=this.destroyAggregation("specialDates");return b;};j.prototype.setDate=function(b){if(b){var i=c.fromLocalJSDate(b);this._oDate=i;p.call(this,i,false);}return this.setProperty("date",b);};j.prototype._getDate=function(){if(!this._oDate){this._oDate=new c();}return this._oDate;};j.prototype.setStartDate=function(S){a._checkJSDateObject(S);var b,y,O;y=S.getFullYear();a._checkYearInValidRange(y);b=c.fromLocalJSDate(S);this.setProperty("startDate",S,true);this._oStartDate=b;this._oStartDate.setDate(1);if(this.getDomRef()){O=this._getDate().toLocalJSDate();this._bNoRangeCheck=true;this.displayDate(S);this._bNoRangeCheck=false;if(O&&this.checkDateFocusable(O)){this.setDate(O);}}return this;};j.prototype._getStartDate=function(){if(!this._oStartDate){this._oStartDate=new c();this._oStartDate.setDate(1);}return this._oStartDate;};j.prototype.displayDate=function(b){p.call(this,c.fromLocalJSDate(b),true);return this;};j.prototype._getLocale=function(){var P=this.getParent();if(P&&P.getLocale){return P.getLocale();}else if(!this._sLocale){this._sLocale=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale().toString();}return this._sLocale;};j.prototype._getLocaleData=function(){var P=this.getParent();if(P&&P._getLocaleData){return P._getLocaleData();}else if(!this._oLocaleData){var b=this._getLocale();var i=new e(b);this._oLocaleData=L.getInstance(i);}return this._oLocaleData;};j.prototype._getFormatLong=function(){var b=this._getLocale();if(this._oFormatLong.oLocale.toString()!=b){var i=new e(b);this._oFormatLong=D.getInstance({style:"long"},i);}return this._oFormatLong;};j.prototype.getIntervalSelection=function(){var P=this.getParent();if(P&&P.getIntervalSelection){return P.getIntervalSelection();}else{return this.getProperty("intervalSelection");}};j.prototype.getSingleSelection=function(){var P=this.getParent();if(P&&P.getSingleSelection){return P.getSingleSelection();}else{return this.getProperty("singleSelection");}};j.prototype.getSelectedDates=function(){var P=this.getParent();if(P&&P.getSelectedDates){return P.getSelectedDates();}else{return this.getAggregation("selectedDates",[]);}};j.prototype.getSpecialDates=function(){var P=this.getParent();if(P&&P.getSpecialDates){return P.getSpecialDates();}else{return this.getAggregation("specialDates",[]);}};j.prototype._getShowHeader=function(){var P=this.getParent();if(P&&P._getShowItemHeader){return P._getShowItemHeader();}else{return this.getProperty("showHeader");}};j.prototype.getAriaLabelledBy=function(){var P=this.getParent();if(P&&P.getAriaLabelledBy){return P.getAriaLabelledBy();}else{return this.getAssociation("ariaLabelledBy",[]);}};j.prototype._setLegendControlOrigin=function(b){this._oLegendControlOrigin=b;};j.prototype.getLegend=function(){var P=this.getParent();if(this._oLegendControlOrigin){return this._oLegendControlOrigin.getLegend();}if(P&&P.getLegend){return P.getLegend();}else{return this.getAssociation("ariaLabelledBy",[]);}};j.prototype._setAriaRole=function(R){this._ariaRole=R;return this;};j.prototype._getAriaRole=function(){return this._ariaRole?this._ariaRole:"gridcell";};j.prototype._checkDateSelected=function(b){var R,S,E,T,x=0,y=0,z=0,i,A,B;a._checkCalendarDate(b);A=this.getSelectedDates();B=new c(b);B.setDate(1);T=B.toUTCJSDate().getTime();for(i=0;i<A.length;i++){R=A[i];S=R.getStartDate();x=0;if(S){S=c.fromLocalJSDate(S);S.setDate(1);x=S.toUTCJSDate().getTime();}E=R.getEndDate();y=0;if(E){E=c.fromLocalJSDate(E);E.setDate(1);y=E.toUTCJSDate().getTime();}if(T==x&&!E){z=1;break;}else if(T==x&&E){z=2;if(E&&T==y){z=5;}break;}else if(E&&T==y){z=3;break;}else if(E&&T>x&&T<y){z=4;break;}if(this.getSingleSelection()){break;}}return z;};j.prototype._getDateType=function(b){a._checkCalendarDate(b);var T,R,i,S,x=0,E,y=0,z,A=this.getSpecialDates(),B=new c(b);B.setDate(1);z=B.toUTCJSDate().getTime();for(i=0;i<A.length;i++){R=A[i];S=R.getStartDate();x=0;if(S){S=c.fromLocalJSDate(S);S.setDate(1);x=S.toUTCJSDate().getTime();}E=R.getEndDate();y=0;if(E){E=c.fromLocalJSDate(E);E.setDate(a._daysInMonth(E));y=E.toUTCJSDate().getTime();}if((z==x&&!E)||(z>=x&&z<=y)){T={type:R.getType(),tooltip:R.getTooltip_AsString()};break;}}return T;};j.prototype._checkMonthEnabled=function(b){a._checkCalendarDate(b);var P=this.getParent();if(P&&P._oMinDate&&P._oMaxDate){if(a._isOutside(b,P._oMinDate,P._oMaxDate)){return false;}}return true;};j.prototype._handleMouseMove=function(E){if(!this.$().is(":visible")){w.call(this,true);}var T=q(E.target);if(T.hasClass("sapUiCalItemText")){T=T.parent();}if(T.hasClass("sapUiCalItem")){var O=this._getDate();var F=c.fromLocalJSDate(this._oFormatYyyymm.parse(T.attr("data-sap-month")));F.setDate(1);if(!F.isSame(O)){this.setDate(F.toLocalJSDate());s.call(this,F,true);this._bMoveChange=true;}}};j.prototype.onmouseup=function(E){if(this._bMouseMove){w.call(this,true);var F=this._getDate();var b=this._oItemNavigation.getItemDomRefs();for(var i=0;i<b.length;i++){var $=q(b[i]);if($.attr("data-sap-month")==this._oFormatYyyymm.format(F.toUTCJSDate(),true)){$.trigger("focus");break;}}if(this._bMoveChange){var T=q(E.target);if(T.hasClass("sapUiCalItemText")){T=T.parent();}if(T.hasClass("sapUiCalItem")){F=c.fromLocalJSDate(this._oFormatYyyymm.parse(T.attr("data-sap-month")));F.setDate(1);}s.call(this,F);this._bMoveChange=false;this._bMousedownChange=false;t.call(this);}}if(this._bMousedownChange){this._bMousedownChange=false;t.call(this);}};j.prototype.onsapselect=function(E){var S=s.call(this,this._getDate());if(S){t.call(this);}E.stopPropagation();E.preventDefault();};j.prototype.onsapselectmodifiers=function(E){this.onsapselect(E);};j.prototype.onsappageupmodifiers=function(E){var F=new c(this._getDate());var y=F.getYear();if(E.metaKey||E.ctrlKey){F.setYear(y-10);}else{var i=this.getMonths();if(i<=12){F.setYear(y-1);}else{F.setMonth(F.getMonth()-i);}}this.fireFocus({date:F.toLocalJSDate(),notVisible:true});E.preventDefault();};j.prototype.onsappagedownmodifiers=function(E){var F=new c(this._getDate());var y=F.getYear();if(E.metaKey||E.ctrlKey){F.setYear(y+10);}else{var i=this.getMonths();if(i<=12){F.setYear(y+1);}else{F.setMonth(F.getMonth()+i);}}this.fireFocus({date:F.toLocalJSDate(),notVisible:true});E.preventDefault();};j.prototype.onThemeChanged=function(){if(this._bNoThemeChange){return;}this._bNamesLengthChecked=undefined;this._bLongWeekDays=undefined;var b=this._getLocaleData();var x=b.getMonthsStandAlone("wide");var y=this.$("months").children();var z=this._getStartDate().getMonth();for(var i=0;i<y.length;i++){var $=q(q(y[i]).children(".sapUiCalItemText"));$.text(x[(i+z)%12]);}u.call(this);};j.prototype.checkDateFocusable=function(b){a._checkJSDateObject(b);if(this._bNoRangeCheck){return false;}var S=this._getStartDate();var E=new c(S);E.setDate(1);E.setMonth(E.getMonth()+this.getMonths());var i=c.fromLocalJSDate(b);return i.isSameOrAfter(S)&&i.isBefore(E);};j.prototype.applyFocusInfo=function(i){this._oItemNavigation.focusItem(this._oItemNavigation.getFocusedIndex());return this;};function _(){var b=this._getDate();var y=this._oFormatYyyymm.format(b.toUTCJSDate(),true);var x=0;var R=this.$("months").get(0);var z=this.$("months").children(".sapUiCalItem");for(var i=0;i<z.length;i++){var $=q(z[i]);if($.attr("data-sap-month")===y){x=i;break;}}if(!this._oItemNavigation){this._oItemNavigation=new I();this._oItemNavigation.attachEvent(I.Events.AfterFocus,k,this);this._oItemNavigation.attachEvent(I.Events.FocusAgain,m,this);this._oItemNavigation.attachEvent(I.Events.BorderReached,n,this);this.addDelegate(this._oItemNavigation);this._oItemNavigation.setDisabledModifiers({sapnext:["alt"],sapprevious:["alt"],saphome:["alt"],sapend:["alt"]});this._oItemNavigation.setCycling(false);this._oItemNavigation.setColumns(1,true);}this._oItemNavigation.setRootDomRef(R);this._oItemNavigation.setItemDomRefs(z);this._oItemNavigation.setFocusedIndex(x);this._oItemNavigation.setPageSize(z.length);}function k(b){var i=b.getParameter("index");var E=b.getParameter("event");if(!E){return;}var O=this._getDate();var F=new c(O);var x=this._oItemNavigation.getItemDomRefs();var $=q(x[i]);F=c.fromLocalJSDate(this._oFormatYyyymm.parse($.attr("data-sap-month")));F.setDate(1);this.setDate(F.toLocalJSDate());this.fireFocus({date:F.toLocalJSDate(),notVisible:false});if(E.type=="mousedown"){o.call(this,E,F,i);}}function m(b){var i=b.getParameter("index");var E=b.getParameter("event");if(!E){return;}if(E.type=="mousedown"){var F=this._getDate();o.call(this,E,F,i);}}function n(b){var E=b.getParameter("event");var i=this.getMonths();var O=this._getDate();var F=new c(O);if(E.type){switch(E.type){case"sapnext":case"sapnextmodifiers":F.setMonth(F.getMonth()+1);break;case"sapprevious":case"sappreviousmodifiers":F.setMonth(F.getMonth()-1);break;case"sappagedown":F.setMonth(F.getMonth()+i);break;case"sappageup":F.setMonth(F.getMonth()-i);break;default:break;}this.fireFocus({date:F.toLocalJSDate(),notVisible:true});}}function o(E,F,i){if(E.button){return;}var S=s.call(this,F);if(S){this._bMousedownChange=true;}if(this._bMouseMove){w.call(this,true);this._bMoveChange=false;}else if(S&&this.getIntervalSelection()&&this.$().is(":visible")){v.call(this,true);}E.preventDefault();E.setMark("cancelAutoClose");}function p(b,N){a._checkCalendarDate(b);var y=b.getYear();a._checkYearInValidRange(y);var F=true;if(!this.getDate()||!b.isSame(c.fromLocalJSDate(this.getDate()))){var i=new c(b);i.setDate(1);F=this.checkDateFocusable(b.toLocalJSDate());if(!this._bNoRangeCheck&&!F){throw new Error("Date must be in visible date range; "+this);}this.setProperty("date",b.toLocalJSDate());this._oDate=i;}if(this.getDomRef()){if(F){r.call(this,this._oDate,N);}}}function r(b,N){var y=this._oFormatYyyymm.format(b.toUTCJSDate(),true);var x=this._oItemNavigation.getItemDomRefs();var $;for(var i=0;i<x.length;i++){$=q(x[i]);if($.attr("data-sap-month")==y){if(document.activeElement!=x[i]){if(N){this._oItemNavigation.setFocusedIndex(i);}else{this._oItemNavigation.focusItem(i);}}break;}}}function s(b,x){if(!this._checkMonthEnabled(b)){return false;}var S=this.getSelectedDates();var y;var i=0;var P=this.getParent();var A=this;var z;if(P&&P.getSelectedDates){A=P;}if(this.getSingleSelection()){if(S.length>0){y=S[0];z=y.getStartDate();if(z){z=c.fromLocalJSDate(z);z.setDate(1);}}else{y=new g();A.addAggregation("selectedDates",y);}if(this.getIntervalSelection()&&(!y.getEndDate()||x)&&z){var E;if(b.isBefore(z)){E=z;z=b;if(!x){y.setProperty("startDate",z.toLocalJSDate());y.setProperty("endDate",E.toLocalJSDate());}}else if(b.isSameOrAfter(z)){E=b;if(!x){y.setProperty("endDate",E.toLocalJSDate());}}}else{y.setProperty("startDate",b.toLocalJSDate());y.setProperty("endDate",undefined);}}else{if(this.getIntervalSelection()){throw new Error("Calender don't support multiple interval selection");}else{var B=this._checkDateSelected(b);if(B>0){for(i=0;i<S.length;i++){z=S[i].getStartDate();if(z){z=c.fromLocalJSDate(z);z.setDate(1);if(b.isSame(z)){A.removeAggregation("selectedDates",i);break;}}}}else{y=new g({startDate:b.toLocalJSDate()});A.addAggregation("selectedDates",y);}}}return true;}function t(){if(this._bMouseMove){w.call(this,true);}this.fireSelect();}function u(){if(!this._bNamesLengthChecked){var i=0;var x=this.$("months").children();var T=false;var y=this.getMonths();var B=Math.ceil(12/y);var z=0;var A=this._getLocaleData();var E=A.getMonthsStandAlone("wide");var $;for(var b=0;b<B;b++){if(y<12){for(i=0;i<x.length;i++){$=q(q(x[i]).children(".sapUiCalItemText"));$.text(E[(i+z)%12]);}z=z+y;if(z>11){z=11;}}for(i=0;i<x.length;i++){var F=x[i];if(Math.abs(F.clientWidth-F.scrollWidth)>1){T=true;break;}}if(T){break;}}if(y<12){z=this._getStartDate().getMonth();for(i=0;i<x.length;i++){$=q(q(x[i]).children(".sapUiCalItemText"));$.text(E[(i+z)%12]);}}if(T){this._bLongMonth=false;var G=A.getMonthsStandAlone("abbreviated");z=this._getStartDate().getMonth();for(i=0;i<x.length;i++){$=q(q(x[i]).children(".sapUiCalItemText"));$.text(G[(i+z)%12]);}}else{this._bLongMonth=true;}this._bNamesLengthChecked=true;}}function v(){q(window.document).on('mousemove',this._mouseMoveProxy);this._bMouseMove=true;}function w(){q(window.document).off('mousemove',this._mouseMoveProxy);this._bMouseMove=undefined;}return j;});
