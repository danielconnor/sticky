/*global util, UI*/

UI.DropZone = (function() {
  "use strict";

  function DropZone(tagName, classes) {
    UI.Control.call(this, tagName, classes);

    this.classList.add("dropzone");

    this.addEventListener("dragenter", this.dragenter.bind(this), false);
    this.addEventListener("dragleave", this.dragleave.bind(this), false);
    this.addEventListener("dragover", this.dragover.bind(this), false);
    this.addEventListener("drop", this.drop.bind(this), false);
  }
  util.inherits(DropZone, UI.Control);

  DropZone.prototype.dragenter = function(e) {
    this.classList.add("dragging");
  };

  DropZone.prototype.dragleave = function(e) {
    this.classList.remove("dragging");
  };

  DropZone.prototype.dragover = function(e) {
    e.preventDefault();
    this.dragenter(e);
    e.dataTransfer.dropEffect = 'copy';
  };

  DropZone.prototype.drop = function(e) {
    e.stopPropagation();
    e.preventDefault();
    this.dragleave(e);
    var files = e.dataTransfer.files;
    this.emit("dropfiles", files);
    return files;
  };

  return DropZone;
})();