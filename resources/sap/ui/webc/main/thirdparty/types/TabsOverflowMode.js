sap.ui.define(["sap/ui/webc/common/thirdparty/base/types/DataType"],function(t){"use strict";function e(t){return t&&typeof t==="object"&&"default"in t?t["default"]:t}var n=e(t);const a={End:"End",StartAndEnd:"StartAndEnd"};class s extends n{static isValid(t){return!!a[t]}}s.generateTypeAccessors(a);return s});