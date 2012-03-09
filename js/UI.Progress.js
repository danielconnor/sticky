UI.Progress = function(length) {
	UI.Control.call(this,"input", "progress");

	this.element.setAttribute("type", "range");
	this.element.setAttribute("min", "0");

	this.length = length;
	this.current = 0;

	this.handle("change");

};

UI.Progress.prototype = new UI.Control;
UI.Progress.prototype.constructor = UI.Progress;


UI.Progress.prototype.onchange = function() {
	this.current = parseInt(this.element.value, 10);
};

Object.defineProperty(UI.Progress.prototype, "current", {
	get: function() {
		return this._current;
	},
	set: function(current) {
		this.element.value = this._current = current;
		this.emit("currentchange", []);
	}
});


Object.defineProperty(UI.Progress.prototype, "length",{
	get: function() {
		return _length;
	},
	set: function(length) {
		this.element.setAttribute("max", this._length = length);
		this.emit("lengthchange", []);
	}
});