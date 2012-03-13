function ControlPoint(pos) {
	EventEmitter.call(this);

	this._position = pos || new Point();
}
ControlPoint.prototype = new EventEmitter();
ControlPoint.prototype.constructor = ControlPoint;

ControlPoint.prototype.setPosition = function(pos) {
	if(this._position.x != pos.x || this._position.y != pos.y) {
		this._position = pos;

		this.emit("positionchange", []);
		this.emit("change", []);
	}
};

Object.defineProperty(ControlPoint.prototype, "position", {
	set: ControlPoint.prototype.setPosition,
	get: function() {
		return this._position;
	}
});