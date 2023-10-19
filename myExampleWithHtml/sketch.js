// let x=100;
// let y=100;
// let col;

function setup() {
	createCanvas(500, 500);
	// setupOsc(9000, 3334);
	col = color(0,0,0);
	console.log("welcome");
}

function draw() {
	background(col);
	fill(0, 255, 0);
	ellipse(x, y, 50, 50);
	fill(0);
	textAlign(CENTER, CENTER);
	text("Hola", x, y);
}

