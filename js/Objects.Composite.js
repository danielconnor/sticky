/*global Objects, util, Voodoo, UI*/
Objects.Composite = (function() {
  "use strict";

  function Composite(position, createObject) {
    var composite = this;

    this.children = [];
    this.voodoos = [];
    this.timelines = [];

    Objects.Basic.call(this, createObject(position, function(child){
      composite.children.push(child);
      composite.voodoos.push(new Voodoo(child));
      composite.timelines.push(new UI.TimelineControl(child, "angle", 0, 1000));
    }));

    for(var i = 0; i < this.timelines.length; i++) {
      this.timelineCollection.append(this.timelines[i]);
    }
  }

  util.inherits(Composite, Objects.Basic);

  var _proto = Composite.prototype,
    _super = Objects.Basic.prototype;

  return Composite;
})();
