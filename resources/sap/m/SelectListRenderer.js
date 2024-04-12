/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element","sap/ui/core/library","sap/ui/core/Icon","sap/ui/core/IconPool","sap/ui/Device"],function(E,c,I,a,D){"use strict";var T=c.TextDirection;var S={apiVersion:2};S.CSS_CLASS="sapMSelectList";S.render=function(r,l){this.writeOpenListTag(r,l,{elementData:true});this.renderItems(r,l);this.writeCloseListTag(r,l);};S.writeOpenListTag=function(r,l,s){var C=S.CSS_CLASS,t=l.getProperty("_tabIndex");if(s.elementData){r.openStart("ul",l);}else{r.openStart("ul");}r.class(C);if(l.getShowSecondaryValues()){r.class(C+"TableLayout");}if(!l.getEnabled()){r.class(C+"Disabled");}if(t){r.attr("tabindex",t);}r.style("width",l.getWidth());this.writeAccessibilityState(r,l);r.openEnd();};S.writeCloseListTag=function(r,l){r.close("ul");};S.renderItems=function(r,l){var s=l._getNonSeparatorItemsCount(),b=l.getHideDisabledItems()?l.getEnabledItems():l.getItems(),o=l.getSelectedItem(),C=1,d,f;for(var i=0;i<b.length;i++){f=i===0&&!o;d={selected:o===b[i],setsize:s,elementData:true};if(!(b[i]&&b[i].isA("sap.ui.core.SeparatorItem"))&&b[i].getEnabled()){d.posinset=C++;}this.renderItem(r,l,b[i],d,f);}};S.renderDirAttr=function(r,t){if(t!==T.Inherit){r.attr("dir",t.toLowerCase());}};S.renderItem=function(r,l,i,s,f){if(!(i instanceof E)){return;}var e=i.getEnabled(),o=l.getSelectedItem(),C=S.CSS_CLASS,t=i.getTooltip_AsString(),b=i.getTextDirection(),d=l.getShowSecondaryValues(),g;r.openStart("li",s.elementData?i:null);if(!d){this.renderDirAttr(r,b);}if(i.getIcon&&i.getIcon()){r.class("sapMSelectListItemWithIcon");}if(i.isA("sap.ui.core.SeparatorItem")){r.class(C+"SeparatorItem");if(d){r.class(C+"Row");}}else{r.class(C+"ItemBase");if(d){r.class(C+"Row");}else{r.class(C+"Item");}if(i.bVisible===false){r.class(C+"ItemBaseInvisible");}if(!e){r.class(C+"ItemBaseDisabled");}if(e&&D.system.desktop){r.class(C+"ItemBaseHoverable");}if(i===o||f){r.class(C+"ItemBaseSelected");}if(e){r.attr("tabindex","0");}}if(t){r.attr("title",t);}this.writeItemAccessibilityState.apply(this,arguments);r.openEnd();if(d){g=l._getColumnsPercentages();r.openStart("span");r.class(C+"Cell");r.class(C+"FirstCell");if(g){r.style("width",g.firstColumn);}r.attr("disabled","disabled");this.renderDirAttr(r,b);r.openEnd();this._renderIcon(r,i);r.text(i.getText());r.close("span");r.openStart("span");r.class(C+"Cell");r.class(C+"LastCell");if(g){r.style("width",g.secondColumn);}r.attr("disabled","disabled");r.openEnd();if(typeof i.getAdditionalText==="function"){r.text(i.getAdditionalText());}r.close("span");}else{this._renderIcon(r,i);r.text(i.getText());}r.close("li");};S.writeAccessibilityState=function(r,l){r.accessibilityState(l,{role:"listbox"});};S.writeItemAccessibilityState=function(r,l,i,s){var R=(i.isA("sap.ui.core.SeparatorItem"))?"separator":"option";var d;if(!i.getText()&&i.getIcon&&i.getIcon()){var o=a.getIconInfo(i.getIcon());if(o){d=o.text||o.name;}}r.accessibilityState(i,{role:R,selected:s.selected,setsize:s.setsize,posinset:s.posinset,label:d});};S._renderIcon=function(r,i){if(i.getIcon&&i.getIcon()){r.icon(i.getIcon(),S.CSS_CLASS+"ItemIcon",{id:i.getId()+"-icon"});}};return S;},true);
