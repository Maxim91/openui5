sap.ui.define(["sap/ui/test/Opa5","sap/ui/demo/masterdetail/localService/mockserver","sap/base/strings/capitalize","sap/ui/core/Core"],function(e,t,r,a){"use strict";return e.extend("sap.ui.demo.masterdetail.test.integration.pages.Common",{getEntitySet:function(e){return t.getMockServer().getEntitySetData(e)},I18NTextExtended:function(e,t,i,n,s){var u,o,c;var l=e["get"+r(i,0)];if(!l){return false}var d=l.call(e);if(n){o=a.getLibraryResourceBundle(n)}else{u=e.getModel("i18n");o=u.getResourceBundle()}c=o.getText(t,s);return c===d}})});