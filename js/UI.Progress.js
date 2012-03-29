UI.Progress = function(length) {
	UI.SingleRangeControl.call(this,0,1000);

	this.classList.add("progress");
	this.classList.add("display-value");

	this.length = length;
	this.current = 0;

	this.handle("change");

	this.value = 0;

};

UI.Progress.prototype = new UI.SingleRangeControl;
UI.Progress.prototype.constructor = UI.Progress;

