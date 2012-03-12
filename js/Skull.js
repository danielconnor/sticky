function Skull(paper /*Raphael paper*/ ,parent /*AnimatableObject*/, angle /*degrees*/, radius/*pixels*/) {
	Bone.call(this,paper,parent,angle,radius, paper.circle());

	this.attrs["stroke-width"] = "2px";

	this.update();
}

Skull.prototype = new Bone();
Skull.prototype.constructor = Skull;

Skull.prototype.draw = function() {
	this.element.attr({
		"cx": this._position.x,
		"cy": this._position.y,
		"r" : this._length
	});
	this.element.attr(this.attrs);
};