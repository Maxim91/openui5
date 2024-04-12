/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./UniversalDate','../CalendarType','./_Calendars'],function(U,C,_){"use strict";var P=U.extend("sap.ui.core.date.Persian",{constructor:function(){var a=arguments;if(a.length>1){a=e(a);}this.oDate=this.createDate(Date,a);this.sCalendarType=C.Persian;}});P.UTC=function(){var a=e(arguments);return Date.UTC.apply(Date,a);};P.now=function(){return Date.now();};var B=1300;function t(G){var j=l(G.year,G.month+1,G.day);return h(j);}function c(a){var j=g(a.year,a.month+1,a.day);return m(j);}function e(a){var G=Array.prototype.slice.call(a),b,d;if(typeof a[0]!=="number"||typeof a[1]!=="number"||(a[2]!==undefined&&typeof a[2]!="number")){G[0]=NaN;G[1]=NaN;G[2]=NaN;return G;}b={year:a[0],month:a[1],day:a[2]!==undefined?a[2]:1};d=c(b);G[0]=d.year;G[1]=d.month;G[2]=d.day;return G;}function f(j){var b=[-61,9,38,199,426,686,756,818,1111,1181,1210,1635,2060,2097,2192,2262,2324,2394,2456,3178],a=b.length,d=j+621,k=-14,q=b[0],r,s,u,v,w,n,i;for(i=1;i<a;i+=1){r=b[i];s=r-q;if(j<r){break;}k=k+o(s,33)*8+o(p(s,33),4);q=r;}n=j-q;k=k+o(n,33)*8+o(p(n,33)+3,4);if(p(s,33)===4&&s-n===4){k+=1;}v=o(d,4)-o((o(d,100)+1)*3,4)-150;w=20+k-v;if(s-n<6){n=n-s+o(s+4,33)*33;}u=p(p(n+1,33)-1,4);if(u===-1){u=4;}return{leap:u,gy:d,march:w};}function g(j,a,b){while(a<1){a+=12;j--;}while(a>12){a-=12;j++;}var r=f(j);return l(r.gy,3,r.march)+(a-1)*31-o(a,7)*(a-7)+b-1;}function h(j){var a=m(j).year,b=a-621,r=f(b),d=l(a,3,r.march),i,n,k;k=j-d;if(k>=0){if(k<=185){n=1+o(k,31);i=p(k,31)+1;return{year:b,month:n-1,day:i};}else{k-=186;}}else{b-=1;k+=179;if(r.leap===1){k+=1;}}n=7+o(k,30);i=p(k,30)+1;return{year:b,month:n-1,day:i};}function l(a,b,i){var d=o((a+o(b-8,6)+100100)*1461,4)+o(153*p(b+9,12)+2,5)+i-34840408;d=d-o(o(a+100100+o(b-8,6),100)*3,4)+752;return d;}function m(a){var j,i,b,d,k;j=4*a+139361631;j=j+o(o(4*a+183187720,146097)*3,4)*4-3908;i=o(p(j,1461),4)*5+308;b=o(p(i,153),5)+1;d=p(o(i,153),12)+1;k=o(j,1461)-100100+o(8-d,6);return{year:k,month:d-1,day:b};}function o(a,b){return~~(a/b);}function p(a,b){return a-~~(a/b)*b;}P.prototype._getPersian=function(){return t({day:this.oDate.getDate(),month:this.oDate.getMonth(),year:this.oDate.getFullYear()});};P.prototype._setPersian=function(a){var G=c(a);return this.oDate.setFullYear(G.year,G.month,G.day);};P.prototype._getUTCPersian=function(){return t({day:this.oDate.getUTCDate(),month:this.oDate.getUTCMonth(),year:this.oDate.getUTCFullYear()});};P.prototype._setUTCPersian=function(a){var G=c(a);return this.oDate.setUTCFullYear(G.year,G.month,G.day);};P.prototype.getDate=function(d){return this._getPersian().day;};P.prototype.getMonth=function(){return this._getPersian().month;};P.prototype.getYear=function(){return this._getPersian().year-B;};P.prototype.getFullYear=function(){return this._getPersian().year;};P.prototype.setDate=function(d){var a=this._getPersian();a.day=d;return this._setPersian(a);};P.prototype.setMonth=function(M,d){var a=this._getPersian();a.month=M;if(d!==undefined){a.day=d;}return this._setPersian(a);};P.prototype.setYear=function(y){var a=this._getPersian();a.year=y+B;return this._setPersian(a);};P.prototype.setFullYear=function(y,M,d){var a=this._getPersian();a.year=y;if(M!==undefined){a.month=M;}if(d!==undefined){a.day=d;}return this._setPersian(a);};P.prototype.getUTCDate=function(d){return this._getUTCPersian().day;};P.prototype.getUTCMonth=function(){return this._getUTCPersian().month;};P.prototype.getUTCFullYear=function(){return this._getUTCPersian().year;};P.prototype.setUTCDate=function(d){var a=this._getUTCPersian();a.day=d;return this._setUTCPersian(a);};P.prototype.setUTCMonth=function(M,d){var a=this._getUTCPersian();a.month=M;if(d!==undefined){a.day=d;}return this._setUTCPersian(a);};P.prototype.setUTCFullYear=function(y,M,d){var a=this._getUTCPersian();a.year=y;if(M!==undefined){a.month=M;}if(d!==undefined){a.day=d;}return this._setUTCPersian(a);};_.set(C.Persian,P);return P;});
