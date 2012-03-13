UI.KeyFrameControl = function(property, time, max) {
	UI.Control.call(this, "input", "keyframe");

	if(!arguments[0]) return;

	this.element.setAttribute("type", "range");
	this.element.setAttribute("min", 0);
	this.element.setAttribute("max", 1000);
	this.element.setAttribute("step", 2);

	this.position = null;
	this._prop = property || {};
	this.element.value = this._time = time;

	this.handle("change");
	this.handle("click");
};

UI.KeyFrameControl.prototype = new UI.Control();
UI.KeyFrameControl.prototype.constructor = UI.KeyFrameControl();

UI.KeyFrameControl.prototype.onchange = function(e) {
	this.time = parseInt(this.element.value, 10);
};

UI.KeyFrameControl.prototype.onclick = function(e) {
	this.emit("select", [e]);
};

Object.defineProperty(UI.KeyFrameControl.prototype, "prop", {
	get: function() {
		return this._prop;
	},
	set: function(property) {

		this._prop = property;

		this.emit("propchange", []);
	}
});

Object.defineProperty(UI.KeyFrameControl.prototype, "time", {
	get: function() {
		return this._time;
	},
	set: function(time) {

		this.element.value = this._time = time;


		this.emit("timechange", []);
	}
});

UI.KeyFrameControl.sort = function(k1, k2) {
	return k1._time - k2._time;
}