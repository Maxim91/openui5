sap.ui.define(["sap/ui/webc/common/thirdparty/base/UI5Element","sap/ui/webc/common/thirdparty/base/types/Integer","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer","sap/ui/webc/common/thirdparty/base/Device","sap/ui/webc/common/thirdparty/base/i18nBundle","sap/ui/webc/common/thirdparty/base/locale/getLocale","sap/ui/webc/common/thirdparty/localization/DateFormat","sap/ui/webc/common/thirdparty/localization/getCachedLocaleDataInstance","sap/ui/webc/common/thirdparty/localization/features/calendar/Gregorian","sap/ui/webc/common/thirdparty/base/types/CalendarType","sap/ui/webc/common/thirdparty/base/asset-registries/LocaleData","sap/ui/webc/common/thirdparty/base/Keys","sap/ui/webc/common/thirdparty/icons/time-entry-request","./generated/templates/TimeSelectionTemplate.lit","./WheelSlider","./timepicker-utils/TimeSlider","./generated/i18n/i18n-defaults","./generated/themes/TimeSelection.css"],function(e,t,r,i,s,a,n,o,u,d,l,h,c,g,m,p,f,_){"use strict";function S(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var y=S(e);var v=S(t);var C=S(r);var H=S(a);var T=S(n);var b=S(o);var w=S(d);const V=e=>e.substr(0,1).toUpperCase()+e.substr(1);const D={tag:"ui5-time-selection",languageAware:true,managedSlots:true,properties:{value:{type:String,defaultValue:undefined},formatPattern:{type:String},hideHours:{type:Boolean},hideMinutes:{type:Boolean},hideSeconds:{type:Boolean},maxHours:{type:v},maxMinutes:{type:v},maxSeconds:{type:v},secondsStep:{type:v,defaultValue:1},minutesStep:{type:v,defaultValue:1},_currentSlider:{type:String,defaultValue:"hours"},_calendarType:{type:w}},events:{change:{},sliderChange:{}}};class F extends y{static get metadata(){return D}static get render(){return C}static get styles(){return _}static get template(){return g}static get dependencies(){return[m]}static async onDefine(){[F.i18nBundle]=await Promise.all([s.getI18nBundle("@ui5/webcomponents"),l.fetchCldr(H().getLanguage(),H().getRegion(),H().getScript())])}constructor(){super()}get _hoursConfiguration(){const e=this.getFormat().aFormatArray.find(e=>e.type.startsWith("hour"));return p.getHoursConfigByFormat(e?e.type:"hour0_23")}get _neededSliders(){const e=this.getFormat().aFormatArray;return p.getTimeControlsByFormat(e,this._hoursConfiguration)}get _hasHoursSlider(){return this._neededSliders[0]&&!this.hideHours}get _hasMinutesSlider(){return this._neededSliders[1]&&!this.hideMinutes}get _hasSecondsSlider(){return this._neededSliders[2]&&!this.hideSeconds}get _hasPeriodsSlider(){return this._neededSliders[3]}get secondsArray(){return p.getSeconds(this.maxSeconds?this.maxSeconds+1:undefined,this.secondsStep)}get minutesArray(){return p.getMinutes(this.maxMinutes?this.maxMinutes+1:undefined,this.minutesStep)}get hoursArray(){return p.getHours(this._hoursConfiguration,this.maxHours?this.maxHours+1:undefined)}get periodsArray(){return this.getFormat().aDayPeriods.map(e=>e.toUpperCase())}get _hoursSliderFocused(){return this._currentSlider==="hours"}get _minutesSliderFocused(){return this._currentSlider==="minutes"}get _secondsSliderFocused(){return this._currentSlider==="seconds"}get _periodSliderFocused(){return this._currentSlider==="periods"}get _hours(){let e;const t=this.validDateValue;if(this._hoursConfiguration.isTwelveHoursFormat&&t.getHours()>this._hoursConfiguration.maxHour){e=t.getHours()-12}else if(this._hoursConfiguration.isTwelveHoursFormat&&t.getHours()<this._hoursConfiguration.minHour){e=t.getHours()+12}else{e=t.getHours()}if(e.toString().length===1){e=`0${e}`}return e.toString()}get _minutes(){const e=this.validDateValue.getMinutes().toString();return e.length===1?`0${e}`:e}get _seconds(){const e=this.validDateValue.getSeconds().toString();return e.length===1?`0${e}`:e}get _period(){if(!this._hoursConfiguration.isTwelveHoursFormat){return undefined}let e;const t=this.validDateValue;if(this._hoursConfiguration.minHour===1){e=t.getHours()>=this._hoursConfiguration.maxHour?this.periodsArray[1]:this.periodsArray[0]}else{e=t.getHours()>this._hoursConfiguration.maxHour||t.getHours()===this._hoursConfiguration.minHour?this.periodsArray[1]:this.periodsArray[0]}return e}setValue(e){const t=this.formatValue(e);if(this.isValid(t)){this.value=this.normalizeValue(t);this.fireEvent("change",{value:this.value,valid:true})}}onHoursChange(e){let t=e.detail.value;const r=this._hoursConfiguration.isTwelveHoursFormat;if(r){if(this._period===this.periodsArray[0]){t=t==="12"?0:t}if(this._period===this.periodsArray[1]){t=t==="12"?t:t*1+12}}const i=this.validDateValue;i.setHours(t);this.setValue(i)}onMinutesChange(e){const t=e.detail.value;const r=this.validDateValue;r.setMinutes(t);this.setValue(r)}onSecondsChange(e){const t=e.detail.value;const r=this.validDateValue;r.setSeconds(t);this.setValue(r)}onPeriodChange(e){const t=e.detail.value;const r=this.validDateValue;if(t===this.periodsArray[0]&&r.getHours()>=12){r.setHours(r.getHours()-12)}if(t===this.periodsArray[1]&&r.getHours()<12){r.setHours(r.getHours()+12)}this.setValue(r)}isValid(e){return e===""||this.getFormat().parse(e)}normalizeValue(e){if(e===""){return e}return this.getFormat().format(this.getFormat().parse(e))}get _formatPattern(){const e=this.formatPattern;const t=!!e.match(/H/i);const r=!e||!t;const i=b(H());return r?i.getCombinedDateTimePattern("medium","medium",this._primaryCalendarType):e}get _isPattern(){return this._formatPattern!=="medium"&&this._formatPattern!=="short"&&this._formatPattern!=="long"}selectSlider(e){this._setCurrentSlider(e.target.closest("[ui5-wheelslider]").getAttribute("data-sap-slider"))}_setCurrentSlider(e){if(this._currentSlider===e){return}this._currentSlider=e;this.fireEvent("slider-change",{slider:e})}get _currentSliderDOM(){return this.shadowRoot.querySelector(`[data-sap-slider="${this._currentSlider}"]`)}get _activeSliders(){return["hours","minutes","seconds","periods"].filter(e=>this[`_has${V(e)}Slider`])}_onfocusin(e){if(!this._currentSlider){this._setCurrentSlider(this._activeSliders[0])}if(e.target===e.currentTarget){this._currentSliderDOM.focus()}}_onfocusout(e){if(!this.shadowRoot.contains(e.relatedTarget)){this._setCurrentSlider("")}}async _onkeydown(e){if(!(h.isLeft(e)||h.isRight(e))){return}e.preventDefault();const t=this._activeSliders;const r=e.target.closest("[ui5-wheelslider]").getAttribute("data-sap-slider");let i=t.indexOf(r);if(h.isLeft(e)){i=i===0?t.length-1:i-1}else if(h.isRight(e)){i=i===t.length-1?0:i+1}this._setCurrentSlider(t[i]);this._currentSliderDOM.focus()}_handleWheel(e){e.preventDefault()}getFormat(){let e;if(this._isPattern){e=T.getInstance({calendarType:this._calendarType,pattern:this._formatPattern})}else{e=T.getInstance({calendarType:this._calendarType,style:this._formatPattern})}return e}formatValue(e){return this.getFormat().format(e)}get dateValue(){return this.value?this.getFormat().parse(this.value):new Date}get validDateValue(){return this.isValid(this.value)?this.dateValue:new Date}get hoursSliderTitle(){return F.i18nBundle.getText(f.TIMEPICKER_HOURS_LABEL)}get minutesSliderTitle(){return F.i18nBundle.getText(f.TIMEPICKER_MINUTES_LABEL)}get secondsSliderTitle(){return F.i18nBundle.getText(f.TIMEPICKER_SECONDS_LABEL)}get periodSliderTitle(){return F.i18nBundle.getText(f.TIMEPICKER_PERIODS_LABEL)}get _isCyclic(){return!i.isIE()}get classes(){return{root:{"ui5-time-selection-root":true,"ui5-phone":i.isPhone()}}}}F.define();return F});