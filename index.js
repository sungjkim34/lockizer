var gpio = require('onoff').Gpio;
var led = new gpio(4, 'out');
var blinkInterval = setInterval(blinkLED, 250);

function blinkLED() {
	if (led.readSync() === 0) {
		led.writeSync(1);
	} else {
		led.writeSync(0);
	}
}

function endBlink() {
	clearInterval(blinkInterval);
	led.writeSync(0);
	led.unexport();
}

setTimeout(endBlink, 5000);
