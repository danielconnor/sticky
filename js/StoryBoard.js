/*global util, UI, SVGDOMElement, SVGContainer, Blob, webkitURL*/
var StoryBoard = (function() {
  "use strict";

  function StoryBoard(width, height, length) {
    UI.Control.call(this, "div", ["storyboard"]);
    var storyboard = this;

    this.objects = [];
    this.screenContainer = new UI.Control("div",["screen-container"]);
    this.screen = new SVGContainer(width, height);
    this.screen.title = "hello world";
    this.screenContainer.append(this.screen);

    this.append(this.screenContainer);

    this.sidebar = new UI.Control("div", "sidebar");
    this.scale = new UI.Scale();
    this.compileBtn = new UI.Control("button");
    this.compileBtn.element.textContent = "preview";
    this.compileBtn.addEventListener("click", this.preview.bind(this), false);

    this.sidebar.append(this.scale);
    this.sidebar.append(this.compileBtn);

    this.append(this.sidebar);

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

    this.addEventListener("click", this.click.bind(this), false);
  }

  util.inherits(StoryBoard, UI.Control);

  var _proto = StoryBoard.prototype,
    _super = UI.Control.prototype;


  _proto.click = function(e) {
    if(e.target === this.screen.element) {
      this.deselectObjects();
    }
  };

  _proto.deselectObjects = function() {
    var objects = this.objects,
      i = objects.length;
    while(i--) {
      objects[i].deselect();
    }
  };

  _proto.addObject = function(obj) {
    var storyboard = this;

    obj.length = this._length;

    this.objects.push(obj);

    obj.timelineCollection.addEventListener("currentchange", function(current) {
      storyboard.progress.value = current;
    });

    this.screen.append(obj.obj);
    // this.screen.append(obj.voodoo);
    var voodoos = obj.voodoos;

    // for(var i = 0; i < voodoos.length; i++) {
    //   this.screen.append(voodoos[i]);
    // }

    this.keyFrames.append(obj.timelineCollection);
  };

  _proto.updateDimensions = function(width, height) {
    this.screen.setAttrs({
      width: width + "px",
      height: height +"px"
    });
  };

  _proto.compile = function() {
    var svg = new SVGDOMElement("svg"),
      objects = this.objects;

    svg.setAttrs({
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      "x": "0px",
      "y": "0px",
      "width": "2000px",
      "height": "2000px",
      "viewBox": "0 0 2000 2000",
      "enable-background": "0 0 2000 2000",
      "xml:space": "preserve"
    });

    for(var i = 0, il = objects.length; i < il; i++) {
      svg.append(objects[i].compile());
    }

    return svg;
  };

  _proto.preview = function(e) {
    var xml = new Blob([this.compile().outerHTML], {
      type: 'text/xml'
    });

    var url = webkitURL.createObjectURL(xml);
    window.open(url);

    // if(!e) {
    //   prompt("The window with the preview seems like it was blocked");
    //   window.open(url);
    // }

    window.url = url;
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