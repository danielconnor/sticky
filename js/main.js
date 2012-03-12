(function() {

	var width = window.innerWidth,
		height = window.innerHeight,
		screen = document.createElement("div"),
		paper = Raphael(screen, width, height),
		storyboard = new StoryBoard(paper);

	window.addEventListener("resize", function() {
		width = window.innerWidth;
		height = window.innerHeight;
	}, false);

	storyboard.addObject(new Objects.C.Skeleton(paper, new Point(200,200)));

	document.body.appendChild(storyboard.element);
})();