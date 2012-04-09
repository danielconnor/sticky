
/*
* description: 
* events: positionchange
*/

function AnimatableObject(tagName, position /*Point*/) {
	if(!tagName) return;

	ControlPoint.call(this, tagName, position);

	this.properties = [];

}

AnimatableObject.prototype = new ControlPoint();
AnimatableObject.prototype.constructor = AnimatableObject;

AnimatableObject.prototype.intervalConstructor = CurveKeyFrameInterval;
