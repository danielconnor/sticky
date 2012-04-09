function Voodoo(obj) {
	DOMElement.call(this,"http://www.w3.org/2000/svg", "circle");

	this.obj = obj;

	this.size = 4;
	this.color = "#fff"

	this.obj.addEventListener("change", this.update.bind(this));

	this.parent = parent;

	this.offset = null;

	this.handle("mousedown");
	this.handle("dragstart");
	this.handle("selectstart");

	this.onmousemove = this.onmousemove.bind(this);

	document.addEventListener("mouseup", this.onmouseup.bind(this));

	this.setAttr("stroke", "#000");

	this.update();
}

Voodoo.prototype = new DOMElement();
Voodoo.prototype.constructor = Voodoo;

Voodoo.prototype.update = function() {
	var pos = this.obj._position;
	this.element.setAttribute("cx",pos.x);
	this.element.setAttribute("cy",pos.y);
};

Object.defineProperty(Voodoo.prototype, "size", {
	get: function() {
		return this.element.attrbiutes("r");
	},
	set: function(s) {
		this.element.setAttribute("r", s);
	}
});
Object.defineProperty(Voodoo.prototype, "color", {
	get: function() {
		return this.setAttr("fill");
	},
	set: function(color) {
		this.setAttr("fill", color);
	}
});

Voodoo.prototype.onmousemove = function(e) {
	this.emit("drag", [this, e]);

	//instead of creating a new object we'll be more efficient
	//this.obj.position = new Point(e.pageX, e.pageY);
	this.obj.setPosition(e.pageX, e.pageY);

	e.preventDefault();
	e.stopPropagation();
	return false;
};
Voodoo.prototype.onmousedown = function(e) {
	this.offset = new Point(e.pageX - this.left, e.pageY - this.top);
	document.addEventListener("mousemove", this.onmousemove, false);
	e.stopPropagation();
};


Voodoo.prototype.onmouseup = function(e) {
	document.removeEventListener("mousemove", this.onmousemove);
	this.offset = null;
};


Voodoo.prototype.ondragstart = 
Voodoo.prototype.onselectstart = function(e) {
	e.stopPropagation();
	e.preventDefault();
	return false;
}