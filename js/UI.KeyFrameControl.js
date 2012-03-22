UI.KeyFrameControl = function(parent, property, time) {
	UI.RangeSliderControl.call(this, parent);

	if(!arguments[0]) return;

	this.position = null;
	this._prop = property || {};
    this.value = time;

    this.addEventListener("change", function() {
        this.emit("timechange");
    });

	this.handle("click");
};

UI.KeyFrameControl.prototype = new UI.RangeSliderControl();
UI.KeyFrameControl.prototype.constructor = UI.KeyFrameControl;


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
		return this._value;
	},
	set: function(time) {

		this.value = time;

	}
});

UI.KeyFrameControl.sort = function(k1, k2) {
	return k1._time - k2._time;
}