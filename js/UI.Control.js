UI.Control = function(tagName, classes) {
  DOMElement.call(this, "http://www.w3.org/1999/xhtml", tagName);

  if(!arguments[0]) return;

  this.children = [];
  this.classList = this.element.classList || new DOMTokenList(this.element);

  this.measurement = "%";

  this.classList.add("control");
  if(classes) {
    for(var i = 0, il = classes.length; i < il; i++) {
      this.classList.add(classes[i]);
    }
  }

};

UI.Control.prototype = new DOMElement();
UI.Control.prototype.constructor = UI.Control;

UI.Control.prototype.hide = function() {
  this.classList.add("hidden");
};
UI.Control.prototype.show = function() {
  this.classList.remove("hidden");
};

Object.defineProperty(UI.Control.prototype, "left", {
  get: function() {
    var total = 0;
    for (var element = this.element; element; element = element.offsetParent) {
      total += element.offsetLeft;
      if (this !== element)
        total += element.clientLeft - element.scrollLeft;
    }
    return total;
  },
  set: function(left) {
    this.element.style.left = (Math.round(left * 100) / 100) + this.measurement;
  }
});

Object.defineProperty(UI.Control.prototype, "top", {
  get: function() {
    var total = 0;
    for (var element = this.element; element; element = element.offsetParent) {
      total += element.offsetTop 
      if (this !== element)
        total += element.clientTop - element.scrollTop;
    }
    return total;
  },
  set: function(top) {
    this.element.style.top = (Math.round(top * 100 ) / 100) + this.measurement;
  }
});