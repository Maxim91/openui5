/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core","sap/ui/thirdparty/jquery","sap/ui/documentation/sdk/util/Resources","sap/base/Log"],function(C,q,R,L){"use strict";var _={},a=[],b=[],c=null,d=false,e='OLD_NEWS_IDS',f,g;function p(i){if(_["newsRSS"]){return Promise.resolve(_["newsRSS"]);}g=i;f=g.LOCAL_STORAGE_NAMES[e];return s().then(t).then(o).then(h).catch(function(v){c=v.message;L.error(c);}).finally(r);}function h(){if(d){return Promise.resolve();}var u=g.getLocalStorageItem(f);return new Promise(function(v){var I=_["newsRSS"].items,w;if(Array.isArray(u)){for(var i=0;i<I.length;i++){w=I[i];if(u.indexOf(w.id)!==-1){b.push(w);}else{a.push(w);}}}else{a=I.slice();}d=true;v();});}function j(){return c;}function k(){return a;}function l(){return b;}function m(i){var I=a.indexOf(i),u=g.getLocalStorageItem(f)||[];if(I>-1){a.splice(I,1);}b.push(i);u.push(i.id);g.setLocalStorageItem(f,u);r();}function n(){var u=g.getLocalStorageItem(f)||[],v;for(var i=0;i<a.length;i++){v=a[i];b.push(v);u.push(v.id);}a=[];g.setLocalStorageItem(f,u);r();}function o(){var i=_["newsRSS"].items;i.forEach(function(I){I.updated=new Date(I.updated).toLocaleString();});}function r(){C.getEventBus().publish("newsChanged","onDemoKitNewsChanged");}function s(){return new Promise(function(i){q.ajax(R.getResourceOriginPath("/news-config.json"),{type:"GET",dataType:"JSON",success:function(u){i(u);},error:function(){L.error("failed to load news-config.json");i();}});});}function t(J){return new Promise(function(i){q.ajax(R.getResourceOriginPath(J.feedPath),{type:"GET",dataType:"xml",success:function(u){var v=[];q('item',u).each(function(){var w={};w.title=q(this).find('title').eq(0).text();w.link=q(this).find('link').eq(0).text();w.description=q(this).find('description').eq(0).text();w.updated=q(this).find('pubDate').eq(0).text();w.id=q(this).find('guid').eq(0).text();v.push(w);});_["newsRSS"]={"items":v};i(_["newsRSS"]);},error:function(){L.error("failed to load news rss");_["newsRSS"]=null;i();}});});}return{moveAllNewItemsToOld:n,moveNewItemToOld:m,prepareNewsData:p,getPreparationFailureMessage:j,getNewNewsArray:k,getOldNewsArray:l};});
