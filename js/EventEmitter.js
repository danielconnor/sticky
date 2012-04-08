function EventEmitter() {
	this.functions = {};
}
EventEmitter.prototype.addEventListener = function(name, func) {
	var funcs = this.functions;
	(funcs[name] = funcs[name] || []).push(func);
};
EventEmitter.prototype.removeEventlistener = function(name,func) {
	var funcs = this.functions[name];
	funcs && funcs.splice(funcs.indexOf(func), 1);
};
EventEmitter.prototype.emit = function(name,args) {
	var evtFuncs = this.functions[name];
	if(!evtFuncs) return;
	for(var i = 0, e; e = evtFuncs[i++];) {
		e.apply(this, args);
	}
};
EventEmitter.prototype.destroy = function() {

};