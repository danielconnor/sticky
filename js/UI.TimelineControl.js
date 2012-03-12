UI.TimelineControl = function(animatable, duration) {
	UI.Control.call(this,"div", "timeline");
	if(!arguments[0]) return;

	var timeline = this;

	this.keyFrames = [];
	this.intervals = [];

	this.animatable = animatable;
	this._current = 0;

	timeline.handleSelect = function() {
		timeline.selectKeyFrame(this);
	};

	timeline.handleTimeChange = function() {
		var prev = timeline.keyFrames[this.position - 1],
			next = timeline.keyFrames[this.position + 1];

		if(next && this.time > next.time) {
			this.time = next.time - 1;
		}
		if(prev && this.time < prev.time) {
			this.time = prev.time + 1;
		}
	};


	this.addAtPosition(new UI.KeyFrameControl(animatable.props, duration), 0);
	this.addAtPosition(new UI.KeyFrameControl(animatable.props, this._current), 0);

	this._changeAnimatable = false;

	animatable.addEventListener("change", function(e) {
		if(timeline.active) {
			timeline.active._props = this.props;
			
			timeline.curInterval && timeline.curInterval.update();
			timeline.prevInterval && timeline.prevInterval.update();
		}
		else if(!timeline._changeAnimatable) {
			//if it wasnt updated by the timeline
			//i.e. by a Voodoo, we create a new KeyFrame at the current time
			timeline.addAtTime(timeline._current);
		}
		timeline._changeAnimatable = false;
	});

};



UI.TimelineControl.prototype = new UI.Control();
UI.TimelineControl.prototype.constructor = UI.TimelineControl();

UI.TimelineControl.prototype.setCurrent = function(current) {
	this._current = current;

	this.setActiveKeyFrame();

	this._changeAnimatable = true;

	if(this.active) {
		this.animatable.props = this.active._props;
	}
	else if(this.curInterval && this.next) {
		this.animatable.props = this.curInterval.getInterval(current);
	}
	else {
		console.log("hide");
		//TODO: hide - the animatable is no longer in scope on the timeline
	}
};

Object.defineProperty(UI.TimelineControl.prototype, "current", {
	get: function() {
		return this._current;
	},
	set: function(current) {
		if(this._current != current) {
			this.setCurrent(current);
			
			this.emit("currentchange",[current]);
		}
	}
});


UI.TimelineControl.prototype.setActiveKeyFrame = function() {
	this.active = null;
	this.prev = null;
	this.next = null;
	this.prevInterval = null;
	this.curInterval = null;

	if(this._current >= this.keyFrames[0]._time && this._current <= this.keyFrames[this.keyFrames.length - 1]._time) {
		for(var i = 0, k = this.keyFrames, il = k.length; i < il; i++) {
			if(k[i].time === this._current) {
				this.active = k[i];
				this.curInterval = this.intervals[i] || null;
				this.prevInterval = this.intervals[i - 1] || null;
				return;
			}
		}
		for(i = 0; i < il && this._current >= k[i].time; i++)
			;

		this.curInterval = this.intervals[i - 1] || null;
		this.prev = k[i - 1] || null;
		this.next = k[i] || null;
	}
};

UI.TimelineControl.prototype.selectKeyFrame = function(keyFrame) {
	this.current = keyFrame.time;
};

UI.TimelineControl.prototype.addAtPosition = function(keyFrame, index) {
	var timeline = this;
	this.append(keyFrame);

	keyFrame.addEventListener("select", this.handleSelect);
	keyFrame.addEventListener("timechange", this.handleTimeChange);

	if(this.keyFrames.length) {
		var interval = new CurveKeyFrameInterval(keyFrame, this.keyFrames[index], this.animatable.paper);

		interval.addEventListener("change", function() {
			timeline._changeAnimatable = true;

			if(timeline.active) {
				timeline.animatable.props = timeline.active._props;
			}
			else if(timeline.curInterval) {
				timeline.animatable.props = timeline.curInterval.getInterval(timeline._current);
			}
		});

		if(this.intervals[index -1])
		{
			this.intervals[index - 1]._next = keyFrame;
			this.intervals[index - 1].update();
		}
		this.intervals.splice(index, 0, interval);
	}
	this.keyFrames[index] && (this.keyFrames[index].position = index + 1);
	this.keyFrames.splice(index, 0, keyFrame);
	keyFrame.position = index;

	this.setActiveKeyFrame();
};

UI.TimelineControl.prototype.addAtTime = function(time) {

	var k = this.keyFrames,
		il = k.length,
		min = 0,
		max = il - 1,
		i,
		last = 0;


	while ( 1 ) {
		i = Math.floor((min + max) / 2);
		if (last == i) break;
		last = i;
		if ( this.keyFrames[i].time < time) {
			min = i;
		}
		else if ( this.keyFrames[i].time > time) {
			max = i;
		}
		else {
			break;
		}
	}

	this.addAtPosition(new UI.KeyFrameControl(this.curInterval.getInterval(time), time), i + 1);
};



UI.TimelineControl.prototype.removeKeyFrame = function(index) {
	if(this.keyFrames.length > 2) {

		var prevInterval = this.intervals[index - 1],
			interval = this.intervals[index],
			next = this.keyFrames[index + 1];


		this.remove(this.keyFrames[index]);
		interval.remove();

		this.keyFrames.splice(index, 1);
		this.intervals.splice(index, 1);

		prevInterval._next = next;

		if(interval && prevInterval) {
			//prevInterval.controlPoints[1].position = interval.controlPoints[1].position;
		}

		this.setActiveKeyFrame();
	}
};