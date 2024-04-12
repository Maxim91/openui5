sap.ui.define(["sap/ui/webc/common/thirdparty/base/UI5Element","sap/ui/webc/common/thirdparty/base/Keys","sap/ui/webc/common/thirdparty/base/Device","sap/ui/webc/common/thirdparty/base/i18nBundle","sap/ui/webc/common/thirdparty/icons/slim-arrow-right","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer","./ResponsivePopover","./Button","./List","./StandardListItem","./Icon","./generated/templates/MenuTemplate.lit","./generated/i18n/i18n-defaults","./generated/themes/Menu.css"],function(e,t,n,s,i,r,u,o,a,p,h,m,c,l){"use strict";function _(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var b=_(e);var d=_(r);const M={tag:"ui5-menu",properties:{headerText:{type:String},_isSubMenu:{type:Boolean,noAttribute:true},_parentMenuItem:{type:Object},_openedSubMenuItem:{type:Object},_subMenuOpenerId:{type:String},_currentItems:{type:Object,multiple:true},_parentItemsStack:{type:Object,multiple:true},_popover:{type:Object}},managedSlots:true,slots:{default:{propertyName:"items",type:HTMLElement,invalidateOnChildChange:true}},events:{"item-click":{detail:{item:{type:Object},text:{type:String}}}}};class I extends b{static get metadata(){return M}static get render(){return d}static get staticAreaStyles(){return l}static get staticAreaTemplate(){return m}static get dependencies(){return[u,o,a,p,h]}static async onDefine(){I.i18nBundle=await s.getI18nBundle("@ui5/webcomponents")}get itemsWithChildren(){return!!this._currentItems.filter(e=>e.item.items.length).length}get itemsWithIcon(){return!!this._currentItems.filter(e=>e.item.icon!=="").length}get isRtl(){return this.effectiveDir==="rtl"}get placementType(){const e=this.isRtl?"Left":"Right";return this._isSubMenu?e:"Bottom"}get verticalAlign(){return this._isSubMenu?"Top":"Bottom"}get labelBack(){return I.i18nBundle.getText(c.MENU_BACK_BUTTON_ARIA_LABEL)}get labelClose(){return I.i18nBundle.getText(c.MENU_CLOSE_BUTTON_ARIA_LABEL)}get isPhone(){return n.isPhone()}get isSubMenuOpened(){return!!this._parentMenuItem}get menuHeaderTextPhone(){return this.isSubMenuOpened?this._parentMenuItem.text:this.headerText}onBeforeRendering(){!n.isPhone()&&this._prepareCurrentItems(this.items);const e=this.itemsWithChildren;const t=this.itemsWithIcon;this._currentItems.forEach(n=>{n.item._siblingsWithChildren=e;n.item._siblingsWithIcon=t})}async showAt(e){if(n.isPhone()){this._prepareCurrentItems(this.items);this._parentItemsStack=[]}if(!this._isSubMenu){this._parentMenuItem=undefined}await this._getPopover();this._popover.initialFocus="";for(let e=0;e<this._currentItems.length;e++){if(!this._currentItems[e].item.disabled){this._popover.initialFocus=`${this._id}-menu-item-${e}`;break}}this._popover.showAt(e)}close(){if(Object.keys(this._popover).length){if(n.isPhone()){this._parentItemsStack=[]}this._popover.close();this._popover.resetFocus()}}async _getPopover(){this._popover=(await this.getStaticAreaItemDomRef()).querySelector("[ui5-responsive-popover]");return this._popover}_beforePopoverClose(){if(Object.keys(this._openedSubMenuItem).length){this._openedSubMenuItem._preventSubMenuClose=false;this._closeItemSubMenu(this._openedSubMenuItem)}}_navigateBack(){const e=this._parentItemsStack.pop();this.focus();if(e){this._prepareCurrentItems(e.parentElement.items);this._parentMenuItem=this._parentItemsStack.length?this._parentItemsStack[this._parentItemsStack.length-1]:undefined}}_prepareCurrentItems(e){this._currentItems=e.map((e,t)=>({item:e,position:t+1,ariaHasPopup:e.hasChildren?"menu":undefined}))}_createSubMenu(e,t){const n=document.createElement(this.constructor.getMetadata().getTag());const s=document.createDocumentFragment();n._isSubMenu=true;n.setAttribute("id",`submenu-${t}`);n._parentMenuItem=e;const i=e.children;let r,u;for(u=0;u<i.length;u++){r=i[u].cloneNode(true);s.appendChild(r)}n.appendChild(s);this.staticAreaItem.shadowRoot.querySelector(".ui5-menu-submenus").appendChild(n);e._subMenu=n}_openItemSubMenu(e,t,n){e._subMenu.showAt(t);e._preventSubMenuClose=true;this._openedSubMenuItem=e;this._subMenuOpenerId=n}_closeItemSubMenu(e,t){if(Object.keys(e).length){if(t){e._preventSubMenuClose=false;this._closeSubMenuPopover(e._subMenu,true)}else{setTimeout(()=>this._closeSubMenuPopover(e._subMenu),0)}}}_closeSubMenuPopover(e,t){if(e&&Object.keys(e).length){const n=e._parentMenuItem;if(t||!n._preventSubMenuClose){e.close();e.remove();n._subMenu={};this._openedSubMenuItem={};this._subMenuOpenerId=""}}}_prepareSubMenuDesktopTablet(e,t,n){if(n!==this._subMenuOpenerId||e.hasChildren){this._closeItemSubMenu(this._openedSubMenuItem,true)}if(e.hasChildren){this._createSubMenu(e,n);this._openItemSubMenu(e,t,n)}if(this._parentMenuItem){this._parentMenuItem._preventSubMenuClose=true}}_prepareSubMenuPhone(e){this._prepareCurrentItems(e.items);this._parentMenuItem=e;this._parentItemsStack.push(e)}_itemMouseOver(e){if(n.isDesktop()){const t=e.target;const n=t.associatedItem;const s=t.getAttribute("id");t.focus();this._prepareSubMenuDesktopTablet(n,t,s)}}_itemMouseOut(e){if(n.isDesktop()){const t=e.target.associatedItem;if(t.hasChildren&&t._subMenu){t._preventSubMenuClose=false;this._closeItemSubMenu(t)}}}_itemKeyDown(e){const n=this.isRtl?t.isRight(e):t.isLeft(e);const s=this.isRtl?t.isLeft(e):t.isRight(e);if(t.isEnter(e)){e.preventDefault()}if(s){const t=e.target;const n=t.associatedItem;const s=t.getAttribute("id");n.hasChildren&&this._prepareSubMenuDesktopTablet(n,t,s)}else if(n&&this._isSubMenu&&this._parentMenuItem){this._parentMenuItem.parentElement._closeItemSubMenu(this._parentMenuItem,true)}}_itemClick(e){const t=e.detail.item;const s=t.associatedItem;const i=t.getAttribute("id");if(!s.hasChildren){if(!this._isSubMenu){if(n.isPhone()){this._parentMenuItem=undefined}this.fireEvent("item-click",{item:s,text:s.text});this._popover.close()}else{let t=s.parentElement;while(t._parentMenuItem){t._parentMenuItem._preventSubMenuClose=false;this._closeItemSubMenu(t._parentMenuItem);t=t._parentMenuItem.parentElement}t._itemClick(e)}}else if(n.isPhone()){this._prepareSubMenuPhone(s)}else if(n.isTablet()){this._prepareSubMenuDesktopTablet(s,t,i)}}}I.define();return I});