/*global util, UI*/
UI.TimelineParent = (function(){
  "use strict";

  function TimelineParent(timeline) {
    UI.Control.call(this, "div", ["timeline-parent"]);

    this.timeline = timeline;
    var animatable = this.animatable = timeline.animatable;
    var property = timeline.property;

    this.info = new UI.Control("div", ["info"]);
    this.info.element.textContent = timeline.property;

    var display = new (property === "position" ?
                        UI.PositionDisplay :
                        UI.NumberDisplay
                      )(animatable[property], property === "angle" ? "degrees" : "px");

    this.animatable.on(property + "change", function() {
      display.setValue(this[property]);
    });
    display.on("change", function(val) {
      animatable[property] = val;
    });

    this.info.append(display);
    this.append(this.info);
    this.append(this.timeline);
  }
  util.inherits(TimelineParent, UI.Control);

  var _proto = TimelineParent.prototype,
    _super = UI.Control.prototype;

  return TimelineParent;
})();