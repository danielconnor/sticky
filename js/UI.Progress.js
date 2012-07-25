/*global util, UI*/
UI.Progress = (function() {
  "use strict";

  function Progress(length) {
    UI.SingleRangeControl.call(this, 0, length);

    this.classList.add("progress");
    this.classList.add("display-value");

    this.length = length;
    this.current = 0;
    this.value = 0;
  }

  util.inherits(Progress, UI.SingleRangeControl);

  var _proto = Progress.prototype,
    _super = UI.SingleRangeControl.prototype;

  return Progress;
})();
