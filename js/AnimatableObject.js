/*global util, ControlPoint CurveKeyFrameInterval*/
var AnimatableObject = (function() {
  "use strict";

  function AnimatableObject(tagName, position) {
    ControlPoint.call(this, tagName, position);

    this.properties = [];

  }

  util.inherits(AnimatableObject, ControlPoint);

  AnimatableObject.prototype.intervalConstructor = CurveKeyFrameInterval;

  return AnimatableObject;
})();
