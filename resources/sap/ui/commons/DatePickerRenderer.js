/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./TextFieldRenderer','sap/ui/core/Renderer','sap/ui/core/ValueStateSupport','sap/ui/core/library'],function(T,R,V,c){"use strict";var a=c.ValueState;var D=R.extend(T);D.renderOuterAttributes=function(r,C){r.addClass("sapUiTfCombo");this.renderDatePickerARIAInfo(r,C);};D.renderOuterContentBefore=function(r,C){r.write("<div");r.writeAttribute('id',C.getId()+'-icon');r.writeAttribute('tabindex','-1');r.addClass("sapUiTfDateIcon");r.writeClasses();r.write("></div>");var b=sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons");var t=b.getText("DATEPICKER_DATE_TYPE");var s=V.enrichTooltip(C,C.getTooltip_AsString());if(s){t=t+". "+s;}r.write('<span id="'+C.getId()+'-Descr" style="visibility: hidden; display: none;">');r.writeEscaped(t);r.write('</span>');};D.renderInnerAttributes=function(r,d){if(d._bMobile){r.writeAttribute('type','date');r.addStyle('position','absolute');}};D.renderDatePickerARIAInfo=function(r,C){};D.renderARIAInfo=function(r,d){var p={role:d.getAccessibleRole().toLowerCase(),multiline:false,autocomplete:"none",haspopup:true,describedby:{value:d.getId()+"-Descr",append:true}};if(d.getValueState()==a.Error){p["invalid"]=true;}r.writeAccessibilityState(d,p);};D.convertPlaceholder=function(d){var p=d.getPlaceholder();if(p.length==8&&!isNaN(p)){var o=d._oFormatYyyymmdd.parse(p);if(o){p=d._formatValue(o);}}return p;};return D;},true);
