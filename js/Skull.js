/*global Bone, util*/

var Skull = (function() {
  "use strict";

  function Skull(parent, angle, radius) {
    Bone.call(this, parent, angle, radius, "circle");

    this.marrow.setAttr("fill", "none");

    this.update();
  }

  util.inherits(Skull, Bone);

  Skull.prototype.draw = function() {
    var marrow = this.marrow;
    marrow.setAttr("cx", this.staticEndpoint.x);
    marrow.setAttr("cy", this.staticEndpoint.y);
    marrow.setAttr("r", this._length);
  };

  return Skull;
})();