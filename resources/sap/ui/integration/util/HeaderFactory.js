/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core","./BaseFactory","sap/ui/integration/cards/actions/CardActions","sap/ui/integration/library","sap/m/library","sap/ui/integration/cards/NumericHeader","sap/ui/integration/cards/Header","sap/base/strings/formatMessage","sap/m/Button"],function(C,B,a,l,L,N,H,f,b){"use strict";var A=l.CardActionArea;var c=L.ButtonType;var r=C.getLibraryResourceBundle("sap.ui.integration");function d(F,h){if(F.parts&&F.translationKey&&F.parts.length===2){var o={parts:[F.translationKey,F.parts[0].toString(),F.parts[1].toString()],formatter:function(t,p,P){var s=p||F.parts[0];var g=P||F.parts[1];if(Array.isArray(p)){s=p.length;}if(Array.isArray(P)){g=P.length;}var i=parseFloat(s)||0;var j=parseFloat(g)||0;return f(t,[i,j]);}};h.bindProperty("statusText",o);}}var e=B.extend("sap.ui.integration.util.HeaderFactory");e.prototype.create=function(m,t){var o=this._oCard,i=o.getOpener(),h;m=this.createBindingInfos(m,o.getBindingNamespaces());if(i){t=this._createCloseButton();}switch(m.type){case"Numeric":h=new N(m,t);break;default:h=new H(m,t,o._oIconFormatter);break;}h.setCard(o);if(m.status&&m.status.text&&m.status.text.format){if(m.status.text.format.translationKey){o._loadDefaultTranslations();}d(m.status.text.format,h);}h.setServiceManager(o._oServiceManager);h.setDataProviderFactory(o._oDataProviderFactory);h._setDataConfiguration(m.data);var g=new a({card:o});g.attach({area:A.Header,actions:m.actions,control:h});h._oActions=g;if(h._bIsEmpty){h.setVisible(t.getVisible());}if(i){h.setProperty("focusable",false);}return h;};e.prototype._createCloseButton=function(){var o=new b({type:c.Transparent,tooltip:r.getText("CARD_DIALOG_CLOSE_BUTTON"),icon:"sap-icon://decline",press:function(){this._oCard.hide();}.bind(this)});o.addStyleClass("sapUiIntCardCloseButton");return o;};return e;});
