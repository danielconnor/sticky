function AngleKeyFrameInterval(prev, next, animatable) {
	if(!prev) return;

	VisibleKeyFrameInterval.call(this, prev, next, animatable);

	delete this.attr["stroke-dasharray"];
	this.attr.stroke = "#000";

}

AngleKeyFrameInterval.prototype = new VisibleKeyFrameInterval();
AngleKeyFrameInterval.prototype.constructor = AngleKeyFrameInterval;
AngleKeyFrameInterval.prototype.supr = VisibleKeyFrameInterval.prototype;


AngleKeyFrameInterval.prototype.update = function() {
	var length = 10,
		prev = this._prev._prop,
		next = this._next._prop,
		pos = this.animatable.parent._position,
		pt1 = Point.fromAngle(this._prev._prop * Math.PI / 180, length).addSelf(pos),
		pt2 = Point.fromAngle(this._next._prop * Math.PI / 180, length).addSelf(pos);

	prev =  ((prev % 360) + 360) % 360;
	next = ((next % 360) + 360) % 360;

	var between = next > prev ? next - prev : next - (prev - 360),
		flag = between > 180;


	this.attr.path = "M" + pt1.toString() + " A" + length + "," + length + " 0 " + (+!flag) + ",0 " + pt2.toString();


	this.supr.update.call(this);
}



