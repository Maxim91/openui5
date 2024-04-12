/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./overlay/Overlay","sap/ui/documentation/sdk/controller/util/ResponsiveImageMap"],function(O,R){"use strict";var C="200",r=/.+\/(.+)/;var t=function(a,$,b){if(b){$.setAttribute(a,true);}else{$.removeAttribute(a);}};var S=function(d){var m=d.querySelector('map'),M=d.querySelector(".imagemap");R.call(this,d);this.oHighlighter=new O(this.oImg.parentNode);this.oMapWrapper=M;this.aSections=[].slice.call(d.querySelectorAll(":scope > section"));this.bStatic=d.dataset.staticType==="true";this.bRestoreSize=false;this.oMap=m;this.fnHandlers=Object.assign(this.fnHandlers,{click:this.onclick.bind(this),imgTransitionend:this.ontransitionendImage.bind(this),imgTransitionstart:this.ontransitionstartImage.bind(this),imgMouseenter:this.onmouseenterImage.bind(this),imgMouseleave:this.onmouseleaveImage.bind(this)});this.areas.forEach(function(a){a.element.addEventListener("click",this.fnHandlers.click);},this);if(!this.bStatic){this.setWidth(this.iOriginalWidth);this.oMapWrapper.addEventListener("transitionstart",this.fnHandlers.imgTransitionstart);this.oMapWrapper.addEventListener("transitionend",this.fnHandlers.imgTransitionend);this.oMapWrapper.addEventListener("mouseenter",this.fnHandlers.imgMouseenter);this.oMapWrapper.addEventListener("mouseleave",this.fnHandlers.imgMouseleave);}this.showSection(this.aSections[0].getAttribute("id"));};S.prototype=Object.create(R.prototype);S.prototype.constructor=S;S.prototype.showSection=function(s){this.aSections.forEach(function(o){t("hidden",o,o.getAttribute("id")!==s);});};S.prototype.onmouseenterImage=function(){if(this.bRestoreSize){this.setWidth(this.iOriginalWidth);this.bRestoreSize=false;}};S.prototype.onmouseleaveImage=function(e){if(this.oMap.contains(e.relatedTarget)||this.oImg.contains(e.relatedTarget)){return;}this.bRestoreSize=true;};S.prototype.ontransitionendImage=function(e){if(e.propertyName==="width"){this.bAreasDisabled=false;this.resize();}};S.prototype.ontransitionstartImage=function(e){if(e.propertyName==="width"){this.bAreasDisabled=true;}};S.prototype.highlightArea=function(a){var c=a.coords,s=a.getAttribute("shape");this.oHighlighter.setShape(s,c);this.oHighlighter.show();};S.prototype.resizeHighlighter=function(){var o=this.oMapWrapper.getBoundingClientRect(),w=o.width,h=o.height;this.oHighlighter.setSize(w,h);};S.prototype.onclick=function(e){if(this.bAreasDisabled){return;}var T=e.target.alt.match(r)[1];e.preventDefault();this.showSection(T);this.resizeHighlighter();this.highlightArea(e.target);if(!this.bStatic){this.setWidth(C);}};S.prototype.removeEventListeners=function(){R.prototype.removeEventListeners.call(this);this.areas.forEach(function(a){a.element.removeEventListener("click",this.fnHandlers.click);},this);if(!this.bStatic){this.oImg.removeEventListener("transitionend",this.fnHandlers.imgTransitionend);this.oImg.removeEventListener("mouseenter",this.fnHandlers.imgMouseenter);this.oImg.removeEventListener("mouseleave",this.fnHandlers.imgMouseleave);}};S.prototype.getTooltipText=function(e){var T=e.target.getAttribute('title'),s,o,a;if(!T){s=e.target.alt.match(r)[1];o=this.getSection(s);if(o){a=o.querySelector(".title");T=a&&a.textContent;}}return T;};S.prototype.setWidth=function(w){this.oMapWrapper.style.width=w+"px";};S.prototype.getSection=function(s){return this.aSections.find(function(o){return o.id===s;});};return S;});
