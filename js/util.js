/*global CSSRule*/
var util = (function() {
  "use strict";
  return {
    inherits: function(ctor, superCtor) {
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    },

    getStyleBySelector: function(selector) {
      var sheetList = document.styleSheets;
      var ruleList;
      var i = sheetList.length, j;

      while (i--) {
        ruleList = sheetList[i].cssRules;
        for (j = 0; j < ruleList.length; j++) {
          if (ruleList[j].type == CSSRule.STYLE_RULE && ruleList[j].selectorText == selector) {
            return ruleList[j].style;
          }
        }
      }
      return null;
   },
   keyCodes: {
      8: "Backspace",
      9: "Tab",
      13: "Enter",
      16: "Shift",
      17: "Ctrl",
      18: "Alt",
      19: "Pause",
      20: "Caps_Lock",
      27: "Esc",
      32: "Space",
      33: "Page_Up",
      34: "Page_Down",
      35: "End",
      36: "Home",
      37: "Arrow_Left",
      38: "Arrow_Up",
      39: "Arrow_Right",
      40: "Arrow_Down",
      45: "Insert",
      46: "Delete",
      48: "0",
      49: "1",
      50: "2",
      51: "3",
      52: "4",
      53: "5",
      54: "6",
      55: "7",
      56: "8",
      57: "9",
      59: ";",
      61: "=",
      65: "a",
      66: "b",
      67: "c",
      68: "d",
      69: ",",
      70: "f",
      71: "g",
      72: "h",
      73: "i",
      74: "j",
      75: "k",
      76: "l",
      77: "m",
      78: "n",
      79: "o",
      80: "p",
      81: "q",
      82: "r",
      83: "s",
      84: "t",
      85: "u",
      86: "v",
      87: "w",
      88: "x",
      89: "y",
      90: "z",
      91: "Windows",
      92: "Windows",
      93: "Menu",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      186: ";",
      187: "=",
      188: ",",
      189: "-",
      190: ".",
      191: "/",
      192: "'",
      219: "[",
      220: "\\",
      221: "]",
      222: "#",
      223: "`"
    },
    keyNames: {
      "Backspace": 8,
      "Tab": 9,
      "Enter": 13,
      "Shift": 16,
      "Ctrl": 17,
      "Alt": 18,
      "Pause": 19,
      "Caps_Lock": 20,
      "Esc": 27,
      "Space": 32,
      "Page_Up": 33,
      "Page_Down": 34,
      "End": 35,
      "Home": 36,
      "Arrow_Left": 37,
      "Arrow_Up": 38,
      "Arrow_Right": 39,
      "Arrow_Down": 40,
      "Insert": 45,
      "Delete": 46,
      "0": 48,
      "1": 49,
      "2": 50,
      "3": 51,
      "4": 52,
      "5": 53,
      "6": 54,
      "7": 55,
      "8": 56,
      "9": 57,
      ";": 59,
      "=": 61,
      "a": 65,
      "b": 66,
      "c": 67,
      "d": 68,
      ",": 69,
      "f": 70,
      "g": 71,
      "h": 72,
      "i": 73,
      "j": 74,
      "k": 75,
      "l": 76,
      "m": 77,
      "n": 78,
      "o": 79,
      "p": 80,
      "q": 81,
      "r": 82,
      "s": 83,
      "t": 84,
      "u": 85,
      "v": 86,
      "w": 87,
      "x": 88,
      "y": 89,
      "z": 90,
      "Windows1": 91,
      "Windows2": 92,
      "Menu": 93,
      "F1": 112,
      "F2": 113,
      "F3": 114,
      "F4": 115,
      "F5": 116,
      "F6": 117,
      "F7": 118,
      "F8": 119,
      "F9": 120,
      "F10": 121,
      "F11": 122,
      "F12": 123,
      "-": 189,
      ".": 190,
      "/": 191,
      "'": 192,
      "[": 219,
      "\\": 220,
      "]": 221,
      "#": 222,
      "`": 223
    }
  };

})();


util.inherits.test = function() {
  "use strict";

  function A() {
    this.testProperty = {
      prop: "success"
    };
  }
  A.prototype.testFunction = function() {
    return "success";
  };

  function B() {
    A.call(this);
  }
  this(B, A);

  var parent = new A(),
    sub = new B();

  return parent instanceof A &&
    sub instanceof B &&
    sub instanceof A &&
    sub.testFunction === A.prototype.testFunction &&
    sub.testProperty.prop === "success" &&
    parent.testProperty.prop === "success" &&
    parent.testProperty !== sub.testProperty;

};