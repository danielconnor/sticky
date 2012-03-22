UI.RangeSliderControl = function(parent) {
	UI.Control.call(this, "div", "range-slider-control");

	var slider = this;

	this.dragging = false;

    this.parent = parent;

	this.handle("mousedown");

	document.addEventListener("mousemove", function(e) {
		slider.onmousemove(e);
	});
	document.addEventListener("mouseup", function(e) {
		slider.onmouseup(e);
	});


    this._value = 0;
}

UI.RangeSliderControl.prototype = new UI.Control();
UI.RangeSliderControl.prototype.constructor = UI.RangeSliderControl;
UI.RangeSliderControl.prototype.supr = UI.Control;

UI.RangeSliderControl.prototype.onmousemove = function(e, parent) {
	if(this.dragging || parent) {
        var parent = this.parent,
            width = parent.element.clientWidth
            sliderOffset = this.element.clientWidth / 2,
            left = e.pageX - parent.left,
            min = parent.min,
            max = parent.max;

        this._value = min + ((left / width) * (max - min));
        this.left = (left < 0 ? 0: (left > width ? width : left)) - sliderOffset;
        
        this.emit("change", [this]);
        return false;
    }
};

UI.RangeSliderControl.prototype.onmousedown = function(e) {
	this.dragging = true;
    return false;
};


UI.RangeSliderControl.prototype.onmouseup = function(e) {
	this.dragging = false;
    return false;
};

Object.defineProperty(UI.RangeSliderControl.prototype, "value", {
    get: function() {
        return this._value;
    },
    set: function(val) {
        var parent = this.parent,
            min = parent._min,
            max = parent._max;

        this._value = val < min ? min : val > max ? max : val;
        this.left = ((this._value - min) / (max - min) * parent.element.clientWidth) - this.element.clientWidth / 2;

        this.emit("change", [this]);
    }
});