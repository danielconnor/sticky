/*global util, UI*/
UI.Resources = (function() {
  "use strict";

  function Resources(tagName, classes) {
    UI.Popout.call(this);
    this.dropzone = new UI.DropZone();

    this.append(this.dropzone);

  }
  util.inherits(Resources, UI.Popout);

  var _proto = Resources.prototype,
    _super = UI.Popout.prototype;

  return Resources;
})();