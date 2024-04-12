sap.ui.define(["sap/ui/test/opaQunit","./pages/Welcome","./pages/Product","./pages/Home","./pages/Category"],function(e){"use strict";QUnit.module("Phone navigation");e("Should navigate to a product detail page by pressing the product link of the first product tile",function(e,o,t){e.iStartMyApp();o.onTheWelcomePage.iPressTheProductLink();t.onTheProduct.iShouldSeeTheProductPage()});e("Should press back button and navigate to welcome view",function(e,o,t){o.onTheProduct.iPressTheBackButtonInProduct();t.onTheWelcomePage.iShouldSeeTheWelcomePage()});e("The category view should open by pressing the menu button",function(e,o,t){o.onTheWelcomePage.iPressTheMenuButton();t.onHome.iShouldSeeTheCategoryList()});e("Should see the product list",function(e,o,t){o.onHome.iPressOnTheFlatScreensCategory();t.onTheCategory.iShouldBeTakenToTheFlatScreensCategory().and.iShouldSeeTheProductList().and.iShouldSeeSomeEntriesInTheProductList();t.iTeardownMyApp()})});