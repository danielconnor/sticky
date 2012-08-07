/*global util, UI*/
UI.NumberDisplay = (function() {
  "use strict";


  function NumberDisplay(value, classes) {
    UI.Draggable.call(this, "span", ["number-display"].concat(classes));
    this.value = value || 0;

    this.addEventListener("dragstart", this.ondragstart.bind(this));
    this.addEventListener("dblclick", this.ondblclick.bind(this), false);
    this.addEventListener("keydown", this.onkeydown.bind(this), false);
    this.addEventListener("blur", this.setValueFromContent.bind(this), false);
  }
  util.inherits(NumberDisplay, UI.Draggable);

  var _proto = NumberDisplay.prototype,
    _super = UI.Draggable.prototype;

  _proto.ondblclick = function(e) {
    var self = this;
    document.addEventListener("click", function() {
      self.editable = false;
    }, false);
    this.editable = true;
    this.element.focus();
  };

  _proto.onkeydown = function(e) {
    var k = e.which;

    if(util.keyNames["Enter"] === k) {
      e.preventDefault();
      return this.element.blur();
    }
    else if(util.keyNames["Arrow_Down"] === k) {
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

  _proto.setValueFromContent = function() {
    this.value = parseInt(this.element.textContent, 10) || 0;
  };

  _proto.increment = function() {
    this.setValueFromContent();
    this.value++;
  };

  _proto.decrement = function() {
    this.setValueFromContent();
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

  _proto.ondragstart = function() {
    var self = this,
      startVal = this._value;
    function drag(e) {
      self.value = startVal + (self.start.y - e.pageY);
    }
    function dragend() {
      self.removeEventListener("drag", drag);
    }
    this.addEventListener("drag", drag);
    this.once("dragend", dragend);
  };


  _proto.setValue = function(value) {
    if(typeof value !== "number") return;
    this._value = value;
    this.element.textContent = value.toFixed(0);
  };

  Object.defineProperty(_proto, "editable", {
    get: function() {
      var editable = this.getAttr("contenteditable");

      return editable === "" || editable === "true";
    },
    set: _proto.setEditable
  });

  Object.defineProperty(_proto, "value", {
    get: function() {
      return this._value;
    },
    set: function(val) {
      this.setValue(val);
      this.emit("change", val);
    }
  });


  return NumberDisplay;
})();