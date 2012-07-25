/*global util, ControlPoint, Point, KeyFrameInterval, Voodoo, SVGDOMElement*/
var CurveKeyFrameInterval = (function() {
  "use strict";

  function CurveKeyFrameInterval(prev, next, animatable) {
    KeyFrameInterval.call(this, prev, next, animatable);

    var interval = this;

    this.totalLength = 0;
    this.handleUpdate = this.handleUpdate.bind(this);

    this.prevControlPoint = new ControlPoint("path", prev._prop);
    this.nextControlPoint = new ControlPoint("path", next._prop);

    this.prevControlPoint.addEventListener("change", this.handleUpdate);
    this.nextControlPoint.addEventListener("change", this.handleUpdate);


    this.prevOffset = new Point(0,0);
    this.nextOffset = new Point(0,0);
    
    this.prevVoodoo = new Voodoo(this.prevControlPoint);
    this.nextVoodoo = new Voodoo(this.nextControlPoint);

    this.prevVoodoo.color = this.nextVoodoo.color = "#007800";

    this.lengthDisplay = new SVGDOMElement("text");
    this.lengthDisplayContent = new SVGDOMElement("textPath");
    this.lengthDisplayContent.target(this.path);
    this.lengthDisplay.append(this.lengthDisplayContent);
    this.lengthDisplay.setAttr("font-size", "12px");

    this.prevControlPoint.setAttr("stroke", "#000");
    this.nextControlPoint.setAttr("stroke", "#000");

    this.lengthDisplayContent.setAttrs({
      "anchor": "middle",
      "startOffset": "50%"
    });
    this.path.setAttrs({
      "stroke": "#000",
      "fill": "none",
      "stroke-dasharray": "3,4"
    });


    this.active = false;
    this.update();

    this.append(this.prevControlPoint);
    this.append(this.nextControlPoint);
    this.append(this.prevVoodoo);
    this.append(this.nextVoodoo);

    this.append(this.lengthDisplay);

    document.getElementsByTagName("svg")[0].appendChild(this.element);
  }

  util.inherits(CurveKeyFrameInterval, KeyFrameInterval);

  var _proto = CurveKeyFrameInterval.prototype,
    _super = KeyFrameInterval.prototype;

  _proto.handleUpdate = function() {
    var prev = this.prev._prop,
      next = this.next._prop,
      pO = this.prevOffset,
      nO = this.nextOffset,
      pC = this.prevControlPoint._position,
      nC = this.nextControlPoint._position;

    pO.x = prev.x - pC.x;
    pO.y = prev.y - pC.y;

    nO.x = next.x - nC.x;
    nO.y = next.y - nC.y;

    this.update();
    this.emit("change");
  };

  _proto.update = function() {
      var prev = this.prev._prop,
      next = this.next._prop,
      pO = this.prevOffset,
      nO = this.nextOffset,
      pC = this.prevControlPoint,
      nC = this.nextControlPoint,
      path = this.path;

    pC.setPosition(prev.x - pO.x, prev.y - pO.y);
    nC.setPosition(next.x - nO.x, next.y - nO.y);

    pC.setAttr("d", "M" + prev.toString() + "L" + pC._position.toString());
    nC.setAttr("d", "M" + next.toString() + "L" + nC._position.toString());

    path.setAttr("d",
      "M" + prev.toString() +
      "C" + pC._position.mirror(prev).toString() +
      " " + nC._position.mirror(next).toString() +
      " " + next.toString()
    );

    this.totalLength = path.element.getTotalLength();

    this.lengthDisplayContent.element.textContent = this.totalLength.toFixed(0);

  };

  _proto.getInterval = function(time) {
    return this.path.element.getPointAtLength((time - this._prev.time) / (this._next.time - this._prev.time) * this.totalLength).clone();
  };

  _proto.remove = function() {
    _super.remove.call(this);
  };

  _proto.getTransform = function() {
    var transform = new SVGDOMElement("animateMotion");

    transform.setAttr("fill", "freeze");
    transform.setAttr("path", this.path.getAttr("d"));
    transform.setAttr("begin", this._prev._value / 1000 + "s");
    transform.setAttr("dur", (this._next._value - this._prev._value) / 1000 + "s");

    return transform;
  };

  Object.defineProperty(_proto, "active", {
    set: function(active) {
      // make sure it's a boolean
      this._active = !!active;

      if(active) {
        this.lengthDisplay.show();
        this.path.setAttr("stroke", "#000");
        this.emit("activate");
      }
      else {
        this.lengthDisplay.hide();
        this.path.setAttr("stroke", "#aaa");
        this.emit("deactivate");
      }
    }
  });

  return CurveKeyFrameInterval;
})();