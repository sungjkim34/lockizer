var socket = io();
var isLocked = false;
$('#lockBtn').click(() => {
    socket.emit('lock');
});
$('#unlockBtn').click(() => {
    socket.emit('unlock');
});
socket.on('isLocked', isLocked => {
    isLocked = isLocked;
    $('#lockBtn').prop('disabled', isLocked);
    $('#unlockBtn').prop('disabled', !isLocked)
});