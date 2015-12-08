$(document).ready(function () {
	generateCanvas();
	drawDefault();
	$("#reset").on('click', function() {
		$(".wrapper").empty();
		var canvasSize = prompt("Set the size of blank canvas (1-100, default: 60x60)");
		// Check if input is a number. If yes, generate grid of specified size. If not, generate default grid.
		if (!isNaN(parseFloat(canvasSize)) && isFinite(canvasSize)) {
			generateCanvas(canvasSize);
			drawDefault();
		}
		else {
			generateCanvas();
			drawDefault();
		}
	});
});

var canvasSize = 600;

function generateCanvas (size) {
	var defaultCellSize = 10;
	var finalCellSize;
	if (size) {
		finalCellSize = canvasSize / size;
		console.log(finalCellSize);
		if (finalCellSize < 6) {
			finalCellSize = 6;
		}
		for (var r=0; r<size; r++) {
			for (var c=0; c<size; c++) {
				$(".wrapper").append('<div class="cell"></div>');
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
	else {
		finalCellSize = defaultCellSize;
		var defaultSize = canvasSize / defaultCellSize;
		for (var r=0; r<defaultSize; r++) {
			for (var c=0; c<defaultSize; c++) {
				$(".wrapper").append('<div class="cell"></div>');
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
}

function drawDefault () {
	$(".wrapper").children(".cell").on('mouseenter', function() {
		$(this).addClass("visited");
	});
}