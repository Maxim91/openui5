/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/unified/calendar/CalendarDate','sap/ui/unified/calendar/CalendarUtils','sap/ui/unified/calendar/Month','sap/ui/core/date/UniversalDate','sap/ui/core/IconPool','./PlanningCalendarLegend','sap/ui/core/InvisibleText','sap/ui/core/Core','sap/ui/unified/library'],function(C,a,M,U,I,P,b,c,u){"use strict";var d=u.CalendarDayType;var S={apiVersion:2};S.render=function(r,o){var l=o._getCoreLocaleData();var D=o._getDensitySizes();r.openStart("div",o);r.class("sapMSinglePCGrid");r.class("sapMSPCMonthGrid");r.openEnd();this.renderDayNames(r,o,l);r.openStart("div");r.class("sapMSinglePCGridContent");r.openEnd();this.renderCells(r,o,l,D);r.close("div");r.close("div");};S.renderCells=function(r,o,l,D){var e=o._getCells(),v=o._getVerticalLabels(),f=o._getColumns(),m=[],A=[],g,h,k,p,n=[],q,w,i,j;for(i=0;i<o._getRows();i++){w=0;r.openStart("div");r.attr("role","grid");r.class("sapMSPCMonthWeek");r.openEnd();r.openStart("div");r.class("sapMSPCMonthWeekNumber");r.openEnd();r.text(v[i]);r.close("div");for(j=0;j<f;j++){g=i*f+j;h=e[g];k=o._getAppointmetsForADay(h);p=o._getPreviousAppointmetsForADay(h);n.push(p);q=o._getMoreCountPerCell(g);m.push(q);A.push(k);w=Math.max(w,o._aAppsLevelsPerDay[g].length);}r.openStart("div");r.class("sapMSPCMonthDays");r.class("sapMSPCMonthDaysMax"+w);r.attr("role","row");r.openEnd();for(j=0;j<f;j++){g=i*f+j;h=e[g];this.renderDay(r,o,h,l,m[g],g);}r.openStart("div");r.class("sapMSinglePCBlockers");r.class("sapUiCalendarRowVisFilled");r.attr("role","list");r.openEnd();for(j=0;j<f;j++){g=i*f+j;h=e[g];if(j===0){this.renderAppointments(r,o,n[g],j,m[g],D,i);}this.renderAppointments(r,o,A[g],j,m[g],D,i);}r.close("div");r.close("div");r.close("div");}};S.renderDay=function(r,o,D,l,m,i){var s=o._getSpecialDates(),e=M.prototype._getDateTypes.call(o,D),f=o._getDateFormatter(),t=D.isSame(C.fromLocalJSDate(new Date())),T,L;r.openStart("div");r.class("sapMSPCMonthDay");if(t){r.class("sapMSPCMonthDayToday");}r.attr("role","gridcell");if(a._isWeekend(D,l)||!a._isSameMonthAndYear(D,C.fromLocalJSDate(o.getStartDate()))){r.class("nonWorkingTimeframe");}if(s){if(e&&e[0]){T=e[0];r.class("sapUiCalendarSpecialDay"+T.type);L=P.findLegendItemForItem(c.byId(o._sLegendId),T);}}r.attr("sap-ui-date",D.valueOf().toString());r.attr("tabindex",-1);r.attr("aria-labelledby",f.format(D.toLocalJSDate())+"-Descr");r.openEnd();this.renderDndPlaceholder(r,o.getAggregation("_appsPlaceholders")[i]);if(t){r.openStart("div");r.class("sapMSPCMonthNowMarker");r.openEnd();}r.openStart("div");r.class("specialDateIndicator");r.openEnd();r.close("div");r.openStart("div");r.class("sapMSPCMonthDayNumber");r.openEnd();r.text(D.getDate());r.close("div");if(m){r.openStart("div");r.class("sapMSPCMonthLnkMore");r.openEnd();r.renderControl(o._getMoreLink(m,D,i));r.close("div");}r.openStart("span",f.format(D.toLocalJSDate())+"-Descr");r.class("sapUiInvisibleText");r.openEnd();r.text(o._getCellStartInfo(D.toLocalJSDate()));if(o._sLegendId&&L){r.text(L);}r.close("span");if(t){r.close("div");}r.close("div");};S.renderAppointments=function(r,o,e,f,m,D,R){var g=o._getMaxAppointments(),h=m?g-2:g-1;for(var i=0;i<e.length;i++){if(e[i].level<=h){this.renderAppointment(r,o,e[i],f,D,R);}}};S.renderAppointment=function(r,o,e,i,D,R){var A=e.data,w=e.width,l=e.level,f=o._getColumns(),t=A.getTooltip_AsString(),T=A.getType(),s=A.getColor(),g=A.getTitle(),h=A.getText(),j=A.getIcon(),k=A.getId(),m=A.getParent().getEnableAppointmentsDragAndDrop(),n={role:"listitem",labelledby:{value:b.getStaticId("sap.ui.unified","APPOINTMENT"),append:true},selected:null},p=f-i-w,q=c.getConfiguration().getRTL(),v,B=c.getConfiguration().getTheme().indexOf("_hc")?2:1;p=p<0?0:p;if(g){n["labelledby"].value=n["labelledby"].value+" "+k+"-Title";}n["labelledby"].value=n["labelledby"].value+" "+k+"-Descr";if(h){n["labelledby"].value=n["labelledby"].value+" "+k+"-Text";}if(A.getTentative()){n["labelledby"].value=n["labelledby"].value+" "+b.getStaticId("sap.ui.unified","APPOINTMENT_TENTATIVE");}if(A.getSelected()){n["labelledby"].value=n["labelledby"].value+" "+b.getStaticId("sap.ui.unified","APPOINTMENT_SELECTED");}r.openStart("div",A.getId()+"-"+i+"_"+R);r.attr("draggable",m);r.attr("data-sap-ui-draggable",m);r.attr("data-sap-ui-related",A.getId());r.attr("data-sap-level",l);r.attr("data-sap-width",w);r.attr("tabindex",0);if(t){r.attr("title",t);}r.accessibilityState(A,n);r.class("sapMSinglePCAppointmentWrap");r.class("sapUiCalendarRowApps");if(!s&&T!==d.None){r.class("sapUiCalendarApp"+T);}if(s){if(c.getConfiguration().getRTL()){r.style("border-right-color",s);}else{r.style("border-left-color",s);}}r.style(q?"right":"left","calc("+(i*100)/f+"% + "+B+"px)");r.style(q?"left":"right","calc("+(p*100)/f+"% + "+B+"px)");r.style("top",(l*D.appHeight+D.cellHeaderHeight)+"rem");r.openEnd();r.openStart("div");r.class("sapUiCalendarApp");if(A.getSelected()){r.class("sapUiCalendarAppSel");}if(A.getTentative()){r.class("sapUiCalendarAppTent");}if(j){r.class("sapUiCalendarAppWithIcon");}r.openEnd();r.openStart("div");r.class("sapUiCalendarAppCont");if(s){r.style("background-color",A._getCSSColorForBackground(s));}r.openEnd();if(e.hasPrevious<0){v=["sapUiCalendarAppArrowIconLeft","sapUiCalendarAppArrowIcon"];r.icon("sap-icon://arrow-left",v,{title:null,role:"img"});}if(j){v=["sapUiCalendarAppIcon"];var x={};x["id"]=k+"-Icon";x["title"]=null;x["role"]="img";r.icon(j,v,x);}if(g){r.openStart("span",k+"-Title");r.class("sapUiCalendarAppTitle");r.openEnd();r.text(g,true);r.close("span");}if(e.hasNext<0){v=["sapUiCalendarAppArrowIconRight","sapUiCalendarAppArrowIcon"];r.icon("sap-icon://arrow-right",v,{title:null,role:"img"});}r.openStart("span",k+"-Descr");r.class("sapUiInvisibleText");r.openEnd();r.text(o._getAppointmentAnnouncementInfo(A));r.close("span");r.close("div");r.close("div");r.close("div");};S.renderDayNames=function(r,o,l){var A=o.getFirstDayOfWeek(),f=A>0?A:l.getFirstDayOfWeek(),s=o.getId(),D,e=c.getConfiguration().getCalendarType(),w=l.getDaysStandAlone("abbreviated",e),W=l.getDaysStandAlone("wide",e),g=new Date(o.getStartDate()),F,h;g.setDate(g.getDate()-g.getDay()+f);F=C.fromLocalJSDate(g);r.openStart("div",s+"-Names");r.class("sapMSPCMonthDayNames");r.openEnd();for(var i=0;i<7;i++){h=(i+f)%7;D=s+"-WH"+h;r.openStart("div",D);r.class("sapUiCalWH");if(i===0){r.class("sapUiCalFirstWDay");}if(a._isWeekend(F,l)){r.class("sapUiCalItemWeekEnd");}F.setDate(F.getDate()+1);r.accessibilityState(null,{role:"columnheader",label:W[h]});r.openEnd();r.text(w[h%7]);r.close("div");}r.close("div");};S.renderDndPlaceholder=function(r,p){r.openStart("div");r.class("sapMSinglePCOverlay");r.openEnd();r.renderControl(p);r.close("div");};return S;},true);
