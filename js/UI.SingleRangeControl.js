/*global util, UI*/
UI.SingleRangeControl = (function() {
  "use strict";

  function SingleRangeControl(value, max, min) {
    UI.RangeControl.call(this, max, min);
    var rangeControl = this;

    this.classList.add("single");

    this.slider = new UI.RangeSliderControl(this);
    this.append(this.slider);

    this.slider.addEventListener("change", function(e) {
      rangeControl.emit("change");
    });

    this.handle("DOMNodeInserted");
    this.handle("mousedown");

    this.slider._value = value;
  }
  util.inherits(SingleRangeControl, UI.RangeControl);

  var _proto = SingleRangeControl.prototype,
    _super = UI.RangeControl.prototype;

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

  return SingleRangeControl;
})();