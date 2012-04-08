UI.Window = function(title) {
    UI.Control.call(this, "div", ["window"]);

    this.measurement = "px";

    this.titleBar = new UI.TitleBar(title);
    this.titleBar.addEventListener("drag", this.ondrag.bind(this), false);
    this.supr.append.call(this, this.titleBar);

    this.contents = new UI.Control("div", ["contents"]);
    this.supr.append.call(this, this.contents);

}

UI.Window.prototype = new UI.Control();
UI.Window.prototype.constructor = UI.Window;
UI.Window.prototype.supr = UI.Control.prototype;

Object.defineProperty(UI.Window.prototype, "title", {
	get: function() {
		return this.titleBar.title;
	},
	set: function(title) {
		this.titleBar.title = title;
	}
});

UI.Window.prototype.ondrag = function(sender, e) {
	var offset = sender.offset;
	this.left = e.pageX - offset.x;
	this.top = e.pageY - offset.y;
};

UI.Window.prototype.append = function(control) {
	this.contents.append(control);
}
