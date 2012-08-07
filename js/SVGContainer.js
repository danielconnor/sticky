/*global util, SVGDOMElement*/
var SVGContainer = (function() {
  "use strict";

  function SVGContainer(width, height) {
    SVGDOMElement.call(this, "svg");

    this.setAttrs({
      width: width || 100 + "px",
      height: height || 100 + "px"
    });

  }
  util.inherits(SVGContainer, SVGDOMElement);

  var _proto = SVGContainer.prototype,
    _super = SVGDOMElement.prototype;

  _proto.setDesc = function(desc) {
    if(!this._desc) {
      this._desc = new SVGDOMElement("desc");
      this.append(this._desc);
    }
    this._desc.element.textContent = desc;
  };

  Object.defineProperty(_proto, "desc", {
    get: function() {
      var desc = this._desc;
      return desc ? desc.element.textContent : "";
    },
    set: _proto.setTitle
  });

  _proto.setTitle = function(title) {
    if(!this._title) {
      this._title = new SVGDOMElement("title");
      this.append(this._title);
    }
    this._title.element.textContent = title;
  };

  Object.defineProperty(_proto, "title", {
    get: function() {
      var title = this._title;
      return title ? title.element.textContent : "";
    },
    set: _proto.setTitle
  });

  return SVGContainer;
})();