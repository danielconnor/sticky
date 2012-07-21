(function() {
  var styleContainer = document.head.appendChild(document.createElement("style"));
    styleSheets = document.styleSheets
    styleSheetCount  = styleSheets.length - 1,
    stylesheet = document.styleSheets[styleSheetCount++];


  CSSStyleRule.prototype.remove = function() {
    var parent = this.parentStyleSheet;
      rulePos = Array.prototype.indexOf.call(parent.rules, this);

    if(rulePos > -1) {
      parent.removeRule();
    }
  };

  window.createRule = function (selector, pos) {

    var rulePos = stylesheet.rules.length;

    rulePos = stylesheet.insertRule(selector + "{}", rulePos);
    return stylesheet.rules[rulePos];
  };
})();