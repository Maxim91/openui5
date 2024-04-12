sap.ui.define(["exports","./thirdparty/merge","./FeaturesRegistry","./generated/AssetParameters"],function(e,t,n,a){"use strict";let r=false;let s={animationMode:"full",theme:a.DEFAULT_THEME,rtl:null,language:null,calendarType:null,noConflict:false,formatSettings:{},fetchDefaultLanguage:false};const o=()=>{T();return s.animationMode};const c=()=>{T();return s.theme};const u=()=>{T();return s.rtl};const i=()=>{T();return s.language};const l=()=>{T();return s.fetchDefaultLanguage};const g=()=>{T();return s.noConflict};const f=()=>{T();return s.calendarType};const p=()=>{T();return s.formatSettings};const d=new Map;d.set("true",true);d.set("false",false);const h=()=>{const e=document.querySelector("[data-ui5-config]")||document.querySelector("[data-id='sap-ui-config']");let n;if(e){try{n=JSON.parse(e.innerHTML)}catch(e){console.warn("Incorrect data-sap-ui-config format. Please use JSON")}if(n){s=t(s,n)}}};const m=()=>{const e=new URLSearchParams(window.location.search);e.forEach((e,t)=>{const n=t.split("sap-").length;if(n===0||n===t.split("sap-ui-").length){return}S(t,e,"sap")});e.forEach((e,t)=>{if(!t.startsWith("sap-ui")){return}S(t,e,"sap-ui")})};const L=(e,t)=>{if(e==="theme"&&t.includes("@")){return t.split("@")[0]}return t};const S=(e,t,n)=>{const a=t.toLowerCase();const r=e.split(`${n}-`)[1];if(d.has(t)){t=d.get(a)}t=L(r,t);s[r]=t};const y=()=>{const e=n.getFeature("OpenUI5Support");if(!e||!e.isLoaded()){return}const a=e.getConfigurationSettingsObject();s=t(s,a)};const T=()=>{if(r){return}h();m();y();r=true};e.getAnimationMode=o;e.getCalendarType=f;e.getFetchDefaultLanguage=l;e.getFormatSettings=p;e.getLanguage=i;e.getNoConflict=g;e.getRTL=u;e.getTheme=c;Object.defineProperty(e,"__esModule",{value:true})});