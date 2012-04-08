function TestEventEmitter() {

	var testName = "EventEmitter",
		em = new EventEmitter();
	console.groupCollapsed(testName);



	console.groupCollapsed("perf");

	console.time("Adding Events");

	for(var i = 0; i < 1000000; i++) {
		em.addEventListener("event" + i % 1000, function() {

		}, false);
	}

	console.timeEnd("Adding Events");


	console.time("Adding Single Event");

	for(var i = 0; i < 1000000; i++) {
		em.addEventListener("event", function() {

		}, false);
	}

	console.timeEnd("Adding Single Event");

	console.time("Emitting Events");

	em.emit("event");

	console.timeEnd("Emitting Events");

	console.groupEnd("perf");

	console.groupEnd(testName)

}
