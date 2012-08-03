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


    obj.addBones(layout, function(bone) {
      composite.children.push(bone);
      composite.voodoos.push(new Voodoo(bone));
      composite.timelineCollection.append(new UI.Timeline(bone, "angle", 0, 1000));
    });
    obj.update();

  }

  util.inherits(Composite, Objects.Basic);

  var _proto = Composite.prototype,
    _super = Objects.Basic.prototype;

  _proto.deselect = function(e) {
    var voodoos = this.voodoos,
      timelines = this.timelines,
      children = this.children,
      i = voodoos.length;

    while(i--) {
      voodoos[i].hide();
      timelines[i].deselect();
    }
    _super.deselect.call(this, e);
  };

  _proto.select = function(e) {
    var voodoos = this.voodoos,
      timelines = this.timelines,
      children = this.children,
      i = voodoos.length;

    while(i--) {
      voodoos[i].show();
      timelines[i].select();
    }
    _super.select.call(this, e);
  };

  return Composite;
})();
