function KeyFrameInterval(tagName, prev, next, animatable) {
	if(!prev) return;

	DOMElement.call(this, "http://www.w3.org/2000/svg", tagName);

	this.animatable = animatable;

	this._next = next;
	this._prev = prev;

	this._active = false;

}

KeyFrameInterval.prototype = new DOMElement();
KeyFrameInterval.prototype.constructor = KeyFrameInterval;
KeyFrameInterval.prototype.supr = DOMElement.prototype;

KeyFrameInterval.prototype.update = function() {	
	this.draw();
}

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

Object.defineProperty(KeyFrameInterval.prototype, "active", {
	get: function() {
		return this._active;
	},
	set: function(active) {
		this._active = !!active;//make sure it's a boolean

		if(active) {
			this.emit("activate",[]);
		}
		else {
			this.emit("deactivate",[]);
		}

	}
});

KeyFrameInterval.prototype.update = function() {

};

KeyFrameInterval.prototype.remove = function() {

};