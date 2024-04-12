ace.define("ace/mode/verilog_highlight_rules",[],function(r,e,m){"use strict";var o=r("../lib/oop");var T=r("./text_highlight_rules").TextHighlightRules;var V=function(){var k="always|and|assign|automatic|begin|buf|bufif0|bufif1|case|casex|casez|cell|cmos|config|"+"deassign|default|defparam|design|disable|edge|else|end|endcase|endconfig|endfunction|endgenerate|endmodule|"+"endprimitive|endspecify|endtable|endtask|event|for|force|forever|fork|function|generate|genvar|highz0|"+"highz1|if|ifnone|incdir|include|initial|inout|input|instance|integer|join|large|liblist|library|localparam|"+"macromodule|medium|module|nand|negedge|nmos|nor|noshowcancelled|not|notif0|notif1|or|output|parameter|pmos|"+"posedge|primitive|pull0|pull1|pulldown|pullup|pulsestyle_onevent|pulsestyle_ondetect|rcmos|real|realtime|"+"reg|release|repeat|rnmos|rpmos|rtran|rtranif0|rtranif1|scalared|showcancelled|signed|small|specify|specparam|"+"strong0|strong1|supply0|supply1|table|task|time|tran|tranif0|tranif1|tri|tri0|tri1|triand|trior|trireg|"+"unsigned|use|vectored|wait|wand|weak0|weak1|while|wire|wor|xnor|xor"+"begin|bufif0|bufif1|case|casex|casez|config|else|end|endcase|endconfig|endfunction|"+"endgenerate|endmodule|endprimitive|endspecify|endtable|endtask|for|forever|function|generate|if|ifnone|"+"macromodule|module|primitive|repeat|specify|table|task|while";var b=("true|false|null");var a=("count|min|max|avg|sum|rank|now|coalesce|main");var c=this.createKeywordMapper({"support.function":a,"keyword":k,"constant.language":b},"identifier",true);this.$rules={"start":[{token:"comment",regex:"//.*$"},{token:"comment.start",regex:"/\\*",next:[{token:"comment.end",regex:"\\*/",next:"start"},{defaultToken:"comment"}]},{token:"string.start",regex:'"',next:[{token:"constant.language.escape",regex:/\\(?:[ntvfa\\"]|[0-7]{1,3}|\x[a-fA-F\d]{1,2}|)/,consumeLineEnd:true},{token:"string.end",regex:'"|$',next:"start"},{defaultToken:"string"}]},{token:"string",regex:"'^[']'"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:c,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|="},{token:"paren.lparen",regex:"[\\(]"},{token:"paren.rparen",regex:"[\\)]"},{token:"text",regex:"\\s+"}]};this.normalizeRules();};o.inherits(V,T);e.VerilogHighlightRules=V;});ace.define("ace/mode/verilog",[],function(r,e,m){"use strict";var o=r("../lib/oop");var T=r("./text").Mode;var V=r("./verilog_highlight_rules").VerilogHighlightRules;var R=r("../range").Range;var M=function(){this.HighlightRules=V;this.$behaviour=this.$defaultBehaviour;};o.inherits(M,T);(function(){this.lineCommentStart="//";this.blockComment={start:"/*",end:"*/"};this.$quotes={'"':'"'};this.$id="ace/mode/verilog";}).call(M.prototype);e.Mode=M;});(function(){ace.require(["ace/mode/verilog"],function(m){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=m;}});})();
