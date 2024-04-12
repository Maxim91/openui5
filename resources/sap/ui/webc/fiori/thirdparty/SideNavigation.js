sap.ui.define(["sap/ui/webc/common/thirdparty/base/UI5Element","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer","sap/ui/webc/main/thirdparty/ResponsivePopover","sap/ui/webc/main/thirdparty/List","sap/ui/webc/main/thirdparty/StandardListItem","sap/ui/webc/main/thirdparty/Tree","sap/ui/webc/main/thirdparty/TreeItem","./generated/templates/SideNavigationTemplate.lit","./generated/templates/SideNavigationItemPopoverContentTemplate.lit","./generated/themes/SideNavigation.css","./generated/themes/SideNavigationPopover.css"],function(e,t,i,s,a,r,n,c,o,d,l){"use strict";function m(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var h=m(e);var p=m(t);var u=m(i);var g=m(s);var f=m(a);var v=m(r);var I=m(n);const y={tag:"ui5-side-navigation",managedSlots:true,fastNavigation:true,properties:{collapsed:{type:Boolean},_popoverContent:{type:Object}},slots:{default:{propertyName:"items",invalidateOnChildChange:true,type:HTMLElement},header:{type:HTMLElement},fixedItems:{type:HTMLElement,invalidateOnChildChange:true}},events:{"selection-change":{detail:{item:{type:HTMLElement}}}}};class T extends h{static get metadata(){return y}static get staticAreaStyles(){return[l]}static get render(){return p}static get styles(){return d}static get template(){return c}static get staticAreaTemplate(){return o}static get dependencies(){return[g,f,v,I,u]}onBeforeRendering(){this._items=this.items.map(e=>({item:e,selected:e.items.some(e=>e.selected)&&this.collapsed||e.selected}));this._fixedItems=this.fixedItems.map(e=>({item:e,selected:e.items.some(e=>e.selected)&&this.collapsed||e.selected}))}_setSelectedItem(e){if(!this.fireEvent("selection-change",{item:e},true)){return}this._walk(e=>{e.selected=false});e.selected=true}_buildPopoverContent(e){this._popoverContent={mainItem:e,mainItemSelected:e.selected&&!e.items.some(e=>e.selected),subItems:e.items}}handleTreeItemClick(e){const t=e.detail.item;const i=t.associatedItem;if(!i.wholeItemToggleable){i.fireEvent("click")}else{i.expanded=!i.expanded}if(i.selected&&!this.collapsed){return}if(this.collapsed&&i.items.length){this._buildPopoverContent(i);const s=this._itemsTree===e.target?this._itemsTree:this._fixedItemsTree;this.openPicker(s._getListItemForTreeItem(t))}else{this._setSelectedItem(i)}}handleListItemClick(e){const t=e.detail.item;const i=t.associatedItem;i.fireEvent("click");if(i.selected){return}this._setSelectedItem(i);this.closePicker()}async getPicker(){return(await this.getStaticAreaItemDomRef()).querySelector("[ui5-responsive-popover]")}async openPicker(e){const t=await this.getPicker();t.showAt(e)}async closePicker(e){const t=await this.getPicker();t.close()}get hasHeader(){return!!this.header.length}get showHeader(){return this.hasHeader&&!this.collapsed}get _itemsTree(){return this.getDomRef().querySelector("#ui5-sn-items-tree")}get _fixedItemsTree(){return this.getDomRef().querySelector("#ui5-sn-fixed-items-tree")}_walk(e){this.items.forEach(t=>{e(t);t.items.forEach(t=>{e(t)})});this.fixedItems.forEach(t=>{e(t);t.items.forEach(t=>{e(t)})})}}T.define();return T});