(function() {

	var width = window.innerWidth,
		height = window.innerHeight,
		screen = document.createElement("div"),
		paper = Raphael(screen, width, height),
		controls = new UI.Control("div"),
		storyboard = new StoryBoard(paper, controls);

	window.addEventListener("resize", function() {
		width = window.innerWidth;
		height = window.innerHeight;
	}, false);

    storyboard.addObject(new Objects.C.Skeleton(paper, new Point(200,200)));

    document.body.appendChild(storyboard.element);
})();