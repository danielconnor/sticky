/*global util, UI */
UI.RangeControl = (function() {
  "use strict";

  function RangeControl(max, min) {
    UI.Control.call(this, "div", ["range-control"]);

    this._max = max || 100;
    this._min = min === undefined ? 0 : min;
  }
  util.inherits(RangeControl, UI.Control);

  var _proto = RangeControl.prototype,
    _super = UI.Control.prototype;

  _proto.valueAtOffset = function(offset) {
    var width = this.element.clientWidth,
      min = this._min,
      max = this._max,
      value = min + offset / width * (max - min);

    return Math.min(Math.max(value, min), max);
  };

  _proto.offsetAtValue = function(value) {
    return value / (this._max - this._min) * this.element.clientWidth;
  };

  _proto.setMax = function(max) {
    this._max = max;
  };

  _proto.setMin = function(min) {
    this._min = min;
  };

  Object.defineProperty(_proto, "max", {
    get: function() {
      return this._max;
    },
    set: function(max) {
      this.setMax(max);
    }
  });

  Object.defineProperty(_proto, "min", {
    get: function() {
      return this._min;
    },
    set: function(min) {
      this.setMin(min);
    }
  });

  return RangeControl;
})();

