/*global util, UI*/
UI.Scale = (function() {
  "use strict";

  function Scale() {
    UI.Control.call(this, "div", ["scale"]);

    this.display = new UI.NumberDisplay(100, ["percent", "block", "attach-left", "attach-right"]);
    this.incButton = new UI.Control("button", ["attach-right"]);
    this.incButton.textContent = "+";
    this.decButton = new UI.Control("button", ["attach-left"]);
    this.decButton.textContent = "-";

    this.incButton.addEventListener("click", this.display.increment.bind(this.display), false);
    this.decButton.addEventListener("click", this.display.decrement.bind(this.display), false);

    this.append(this.decButton, this.display, this.incButton);
  }

  util.inherits(Scale, UI.Control);

  var _proto = Scale.prototype,
    _super = UI.Control.prototype;

  return Scale;
})();