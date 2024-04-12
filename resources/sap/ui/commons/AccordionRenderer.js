/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./AccordionSection'],function(A){"use strict";var a={};a.render=function(r,o){r.write("<div");r.writeControlData(o);if(sap.ui.getCore().getConfiguration().getAccessibility()){r.writeAttribute('role','tablist');}r.addClass("sapUiAcd");r.addStyle("width",o.getWidth());r.writeClasses();r.writeStyles();r.write(">");r.write("<div id='"+o.getId()+"-dropTarget"+"' style='width:"+o.getWidth()+"' tabindex='-1' class='sapUiAcd-droptarget'></div>");var s=o.getSections();var d=o.getOpenedSectionsId().split(",");for(var i=0;i<s.length;i++){if(o.bInitialRendering){if(d.indexOf(s[i].getId())!=-1){s[i]._setCollapsed(false);}else{s[i]._setCollapsed(true);}}a.renderSection(r,s[i]);}r.write('<span id="'+o.getId()+'-Descr" style="visibility: hidden; display: none;">');r.write(o.rb.getText("ACCORDION_DSC"));r.write('</span>');r.write("</div>");o.bInitialRendering=false;};a.renderSection=function(r,c){var b=sap.ui.getCore().getConfiguration().getAccessibility();var h=A._isSizeSet(c.getMaxHeight());var w=A._isSizeSet(c.getParent().getWidth());r.write("<div");r.writeElementData(c);r.addClass("sapUiAcdSection");if(c.getParent().isLastSection(c)){r.addClass("sapUiAcdSectionLast");}r.addStyle("width",c.getParent().getWidth());if(!c.getCollapsed()){r.addStyle("height",c.getMaxHeight());}else{r.addClass("sapUiAcdSectionColl");}r.addClass("sapUiAcdSectionArea");if(!h){r.addClass("sapUiAcdSectionFlexHeight");}if(!c.getEnabled()){r.addClass("sapUiAcdSectionDis");}r.writeClasses();r.writeStyles();r.write("><div class='sapUiAcdSectionHdr'");if(c.getEnabled()){r.write(" tabindex='0'");}r.writeAttribute("id",c.getId()+"-hdr");if(b){r.writeAttribute('role','tab');r.writeAttribute("aria-labelledby",c.getId()+"-lbl");r.writeAttribute("aria-describedby",c.getParent().getId()+"-Descr");if(c.getEnabled()){if(c.getCollapsed()){r.writeAttribute("aria-expanded","false");}else{r.writeAttribute("aria-expanded","true");}}}r.write(">");r.write("<div ");r.writeAttribute("id",c.getId()+"-trgt");r.write(">");r.write("<span id='"+c.getId()+"-hdrL'>");if(c.getEnabled()){r.write("<a id='"+c.getId()+"-minL' class='sapUiAcdSectionMinArrow' href='# title='Collapse/Expand'");}else{r.write("<a id='"+c.getId()+"-minL' class='sapUiAcdSectionMinArrow sapUiAcdCursorText' href='#' title='Collapse/Expand'");}r.write(" tabindex='-1' ");if(b){r.writeAttribute("aria-labelledby",c.getId()+"-lbl");if(c.getCollapsed()){r.writeAttribute("aria-selected","false");}else{r.writeAttribute("aria-selected","true");}if(c.getEnabled()){r.writeAttribute("aria-disabled","false");r.writeAttribute("aria-grabbed","false");}else{r.writeAttribute("aria-disabled","true");r.writeAttribute("aria-grabbed","");}}r.write("></a>");r.write("<span tabindex='-1' id='"+c.getId()+"-lbl' class='sapUiAcdSectionLabel'");if(c.getCollapsed()){r.writeAttribute("aria-selected","false");r.addStyle("font-weight","normal");r.writeStyles();}else{r.writeAttribute("aria-selected","true");r.addStyle("font-weight","bold");r.writeStyles();}if(b){r.writeAttribute("role","heading");if(c.getEnabled()){r.writeAttribute("aria-disabled","false");}else{r.writeAttribute("aria-disabled","true");}}r.write(">");r.writeEscaped(c.getTitle());r.write("</span>");r.write("</span>");r.write("</div></div>");if(!c.getCollapsed()){r.write("<div class='sapUiAcdSectionCont' tabindex='-1' id='"+c.getId()+"-cont'");if(h&&w){r.write(" style='position:absolute;'");}else{r.write(" style='position:relative;top:0px;'");}if(sap.ui.getCore().getConfiguration().getAccessibility()){r.writeAttribute('role','tabpanel');}r.write(">");var C=c.getContent(),l=C.length;for(var i=0;i<l;i++){r.renderControl(C[i]);}r.write("</div>");}r.write("</div>");};return a;},true);
