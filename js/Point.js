function Point(x, y) {
	this.x = x || 0;
	this.y = y || 0;
}
Point.prototype.add = function(x,y) {
	if(x instanceof Point) {
		y = x.y;
		x = x.x
	}
	return new Point(this.x + x, this.y + y);
};
Point.prototype.clone = function() {
	return new Point(this.x, this.y);
};
Point.prototype.addSelf = function(x,y) {
	if(x instanceof Point) {
		y = x.y;
		x = x.x
	}

	this.x += x;
	this.y += y;
	return this;
};
Point.prototype.toString = function() {
	return this.x + "," + this.y;
};

Point.prototype.angleBetween = function(x,y) {
	if(x instanceof Point) {
		y = x.y;
		x = x.x
	}
	return Math.atan2(this.y - y, this.x - x);
};

Point.prototype.mirror = function(x, y) {
	if(x instanceof Point) {
		y = x.y;
		x = x.x
	}
	return new Point(this.x - 2 * (this.x - x), this.y - 2 * (this.y - y));
}

Point.prototype.distanceTo = function(x,y) {
	if(x instanceof Point) {
		y = x.y;
		x = x.x
	}
	return distance(this.x, this.y, x, y);
};
