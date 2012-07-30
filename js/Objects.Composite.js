/*global Objects, util, Voodoo, UI, BoneCollection*/
Objects.Composite = (function() {
  "use strict";

  function Composite(position, layout) {
    Objects.Basic.call(this, new BoneCollection("g", position));
    var composite = this;

    this.children = [];
    this.voodoos = [];
    this.timelines = this.timelineCollection.children;

    var obj = this.obj;

    obj.addEventListener("select", function() {
      console.log("selected");
    });

    obj.addBones(layout, function(bone) {
      composite.children.push(bone);
      composite.voodoos.push(new Voodoo(bone));
      composite.timelineCollection.append(new UI.TimelineControl(bone, "angle", 0, 1000));
    });
    obj.update();


    for(var i = 0; i < this.timelines.length; i++) {
    }
  }

  util.inherits(Composite, Objects.Basic);

  var _proto = Composite.prototype,
    _super = Objects.Basic.prototype;

  _proto.deselect = function() {
    var voodoos = this.voodoos,
      timelines = this.timelines,
      children = this.children;

    for(var i = 0, il = voodoos.length; i < il; i++) {
      voodoos[i].hide();
    }

  };

  _proto.select = function() {
    var voodoos = this.voodoos,
      timelines = this.timelines,
      children = this.children;

    for(var i = 0, il = voodoos.length; i < il; i++) {
      voodoos[i].show();
    }
  };

  return Composite;
})();
