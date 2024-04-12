/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/documentation/sdk/controller/BaseController","sap/ui/model/json/JSONModel","sap/ui/thirdparty/URI","sap/uxap/ThrottledTaskHelper"],function(B,J,U,T){"use strict";var S={HTML:"index.html",XML:"App.view.xml",INDEX_JS:"index.js",CONTROLLER_JS:"App.controller.js"},a="HelloWorld",g=function(f){return a+"/"+f;},b={};b[S.HTML]="text";b[S.XML]="xml";b[S.INDEX_JS]="javascript";b[S.CONTROLLER_JS]="javascript";return B.extend("sap.ui.documentation.sdk.controller.LiveEditor",{onInit:function(){this._oSrcFileContent={};this._oViewModel=new J({autoPreview:true,selectedFileName:S.XML,selectedFileType:b[S.XML],selectedFileContent:""});this.getView().setModel(this._oViewModel,"viewModel");new J(sap.ui.require.toUrl('sap/ui/documentation/sdk/model/LiveEditorData.json')).attachRequestCompleted(function(e){var d=e.getSource().getData(),c=new U(sap.ui.require.toUrl("sap-ui-core.js"),document.baseURI).href();if(d[S.HTML]){d[S.HTML]=d[S.HTML].replace(/&sol;/g,"/").replace("resources/sap-ui-core.js",c);}this._oSrcFileContent=d;this.showFileInEditor(S.XML);}.bind(this));this.getView().byId("resultBox").addEventDelegate({onAfterRendering:this.requestExecuteCurrentSrc.bind(this)});this._bSuppressRemoveOnce=false;this._bSuppressInsertOnce=false;this._oThrottledTask=null;},onSrcLiveChange:function(e){var t=e.getParameter("value"),A=e.getParameter("editorEvent").action,s;if((this._bSuppressRemoveOnce===true)&&(A==="remove")){this._bSuppressRemoveOnce=false;return;}if((this._bSuppressInsertOnce===true)&&(A==="insert")){this._bSuppressInsertOnce=false;return;}s=this._oViewModel.getProperty("/selectedFileName");this._oSrcFileContent[s]=t;if(this._oViewModel.getProperty("/autoPreview")){this.requestExecuteCurrentSrc();}},requestExecuteCurrentSrc:function(){this._getExecuteSrcThrottledTask().reSchedule(false,{}).catch(function(r){});},createFrame:function(){var f=document.createElement("iframe");f.id="outputWindow";f.width="100%";f.className="editorOutputWindow";f.src=sap.ui.require.toUrl('sap/ui/documentation/sdk/util/liveEditorOutput.html');f.sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-scripts";return f;},onFileSwitch:function(e){var s=e.getParameter("selectedKey");this._bSuppressRemoveOnce=true;this._bSuppressInsertOnce=true;this.showFileInEditor(s);},showFileInEditor:function(s){this._oViewModel.setProperty("/selectedFileContent",this._oSrcFileContent[s]);this._oViewModel.setProperty("/selectedFileType",b[s]);},_getDataToPost:function(){var m={},i=g(S.INDEX_JS).slice(0,-3),n,N;Object.keys(S).forEach(function(k){N=S[k];n=g(N);m[n]=this._oSrcFileContent[N];},this);return{src:m,moduleNameToRequire:i};},_getExecuteSrcThrottledTask:function(){var e;if(!this._oThrottledTask){e=function(){var f=this.getView().byId('outputWindowWrapper').getDomRef(),F;if(f){while(f.firstChild){f.removeChild(f.firstChild);}F=this.createFrame();F.onload=function(){if(F.contentWindow){F.contentWindow.postMessage(this._getDataToPost(),"*");F.onload=null;}}.bind(this);f.appendChild(F);}};this._oThrottledTask=new T(e,500,this);}return this._oThrottledTask;},onNavButtonPress:function(){this.getRouter().myNavBack("welcome");}});});
