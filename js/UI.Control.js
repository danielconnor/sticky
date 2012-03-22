UI.Control = function(tagName, classes) {
	EventEmitter.call(this);

	if(!arguments[0]) return;

	this.children = [];
	this.element = tagName instanceof Node ? tagName : document.createElement(tagName);
	this.element.className = "control " + classes;
    this.element._control = this;
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
		control.emit(eventName, [e]);
        return control["on" + eventName](e);
	}, false);
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
		this.element.style.left = left + "px";
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
		this.element.style.top = top + "px";
	}
});