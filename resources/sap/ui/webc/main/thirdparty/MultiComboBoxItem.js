sap.ui.define(["./ComboBoxItem"],function(e){"use strict";const t={tag:"ui5-mcb-item",properties:{selected:{type:Boolean}}};class s extends e{static get metadata(){return t}get stableDomRef(){return this.getAttribute("stable-dom-ref")||`${this._id}-stable-dom-ref`}}s.define();return s});