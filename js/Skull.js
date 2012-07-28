/*global Bone, util*/
var Skull = (function() {
  "use strict";

  function Skull(parent, angle, radius) {
    Bone.call(this, parent, angle, radius, "circle");
  }

  util.inherits(Skull, Bone);

  Skull.prototype.draw = function() {
    this.marrow.setAttrs({
      "fill": "#fff",
      "stroke": "#000000",
      "cx": this.staticEndpoint.x,
      "cy": this.staticEndpoint.y,
      "r": this._length
    });
  };

  return Skull;
})();