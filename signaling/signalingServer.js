var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var serverPort = 3001;
server.listen(serverPort, function () {
  console.log('Signaling server listening on '+serverPort);
});

var count = 0;

//allow only 2 connected clients

io.on('connection', function (socket) {

  console.log('connected socket: ' + socket.id)
  socket.on('sdpOfferMessage', function(message){
    console.log('arrived sdp offer');
    socket.broadcast.emit('incomingOffer',message);
  });

  socket.on('sdpAnswerMessage', function(message){
    console.log('arrived sdp answer');
    socket.broadcast.emit('incomingAnswer',message);
  });

  socket.on('iceCandidateMessage', function(message){
    console.log('arrived iceCandidateMessage');
    socket.broadcast.emit('newIceCandidate',message);
  });

  socket.on('disconnect', function () {
    console.log(socket.id+" disconnected from the server");
  });

});
