UI.Control = function(tagName, classes) {
	EventEmitter.call(this);

	if(!arguments[0]) return;

	this.children = [];
	this.element = tagName instanceof Node ? tagName : document.createElement(tagName);
	this.element.className = "control " + classes;
};

UI.Control.prototype = new EventEmitter();
UI.Control.prototype.constructor = UI.Control;

UI.Control.prototype.append = function(control) {
	this.children.push(control);
	this.element.appendChild(control.element);
	return control;
};

UI.Control.prototype.remove = function(control) {
	this.children.splice(this.children.indexOf(control), 1);
	this.element.removeChild(control.element);
	return control;
};

UI.Control.prototype.handle = function(eventName) {
	var control = this;
	this.element.addEventListener(eventName, function(e){
		control["on" + eventName](e);
	}, false);
};