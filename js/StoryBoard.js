function StoryBoard(screen) {
	UI.Control.call(this, "div", ["storyboard"]);
	var storyboard = this;

	this.objects = [];
	this.screen = screen;
	this.screen.canvas.parentNode.id = "screen";
	this.element.appendChild(this.screen.canvas.parentNode);

	this.controls = new UI.Window("Controls");
	this.controls.element.id = "controls";
	this.append(this.controls);

	this._length = 1000;

	this.progress = new UI.Progress(this._length);


	this.controls.append(this.progress);

	this.keyFrames = new UI.Control("div",["keyframes"]);
	this.controls.append(this.keyFrames);

	this.progress.addEventListener("change", function() {
		var children = storyboard.keyFrames.children;

		for(var i = 0, il = children.length; i < il; i++) {
			children[i].setCurrent(this.value);
		}
	});
}
StoryBoard.prototype = new UI.Control();
StoryBoard.prototype.constructor = StoryBoard;

StoryBoard.prototype.addObject = function(obj) {
	var storyboard = this;

	obj.length = this._length;

	this.objects.push(obj);

	obj.timelineCollection.addEventListener("currentchange", function(current) {
		storyboard.progress.value = current;
	});

	this.screen.canvas.appendChild(obj.obj.element);

	this.keyFrames.append(obj.timelineCollection);
};

Object.defineProperty(StoryBoard.prototype, "length", {
	get: function() {
		return this._length;
	},
	set: function(length) {
		this._length = length;
		this.progress.length = length;

		this.emit("lengthchange", []);
	}
});