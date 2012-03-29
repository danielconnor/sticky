UI.RangeSliderControl = function(parent, enabled) {
	UI.Control.call(this, "div", ["range-slider-control"]);

	var slider = this;

	this.dragging = false;
	this.enabled = enabled !== undefined ? enabled : true;

	this.parent = parent;

	this.handle("mousedown");
	this.handle("dragstart");
	this.handle("selectstart");

	document.addEventListener("mousemove", function(e) {
		slider.onmousemove(e);
	});
	document.addEventListener("mouseup", function(e) {
		slider.onmouseup(e);
	});
	document.addEventListener("selectstart", function(e) {
		slider.onselectstart(e);
	});


	this._value = 0;
}

UI.RangeSliderControl.prototype = new UI.Control();
UI.RangeSliderControl.prototype.constructor = UI.RangeSliderControl;
UI.RangeSliderControl.prototype.supr = UI.Control;

UI.RangeSliderControl.prototype.onmousemove = function(e, parent) {
	//parent can be set to true when this funtion is called from a parent
	if((this.dragging && this.enabled) || parent) {
		var parent = this.parent,
			offset = e.pageX - parent.left,
			value = this.parent.valueAtOffset(offset);

		this._value = value;
			
		this.left = value / (parent.max - parent.min) * 100;

		this.element.setAttribute("value", value.toFixed(2));

		this.emit("change", [this]);
		return false;
	}
};

UI.RangeSliderControl.prototype.onmousedown = function(e) {
	this.dragging = true;
};


UI.RangeSliderControl.prototype.onmouseup = function(e) {
	this.dragging = false;
};


UI.RangeSliderControl.prototype.ondragstart = function(e) {
	//prevent the browser beginning a drag event when we try to move the slider
	e.stopPropagation();
	e.preventDefault();
	return false;
}
UI.RangeSliderControl.prototype.onselectstart = function(e) {
	if(this.dragging) {
		e.stopPropagation();
		e.preventDefault();
		return false;
	}
}

Object.defineProperty(UI.RangeSliderControl.prototype, "value", {
	get: function() {
		return this._value;
	},
	set: function(val) {
		var parent = this.parent;

		this._value = val = Math.min(Math.max(val, parent._min), parent._max);

		//var offset = this.parent.offsetAtValue(val);

		this.left = val / (parent.max - parent.min) * 100;//this.element.clientWidth / 2;
		this.element.setAttribute("value", (Math.round(val * 100 ) / 100));

		this.emit("change", [this]);
	}
});