/*global util, Point, BoneCollection, AngleKeyFrameInterval, SVGDOMElement*/
var Bone = (function() {
  "use strict";
  
  function Bone(parent, angle, length, tagName) {
    BoneCollection.call(this, "g", null);

    this._length = length;
    this.parent = parent;
    this._angle = angle;

    this.marrow = new SVGDOMElement(tagName || "path");
    this.marrow.bone = this;

    this.append(this.marrow);

    this.handle("click");

    this.staticEndpoint.addSelf(parent.staticEndpoint.x + length, parent.staticEndpoint.y);

    this.draw();
    this.update();
  }

  util.inherits(Bone, BoneCollection);

  var _proto = Bone.prototype,
    _super = BoneCollection.prototype;

  _proto.intervalConstructor = AngleKeyFrameInterval;

  _proto.setPosition = function(x, y) {
    if(typeof x === "object") {
      y = x.y;
      x = x.x;
    }
    this.angle = this.parent._position.angleBetween(x,y) * 180 / Math.PI - (this.parent.relativeAngle || 0);
  };

  Object.defineProperty(_proto,"relativeAngle", {
    get:function() {
      return this._angle + (this.parent.relativeAngle || 0);
    }
  });

  Object.defineProperty(_proto,"angle", {
    get:function() {
      return this._angle;
    },
    set: function(a) {
      if(this._angle != a) {
        this._angle = a;
        this.emit("anglechange");
        this.update();
      }
    }
  });
  Object.defineProperty(_proto,"length", {
    get:function() {
      return this._length;
    },
    set: function(l) {
      if(this._length != l) {
        this._length = l;
        this.emit("lengthchange");
        this.update();
      }
    }
  });

  _proto.updateTransform = function() {
    this.setAttr("transform", "rotate(" + this.angle + "," + this.parent.staticEndpoint + ")");
  };

  _proto.update = function() {
    var parentPos = this.parent._position,
      pos = this._position,
      radians = this.relativeAngle * 3.14 / 180,
      len = this._length;

    pos.x = len * Math.cos(radians) + parentPos.x;
    pos.y = len * Math.sin(radians) + parentPos.y;

    _super.update.call(this);

    this.emit("change");
  };

  _proto.click = function(e) {};

  _proto.draw = function() {
    this.marrow.setAttr("stroke", "#000000");
    this.marrow.setAttr("d", "M" + this.parent.staticEndpoint + "L" + this.staticEndpoint);
  };


  return Bone;
})();