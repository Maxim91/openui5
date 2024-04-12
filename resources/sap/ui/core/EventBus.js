/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/base/Object','sap/ui/base/EventProvider',"sap/base/assert","sap/base/Log"],function(B,E,a,L){"use strict";var b=B.extend("sap.ui.core.EventBus",{constructor:function(){B.apply(this);this._mChannels={};this._defaultChannel=new E();this._bIsSuspended=false;}});b.prototype.subscribe=function(C,e,f,l){if(typeof(e)==="function"){l=f;f=e;e=C;C=null;}a(!C||typeof(C)==="string","EventBus.subscribe: sChannelId must be empty or a non-empty string");a(typeof(e)==="string"&&e,"EventBus.subscribe: sEventId must be a non-empty string");a(typeof(f)==="function","EventBus.subscribe: fnFunction must be a function");a(!l||typeof(l)==="object","EventBus.subscribe: oListener must be empty or an object");var o=c(this,C);o.attachEvent(e,f,l);return this;};b.prototype.subscribeOnce=function(C,e,f,l){if(typeof(e)==="function"){l=f;f=e;e=C;C=null;}function o(){this.unsubscribe(C,e,o,undefined);f.apply(l||this,arguments);}return this.subscribe(C,e,o,undefined);};b.prototype.unsubscribe=function(C,e,f,l){if(typeof(e)==="function"){l=f;f=e;e=C;C=null;}a(!C||typeof(C)==="string","EventBus.unsubscribe: sChannelId must be empty or a non-empty string");a(typeof(e)==="string"&&e,"EventBus.unsubscribe: sEventId must be a non-empty string");a(typeof(f)==="function","EventBus.unsubscribe: fnFunction must be a function");a(!l||typeof(l)==="object","EventBus.unsubscribe: oListener must be empty or an object");var o=g(this,C);if(!o){return this;}o.detachEvent(e,f,l);if(o!=this._defaultChannel){var m=E.getEventList(o);var i=true;for(var I in m){if(o.hasListeners(I)){i=false;break;}}if(i){delete this._mChannels[C];}}return this;};b.prototype.publish=function(C,e,d){if(arguments.length==1){d=null;e=C;C=null;}else if(arguments.length==2){if(typeof(e)!="string"){d=e;e=C;C=null;}}if(this._bIsSuspended){L.warning("Failed to publish into channel '"+C+"'."+" The EventBus is suspended.",C+"#"+e,"sap.ui.core.EventBus");return;}d=d?d:{};a(!C||typeof(C)==="string","EventBus.publish: sChannelId must be empty or a non-empty string");a(typeof(e)==="string"&&e,"EventBus.publish: sEventId must be a non-empty string");a(typeof(d)==="object","EventBus.publish: oData must be an object");var o=g(this,C);if(!o){if(L.isLoggable(L.Level.DEBUG,"sap.ui.core.EventBus")){L.debug("Failed to publish into channel '"+C+"'."+" No such channel.",C,"sap.ui.core.EventBus");}return;}var f=E.getEventList(o)[e];if(Array.isArray(f)){f=f.slice();var I;for(var i=0,l=f.length;i<l;i++){I=f[i];this._callListener(I.fFunction,I.oListener||this,C,e,d);}}else if(L.isLoggable(L.Level.DEBUG,"sap.ui.core.EventBus")){L.debug("Failed to publish Event '"+e+"' in '"+C+"'."+" No listeners found.",C+"#"+e,"sap.ui.core.EventBus");}};b.prototype.getInterface=function(){return this;};b.prototype._callListener=function(C,l,s,e,d){C.call(l,s,e,d);};b.prototype.destroy=function(){this._defaultChannel.destroy();for(var d in this._mChannels){this._mChannels[d].destroy();}this._mChannels={};B.prototype.destroy.apply(this,arguments);};b.prototype.suspend=function(){this._bIsSuspended=true;};b.prototype.resume=function(){this._bIsSuspended=false;};function g(e,C){if(!C){return e._defaultChannel;}return e._mChannels[C];}function c(e,C){var o=g(e,C);if(!o&&C){e._mChannels[C]=new E();o=e._mChannels[C];}return o;}return b;});
