Objects.Basic = function(obj) {
	EventEmitter.call(this);
	if(!obj) return;

	this.obj = obj;
	this.voodoo = new Voodoo(obj, obj.paper);
	this.timeline = new UI.TimelineControl(obj, 500);
	this.timelineCollection = new UI.TimelineCollectionControl();
	this.timelineCollection.append(this.timeline);
};

Objects.Basic.prototype = new EventEmitter();
Objects.Basic.constructor = Objects.Basic;

