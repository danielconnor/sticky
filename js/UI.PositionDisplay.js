/*global util, UI, Point*/
UI.PositionDisplay = (function() {
  "use strict";

  function PositionDisplay(value) {
    UI.Draggable.call(this, "span", ["number-display"]);
    
    this.xValue = new UI.NumberDisplay(0, "pixels");
    this.yValue = new UI.NumberDisplay(0, "pixels");

    this._value = new Point();
    this.setValue(value);

    this.onchange = this.onchange.bind(this);

    this.xValue.addEventListener("change", this.onchange);
    this.yValue.addEventListener("change", this.onchange);

    this.append(this.xValue);
    this.append(",");
    this.append(this.yValue);
  }
  util.inherits(PositionDisplay, UI.Draggable);

  var _proto = PositionDisplay.prototype,
    _super = UI.Draggable.prototype;

  _proto.onchange = function() {
    this._value.x = this.xValue._value;
    this._value.y = this.yValue._value;

    this.emit("change", this._value);
  };

  _proto.setValue = function(value) {
    if(typeof value !== "object") return;
    var x = value.x,
      y = value.y;

    this._value.x = x;
    this._value.y = y;
    this.xValue.setValue(x);
    this.yValue.setValue(y);
  };

  Object.defineProperty(_proto, "value", {
    get: function() {
      return this._value;
    },
    set: _proto.setValue
  });


  return PositionDisplay;
})();