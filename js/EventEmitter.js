function EventEmitter() {
	this.functions = {};
}
EventEmitter.prototype.addEventListener = function(name, func) {
	if(!this.functions[name]) {
		this.functions[name] = [];
	}
	this.functions[name].push(func);
};
EventEmitter.prototype.removeEventlistener = function(name,func) {
	if(this.functions[name]) {
		this.functions[name].splice(this.functions[name].indexOf(func), 1);
	}
};
EventEmitter.prototype.emit = function(name,args) {
	if(this.functions[name]) {
		var evtFuncs = this.functions[name];
		for(var i = 0, il = evtFuncs.length; i < il; i++) {
			evtFuncs[i].apply(this,args);
		}
	}
};
