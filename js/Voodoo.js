/*global util, Point, SVGDOMElement */
var Voodoo = (function() {
  "use strict";

  function Voodoo(obj) {
    SVGDOMElement.call(this, "circle");

    this.obj = obj;

    this.size = 4;
    this.color = "#fff";
    this.parent = parent;
    this.offset = null;

    this.obj.addEventListener("change", this.update.bind(this));

    this.addEventListener("mousedown", this.mousedown.bind(this), true);
    this.addEventListener("dragstart", this.dragstart.bind(this), false);
    this.addEventListener("selectstart", this.selectstart.bind(this), false);

    this.mousemove = this.mousemove.bind(this);

    document.addEventListener("mouseup", this.mouseup.bind(this));

    this.setAttr("stroke", "#000");

    this.update();
  }

  util.inherits(Voodoo, SVGDOMElement);

  var _proto = Voodoo.prototype,
    _super = SVGDOMElement.prototype;

  _proto.update = function() {
    var pos = this.obj._position;
    this.element.setAttribute("cx",pos.x);
    this.element.setAttribute("cy",pos.y);
  };

  Object.defineProperty(_proto, "size", {
    get: function() {
      return this.element.attrbiutes("r");
    },
    set: function(s) {
      this.element.setAttribute("r", s);
    }
  });
  Object.defineProperty(_proto, "color", {
    get: function() {
      return this.setAttr("fill");
    },
    set: function(color) {
      this.setAttr("fill", color);
    }
  });

  _proto.mousemove = function(e) {
    this.emit("drag", this, e);

    this.obj.setPosition(e.pageX, e.pageY);

    e.preventDefault();
    e.stopPropagation();
    return false;
  };
  
  _proto.mousedown = function(e) {
    this.offset = new Point(e.pageX - this.left, e.pageY - this.top);
    document.addEventListener("mousemove", this.mousemove, false);
    e.stopPropagation();
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

  return Voodoo;
})();
