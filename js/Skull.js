function Skull(parent /*AnimatableObject*/, angle /*degrees*/, radius/*pixels*/) {
	Bone.call(this,parent,angle,radius, paper.circle());

	
	this.update();
}

Skull.prototype = new Bone();
Skull.prototype.constructor = Skull;

Skull.prototype.draw = function() {
	
};