/*global util, UI, Voodoo*/
Objects.Basic = (function() {
  "use strict";

  function Basic(obj) {
    UI.MultiRange.call(this, 1000, 0);

    this.classList.add("object");

    this.start = this.addSlider(0);
    this.end = this.addSlider(10000);
    this.selected = true;

    this.obj = obj;
    this.voodoo = new Voodoo(obj);
    this.timeline = new UI.Timeline(obj, "position", this.start._value, this.end._value);
    this.timelineCollection = new UI.TimelineCollection();
    this.timelineCollection.append(this.timeline);

    obj.addEventListener("click", this.select.bind(this), false);
  }

  util.inherits(Basic, UI.MultiRange);

  var _proto = Basic.prototype,
    _super = UI.MultiRange.prototype;

  _proto.compile = function() {
    return this.obj.compile();
  };

  _proto.select = function(e) {
    //prevent from reaching the storyboard which will try deselect
    if(e) e.stopPropagation();
    if(this.selected) return;
    this.selected = true;
    this.voodoo.show();
    this.timeline.select();
  };
  
  _proto.deselect = function(e) {
    //prevent from reaching the storyboard which will try deselect again
    if(e) e.stopPropagation();
    if(!this.selected) return;
    this.selected = false;
    this.voodoo.hide();
    this.timeline.deselect();
  };


  return Basic;
})();

