/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/documentation/sdk/controller/BaseController","sap/ui/model/json/JSONModel","sap/ui/documentation/sdk/controller/util/APIInfo","sap/ui/documentation/sdk/model/formatter"],function(B,J,A,g){"use strict";return B.extend("sap.ui.documentation.sdk.controller.ApiDetailIndexDeprecatedExperimental",{formatter:g,onInit:function(){var r=this.getRouter();this._oModel=new J();this._oModel.setSizeLimit(10000);this.setModel(this._oModel);r.getRoute("deprecated").attachPatternMatched(this._onTopicMatched,this);r.getRoute("experimental").attachPatternMatched(this._onTopicMatched,this);r.getRoute("since").attachPatternMatched(this._onTopicMatched,this);this._hasMatched=false;},_onTopicMatched:function(e){var r=e.getParameter("name"),d={experimental:A.getExperimentalPromise,deprecated:A.getDeprecatedPromise,since:A.getSincePromise}[r];if(this._hasMatched){return;}this._hasMatched=true;this._aAllowedMembers=this.getModel("versionData").getProperty("/allowedMembers");d().then(function(D){D=this._filterVisibleElements(D);this._oModel.setData(D);}.bind(this));},_filterVisibleElements:function(d){var f={};Object.keys(d).forEach(function(v){var V=d[v];V.apis=V.apis.filter(function(e){return this._aAllowedMembers.indexOf(e.visibility)>-1;}.bind(this));if(V.apis.length>0){f[v]=V;}}.bind(this));return f;},_modifyLinks:function(e){var i=e.getSource().getItems(),l=i.length,I;while(l--){I=i[l];if(I._getLinkSender){var c=I.getCustomData(),C=c[0].getValue(),E=c[1].getValue(),s=c[2].getValue(),h;if(c[3].getValue()){E=C+"."+E;}h="api/"+C;if(s!=="class"){h+="/"+s+"/"+E;}I._getLinkSender().setHref(h);}}}});});
