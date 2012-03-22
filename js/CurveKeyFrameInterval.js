function CurveKeyFrameInterval(prev, next, paper) {
	if(!prev) return;

	var interval = this;

	KeyFrameInterval.call(this, prev, next);

	this.paper = paper;
	this.element = paper.path();
	this.totalLength = 0;

	this.attr = {
		"path": "",
		"stroke-dasharray": "--",
		"stroke": "#aaa",
		"fill": "none"
	};

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
		paper.path(""),
		paper.path("")
	];

	this.voodoos = [
		new Voodoo(this.controlPoints[0], paper),
		new Voodoo(this.controlPoints[1], paper)
	];

	this.voodoos[0].color = this.voodoos[1].color = "#007800";


	this.controlPoints[0].addEventListener("change", handleUpdate);
	this.controlPoints[1].addEventListener("change", handleUpdate);

	this.element.toBack();
	this.controlConnections[0].toBack();
	this.controlConnections[1].toBack();

	this.update();
}
CurveKeyFrameInterval.prototype = new KeyFrameInterval();
CurveKeyFrameInterval.prototype.constructor = CurveKeyFrameInterval;
CurveKeyFrameInterval.prototype.supr = KeyFrameInterval.prototype;

CurveKeyFrameInterval.prototype.draw = function() {
	this.element.attr(this.attr);
};

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
	var pos = this.element.getPointAtLength((time - this._prev.time) / (this._next.time - this._prev.time) * this.totalLength);

	return new Point(pos.x, pos.y);
};

CurveKeyFrameInterval.prototype.remove = function() {
	this.controlConnections[0].remove();
	this.controlConnections[1].remove();
	this.voodoos[0].remove();
	this.voodoos[1].remove();
	this.element.remove();
};