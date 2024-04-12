/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/registry/Settings","sap/ui/fl/ChangePersistenceFactory","sap/ui/fl/write/_internal/Storage","sap/ui/fl/Utils","sap/ui/fl/write/api/Version","sap/ui/model/json/JSONModel","sap/ui/model/BindingMode"],function(S,C,a,U,V,J,B){"use strict";var _={};var M=9;var b=M+1;function c(v,h){var i=f(h);var D=[];var A=V.Number.Original;var p=false;return U.getUShellService("URLParsing").then(function(u){var P=U.getParameter(V.UrlParameter,u);if(!P){if(h.length>0){P=h[0].version;}else{P=V.Number.Original;}}h.forEach(function(o){if(o.version===V.Number.Draft){o.type=V.Type.Draft;o.isPublished=false;D=o.filenames;}else{if(A===V.Number.Original){o.type=V.Type.Active;A=o.version;}else{o.type=V.Type.Inactive;}if((o.version===P)&&(o.isPublished===false)){p=true;}}});var m=new J({publishVersionEnabled:p,versioningEnabled:v,versions:h,activeVersion:A,backendDraft:i,dirtyChanges:false,draftAvailable:i,activateEnabled:i,persistedVersion:P,displayedVersion:P,draftFilenames:D});m.setDefaultBindingMode(B.OneWay);m.setSizeLimit(M);m.setDirtyChanges=function(j){m.setProperty("/dirtyChanges",j);m.updateDraftVersion();m.updateBindings(true);};m.updateDraftVersion=function(){var h=m.getProperty("/versions");var v=m.getProperty("/versioningEnabled");var j=m.getProperty("/dirtyChanges");var i=m.getProperty("/backendDraft");var k=v&&(j||i);m.setProperty("/draftAvailable",k);if(j){m.setProperty("/displayedVersion",V.Number.Draft);}if(!f(h)&&k){h.splice(0,0,{version:V.Number.Draft,type:V.Type.Draft,filenames:[],isPublished:false});}if(f(h)&&!k){h.shift();m.setProperty("/displayedVersion",m.getProperty("/persistedVersion"));}var l=m.getProperty("/displayedVersion")!==m.getProperty("/activeVersion");m.setProperty("/activateEnabled",l);};return m;});}function d(p,D){var h=[];var i=D.changePersistences;i.forEach(function(o){h=o.getDirtyChanges().concat();h.forEach(function(j){o.deleteChange(j,true);});});return h.length>0;}function e(p){var D={dirtyChangesExist:false,changePersistences:[]};if(p.reference){var o=C.getChangePersistenceForComponent(p.reference);if(o.getDirtyChanges().length>0){D.dirtyChangesExist=true;D.changePersistences.push(o);}}if(p.nonNormalizedReference){var h=C.getChangePersistenceForComponent(p.nonNormalizedReference);if(h.getDirtyChanges().length>0){D.dirtyChangesExist=true;D.changePersistences.push(h);}}return D;}function f(v){return v.some(function(o){return o.version===V.Number.Draft;});}var g={};g.initialize=function(p){var r=p.reference;var l=p.layer;p.limit=b;return S.getInstance().then(function(s){var v=s.isVersioningEnabled(l);var h=v?a.versions.load(p):Promise.resolve([]);return h.then(function(i){return c(v,i);}).then(function(m){_[r]=_[r]||{};_[r][l]=_[r][l]||{};_[r][l]=m;return _[r][l];});});};g.getVersionsModel=function(p){var r=p.reference;var l=p.layer;if(!_[r]||!_[r][l]){throw Error("Versions Model for reference '"+r+"' and layer '"+l+"' were not initialized.");}var D=e(p);if(D.dirtyChangesExist){_[r][l].updateDraftVersion(p);}return _[r][l];};g.clearInstances=function(){_={};};g.onAllChangesSaved=function(p){p.reference=U.normalizeReference(p.reference);var m=g.getVersionsModel(p);var v=m.getProperty("/versioningEnabled");var D=m.getProperty("/dirtyChanges");m.setProperty("/dirtyChanges",true);m.setProperty("/backendDraft",v&&D);m.updateDraftVersion();};g.activate=function(p){var m=g.getVersionsModel(p);var v=m.getProperty("/versions");var D=f(v);var s=m.getProperty("/displayedVersion");var A=m.getProperty("/activeVersion");if(s===A){return Promise.reject("Version is already active");}p.version=s;var o=e(p);var h=o.changePersistences;var i=h.some(function(j){return j.getDirtyChanges().length>0;});if(i){return Promise.reject("unsaved changes exists");}return a.versions.activate(p).then(function(j){v.forEach(function(k){k.type=V.Type.Inactive;});j.type=V.Type.Active;j.isPublished=false;if(D){v.shift();}v.splice(0,0,j);m.setProperty("/publishVersionEnabled",true);m.setProperty("/backendDraft",false);m.setProperty("/dirtyChanges",false);m.setProperty("/draftAvailable",false);m.setProperty("/publishVersionEnabled",true);m.setProperty("/activateEnabled",false);m.setProperty("/activeVersion",j.version);m.setProperty("/displayedVersion",j.version);m.setProperty("/persistedVersion",j.version);m.updateBindings(true);});};g.discardDraft=function(p){var m=g.getVersionsModel(p);var v=m.getProperty("/versions");var D=e(p);var h=m.getProperty("/backendDraft");var o=h?a.versions.discardDraft(p):Promise.resolve();return o.then(function(){v.shift();m.setProperty("/backendDraft",false);m.setProperty("/dirtyChanges",false);m.setProperty("/draftAvailable",false);m.setProperty("/activateEnabled",false);m.setProperty("/displayedVersion",m.getProperty("/persistedVersion"));m.updateBindings(true);var i=d(p,D);return{backendChangesDiscarded:h,dirtyChangesDiscarded:i};});};g.publish=function(p){var m=g.getVersionsModel({reference:U.normalizeReference(p.reference),layer:p.layer});return a.versions.publish(p).then(function(s){if(s!=="Error"&&s!=="Cancel"){m.setProperty("/publishVersionEnabled",false);var v=m.getProperty("/versions");v.find(function(o){return o.version===p.version;}).isPublished=true;}return s;});};return g;});