(function() {

	var WIDTH = window.innerWidth,
		HEIGHT = window.innerHeight,
		screen = document.createElement("div");
		
		paper = Raphael(screen, WIDTH, HEIGHT),
		storyboard = new StoryBoard(paper);

	window.addEventListener("resize", function() {
		width = window.innerWidth;
		height = window.innerHeight;
	}, false);


	storyboard.addObject(new Objects.C.Skeleton(paper, new Point(200,200)));

	document.body.appendChild(storyboard.element);
})();