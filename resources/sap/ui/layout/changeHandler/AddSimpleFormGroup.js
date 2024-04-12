/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/changeHandler/Base","sap/ui/core/util/reflection/JsControlTreeModifier","sap/base/Log"],function(B,J,L){"use strict";var A={};A.CONTENT_AGGREGATION="content";var f=function(M,s,c){return c.reduce(function(p,C){return p.then(function(r){if(r!==undefined){return r;}var t=M.getControlType(C);if(s.indexOf(t)===-1){return Promise.resolve().then(M.getVisible.bind(M,C)).then(function(v){return v||undefined;});}else{return false;}});},Promise.resolve());};var m=function(M,s,c,g){var r;var C=-1;if(g===0){return g;}return f(M,s,c).then(function(F){if(F){C++;}for(var i=0;i<c.length;i++){var t=M.getControlType(c[i]);if(s.indexOf(t)>-1){C++;if(C===g){r=c[i];return c.indexOf(r);}}}return c.length;});};A.applyChange=function(c,F,p){var M=p.modifier;var v=p.view;var a=p.appComponent;var i;var C=c.getDefinition();if(C.texts&&C.texts.groupLabel&&C.texts.groupLabel.value&&C.content&&C.content.group&&(C.content.group.selector||C.content.group.id)){var g=C.content.group.selector;var G;if(g){if(g.idIsLocal){G=a.createId(g.id);}else{G=g.id;}}else{G=C.content.group.id;}c.setRevertData({groupId:G});var l=C.texts.groupLabel.value;var r;return Promise.resolve().then(function(){return M.getAggregation(F,A.CONTENT_AGGREGATION);}).then(function(b){if(typeof C.content.group.index==="number"){return C.content.group.index;}else{r=C.content.group.relativeIndex;return m(M,["sap.ui.core.Title","sap.m.Title","sap.m.Toolbar","sap.m.OverflowToolbar"],b,r);}}).then(function(R){i=R;if(M.bySelector(G,a)){return B.markAsNotApplicable("Control to be created already exists:"+G);}return M.createControl("sap.ui.core.Title",a,v,G);}).then(function(t){M.setProperty(t,"text",l);return M.insertAggregation(F,"content",t,i,v);});}else{L.error("Change does not contain sufficient information to be applied: ["+C.layer+"]"+C.namespace+"/"+C.fileName+"."+C.fileType);}};A.completeChangeContent=function(c,s,p){var C=c.getDefinition();var a=p.appComponent;if(s.newLabel){B.setTextInChange(C,"groupLabel",s.newLabel,"XFLD");}else{throw new Error("oSpecificChangeInfo.newLabel attribute required");}if(!C.content){C.content={};}if(!C.content.group){C.content.group={};}if(s.newControlId){C.content.group.selector=J.getSelector(s.newControlId,a);}else{throw new Error("oSpecificChangeInfo.newControlId attribute required");}if(s.index===undefined){throw new Error("oSpecificChangeInfo.index attribute required");}else{C.content.group.relativeIndex=s.index;}};A.getControlIdFromChangeContent=function(c){var C;if(c&&c._oDefinition){C=c._oDefinition.content.group.id;}return C;};A.revertChange=function(c,F,p){var a=p.appComponent;var v=p.view;var M=p.modifier;var g=c.getRevertData().groupId;var G=M.getSelector(g,a);var o=M.bySelector(G,a,v);return Promise.resolve().then(function(){return M.removeAggregation(F,A.CONTENT_AGGREGATION,o);}).then(function(){M.destroy(o);c.resetRevertData();});};A.getChangeVisualizationInfo=function(c,a){var s=c.getDefinition().content.group.selector;var o=J.bySelector(s,a).getParent().getId();return{affectedControls:[o]};};return A;},true);