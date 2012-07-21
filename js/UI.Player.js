UI.Player = function() {
	UI.Control.call(this, "input", ["player"]);
	this.timelines = [];
};

util.inherits(UI.Player, UI.Control);