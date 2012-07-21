UI.MultiRangeControl = function(max, min) {
	UI.RangeControl.call(this, max, min);

	this.classList.add("multi");

	this.handle("DOMNodeInsertedIntoDocument");
	//this.handle("DOMNodeInserted");
}
UI.MultiRangeControl.prototype = new UI.RangeControl();
UI.MultiRangeControl.prototype.constructor = UI.MultiRangeControl;
UI.MultiRangeControl.prototype.supr = UI.RangeControl.prototype;

UI.MultiRangeControl.prototype.addSlider = function(value) {
	var slider = new UI.RangeSliderControl(this);
	slider.value = value;
	this.append(slider);
	return slider;
}

UI.MultiRangeControl.prototype.setMax = function(max) {
	var diff = (max - this._min) / (this._max - this._min);

	this.supr.setMax.call(this, max);

	var children = this.children;
	for(var i = 0, il = children.length; i < il; i++) {
		var child = children[i];

		child.value = child._value * diff;
	}
}

UI.MultiRangeControl.prototype.setMin = function(min) {
	var diff = (this._max - min) / (this._max - this._min);

	this.supr.setMin.call(this, min);

	var children = this.children;
	for(var i = 0, il = children.length; i < il; i++) {
		var child = children[i];

		child.value = child._value * diff;
	}
}

UI.MultiRangeControl.prototype.DOMNodeInsertedIntoDocument = 
UI.MultiRangeControl.prototype.DOMNodeInserted = function() {
	var children = this.children;
	for(var i = 0, il = children.length; i < il; i++) {
		var child = children[i];

		child.value = child._value;
	}
}