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
	var next = this._next,
		prev = this._prev,
		t1 = next.time
		t2 = prev.time
		diff = t1 - t2,
		f = time / diff,
		interval = {};

	for(var i in next.props) {
		var d = next.props[i] - prev.props[i];
		interval[i] = d * f;
	}
	return interval;
}

