function Skull(parent /*AnimatableObject*/, angle /*degrees*/, radius/*pixels*/) {
	Bone.call(this,parent,angle,radius, "circle");
	
	this.update();
}

Skull.prototype = new Bone();
Skull.prototype.constructor = Skull;

Skull.prototype.draw = function() {
	this.element.setAttribute("cx", this._position.x);
	this.element.setAttribute("cy", this._position.y);
	this.element.setAttribute("r", this._length);
};