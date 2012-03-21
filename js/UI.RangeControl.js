UI.RangeControl = function(max, min) {
	UI.Control.call(this, "div", "range-control");
	var rangeControl = this;

	this.slider = new UI.RangeSliderControl();
	this.append(this.slider);

	this.slider.addEventListener("drag", function(e) {
		rangeControl.onsliderdrag(e)
	});

	this.handle("mousedown");

	this._max = 100 || max;
	this._min = min === undefined ? 0 : min;
	this.value = 0;
}
UI.RangeControl.prototype = new UI.Control();
UI.RangeControl.prototype.constructor = UI.RangeControl;
UI.RangeControl.prototype.supr = UI.Control;

UI.RangeControl.prototype.onmousedown = function(e) {
	this.onsliderdrag(e);
};


UI.RangeControl.prototype.onsliderdrag = function(e) {
	var width = this.element.clientWidth
		sliderOffset = this.slider.element.clientWidth / 2,
		left = e.pageX - this.left,
		min = this.min,
		max = this.max;

	this._value = min + ((left / width) * (max - min));
	this.slider.left = (left < 0 ? 0: (left > width ? width : left)) - sliderOffset;
}

Object.defineProperty(UI.RangeControl.prototype, "value", {
	get: function() {
		return this._value;
	},
	set: function(val) {
		var min = this._min,
			max = this._max;

		this._value = val < min ? min : val > max ? max : val;

		this.slider.left = ((this._value - min) / (max - min) * this.element.clientWidth) - this.slider.element.clientWidth / 2;

		this.emit("change", this.element);
	}
});

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

