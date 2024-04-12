/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/theming/Parameters"],function(P){"use strict";return function(){return{"spacing":{"small":8,"default":16,"medium":32,"large":48,"extraLarge":48,"padding":16},"separator":{"lineThickness":1,"lineColor":P.get("sapUiToolbarSeparatorColor")},"supportsInteractivity":true,"fontTypes":{"default":{"fontFamily":P.get("sapUiFontFamily"),"fontSizes":{"small":12,"default":14,"medium":14,"large":16,"extraLarge":20}},"monospace":{}},"containerStyles":{"default":{"backgroundColor":"transparent","foregroundColors":{"default":{"default":P.get("sapUiBaseText"),"subtle":P.get("sapUiContentLabelColor")},"accent":{"default":P.get("sapUiInformativeText")},"attention":{"default":P.get("sapUiNegativeText")},"good":{"default":P.get("sapUiPositiveText")},"warning":{"default":P.get("sapUiCriticalText")}}},"emphasis":{"backgroundColor":P.get("sapUiNeutralBG"),"foregroundColors":{"default":{"default":P.get("sapUiBaseText")},"accent":{"default":P.get("sapUiInformativeText")},"attention":{"default":P.get("sapUiNegativeText")},"good":{"default":P.get("sapUiPositiveText")},"warning":{"default":P.get("sapUiCriticalText")}}},"accent":{"backgroundColor":P.get("sapUiInformationBG"),"foregroundColors":{"default":{"default":P.get("sapUiBaseText")},"accent":{"default":P.get("sapUiInformativeText")},"attention":{"default":P.get("sapUiNegativeText")},"good":{"default":P.get("sapUiPositiveText")},"warning":{"default":P.get("sapUiCriticalText")}}},"good":{"backgroundColor":P.get("sapUiSuccessBG"),"foregroundColors":{"default":{"default":P.get("sapUiBaseText")},"accent":{"default":P.get("sapUiInformativeText")},"attention":{"default":P.get("sapUiNegativeText")},"good":{"default":P.get("sapUiPositiveText")},"warning":{"default":P.get("sapUiCriticalText")}}},"attention":{"backgroundColor":P.get("sapUiErrorBG"),"foregroundColors":{"default":{"default":P.get("sapUiBaseText")},"accent":{"default":P.get("sapUiInformativeText")},"attention":{"default":P.get("sapUiNegativeText")},"good":{"default":P.get("sapUiPositiveText")},"warning":{"default":P.get("sapUiCriticalText")}}},"warning":{"backgroundColor":P.get("sapUiWarningBG"),"foregroundColors":{"default":{"default":P.get("sapUiBaseText")},"accent":{"default":P.get("sapUiInformativeText")},"attention":{"default":P.get("sapUiNegativeText")},"good":{"default":P.get("sapUiPositiveText")},"warning":{"default":P.get("sapUiCriticalText")}}}}};};});