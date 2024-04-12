sap.ui.define(["sap/ui/base/Object","sap/base/Log"],function(t,e){"use strict";return t.extend("sap.ui.demo.orderbrowser.controller.ListSelector",{constructor:function(){this._oWhenListHasBeenSet=new Promise(function(t){this._fnResolveListHasBeenSet=t}.bind(this));this.oWhenListLoadingIsDone=new Promise(function(t,e){this._oWhenListHasBeenSet.then(function(n){n.getBinding("items").attachEventOnce("dataReceived",function(){if(this._oList.getItems().length){t({list:n})}else{e({list:n})}}.bind(this))}.bind(this))}.bind(this))},setBoundMasterList:function(t){this._oList=t;this._fnResolveListHasBeenSet(t)},selectAListItem:function(t){this.oWhenListLoadingIsDone.then(function(){var e=this._oList,n;if(e.getMode()==="None"){return}n=e.getSelectedItem();if(n&&n.getBindingContext().getPath()===t){return}e.getItems().some(function(n){if(n.getBindingContext()&&n.getBindingContext().getPath()===t){e.setSelectedItem(n);return true}})}.bind(this),function(){e.warning("Could not select the list item with the path"+t+" because the list encountered an error or had no items")})},clearMasterListSelection:function(){this._oWhenListHasBeenSet.then(function(){this._oList.removeSelections(true)}.bind(this))}})});