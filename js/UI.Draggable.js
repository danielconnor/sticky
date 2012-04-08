UI.Draggable = function(tagName, classes) {
	UI.Control.call(this, tagName, classes);

	if(!tagName) return;

	var draggable = this;

	this.dragging = false;

	this.parent = parent;

	this.handle("mousedown");
	this.handle("dragstart");
	this.handle("selectstart");

	document.addEventListener("mousemove", function(e) {
		draggable.onmousemove(e);
	});
	document.addEventListener("mouseup", function(e) {
		draggable.onmouseup(e);
	});
	document.addEventListener("selectstart", function(e) {
		draggable.onselectstart(e);
	});
}

UI.Draggable.prototype = new UI.Control();
UI.Draggable.prototype.constructor = UI.Draggable;

UI.Draggable.prototype.onmousemove = function(e) {
	if(this.dragging) {
		this.emit("drag", [this, e]);
		e.preventDefault();
		e.stopPropagation();
		return false;
	}
};

UI.Draggable.prototype.onmousedown = function(e) {
	this.dragging = true;
	this.offset = new Point(e.pageX - this.left, e.pageY - this.top);
};


UI.Draggable.prototype.onmouseup = function(e) {
	this.dragging = false;
	this.offset = null;
};


UI.Draggable.prototype.ondragstart = function(e) {
	//prevent the browser beginning a drag event when we try to move the slider
	e.stopPropagation();
	e.preventDefault();
	return false;
}
UI.Draggable.prototype.onselectstart = function(e) {
	if(this.dragging) {
		e.stopPropagation();
		e.preventDefault();
		return false;
	}
}