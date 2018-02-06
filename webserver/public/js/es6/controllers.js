/*jshint esversion: 6 */

class Controller {
	constructor(socket, session){
		this.socket = socket;
		this.session = session;
	}

	init(){}
}

class ViewController extends Controller {
	constructor(socket , view=null){
		super(socket);
		this.view = view;
	}
}

class UserListController extends ViewController{
	constructor(socket , listView){
		super(socket, listView);
		this.userList = [];
	}
	init(){
		this.socket.on('userlistadd',function(user){
			//notify the view
			this.add(user);
		  	this.view.render();
		  
		  

		});
		this.socket.on('userlistremove',function(user){
			this.remove(user);
			this.view.render();
		  //Remove a user from the list
		  // var itemToRemove = document.getElementById(user);
		  // itemToRemove.parentNode.removeChild(itemToRemove);

		});
	}

	add(username){
		this.userList.push(username);
	}
	remove(username){
		for(let x= 0; x< this.userList.length;x++){
			if(this.userList[x] === username){
				this.userList.splice(x,1);
				return;
			}
		}
	}
	getList(){
		return this.userList;
	}
	engage(event){
		var target = event.target.id;
		if(target === this.session.getUserName()){
		    //trying to connect to self
		  return;
		}
		if(target === this.session.getTargetName()){
		    //trying to connect to same target
		  return;
		}
		//recoger de la DB el user con name target
		//enviarselo al model
		this.session.setTarget(target);

	}

}

class CallController extends Controller{
	constructor(socket, session){
		super(socket, session);
		this.pc = null; //RTCPeerConnection
	}

	init(){

		this.socket.on('incomingOffer',function(message){
		  console.log('incoming offer from: '+message.username);
		  // $('#modal1').modal('open');
		  this.target = message.username;
		  this.handleIncomingOffer(message.sdp);
		});

		this.socket.on('incomingAnswer',function(message){
		  this.handleIncomingAnswer(message.sdp);
		});

		this.socket.on('newIceCandidate',function(message){
		  console.log('new candidate arrived');
		  var candidate = new RTCIceCandidate(message.candidate);
		  this.pc.addIceCandidate(candidate)
		  .then(function(){console.log('new candidate added');})
		  .catch(handleError);
		  
		});

		this.socket.on('closeConnection',function(){
		  console.log('The peer has ended the call');
		  this.closePeerConnection();
		});
	}

	engage(target){
		
		// socket.emit('callRequest',{
		//   username: Session.userInfo.username,
		//   target: event.target.id
		// });

		//create the connection
		this.createPeerConnection();
		//get user media
		navigator.mediaDevices.getUserMedia({
		  audio: true,
		  video: true
		})
		.then(function(stream){
		  console.log('Adding local stream.');
		  localVideo.src = window.URL.createObjectURL(stream);
		  this.pc.addStream(stream);
		})
		.catch(handleError);

	}
	notify(){
		//target updated
		let target = this.session.getTargetName();
		if(target!== "" && target !== undefined && target !== null){
			this.engage(target);	
		} 
		
	}

	hangUp(){
	  //close connection and notify target
	  this.socket.emit('endCall',{
	    target: this.target
	  });
	  this.closePeerConnection();
	  console.log('You have ended the call');
	}
	createPeerConnection(){
		console.log('Creating peer connection');
		try{
		  this.pc = new RTCPeerConnection(null);
		  //optional parameters servers
		//for updating the implementation
		// hasAddTrack = (Session.pc.addTrack !== undefined);
		  this.pc.onicecandidate = this.handleIceCandidate;
		  this.pc.onnegotiationneeded = this.handleNegotiationNeeded;
		  this.pc.onaddstream = this.handleRemoteStream;
		  this.pc.onremovestream = this.handleRemoveStream;

		}catch(e){
		  handleError(e);
		  return;
		}
	}
	handleNegotiationNeeded(){
	  if(this.pc.localDescription.sdp !== ""){
	    console.log('no need to send offer?');
	    return;
	  }
	  //peer ready to make offer to another
	  console.log('negotiationneeded triggered');
	  this.pc.createOffer().then(function(offer){
	    //set the created offer as local description

	    return this.pc.setLocalDescription(offer);
	  })
	  .then(function(){
	    //local description set successfull
	    //now sending it to the peer
	    console.log('localDescription set');
	    console.log('sending offer to '+this.target);
	    this.socket.emit('sdpOfferMessage',{
	      username: this.session.getUserName(),
	      target: this.session.getTargetName(),
	      sdp: this.pc.localDescription
	    });
	  })
	  .catch(handleError);

	}

	handleIceCandidate(event){
	  //The candidate property of the event containts
	  //the object that ICE layer want us to transmit
	  console.log('new candidate to transmit');
	  if(event.candidate){
	    this.socket.emit('iceCandidateMessage',{
	      target: this.target,
	      candidate: event.candidate
	    });
	  }
	}
	handleRemoteStream(event){
	  //event.stream contains the remote stream
	  remoteVideo.src = window.URL.createObjectURL(event.stream);
	}

	handleRemoveStream(){
	  this.closePeerConnection();
	}
	handleIncomingAnswer(sdp){
	  //peer answered with his/her descriptor
	  this.pc.setRemoteDescription(sdp)
	  .catch(handleError);
	  console.log('remoteDecriptor set from answer');
	}
	handleIncomingOffer(sdp){
	  //sdp contains the SDP of the caller
	  this.createPeerConnection();
	  var callerSDP = new RTCSessionDescription(sdp);
	  this.pc.setRemoteDescription(callerSDP)
	  .then(function(){
	      //caller SDP set successfull 
	      console.log('Setting up local media');
	      navigator.mediaDevices.getUserMedia({
	        audio: true,
	        video: true
	      })
	      .then(function(stream){
	        console.log('Adding local stream.');
	        localVideo.src = window.URL.createObjectURL(stream);
	        this.pc.addStream(stream);
	      })
	      .then(function(){
	        console.log('creating answer');
	        return this.pc.createAnswer();
	      })
	      .then(function(answer){
	        console.log('setting answer as localDescriptor');
	        //the answer is the calee localDescriptor
	        return this.pc.setLocalDescription(answer);
	      })
	      .then(function(){
	        console.log('sending answer to caller');
	        //send the answer to the caller
	        this.socket.emit('sdpAnswerMessage',{
	          username: this.session.getUserName(),
	          target: this.session.getTargetName(),
	          sdp: this.pc.localDescription
	        });
	      });
	    })
	    .catch(handleError);
	//end handleIncomingOffer 
	}

	closePeerConnection(){
	  if (this.pc) {
	  //change for player removal           
	    if (remoteVideo.srcObject) {
	      remoteVideo.srcObject.getTracks().forEach(track => track.stop());
	      remoteVideo.srcObject = null;
	    }
	    if (localVideo.srcObject) {
	      localVideo.srcObject.getTracks().forEach(track => track.stop());
	      localVideo.srcObject = null;
	    }

	    this.pc.close();
	    this.pc = null;
	    this.target = null;
	  }
	}


}

