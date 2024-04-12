/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/base/DataType","sap/base/util/merge","sap/base/util/isPlainObject","sap/base/Log"],function(B,D,m,a,L){"use strict";var A={name:{type:"string",mandatory:true,allowedForComplexProperty:true},label:{type:"string",mandatory:true,allowedForComplexProperty:true},visible:{type:"boolean","default":{value:true},allowedForComplexProperty:true},path:{type:"string",valueForComplexProperty:null},typeConfig:{type:{className:{type:"string"},baseType:{type:"string"},typeInstance:{type:"object"}},valueForComplexProperty:null},maxConditions:{type:"int","default":{value:-1},valueForComplexProperty:null},caseSensitive:{type:"boolean","default":{value:true}},group:{type:"string",allowedForComplexProperty:true},groupLabel:{type:"string",allowedForComplexProperty:true},filterable:{type:"boolean","default":{value:true},valueForComplexProperty:false},sortable:{type:"boolean","default":{value:true},valueForComplexProperty:false},key:{type:"boolean",valueForComplexProperty:false},groupable:{type:"boolean",valueForComplexProperty:false},propertyInfos:{type:"PropertyReference[]",allowedForComplexProperty:true},unit:{type:"PropertyReference"},text:{type:"PropertyReference"},exportSettings:{type:"object","default":{value:{},ignoreIfNull:true},allowedForComplexProperty:true},visualSettings:{type:{widthCalculation:{type:{minWidth:{type:"int","default":{value:2}},maxWidth:{type:"int","default":{value:19}},defaultWidth:{type:"int","default":{value:8}},gap:{type:"float","default":{value:0}},includeLabel:{type:"boolean","default":{value:true}},verticalArrangement:{type:"boolean","default":{value:false}},excludeProperties:{type:"PropertyReference[]"}},"default":{value:{},ignoreIfNull:true}}},"default":{value:{}},allowedForComplexProperty:true},required:{type:"boolean"},hiddenFilter:{type:"boolean"}};var p={isComplex:function(){return P.isPropertyComplex(this);},getReferencedProperties:function(){return this.propertyInfosProperties||[];},getSortableProperties:function(){return o(this,function(i){return i.sortable;});},getFilterableProperties:function(){return o(this,function(i){return i.filterable;});},getGroupableProperties:function(){return o(this,function(i){return i.groupable;});},getVisibleProperties:function(){return o(this,function(i){return i.visible;});}};var c=["name","label","visible","path","typeConfig","maxConditions","group","groupLabel","caseSensitive"];var _=new WeakMap();function s(O){return JSON.stringify(O,function(K,V){return V===undefined?null:V;})||"";}function r(M,i){var y=s(i);L.warning("Invalid property definition: "+M+(y?"\n"+y:""));}function t(M,i){var y=i?s(i):null;throw new Error("Invalid property definition: "+M+(y?"\n"+y:""));}function e(i,y){y.map(function(z){Object.keys(p).forEach(function(M){Object.defineProperty(z,M,{value:function(){return p[M].call(this);},writable:true});});});}function d(O){var K=Object.getOwnPropertyNames(O);Object.freeze(O);for(var i=0;i<K.length;i++){var V=O[K[i]];if(typeof V==="function"){Object.freeze(V);}else if(a(V)&&!Object.isFrozen(V)){d(V);}else if(Array.isArray(V)){d(V);}}}function b(O,i){if(!i){return O;}return i.split(".").reduce(function(C,S){return C&&C[S]?C[S]:null;},O);}function g(i){var T;if(typeof i==="object"){T="object";}else{T=i.replace("PropertyReference","string");}return D.getType(T);}function f(i){var y=g(i);if(y.isArrayType()){return y.getBaseType().getDefaultValue();}else{return y.getDefaultValue();}}function h(i,y){y.forEach(function(z){i.prepareProperty(z);});d(y);}function j(i,y,z,C,E,F){var T=C==null;var G=[];var I=P.isPropertyComplex(y);if(T){F=_.get(i).mAttributeMetadata;E=y;}if(!E){return[];}for(var H in F){var J=F[H];var K=T?H:C+"."+H;var V=E[H];if(I&&!J.allowedForComplexProperty){if("valueForComplexProperty"in J){E[H]=J.valueForComplexProperty;}continue;}if(V!=null&&typeof J.type==="string"&&J.type.startsWith("PropertyReference")||K==="propertyInfos"){if(I||K!=="propertyInfos"){k(E,H,z);}continue;}if(V==null){l(E,J,C,H,G,V);}if(typeof J.type==="object"){G=G.concat(j(i,y,z,K,E[H],J.type));}}return G;}function k(i,y,z){var C=i[y];var E;var F=y;if(Array.isArray(C)){E=C.map(function(N){return z[N];});F+="Properties";}else{E=z[C];F+="Property";}Object.defineProperty(i,F,{value:E});}function l(i,y,S,z,C,V){if("default"in y){var E=y.default;if(V===null&&E.ignoreIfNull&&E.value!==undefined){return;}if(E.value===undefined){i[z]=f(y.type);}else if(typeof E.value==="string"&&E.value.startsWith("attribute:")){C.push({source:E.value.substring(E.value.indexOf(":")+1),targetPath:S,targetAttribute:z,targetType:y.type});}else if(typeof E.value==="object"){i[z]=m({},E.value);}else{i[z]=E.value;}}else{i[z]=f(y.type);}}function n(i){return Object.freeze(i.reduce(function(M,y){M[y.name]=y;return M;},{}));}function o(i,F){if(i.isComplex()){return i.getReferencedProperties().filter(F);}else if(F(i)){return[i];}else{return[];}}function q(i,y,z){for(var C in i){var E=i[C];var F=y==null?C:y+"."+C;if(y==="extension"){q(E.type,F);continue;}if(z&&E.allowedForComplexProperty!==false){E.allowedForComplexProperty=true;}if(typeof E.type==="object"){q(E.type,F,E.allowedForComplexProperty);}}}function u(y,E){var M=0;E=E||{};for(var i=0;i<y.length;i++){if("extension"in y[i]){t("Property contains invalid attribute 'extension'.",y[i]);}if(y[i].name in E){y[i].extension=E[y[i].name];M++;}else{y[i].extension={};}}if(M!==Object.keys(E).length){throw new Error("At least one property extension does not point to an existing property.");}}function v(i,y,z,E,C,F){var G={};var I=c.concat(C||[]).reduce(function(N,O){if(O in A){N[O]=A[O];}return N;},Object.assign({},i._mExperimentalAdditionalAttributes));if(F){G.mAttributeMetadata=Object.assign({extension:{type:F,mandatory:true,allowedForComplexProperty:true}},I);G.aMandatoryExtensionAttributes=Object.keys(F).filter(function(N){return F[N].mandatory;});}else{G.mAttributeMetadata=I;G.aMandatoryExtensionAttributes=[];}q(G.mAttributeMetadata);G.aMandatoryAttributes=Object.keys(G.mAttributeMetadata).filter(function(N){return G.mAttributeMetadata[N].mandatory;});var H=m([],z);var J=n(H);if(F){u(H,m({},E));}var K=_.get(i);var M=K&&K.aRawProperties;_.set(i,G);i.validateProperties(H,M);G.oParent=y||null;G.aRawProperties=z;G.aProperties=H;G.mProperties=J;G._={mExtensions:E,aAllowedAttributes:C,mExtensionAttributeMetadata:F};e(i,H);h(i,H);}var P=B.extend("sap.ui.mdc.util.PropertyHelper",{constructor:function(i,E,y,z,C){B.call(this);if(!Array.isArray(i)){t("Property infos must be an array.");}if(E){if(!C){throw new Error("Property extensions are not supported.");}else if(!a(E)){throw new Error("Property extensions must be a plain object.");}}if(y&&!B.isA(y,"sap.ui.base.ManagedObject")){throw new Error("The type of the parent is invalid.");}if(this._mExperimentalAdditionalAttributes){Object.keys(A).concat("extension").forEach(function(F){if(F in this._mExperimentalAdditionalAttributes){throw new Error("The attribute '"+F+"' is reserved and cannot be overridden by additional attributes.");}}.bind(this));}v(this,y,i,E,z,C);}});P.prototype.validateProperties=function(y,z){var U=new Set();for(var i=0;i<y.length;i++){this.validateProperty(y[i],y,z);U.add(y[i].name);}if(U.size!==y.length){t("Properties do not have unique names.");}};P.prototype.validateProperty=function(i,y,z){if(!a(i)){t("Property info must be a plain object.",i);}w(this,i,y);if(P.isPropertyComplex(i)){if(i.propertyInfos.length===0){t("Complex property does not reference existing properties.",i);}}_.get(this).aMandatoryAttributes.forEach(function(M){if(!(M in i)){r("Property does not contain mandatory attribute '"+M+"'.",i);}else if(i[M]==null){t("Property does not contain mandatory attribute '"+M+"'.",i);}});_.get(this).aMandatoryExtensionAttributes.forEach(function(M){if(!(M in i.extension)){r("Property does not contain mandatory attribute 'extension."+M+"'.",i);}else if(i.extension[M]==null){t("Property does not contain mandatory attribute 'extension."+M+"'.",i);}});};function w(i,y,z,C,E,F){var T=C==null;if(T){F=_.get(i).mAttributeMetadata;E=y;}for(var G in E){var H=F[G];var I=T?G:C+"."+G;var V=E[G];if(!H){r("Property contains invalid attribute '"+I+"'.",y);}else if(P.isPropertyComplex(y)&&!H.allowedForComplexProperty){r("Complex property contains invalid attribute '"+I+"'.",y);}else if(typeof H.type==="object"&&V&&typeof V==="object"){w(i,y,z,I,V,H.type);}else if(V!=null&&!g(H.type).isValid(V)){t("The value of '"+I+"' is invalid.",y);}else if(V&&typeof H.type==="string"&&H.type.startsWith("PropertyReference")){x(i,y,z,I,V,H);}}}function x(y,z,C,E,F,G){var H=G.type.endsWith("[]")?F:[F];var U=new Set(H);if(H.indexOf(z.name)>-1){t("Property references itself in the '"+E+"' attribute",z);}if(U.size!==H.length){t("Property contains duplicate names in the '"+E+"' attribute.",z);}for(var i=0;i<C.length;i++){if(U.has(C[i].name)){if(P.isPropertyComplex(C[i])){t("Property references complex properties in the '"+E+"' attribute.",z);}U.delete(C[i].name);}}if(U.size>0){t("Property references non-existing properties in the '"+E+"' attribute.",z);}}P.prototype.prepareProperty=function(i){var y=this.getPropertyMap();var z=j(this,i,y);z.forEach(function(C){var E=b(i,C.targetPath);if(E){var V=b(i,C.source);if(V==null){V=f(C.targetType);}E[C.targetAttribute]=V;if(typeof C.targetType==="string"&&C.targetType.startsWith("PropertyReference")){k(E,C.targetAttribute,y);}}});};P.prototype.getParent=function(){var i=_.get(this);return i?i.oParent:null;};P.prototype.setProperties=function(i){var y=_.get(this);v(this,y.oParent,i,y._.mExtensions,y._.aAllowedAttributes,y._.mExtensionAttributeMetadata);return this;};P.prototype.getProperties=function(){var i=_.get(this);return i?i.aProperties:[];};P.prototype.getPropertyMap=function(){var i=_.get(this);return i?i.mProperties:{};};P.prototype.getProperty=function(N){return this.getPropertyMap()[N]||null;};P.prototype.hasProperty=function(N){return N in this.getPropertyMap();};P.isPropertyComplex=function(i){return i!=null&&typeof i==="object"?"propertyInfos"in i:false;};P.prototype.getSortableProperties=function(){return this.getProperties().filter(function(i){return i.sortable;});};P.prototype.getFilterableProperties=function(){return this.getProperties().filter(function(i){return i.filterable;});};P.prototype.getGroupableProperties=function(){return this.getProperties().filter(function(i){return i.groupable;});};P.prototype.getKeyProperties=function(){return this.getProperties().filter(function(i){return i.key;});};P.prototype.getVisibleProperties=function(){return this.getProperties().filter(function(i){return i.visible;});};P.prototype.destroy=function(){B.prototype.destroy.apply(this,arguments);_.delete(this);};return P;});
