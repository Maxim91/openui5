sap.ui.define(["sap/ui/webc/common/thirdparty/base/UI5Element","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer","sap/ui/webc/common/thirdparty/base/Keys","sap/ui/webc/common/thirdparty/base/i18nBundle","sap/ui/webc/common/thirdparty/base/types/Integer","sap/ui/webc/common/thirdparty/base/types/CalendarType","sap/ui/webc/common/thirdparty/icons/slim-arrow-left","sap/ui/webc/common/thirdparty/icons/slim-arrow-right","./Icon","./generated/templates/CalendarHeaderTemplate.lit","./generated/i18n/i18n-defaults","./generated/themes/CalendarHeader.css"],function(e,t,n,r,a,s,o,i,u,p,d,c){"use strict";function h(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var l=h(e);var y=h(t);var B=h(a);var m=h(s);const T={tag:"ui5-calendar-header",languageAware:true,properties:{timestamp:{type:B},primaryCalendarType:{type:m},secondaryCalendarType:{type:m},buttonTextForSecondaryCalendarType:{type:Object},isNextButtonDisabled:{type:Boolean},isPrevButtonDisabled:{type:Boolean},isMonthButtonHidden:{type:Boolean},_monthButtonText:{type:String},_yearButtonText:{type:String},isYearButtonHidden:{type:Boolean}},events:{"previous-press":{},"next-press":{},"show-month-press":{},"show-year-press":{}}};class b extends l{static get metadata(){return T}static get render(){return y}static get template(){return p}static get styles(){return c}static get dependencies(){return[u]}static async onDefine(){b.i18nBundle=await r.getI18nBundle("@ui5/webcomponents")}constructor(){super()}onBeforeRendering(){this._prevButtonText=b.i18nBundle.getText(d.CALENDAR_HEADER_PREVIOUS_BUTTON);this._nextButtonText=b.i18nBundle.getText(d.CALENDAR_HEADER_NEXT_BUTTON);if(this.hasSecondaryCalendarType){this._secondMonthButtonText=this.buttonTextForSecondaryCalendarType.monthButtonText;this._secondYearButtonText=this.buttonTextForSecondaryCalendarType.yearButtonText}}onPrevButtonClick(e){this.fireEvent("previous-press",e)}onNextButtonClick(e){this.fireEvent("next-press",e)}onMonthButtonClick(e){this.fireEvent("show-month-press",e)}onMonthButtonKeyDown(e){if(n.isSpace(e)){e.preventDefault()}if(n.isEnter(e)){this.fireEvent("show-month-press",e)}}onMonthButtonKeyUp(e){if(n.isSpace(e)){e.preventDefault();this.fireEvent("show-month-press",e)}}onYearButtonClick(e){this.fireEvent("show-year-press",e)}onYearButtonKeyDown(e){if(n.isSpace(e)){e.preventDefault()}if(n.isEnter(e)){this.fireEvent("show-year-press",e)}}onYearButtonKeyUp(e){if(n.isSpace(e)){e.preventDefault();this.fireEvent("show-year-press",e)}}get hasSecondaryCalendarType(){return!!this.secondaryCalendarType}get classes(){return{prevButton:{"ui5-calheader-arrowbtn":true,"ui5-calheader-arrowbtn-disabled":this.isPrevButtonDisabled},nextButton:{"ui5-calheader-arrowbtn":true,"ui5-calheader-arrowbtn-disabled":this.isNextButtonDisabled}}}get accInfo(){return{ariaLabelMonthButton:this.hasSecondaryCalendarType?`${this._monthButtonText}, ${this.buttonTextForSecondaryCalendarType.info}`:`${this._monthButtonText}`}}}b.define();return b});