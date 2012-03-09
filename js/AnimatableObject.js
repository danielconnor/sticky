
/*
* description: 
* events: positionchange
*/

function AnimatableObject(paper, position /*Point*/) {
	ControlPoint.call(this, position);

	if(!paper) return;

	this.paper = paper;

	this.properties = [];
}

AnimatableObject.prototype = new ControlPoint();
AnimatableObject.prototype.constructor = AnimatableObject;

Object.defineProperty(AnimatableObject.prototype, "props", {
	get: function() {
		return {
			position: this._position.clone()
		};
	},
	set: function(properties) {
		var position;
		if(position = properties.position) {
			this.position = position;			
		}
	}
});
