/*global StoryBoard, UI, Objects, Point */
(function() {
  "use strict";

  var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight,
    storyboard = new StoryBoard(WIDTH, HEIGHT, 1000),
    resources = new UI.Resources();


  window.addEventListener("resize", function() {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    storyboard.updateDimensions(WIDTH, HEIGHT);
  }, false);

  document.addEventListener("selectstart", function(e) { e.preventDefault(); }, false);


  document.body.appendChild(storyboard.element);
  document.body.appendChild(resources.element);

  storyboard.addObject(new Objects.C.Skeleton(new Point(200,200)));

  window.st = storyboard;
})();