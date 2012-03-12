function Voodoo(obj, paper) {
	EventEmitter.call(this);

	var pin = this;
	this.paper = paper;
	this.obj = obj;


	this.point = this.paper.circle(this.obj._position.x, this.obj._position.y, this._size);

	this.point.attr({
		"stroke": "#000000",
		"stroke-width": "1.5px",
		"fill": "#e13370"
	});
	this.size = 4;

	this.obj.addEventListener("change", function() {
		pin.update();
	});

	this.obj.addEventListener("activate", function() {
		
	});

	this.point.drag(function (x, y) {
		pin.obj.position = new Point(this.offsetX + x, this.offsetY + y);
		pin.update();
	}, function (x, y) {
		this.offsetX = x;
		this.offsetY = y;
	});

	this.point.toFront();
}

Voodoo.prototype = new EventEmitter();
Voodoo.prototype.constructor = Voodoo;

Voodoo.prototype.update = function() {
	var pos = this.obj._position;
	this.point.attr({
		cx: pos.x,
		cy: pos.y
	});
};
Voodoo.prototype.remove = function() {
	this.point.remove();
};

Object.defineProperty(Voodoo.prototype, "size", {
	get: function() {
		return this._size;
	},
	set: function(s) {
		this.point.attr({
			r: s
		});

		this._size = s;
	}
});
Object.defineProperty(Voodoo.prototype, "color", {
	get: function() {
		return this.point.attr("fill");
	},
	set: function(color) {
		this.point.attr("fill", color);
	}
});

