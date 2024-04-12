/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/mdc/util/IdentifierUtil','sap/ui/mdc/enum/ConditionValidated',"sap/ui/mdc/condition/ConditionConverter",'sap/ui/mdc/condition/FilterConverter','sap/base/Log','sap/base/util/merge'],function(I,C,a,F,L,m){"use strict";var b={getPropertyByKey:function(p,k){var P=null;p.some(function(o){if(I.getPropertyPath(o)===k){P=o;}return P!=null;});if(!P){p.some(function(o){if(I.getPropertyKey(o)===k){P=o;}return P!=null;});}return P;},getConditionsMap:function(f,p){var P,o,r={};if(!f||!f.isA("sap.ui.mdc.FilterBar")){L.error("instance of sap.ui.mdc.FilterBar expected");return r;}var c=f.getInternalConditions();for(var s in c){if(p.indexOf(s)>=0){P=[];if(c[s]){for(var i=0;i<c[s].length;i++){o={};o.operator=c[s][i].operator;if((o.operator==="EQ")&&(c[s][i].validated===C.Validated)){o.values=[c[s][i].values[0]];}else{o.values=c[s][i].values;}P.push(o);}r[s]=P;}}}return r;},getFilterInfo:function(t,c,p,d){var f={};d=d?d:[];var i,s,e={},o;var g={};if(p&&p.length>0){for(s in c){if(d.indexOf(s)<0){var P=b.getPropertyByKey(p,s);if(P){g[s]={type:P.typeConfig.typeInstance,caseSensitive:P.caseSensitive,baseType:P.typeConfig.baseType};e[s]=[];for(i=0;i<c[s].length;i++){o=m({},c[s][i]);e[s].push(a.toType(o,P.typeConfig.typeInstance,t.getTypeUtil?t.getTypeUtil():t));}}else{L.error("sap.ui.mdc.util.FilterUitl.js :","could not find propertyMetadata of : "+s);}}}if(Object.keys(e).length>0){f.filters=F.createFilters(e,g);}}return f;}};return b;});
