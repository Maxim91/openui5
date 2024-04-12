/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/thirdparty/adaptivecards"],function(A){"use strict";return function(b){if(b===0){b="ac-pushButton";}var h=this.parent.hostConfig;var a=document.createElement("ui5-button");this.addCssClasses(a);a.setAttribute("aria-label",this.title);a.type="button";a.style.display="flex";a.style.alignItems="center";a.style.justifyContent="center";var s=this.style;if(s==="positive"){a.setAttribute("design","Positive");}else if(s==="destructive"){a.setAttribute("design","Negative");}var c=this.title;var t=document.createElement("div");t.style.overflow="hidden";t.style.textOverflow="ellipsis";if(!(h.actions.iconPlacement===A.ActionIconPlacement.AboveTitle||h.actions.allowTitleToWrap)){t.style.whiteSpace="nowrap";}if(c){t.innerText=this.title;}if(!this.iconUrl){a.classList.add("noIcon");a.appendChild(t);}else{var i=document.createElement("img");i.src=this.iconUrl;i.style.width=h.actions.iconSize+"px";i.style.height=h.actions.iconSize+"px";i.style.flex="0 0 auto";if(h.actions.iconPlacement===A.ActionIconPlacement.AboveTitle){a.classList.add("iconAbove");a.style.flexDirection="column";if(c){i.style.marginBottom="4px";}}else{a.classList.add("iconLeft");if(c){i.style.marginRight="4px";}}a.appendChild(i);a.appendChild(t);}this._renderedElement=a;};});
