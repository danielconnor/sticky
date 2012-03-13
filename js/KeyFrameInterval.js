function KeyFrameInterval(prev, next) {
	if(!prev) return;

	this._next = next;
	this._prev = prev;
}

KeyFrameInterval.prototype = new EventEmitter();
KeyFrameInterval.prototype.constructor = KeyFrameInterval;

Object.defineProperty(KeyFrameInterval.prototype, "next", {
	get: function() {
		return this._next;
	},
	set: function(next) {
		this._next = next;
	}
});

Object.defineProperty(KeyFrameInterval.prototype, "prev", {
	get: function() {
		return this._prev;
	},
	set: function(prev) {
		this._prev = prev;
	}
});

KeyFrameInterval.prototype.getInterval = function(time) {
	var f = (time - this._prev.time) / (this._next.time - this._prev.time);

	return this._prev.prop + (this._next.prop - this._prev.prop) * f;
};

KeyFrameInterval.prototype.update = function() {

};
