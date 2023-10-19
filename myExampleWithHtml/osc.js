let x=100;
let y=100;
let col;
// var socket;
var isConnected;


function setup() {
	createCanvas(300, 300);
	setupOsc(9000, 3334);
	col = color(0,0,0);
	console.log("welcome");
}

// function draw() {
// 	background(col);
// 	fill(0, 255, 0);
// 	ellipse(x, y, 50, 50);
// 	fill(0);
// 	textAlign(CENTER, CENTER);
// 	text("Hola", x, y);
// }

// function mousePressed(){
// 	// console.log('test');
// 	window.postMessage('test');
// }

function mouseDragged(){
	let mx = map(mouseX, 0, width, 0, 1);
	let my = map(mouseY, 0, height, 0, 1);
	sendOsc('mousePos', [mx,my]);
}


function receiveOsc(address, value) {
	console.log("received OSC: " + address + ", " + value);

	if (address == '/3/xy') {
		x = value[0] * width;
		y = value[1] * height;
	}

	if (address == '/2/push1') {
		col = color(random(255), random(255),random(255) );
	}

	window.postMessage(address);
}

function sendOsc(address, value) {	
	if (isConnected) {
		// socket.emit('message', [address, value]);
		socket.emit('message', [address].concat(value));
	}
}

function setupOsc(oscPortIn, oscPortOut) {
	socket = io.connect('http://127.0.0.1:8081', { port: 8081, rememberTransport: false });
	socket.on('connect', function() {
		socket.emit('config', {
			server: { port: oscPortIn,  host: '127.0.0.1'},
			client: { port: oscPortOut, host: '127.0.0.1'}
		});
	});

	socket.on('connect', function() {
		isConnected = true;
	});

	socket.on('message', function(msg) {
		if (msg[0] == '#bundle') {
			for (var i=2; i<msg.length; i++) {
				receiveOsc(msg[i][0], msg[i].splice(1));
			}
		} else {
			receiveOsc(msg[0], msg.splice(1));
		}
	});
}
