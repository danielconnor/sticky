/*global util, KeyFrameInterval, Point, SVGDOMElement*/
var AngleKeyFrameInterval = (function() {
  "use strict";

  function AngleKeyFrameInterval(prev, next, animatable) {
    KeyFrameInterval.call(this, prev, next, animatable);

    var interval = this;
    this.active = false;
    this.clockwise = true;


    this.animatable.addEventListener("change", function() {
      if(interval._active) interval.update();
    });

    this.update();

    this.path.setAttr("fill", "none");
    this.path.setAttr("stroke", "#666");
    this.path.setAttr("stroke-width", "1.5px");
    this.path.setAttr("stroke-dasharray", "2,2");

    this.path.element.addEventListener("click", this.click.bind(this), false);


    document.getElementsByTagName("svg")[0].appendChild(this.element);
  }

  util.inherits(AngleKeyFrameInterval, KeyFrameInterval);

  var _proto = AngleKeyFrameInterval.prototype,
    _super = KeyFrameInterval.prototype;


  AngleKeyFrameInterval.prototype.click = function() {
    this.clockwise = !this.clockwise;
    this.update();
  };

  AngleKeyFrameInterval.prototype.update = function() {
    var length = 8,
      relativeAngle = this.animatable.parent.relativeAngle || 0,
      prev = this._prev._prop,
      next = this._next._prop;


    prev =  ((prev % 360) + 360) % 360;
    next = ((next % 360) + 360) % 360;

    if(this.clockwise && next < prev) {
      while(next < prev) {
        prev -= 360;
      }
    }
    else if(!this.clockwise && prev < next) {
      while(prev < next) {
        prev += 360;
      }
    }
    this._prev._prop = prev;
    this._next._prop = next;


    if(this.clockwise) {
      var t = next;
      next = prev;
      prev = t;
    }

    next += relativeAngle;
    prev += relativeAngle;

    var pos = this.animatable.parent._position,
      pt1 = Point.fromAngle(prev * Math.PI / 180, length).addSelf(pos),
      pt2 = Point.fromAngle(next * Math.PI / 180, length).addSelf(pos);

    var between = next > prev ? next - prev : next - (prev - 360),
      flag = between > 180;


    this.path.setAttr("d","M" + pt1.toString() + " A" + length + "," + length + " 0 " + (+!flag) + ",0 " + pt2.toString());


    _super.update.call(this);
  };

  AngleKeyFrameInterval.prototype.getTransform = function() {

    var transform = new SVGDOMElement("animateTransform"),
      pos = this.animatable.parent.staticEndpoint;

    transform.setAttr("fill", "freeze");
    transform.setAttr("type", "rotate");
    transform.setAttr("attributeName", "transform");
    transform.setAttr("from", this._prev._prop + " " + pos.x + " " + pos.y);
    transform.setAttr("to", this._next._prop + " " + pos.x + " " + pos.y);
    transform.setAttr("begin", this._prev._value / 1000 + "s");
    transform.setAttr("dur", (this._next._value - this._prev._value) / 1000 + "s");

    return transform;
  };

  Object.defineProperty(AngleKeyFrameInterval.prototype, "active", {
    set: function(active) {
      this._active = !!active;//make sure it's a boolean

      if(active) {
        this.path.setAttr("display", "block");
        this.emit("activate");
      }
      else {
        this.path.setAttr("display", "none");
        this.emit("deactivate");
      }
    }
  });


  return AngleKeyFrameInterval;

})();