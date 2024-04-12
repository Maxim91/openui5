/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/thirdparty/adaptivecards","sap/ui/integration/cards/adaptivecards/overwrites/inputsGeneralOverwrites"],function(A,I){"use strict";function U(){A.DateInput.apply(this,arguments);}U.prototype=Object.create(A.DateInput.prototype);U.prototype.overrideInternalRender=function(){var i=A.TextInput.prototype.overrideInternalRender.call(this,arguments);I.overwriteLabel(this);I.overwriteRequired(this);return i;};U.prototype.internalRender=function(){this._dateInputElement=document.createElement("ui5-date-picker");this._dateInputElement.id=this.id;this._dateInputElement.placeholder=this.placeholder;this._dateInputElement.formatPattern="yyyy-MM-dd";this._dateInputElement.value=this.defaultValue||"";this._dateInputElement.minDate=this.min||"";this._dateInputElement.maxDate=this.max||"";I.createValueStateElement(this,this._dateInputElement);this._dateInputElement.addEventListener("input",function(){this.valueChanged();}.bind(this));return this._dateInputElement;};U.prototype.updateInputControlAriaLabelledBy=function(){I.overwriteAriaLabelling(this,"accessible-name-ref");};U.prototype.showValidationErrorMessage=function(){if(this.renderedInputControlElement){this.renderedInputControlElement.valueState="Error";}};U.prototype.resetValidationFailureCue=function(){A.TextInput.prototype.resetValidationFailureCue.call(this,arguments);if(this.renderedInputControlElement){this.renderedInputControlElement.valueState="None";}};return U;});