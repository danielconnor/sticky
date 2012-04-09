
function BoneCollection(tagName, position /*Point*/) {
	if(!tagName) return;

	AnimatableObject.call(this, tagName, position);

	this.bones = [];
}
BoneCollection.prototype = new AnimatableObject();
BoneCollection.prototype.constructor = BoneCollection;
BoneCollection.prototype.supr = ControlPoint.prototype;


BoneCollection.prototype.addBone = function() {
	var bone;
	if(arguments[0] instanceof Bone) {
		bone = arguments[0];
		if(arguments[1] instanceof Function) arguments[2](bone);
	}
	else if(typeof arguments[0] === "number" && typeof arguments[1] === "number") {
		switch(arguments[2]){
			case "bone": 
					bone = new Bone(this, arguments[0], arguments[1]);
				break;
			case "skull":
					bone = new Skull(this, arguments[0], arguments[1]);
				break;
		}
		if(arguments[3] instanceof Function) arguments[3](bone);
	}
	this.bones.push(bone);

	return bone;
}

BoneCollection.prototype.update = function() {
	for(var i = 0, b = this.bones, il = b.length; i < il; i++) {
		b[i].update();
	}
};

BoneCollection.prototype.setPosition = function(x, y) {
	this.supr.setPosition.call(this, x, y)
	this.update();
}


//convenience: don't use unless you have to. Using means creating unnessecary objects
Object.defineProperty(BoneCollection.prototype, "position", {
	set: BoneCollection.prototype.setPosition,
	get: function() {
		return this._position.clone();
	}
});

BoneCollection.prototype.addBones = function(layout, callback) {
	var bones = layout.bones,
		numBones = bones.length;

	for (var i = 0; i < numBones; i++) {
		var b = bones[i];
		this.addBone(b.angle, b.length, b.type, callback).addBones(b, callback);
	}
};