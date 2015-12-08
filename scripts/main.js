$(document).ready(function () {
	generateCanvas();
	drawDefault();
	$("#reset").on('click', function() {
		changeMode(drawDefault);
	});
	$("#colorful").on('click', function() {
		changeMode(drawColorful);
	});
	$("#weak").on('click', function() {
		changeMode(drawWeak);
	});
	$("#colorweak").on('click', function() {
		changeMode(drawColorful);
		drawWeak();
	});
	$("#trail").on('click', function() {
		changeMode(trail);
	});
});

var canvasSize = 600;

function generateCanvas (size) {
	var defaultCellSize = 10;
	var finalCellSize;
	if (size > 100) {
		size = 100;
	}
	if (size) {
		finalCellSize = canvasSize / size;
		for (var r=0; r<size; r++) {
			for (var c=0; c<size; c++) {
				$(".wrapper").append('<div class="cell"></div>');
			}
		}
	}
	else {
		finalCellSize = defaultCellSize;
		var defaultSize = canvasSize / defaultCellSize;
		for (var r=0; r<defaultSize; r++) {
			for (var c=0; c<defaultSize; c++) {
				$(".wrapper").append('<div class="cell"></div>');
			}
		}
	}
	$(".wrapper").css({
		"font-size": finalCellSize+"px",
		"line-height": 0
	});
	$(".wrapper").children(".cell").css({
		"width": finalCellSize+"px",
		"height": finalCellSize+"px"
	});
}

function changeMode (funct) {
	$(".wrapper").empty();
	var canvasSize = prompt("Set the size of blank canvas (1-100, default: 60x60)");
	// Check if input is a number. If yes, generate grid of specified size. If not, generate default grid.
	if (!isNaN(parseFloat(canvasSize)) && isFinite(canvasSize)) {
		generateCanvas(canvasSize);
		funct();
	}
	else {
		generateCanvas();
		funct();
	}
}

function drawDefault () {
	$(".wrapper").children(".cell").on("mouseenter", function() {
		$(this).addClass("visited");
	});
}

function drawColorful () {
	$(".wrapper").children(".cell").on("mouseenter", function() {
		var red = Math.floor(Math.random() * 255);
		var blue = Math.floor(Math.random() * 255);
		var green = Math.floor(Math.random() * 255);
		$(this).css({
			"background-color": "rgb(" + red + "," + green + "," + blue + ")"
		});
	});
}

function drawWeak () {
	$(".wrapper").children(".cell").on("mouseenter", function() {
		var currentOpacity = $(this).css("opacity");
		if (currentOpacity > 0.1) {
			currentOpacity -= 0.1;
		}
		else {
			currentOpacity = 0;
		}
		console.log(currentOpacity);
		$(this).css("opacity", currentOpacity);
	});
}

function trail () {
	var duration = prompt("How long should the animation run? (300-3000 ms)");
	if (duration < 300) {
		duration = 300;
	}
	else if (duration > 3000) {
		duration = 3000;
	}
	console.log(duration)
	$(".wrapper").children(".cell").on("mouseenter", function() {
		$(this).finish().fadeTo(300, 0);
	});
	$(".wrapper").children(".cell").on("mouseleave", function() {
		$(this).fadeTo(duration, 1);
	});
}