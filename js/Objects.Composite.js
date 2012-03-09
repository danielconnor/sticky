Objects.Composite = function(paper, position, createObject) {
	var composite = this;

	this.children = [];
	this.voodoos = [];

	Objects.Basic.call(this, createObject(paper, position, function(child){
		composite.children.push(child);
		composite.voodoos.push(new Voodoo(child, paper));
	}));
};

Objects.Composite.prototype = new Objects.Basic();
Objects.Composite.prototype.constructor = Objects.Composite;
