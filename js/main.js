/*global StoryBoard, UI, Objects, Point */
(function() {
  "use strict";

  var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight,
    storyboard = new StoryBoard(WIDTH, HEIGHT, 1000),
    resources = new UI.Resources(),
    prompt = new UI.Prompt("open");

  window.addEventListener("resize", function() {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    storyboard.updateDimensions(WIDTH, HEIGHT);
  }, false);

  document.body.appendChild(storyboard.element);
  document.body.appendChild(resources.element);

  storyboard.addObject(new Objects.C.Skeleton(new Point(200,200)));

  window.p = prompt;
  window.st = storyboard;
})();

