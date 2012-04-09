UI.RangeSliderControl = function(parent, enabled) {
	UI.Draggable.call(this, "div", ["range-slider-control"]);

	this.enabled = enabled !== undefined ? enabled : true;

	this.parent = parent;

	this._value = 0;
}

UI.RangeSliderControl.prototype = new UI.Draggable();
UI.RangeSliderControl.prototype.constructor = UI.RangeSliderControl;
UI.RangeSliderControl.prototype.supr = UI.Draggable.prototype;

UI.RangeSliderControl.prototype.onmousemove = function(e, parent) {
	//parent can be set to true when this funtion is called from a parent
	if(this.enabled || parent) {
		var parent = this.parent,
			offset = e.pageX - parent.left,
			value = this.parent.valueAtOffset(offset);

		this._value = value;
			
		this.left = value / (parent.max - parent.min) * 100;

		this.element.setAttribute("value", value.toFixed(2));

		this.emit("change", [this]);
	}
	return this.supr.onmousemove.call(this,e);
};
Object.defineProperty(UI.RangeSliderControl.prototype, "value", {
	get: function() {
		return this._value;
	},
	set: function(val) {
		var parent = this.parent;

		this._value = val = Math.min(Math.max(val, parent._min), parent._max);

		this.left = val / (parent.max - parent.min) * 100;//this.element.clientWidth / 2;
		this.element.setAttribute("value", (Math.round(val * 100 ) / 100));

		this.emit("change", [this]);
	}
});