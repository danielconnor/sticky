UI.TimelineCollectionControl = function() {
	UI.Control.call(this, "div", "timeline-collection");

};
UI.TimelineCollectionControl.prototype = new UI.Control();
UI.TimelineCollectionControl.prototype.constructor = UI.TimelineCollectionControl;

Object.defineProperty(UI.TimelineCollectionControl.prototype,"current", {
	set: function(current) {
		for(var i = 0, c = this.children, il = c.length; i < il; i++) {
			c[i].current = current;
		}
	}
});