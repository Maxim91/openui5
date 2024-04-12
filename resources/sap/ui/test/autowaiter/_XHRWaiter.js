/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/sinon","sap/ui/test/autowaiter/_utils","./WaiterBase"],function(s,_,W){"use strict";var x=[];var X=W.extend("sap.ui.test.autowaiter._XHRWaiter",{hasPending:function(){var H=x.length>0;if(H){l();}return H;}});var o=new X();var u=s.useFakeXMLHttpRequest;s.useFakeXMLHttpRequest=function(){var F=u.apply(this,arguments);h();return F;};function h(){var i=XMLHttpRequest.restore;if(i){XMLHttpRequest.restore=function(){var r=i.apply(this,arguments);x=g();return r;};}}h();var O=s.FakeXMLHttpRequest.prototype.open;s.FakeXMLHttpRequest.prototype.open=function(){return O.apply(this,c.apply(this,arguments));};var f=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(){return f.apply(this,c.apply(this,arguments));};var a=s.FakeXMLHttpRequest.prototype.send;s.FakeXMLHttpRequest.prototype.send=function(){d.call(this,true);return a.apply(this,arguments);};var b=XMLHttpRequest.prototype.send;XMLHttpRequest.prototype.send=function(){d.call(this);return b.apply(this,arguments);};function c(m,U,A){var i="XHR_WAITER_IGNORE:";this.url=U;this.method=m;this.async=A;if(m.startsWith(i)){var M=m.substring(i.length);arguments[0]=M;this.method=M;this.ignored=true;}return arguments;}function d(i){if(this.ignored){return;}var n={url:this.url,method:this.method,async:this.async,fake:i,trace:_.resolveStackTrace()};var N=e(n);if(this.async){x.push(n);o._oLogger.trace("New pending:"+N);this.addEventListener("readystatechange",function(){if(this.readyState===4){x.splice(x.indexOf(n),1);o._oLogger.trace("Finished:"+N);}});}else{o._oLogger.trace("Finished:"+N);}}function e(i){var m=i.fake?"\nFakeXHR: ":"\nXHR: ";m+="URL: '"+i.url+"' Method: '"+i.method+"' Async: '"+i.async+"'\nStack: "+i.trace;return m;}function l(){var F=g(true).length;var L="There are "+(x.length-F)+" open XHRs and "+F+" open FakeXHRs.";x.forEach(function(i){L+=e(i);});o._oHasPendingLogger.debug(L);}function g(i){return x.filter(function(j){return i?j.fake:!j.fake;});}return o;},true);