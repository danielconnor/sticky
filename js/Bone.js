function Bone(parent, angle, length, tagName) {
	if(!parent) return;

	BoneCollection.call(this, tagName || "path", null);
	var bone = this;

	this._angle = angle;
	this._length = length;
	this.parent = parent;

	this.handle("click");

	this.update();
}
Bone.prototype = new BoneCollection();
Bone.prototype.constructor = Bone;
Bone.prototype.supr = BoneCollection.prototype;

Bone.prototype.intervalConstructor = AngleKeyFrameInterval;

Bone.prototype.setPosition = function(x, y) {
	if(typeof x === "object") {
		y = x.y;
		x = x.x;
	}
	this.angle = this.parent._position.angleBetween(x,y) * 180 / Math.PI;
};

//convenience: don't use unless you have to. Using means creating unnessecary objects
Object.defineProperty(Bone.prototype, "position", {
	set: Bone.prototype.setPosition
});

Object.defineProperty(Bone.prototype,"angle", {
	get:function() {
		return this._angle;
	},
	set: function(a) {
		if(this._angle != a) {
			this._angle = a;
			this.emit("anglechange", []);
			this.update();
		}
	}
});
Object.defineProperty(Bone.prototype,"length", {
	get:function() {
		return this._length;
	},
	set: function(l) {
		if(this._length != l) {
			this._length = l;
			this.emit("lengthchange", []);
			this.update();
		}
	}
});

/*** methods ***/
Bone.prototype.update = function() {
	var parentPos = this.parent._position,
		pos = this._position,
		radians = this._angle * 3.14 / 180,
		len = this._length;

	pos.x = len * Math.cos(radians) + parentPos.x;
	pos.y = len * Math.sin(radians) + parentPos.y;

	this.draw();
	
	this.supr.update.call(this);

	this.emit("change", []);
};

Bone.prototype.draw = function() {
	this.element.setAttribute("d", "M" + this.parent._position.toString() + "L" + this._position.toString());
}

Bone.prototype.onclick = function(e) {

};