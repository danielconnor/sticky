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
    return distance(this.x, this.y, x, y);
  };

  Point.fromAngle = function(angle, length) {
    length = length || 1;

    return new Point(length * Math.cos(angle), length * Math.sin(angle));
  };

  return Point;
})();


Point.test = function() {
  var a = new Point(200, 200),
    b = new Point(1, 1);

  console.time("add(number, number)");
  for(var i = 0; i < 10000000; i++) {
    a.add(1, 1);
  }
  console.timeEnd("add(number, number)");

  console.time("add(Point)");
  for(var j = 0; j < 10000000; j++) {
    a.add(b);
  }
  console.timeEnd("add(Point)");
};