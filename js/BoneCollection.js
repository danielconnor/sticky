
function BoneCollection(paper /*Raphael paper*/, position /*Point*/) {
	if(!paper) return;

	AnimatableObject.call(this, paper, position);

	var boneCollection = this;

	this.bones = [];
}
BoneCollection.prototype = new AnimatableObject();
BoneCollection.prototype.constructor = BoneCollection;
BoneCollection.prototype.supr = AnimatableObject.prototype;


BoneCollection.prototype.addBone = function() {
	var bone;
	if(arguments[0] instanceof Bone) {
		bone = arguments[0];
		if(arguments[1] instanceof Function) arguments[2](bone);
	}
	else if(typeof arguments[0] === "number" && typeof arguments[1] === "number") {
		switch(arguments[2]){
			case "bone": 
					bone = new Bone(this.paper, this, arguments[0], arguments[1]);
				break;
			case "skull":
					bone = new Skull(this.paper, this, arguments[0], arguments[1]);
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

BoneCollection.prototype.setPosition = function(pos) {
	this.supr.setPosition.call(this, pos)

	this.update();
}

Object.defineProperty(BoneCollection.prototype, "position", {
	set: BoneCollection.prototype.setPosition
});

BoneCollection.prototype.addBones = function(layout, callback) {
	var numBones = layout.bones.length,
		bones = layout.bones;
	for (var i = 0; i < numBones; i++) {
		var b = bones[i];
		this.addBone(b.angle, b.length, b.type, callback).addBones(b, callback);
	}

};