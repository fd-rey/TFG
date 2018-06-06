var fs = require('fs');
var app = require('express')();
var https = require('https');
var options = {
	key: fs.readFileSync('./file.pem'),
	cert:fs.readFileSync('./file.crt')
};

var serverPort = 8080;
var server = https.createServer(options, app);
var io = require('socket.io')(server);

server.listen(serverPort, function () {
  console.log('Signaling server listening on '+serverPort);
});

var count = 0;

app.get('/', function (req, res) {
  res.send('<html><head></head><body><p>Hi from signaling-server</p></body></html>');
});

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
