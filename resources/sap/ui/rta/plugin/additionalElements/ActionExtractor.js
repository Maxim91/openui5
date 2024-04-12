/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/restricted/_difference","sap/base/util/merge","sap/base/Log","sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/dt/ElementUtil","sap/ui/dt/OverlayRegistry","sap/ui/fl/apply/api/DelegateMediatorAPI","sap/ui/rta/plugin/additionalElements/AdditionalElementsUtils","sap/ui/rta/Utils"],function(d,m,L,J,E,O,D,A,U){"use strict";var a={};function l(){var k=[];var r=D.getKnownDefaultDelegateLibraries();r.forEach(function(s){var o=sap.ui.getCore().loadLibrary(s,{async:true}).then(function(){return Promise.resolve(s);}).catch(function(v){L.warning("Required library not available: ",v);return Promise.resolve();});k.push(o);});return Promise.all(k);}function g(k,o,p){return p.hasChangeHandler(k.changeType,k.element).then(function(H){if(H){return{aggregationName:k.aggregation,addPropertyActionData:{designTimeMetadata:o,action:k,delegateInfo:{payload:k.delegateInfo.payload||{},delegate:k.delegateInfo.instance,modelType:k.delegateInfo.modelType,requiredLibraries:k.delegateInfo.requiredLibraries}}};}return undefined;});}function c(s,S,p){var P=A.getParents(s,S,p);var o=P.parentOverlay&&P.parentOverlay.getDesignTimeMetadata();var k=o?o.getActionDataFromAggregations("addODataProperty",P.parent):[];if(k.length>0){L.error("Outdated addODataProperty action in designtime metadata in "+o.getData().designtimeModule+" or propagated or via instance specific designtime metadata.");}var n=o?o.getActionDataFromAggregations("add",P.parent):[];n.forEach(function(q){if(q["custom"]){L.error("Outdated custom add action in designtime metadata in "+o.getData().designtimeModule+" or propagated or via instance specific designtime metadata.");}});}function b(p,s,P){var o=p.getElement();if(!o){return[];}var I=E.getAggregation(o,s,P).filter(function(C){var k=O.getOverlay(C);if(!P.hasStableId(k)){return false;}var r=p.getRelevantContainer(true);var R=O.getOverlay(r);var n=p;var q=false;do{q=!n.getElementVisibility();if(q){break;}if(n===R){break;}else{n=n.getParentElementOverlay();}}while(n);if(q){return true;}return k.getElementVisibility()===false;},this);return I.map(function(k){return{element:k,sourceAggregation:s};});}function e(p,C){return C.sParentAggregationName;}function i(C,p,k,P){var v=k.changeType&&P.hasStableId(C);if(v&&C!==p.relevantContainerOverlay){v=P.hasStableId(p.relevantContainerOverlay);}return v;}function f(k,p,P,n){function F(o,q){var C=q.changeOnRelevantContainer?p.relevantContainer:p.parent;var r=O.getOverlay(C);var v=i(r,p,q,P);if(v){q.element=C;return D.getDelegateForControl({control:p.relevantContainer,modifier:J,supportsDefault:q.supportsDefaultDelegate}).then(function(s){if(s&&s.names&&s.names.length){var R=D.getRequiredLibrariesForDefaultDelegate({delegateName:s.names,control:p.relevantContainer});if(d(R,n.filter(Boolean)).length===0){q.delegateInfo=s;o.push(q);}}return o;});}return o;}return k.reduce(function(o,q){return o.then(function(r){return F(r,q);});},Promise.resolve([]));}function h(p,_,s,k,P){var I=p.reduce(function(n,q){var t=[];k.forEach(function(u){t=t.concat(b.call(this,q,u,P));}.bind(this),[]);return q?n.concat(t):n;}.bind(this),[]);var o={elements:[],controlTypeNames:[]};var r=I.reduce(function(n,q){return n.then(function(R){return j(R,q,P,s);});},Promise.resolve(o));return r.then(function(R){if(R.elements.length>0){_[s]={reveal:R};}return _;});}function j(r,I,p,t){var o=I.element;var k;var R;var n=false;var H=Promise.resolve(false);var s=I.sourceAggregation;var q=O.getOverlay(o);if(q){k=q.getDesignTimeMetadata();R=k&&k.getAction("reveal",o);if(R&&R.changeType){var u=o;if(R.changeOnRelevantContainer){u=q.getRelevantContainer();}H=p.hasChangeHandler(R.changeType,u).then(function(v){if(E.isElementValid(o)){var P=A.getParents(true,q,p);if(v){if(R.changeOnRelevantContainer){n=p.hasStableId(P.relevantContainerOverlay)&&p.hasStableId(P.parentOverlay);}else{n=true;}if(!R.getAggregationName){R.getAggregationName=e;}if(n&&(s!==t)){var w=P.parentOverlay.getAggregationOverlay(t);return U.checkTargetZone(w,q,p);}}}return n;});}}return H.then(function(v){if(v){r.elements.push({element:o,designTimeMetadata:k,action:R,sourceAggregation:s,targetAggregation:t});var N=k.getName(o);if(N){r.controlTypeNames.push(N);}}return r;});}a.getActions=function(s,S,p,I){var k=s?"asSibling":"asChild";if(!I&&S._mAddActions){return Promise.resolve(S._mAddActions[k]);}var r=this._getRevealActions(s,S,p);var o=this._getAddViaDelegateActions(s,S,p);return Promise.all([r,o,c(s,S,p)]).then(function(n){var q=m(n[0],n[1]);S._mAddActions=S._mAddActions||{asSibling:{},asChild:{}};S._mAddActions[k]=q;return q;});};a.getActionsOrUndef=function(s,o){var S=s?"asSibling":"asChild";return o._mAddActions&&o._mAddActions[S];};a._getRevealActions=function(s,S,p){var P=A.getParents(s,S,p);var k=[P.parentOverlay];if(P.relevantContainer!==P.parent){k=E.findAllSiblingsInContainer(P.parent,P.relevantContainer).map(function(o){return O.getOverlay(o);}).filter(function(o){return o;});}var n=[];if(P.parentOverlay){n=P.parentOverlay.getAggregationOverlays().filter(function(o){return!o.getDesignTimeMetadata().isIgnored(P.parent);}).map(function(o){return o.getAggregationName();});return n.reduce(function(o,q){return o.then(function(r){return h(k,r,q,n,p);});},Promise.resolve({}));}return Promise.resolve({});};a._getAddViaDelegateActions=function(s,S,p){var P=A.getParents(s,S,p);var o=P.parentOverlay&&P.parentOverlay.getDesignTimeMetadata();return Promise.resolve().then(function(){var k=o?o.getActionDataFromAggregations("add",P.parent,undefined,"delegate"):[];if(k.length){return l().then(f.bind(this,k,P,p));}return[];}.bind(this)).then(function(k){return k.reduce(function(n,q){return n.then(function(r){return g.call(this,q,o,p).then(function(t){if(t){t.addPropertyActionData.relevantContainer=P.relevantContainer;if(!r[t.aggregationName]){r[t.aggregationName]={};}r[t.aggregationName].addViaDelegate=t.addPropertyActionData;}return r;});}.bind(this));}.bind(this),Promise.resolve({}));}.bind(this));};return a;});
