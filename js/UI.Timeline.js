/*global util, UI */
UI.Timeline = (function() {
  "use strict";

  function Timeline(animatable, property, start, end) {
    UI.MultiRange.call(this, end, start);

    var timeline = this;

    this.classList.add("timeline");
    this.classList.add("display-value");

    this.addEventListener("dblclick", this.dblclick.bind(this), false);

    this.keyFrames = [];
    this.intervals = [];

    this.animatable = animatable;
    this.property = property;
    this._current = start;


    timeline.handleSelect = function() {
      timeline.selectKeyFrame(this);
    };

    timeline.handleTimeChange = function() {
      var prev = this.prev,
        next = this.next;

      if(next && this.value > next.value) {
        this.value = next.value - 1;
      }
      if(prev && this.value < prev.value) {
        this.value = prev.value + 1;
      }
    };

    this.addAtPosition(new UI.KeyFrame(this, animatable[property], end, false), 0);
    this.addAtPosition(new UI.KeyFrame(this, animatable[property], this._current, false), 0);

    this._changeAnimatable = false;

    this.animatable.addEventListener("clone", this.compile.bind(this));

    this.animatable.addEventListener(property + "change", function(e) {
      if(timeline.active) {
        timeline.active._prop = this[timeline.property];
        
        if(timeline.curInterval) timeline.curInterval.update();
        if(timeline.prevInterval) timeline.prevInterval.update();
      }
      else if(!timeline._changeAnimatable) {
        //if it wasnt updated by the timeline
        //i.e. by a Voodoo, we create a new KeyFrame at the current time
        timeline.addAtTime(timeline._current);
      }
      timeline._changeAnimatable = false;
    });
  }

  util.inherits(Timeline, UI.MultiRange);

  var _proto = Timeline.prototype,
    _super = UI.MultiRange.prototype;


  _proto.setCurrent = function(current) {
    this._current = current;

    this.setActiveKeyFrame();

    this._changeAnimatable = true;

    if(this.active) {
      this.animatable[this.property] = this.active._prop;
    }
    else if(this.curInterval && this.next) {
      this.animatable[this.property] = this.curInterval.getInterval(current);
    }
    else {
      //TODO: hide - the animatable is no longer in scope on the timeline
    }
  };

  Object.defineProperty(_proto, "current", {
    get: function() {
      return this._current;
    },
    set: function(current) {
      if(this._current != current) {
        this.setCurrent(current);

        this.emit("currentchange", current);
      }
    }
  });

  Object.defineProperty(_proto, "prop", {
    set: function() {

    },
    get: function() {
      return this.animatable[this.property];
    }
  });

  _proto.dblclick = function(e) {
    this.addAtTime(this.valueAtOffset(e.pageX - this.left));
  };

  _proto.setActiveKeyFrame = function() {
    var keyFrames = this.keyFrames,
      intervals = this.intervals,
      current = this._current;


    if(!(this.curInterval && this.curInterval._prev._value < current && this.curInterval._next._value > current) || (this.active && this.active._value != current)) {
      if(current >= keyFrames[0]._value && current <= keyFrames[keyFrames.length - 1]._value) {

        var i = this.getPositionAt(this._current),
          keyFrame = keyFrames[i],
          interval;

        if(keyFrame._value === current) {
          if(this.active !== keyFrame) {

            if(this.active) this.active.active = false;
            this.active = keyFrame;
            this.active.active = true;
            
            if(this.curInterval) this.curInterval.active = false;
            this.curInterval = intervals[i];
            if(this.curInterval) this.curInterval.active = true;

            this.prevInterval = this.intervals[i - 1];
          }
          return;
        }
        else if(this.curInterval != this.intervals[i] || !this.next || !this.prev) {
          if(this.curInterval) this.curInterval.active = false;
          this.curInterval = this.intervals[i];
          if(this.curInterval) this.curInterval.active = true;
          this.prev = keyFrames[i];
          this.next = keyFrames[i + 1];
        }
        if(this.active) this.active.active = false;
        this.active = undefined;
      }
    }
  };

  _proto.selectKeyFrame = function(keyFrame) {
    this.current = keyFrame._value;
  };

  _proto.addAtPosition = function(keyFrame, index) {
    var timeline = this,
      keyFrames = this.keyFrames;
    this.append(keyFrame);

    keyFrame.addEventListener("select", this.handleSelect);
    keyFrame.addEventListener("timechange", this.handleTimeChange);
    keyFrame.element.addEventListener("dblclick", function(e) {
      timeline.removeKeyFrame(timeline.findKeyFramePos(keyFrame));
      e.stopPropagation();
      e.preventDefault();
      return false;
    });

    if(keyFrames.length) {
      var interval = new this.animatable.intervalConstructor(keyFrame, this.keyFrames[index], this.animatable);

      interval.addEventListener("change", function() {
        timeline._changeAnimatable = true;

        if(timeline.active) {
          timeline.animatable[timeline.property] = timeline.active._prop;
        }
        else if(timeline.curInterval === this) {
          timeline.animatable[timeline.property] = timeline.curInterval.getInterval(timeline._current);
        }
      });

      if(this.intervals[index -1])
      {
        this.intervals[index - 1]._next = keyFrame;
        this.intervals[index - 1].update();
      }
      this.intervals.splice(index, 0, interval);
    }
    keyFrames.splice(index, 0, keyFrame);

    keyFrames[index].next = keyFrames[index + 1];
    keyFrames[index].prev = keyFrames[index - 1];

    if(keyFrames[index + 1]) keyFrames[index + 1].prev = keyFrames[index];
    if(keyFrames[index - 1]) keyFrames[index - 1].next = keyFrames[index];


    this.setActiveKeyFrame();
  };

  _proto.addAtTime = function(time) {
    var i = this.getPositionAt(time);

    this.addAtPosition(new UI.KeyFrame(this, this.curInterval.getInterval(time), time), i + 1);
  };


  //indexOf performance seems to be better for smaller collections and binarySearch for larger
  //however we don't really expect huge numbers of keyFrames so we use indexOf unless specified
  _proto.findKeyFramePos = function(keyFrame, binarySearch) {
    var keyFrames = this.keyFrames,
      i = binarySearch ? this.getPositionAt(keyFrame.value) : keyFrames.indexOf(keyFrame);
    return keyFrames[i] == keyFrame ? i : -1;
  };

  _proto.getPositionAt = function(time) {
    var k = this.keyFrames,
      max = k.length,
      min = 0,
      i,
      last = 0,
      v;

    while ( 1 ) {
      i = (min + max) >> 1;
      if (last == i) break;
      last = i;
      v = k[i]._value;
      if (v < time) {
        min = i;
      }
      else if (v > time) {
        max = i;
      }
      else {
        break;
      }
    }
    return i;
  };



  _proto.removeKeyFrame = function(index) {
    var keyFrames = this.keyFrames,
      intervals = this.intervals;

    if(keyFrames.length > 2) {

      var prevInterval = intervals[index - 1],
        interval = intervals[index],
        next = keyFrames[index + 1];

      //remove the actual keyframe element from the DOM
      this.remove(keyFrames[index]);

      //remove the CurveKeyFrameIntervals path from the DOM
      //this only applies in the case of CurvekeyFrameIntervals but
      //there is a place holder function in other Intervals
      interval.remove();

      keyFrames.splice(index, 1);
      intervals.splice(index, 1);

      keyFrames[index - 1].next = keyFrames[index];
      keyFrames[index].prev = keyFrames[index - 1];

      prevInterval._next = next;

      if(interval && prevInterval) {
        //prevInterval.controlPoints[1].position = interval.controlPoints[1].position;
      }

      this.setActiveKeyFrame();

      this.curInterval.update();
    }
  };

  _proto.deselect = function() {
    var intervals = this.intervals,
      i = intervals.length;

    while(i--) intervals[i].deselect();
  };

  _proto.select = function() {
    var intervals = this.intervals,
      i = intervals.length;

    while(i--) intervals[i].select();
  };


  _proto.compile = function(clonedAnimatable) {
    var intervals = this.intervals;

    for(var i = 0, il = intervals.length; i < il; i++) {
      clonedAnimatable.append(intervals[i].getTransform());
    }
  };

  _proto.test = function(perf) {
    var keyFrames = this.keyFrames,
      success = true,
      i,
      il,
      cur,
      next,
      valid,
      prev;

    console.group("test");

    console.groupCollapsed("Test insert location is correct");
    for(i = 0, il = keyFrames.length; i < il - 1; i++) {
      cur = keyFrames[i];
      next = keyFrames[i + 1];
      valid = cur.value < next.value;

      console.log("%d is less than %d: %s", cur.value.toFixed(2), next.value.toFixed(2), valid);

      success = valid && success;
    }
    console.log("test was successful: %s", success);
    console.groupEnd();


    console.groupCollapsed("Test next are ok");
    success = true;
    for(i = 0, il = keyFrames.length; i < il - 1; i++) {
      cur = keyFrames[i],
      next = keyFrames[i + 1];
      valid = cur.next == next;

      console.log("keyFrame[%d].next is equal keyFrame[%d]: %s", i, i + 1, valid);

      success = valid && success;
    }
    console.log("test was successful: %s", success);
    console.groupEnd();

    console.groupCollapsed("Test prev are ok");
    success = true;
    for(i = 0, il = keyFrames.length; i < il; i++) {
      cur = keyFrames[i];
      prev = keyFrames[i - 1];
      valid = cur.prev == prev;

      console.log("keyFrame[%d].prev is equal keyFrame[%d]: %s", i, i - 1, valid);
    }
    console.log("test was successful: %s", success);
    console.groupEnd();

    if(perf) {
      console.groupCollapsed("search performance");

      var iter = 10000;

      console.time("insertion");
      for(i = 1; i < 1000; i++) {
        this.addAtTime(i);
      }
      console.timeEnd("insertion");

      for(var j = 0; j < 100; j++) {
        var loc = Math.floor(Math.random() * 999),
          k = keyFrames[loc];

        console.time("indexOf");
        for(i = 0; i < iter; i++) {
          if(loc !== keyFrames.indexOf(k)) throw new Error("failed on " + loc + "===" + keyFrames.indexOf(k));
        }
        console.timeEnd("indexOf");


        console.time("findKeyFramePos");
        for(i = 0; i < iter; i++) {
          if(loc !== this.findKeyFramePos(k, true)) throw new Error("failed on " + loc + "===" + this.findKeyFramePos(k, true));
        }
        console.timeEnd("findKeyFramePos");
      }

      console.groupEnd();
    }

    console.groupEnd();
  };

  return Timeline;

})();