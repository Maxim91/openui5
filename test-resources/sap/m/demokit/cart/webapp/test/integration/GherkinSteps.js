sap.ui.define(["sap/ui/test/gherkin/StepDefinitions","Startup"],function(t,e){"use strict";e=new e;return t.extend("GherkinWithOPA5.Steps",{init:function(){this.register(/^I start my App with the hash "(.*)" (.*)/i,function(t,i){var n=i.indexOf("keeping")>=0;e.iStartMyApp({keepStorage:n,hash:t})})}})});