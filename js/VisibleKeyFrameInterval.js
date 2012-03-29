function VisibleKeyFrameInterval(prev, next, animatable) {
	if(!prev) return;

	KeyFrameInterval.call(this, prev, next);

	this.animatable = animatable;
	this.paper = animatable.paper;

	this.attr = {
		"path": "",
		"stroke-dasharray": "--",
		"stroke": "#aaa",
		"fill": "none"
	};


	this.element = this.paper.path();
	this.element.toBack();
}

VisibleKeyFrameInterval.prototype = new KeyFrameInterval();
VisibleKeyFrameInterval.prototype.constructor = VisibleKeyFrameInterval;
VisibleKeyFrameInterval.prototype.supr = KeyFrameInterval.prototype;

VisibleKeyFrameInterval.prototype.update = function() {	
	this.draw();
}

VisibleKeyFrameInterval.prototype.draw = function() {
	this.element.attr(this.attr);
};

VisibleKeyFrameInterval.prototype.remove = function() {
	this.element.remove();
};



