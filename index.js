var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

// var lock = require('./lock');
var lock = require('./locknew');
var isLocked = false;

app.set('port', 3434);
app.use('/static', express.static(__dirname + '/static'));
app.get('/', (request, response) => response.sendFile(path.join(__dirname, 'index.html')));
server.listen(8282, () => console.log('Starting server on port 8282'));

io.on('connection', socket => {
        socket.on('lock', socket => {
                console.log('lock');
                lock.resetEDPins();
                lock.smallForward();
                // if(isLocked === false) {
                //         lock.backward(5, 128);
                // }
                // isLocked = true;
                // io.emit('isLocked', isLocked);
        });
        socket.on('unlock', socket => {
                console.log('unlock');
                lock.resetEDPins();
                lock.backward();
                // if(isLocked === true) {
                //         lock.forward(5, 128);
                // }
                // isLocked = false;
                // io.emit('isLocked', isLocked);
        });
        io.emit('isLocked', isLocked);

//   socket.on('disconnect', socket => {
//     console.log('Number of players: ' + Object.keys(io.sockets.sockets).length);
//     io.emit('numberOfPlayersChanged', Object.keys(io.sockets.sockets).length);
//     if(Object.keys(io.sockets.sockets).length === 1) {
//       io.emit('hostPlayer');
//     }
//   });
});