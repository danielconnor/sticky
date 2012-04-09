function ControlPoint(tagName, position) {
	DOMElement.call(this,  "http://www.w3.org/2000/svg", tagName);
	
	this.setAttr("stroke", "#000");

	//always make sure that we create a _position object that is going to be exclusive
	//to this control point. i.e. so that if position is modified in another part of the
	//program inadvertently this position will not me modifed
	this._position = position ? position.clone() : new Point();
}
ControlPoint.prototype = new DOMElement();
ControlPoint.prototype.constructor = ControlPoint;

ControlPoint.prototype.setPosition = function(x, y) {
	if(typeof x === "object") {
		y = x.y;
		x = x.x;
	}
	if(this._position.x != x || this._position.y != y) {
		this._position.x = x;
		this._position.y = y;

		this.emit("positionchange", []);
		this.emit("change", []);
	}
};

Object.defineProperty(ControlPoint.prototype, "position", {
	set: ControlPoint.prototype.setPosition,
	get: function() {
		return this._position.clone();
	}
});