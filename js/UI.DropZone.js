/*global util, UI*/

UI.DropZone = (function() {
  "use strict";

  function DropZone(tagName, classes) {
    UI.Control.call(this, tagName, classes);

    this.handle("dragenter");
    this.handle("dragleave");
    this.handle("dragover");
    this.handle("drop");
  }
  util.inherits(DropZone, UI.Control);

  DropZone.prototype.ondragenter = function(e) {
    this.classList.add("dragging");
  };

  DropZone.prototype.ondragleave = function(e) {
    this.classList.add("dragging");
  };

  DropZone.prototype.ondragover = function(e) {
    e.preventDefault();
    this.ondragenter(e);
    e.dataTransfer.dropEffect = 'copy';
  };

  DropZone.prototype.ondrop = function(e) {
    e.stopPropagation();
    e.preventDefault();
    this.ondragleave(e);
    var files = e.dataTransfer.files;
    this.emit("drop", files);
    return files;
  };

  return DropZone;
})();