UI.SingleRangeControl = function(value, max, min) {
	UI.RangeControl.call(this, max, min);
	var rangeControl = this;

	this.classList.add("single");

	this.slider = new UI.RangeSliderControl(this);
	this.append(this.slider);

	this.slider.addEventListener("change", function(e) {
		rangeControl.emit("change");
	});

	this.handle("DOMNodeInserted");
	this.handle("mousedown");

	this.slider._value = value;
}
UI.SingleRangeControl.prototype = new UI.RangeControl();
UI.SingleRangeControl.prototype.constructor = UI.SingleRangeControl;
UI.SingleRangeControl.prototype.supr = UI.RangeControl.prototype;

UI.SingleRangeControl.prototype.mousedown = function(e) {
	this.slider.mousedown(e);
	this.slider.mousemove(e, true);
	return false;
};

Object.defineProperty(UI.SingleRangeControl.prototype, "value", {
	get: function() {
		return this.slider._value;
	},
	set: function(val) {
		this.slider.value = val;
	}
});
UI.SingleRangeControl.prototype.DOMNodeInserted = function() {
	this.slider.value = this.slider._value;
};