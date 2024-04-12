ace.define("ace/mode/terraform_highlight_rules",[],function(r,e,m){"use strict";var o=r("../lib/oop");var T=r("./text_highlight_rules").TextHighlightRules;var a=function(){this.$rules={"start":[{token:['storage.function.terraform'],regex:'\\b(output|resource|data|variable|module|export)\\b'},{token:"variable.terraform",regex:"\\$\\s",push:[{token:"keyword.terraform",regex:"(-var-file|-var)"},{token:"variable.terraform",regex:"\\n|$",next:"pop"},{include:"strings"},{include:"variables"},{include:"operators"},{defaultToken:"text"}]},{token:"language.support.class",regex:"\\b(timeouts|provider|connection|provisioner|lifecycleprovider|atlas)\\b"},{token:"singleline.comment.terraform",regex:'#.*$'},{token:"singleline.comment.terraform",regex:'//.*$'},{token:"multiline.comment.begin.terraform",regex:/\/\*/,push:"blockComment"},{token:"storage.function.terraform",regex:"^\\s*(locals|terraform)\\s*{"},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{include:"constants"},{include:"strings"},{include:"operators"},{include:"variables"}],blockComment:[{regex:/\*\//,token:"multiline.comment.end.terraform",next:"pop"},{defaultToken:"comment"}],"constants":[{token:"constant.language.terraform",regex:"\\b(true|false|yes|no|on|off|EOF)\\b"},{token:"constant.numeric.terraform",regex:"(\\b([0-9]+)([kKmMgG]b?)?\\b)|(\\b(0x[0-9A-Fa-f]+)([kKmMgG]b?)?\\b)"}],"variables":[{token:["variable.assignment.terraform","keyword.operator"],regex:"\\b([a-zA-Z_]+)(\\s*=)"}],"interpolated_variables":[{token:"variable.terraform",regex:"\\b(var|self|count|path|local)\\b(?:\\.*[a-zA-Z_-]*)?"}],"strings":[{token:"punctuation.quote.terraform",regex:"'",push:[{token:'punctuation.quote.terraform',regex:"'",next:'pop'},{include:"escaped_chars"},{defaultToken:'string'}]},{token:"punctuation.quote.terraform",regex:'"',push:[{token:'punctuation.quote.terraform',regex:'"',next:'pop'},{include:"interpolation"},{include:"escaped_chars"},{defaultToken:'string'}]}],"escaped_chars":[{token:"constant.escaped_char.terraform",regex:"\\\\."}],"operators":[{token:"keyword.operator",regex:"\\?|:|==|!=|>|<|>=|<=|&&|\\|\\\||!|%|&|\\*|\\+|\\-|/|="}],"interpolation":[{token:"punctuation.interpolated.begin.terraform",regex:"\\$?\\$\\{",push:[{token:"punctuation.interpolated.end.terraform",regex:"\\}",next:"pop"},{include:"interpolated_variables"},{include:"operators"},{include:"constants"},{include:"strings"},{include:"functions"},{include:"parenthesis"},{defaultToken:"punctuation"}]}],"functions":[{token:"keyword.function.terraform",regex:"\\b(abs|basename|base64decode|base64encode|base64gzip|base64sha256|base64sha512|bcrypt|ceil|chomp|chunklist|cidrhost|cidrnetmask|cidrsubnet|coalesce|coalescelist|compact|concat|contains|dirname|distinct|element|file|floor|flatten|format|formatlist|indent|index|join|jsonencode|keys|length|list|log|lookup|lower|map|matchkeys|max|merge|min|md5|pathexpand|pow|replace|rsadecrypt|sha1|sha256|sha512|signum|slice|sort|split|substr|timestamp|timeadd|title|transpose|trimspace|upper|urlencode|uuid|values|zipmap)\\b"}],"parenthesis":[{token:"paren.lparen",regex:"\\["},{token:"paren.rparen",regex:"\\]"}]};this.normalizeRules();};o.inherits(a,T);e.TerraformHighlightRules=a;});ace.define("ace/mode/folding/cstyle",[],function(r,e,a){"use strict";var o=r("../../lib/oop");var R=r("../../range").Range;var B=r("./fold_mode").FoldMode;var F=e.FoldMode=function(c){if(c){this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+c.start));this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+c.end));}};o.inherits(F,B);(function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/;this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/;this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/;this._getFoldWidgetBase=this.getFoldWidget;this.getFoldWidget=function(s,f,b){var l=s.getLine(b);if(this.singleLineBlockCommentRe.test(l)){if(!this.startRegionRe.test(l)&&!this.tripleStarBlockCommentRe.test(l))return"";}var c=this._getFoldWidgetBase(s,f,b);if(!c&&this.startRegionRe.test(l))return"start";return c;};this.getFoldWidgetRange=function(s,f,b,c){var l=s.getLine(b);if(this.startRegionRe.test(l))return this.getCommentRegionBlock(s,l,b);var m=l.match(this.foldingStartMarker);if(m){var i=m.index;if(m[1])return this.openingBracketBlock(s,m[1],b,i);var d=s.getCommentFoldRange(b,i+m[0].length,1);if(d&&!d.isMultiLine()){if(c){d=this.getSectionRange(s,b);}else if(f!="all")d=null;}return d;}if(f==="markbegin")return;var m=l.match(this.foldingStopMarker);if(m){var i=m.index+m[0].length;if(m[1])return this.closingBracketBlock(s,m[1],b,i);return s.getCommentFoldRange(b,i,-1);}};this.getSectionRange=function(s,b){var l=s.getLine(b);var c=l.search(/\S/);var d=b;var f=l.length;b=b+1;var g=b;var m=s.getLength();while(++b<m){l=s.getLine(b);var i=l.search(/\S/);if(i===-1)continue;if(c>i)break;var h=this.getFoldWidgetRange(s,"all",b);if(h){if(h.start.row<=d){break;}else if(h.isMultiLine()){b=h.end.row;}else if(c==i){break;}}g=b;}return new R(d,f,g,s.getLine(g).length);};this.getCommentRegionBlock=function(s,l,b){var c=l.search(/\s*$/);var d=s.getLength();var f=b;var g=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;var h=1;while(++b<d){l=s.getLine(b);var m=g.exec(l);if(!m)continue;if(m[1])h--;else h++;if(!h)break;}var i=b;if(i>f){return new R(f,c,i,l.length);}};}).call(F.prototype);});ace.define("ace/mode/matching_brace_outdent",[],function(r,e,m){"use strict";var R=r("../range").Range;var M=function(){};(function(){this.checkOutdent=function(l,i){if(!/^\s+$/.test(l))return false;return/^\s*\}/.test(i);};this.autoOutdent=function(d,a){var l=d.getLine(a);var b=l.match(/^(\s*\})/);if(!b)return 0;var c=b[1].length;var o=d.findMatchingBracket({row:a,column:c});if(!o||o.row==a)return 0;var i=this.$getIndent(d.getLine(o.row));d.replace(new R(a,0,a,c-1),i);};this.$getIndent=function(l){return l.match(/^\s*/)[0];};}).call(M.prototype);e.MatchingBraceOutdent=M;});ace.define("ace/mode/terraform",[],function(r,e,m){"use strict";var o=r("../lib/oop");var T=r("./text").Mode;var a=r("./terraform_highlight_rules").TerraformHighlightRules;var C=r("./behaviour/cstyle").CstyleBehaviour;var b=r("./folding/cstyle").FoldMode;var M=r("./matching_brace_outdent").MatchingBraceOutdent;var c=function(){T.call(this);this.HighlightRules=a;this.$outdent=new M();this.$behaviour=new C();this.foldingRules=new b();};o.inherits(c,T);(function(){this.lineCommentStart=["#","//"];this.blockComment={start:"/*",end:"*/"};this.$id="ace/mode/terraform";}).call(c.prototype);e.Mode=c;});(function(){ace.require(["ace/mode/terraform"],function(m){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=m;}});})();
