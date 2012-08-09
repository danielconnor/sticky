/*global util*/
window.DOMTokenList = window.DOMTokenList || (function() {
    "use strict";

    function DOMTokenList(element) {
      Array.call(this);
      this.element = element;
    }

    util.inherits(DOMTokenList, Array);

    DOMTokenList.prototype.toString = function() {
      return this.join(" ");
    };
    DOMTokenList.prototype.add = function(className) {
      if(!this.contains(className)) {
        this.push(className);
        this.element.className = this.toString();
      }
    };
    DOMTokenList.prototype.remove = function(className) {
      var loc;
      if((loc = this.indexOf(className)) > -1) {
        this.splice(loc, 1);
        this.element.className = this.toString();
      }
    };
    DOMTokenList.prototype.contains = function(className) {
      return this.indexOf(className) > -1;
    };
    DOMTokenList.prototype.item = function(loc) {
      return this[loc];
    };
    DOMTokenList.prototype.toggle = function(className) {
      var loc = this.indexOf(className),
        contains = loc > -1;

      if(contains) {
        this.splice(loc, 1);
      }
      else {
        this.push(className);
      }
      this.element.className = this.toString();

      return !contains;
    };
    
    return DOMTokenList;
})();

(function() {
  if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
      if (typeof this !== "function") {
        // closest thing possible to the ECMAScript 5 internal IsCallable function
        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
      }

      var aArgs = Array.prototype.slice.call(arguments, 1),
          fToBind = this,
          fNOP = function () {},
          fBound = function () {
            return fToBind.apply(this instanceof fNOP ?
              this :
              oThis || window, aArgs.concat(Array.prototype.slice.call(arguments)));
          };

      fNOP.prototype = this.prototype;
      fBound.prototype = new fNOP();

      return fBound;
    };
  }
})();

(function() {
  var _proto = Element.prototype;

  _proto.matchesSelector =
    _proto.matchesSelector ||
    _proto.mozMatchesSelector ||
    _proto.webkitMatchesSelector ||
    _proto.oMatchesSelector ||
    _proto.msMatchesSelector;

})();

(function() {
 
  window.getMatchedCSSRules = window.getMatchedCSSRules || function(element) {
    var sheetList = document.styleSheets,
      i = sheetList.length,
      matches = [];

    while (i--) {
      var ruleList = sheetList[i].cssRules,
        j = ruleList.length;

      while(j--) {
        if (ruleList[j].type == CSSRule.STYLE_RULE && element.matchesSelector(ruleList[j].selectorText)) {
          matches.push(ruleList[j].style);
        }
      }
    }
    return matches.length ? matches : null;
  };


})();