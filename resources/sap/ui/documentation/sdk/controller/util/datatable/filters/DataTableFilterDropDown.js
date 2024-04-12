/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/Control','./DataTableFilterDropDownRenderer'],function(C,D){"use strict";var a=C.extend("sap.ui.documentation.sdk.DataTableFilterDropDown",{metadata:{properties:{checked:{type:"array",defaultValue:[]},options:{type:"array",defaultValue:[]},expanded:{type:"boolean",defaultValue:false,visibility:"hidden"}}},renderer:D});a.M_EVENTS={CHANGE:'change'};a.isCheckbox=function(t){return t.tagName.toLowerCase()==='input'&&t.type==='checkbox';};a.prototype.setAll=function(v){var c=this.getChecked();for(var i=0;i<c.length;i++){c[i].value=v;this.optionsList.find('input[index='+i+']').prop('checked',v);}this.setChecked(c,true);};a.prototype.init=function(){this.setChecked([]);};a.prototype.onBeforeRendering=function(){var c=this.getChecked(),o;if(c.length===0){o=this.getOptions();for(var i=0;i<o.length;i++){c[i]={text:o[i],value:false};}this.setChecked(c,true);}this.detachEvents();};a.prototype.onAfterRendering=function(){this.cacheElements();this.attachEvents();};a.prototype.cacheElements=function(){this.filterBtn=this.$('filterBtn');this.optionsList=this.$('optionsList');};a.prototype.detachEvents=function(){if(this.filterBtn){this.filterBtn.off('click');}if(this.optionsList){this.optionsList.off('click');}};a.prototype.attachEvents=function(){this.filterBtn.on('click',function(){this.setProperty("expanded",!this.getProperty("expanded"));}.bind(this));this.optionsList.on('click',this.onClick.bind(this));};a.prototype.onsapfocusleave=function(e){this.setProperty("expanded",false);};a.prototype.onClick=function(e){var i,c=this.getChecked(),t=e.target,I=a.isCheckbox(t),s=t.classList.contains("selectAll"),S=t.classList.contains("clearFilter"),b=I||s||S;if(I){i=t.getAttribute('index');c[i].value=e.target.checked;this.setProperty("checked",c,true);}else if(s){this.setAll(true,false);}else if(S){this.setAll(false,false);}if(b){this.fireEvent('change',{value:c});}};a.prototype.getDefaultOptions=function(e){return[{text:"Clear Filter",key:"clearFilter"},{text:"Select All",key:"selectAll"}];};return a;});
