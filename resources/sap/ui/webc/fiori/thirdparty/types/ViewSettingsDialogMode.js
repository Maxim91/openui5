sap.ui.define(["sap/ui/webc/common/thirdparty/base/types/DataType"],function(t){"use strict";function e(t){return t&&typeof t==="object"&&"default"in t?t["default"]:t}var r=e(t);const s={Sort:"Sort",Filter:"Filter"};class a extends r{static isValid(t){return!!s[t]}}a.generateTypeAccessors(s);return a});