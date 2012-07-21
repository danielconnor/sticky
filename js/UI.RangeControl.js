UI.RangeControl = function(max, min) {
	UI.Control.call(this, "div", ["range-control"]);

	this._max = max || 100;
	this._min = min === undefined ? 0 : min;
}
UI.RangeControl.prototype = new UI.Control();
UI.RangeControl.prototype.constructor = UI.RangeControl;
UI.RangeControl.prototype.supr = UI.Control;

UI.RangeControl.prototype.valueAtOffset = function(offset) {
	var width = this.element.clientWidth
		min = this._min,
		max = this._max,
		value = min + ((offset / width) * (max - min));

	return Math.min(Math.max(value, min), max);
}
UI.RangeControl.prototype.offsetAtValue = function(value) {
	var min = this._min,
		max = this._max;

	return (value / (max - min) * this.element.clientWidth);
}

UI.RangeControl.prototype.setMax = function(max) {
	this._max = max;
};
UI.RangeControl.prototype.setMin = function(min) {
	this._min = min;
};
Object.defineProperty(UI.RangeControl.prototype, "max", {
	get: function() {
		return this._max;
	},
	set: function(max) {
		this.setMax(max);
	}
});
Object.defineProperty(UI.RangeControl.prototype, "min", {
	get: function() {
		return this._min;
	},
	set: function(min) {
		this.setMin(min);
	}
});


