/*! jQuery UI integration for DataTables' Buttons
 * ©2016 SpryMedia Ltd - datatables.net/license
 */
(function(f){if(typeof define==='function'&&define.amd){define(['jquery','datatables.net-jqui','datatables.net-buttons'],function($){return f($,window,document);});}else if(typeof exports==='object'){module.exports=function(r,$){if(!r){r=window;}if(!$||!$.fn.dataTable){$=require('datatables.net-jqui')(r,$).$;}if(!$.fn.dataTable.Buttons){require('datatables.net-buttons')(r,$);}return f($,r,r.document);};}else{f(jQuery,window,document);}}(function($,w,d,u){'use strict';var D=$.fn.dataTable;$.extend(true,D.Buttons.defaults,{dom:{container:{className:'dt-buttons ui-buttonset'},button:{className:'dt-button ui-button ui-state-default ui-button-text-only',disabled:'ui-state-disabled',active:'ui-state-active'},buttonLiner:{tag:'span',className:'ui-button-text'}}});D.ext.buttons.collection.text=function(a){return a.i18n('buttons.collection','Collection <span class="ui-button-icon-primary ui-icon ui-icon-triangle-1-s"/>');};return D.Buttons;}));