/*global util, UI, DOMElement*/

var StoryBoard = (function() {
  "use strict";

  function StoryBoard(width, height, length) {
    UI.Control.call(this, "div", ["storyboard"]);
    var storyboard = this;

    this.objects = [];
    this.screenContainer = new UI.Control("div");
    this.screen = new DOMElement("http://www.w3.org/2000/svg", "svg");
    this.updateDimensions(width, height);
    
    this.screenContainer.append(this.screen);

    this.append(this.screenContainer);

    this.controls = new UI.Window("Controls");
    this.controls.element.id = "controls";
    this.append(this.controls);

    this._length = 1000;

    this.progress = new UI.Progress(this._length);

    this.controls.append(this.progress);

    this.keyFrames = new UI.Control("div",["keyframes"]);
    this.controls.append(this.keyFrames);

    this.progress.addEventListener("change", function() {
      var children = storyboard.keyFrames.children;

      for(var i = 0, il = children.length; i < il; i++) {
        children[i].setCurrent(this.value);
      }
    });
  }

  util.inherits(StoryBoard, UI.Control);

  var _proto = StoryBoard.prototype,
    _super = UI.Control.prototype;

  _proto.addObject = function(obj) {
    var storyboard = this;

    obj.length = this._length;

    this.objects.push(obj);

    obj.timelineCollection.addEventListener("currentchange", function(current) {
      storyboard.progress.value = current;
    });

    this.screen.append(obj.obj);
    this.screen.append(obj.voodoo);
    var voodoos = obj.voodoos;
    for(var i = 0; i < voodoos.length; i++) {
      this.screen.append(voodoos[i]);
    }

    this.keyFrames.append(obj.timelineCollection);
  };

  _proto.updateDimensions = function(width, height) {
    this.screen.setAttrs({
      width: width + "px",
      height: height +"px"
    });
  };

  Object.defineProperty(_proto, "length", {
    get: function() {
      return this._length;
    },
    set: function(length) {
      this._length = length;
      this.progress.length = length;

      this.emit("lengthchange");
    }
  });

  return StoryBoard;
})();