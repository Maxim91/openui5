sap.ui.define(["sap/ui/webc/common/thirdparty/base/types/DataType"],function(e){"use strict";function t(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var a=t(e);const s={Default:"Default",Subtle:"Subtle",Emphasized:"Emphasized"};class u extends a{static isValid(e){return!!s[e]}}u.generateTypeAccessors(s);return u});