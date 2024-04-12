/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/library","sap/ui/core/Control","sap/ui/core/Core","./InfoLabelRenderer"],function(l,C,a,b,I){"use strict";var R=l.RenderMode;var T=C.TextDirection;var c=a.extend("sap.tnt.InfoLabel",{metadata:{interfaces:["sap.ui.core.IFormContent"],library:"sap.tnt",properties:{text:{type:"string",defaultValue:"",bindable:"bindable"},renderMode:{type:"sap.tnt.RenderMode",defaultValue:R.Loose,group:"Appearance"},colorScheme:{type:"int",group:"Misc",defaultValue:7},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},displayOnly:{type:"boolean",group:"Appearance",defaultValue:false},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:T.Inherit},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:""}}}});c.prototype.init=function(){if(b.getConfiguration().getAccessibility()&&!I._sAriaText){var r=b.getLibraryResourceBundle("sap.tnt");I._sAriaText=r.getText("INFOLABEL_DEFAULT");I._sAriaTextEmpty=r.getText("INFOLABEL_EMPTY");}};c.prototype.getFormDoNotAdjustWidth=function(){return true;};return c;});
