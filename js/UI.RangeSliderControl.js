UI.RangeSliderControl = function() {
	UI.Control.call(this, "div", "range-slider-control");

	var slider = this;

	this.dragging = false;

	this.handle("mousedown");

	document.addEventListener("mousemove", function(e) {
		slider.onmousemove(e);
	});
	document.addEventListener("mouseup", function(e) {
		slider.onmouseup(e);
	});
}

UI.RangeSliderControl.prototype = new UI.Control();
UI.RangeSliderControl.prototype.constructor = UI.RangeSliderControl;
UI.RangeSliderControl.prototype.supr = UI.Control;

UI.RangeSliderControl.prototype.onmousemove = function(e) {
	if(this.dragging)
		this.emit("drag", [e]);
};

UI.RangeSliderControl.prototype.onmousedown = function() {
	this.dragging = true;
};


UI.RangeSliderControl.prototype.onmouseup = function() {
	this.dragging = false;
};

