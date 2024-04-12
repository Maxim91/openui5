/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/base/EventProvider','sap/ui/core/routing/Target','sap/ui/core/routing/async/Route','sap/ui/core/routing/sync/Route','sap/ui/core/Component',"sap/base/Log","sap/base/assert","sap/base/util/deepExtend"],function(E,T,a,s,C,L,b,d){"use strict";var R=E.extend("sap.ui.core.routing.Route",{metadata:{publicMethods:["getURL","getPattern"]},constructor:function(r,c,p){E.apply(this,arguments);this._validateConfig(c);this._aPattern=[];this._aRoutes=[];this._oParent=p;this._oConfig=c;this._oRouter=r;var t=this,v=c.pattern,S,e,o,f,g=r._isAsync();f=g?a:s;for(var h in f){this[h]=f[h];}if(!Array.isArray(v)){v=[v];}if(c.parent){var j=this._getParentRoute(c.parent);if(!j){L.error("No parent route with '"+c.parent+"' could be found",this);}else if(j._aPattern.length>1){L.error("Routes with multiple patterns cannot be used as parent for nested routes",this);return;}else{this._oNestingParent=j;v.forEach(function(l,i){var n=j._aPattern[0];n=n.charAt(n.length)==="/"?n:n+"/";v[i]=n+l;});}}if(Array.isArray(c.subroutes)){S=c.subroutes;c.subroutes={};S.forEach(function(i){c.subroutes[i.name]=i;});}if(!c.target){var k=this._convertToTargetOptions(c);k._async=g;this._oTarget=new T(k,r._oViews,p&&p._oTarget);this._oTarget._bUseRawViewId=true;}if(c.subroutes){for(e in c.subroutes){o=c.subroutes[e];if(o.name===undefined){o.name=e;}r.addRoute(o,t);}}if(c.pattern===undefined){return;}v.forEach(function(i,I){t._aPattern[I]=i;t._aRoutes[I]=r._oRouter.addRoute(i);t._checkRoute(t._aRoutes[I]);t._aRoutes[I].greedy=c.greedy;t._aRoutes[I].matched.add(function(){var A={};Array.from(arguments).forEach(function(l,m){A[t._aRoutes[I]._paramsIds[m]]=l;});t._routeMatched(A,true);});t._aRoutes[I].switched.add(function(){t._routeSwitched();});});},_checkRoute:function(r){var p=r._paramsIds;if(Array.isArray(p)){var D=p.filter(function(P){return P.charAt(0)==="?";}).filter(function(P){return p.indexOf(P.substring(1))>-1;}).map(function(P){return P.substring(1);});if(D.length>0){throw Error("The config of route '"+this._oConfig.name+"' contains standard parameter and query parameter with the same name: '"+D+"'. The name of the routing parameters and query parameter have to differentiate.");}}},_routeSwitched:function(){this._suspend();this.fireEvent("switched",{name:this._oConfig.name});},_suspend:function(){if(this._oRouter._oTargets){this._oRouter._oTargets.suspend(this._oConfig.target);if(this._oConfig.dynamicTarget){this._oRouter._oTargets.suspend(this._oConfig.dynamicTarget);}}},_resume:function(){if(this._oRouter._oTargets){this._oRouter._oTargets.resume(this._oConfig.target);if(this._oConfig.dynamicTarget){this._oRouter._oTargets.resume(this._oConfig.dynamicTarget);}}},destroy:function(){E.prototype.destroy.apply(this);this._aPattern=null;this._aRoutes=null;this._oParent=null;this._oConfig=null;this.bIsDestroyed=true;return this;},getURL:function(p){return this._aRoutes[0].interpolate(p||{});},_alignTargetsConfig:function(t){if(!t){return[];}if(!Array.isArray(t)){return(typeof t==="string")?[{name:t}]:[t];}return t.map(function(v){if(typeof v==="string"){v={name:v};}return v;});},_changeHashWithComponentTargets:function(c,p){var t=this._alignTargetsConfig(this._oConfig.target),o=this._oRouter._oTargets,e,l;if(t&&t.length>0&&o){e=o.getTarget(t);if(!Array.isArray(e)){e=[e];}}else{e=[];}var f=this;l=e.map(function(g,i){if(g._oOptions.type==="Component"){var h=g._load({prefix:t[i].prefix,propagateTitle:t[i].hasOwnProperty("propagateTitle")?t[i].propagateTitle:f._oRouter._oConfig.propagateTitle});return h.then(function(j){var r=j.getRouter(),H=r&&r.getHashChanger(),k=c&&c[t[i].name],m=k&&k.route,n=r&&r.getRoute(m),q;if(k){if(n){q=r._getLastMatchedRouteName()!==m;H.setHash(n.getURL(k.parameters),p||!q);return n._changeHashWithComponentTargets(k.componentTargetInfo,p||q);}else{L.error("Can not navigate to route with name '"+m+"' because the route does not exist in component with id '"+j.getId()+"'");}}});}});return Promise.all(l);},getPattern:function(){return this._aPattern[0];},match:function(h){return this._aRoutes.some(function(r){return r.match(h);});},attachMatched:function(D,f,l){return this.attachEvent("matched",D,f,l);},detachMatched:function(f,l){return this.detachEvent("matched",f,l);},attachBeforeMatched:function(D,f,l){return this.attachEvent("beforeMatched",D,f,l);},detachBeforeMatched:function(f,l){return this.detachEvent("beforeMatched",f,l);},fireBeforeMatched:function(p){this.fireEvent("beforeMatched",p);return this;},attachPatternMatched:function(D,f,l){return this.attachEvent("patternMatched",D,f,l);},detachPatternMatched:function(f,l){return this.detachEvent("patternMatched",f,l);},_validateConfig:function(c){if(!c.name){L.error("A name has to be specified for every route",this);}if(c.viewName){L.error("The 'viewName' option shouldn't be used in Route. please use 'view' instead",this);}},_convertToTargetOptions:function(o){return d({},o,{rootView:o.targetParent,controlId:o.targetControl,controlAggregation:o.targetAggregation,clearControlAggregation:o.clearTarget,viewName:o.view,viewType:o.viewType,viewId:o.viewId});},_getParentRoute:function(p){var P=p.split(":");if(P.length===1||(P.length===2&&!P[0])){return this._oRouter.getRoute(P[P.length-1]);}else{b(this._oRouter._oOwner,"No owner component for "+this._oRouter._oOwner.getId());var o=C.getOwnerComponentFor(this._oRouter._oOwner);while(o){if(o.getMetadata().getName()===P[0]){var r=o.getRouter();return r.getRoute(P[1]);}o=C.getOwnerComponentFor(o);}return null;}},getPatternArguments:function(h){return this._aRoutes[0].extrapolate(h);}});R.M_EVENTS={BeforeMatched:"beforeMatched",Matched:"matched",PatternMatched:"patternMatched"};return R;});