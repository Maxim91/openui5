/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./_Helper","./_Parser","sap/ui/model/Filter"],function(_,a,F){"use strict";var A={aggregate:{"*":{grandTotal:"boolean",max:"boolean",min:"boolean",name:"string",subtotals:"boolean",unit:"string",with:"string"}},"grandTotal like 1.84":"boolean",grandTotalAtBottomOnly:"boolean",group:{"*":{additionally:["string"]}},groupLevels:["string"],search:"string",subtotalsAtBottomOnly:"boolean"},r=/,|%2C|%2c/,b=new RegExp("^("+a.sODataIdentifier+"(?:/"+a.sODataIdentifier+")*"+")(?:"+a.sWhitespace+"+(?:asc|desc))?$"),c;function d(o,g,e,G,f,i,h){var D=o.aggregate[f],j=D.name||f,u=D.unit,w=D.with;if(G){if(w==="average"||w==="countdistinct"){throw new Error("Cannot aggregate totals with '"+w+"'");}j=f;f="UI5grand__"+f;}if(w){j+=" with "+w+" as "+f;}else if(D.name){j+=" as "+f;}e.push(j);if(u&&!e.includes(u)&&!h.includes(u,i+1)&&!g.includes(u)){e.push(u);}}function s(q){var t=[];if(q.$skip){t.push("skip("+q.$skip+")");}delete q.$skip;if(q.$top<Infinity){t.push("top("+q.$top+")");}delete q.$top;return t.join("/");}c={buildApply:function(o,q,l,f,m){var e,g="",G=[],h=o["grandTotal like 1.84"],i,I,L,M=[],S,j=[];function p(n,k){var t,D=o.aggregate[n];if(D[k]){t="UI5"+k+"__"+n;M.push(n+" with "+k+" as "+t);if(m){m[t]={measure:n,method:k};}}}q=Object.assign({},q);c.checkTypeof(o,A,"$$aggregation");o.groupLevels=o.groupLevels||[];I=!l||l>o.groupLevels.length;o.group=o.group||{};o.groupLevels.forEach(function(k){o.group[k]=o.group[k]||{};});i=I?Object.keys(o.group).sort().filter(function(k){return!o.groupLevels.includes(k);}):[o.groupLevels[l-1]];if(!l){i=o.groupLevels.concat(i);}o.aggregate=o.aggregate||{};e=Object.keys(o.aggregate).sort();if(l===1&&!f){e.filter(function(k){return o.aggregate[k].grandTotal;}).forEach(d.bind(null,o,[],G,h));}if(!f){e.forEach(function(k){p(k,"min");p(k,"max");});}e.filter(function(k){return I||o.aggregate[k].subtotals;}).forEach(d.bind(null,o,i,j,false));if(j.length){g="aggregate("+j.join(",")+")";}if(i.length){i.forEach(function(k){var n=o.group[k].additionally;if(n){i.push.apply(i,n);}});g="groupby(("+i.join(",")+(g?"),"+g+")":"))");}if(f){delete q.$count;}else if(q.$count){M.push("$count as UI5__count");delete q.$count;}if(q.$filter){g+="/filter("+q.$filter+")";delete q.$filter;}if(q.$orderby){g+="/orderby("+q.$orderby+")";delete q.$orderby;}S=s(q);if(h&&G.length){if(o.groupLevels.length){throw new Error("Cannot combine visual grouping with grand total");}g+="/concat(aggregate("+G.join(",")+"),aggregate("+M.join(",")+"),"+(S||"identity")+")";}else{if(M.length){g+="/concat(aggregate("+M.join(",")+"),"+(S||"identity")+")";}else if(S){g+="/"+S;}if(l===1&&q.$$leaves&&!f){L="groupby(("+Object.keys(o.group).sort().join(",")+"))/aggregate($count as UI5__leaves)";}delete q.$$leaves;if(G.length){g="concat("+(L?L+",":"")+"aggregate("+G.join(",")+"),"+g+")";}else if(L){g="concat("+L+","+g+")";}}if(o.search){g="search("+o.search+")/"+g;}if(q.$$filterBeforeAggregate){g="filter("+q.$$filterBeforeAggregate+")/"+g;delete q.$$filterBeforeAggregate;}if(g){q.$apply=g;}return q;},checkTypeof:function(v,t,p){if(Array.isArray(t)){if(!Array.isArray(v)){throw new Error("Not an array value for '"+p+"'");}v.forEach(function(e,i){c.checkTypeof(e,t[0],p+"/"+i);});}else if(typeof t==="object"){var I="*"in t;if(typeof v!=="object"||!v||Array.isArray(v)){throw new Error("Not an object value for '"+p+"'");}Object.keys(v).forEach(function(k){if(!I&&!(k in t)){throw new Error("Unsupported property: '"+p+"/"+k+"'");}c.checkTypeof(v[k],t[I?"*":k],p+"/"+k);});}else if(typeof v!==t){throw new Error("Not a "+t+" value for '"+p+"'");}},createPlaceholder:function(l,i,p){var P={"@$ui5.node.level":l};_.setPrivateAnnotation(P,"index",i);_.setPrivateAnnotation(P,"parent",p);return P;},extractSubtotals:function(o,g,C,e){var l=g["@$ui5.node.level"];Object.keys(o.aggregate).forEach(function(f){var D=o.aggregate[f],i,u=D.unit;if(!D.subtotals){return;}C[f]=g[f];if(e){e[f]=null;}if(u){C[u]=g[u];if(e){i=o.groupLevels.indexOf(u);if(i<0||i>=l){e[u]=null;}}}});},filterOrderby:function(q,o,l){var f=c.getFilteredOrderby(q.$orderby,o,l);q=Object.assign({},q);if(f){q.$orderby=f;}else{delete q.$orderby;}return q;},getAllProperties:function(o){var e=Object.keys(o.aggregate),g=Object.keys(o.group),f=e.concat(g);e.forEach(function(h){var u=o.aggregate[h].unit;if(u){f.push(u);}});g.forEach(function(G){var h=o.group[G].additionally;if(h){h.forEach(function(i){f.push(i.includes("/")?i.split("/"):i);});}});return f;},getFilteredOrderby:function(o,e,l){var i=!l||l>e.groupLevels.length;function f(n){return Object.keys(e.aggregate).some(function(j){var D=e.aggregate[j];return D.subtotals&&n===D.unit;});}function g(n){if(n in e.group&&(!l||!e.groupLevels.includes(n))){return true;}return Object.keys(e.aggregate).some(function(j){return n===e.aggregate[j].unit;})||Object.keys(e.group).some(function(G){return(!l||!e.groupLevels.includes(G))&&h(n,G);});}function h(n,G){return n===G||e.group[G].additionally&&e.group[G].additionally.includes(n);}if(o){return o.split(r).filter(function(O){var m=b.exec(O),n;if(m){n=m[1];return n in e.aggregate&&(i||e.aggregate[n].subtotals)||i&&g(n)||!i&&(h(n,e.groupLevels[l-1])||f(n));}return true;}).join(",");}},getOrCreateExpandedObject:function(o,g){var C,e=_.getPrivateAnnotation(g,"expanded");if(!e){C={"@$ui5.node.isExpanded":false};_.setPrivateAnnotation(g,"collapsed",C);e={"@$ui5.node.isExpanded":true};_.setPrivateAnnotation(g,"expanded",e);if(o.subtotalsAtBottomOnly!==undefined){c.extractSubtotals(o,g,C,o.subtotalsAtBottomOnly?e:null);}}return e;},hasGrandTotal:function(m){return Object.keys(m).some(function(e){return m[e].grandTotal;});},hasMinOrMax:function(m){return Object.keys(m).some(function(e){var D=m[e];return D.min||D.max;});},isAffected:function(o,f,S){function e(g,p){if(g.endsWith("/*")){g=g.slice(0,-2);}return _.hasPathPrefix(p,g)||_.hasPathPrefix(g,p);}function h(g,i){return i.some(function(j){return j.aFilters?h(g,j.aFilters):e(g,j.sPath);});}return S.some(function(g){var i=e.bind(null,g);return g===""||g==="*"||Object.keys(o.aggregate).some(function(j){var D=o.aggregate[j];return e(g,D.name||j);})||Object.keys(o.group).some(i)||o.groupLevels.some(i)||h(g,f);});},removeUI5grand__:function(g){Object.keys(g).forEach(function(k){if(k.startsWith("UI5grand__")){g[k.slice(10)]=g[k];delete g[k];}});},setAnnotations:function(e,i,I,l,f){e["@$ui5.node.isExpanded"]=i;e["@$ui5.node.isTotal"]=I;e["@$ui5.node.level"]=l;if(f){f.forEach(function(p){if(Array.isArray(p)){_.createMissing(e,p);}else if(!(p in e)){e[p]=null;}});}},splitFilter:function(f,o){var e=[],g=[];function i(f){return f.aFilters?f.aFilters.some(i):f.sPath in o.aggregate;}function h(f){if(f.aFilters&&f.bAnd){f.aFilters.forEach(h);}else{(i(f)?e:g).push(f);}}function w(j){return j.length>1?new F(j,true):j[0];}if(!o||!o.aggregate){return[f];}h(f);return[w(e),w(g)];}};return c;},false);
