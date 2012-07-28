/*global util, UI, Voodoo*/
Objects.Basic = (function() {
  "use strict";

  function Basic(obj) {
    UI.MultiRangeControl.call(this, 1000, 0);

    this.classList.add("object");

    this.start = this.addSlider(0);
    this.end = this.addSlider(10000);

    this.obj = obj;
    this.voodoo = new Voodoo(obj);
    this.timeline = new UI.TimelineControl(obj, "position", this.start._value, this.end._value);
    this.timelineCollection = new UI.TimelineCollectionControl();
    this.timelineCollection.append(this.timeline);
  }

  util.inherits(Basic, UI.MultiRangeControl);

  var _proto = Basic.prototype,
    _super = UI.MultiRangeControl.prototype;

  _proto.compile = function() {
    return this.obj.compile();
  };

  _proto.select = function() {
    this.voodoo.show();
  };
  
  _proto.deselect = function() {
    this.voodoo.hide();
  };


  return Basic;
})();

