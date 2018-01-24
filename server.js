
var fs = require('fs');
var https = require('https');
var express = require('express');
var app = express();

var options = {
	key: fs.readFileSync('./file.pem'),
	cert:fs.readFileSync('./file.crt')
};

var serverPort = 8080;

// var server = require('http').Server(app);
var server = https.createServer(options, app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));

server.listen(serverPort, function () {
  console.log('Web server listening on '+serverPort);
});

var count = 0;
var connectedUsers={};

io.on('connection', function (socket)
{

  socket.emit('requestuserinfo');

	console.log(connectedUsers)
  socket.on('receiveuserinfo',function(userInfo){
  	//Sending the alreay connected users to the new user
  	for(var key in connectedUsers){
  		socket.emit('userlistadd',connectedUsers[key].username);
  	}
  	//The new user is saved using his/her socket id as key
  	connectedUsers[socket.id] = userInfo;
  	//The others users get notified of the new connection
  	socket.broadcast.emit('userlistadd',userInfo.username);

  });

  // socket.on('callRequest', function(message){
  //   for(key in connectedUsers){
  //     if(connectedUsers[key].username === message.target){
  //       //found destination user
  //       //send the sdpOffer to the target
  //       socket.broadcast.to(key).emit('incomingCallRequest',message);
  //       break;
  //     }
  //   }
  // });



  socket.on('disconnect', function () {
    // var userToRemove = connectedUsers[socket.id].username;
    // socket.broadcast.emit('userlistremove',userToRemove);
    // delete connectedUsers[socket.id];
    // console.log(userToRemove+" disconnected from the server");
  });

//#########################################################
//							MOVE TO THE SIGNALING SERVER
//#########################################################
  // socket.on('sdpOfferMessage', function(message){
  // 	console.log(message);
  // 	for(var key in connectedUsers){
  // 		if(connectedUsers[key].username === message.target){
  // 			//found destination user
  // 			//send the sdpOffer to the target
  // 			socket.broadcast.to(key).emit('incomingOffer',message);
  // 			break;
  // 		}
  // 	}
  // });
	//
  // socket.on('sdpAnswerMessage', function(message){
  // 	for(var key in connectedUsers){
  // 		if(connectedUsers[key].username === message.target){
  // 			//found destination user
  // 			//send the sdpAnswer to the target
  // 			socket.broadcast.to(key).emit('incomingAnswer',message);
  // 			break;
  // 		}
  // 	}
  // });
	//
  // socket.on('iceCandidateMessage', function(message){
  // 	for(var key in connectedUsers){
  // 		if(connectedUsers[key].username === message.target){
  // 			//found destination user
  // 			//send the candidate to the target
  // 			socket.broadcast.to(key).emit('newIceCandidate',message);
  // 			break;
  // 		}
  // 	}
  // });

  socket.on('endCall', function(message){
  	for(var key in connectedUsers){
  		if(connectedUsers[key].username === message.target){
  			//found destination user
  			socket.broadcast.to(key).emit('closeConnection');
  			break;
  		}
  	}
  });



 //end onconnection
});
