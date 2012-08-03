/*global util, UI*/
UI.Popout = (function() {
  "use strict";

  function Popout(tagName, classes) {
    UI.Control.call(this, tagName, classes);

    this.container = new UI.Control("div", ["container"]);
    this.tab = new UI.Draggable("div", ["tab"]);

    this.tab.addEventListener("actualclick", this.toggle.bind(this), false);
    this.tab.addEventListener("drag", this.drag.bind(this));
    this.tab.addEventListener("dragend", this.dragend.bind(this));

    _super.append.call(this, this.container);
    _super.append.call(this, this.tab);

    this.classList.add("popout");
    this.popped = false;
  }
  util.inherits(Popout, UI.Control);

  var _proto = Popout.prototype,
    _super = UI.Control.prototype;


  _proto.dragend = function(e, x, y) {
    e.preventDefault();
    this.style.webkitTransitionDuration = this.style["margin-left"] = "";
    if(x - 200 > -100) {
      this.popout();
    }
    else this.popin();
  };

  _proto.drag = function(e, x, y) {
    this.style.webkitTransitionDuration = "0";
    this.style["margin-left"] =  x - 200 + "px";
  };

  _proto.popout = function() {
    this.classList.add("popped");
  };

  _proto.popin = function() {
    this.classList.remove("popped");
  };

  _proto.toggle = function() {
    // may be slightly hard to read but I think it's pretty neat
    this["pop" + ((this.popped = !this.popped) ? "in" : "out")]();
  };

  _proto.append = function() {
    _super.append.apply(this.container, arguments);
  };

  return Popout;
})();