/*global util, UI */
UI.MultiRangeControl = (function() {
  "use strict";

  function MultiRangeControl(max, min) {
    UI.RangeControl.call(this, max, min);

    this.classList.add("multi");

    this.addEventListener("DOMNodeInsertedIntoDocument", this.DOMNodeInsertedIntoDocument.bind(this), false);
    //this.addEventListener("DOMNodeInserted", this.DOMNodeInserted.bind(this), false);
  }

  util.inherits(MultiRangeControl, UI.RangeControl);

  var _proto = MultiRangeControl.prototype,
    _super = UI.RangeControl.prototype;

  _proto.addSlider = function(value) {
    var slider = new UI.RangeSliderControl(this);
    slider.value = value;
    this.append(slider);
    return slider;
  };

  _proto.setMax = function(max) {
    var diff = (max - this._min) / (this._max - this._min);

    this.supr.setMax.call(this, max);

    var children = this.children;
    for(var i = 0, il = children.length; i < il; i++) {
      var child = children[i];

      child.value = child._value * diff;
    }
  };

  _proto.setMin = function(min) {
    var diff = (this._max - min) / (this._max - this._min);

    this.supr.setMin.call(this, min);

    var children = this.children;
    for(var i = 0, il = children.length; i < il; i++) {
      var child = children[i];

      child.value = child._value * diff;
    }
  };

  _proto.DOMNodeInsertedIntoDocument =
  _proto.DOMNodeInserted = function() {
    var children = this.children;
    for(var i = 0, il = children.length; i < il; i++) {
      var child = children[i];

      child.value = child._value;
    }
  };

  return MultiRangeControl;

})();