/*global util, UI*/
UI.Composite = (function() {
  "use strict";

  function Composite() {
    UI.Control.call(this);
  }

  util.inherits(Composite, UI.Control);

  var _proto = Composite.prototype,
    _super = UI.Control.prototype;

  return Composite;
})();