/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/p13n/QueryPanel","sap/m/VBox","sap/m/Text","sap/ui/layout/Grid","sap/ui/layout/GridData","sap/m/Button","sap/m/ComboBox","sap/ui/core/library"],function(Q,V,T,G,a,B,C,c){"use strict";var b=c.ValueState;var F=Q.extend("sap.ui.mdc.p13n.panels.FilterPanel",{metadata:{properties:{itemFactory:{type:"function"}}},renderer:{}});F.prototype.PRESENCE_ATTRIBUTE="active";F.prototype._createQueryRowGrid=function(i){var s=i.name?new V({items:[new T({text:i.label}).addStyleClass("sapUiTinyMarginTop").addStyleClass("sapUiTinyMarginBegin")]}):this._createKeySelect(i.name);var d=[s];if(i.name){d.push(this._createFactoryControl(i));}return new G({containerQuery:true,defaultSpan:"XL4 L4 M4 S4",content:d}).addStyleClass("sapUiTinyMargin");};F.prototype._getPlaceholderText=function(){return this._getResourceText("p13n.FILTER_PLACEHOLDER");};F.prototype._getRemoveButtonTooltipText=function(){return this._getResourceText("p13n.FILTER_REMOVEICONTOOLTIP");};F.prototype._createKeySelect=function(k){var o=new C({width:"100%",items:this._getAvailableItems(),placeholder:this._getPlaceholderText(),selectionChange:function(e){var o=e.getSource();this._selectKey(o);}.bind(this),change:function(e){var o=e.getSource();var n=e.getParameter("newValue");o.setValueState(n&&!o.getSelectedItem()?b.Error:b.None);this._selectKey();}.bind(this)});return o;};F.prototype._createRemoveButton=function(v){var r=Q.prototype._createRemoveButton.apply(this,arguments);r.setLayoutData(new a({span:"XL1 L1 M1 S1"}));return r;};F.prototype._addPressed=function(e){this._selectKey();};F.prototype._selectKey=function(o){var q,k;if(o){this._oComboBox=o;q=o.getParent();k=o.getSelectedKey();}else if(this._oComboBox){o=this._oComboBox;q=o.getParent();k=o.getSelectedKey();if(k){Q.prototype._selectKey.call(this,o);var t=k?o.getSelectedItem().getText():"";var s=q.getContent()[0];q.removeContent(s);var f=new V({items:[new T({text:t}).addStyleClass("sapUiTinyMarginTop").addStyleClass("sapUiTinyMarginBegin")]});f._key=k;q.insertContent(f,0);var d=this._createFactoryControl({name:k});q.insertContent(d,1);}delete this._oComboBox;}};F.prototype._createFactoryControl=function(i){var f=this.getItemFactory().call(this,i);f.setLayoutData(new a({span:"XL7 L7 M7 S7"}));return f;};return F;});