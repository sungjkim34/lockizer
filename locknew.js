var Gpio = require('onoff').Gpio;
var stp = new Gpio(2, 'out');
var dir = new Gpio(3, 'out');
var MS1 = new Gpio(4, 'out');
var MS2 = new Gpio(5, 'out');
var EN = new Gpio(6, 'out');

// async function forward(delay, steps) {
//     for (var i = 0; i < steps; i++) {
//         setStep(1, 0, 0, 0);
//         await sleep(delay);
//         setStep(0, 1, 0, 0);
//         await sleep(delay);
//         setStep(0, 0, 1, 0);
//         await sleep(delay);
//         setStep(0, 0, 0, 1);
//         await sleep(delay);
//     }
//     setStep(0, 0, 0, 0);
// }

// async function backward(delay, steps) {
//     for (var i = 0; i < steps; i++) {
//         setStep(1, 0, 0, 0);
//         await sleep(delay);
//         setStep(0, 0, 0, 1);
//         await sleep(delay);
//         setStep(0, 0, 1, 0);
//         await sleep(delay);
//         setStep(0, 1, 0, 0);
//         await sleep(delay);
//     }
//     setStep(0, 0, 0, 0);
// }

// function setStep(w1, w2, w3, w4) {
//     in1.writeSync(w1);
//     in2.writeSync(w2);
//     in3.writeSync(w3);
//     in4.writeSync(w4);
// }

function StepForwardDefault() {
    dir.writeSync(0);
    for (var x = 1; x < 1000; x++)  //Loop the forward stepping enough times for motion to be visible
    {
        stp.writeSync(1);
        await new Promise(resolve => setTimeout(resolve, 5));
        stp.writeSync(0);
        await new Promise(resolve => setTimeout(resolve, 5));
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function resetEDPins() {
    stp.writeSync(0);
    dir.writeSync(0);
    MS1.writeSync(0);
    MS2.writeSync(0);
    EN.writeSync(1);
}

module.exports = {
    stepForwardDefault: StepForwardDefault,
    resetEDPins: resetEDPins
    // forward: forward,
    // backward: backward
};
