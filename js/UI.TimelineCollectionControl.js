UI.TimelineCollectionControl = function() {
  UI.Control.call(this, "div", ["timeline-collection"]);
};
UI.TimelineCollectionControl.prototype = new UI.Control();
UI.TimelineCollectionControl.prototype.constructor = UI.TimelineCollectionControl;
UI.TimelineCollectionControl.prototype.supr = UI.Control.prototype;

UI.TimelineCollectionControl.prototype.setCurrent = function(current) {
  for(var i = 0, c = this.children, il = c.length; i < il; i++) {
    c[i].current = current;
  }
};

Object.defineProperty(UI.TimelineCollectionControl.prototype,"current", {
  set: function(current) {
    this.setCurrent(current);
    this.emit("currentchange",current);
  }
});

UI.TimelineCollectionControl.prototype.append = function(control) {
  this.supr.append.call(this, control);
  var collection = this;
  control.addEventListener("currentchange", function() {
    collection.current = this._current;
  });
};