/*global util, Point, SVGDOMElement*/

var ControlPoint = (function() {
  "use strict";

  function ControlPoint(tagName, position) {
    SVGDOMElement.call(this, tagName);
    
    //always make sure that we create a _position object that is going to be exclusive
    //to this control point. i.e. so that if position is modified in another part of the
    //program inadvertently this position will not me modifed
    this._position = position ? position.clone() : new Point();
  }
  util.inherits(ControlPoint, SVGDOMElement);

  var _proto = ControlPoint.prototype,
    _super = SVGDOMElement.prototype;

  _proto.setPosition = function(x, y) {
    if(typeof x === "object") {
      y = x.y;
      x = x.x;
    }
    if(this._position.x != x || this._position.y != y) {
      this._position.x = x;
      this._position.y = y;

      this.emit("positionchange");
      this.emit("change");
    }
  };

  Object.defineProperty(_proto, "position", {
    set: function(pos) {
      this.setPosition(pos);
    },
    get: function() {
      return this._position.clone();
    }
  });

  return ControlPoint;
})();