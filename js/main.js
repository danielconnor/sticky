(function() {

	var WIDTH = window.innerWidth,
		HEIGHT = window.innerHeight,
		storyboard = new StoryBoard();

	window.addEventListener("resize", function() {
		width = window.innerWidth;
		height = window.innerHeight;
	}, false);

	document.body.appendChild(storyboard.element);

	storyboard.addObject(new Objects.C.Skeleton(new Point(200,200)));

})();