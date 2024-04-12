/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/each"],function(e){"use strict";var T=function(b,c){Object.assign(b,{_init:function(E){this._bExpandFirstLevel=E;this.mContextInfo={};this._initContexts();if(E&&!this._bFirstLevelExpanded){this._expandFirstLevel();}},_initContexts:function(s){this.aContexts=this.getRootContexts(0,Number.MAX_VALUE);for(var i=0,l=this.aContexts.length;i<l;i++){var o=this._getContextInfo(this.aContexts[i]);this._setContextInfo({oContext:this.aContexts[i],iLevel:0,bExpanded:o?o.bExpanded:false});}if(this._bExpandFirstLevel&&!this._bFirstLevelExpanded){this._expandFirstLevel(s);}},_expandFirstLevel:function(s){var t=this;if(this.aContexts&&this.aContexts.length>0){e(this.aContexts.slice(),function(i,C){if(!s){t._loadChildContexts(C);}t._getContextInfo(C).bExpanded=true;});this._bFirstLevelExpanded=true;}},_fnFireFilter:b._fireFilter,_fireFilter:function(){this._fnFireFilter.apply(this,arguments);this._initContexts(true);this._restoreContexts(this.aContexts);},_fnFireChange:b._fireChange,_fireChange:function(){this._fnFireChange.apply(this,arguments);this._initContexts(true);this._restoreContexts(this.aContexts);},_restoreContexts:function(C){var t=this;var n=[];e(C.slice(),function(i,o){var a=t._getContextInfo(o);if(a&&a.bExpanded){n.push.apply(n,t._loadChildContexts(o));}});if(n.length>0){this._restoreContexts(n);}},_loadChildContexts:function(C){var o=this._getContextInfo(C);var I=(this.aContexts?this.aContexts.indexOf(C):-1);var n=this.getNodeContexts(C,0,Number.MAX_VALUE);for(var i=0,l=n.length;i<l;i++){this.aContexts.splice(I+i+1,0,n[i]);var a=this._getContextInfo(n[i]);this._setContextInfo({oParentContext:C,oContext:n[i],iLevel:o.iLevel+1,bExpanded:a?a.bExpanded:false});}return n;},_getContextInfo:function(C){return C?this.mContextInfo[C.getPath()]:undefined;},_setContextInfo:function(d){if(d&&d.oContext){this.mContextInfo[d.oContext.getPath()]=d;}},getLength:function(){return this.aContexts?this.aContexts.length:0;},getContexts:function(s,l){return this.aContexts.slice(s,s+l);},getNodes:function(s,l){var C=this.getContexts(s,s+l);var n=[];for(var i=0;i<C.length;i++){var o=this._getContextInfo(C[i])||{};var a=C[i];n.push({context:a,level:o.iLevel,parent:o.oParentContext,nodeState:{expanded:o.bExpanded,collapsed:!o.bExpanded,selected:false}});}return n;},hasChildren:function(){return true;},nodeHasChildren:function(){return true;},getContextByIndex:function(r){return this.aContexts[r];},getLevel:function(C){var o=this._getContextInfo(C);return o?o.iLevel:-1;},isExpanded:function(r){var C=this.getContextByIndex(r);var o=this._getContextInfo(C);return o?o.bExpanded:false;},expandContext:function(C){var o=this._getContextInfo(C);if(o&&!o.bExpanded){this.storeSelection();this._loadChildContexts(C);o.bExpanded=true;this._fireChange();this.restoreSelection();}},expand:function(r){this.expandContext(this.getContextByIndex(r));},collapseContext:function(C,s){var o=this._getContextInfo(C);if(o&&o.bExpanded){this.storeSelection();for(var i=this.aContexts.length-1;i>0;i--){if(this._getContextInfo(this.aContexts[i]).oParentContext===C){this.aContexts.splice(i,1);}}o.bExpanded=false;if(!s){this._fireChange();}this.restoreSelection();}},collapse:function(r){this.collapseContext(this.getContextByIndex(r));},collapseToLevel:function(l){if(!l||l<0){l=0;}var C=this.aContexts.slice();for(var i=C.length-1;i>=0;i--){var a=this.getLevel(C[i]);if(a!=-1&&a>=l){this.collapseContext(C[i],true);}}this._fireChange();},toggleContext:function(C){var o=this._getContextInfo(C);if(o){if(o.bExpanded){this.collapseContext(C);}else{this.expandContext(C);}}},toggleIndex:function(r){this.toggleContext(this.getContextByIndex(r));},storeSelection:function(){var s=c.getSelectedIndices();var S=[];e(s,function(i,v){S.push(c.getContextByIndex(v));});this._aSelectedContexts=S;},restoreSelection:function(){c.clearSelection();var _=this._aSelectedContexts;e(this.aContexts,function(i,C){if(((_?_.indexOf(C):-1))>=0){c.addSelectionInterval(i,i);}});this._aSelectedContexts=undefined;},attachSelectionChanged:function(){return undefined;},detachSelectionChanged:function(){},clearSelection:function(){c._oSelection.clearSelection();},attachSort:function(){},detachSort:function(){}});b._init(c.getExpandFirstLevel());};return T;},true);
