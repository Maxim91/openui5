sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/thirdparty/sinon","sap/base/Log","sap/base/util/UriParameters"],function(o,e,r,t){"use strict";var i=10;return{init:function(){var o=t.fromQuery(window.location.search);this._oMockModels={};this._mockFont("SAP-icons");this._mockFont("SAP-icons-TNT");this.oServer=e.fakeServer.create();this.oServer.autoRespond=true;this.oServer.autoRespondAfter=parseInt(o.get("serverDelay")||i);e.fakeServer.xhr.useFilters=true;this.oServer.xhr.addFilter(function(o,e){var r=Object.keys(this._oMockModels).some(function(o){return e.match(o)});return!r}.bind(this));Object.keys(this._oMockModels).forEach(function(o){this.oServer.respondWith("GET",o,[200,{"Content-Type":"application/json"},this._oMockModels[o].getJSON()])}.bind(this));r.info("Running the app with mock data")},getMockServer:function(){return this},_mockFont:function(o){var e=sap.ui.require.toUrl("sap/ui/demo/iconexplorer/model/"+o+"/groups.json");var r=sap.ui.require.toUrl("sap/ui/demo/iconexplorer/model/"+o+"/tags.json");var t=sap.ui.require.toUrl("sap/ui/demo/iconexplorer/localService/mockdata/"+o+"/groups.json");var i=sap.ui.require.toUrl("sap/ui/demo/iconexplorer/localService/mockdata/"+o+"/tags.json");var s=this._loadModelFromDisk(t);var a=this._loadModelFromDisk(i);this._oMockModels[e]=s;this._oMockModels[r]=a},_loadModelFromDisk:function(e){var r=[];var t=new o;var i=false;t.loadData(e,r,i);return t}}});