function CurveKeyFrameInterval(prev, next, animatable) {
	if(!prev) return;

	var interval = this;

	VisibleKeyFrameInterval.call(this, prev, next, animatable);

	this.totalLength = 0;

	function handleUpdate() {
		interval.controlPointOffsets[0] = interval.prev._prop.subtract(interval.controlPoints[0]._position);
		interval.controlPointOffsets[1] = interval.next._prop.subtract(interval.controlPoints[1]._position);
		interval.update();
		interval.emit("change",[]);
	}

	this.controlPoints = [
		new ControlPoint(prev._prop), 
		new ControlPoint(next._prop)
	];
	this.controlPointOffsets = [
		new Point(0,0),
		new Point(0,0)
	];


	this.controlConnections = [
		this.paper.path(""),
		this.paper.path("")
	];

	this.voodoos = [
		new Voodoo(this.controlPoints[0], this.paper),
		new Voodoo(this.controlPoints[1], this.paper)
	];

	this.voodoos[0].color = this.voodoos[1].color = "#007800";


	this.controlPoints[0].addEventListener("change", handleUpdate);
	this.controlPoints[1].addEventListener("change", handleUpdate);

	this.element.toBack();
	this.controlConnections[0].toBack();
	this.controlConnections[1].toBack();

	this.update();
	this.active = false;
}
CurveKeyFrameInterval.prototype = new VisibleKeyFrameInterval();
CurveKeyFrameInterval.prototype.constructor = CurveKeyFrameInterval;
CurveKeyFrameInterval.prototype.supr = VisibleKeyFrameInterval.prototype;


CurveKeyFrameInterval.prototype.update = function() {
	var cp = this.controlPoints;

	this.controlPoints[0].position = this.prev._prop.subtract(this.controlPointOffsets[0]);
	this.controlPoints[1].position = this.next._prop.subtract(this.controlPointOffsets[1]);

	this.controlConnections[0].attr({
		path: "M" + this._prev._prop.toString() + "L" + cp[0]._position.toString()
	});
	this.controlConnections[1].attr({
		path: "M" + this._next._prop.toString() + "L" + cp[1]._position.toString()
	});

	this.attr.path = "M" + this._prev._prop.toString() + 
		"C" + cp[0]._position.mirror(this._prev._prop).toString() + " " + cp[1]._position.mirror(this._next._prop).toString() + " " + this._next._prop.toString();

	this.draw();

	this.totalLength = this.element.getTotalLength();
};

CurveKeyFrameInterval.prototype.getInterval = function(time) {
	var pos = this.element.getPointAtLength((time - this._prev.time) / (this._next.time - this._prev.time) * this.totalLength, this.totalLength);

	return new Point(pos.x, pos.y);
};

CurveKeyFrameInterval.prototype.remove = function() {
	this.supr.remove.call(this);

	this.controlConnections[0].remove();
	this.controlConnections[1].remove();
	this.voodoos[0].remove();
	this.voodoos[1].remove();
};

Object.defineProperty(CurveKeyFrameInterval.prototype, "active", {
	set: function(active) {
		this._active = !!active;//make sure it's a boolean

		if(active) {
			this.attr.stroke = "#000";
			this.emit("activate",[]);
		}
		else {
			this.attr.stroke = "#aaa"
			this.emit("deactivate",[]);
		}
		this.draw();

	}
});
