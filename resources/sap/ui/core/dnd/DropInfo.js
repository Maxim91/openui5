/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./DragDropBase"],function(D){"use strict";var a=D.extend("sap.ui.core.dnd.DropInfo",{metadata:{library:"sap.ui.core",interfaces:["sap.ui.core.dnd.IDropInfo"],properties:{targetAggregation:{type:"string",defaultValue:null,invalidate:false},dropEffect:{type:"sap.ui.core.dnd.DropEffect",defaultValue:"Move",invalidate:false},dropPosition:{type:"sap.ui.core.dnd.DropPosition",defaultValue:"On",invalidate:false},dropLayout:{type:"sap.ui.core.dnd.DropLayout",defaultValue:"Default",invalidate:false}},events:{dragEnter:{allowPreventDefault:true},dragOver:{},drop:{}}}});a.prototype.getDropTarget=function(){return this.getParent();};a.prototype.isDroppable=function(c,e){this.sTemporaryDropPosition="";if(!this.getEnabled()){return false;}var d=this.getDropTarget();if(!d){return false;}var t=this.getTargetAggregation();if(!this.checkMetadata(d,t,"droppable")){return false;}var t=this.getTargetAggregation();if(d===c&&!t){return true;}if(c.getParent()===d&&t===c.sParentAggregationName){return true;}if(e&&t&&d===c){var A=c.getDomRefForSetting(t);if(A&&A!=e.target&&A.contains(e.target)){e.setMark("DragWithin",t);this.sTemporaryDropPosition="On";return true;}}return false;};a.prototype.getDropPosition=function(c){if(c&&this.sTemporaryDropPosition){return this.sTemporaryDropPosition;}return this.getProperty("dropPosition");};a.prototype.getDropLayout=function(d){var s=this.getProperty("dropLayout");if(!d||s!="Default"){return s;}return this.getDropTarget().getMetadata().getDragDropInfo(this.getTargetAggregation()).layout;};a.prototype.fireDragEnter=function(e){if(!e||!e.dragSession){return;}var d=e.dragSession;return this.fireEvent("dragEnter",{dragSession:e.dragSession,browserEvent:e.originalEvent,target:d.getDropControl()},true);};a.prototype.fireDragOver=function(e){if(!e||!e.dragSession){return;}var d=e.dragSession;return this.fireEvent("dragOver",{dragSession:e.dragSession,browserEvent:e.originalEvent,target:d.getDropControl(),dropPosition:d.getDropPosition()});};a.prototype.fireDrop=function(e){if(!e||!e.dragSession){return;}var d=e.dragSession;this.fireEvent("drop",{dragSession:e.dragSession,browserEvent:e.originalEvent,dropPosition:d.getDropPosition(),draggedControl:d.getDragControl(),droppedControl:d.getDropControl()});};return a;});
