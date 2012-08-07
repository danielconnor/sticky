/*global util, UI */
UI.Prompt = (function() {
  "use strict";

  function Prompt(openClass, closedClass) {
    UI.Control.call(this, "div", ["prompt"]);

    var self = this;

    this.openClass = openClass;
    this.closedClass = closedClass || "prompt";
    this.classList.add(this.closedClass);

    var style = window.getComputedStyle(self.element);
    self.animated = style ? !!style.webkitTransition : false;
  }
  util.inherits(Prompt, UI.Control);

  var _proto = Prompt.prototype,
    _super = UI.Control.prototype;


  _proto.open = function(content) {
    this.element.innerHTML = content;
    document.body.appendChild(this.element);
    var self = this;
    setTimeout(function() {
      self.classList.add(self.openClass);
    }, 100);

    document.addEventListener("click", this.close.bind(this), false);
  };

  _proto.close = function() {
    this.classList.remove(this.openClass);
    
    if(this.animated) {
      this.once("webkitAnimationEnd", this.removeSelf.bind(this), false);
    }
    else this.removeSelf();
  };

  return Prompt;
})();