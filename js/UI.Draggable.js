UI.Draggable = function(tagName, classes) {
	UI.Control.call(this, tagName, classes);

	if(!tagName) return;

	this.parent = parent;
	this.offset = new Point();

	this.handle("mousedown");
	this.handle("dragstart");
	this.handle("selectstart");

	this.onmv = this.onmousemove.bind(this);

	document.addEventListener("mouseup", this.onmouseup.bind(this), false);
}

UI.Draggable.prototype = new UI.Control();
UI.Draggable.prototype.constructor = UI.Draggable;

UI.Draggable.prototype.onmousemove = function(e) {
	this.emit("drag", [this, e]);
	e.preventDefault();
	e.stopPropagation();
	return false;
};

UI.Draggable.prototype.onmousedown = function(e) {
	this.offset.x = e.pageX - this.left
	this.offset.y = e.pageY - this.top;
	
	document.addEventListener("mousemove", this.onmv, false);
};


UI.Draggable.prototype.onmouseup = function(e) {
	document.removeEventListener("mousemove", this.onmv);
};


UI.Draggable.prototype.ondragstart =
UI.Draggable.prototype.onselectstart = function(e) {
	e.stopPropagation();
	e.preventDefault();
	return false;
}