var Gpio = require('onoff').Gpio;
var stp = new Gpio(2, 'out');
var dir = new Gpio(3, 'out');
var MS1 = new Gpio(4, 'out');
var MS2 = new Gpio(5, 'out');
var EN = new Gpio(6, 'out');

async function smallForward() {
    EN.writeSync(0);
    dir.writeSync(0);
    MS1.writeSync(1);
    MS2.writeSync(1);
    for (var x = 1; x < 1000; x++)  //Loop the forward stepping enough times for motion to be visible
    {
        console.log(x);
        stp.writeSync(1);
        await sleep(1);
        stp.writeSync(0);
        await sleep(1);
    }
    resetEDPins();
}

async function smallBackward() {
    EN.writeSync(0);
    dir.writeSync(1);
    MS1.writeSync(1);
    MS2.writeSync(1);
    for (var x = 1; x < 1000; x++)  //Loop the forward stepping enough times for motion to be visible
    {
        console.log(x);
        stp.writeSync(1);
        await sleep(1);
        stp.writeSync(0);
        await sleep(1);
    }
    resetEDPins();
}

async function forward() {
    EN.writeSync(0);
    dir.writeSync(0);
    for (var x = 1; x < 1000; x++)  //Loop the forward stepping enough times for motion to be visible
    {
        console.log(x);
        stp.writeSync(1);
        await sleep(5);
        stp.writeSync(0);
        await sleep(5);
    }
    resetEDPins();
}

async function backward() {
    EN.writeSync(0);
    dir.writeSync(1);
    for (var x = 1; x < 1000; x++)  //Loop the forward stepping enough times for motion to be visible
    {
        console.log(x);
        stp.writeSync(1);
        await sleep(5);
        stp.writeSync(0);
        await sleep(5);
    }
    resetEDPins();
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
    // stepForwardDefault: StepForwardDefault,
    resetEDPins: resetEDPins,
    forward: forward,
    backward: backward,
    smallForward: smallForward,
    smallBackward: smallBackward
};
