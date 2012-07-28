/*global util, UI, Point*/
UI.Draggable = (function() {
  "use strict";

  function Draggable(tagName, classes) {
    UI.Control.call(this, tagName, classes);

    this.parent = parent;
    this.offset = new Point();
    this.threshold = 5;

    this.dragged = false;


    this.mousemove = this.mousemove.bind(this);
    this.mouseup = this.mouseup.bind(this);

    this.handle("mousedown");
    this.handle("dragstart");
    this.handle("selectstart");
    this.handle("click");
  }

  util.inherits(Draggable, UI.Control);

  var _proto = Draggable.prototype,
    _super = UI.Control.prototype;

  _proto.mousemove = function(e) {
    var offset = this.offset,
      x = e.pageX - offset.x,
      y = e.pageY - offset.y;

    this.emit("drag", e, x, y);

    this.dragged = true;
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  _proto.mousedown = function(e) {
    this.offset.x = e.pageX - this.left;
    this.offset.y = e.pageY - this.top;
    document.addEventListener("mousemove", this.mousemove, false);
    document.addEventListener("mouseup", this.mouseup, false);
  };

  _proto.mouseup = function(e) {
    document.removeEventListener("mousemove", this.mousemove);
    document.removeEventListener("mouseup", this.mouseup);
    this.emit("dragend", e, e.pageX - this.offset.x, e.pageY - this.offset.y);
  };

  _proto.click = function(e) {
    if(!this.dragged) {
      this.emit("click", e);
    }
    this.dragged = false;
  };

  _proto.dragstart =
  _proto.selectstart = function(e) {
    e.stopPropagation();
    e.preventDefault();
    return false;
  };

  return Draggable;
})();