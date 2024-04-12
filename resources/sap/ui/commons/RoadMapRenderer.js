/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/thirdparty/jquery','sap/ui/Device','sap/base/security/encodeXML','sap/ui/thirdparty/jqueryui/jquery-ui-position'],function(q,D,e){"use strict";var R={};R.render=function(j,l){l.doBeforeRendering();j.write("<div");j.writeControlData(l);j.addClass("sapUiRoadMap");j.writeClasses();j.writeAttribute("tabindex","0");var T=l.getTooltip_AsString();if(T){j.writeAttributeEscaped("title",T);}j.writeAttribute("style","width:"+(l.getWidth()?l.getWidth():"100%")+";");j.write(">");r(j,l,true);j.write("<ul");j.writeAttribute("id",l.getId()+"-steparea");j.addClass("sapUiRoadMapStepArea");j.writeClasses();if(sap.ui.getCore().getConfiguration().getAccessibility()){j.writeAttribute("role","group");j.writeAttributeEscaped("aria-label",m("RDMP_DEFAULT_TOOLTIP",[]));if(T){j.writeAttributeEscaped("title",T);}}j.write(">");var S=l.getSteps();for(var i=0;i<S.length;i++){var x=S[i];if(x.getSubSteps().length>0){h(j,l,x);}else{a(j,l,x);}}j.write("</ul>");r(j,l,false);j.write("</div>");};R.selectStepWithId=function(i,I){var C=i.getSelectedStep();if(C){Q(C).removeClass("sapUiRoadMapSelected");}if(I){Q(I).addClass("sapUiRoadMapSelected");}if(sap.ui.getCore().getConfiguration().getAccessibility()){if(C){Q(C+"-box").removeAttr("aria-checked");}if(I){Q(I+"-box").attr("aria-checked",true);}}};R.selectStep=function(j,S,I,l,E,x){if(!x){R.selectStepWithId(j,S.getId());}if(!I&&S.getSubSteps().length>0){var y=S.getSubSteps();var z=S.$();var A=z.hasClass("sapUiRoadMapExpanded");var C=1;var B=function(){C--;if(C>0){return;}if(E){E(!A?"expanded":"collapsed");}R.updateStepArea(j);};var F=function(H,O,J){var K=Q(H);if(!q.fx.off&&!l){K.width(O?"0px":j.iStepWidth);var L=Q(H+"-label");L.addClass("sapUiRoadMapHidden");if(O){K.toggleClass("sapUiRoadMapHidden");}K.animate({width:O?j.iStepWidth:"0px"},"fast",function(){if(!O){K.toggleClass("sapUiRoadMapHidden");}K.width("");L.removeClass("sapUiRoadMapHidden");if(J){J();}});}else{K.toggleClass("sapUiRoadMapHidden");if(J){J();}}};z.toggleClass("sapUiRoadMapExpanded");if(sap.ui.getCore().getConfiguration().getAccessibility()){var G=z.hasClass("sapUiRoadMapExpanded");S.$("box").attr("aria-expanded",G);S.$("expandend-box").attr("aria-expanded",G);}for(var i=0;i<y.length;i++){if(y[i].getVisible()){C++;F(y[i].getId(),!A,B);}}F(S.getId()+"-expandend",!A,B);}else{if(E){E("selected");}}};R.updateStepArea=function(i){if(i.iStepWidth!=-1){var S=i.$("steparea");var j=i.$("Start");var E=i.$("End");var l=i.$();var x=S.scrollLeft();var A=l.width()-j.outerWidth(true)-E.outerWidth(true);var M=i.getNumberOfVisibleSteps();var C=n(i);if(M<1){M=C;}else{M=Math.min(M,C);}var P=Math.floor(A/i.iStepWidth);var N=Math.min(M,P);S.width(N*i.iStepWidth).scrollLeft(x);u(i);}};R.updateScrollArea=function(i,S){R.updateStepArea(i);if(!S){var j=i.$("steparea");var P=t(i,false);if(i.getFirstVisibleStep()){var l=Q(i.getFirstVisibleStep());if(l.length){P=o(j,l);}}v(i,P+p()*j.scrollLeft(),true);}};R.isVisibleRef=function(j,I){var S=j.$("steparea");var l=S.children(":visible");for(var i=0;i<l.length;i++){var C=q(l.get(i));if(C.attr("id")==I){var P=o(S,C);return P>=0&&P<S.width();}}return false;};R.getFirstVisibleRef=function(j){var S=j.$("steparea");var l=S.children(":visible");for(var i=0;i<l.length;i++){var C=q(l.get(i));if(o(S,C)==0){return C;}}return null;};R.setStepLabel=function(S,L){var l=L?e(L):"";S.$("label").html(l);S.$("expandend-label").html(l);if(!sap.ui.getCore().getConfiguration().getAccessibility()){return;}S.$("box").attr("aria-label",c(S,L));S.$("expandend-box").attr("aria-label",c(S,L));};R.setStepEnabled=function(i,S,E){var j=S.$();var l=S.$("expandend");if(E){j.removeClass("sapUiRoadMapDisabled");l.removeClass("sapUiRoadMapDisabled");if(sap.ui.getCore().getConfiguration().getAccessibility()){S.$("box").removeAttr("aria-disabled");S.$("expandend-box").removeAttr("aria-disabled");}return false;}else{var x=i.getSelectedStep()==S.getId();if(x){j.removeClass("sapUiRoadMapSelected");}j.addClass("sapUiRoadMapDisabled");l.addClass("sapUiRoadMapDisabled");if(sap.ui.getCore().getConfiguration().getAccessibility()){var y=S.$("box");y.attr("aria-disabled",true);if(x){y.removeAttr("aria-checked");}S.$("expandend-box").attr("aria-disabled",true);}return x;}};R.setStepVisible=function(j,S,I,V){var l=S.$();var x=S.$("expandend");var y=j.getSelectedStep()==S.getId();var P=S.getParent();if(I){if(P.getEnabled()&&P.getVisible()&&P.getExpanded()){if(V){l.removeClass("sapUiRoadMapHidden");}else{l.addClass("sapUiRoadMapHidden");}}}else{if(V){l.removeClass("sapUiRoadMapHidden");}else{l.addClass("sapUiRoadMapHidden");}var z=S.getSubSteps();if(z.length>0&&S.getExpanded()){if(V){x.removeClass("sapUiRoadMapHidden");}else{x.addClass("sapUiRoadMapHidden");}for(var i=0;i<z.length;i++){if(z[i].getVisible()){var A=z[i].$();if(j.getSelectedStep()==z[i].getId()){y=true;A.removeClass("sapUiRoadMapSelected");z[i].$("box").removeAttr("aria-checked");}if(V){A.removeClass("sapUiRoadMapHidden");}else{A.addClass("sapUiRoadMapHidden");}}}}}return y;};R.setRoadMapWidth=function(i,W){var j=i.$();j.attr("style","width:"+(W?W:"100%")+";");};R.scrollToNextStep=function(i,j,E){var P=j;if(j=="first"||j=="last"){P=t(i,j=="last");}v(i,P,false,E);};R.addEllipses=function(S){if(!S){return;}var j=S.$("label");var O=S.getLabel();var T=O+"";var C=q("<label class=\"sapUiRoadMapTitle\" style=\"display:none;position:absolute;overflow:visible;font-weight:bold;height:auto\">"+T+"</label>");C.width(j.width());q(sap.ui.getCore().getStaticAreaRef()).append(C);var i=false;while(T.length>0&&C.height()>j.height()){T=T.substr(0,T.length-1);C.html(e(T+"..."));i=true;}if(i){j.html("<span>"+e(T)+"</span>");j.attr("title",S.getLabel());}else{j.attr("title",g(S));}C.remove();};R.updateStepAria=function(S){if(!sap.ui.getCore().getConfiguration().getAccessibility()){return;}var I=S.getParent()instanceof sap.ui.commons.RoadMap;var j=S.getParent()[I?"getSteps":"getSubSteps"]();for(var i=0;i<j.length;i++){var P=d(j[i]);var l=f(j[i]);var x=j[i].$("box");x.attr("aria-posinset",P);x.attr("aria-setsize",l);if(I&&j[i].getSubSteps().length>0){x=j[i].$("expandend-box");x.attr("aria-posinset",P);x.attr("aria-setsize",l);}}};var Q=function(i){return q(i?document.getElementById(i):null);};var r=function(i,j,S){var T=S?"Start":"End";i.write("<div");i.writeAttribute("id",j.getId()+"-"+T);i.writeAttribute("tabindex","-1");var l=true;i.addClass(l?"sapUiRoadMap"+T+"Scroll":"sapUiRoadMap"+T+"Fixed");i.addClass("sapUiRoadMapDelim");i.addClass("sapUiRoadMapContent");i.writeClasses();i.write("></div>");};var a=function(j,l,S,A,x,I){j.write("<li");if(I){j.writeAttribute("id",I);}else{j.writeElementData(S);}var y=k(l,S);S.__stepName=y;var T=g(S);j.addClass("sapUiRoadMapContent");j.addClass("sapUiRoadMapStep");if(!S.getVisible()){j.addClass("sapUiRoadMapHidden");}if(S.getEnabled()){if(l.getSelectedStep()==S.getId()){j.addClass("sapUiRoadMapSelected");}}else{j.addClass("sapUiRoadMapDisabled");}if(A){for(var i=0;i<A.length;i++){j.addClass(A[i]);}}j.writeClasses();j.write(">");b(j,I?I:S.getId(),1);j.write("<div");j.writeAttribute("id",(I?I:S.getId())+"-box");j.writeAttribute("tabindex","-1");j.addClass("sapUiRoadMapStepBox");j.writeClasses();j.writeAttributeEscaped("title",T);w(j,l,S,x?true:false);j.write("><span>");j.write(y);j.write("</span>");if(x){x(j,l,S);}j.write("</div>");j.write("<label");j.writeAttribute("id",(I?I:S.getId())+"-label");j.addClass("sapUiRoadMapTitle");j.writeAttributeEscaped("title",T);j.writeClasses();j.write(">");var L=S.getLabel();if(L){j.writeEscaped(L);}j.write("</label>");b(j,I?I:S.getId(),2);j.write("</li>");};var g=function(S){var T=S.getTooltip_AsString();if(!T&&!S.getTooltip()&&sap.ui.getCore().getConfiguration().getAccessibility()){T=m("RDMP_DEFAULT_STEP_TOOLTIP",[S.__stepName]);}return T||"";};var b=function(i,I,j){i.write("<div");i.writeAttribute("id",I+"-add"+j);i.addClass("sapUiRoadMapStepAdd"+j);i.writeClasses();i.write("></div>");};var w=function(i,j,S,I){if(!sap.ui.getCore().getConfiguration().getAccessibility()){return;}i.writeAttribute("role","treeitem");if(S.getEnabled()){i.writeAttribute("aria-checked",j.getSelectedStep()==S.getId());}else{i.writeAttribute("aria-disabled",true);}i.writeAttribute("aria-haspopup",I);i.writeAttribute("aria-level",S.getParent()instanceof sap.ui.commons.RoadMap?1:2);i.writeAttribute("aria-posinset",d(S));i.writeAttribute("aria-setsize",f(S));i.writeAttributeEscaped("aria-label",c(S,S.getLabel()));if(!I){return;}i.writeAttribute("aria-expanded",S.getExpanded());};var c=function(S,l){var i=S.getParent()instanceof sap.ui.commons.RoadMap&&S.getSubSteps().length>0;var j=l||"";if(S.getEnabled()){j=m(i?"RDMP_ARIA_EXPANDABLE_STEP":"RDMP_ARIA_STANDARD_STEP",[j]);}return j;};var d=function(S){var I=S.getParent()instanceof sap.ui.commons.RoadMap;var j=S.getParent()[I?"indexOfStep":"indexOfSubStep"](S);var C=0;var l=S.getParent()[I?"getSteps":"getSubSteps"]();for(var i=0;i<j;i++){if(!l[i].getVisible()){C++;}}return j+1-C;};var f=function(S){var I=S.getParent()instanceof sap.ui.commons.RoadMap;var j=S.getParent()[I?"getSteps":"getSubSteps"]();var C=j.length;for(var i=0;i<j.length;i++){if(!j[i].getVisible()){C--;}}return C;};var h=function(j,l,S){var C=function(j,l,z,A,B){j.write("<div");j.writeAttribute("id",z+"-ico");j.addClass("sapUiRoadMapStepIco");if(B){j.addClass(B);}j.writeClasses();j.write("></div>");};var I=S.getExpanded();a(j,l,S,I?["sapUiRoadMapExpanded"]:null,function(j,l,S){C(j,l,S.getId(),I?"roundtripstart.gif":"roundtrip.gif");});var x=S.getSubSteps();for(var i=0;i<x.length;i++){var y=["sapUiRoadMapSubStep"];if(!I&&x[i].getVisible()){y.push("sapUiRoadMapHidden");}a(j,l,x[i],y);}y=["sapUiRoadMapExpanded","sapUiRoadMapStepEnd"];if(!I){y.push("sapUiRoadMapHidden");}a(j,l,S,y,function(j,l,S){C(j,l,S.getId()+"-expandend","roundtripend.gif");},S.getId()+"-expandend");};var k=function(i,S){var P=S.getParent();if(P===i){return P.indexOfStep(S)+1;}var I=P.indexOfSubStep(S);if(I<26){return String.fromCharCode(97+I);}var j=Math.floor(I/26)-1;var l=I%26;return String.fromCharCode(97+j,97+l);};var u=function(i){var j=p();var S=i.$("steparea");var l=s(S);var x=i.$("Start");x.removeClass("sapUiRoadMapStartScroll").removeClass("sapUiRoadMapStartFixed");x.addClass(j*l>=i.iStepWidth?"sapUiRoadMapStartScroll":"sapUiRoadMapStartFixed");var E=i.$("End");E.removeClass("sapUiRoadMapEndScroll").removeClass("sapUiRoadMapEndFixed");var y=S.get(0).scrollWidth-j*l-S.width()<i.iStepWidth;E.addClass(y?"sapUiRoadMapEndFixed":"sapUiRoadMapEndScroll");};var m=function(K,A){var i=sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons");if(i){return i.getText(K,A);}return K;};var n=function(l){var x=0;var S=l.getSteps();for(var i=0;i<S.length;i++){if(S[i].getVisible()){x++;if(S[i].getExpanded()){x++;var y=S[i].getSubSteps();for(var j=0;j<y.length;j++){if(y[j].getVisible()){x++;}}}}}return x;};var o=function(S,j){var P=j.position().left;if(sap.ui.getCore().getConfiguration().getRTL()){P=S.width()-P-j.outerWidth();}return P;};var p=function(){return sap.ui.getCore().getConfiguration().getRTL()?-1:1;};var s=function(S){if(sap.ui.getCore().getConfiguration().getRTL()&&D.browser.webkit){return(-1)*(S.get(0).scrollWidth-S.scrollLeft()-S.width());}return S.scrollLeft();};var t=function(i,l){var S=i.$("steparea").get(0).scrollWidth;if(sap.ui.getCore().getConfiguration().getRTL()&&D.browser.webkit){return l?0:(-1)*S;}return l?S:0;};var v=function(i,N,S,E){var j=i.$("steparea");j.stop(false,true);if(N=="next"){N=j.scrollLeft()+i.iStepWidth*p();}else if(N=="prev"){N=j.scrollLeft()-i.iStepWidth*p();}else if(N=="keep"){N=j.scrollLeft();}else{N=N*p();}var l=function(){u(i);if(E){var F=R.getFirstVisibleRef(i);E(F.attr("id"));}};if(!q.fx.off&&!S){j.animate({scrollLeft:N},"fast",l);}else{j.scrollLeft(N);l();}};return R;},true);
