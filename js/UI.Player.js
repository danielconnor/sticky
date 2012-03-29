UI.Player = function() {
	UI.Control.call(this, "input", ["player"]);
	this.timelines = [];
};

UI.Player.prototype = new UI.Control();
UI.Player.prototype.constructor = UI.Player;