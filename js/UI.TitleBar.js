/*global util, UI*/

UI.TitleBar = (function() {
  "use strict";

  function TitleBar(title) {
    UI.Draggable.call(this, "div", ["titlebar"]);
    this.title = title;

  }

  util.inherits(TitleBar, UI.Draggable);

  var _proto = TitleBar.prototype,
    _super = UI.Draggable.prototype;

  Object.defineProperty(_proto, "title", {
    get: function() {
      return this._title;
    },
    set: function(title) {
      this._title = this.element.textContent = title;
    }
  });

  return TitleBar;

})();