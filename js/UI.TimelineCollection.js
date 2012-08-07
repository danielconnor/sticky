/*global util, UI*/
UI.TimelineCollection = (function() {
  "use strict";

  function TimelineCollection() {
    UI.Control.call(this, "div", ["timeline-collection"]);
  }
  util.inherits(TimelineCollection, UI.Control);

  var _proto = TimelineCollection.prototype,
    _super = UI.Control.prototype;

  _proto.setCurrent = function(current) {
    for(var i = 0, c = this.children, il = c.length; i < il; i++) {
      c[i].timeline.current = current;
    }
  };

  Object.defineProperty(_proto,"current", {
    set: function(current) {
      this.setCurrent(current);
      this.emit("currentchange",current);
    }
  });

  _proto.append = function(timeline) {
    _super.append.call(this, new UI.TimelineParent(timeline));
    var collection = this;
    timeline.addEventListener("currentchange", function() {
      collection.current = this._current;
    });
  };

  return TimelineCollection;
})();