/*global util, UI*/
UI.TabDropDown = (function() {
  "use strict";

  function TabDropDown() {
    UI.Control.call(this, "div", ["dropdown"]);

    this.tab = new UI.Control("div", ["tab"]);
    this.container = new UI.Control("div", ["container"]);

    this.append(this.container);
    this.append(this.tab);

    this.tab.element.addEventListener("click", this.open.bind(this), false);
  }

  util.inherits(TabDropDown, UI.Control);

  var _proto = TabDropDown.prototype,
    _super = UI.Control.prototype;

  _proto.open = function(e) {
    this.classList.add("open");
  };

  _proto.open = function(e) {
    this.classList.remove("close");
  };

  _proto.addToolbar = function(toolbar) {
    toolbar.addEventListener("finished", this.close.bind(this), false);

    this.container.append(toolbar);
  };

})();