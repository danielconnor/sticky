UI.RangeControl = function(max, min) {
	UI.Control.call(this, "div", "range-control");
	var rangeControl = this;



	this._max = 100 || max;
	this._min = min === undefined ? 0 : min;
}
UI.RangeControl.prototype = new UI.Control();
UI.RangeControl.prototype.constructor = UI.RangeControl;
UI.RangeControl.prototype.supr = UI.Control;

Object.defineProperty(UI.RangeControl.prototype, "max", {
	get: function() {
		return this._max;
	},
	set: function(max) {
		this._max = max;

	}
});
Object.defineProperty(UI.RangeControl.prototype, "min", {
	get: function() {
		return this._min;
	},
	set: function(min) {
		this._min = min;

	}
});


