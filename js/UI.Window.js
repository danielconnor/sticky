/*global util, UI*/
UI.Window = (function() {
  "use strict";
  function Window(title) {
      UI.Control.call(this, "div", ["window"]);

      this.measurement = "px";

      this.titleBar = new UI.TitleBar(title);
      this.titleBar.addEventListener("drag", this.drag.bind(this), false);
      _super.append.call(this, this.titleBar);

      this.contents = new UI.Control("div", ["contents"]);
      _super.append.call(this, this.contents);

  }

  util.inherits(Window, UI.Control);


  var _proto = Window.prototype,
    _super = UI.Control.prototype;

  Object.defineProperty(_proto, "title", {
    get: function() {
      return this.titleBar.title;
    },
    set: function(title) {
      this.titleBar.title = title;
    }
  });

  _proto.drag = function(sender, e) {
    var offset = sender.offset;
    this.left = e.pageX - offset.x;
    this.top = e.pageY - offset.y;
  };

  _proto.append = function(control) {
    this.contents.append(control);
  };

  return Window;
})();