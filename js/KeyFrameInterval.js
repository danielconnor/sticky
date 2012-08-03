/*global util, SVGDOMElement*/
var KeyFrameInterval = (function() {
  "use strict";

  function KeyFrameInterval(prev, next, animatable) {
    SVGDOMElement.call(this, "g");

    this.path = new SVGDOMElement("path");

    this.animatable = animatable;

    this._next = next;
    this._prev = prev;

    this._active = false;

    this.append(this.path);

  }

  util.inherits(KeyFrameInterval, SVGDOMElement);

  var _proto = KeyFrameInterval.prototype,
    _super = SVGDOMElement.prototype;

  _proto.update = function() {};

  _proto.select = function() {};

  _proto.deselect = function() {};
  
  _proto.remove = function() {
    this.element.parentNode.removeChild(this.element);
  };

  Object.defineProperty(_proto, "next", {
    get: function() {
      return this._next;
    },
    set: function(next) {
      this._next = next;
    }
  });

  Object.defineProperty(_proto, "prev", {
    get: function() {
      return this._prev;
    },
    set: function(prev) {
      this._prev = prev;
    }
  });

  KeyFrameInterval.prototype.getInterval = function(time) {
    var f = (time - this._prev.value) / (this._next.value - this._prev.value);

    return this._prev.prop + (this._next.prop - this._prev.prop) * f;
  };

  Object.defineProperty(_proto, "active", {
    get: function() {
      return this._active;
    },
    set: function(active) {
      this._active = !!active;//make sure it's a boolean

      if(active) {
        this.emit("activate");
      }
      else {
        this.emit("deactivate");
      }
    }
  });


  return KeyFrameInterval;

})();
