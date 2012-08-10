/*global util, UI*/
UI.NumberDisplay = (function() {
  "use strict";


  function NumberDisplay(value, classes) {
    UI.Draggable.call(this, "input", ["number-display"].concat(classes));

    this.setAttrs({
      type: "number"
    });
    this.value = value || 0;

    this.addEventListener("dragstart", this.ondragstart.bind(this));
    this.addEventListener("keydown", this.onkeydown.bind(this), false);
    this.addEventListener("change", this.onchange.bind(this), false);
  }
  util.inherits(NumberDisplay, UI.Draggable);

  var _proto = NumberDisplay.prototype,
    _super = UI.Draggable.prototype;

  _proto.increment = function() {
    this.value++;
  };

  _proto.decrement = function() {
    this.value--;
  };

  _proto.toggleEditable = function() {
    this.editable = !this.editable;
  };

  _proto.setEditable = function(val) {
    if(val) {
      this.setAttr("contenteditable", "true");
    }
    else {
      this.removeAttr("contenteditable");
    }
  };

  _proto.onkeydown = function(e) {
    var k = e.which;

    if(util.keyNames["Arrow_Down"] === k) {
      e.preventDefault();
      return this.decrement();
    }
    else if(util.keyNames["Arrow_Up"] === k) {
      e.preventDefault();
      return this.increment();
    }

    //disallow anything other than ctrl characters and numbers
    //TODO: finer grain of control, also allow num-pad numbers
    if(k > 57) {
      return e.preventDefault();
    }
  };

  _proto.ondragstart = function() {
    var self = this,
      startVal = this.value;
    function drag(e) {
      self.value = startVal + (self.start.y - e.pageY);
    }
    function dragend() {
      self.removeEventListener("drag", drag);
    }
    this.addEventListener("drag", drag);
    this.once("dragend", dragend);
  };

  _proto.onchange = function(e) {
    this.emit("change", this.value);
  };

  _proto.setValue = function(value) {
    if(typeof value !== "number") return;
    this.element.valueAsNumber = value.toFixed(0);
  };

  Object.defineProperty(_proto, "value", {
    get: function() {
      return this.element.valueAsNumber;
    },
    set: function(val) {
      this.setValue(val);
      this.emit("change", val);
    }
  });


  return NumberDisplay;
})();