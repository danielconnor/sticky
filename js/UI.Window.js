UI.Window = function() {
    UI.Control.call(this, "div", ["window"]);
}

UI.Window.prototype = new UI.Control();
UI.Window.prototype.constructor = UI.Window();
