
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

AnimatableObject.prototype.intervalConstructor = CurveKeyFrameInterval;
