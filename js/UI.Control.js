UI.Control = function(tagName, classes) {
	EventEmitter.call(this);

	if(!arguments[0]) return;

	this.children = [];
	this.element = tagName instanceof Node ? tagName : document.createElement(tagName);
	this.element._control = this;
	this.classList = this.element.classList || new DOMTokenList(this.element);

	for(var i = 0, il = classes.length; i < il; i++) {
		this.classList.add(classes[i]);
	}
	this.classList.add("control");

	this.measurement = "%";
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