/*global util, UI*/
UI.TimelineCollectionControl = (function() {
  "use strict";

  function TimelineCollectionControl() {
    UI.Control.call(this, "div", ["timeline-collection"]);
  }
  util.inherits(TimelineCollectionControl, UI.Control);

  var _proto = TimelineCollectionControl.prototype,
    _super = UI.Control.prototype;

  _proto.setCurrent = function(current) {
    for(var i = 0, c = this.children, il = c.length; i < il; i++) {
      c[i].current = current;
    }
  };

  Object.defineProperty(_proto,"current", {
    set: function(current) {
      this.setCurrent(current);
      this.emit("currentchange",current);
    }
  });

  _proto.append = function(control) {
    _super.append.call(this, control);
    var collection = this;
    control.addEventListener("currentchange", function() {
      collection.current = this._current;
    });
  };

  return TimelineCollectionControl;
})();