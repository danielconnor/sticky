/*global util, DOMElement*/
var SVGDOMElement = (function() {
  "use strict";

  var xlinkNamespace = "http://www.w3.org/1999/xlink",
    svgNamespace = "http://www.w3.org/2000/svg";

  function SVGDOMElement(tagName) {
    DOMElement.call(this, svgNamespace, tagName || "g");
  }

  util.inherits(SVGDOMElement, DOMElement);

  var _proto = SVGDOMElement.prototype,
    _super = DOMElement.prototype;

  _proto.target = function(element) {
    var ref;
    if(typeof element === "string") {
      ref = element;
    }
    else {
      ref = element.id;
    }
    this.setAttr(xlinkNamespace, "xlink:href", "#" + ref);
  };

  return SVGDOMElement;
})();