/*global util, UI */
UI.MultiRange = (function() {
  "use strict";

  function MultiRange(max, min) {
    UI.Range.call(this, max, min);

    this.classList.add("multi");

    this.addEventListener("DOMNodeInsertedIntoDocument", this.DOMNodeInsertedIntoDocument.bind(this), false);
    //this.addEventListener("DOMNodeInserted", this.DOMNodeInserted.bind(this), false);
  }

  util.inherits(MultiRange, UI.Range);

  var _proto = MultiRange.prototype,
    _super = UI.Range.prototype;

  _proto.addSlider = function(value) {
    var slider = new UI.RangeSlider(this);
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
  }

  return MultiRange;

})();