var DOMElement = function(ns, tagName) {
	EventEmitter.call(this);

	if(!arguments[0]) return;

	this.children = [];

	this.element = document.createElementNS(ns, tagName);
	this.element._domElement = this;
}

DOMElement.prototype = new EventEmitter();
DOMElement.prototype.constructor = DOMElement;

DOMElement.prototype.append = function(element) {
	this.children.push(element);
	this.element.appendChild(element.element);
	return element;
};

DOMElement.prototype.remove = function(element) {
	this.children.splice(this.children.indexOf(element), 1);
	this.element.removeChild(element.element);
	return element;
};

DOMElement.prototype.handle = function(eventName) {
	var element = this;
	this.element.addEventListener(eventName, function(e){
		element.emit(eventName, [element, e]);
		return element["on" + eventName](e);
	}, false);
};

DOMElement.prototype.setAttr = function(name, val) {
	this.element.setAttributeNS(null, name, val);
};

DOMElement.prototype.getAttr = function(name) {
	return this.element.getAttributeNS(null, name);
};