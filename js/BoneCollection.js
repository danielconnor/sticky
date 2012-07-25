/*global util, Point, AnimatableObject, Bone, Skull*/
var BoneCollection = (function() {
  "use strict";

  function BoneCollection(tagName, position /*Point*/) {
    AnimatableObject.call(this, tagName, position);

    // where child bones should be attached
    this.staticEndpoint = new Point(0,0);

    this.bones = [];
  }
  util.inherits(BoneCollection, AnimatableObject);

  var _proto = BoneCollection.prototype,
    _super = AnimatableObject.prototype;

  _proto.addBone = function() {
    var bone;
    if(arguments[0] instanceof Bone) {
      bone = arguments[0];
      if(arguments[1] instanceof Function) arguments[2](bone);
    }
    else if(typeof arguments[0] === "number" && typeof arguments[1] === "number") {
      switch(arguments[2]){
        case "bone":
          bone = new Bone(this, arguments[0], arguments[1]);
          break;
        case "skull":
          bone = new Skull(this, arguments[0], arguments[1]);
          break;
      }
      if(arguments[3] instanceof Function) arguments[3](bone);
    }
    this.bones.push(bone);
    this.append(bone);
    return bone;
  };

  _proto.updateTransform = function() {
    this.setAttr("transform", "translate(" + this._position + ")");
  };

  _proto.update = function() {
    this.updateTransform();

    for(var i = 0, b = this.bones, il = b.length; i < il; i++) {
      b[i].update();
    }
  };

  _proto.setPosition = function(x, y) {
    _super.setPosition.call(this, x, y);
    this.update();
  };


  _proto.addBones = function(layout, callback) {
    var bones = layout.bones,
      numBones = bones.length;

    for (var i = 0; i < numBones; i++) {
      var b = bones[i];
      this.addBone(b.angle, b.length, b.type, callback).addBones(b, callback);
    }
  };

  _proto.clone = function(deep) {
    var clone = _super.clone.call(this, deep);
    
    clone.removeAttr("transform");
    return clone;
  };

  _proto.compile = function() {
    var clone = this.clone(true);
    return clone;
  };

  return BoneCollection;
})();