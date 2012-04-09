function CurveKeyFrameInterval(prev, next, animatable) {
	if(!prev) return;

	KeyFrameInterval.call(this, "path", prev, next, animatable);

	var interval = this;

	this.totalLength = 0;

	this.controlPoints = [
		new ControlPoint("path", prev._prop), 
		new ControlPoint("path", next._prop)
	];
	this.controlPointOffsets = [
		new Point(0,0),
		new Point(0,0)
	];

	this.voodoos = [
		new Voodoo(this.controlPoints[0]),
		new Voodoo(this.controlPoints[1])
	];

	this.voodoos[0].color = this.voodoos[1].color = "#007800";

	this.handleUpdate = this.handleUpdate.bind(this);

	this.controlPoints[0].addEventListener("change", this.handleUpdate);
	this.controlPoints[1].addEventListener("change", this.handleUpdate);

	this.update();
	this.active = false;

	this.setAttr("stroke", "#000");
	this.setAttr("fill", "none");
	this.setAttr("stroke-dasharray", "- -");

	document.getElementsByTagName("svg")[0].appendChild(this.element);
	document.getElementsByTagName("svg")[0].appendChild(this.voodoos[0].element);
	document.getElementsByTagName("svg")[0].appendChild(this.voodoos[1].element);
	document.getElementsByTagName("svg")[0].appendChild(this.controlPoints[0].element);
	document.getElementsByTagName("svg")[0].appendChild(this.controlPoints[1].element);
}
CurveKeyFrameInterval.prototype = new KeyFrameInterval();
CurveKeyFrameInterval.prototype.constructor = CurveKeyFrameInterval;
CurveKeyFrameInterval.prototype.supr = KeyFrameInterval.prototype;



CurveKeyFrameInterval.prototype.handleUpdate = function() {
	var cp = this.controlPoints,
		cpo = this.controlPointOffsets;

	cpo[0] = this.prev._prop.subtract(cp[0]._position);
	cpo[1] = this.next._prop.subtract(cp[1]._position);

	this.update();
	this.emit("change",[]);
}

CurveKeyFrameInterval.prototype.update = function() {
	var cp = this.controlPoints;

	cp[0].position = this.prev._prop.subtract(this.controlPointOffsets[0]);
	cp[1].position = this.next._prop.subtract(this.controlPointOffsets[1]);

	cp[0].setAttr("d", "M" + this._prev._prop.toString() + "L" + cp[0]._position.toString());
	cp[1].setAttr("d", "M" + this._next._prop.toString() + "L" + cp[1]._position.toString());


	this.setAttr("d", "M" + this._prev._prop.toString() + 
		"C" + cp[0]._position.mirror(this._prev._prop).toString() + " " + cp[1]._position.mirror(this._next._prop).toString() + " " + this._next._prop.toString());

	this.totalLength = this.element.getTotalLength();
};

CurveKeyFrameInterval.prototype.getInterval = function(time) {
	return this.element.getPointAtLength((time - this._prev.time) / (this._next.time - this._prev.time) * this.totalLength);;
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
			//this.attr.stroke = "#000";
			this.emit("activate",[]);
		}
		else {
			//this.attr.stroke = "#aaa"
			this.emit("deactivate",[]);
		}
	}
});
