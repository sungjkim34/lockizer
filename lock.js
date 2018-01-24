var Gpio = require('onoff').Gpio;
var in1 = new Gpio(17, 'out');
var in2 = new Gpio(18, 'out');
var in3 = new Gpio(27, 'out');
var in4 = new Gpio(22, 'out');

forward(5, 128);

async function forward(delay, steps){
        for(var i = 0; i < steps; i++) {
                setStep(1, 0, 0, 0);
                await sleep(delay);
                setStep(0, 1, 0, 0);
                await sleep(delay);
                setStep(0, 0, 1, 0);
                await sleep(delay);
                setStep(0, 0, 0, 1);
                await sleep(delay);
        }
        setStep(0,0,0,0);
}

async function backward(delay, steps){
        for(var i = 0; i < steps; i++) {
                setStep(1, 0, 0, 0);
                await sleep(delay);
                setStep(0, 0, 0, 1);
                await sleep(delay);
                setStep(0, 0, 1, 0);
                await sleep(delay);
                setStep(0, 1, 0, 0);
                await sleep(delay);
        }
        setStep(0,0,0,0);
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function setStep(w1, w2, w3, w4){
	in1.writeSync(w1);
	in2.writeSync(w2);
	in3.writeSync(w3);
	in4.writeSync(w4);
}

module.exports = {
    forward: forward,
    backward: backward
};
