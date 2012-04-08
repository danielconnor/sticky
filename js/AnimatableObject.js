
/*
* description: 
* events: positionchange
*/

function AnimatableObject(tagName, position /*Point*/) {
	if(!tagName) return;

	DOMElement.call(this, "http://www.w3.org/2000/svg", tagName, position);

	this._position = position || new Point();

	this.properties = [];

	this.element.setAttribute("stroke-width", "2.5px");
	this.element.setAttribute("stroke", "#000000");
}

AnimatableObject.prototype = new DOMElement();
AnimatableObject.prototype.constructor = AnimatableObject;

AnimatableObject.prototype.intervalConstructor = CurveKeyFrameInterval;

AnimatableObject.prototype.setPosition = function(pos) {
	if(this._position.x != pos.x || this._position.y != pos.y) {
		this._position = pos;

		this.emit("positionchange", []);
		this.emit("change", []);
	}
};

Object.defineProperty(AnimatableObject.prototype, "position", {
	set: AnimatableObject.prototype.setPosition,
	get: function() {
		return this._position;
	}
});