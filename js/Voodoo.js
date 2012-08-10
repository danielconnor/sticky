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



    this.addEventListener("mousedown", this.mousedown.bind(this), true);
    this.addEventListener("dragstart", this.dragstart.bind(this), false);

    this.mousemove = this.mousemove.bind(this);

    document.addEventListener("mouseup", this.mouseup.bind(this));

    this.setAttr("stroke", "#000");

    if(this.obj.staticEndpoint) {
      this.obj.append(this);
      this.setPosition(this.obj.staticEndpoint);
    }
    else {
      this.obj.addEventListener("changeposition", this.setPosition.bind(this));
    }
  }

  util.inherits(Voodoo, SVGDOMElement);

  var _proto = Voodoo.prototype,
    _super = SVGDOMElement.prototype;

  _proto.setPosition = function(point, y) {
    var x;
    if(y === undefined) {
      x = point.x;
      y = point.y;
    }
    else x = point;

    this.element.setAttribute("cx", x);
    this.element.setAttribute("cy", y);
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


  _proto.dragstart = function(e) {
    e.stopPropagation();
    e.preventDefault();
    return false;
  };

  return Voodoo;
})();
