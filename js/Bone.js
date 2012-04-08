/*
* description: 
* events: anglechange, lengthchange, change
*/
function Bone(parent /*AnimatableObject*/, angle /*degrees*/, length/*pixels*/, element/*Raphael Element*/) {
	if(!parent) return;

	BoneCollection.call(this, "path", null);
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

Object.defineProperty(Bone.prototype, "position", {
	set: function(pos) {
		this.angle = pos.angleBetween(this.parent._position) * 180 / Math.PI;
	}
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
		radians = this._angle * 3.14 / 180,
		len = this._length,
		pos = this._position = new Point(len * Math.cos(radians), len * Math.sin(radians)).add(parentPos);

	this.element.setAttribute("d", "M" + parentPos.toString() + "L" + pos.toString());

	this.draw();
	this.supr.update.call(this);

	this.emit("change", []);
};

Bone.prototype.draw = function() {
	//this.element.attr(this.attrs);
};


Bone.prototype.onclick = function(e) {

};