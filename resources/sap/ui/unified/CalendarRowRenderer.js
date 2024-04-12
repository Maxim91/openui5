/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/date/UniversalDate','sap/ui/unified/CalendarAppointment','sap/ui/unified/CalendarLegendRenderer','sap/ui/Device','sap/ui/unified/library','sap/ui/core/InvisibleText','sap/base/Log','sap/ui/core/IconPool'],function(U,C,a,D,l,I,L){"use strict";var b=l.CalendarDayType;var c=l.CalendarIntervalType;var d=l.CalendarAppointmentVisualization;var e=l.CalendarAppointmentHeight;var f={apiVersion:2};f.render=function(r,R){var t=R.getTooltip_AsString();var v=R.getAppointmentsVisualization();var T=this.getLegendItems(R);r.openStart("div",R);r.class("sapUiCalendarRow");if(!D.system.phone&&R.getAppointmentsReducedHeight()){r.class("sapUiCalendarRowAppsRedHeight");}if(v!=d.Standard){r.class("sapUiCalendarRowVis"+v);}if(t){r.attr("title",t);}var w=R.getWidth();if(w){r.style("width",w);}var h=R.getHeight();if(h){r.style("height",h);}r.accessibilityState(R);r.openEnd();this.renderAppointmentsRow(r,R,T);r.close("div");};f.renderAppointmentsRow=function(r,R,t){var i=R.getId();r.openStart("div",i+"-Apps");r.class("sapUiCalendarRowApps");r.openEnd();this.renderBeforeAppointments(r,R);this.renderAppointments(r,R,t);this.renderAfterAppointments(r,R);r.close("div");};f.renderBeforeAppointments=function(r,R){};f.renderAfterAppointments=function(r,R){};f.renderResizeHandle=function(r,R,A){};f.renderAppointments=function(r,R,t){var A=R._getVisibleAppointments();var g=R._getVisibleIntervalHeaders();var s=R._getStartDate();var n=[];var S=0;var N=0;var h=[];var j=0;var k=0;var m=R.getIntervals();var o=R.getIntervalType();var w=100/m;var i=0;var p=new U(s);var F=false;var q=false;switch(o){case c.Hour:n=R.getNonWorkingHours()||[];S=s.getUTCHours();N=24;break;case c.Day:case c.Week:case c.OneMonth:case"OneMonth":n=R._getNonWorkingDays();S=s.getUTCDay();N=7;h=R.getNonWorkingHours()||[];j=s.getUTCHours();k=24;break;case c.Month:h=R._getNonWorkingDays();j=s.getUTCDay();k=7;break;default:break;}if(R._isOneMonthsRowOnSmallSizes()){this.renderSingleDayInterval(r,R,A,t,g,n,S,N,h,j,k,true,true);}else{for(i=0;i<m;i++){if(q){F=true;}else{F=false;}q=false;switch(o){case c.Hour:p.setUTCHours(p.getUTCHours()+1);if(p.getUTCHours()==0){q=true;}break;case c.Day:case c.Week:case c.OneMonth:case"OneMonth":p.setUTCDate(p.getUTCDate()+1);if(p.getUTCDate()==1){q=true;}break;case c.Month:j=p.getUTCDay();p.setUTCMonth(p.getUTCMonth()+1);if(p.getUTCMonth()==0){q=true;}break;default:break;}this.renderInterval(r,R,i,w,g,n,S,N,h,j,k,F,q);}this.renderIntervalHeaders(r,R,w,g,m);if(!(R._getRelativeInfo&&R._getRelativeInfo().bIsRelative)){r.openStart("div",R.getId()+"-Now");r.class("sapUiCalendarRowNow");r.openEnd();r.close("div");}for(i=0;i<A.length;i++){var u=A[i];this.renderAppointment(r,R,u,t);}r.openStart("div",R.getId()+"-DummyApp");r.class("sapUiCalendarApp");r.class("sapUiCalendarAppTitleOnly");r.class("sapUiCalendarAppDummy");r.class("sapUiCalendarAppHeight1");r.openEnd();r.close("div");}};f.writeCustomAttributes=function(r,R){};f.renderInterval=function(r,R,g,w,h,n,s,N,k,S,m,F,o,A){var p=R.getId()+"-AppsInt"+g;var i;var q=R.getShowIntervalHeaders()&&(R.getShowEmptyIntervalHeaders()||h.length>0);var M=R.getStartDate().getMonth();var t=new Date(R.getStartDate().getFullYear(),M+1,0).getDate();r.openStart("div",p);r.class("sapUiCalendarRowAppsInt");if(A){r.class(A);}r.style("width",w+"%");if(g>=t&&(R.getIntervalType()===c.OneMonth||R.getIntervalType()==="OneMonth")){r.class("sapUiCalItemOtherMonth");}for(i=0;i<n.length;i++){if((g+s)%N==n[i]){r.class("sapUiCalendarRowAppsNoWork");break;}}if(!q){r.class("sapUiCalendarRowAppsIntNoHead");}if(F){r.class("sapUiCalendarRowAppsIntFirst");}if(o){r.class("sapUiCalendarRowAppsIntLast");}this.writeCustomAttributes(r,R);r.openEnd();if(q){r.openStart("div");r.class("sapUiCalendarRowAppsIntHead");r.openEnd();r.close("div");}if(R.getShowSubIntervals()){var u=R.getIntervalType();var v=0;switch(u){case c.Hour:v=4;break;case c.Day:case c.Week:case c.OneMonth:case"OneMonth":v=24;break;case c.Month:var x=R._getStartDate();var y=new U(x);y.setUTCMonth(y.getUTCMonth()+g+1,0);v=y.getUTCDate();y.setUTCDate(1);s=y.getUTCDay();break;default:break;}var z=100/v;for(i=0;i<v;i++){r.openStart("div");r.class("sapUiCalendarRowAppsSubInt");r.style("width",z+"%");for(var j=0;j<k.length;j++){if((i+S)%m==k[j]){r.class("sapUiCalendarRowAppsNoWork");break;}}r.openEnd();r.close("div");}}r.close("div");};f.renderIntervalHeaders=function(r,R,w,g,h){var s=R.getShowIntervalHeaders()&&(R.getShowEmptyIntervalHeaders()||g.length>0);if(s){for(var i=0;i<g.length;i++){var o=g[i],j,k;if(R._bRTL){k=w*o.interval;j=w*(h-o.last-1);}else{j=w*o.interval;k=w*(h-o.last-1);}this.renderIntervalHeader(r,R,o,R._bRTL,j,k);}}};f.renderIntervalHeader=function(r,R,i,g,h,j){var s=i.appointment.getId(),A={labelledby:{value:s+"-Descr",append:true}},S;var o=R._calculateAppoitnmentVisualCue(i.appointment);r.openStart("div",i.appointment);r.class("sapUiCalendarRowAppsIntHead");if(h!==undefined){r.style("left",h+"%");}if(j!==undefined){r.style("right",j+"%");}r.class("sapUiCalendarRowAppsIntHeadFirst");if(i.appointment.getSelected()){r.class("sapUiCalendarRowAppsIntHeadSel");}if(i.appointment.getTentative()){r.class("sapUiCalendarRowAppsIntHeadTent");}var t=i.appointment.getTooltip_AsString();if(t){r.attr("title",t);}var T=i.appointment.getType();var k=i.appointment.getColor();if(!k&&T&&T!=b.None){r.class("sapUiCalendarRowAppsIntHead"+T);}if(k){if(g){r.style("border-right-color",k);}else{r.style("border-left-color",k);}}r.accessibilityState(i.appointment,A);r.openEnd();r.openStart("div");r.class("sapUiCalendarIntervalHeaderCont");if(k){r.style("background-color",i.appointment._getCSSColorForBackground(k));}r.openEnd();if(o.appTimeUnitsDifRowStart>0){r.icon("sap-icon://arrow-left",["sapUiCalendarAppArrowIconLeft"],{title:null,role:"img"});}var m=i.appointment.getIcon();if(m){var n=["sapUiCalendarRowAppsIntHeadIcon"];var p={};p["id"]=s+"-Icon";p["title"]=null;p["alt"]=null;p["role"]="presentation";r.icon(m,n,p);}var q=i.appointment.getTitle();if(q){r.openStart("span",s+"-Title");r.class("sapUiCalendarRowAppsIntHeadTitle");r.openEnd();r.text(q);r.close("span");}var u=i.appointment.getText();if(u){r.openStart("span",s+"-Text");r.class("sapUiCalendarRowAppsIntHeadText");r.openEnd();r.text(u);r.close("span");}if(o.appTimeUnitsDifRowEnd>0){r.icon("sap-icon://arrow-right",["sapUiCalendarAppArrowIconRight"],{title:null,role:"img"});}S=R._oRb.getText("CALENDAR_START_TIME")+": "+R._oFormatAria.format(i.appointment._getStartDateWithTimezoneAdaptation())+"; "+R._oRb.getText("CALENDAR_END_TIME")+": "+R._oFormatAria.format(i.appointment._getEndDateWithTimezoneAdaptation());if(T&&T!==b.None){S+="; "+this.getAriaTextForType(T,this.getLegendItems(R));}r.openStart("span",s+"-Descr");r.class("sapUiInvisibleText");r.openEnd();r.text(S);r.close("span");r.close("div");r.close("div");};f.renderAppointment=function(r,R,A,t,g){var o=A.appointment;var T=o.getTooltip_AsString();var s=o.getType();var h=o.getColor();var i=o.getTitle();var j=o.getText();var k=o.getDescription();var m=o.getIcon();var n=o.getId();var p=R._getAppointmentReducedHeight(A);var q={labelledby:{value:I.getStaticId("sap.ui.unified","APPOINTMENT")+" "+n+"-Descr",append:true},selected:null};var u=R._getAppointmentRowCount(A,p);var v=R.getAriaLabelledBy();var w=R._calculateAppoitnmentVisualCue(o);if(v.length>0){q["labelledby"].value=q["labelledby"].value+" "+v.join(" ");}if(i){q["labelledby"].value=q["labelledby"].value+" "+n+"-Title";}if(j){q["labelledby"].value=q["labelledby"].value+" "+n+"-Text";}r.openStart("div",o);r.class("sapUiCalendarApp");r.class("sapUiCalendarAppHeight"+u);if(o.getSelected()){r.class("sapUiCalendarAppSel");q["labelledby"].value=q["labelledby"].value+" "+I.getStaticId("sap.ui.unified","APPOINTMENT_SELECTED");}if(o.getTentative()){r.class("sapUiCalendarAppTent");q["labelledby"].value=q["labelledby"].value+" "+I.getStaticId("sap.ui.unified","APPOINTMENT_TENTATIVE");}if(u===1){r.class("sapUiCalendarAppTitleOnly");}if(m){r.class("sapUiCalendarAppWithIcon");}if(!g){if(R._bRTL){r.style("right",A.begin+"%");r.style("left",A.end+"%");}else{r.style("left",A.begin+"%");r.style("right",A.end+"%");}}r.attr("data-sap-level",A.level);if(R._sFocusedAppointmentId==n){r.attr("tabindex","0");}else{r.attr("tabindex","-1");}if(T){r.attr("title",T);}if(!h&&s&&s!=b.None){r.class("sapUiCalendarApp"+s);}if(h){if(R._bRTL){r.style("border-right-color",h);}else{r.style("border-left-color",h);}}r.accessibilityState(o,q);r.openEnd();r.openStart("div");r.class("sapUiCalendarAppCont");if(h&&R.getAppointmentsVisualization()===d.Filled){r.style("background-color",o._getCSSColorForBackground(h));}r.openEnd();if(o.getCustomContent().length){o.getCustomContent().forEach(function(E){r.renderControl(E);});}else{if(w.appTimeUnitsDifRowStart>0){r.icon("sap-icon://arrow-left",["sapUiCalendarAppArrowIconLeft"],{title:null,role:"img"});}if(m){var x=["sapUiCalendarAppIcon"];var y={};y["id"]=n+"-Icon";y["title"]=null;y["alt"]=null;y["role"]="presentation";r.icon(m,x,y);}r.openStart("div");r.class("sapUiCalendarAppTitleWrapper");r.openEnd();if(i){r.openStart("span",n+"-Title");r.class("sapUiCalendarAppTitle");r.openEnd();r.text(i);r.close("span");}if(j&&A.size!==e.HalfSize){r.openStart("span",n+"-Text");r.class("sapUiCalendarAppText");r.openEnd();r.text(j);r.close("span");}if(k&&A.size!==e.HalfSize&&(A.size!==e.Regular||!j)){r.openStart("span",n+"-Info");r.class("sapUiCalendarAppDescription");r.openEnd();r.text(k);r.close("span");}r.close("div");if(w.appTimeUnitsDifRowEnd>0){r.icon("sap-icon://arrow-right",["sapUiCalendarAppArrowIconRight"],{title:null,role:"img"});}}var z=R._oRb.getText("CALENDAR_START_TIME")+": "+R._oFormatAria.format(o._getStartDateWithTimezoneAdaptation());z=z+"; "+R._oRb.getText("CALENDAR_END_TIME")+": "+R._oFormatAria.format(o._getEndDateWithTimezoneAdaptation());if(R._getRelativeInfo&&R._getRelativeInfo().bIsRelative){var B=R._getRelativeInfo();z=R._oRb.getText("CALENDAR_START_TIME")+": "+B.intervalLabelFormatter(B._getIndexFromDate(o._getStartDateWithTimezoneAdaptation()));z=z+"; "+R._oRb.getText("CALENDAR_END_TIME")+": "+B.intervalLabelFormatter(B._getIndexFromDate(o._getEndDateWithTimezoneAdaptation()));}if(s&&s!=b.None){z=z+"; "+this.getAriaTextForType(s,t);}r.openStart("span",n+"-Descr");r.class("sapUiInvisibleText");r.openEnd();r.text(z);r.close("span");r.close("div");this.renderResizeHandle(r,R,o);r.close("div");};f.renderSingleDayInterval=function(r,R,A,t,g,n,s,N,h,S,k,F,m){var o=1,w=100,p=R.getId()+"-AppsInt"+o,i,q=R.getShowIntervalHeaders()&&(R.getShowEmptyIntervalHeaders()||g.length>0),u=new Date(R.getStartDate()),M=u.getMonth(),v=new Date(u.getFullYear(),M+1,0).getDate(),x,P=R._getPlanningCalendar(),y,z,B=[];u.setHours(0,0,0,0);y=A.concat(R.getIntervalHeaders().filter(function(V){var W=V._getStartDateWithTimezoneAdaptation().getTime(),X=V._getEndDateWithTimezoneAdaptation().getTime(),Y=u.getTime(),Z=Y+1000*60*60*24;return!(W>=Z||X<=Y);}).map(function(V){return{appointment:V,isHeader:true};})).sort(C._getComparer(u));if(P){B=P._getSelectedDates();}r.openStart("div",p);r.class("sapUiCalendarRowAppsInt");r.class("sapUiCalendarMonthRowAppsS");r.style("width",w+"%");if(o>=v&&(R.getIntervalType()===c.OneMonth||R.getIntervalType()==="OneMonth")){r.class("sapUiCalItemOtherMonth");}for(i=0;i<n.length;i++){if((o+s)%N==n[i]){r.class("sapUiCalendarRowAppsNoWork");break;}}if(!q){r.class("sapUiCalendarRowAppsIntNoHead");}if(F){r.class("sapUiCalendarRowAppsIntFirst");}if(m){r.class("sapUiCalendarRowAppsIntLast");}r.openEnd();if(q){r.openStart("div");r.class("sapUiCalendarRowAppsIntHead");r.openEnd();r.close("div");}if(B.length>0){var E=0,G=y.length;if(P.getRows()[0]._calculateVisibleAppointments){var H=P.getRows()[0]._calculateVisibleAppointments(B,y);E=H.iStart;G=H.iEnd;}for(i=E;i<G;i++){z=y[i];r.openStart("div");r.class("sapUiCalendarAppContainer");r.openEnd();r.openStart("div");r.class("sapUiCalendarAppContainerLeft");r.openEnd();r.openStart("div");r.class("sapUiCalendarAppStart");r.openEnd();r.text(z.appointment._getDateRangeIntersectionText(u).start);r.close("div");r.openStart("div");r.class("sapUiCalendarAppEnd");r.openEnd();r.text(z.appointment._getDateRangeIntersectionText(u).end);r.close("div");r.close("div");r.openStart("div");r.class("sapUiCalendarAppContainerRight");r.openEnd();if(z.isHeader){this.renderIntervalHeader(r,R,z);}else{this.renderAppointment(r,R,z,t,true);}r.close("div");r.close("div");}}if(A.length===0||B.length===0){r.openStart("div");r.class("sapUiCalendarNoApps");r.openEnd();var J=sap.ui.getCore().byId(R.getAssociation("row"));x=J.getNoAppointmentsText()?J.getNoAppointmentsText():sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("PLANNINGCALENDAR_ROW_NO_APPOINTMENTS");r.text(x);r.close("div");}if(!(R._getRelativeInfo&&R._getRelativeInfo().bIsRelative)){r.openStart("div",R.getId()+"-Now");r.class("sapUiCalendarRowNow");r.openEnd();}r.close("div");r.openStart("div",R.getId()+"-DummyApp");r.class("sapUiCalendarApp");r.class("sapUiCalendarAppTitleOnly");r.class("sapUiCalendarAppDummy");r.style("margin","0");r.style("height","0px");r.openEnd();r.close("div");if(R.getShowSubIntervals()){var K=R.getIntervalType();var O=0;switch(K){case c.Hour:O=4;break;case c.Day:case c.Week:case c.OneMonth:case"OneMonth":O=24;break;case c.Month:var Q=new U(u);Q.setUTCMonth(Q.getUTCMonth()+o+1,0);O=Q.getUTCDate();Q.setUTCDate(1);s=Q.getUTCDay();break;default:break;}var T=100/O;for(i=0;i<O;i++){r.openStart("div");r.class("sapUiCalendarRowAppsSubInt");r.style("width",T+"%");for(var j=0;j<h.length;j++){if((i+S)%k==h[j]){r.class("sapUiCalendarRowAppsNoWork");break;}}r.openEnd();r.close("div");}}r.close("div");};f.getLegendItems=function(o){var r=[],g,s=o.getLegend();if(s){g=sap.ui.getCore().byId(s);if(g){r=g.getItems();}else{L.error("CalendarLegend with id '"+s+"' does not exist!",o);}}return r;};f.getAriaTextForType=function(t,g){var T,s,o,i;if(g&&g.length){for(var i=0;i<g.length;i++){o=g[i];if(o.getType()===t){T=o.getText();break;}}}if(!T){s=a.getTypeAriaText(t);if(s){T=s.getText();}}return T;};return f;},true);
