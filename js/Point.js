/*global SVGPoint*/

var Point = (function() {
  "use strict";

  function Point(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  SVGPoint.prototype.add =
  Point.prototype.add = function(point, y) {
    var x;
    if(y === undefined) {
      x = point.x;
      y = point.y;
    }
    else x = point;
    return new Point(this.x + x, this.y + y);
  };
  SVGPoint.prototype.subtract =
  Point.prototype.subtract = function(point, y) {
    var x;
    if(y === undefined) {
      x = point.x;
      y = point.y;
    }
    else x = point;
    return new Point(this.x - x, this.y - y);
  };
  SVGPoint.prototype.subtractSelf =
  Point.prototype.subtractSelf = function(point, y) {
    var x;
    if(y === undefined) {
      x = point.x;
      y = point.y;
    }
    else x = point;
    this.x -= x;
    this.y -= y;
    return this;
  };

  SVGPoint.prototype.clone =
  Point.prototype.clone = function() {
    return new Point(this.x, this.y);
  };
  SVGPoint.prototype.addSelf =
  Point.prototype.addSelf = function(point, y) {
    var x;
    if(y === undefined) {
      x = point.x;
      y = point.y;
    }
    else x = point;

    this.x += x;
    this.y += y;
    return this;
  };
  SVGPoint.prototype.toString =
  Point.prototype.toString = function() {
    return this.x + "," + this.y;
  };

  SVGPoint.prototype.angleBetween =
  Point.prototype.angleBetween = function(point, y) {
    var x;
    if(y === undefined) {
      x = point.x;
      y = point.y;
    }
    else x = point;
    return Math.atan2(y - this.y, x - this.x);
  };

  SVGPoint.prototype.mirror =
  Point.prototype.mirror = function(point, y) {
    var x;
    if(y === undefined) {
      x = point.x;
      y = point.y;
    }
    else x = point;
    return new Point(this.x - 2 * (this.x - x), this.y - 2 * (this.y - y));
  };

  SVGPoint.prototype.distanceTo =
  Point.prototype.distanceTo = function(point, y) {
    var x;
    if(y === undefined) {
      x = point.x;
      y = point.y;
    }
    else x = point;

    var x2 = x - this.x,
      y2 = y - this.y;

    return Math.sqrt(x2 * x2 + y2 * y2);
  };

  Point.fromAngle = function(angle, length) {
    length = length || 1;

    return new Point(length * Math.cos(angle), length * Math.sin(angle));
  };

  return Point;
})();

Point.test = function() {
  var proto = this.prototype,
    functions = Object.keys(proto);

  for(var i = 0, il = functions.length; i < il; i++) {
    var funcName = functions[i],
      testFunc = proto[funcName].test;
    if(testFunc) {
      console.log(funcName, proto[funcName].test());
    }
  }
};
Point.prototype.toString.test = function() {
  var x = 200;
  var y = 200;
  var a = new Point(x, y);
  return a.toString() === x + "," + y;
};
Point.prototype.distanceTo.test = function() {
  var dist = 100;
  var a = new Point(200, 200);
  var b = new Point(a.x, a.y + dist);
  var c = new Point(a.x + dist, a.y);

  return a.distanceTo(b) === dist && a.distanceTo(c) === dist;
};
Point.prototype.clone.test = function() {
  var a = new Point(200, 200);
  var b = a.clone();

  return a.toString() === b.toString() && a !== b;
};
Point.prototype.mirror.test = function() {
  var a = new Point(200, 200);
  var center = new Point(400, 400);
  var mirror = a.mirror(center);
  var b = mirror.mirror(center);

  return b.toString() === a.toString();
};
Point.prototype.add.test = function() {
  var x = 200;
  var y = 200;
  var x1 = x + 1;
  var y1 = y + 1;
  var a = new Point(x, y);
  var a1 = a.add(1,1);

  return a1.x === x1 && a1.y === y1;
};
Point.prototype.addSelf.test = function() {
  var x = 200;
  var y = 200;
  var x1 = x + 1;
  var y1 = y + 1;
  var a = new Point(x, y);
  a.addSelf(1,1);

  return a.x === x1 && a.y === y1;
};
