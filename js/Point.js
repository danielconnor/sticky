var Point = function(x, y) {
	this.x = x || 0;
	this.y = y || 0;
};
SVGPoint.prototype.add = 
Point.prototype.add = function(x,y) {
	if(x instanceof Point) {
		y = x.y;
		x = x.x
	}
	return new Point(this.x + x, this.y + y);
};
SVGPoint.prototype.subtract = 
Point.prototype.subtract = function(x,y) {
	if(x instanceof Point) {
		y = x.y;
		x = x.x
	}
	return new Point(this.x - x, this.y - y);
};
SVGPoint.prototype.clone = 
Point.prototype.clone = function() {
	return new Point(this.x, this.y);
};
SVGPoint.prototype.addSelf = 
Point.prototype.addSelf = function(x,y) {
	if(x instanceof Point) {
		y = x.y;
		x = x.x
	}

	this.x += x;
	this.y += y;
	return this;
};
SVGPoint.prototype.toString = 
Point.prototype.toString = function() {
	return this.x + "," + this.y;
};

SVGPoint.prototype.angleBetween = 
Point.prototype.angleBetween = function(x,y) {
	if(x instanceof Point) {
		y = x.y;
		x = x.x
	}
	return Math.atan2(y - this.y, x - this.x);
};

SVGPoint.prototype.mirror = 
Point.prototype.mirror = function(x, y) {
	if(x instanceof Point) {
		y = x.y;
		x = x.x
	}
	return new Point(this.x - 2 * (this.x - x), this.y - 2 * (this.y - y));
}

SVGPoint.prototype.distanceTo = 
Point.prototype.distanceTo = function(x,y) {
	if(x instanceof Point) {
		y = x.y;
		x = x.x
	}
	return distance(this.x, this.y, x, y);
};

Point.fromAngle = function(angle, length) {
	length = length || 1;

	return new Point(length * Math.cos(angle), length * Math.sin(angle));
}