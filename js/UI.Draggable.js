/*global util, UI, Point*/
UI.Draggable = (function() {
  "use strict";

  function Draggable(tagName, classes) {
    UI.Control.call(this, tagName, classes);

    if(!tagName) return;

    this.parent = parent;
    this.offset = new Point();

    this.handle("mousedown");
    this.handle("dragstart");
    this.handle("selectstart");

    this.mousemove = this.mousemove.bind(this);
    this.mouseup = this.mouseup.bind(this);

  }

  util.inherits(Draggable, UI.Control);

  var _proto = Draggable.prototype,
    _super = UI.Control.prototype;

  _proto.mousemove = function(e) {
    this.emit("drag", this, e);
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
  };

  _proto.dragstart =
  _proto.selectstart = function(e) {
    e.stopPropagation();
    e.preventDefault();
    return false;
  };

  return Draggable;
})();