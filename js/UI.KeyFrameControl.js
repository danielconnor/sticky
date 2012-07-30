/*global util, UI*/

UI.KeyFrameControl = (function() {
  "use strict";

  function KeyFrameControl(parent, property, time, enabled) {
    UI.RangeSliderControl.call(this, parent, enabled);

    this.classList.add("keyframe");

    this._prop = property === undefined ? 0 : property;
    this.value = time;
    this._active = false;

    //even though the keyframes are stored in an array it is helpful to keep a reference
    //to the next and previous keyframes in the list rather than searching for them
    //each time they need to be accessed
    this.next = null;
    this.prev = null;

    this.addEventListener("change", function() {
      this.emit("timechange");
    });

    this.addEventListener("click", this.click.bind(this));
  }

  util.inherits(KeyFrameControl, UI.RangeSliderControl);

  var _proto = KeyFrameControl.prototype,
    _super = UI.RangeSliderControl.prototype;

  _proto.click = function(e) {
    this.emit("select", e);
  };

  Object.defineProperty(_proto, "prop", {
    get: function() {
      return this._prop;
    },
    set: function(property) {
      this._prop = property;

      this.emit("propchange");
    }
  });

  Object.defineProperty(_proto, "active", {
    get: function() {
      return this._active;
    },
    set: function(active) {

      this._active = active;

      if(active) {
        this.classList.add("active");
        this.emit("activate");
      }
      else {
        this.classList.remove("active");
        this.emit("deactivate");
      }
    }
  });

  // set a snapshot of the animatable at this keyframe
  _proto.setSnapshot = function() {
    
  };

  _proto.sort = function(k1, k2) {
    return k1._time - k2._time;
  };

  return KeyFrameControl;
})();