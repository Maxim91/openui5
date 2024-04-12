/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library','./Button','./ScrollContainer','sap/ui/core/Core','sap/ui/core/Control','sap/ui/Device','sap/m/HeaderContainerItemNavigator','sap/ui/core/delegate/ItemNavigation','sap/ui/core/library','sap/ui/core/IntervalTrigger','sap/ui/core/Icon','./HeaderContainerRenderer',"sap/base/Log","sap/ui/events/KeyCodes","sap/ui/events/PseudoEvents","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/control","sap/ui/dom/jquery/scrollLeftRTL","sap/ui/dom/jquery/scrollRightRTL","sap/ui/dom/jquery/Selectors"],function(l,B,S,C,c,D,H,I,d,e,f,g,L,K,P,q){"use strict";var O=d.Orientation;var h=l.ScreenSizes;var j=c.extend("sap.m.HeaderContainerItemContainer",{metadata:{defaultAggregation:"item",properties:{position:{type:"int",defaultValue:null},setSize:{type:"int",defaultValue:null},ariaLabelledBy:{type:"string",defaultValue:null}},aggregations:{item:{type:"sap.ui.core.Control",multiple:false}}},renderer:{apiVersion:2,render:function(r,o){var i=o.getAggregation("item");if(!i||!i.getVisible()){return;}r.openStart("div",o);r.class("sapMHdrCntrItemCntr");r.class("sapMHrdrCntrInner");r.attr("aria-setsize",o.getSetSize());r.attr("aria-posinset",o.getPosition());r.attr("role","listitem");if(o.getAriaLabelledBy()){r.attr("aria-labelledby",o.getAriaLabelledBy());}r.openEnd();r.renderControl(i);r.close("div");}}});var m=c.extend("sap.m.HeaderContainer",{metadata:{interfaces:["sap.m.ObjectHeaderContainer"],library:"sap.m",properties:{scrollStep:{type:"int",defaultValue:300,group:"Behavior"},scrollStepByItem:{type:"int",defaultValue:1,group:"Behavior"},scrollTime:{type:"int",defaultValue:500,group:"Behavior"},showOverflowItem:{type:"boolean",defaultValue:true,group:"Behavior"},showDividers:{type:"boolean",defaultValue:true,group:"Appearance"},orientation:{type:"sap.ui.core.Orientation",defaultValue:O.Horizontal,group:"Appearance"},backgroundDesign:{type:"sap.m.BackgroundDesign",defaultValue:l.BackgroundDesign.Transparent,group:"Appearance"},width:{type:"sap.ui.core.CSSSize",group:"Appearance"},height:{type:"sap.ui.core.CSSSize",group:"Appearance"},gridLayout:{type:"boolean",defaultValue:false}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true},_scrollContainer:{type:"sap.m.ScrollContainer",multiple:false,visibility:"hidden"},_prevButton:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_nextButton:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{scroll:{}}}});m.prototype.init=function(){this._aItemEnd=[];this._bRtl=sap.ui.getCore().getConfiguration().getRTL();this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oScrollCntr=new S(this.getId()+"-scrl-cntnr",{width:"100%",height:"100%",horizontal:!D.system.desktop});this.setAggregation("_scrollContainer",this._oScrollCntr,true);if(D.system.desktop){this._oArrowPrev=new B({id:this.getId()+"-scrl-prev-button",type:l.ButtonType.Transparent,tooltip:this._oRb.getText("HEADERCONTAINER_BUTTON_PREV_SECTION"),press:function(E){E.cancelBubble();this._scroll(this._getScrollValue(false),this.getScrollTime());}.bind(this)}).addStyleClass("sapMHdrCntrBtn").addStyleClass("sapMHdrCntrLeft");this._oArrowPrev._bExcludeFromTabChain=true;this.setAggregation("_prevButton",this._oArrowPrev,true);this._oArrowNext=new B({id:this.getId()+"-scrl-next-button",type:l.ButtonType.Transparent,tooltip:this._oRb.getText("HEADERCONTAINER_BUTTON_NEXT_SECTION"),press:function(E){E.cancelBubble();this._scroll(this._getScrollValue(true),this.getScrollTime());}.bind(this)}).addStyleClass("sapMHdrCntrBtn").addStyleClass("sapMHdrCntrRight");this._oArrowNext._bExcludeFromTabChain=true;this.setAggregation("_nextButton",this._oArrowNext,true);}else if((D.system.phone||D.system.tablet)){if(!this._isMobileView()){this._oArrowPrev=new f({id:this.getId()+"-scrl-prev-button"}).addStyleClass("sapMHdrCntrBtn").addStyleClass("sapMHdrCntrLeft");this.setAggregation("_prevButton",this._oArrowPrev,true);this._oArrowNext=new f({id:this.getId()+"-scrl-next-button"}).addStyleClass("sapMHdrCntrBtn").addStyleClass("sapMHdrCntrRight");this.setAggregation("_nextButton",this._oArrowNext,true);}}this._oScrollCntr.addDelegate({onAfterRendering:function(){if(D.system.desktop){var F=this._oScrollCntr.getDomRef("scroll");var o=this._oScrollCntr.$("scroll");var k=o.find(".sapMHrdrCntrInner").attr("tabindex","0");F.setAttribute("role","list");if(!this._oItemNavigation){this._oItemNavigation=new H();this.addDelegate(this._oItemNavigation);this._oItemNavigation.attachEvent(I.Events.BorderReached,this._handleBorderReached,this);this._oItemNavigation.attachEvent(I.Events.AfterFocus,this._handleAfterFocus,this);this._oItemNavigation.attachEvent(I.Events.BeforeFocus,this._handleBeforeFocus,this);}this._oItemNavigation.setRootDomRef(F);this._oItemNavigation.setItemDomRefs(k);this._oItemNavigation.setTabIndex0();this._oItemNavigation.setCycling(false);this._handleMobileScrolling();}if(this._isMobileView()){this._oScrollCntr.attachBrowserEvent("scrollstart",function(E){var a=this._filterVisibleItems();this.aItemSize=[];this.aItemScrollValue=[0];var G=function(b){if(b.getDomRef()&&b.getDomRef().parentElement){return b.getDomRef().parentElement.offsetWidth+parseFloat(getComputedStyle(b.getDomRef().parentElement).marginLeft)+parseFloat(getComputedStyle(b.getDomRef().parentElement).marginRight);}};for(var i=0;i<a.length;i++){this.aItemSize.push(G(a[i]));this.aItemScrollValue.push(this.aItemScrollValue[i]?this.aItemScrollValue[i]+this.aItemSize[i]:this.aItemSize[i]);}this.triggerScrollStop=false;}.bind(this));this._oScrollCntr.attachBrowserEvent("scrollstop",function(E){if(!this.triggerScrollStop){var i=this._filterVisibleItems();this.triggerScrollStop=true;var s=0,n=15;var p=this._oScrollCntr.getDomRef().scrollLeft;var r=p+this._oScrollCntr.getDomRef().clientWidth;var t=i[i.length-1];var u=t.getParent().getDomRef().offsetLeft;var v=u+t.getDomRef().clientWidth;var w=((v<=r)&&(u>=p));var x=this._bRtl?Math.abs(E.currentTarget.scrollLeft):E.currentTarget.scrollLeft;if(w){s=this.aItemScrollValue[i.length-1]-n-x;this.triggerScrollStop=false;}else{var y=this.aItemScrollValue.reduce(function(a,b){var z=Math.abs(a-x);var A=Math.abs(b-x);if(z==A){return a>b?a:b;}else{return A<z?b:a;}});if(x==0){s=0;this.triggerScrollStop=false;}else{s=y-n-x;}}this._scroll(s,this.getScrollTime());}}.bind(this));}}.bind(this)});e.addListener(this._checkOverflow,this);};m.prototype.onBeforeRendering=function(){var i=this.getOrientation()===O.Horizontal,s=i?"sap-icon://slim-arrow-left":"sap-icon://slim-arrow-up",a=i?"sap-icon://slim-arrow-right":"sap-icon://slim-arrow-down";if(!this.getHeight()){L.warning("No height provided",this);}if(!this.getWidth()){L.warning("No width provided",this);}if(D.system.desktop){this._oArrowPrev.setProperty("icon",s,true);this._oArrowNext.setProperty("icon",a,true);}else if(D.system.phone||D.system.tablet){this._oArrowPrev.setProperty("src",s,true);this._oArrowNext.setProperty("src",a,true);}this.getContent();};m.prototype.onAfterRendering=function(){this._bRtl=sap.ui.getCore().getConfiguration().getRTL();this._checkOverflow();};m.prototype.exit=function(){if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();this._oItemNavigation=null;}e.removeListener(this._checkOverflow,this);};m.prototype.onsaptabnext=function(E){var F=this.$().find(":focusable");var t=F.index(E.target);var n=F.eq(t+1).get(0);var o=this._getParentCell(E.target);var T;if(n){T=this._getParentCell(n);}if((o&&T&&o.id!==T.id)||(n&&n.id===this.getId()+"-after")||(n&&n.id===this.getId()+"-scrl-prev-button")||(n&&n.id===this.getId()+"-scrl-next-button")){var a=F.last().get(0);if(a){this._bIgnoreFocusIn=true;a.focus();}}};m.prototype.onsaptabprevious=function(E){this.$().find(".sapMHdrCntrItemCntr").css("border-color","");var F=this.$().find(":focusable");var t=F.index(E.target);var p=F.eq(t-1).get(0);var o=this._getParentCell(E.target);var T;if(p){T=this._getParentCell(p);}if(!T||o&&o.id!==T.id){var s=this.$().attr("tabindex");this.$().attr("tabindex","0");this.$().trigger("focus");if(!s){this.$().removeAttr("tabindex");}else{this.$().attr("tabindex",s);}}};m.prototype.setOrientation=function(v){this.setProperty("orientation",v);if(v===O.Horizontal&&!D.system.desktop){this._oScrollCntr.setHorizontal(true);this._oScrollCntr.setVertical(false);}else if(!D.system.desktop){this._oScrollCntr.setHorizontal(false);this._oScrollCntr.setVertical(true);}return this;};m.prototype.validateAggregation=function(a,o,M){return this._callSuperMethod("validateAggregation",a,o,M);};m.prototype.getAggregation=function(a,o,s){return this._callSuperMethod("getAggregation",a,o,s);};m.prototype.setAggregation=function(a,o,s){return this._callSuperMethod("setAggregation",a,o,s);};m.prototype.indexOfAggregation=function(a,o){return this._callSuperMethod("indexOfAggregation",a,o);};m.prototype.insertAggregation=function(a,o,i,s){return this._callSuperMethod("insertAggregation",a,o,i,s);};m.prototype.addAggregation=function(a,o,s){return this._callSuperMethod("addAggregation",a,o,s);};m.prototype.removeAggregation=function(a,o,s){return this._callSuperMethod("removeAggregation",a,o,s);};m.prototype.removeAllAggregation=function(a,s){return this._callSuperMethod("removeAllAggregation",a,s);};m.prototype.destroyAggregation=function(a,s){return this._callSuperMethod("destroyAggregation",a,s);};m.prototype.onkeydown=function(E){var b=this.getOrientation()===O.Horizontal,$=this.$("prev-button-container"),a=this.$("next-button-container"),s,i=0,k=this._filterVisibleItems();if(E.which===K.ARROW_RIGHT&&b){s=k[E.srcControl.mProperties.position-1].$().parent().outerWidth(true);if(s<this._getSize($.is(":visible"))){this._scroll((s-i),this.getScrollTime());}}else if(E.which===K.ARROW_LEFT&&b){s=k[E.srcControl.mProperties.position-1].$().parent().outerWidth(true);if(s<this._getSize(a.is(":visible"))){if(!a.is(":visible")){var n=10;if(s+n<this._getSize(true)){i=a.width()+n;}else{i=a.width();}}this._scroll(-(s-i),this.getScrollTime());}}if(E.which===K.ARROW_DOWN&&!b){s=k[E.srcControl.mProperties.position-1].$().parent().outerHeight(true);if(s<this._getSize($.is(":visible"))){this._scroll((s-i),this.getScrollTime());}}else if(E.which===K.ARROW_UP&&!b){s=k[E.srcControl.mProperties.position-1].$().parent().outerHeight(true);if(s<this._getSize(a.is(":visible"))){if(!a.is(":visible")){var n=10;if(s+n<this._getSize(true)){i=a.height()+n;}else{i=a.wheightidth();}}this._scroll(-(s-i),this.getScrollTime());}}};m.prototype._setScrollInProcess=function(v){this.bScrollInProcess=v;};m.prototype._scroll=function(i,a){this._setScrollInProcess(true);this.fireScroll();setTimeout(this._setScrollInProcess.bind(this,false),a+300);if(this.getOrientation()===O.Horizontal){this._hScroll(i,a);}else{this._vScroll(i,a);}};m.prototype._vScroll=function(a,b){var o=this._oScrollCntr.getDomRef(),s=o.scrollTop,i=o.scrollHeight,k=s+a,n=o.clientHeight,p=parseFloat(this.$("scroll-area").css("padding-top")),r;if(k<=0){r=this._calculateRemainingScrolling(a,b,s);this.$("scroll-area").css("transition","padding "+r+"s");this.$().removeClass("sapMHrdrTopPadding");}else if(k+n+p>=i){r=this._calculateRemainingScrolling(a,b,i-n-s);this.$("scroll-area").css("transition","padding "+r+"s");if(n+a>i&&n!==i){this.$().removeClass("sapMHrdrBottomPadding");this.$().addClass("sapMHrdrTopPadding");}else{this.$().removeClass("sapMHrdrBottomPadding");}}else{this.$("scroll-area").css("transition","padding "+b/1000+"s");}this._oScrollCntr.scrollTo(0,k,b);};m.prototype._hScroll=function(a,b){var o=this._oScrollCntr.getDomRef();var s,i,k,n,p,r;if(!this._bRtl){i=o.scrollLeft;n=o.scrollWidth;k=o.clientWidth;s=i+a;p=parseFloat(this.$("scroll-area").css("padding-left"));if(s<=0){r=this._calculateRemainingScrolling(a,b,i);this.$("scroll-area").css("transition","padding "+r+"s");this.$().removeClass("sapMHrdrLeftPadding");}else if(s+o.clientWidth+p>=n){r=this._calculateRemainingScrolling(a,b,n-k-i);this.$("scroll-area").css("transition","padding "+r+"s");if(k+a>n&&k!==n){this.$().removeClass("sapMHrdrRightPadding");this.$().addClass("sapMHrdrLeftPadding");}else{this.$().removeClass("sapMHrdrRightPadding");}}else{this.$("scroll-area").css("transition","padding "+b/1000+"s");}this._oScrollCntr.scrollTo(s,0,b);}else{s=q(o).scrollRightRTL()+a;this._oScrollCntr.scrollTo((s>0)?s:0,0,b);}};m.prototype._collectItemSize=function(){var s=0,a=this._filterVisibleItems(),F=this.getOrientation()===O.Horizontal?"outerWidth":"outerHeight";this._aItemEnd=[];a.forEach(function(o,i){s+=o.$().parent()[F](true);this._aItemEnd[i]=s;},this);};m.prototype._getScrollValue=function(F){if(!this._oScrollCntr){return 0;}var b=this.getOrientation()===O.Horizontal,$=this._oScrollCntr.$(),a=this.$("prev-button-container"),n=this.$("next-button-container"),s=b?$[0].scrollLeft:$[0].scrollTop,t=0,o=0,p,r=this._filterVisibleItems();var G=function(k){var o=0,v=0;var w=10;if(this._bRtl&&b){if(!a.is(":visible")){v=a.width();}if(!n.is(":visible")){v=n.width();}}for(var i=0;i<r.length&&i<k;i++){o+=u(r[i]);}return o!==0?o+w-v:0;}.bind(this);var u=function(k){return b?k.$().parent().outerWidth(true):k.$().parent().outerHeight(true);};var E=function(){var o=this._getSize(true),M,A=0;for(var i=t;i<r.length;i++){if(!r[i].$().is(":visible")){M=u(r[i])+G(i)-o-s;for(var k=t;k<r.length&&k<i;k++){if(p+A>M){break;}t++;A+=u(r[k]);}p+=A;break;}}}.bind(this);if(this.getScrollStepByItem()>0){s=b&&this._bRtl?$.scrollRightRTL():s;for(var i=0;i<r.length;i++){o+=u(r[i]);if(o>=s){t=i;break;}}t=(F?1:-1)*this.getScrollStepByItem()+t;if(t<0){t=0;}if(t>=r.length){t=r.length-1;}p=G(t)-s;if(F&&!this.getShowOverflowItem()){E();}return p;}return F?this.getScrollStep():-this.getScrollStep();};m.prototype._calculateRemainingScrolling=function(a,b,i){return Math.abs(i*b/(1000*a));};m.prototype._checkOverflow=function(){if(this.getOrientation()===O.Horizontal){this._checkHOverflow();}else{this._checkVOverflow();}};m.prototype._filterVisibleItems=function(){return this.getContent().filter(function(i){return i.getVisible();});};m.prototype._getFirstItemOffset=function(t){var F=this._filterVisibleItems()[0],$=F&&F.$(),a=$&&$.parent(),i=a&&a[0]&&a[0][t];return i||0;};m.prototype._checkVOverflow=function(){var b=this._oScrollCntr.getDomRef(),o,$;if(b){var F=this._getFirstItemOffset("offsetTop");var s=Math.ceil(b.scrollTop);var a=false;var i=false;var r=b.scrollHeight;var k=b.offsetHeight;if(Math.abs(r-k)===1){r=k;}if(s>F){a=true;}if((r>k)&&(s+k<r)){i=true;}i=this._checkForOverflowItem(i);$=this.$("prev-button-container");o=$.is(":visible");if(o&&!a){$.hide();this.$().removeClass("sapMHrdrTopPadding");}if(!o&&a){$.show();this.$().addClass("sapMHrdrTopPadding");}$=this.$("next-button-container");var n=$.is(":visible");if(n&&!i){$.hide();this.$().removeClass("sapMHrdrBottomPadding");}if(!n&&i){$.show();this.$().addClass("sapMHrdrBottomPadding");}}};m.prototype._handleMobileScrolling=function(){if(C.isMobile()){var $=this.$("scrl-cntnr-scroll"),i=this.getOrientation()===O.Horizontal,p=i?"clientX":"clientY",a=0,t=this,s=false;$.on("touchstart",function(E){s=true;a=E.targetTouches[0][p];});$.on("touchmove",function(E){if(s){var b=E.targetTouches[0][p],k=a-b,o=t._oScrollCntr.getDomRef();i?o.scrollLeft+=k:o.scrollTop+=k;a=b;E.preventDefault();}});$.on("touchend",function(){s=false;});}};m.prototype._checkHOverflow=function(){var b=this._oScrollCntr.getDomRef(),$;if(b){var F=this._getFirstItemOffset("offsetLeft");var s=Math.ceil(b.scrollLeft);var a=false;var i=false;var r=b.scrollWidth;var k=b.offsetWidth;if(Math.abs(r-k)===1){r=k;}if(this._bRtl){var n=q(b).scrollLeftRTL();if(n>0){i=true;}}else if(s>F){a=true;}if(r-5>k){if(this._bRtl){if(q(b).scrollRightRTL()>1){a=true;}}else if(s+k<r){i=true;}}$=this.$("prev-button-container");i=this._checkForOverflowItem(i);var o=$.is(":visible");if(o&&!a&&!this._isMobileView()){$.hide();this.$().removeClass("sapMHrdrLeftPadding");}if(!o&&a&&!this._isMobileView()){$.show();this.$().addClass("sapMHrdrLeftPadding");}$=this.$("next-button-container");var p=$.is(":visible");if(p&&!i&&!this._isMobileView()){$.hide();this.$().removeClass("sapMHrdrRightPadding");}if(!p&&i&&!this._isMobileView()){$.show();this.$().addClass("sapMHrdrRightPadding");}}};m.prototype._getSize=function(a){var $=this._oScrollCntr.$(),b=this.getOrientation()===O.Horizontal,i=this.$("next-button-container"),k=!i.is(":visible")&&a,F=b?"width":"height";return $[F]()-(k?i[F]():0);};m.prototype._checkForOverflowItem=function(s){if(this._oScrollCntr&&!this.getShowOverflowItem()){var $=this._oScrollCntr.$(),b=this.getOrientation()===O.Horizontal,a=!b?$[0].scrollTop:(this._bRtl?$.scrollRightRTL():$[0].scrollLeft),F=b?"width":"height",k=this._getSize(s),n=this._filterVisibleItems();this._collectItemSize();this._aItemEnd.forEach(function(E,i){var o=n[i].$(),p=o.parent(),v=o.is(":visible");if(s&&E>a+k){if(i===0||this._aItemEnd[i-1]<=a){p.css(F,"auto");o.show();}else if(v){p[F](p[F]());o.hide();s=true;}}else{if(!v){p.css(F,"auto");o.show();}}},this);}return s;};m.prototype._handleBorderReached=function(E){var i=E.getParameter("index");if(i===0){this._scroll(this._getScrollValue(false),this.getScrollTime());}else if(i===this._filterVisibleItems().length-1){this._scroll(this._getScrollValue(true),this.getScrollTime());}};m.prototype._handleAfterFocus=function(E){var i=E.getParameter("index");if(i===0){this._scroll(this._getScrollValue(false),this.getScrollTime());}else if(i===this._filterVisibleItems().length-1){this._scroll(this._getScrollValue(true),this.getScrollTime());}};m.prototype._handleFocusAgain=function(E){E.getParameter("event").preventDefault();};m.prototype._handleBeforeFocus=function(E){var o=E.getParameter("event");if(q(o.target).hasClass("sapMHdrCntrItemCntr")||q(o.target).hasClass("sapMScrollContScroll")||P.events.sapprevious.fnCheck(o)||P.events.sapnext.fnCheck(o)){this.$().find(".sapMHdrCntrItemCntr").css("border-color","");}else{this.$().find(".sapMHdrCntrItemCntr").css("border-color","transparent");}};m.prototype._isMobileView=function(){return this.getGridLayout()&&this.getOrientation()===O.Horizontal&&D.resize.width>=h.xsmall&&D.resize.width<h.tablet;};m.prototype._unWrapHeaderContainerItemContainer=function(w){if(w instanceof j){w=w.getItem();}else if(Array.isArray(w)){for(var i=0;i<w.length;i++){if(w[i]instanceof j){w[i]=w[i].getItem();}}}return w;};m._AGGREGATION_FUNCTIONS=["validateAggregation","getAggregation","setAggregation","indexOfAggregation","removeAggregation"];m._AGGREGATION_FUNCTIONS_FOR_INSERT=["insertAggregation","addAggregation"];m.prototype._callSuperMethod=function(F,a){var b=Array.prototype.slice.call(arguments);if(a==="content"){var o=b[2];b[1]="content";if(o instanceof c){if(m._AGGREGATION_FUNCTIONS.indexOf(F)>-1&&o.getParent()instanceof j){b[2]=o.getParent();}else if(m._AGGREGATION_FUNCTIONS_FOR_INSERT.indexOf(F)>-1){b[2]=new j({item:o});}}var k=[];this._oScrollCntr.getContent().forEach(function(o,t){if(!o.getItem()){k.push(t);}});for(var i=0;i<k.length;i++){this._oScrollCntr.removeContent(k[i]);}var r=this._oScrollCntr[F].apply(this._oScrollCntr,b.slice(1));if(F!=="removeAllAggregation"){var n=this._oScrollCntr.getContent();var A=this.getAriaLabelledBy();var p=1;var v=n.filter(function(t){return t.getItem().getVisible();}).length;for(var i=0;i<n.length;i++){var s=n[i];if(s.getItem().getVisible()){s.setVisible(true);s.setPosition(p);s.setSetSize(v);s.setAriaLabelledBy(A[i]);p++;}else{s.setVisible(false);}}}return this._unWrapHeaderContainerItemContainer(r);}else{return c.prototype[F].apply(this,b.slice(1));}};m.prototype._callMethodInManagedObject=function(){throw new TypeError("Method no longer exists: HeaderContainer.prototype._callMethodInManagedObject");};m.prototype._getParentCell=function(o){return q(o).parents(".sapMHrdrCntrInner").andSelf(".sapMHrdrCntrInner").get(0);};m.prototype.onfocusin=function(E){if(this._bIgnoreFocusIn){this._bIgnoreFocusIn=false;return;}if(E.target.id===this.getId()+"-after"){this._restoreLastFocused();}};m.prototype._restoreLastFocused=function(){if(!this._oItemNavigation){return;}var n=this._oItemNavigation.getItemDomRefs();var i=this._oItemNavigation.getFocusedIndex();var $=q(n[i]);var r=$.control(0)||{};var t=r.getTabbables?r.getTabbables():$.find(":sapTabbable");t.eq(-1).add($).eq(-1).trigger("focus");};return m;});
