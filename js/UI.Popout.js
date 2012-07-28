/*global util, UI*/

UI.Popout = (function() {
  "use strict";

  function Popout(tagName, classes) {
    UI.Control.call(this, tagName, classes);

    this.tab = new UI.Control("div", ["tab"]);

    this.classList.add("popout");
    this.popped = false;
  }
  util.inherits(Popout, UI.Control);

  Popout.prototype.popout = function() {
    this.classList.add("popped");
  };

  Popout.prototype.popin = function() {
    this.classList.remove("popped");
  };

  Popout.prototype.toggle = function() {
    // may be slightly hard to read but I think it's pretty neat
    this["pop" + ((this.popped = !this.popped) ? "in" : "out")]();
  };

  return Popout;
})();