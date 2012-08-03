/*global util, UI*/
UI.SingleRange = (function() {
  "use strict";

  function SingleRange(value, max, min) {
    UI.Range.call(this, max, min);
    var rangeControl = this;

    this.classList.add("single");

    this.slider = new UI.RangeSlider(this);
    this.append(this.slider);

    this.slider.addEventListener("change", function(e) {
      rangeControl.emit("change");
    });

    this.addEventListener("DOMNodeInserted", this.DOMNodeInserted.bind(this), false);
    this.addEventListener("mousedown", this.mousedown.bind(this), false);

    this.slider._value = value;
  }
  util.inherits(SingleRange, UI.Range);

  var _proto = SingleRange.prototype,
    _super = UI.Range.prototype;

  _proto.mousedown = function(e) {
    this.slider.mousedown(e);
    this.slider.mousemove(e, true);
    return false;
  };

  Object.defineProperty(_proto, "value", {
    get: function() {
      return this.slider._value;
    },
    set: function(val) {
      this.slider.value = val;
    }
  });
  _proto.DOMNodeInserted = function() {
    this.slider.value = this.slider._value;
  };

  return SingleRange;
})();