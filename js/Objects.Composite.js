Objects.Composite = function(paper, position, createObject) {
	var composite = this;

	this.children = [];
	this.voodoos = [];
	this.timelines = [];

	Objects.Basic.call(this, createObject(paper, position, function(child){
		composite.children.push(child);
		composite.voodoos.push(new Voodoo(child, paper));
		composite.timelines.push(new UI.TimelineControl(child, "angle", 500));
	}));

	for(var i = 0; i < this.timelines.length; i++) {
		this.timelineCollection.append(this.timelines[i]);
	}
};

Objects.Composite.prototype = new Objects.Basic();
Objects.Composite.prototype.constructor = Objects.Composite;
