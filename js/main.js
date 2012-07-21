/*global StoryBoard, Objects, Point */

(function() {
  "use strict";

  var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight,
    storyboard = new StoryBoard();

  window.addEventListener("resize", function() {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
  }, false);

  document.addEventListener("selectstart", function(e) { e.preventDefault(); }, false);


  document.body.appendChild(storyboard.element);

  storyboard.addObject(new Objects.C.Skeleton(new Point(200,200)));

  window.st = storyboard;
})();