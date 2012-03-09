function Ticker(tick) {
	EventEmitter.call(this);
	this.timeout = null;
	this.running = false;
	this.tick = tick || 100;
}

Ticker.prototype = new EventEmitter();
Ticker.prototype.constructor = Ticker;

Ticker.prototype.start = function() {
	var ticker = this;
	if(!this.running) {
		this.running = true;

		this.timeout = setTimeout(function next() {
			if(ticker.running) {
				ticker.timeout = setTimeout(next, ticker.tick);
			}
		}, ticker.tick);
	}
};

Ticker.prototype.stop = function() {
	clearTimeout(this.timeout);
	this.running = false;
};