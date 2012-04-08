UI.TitleBar = function(title) {
	UI.Draggable.call(this, "div", ["titlebar"]);
	this.title = title;

	this.measure
}

UI.TitleBar.prototype = new UI.Draggable();
UI.TitleBar.prototype.constructor = UI.TitleBar;
UI.TitleBar.prototype.supr = UI.Draggable.prototype;



Object.defineProperty(UI.TitleBar.prototype, "title", {
	get: function() {
		return this._title;
	},
	set: function(title) {
		this._title = this.element.textContent = title;
	}
});
