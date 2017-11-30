//
		//*****************************************************************
    var Session = {
      userInfo: {username: undefined,room: "WORLD",avatar: ""},
      target: "",
      pc: null, //RTCPeerConnection      
      //functions
      updateUserInfo : function(){
        var opt = UI.opt_elements;
        Session.userInfo.username = opt.username.value;
        Session.userInfo.room = opt.room.value;
        Session.userInfo.avatar = opt.avatar.value;
      }
    }

    var UI = {
      editMode : false,
      opt_elements : {username: document.getElementById("option_username_text"),
                        room:   document.getElementById("option_room_text"),
                        avatar: document.getElementById("option_avatar_text"),
                        button: document.getElementById("option_button")},
      //functions
      changeRoom : function(){

      },
      init : function(){
        UI.opt_elements.username.value = Session.userInfo.username;
        UI.opt_elements.room.value = Session.userInfo.room;
        //initialize the call invitation modal
        //$('#modal1').modal();

        UI.opt_elements.button.onclick = function()
        {
            UI.editMode = !(UI.editMode);
            UI.opt_elements.username.disabled = !(UI.opt_elements.username.disabled);
            UI.opt_elements.avatar.disabled = !(UI.opt_elements.avatar.disabled);
            UI.opt_elements.room.disabled = !(UI.opt_elements.room.disabled);
            if (UI.editMode)
            {
              UI.opt_elements.button.innerHTML = "Save";
            }
            else
            {
              //User clicked the button when it says Save
              UI.opt_elements.button.innerHTML = "Edit";
              if(UI.opt_elements.room.value != Session.userInfo.room){
                //user wants to change room

              }
              Session.updateUserInfo();
            }
        };
      }
    };
    UI.init();
    //**************************************************************************************
    //
    //**************************************************************************************
    Session.userInfo.username = UI.opt_elements.username.value = prompt('Enter a username');
    var serverURL = 'https://localhost:3000';
    // var socket = io.connect('http://localhost:3000');
    var socket = io.connect(serverURL,{secure:true});

    // socket.on('news', function (data) {
    //   console.log(data);
    //   UI.opt_elements.username.value += data.count;
    //   Session.updateUserInfo();
    //   socket.emit('my other event', { my: 'data' });
    // });
    socket.on('requestuserinfo', function(){
      socket.emit('receiveuserinfo', Session.userInfo);
    });

    // socket.on('',function(parameter){

    //});
    socket.on('userlistadd',function(user){
      //Add the user to the list of connected users
      console.log(user);
      var userlist= document.getElementById('userlist');
      var item = document.createElement('a');
      var icon = document.createElement("i");
      icon.appendChild(document.createTextNode('call'));
      icon.className = 'tiny material-icons secondary-content'
      item.appendChild(document.createTextNode(user));
      item.appendChild(icon);
      item.addEventListener("click", engage);
      item.id = user;
      item.className='center-align collection-item';
      
      userlist.appendChild(item);

    });
    socket.on('userlistremove',function(user){
      //Remove a user from the list
      var itemToRemove = document.getElementById(user);
      itemToRemove.parentNode.removeChild(itemToRemove);

    });
    socket.on('incomingOffer',function(message){
      console.log('incoming offer from: '+message.username);
      // $('#modal1').modal('open');
      Session.target = message.username;
      handleIncomingOffer(message.sdp);
    });
    socket.on('incomingAnswer',function(message){
      handleIncomingAnswer(message.sdp);
    });

    socket.on('newIceCandidate',function(message){
      console.log('new candidate arrived');
      var candidate = new RTCIceCandidate(message.candidate);
      Session.pc.addIceCandidate(candidate)
      .then(function(){console.log('new candidate added');})
      .catch(handleError);
      

    });
    socket.on('closeConnection',function(){
      console.log('The peer has ended the call')
      closePeerConnection();
    });

    //*******************************************************

    var localVideo = document.getElementById('localVideo');
    var remoteVideo = document.getElementById('remoteVideo');

    function createPeerConnection(){
      console.log('Creating peer connection')
      try{
        Session.pc = new RTCPeerConnection(null);
        //optional parameters servers
      //for updating the implementation
      // hasAddTrack = (Session.pc.addTrack !== undefined);
        Session.pc.onicecandidate = handleIceCandidate;
        Session.pc.onnegotiationneeded = handleNegotiationNeeded;
        Session.pc.onaddstream = handleRemoteStream;
        Session.pc.onremovestream = handleRemoveStream;

      }catch(e){
        handleError(e);
        return;
      }
    }
    function handleRemoveStream(){
      closePeerConnection();

    }

    function closePeerConnection(){
      if (Session.pc) {          
        if (remoteVideo.srcObject) {
          remoteVideo.srcObject.getTracks().forEach(track => track.stop());
          remoteVideo.srcObject = null;
        }
        if (localVideo.srcObject) {
          localVideo.srcObject.getTracks().forEach(track => track.stop());
          localVideo.srcObject = null;
        }

        Session.pc.close();
        Session.pc = null;
        Session.target = null;
      }
    }
    function hangUp(){
      //close connection and notify target
      
      socket.emit('endCall',{
        target: Session.target
      });
      closePeerConnection();
      console.log('You have ended the call');
    }
    function handleRemoteStream(event){
      //event.stream contains the remote stream
      remoteVideo.src = window.URL.createObjectURL(event.stream);
    }
    function handleIceCandidate(event){
      //The candidate property of the event containts
      //the object that ICE layer want us to transmit
      console.log('new candidate to transmit');
      if(event.candidate){
        socket.emit('iceCandidateMessage',{
          target: Session.target,
          candidate: event.candidate
        });
      }
    }
    function handleIncomingAnswer(sdp){
      //peer answered with his/her descriptor
      Session.pc.setRemoteDescription(sdp)
      .catch(handleError);
      console.log('remoteDecriptor set from answer');
    }
    function handleIncomingOffer(sdp){
      //sdp contains the SDP of the caller
      createPeerConnection();
      var callerSDP = new RTCSessionDescription(sdp);
      Session.pc.setRemoteDescription(callerSDP)
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
            Session.pc.addStream(stream);
          })
          .then(function(){
            console.log('creating answer');
            return Session.pc.createAnswer();
          })
          .then(function(answer){
            console.log('setting answer as localDescriptor');
            //the answer is the calee localDescriptor
            return Session.pc.setLocalDescription(answer);
          })
          .then(function(){
            console.log('sending answer to caller');
            //send the answer to the caller
            socket.emit('sdpAnswerMessage',{
              username: Session.userInfo.username,
              target: Session.target,
              sdp: Session.pc.localDescription
            });
          });
        })
        .catch(handleError);
    //end handleIncomingOffer 
    }
    function handleNegotiationNeeded(){
      if(Session.pc.localDescription.sdp != ""){
        console.log('no need to send offer?');
        return;
      }
      //peer ready to make offer to another
      console.log('negotiationneeded triggered');
      Session.pc.createOffer().then(function(offer){
        //set the created offer as local description

        return Session.pc.setLocalDescription(offer);
      })
      .then(function(){
        //local description set successfull
        //now sending it to the peer
        console.log('localDescription set');
        console.log('sending offer to '+Session.target);
        socket.emit('sdpOfferMessage',{
          username: Session.userInfo.username,
          target: Session.target,
          sdp: Session.pc.localDescription
        });
      })
      .catch(handleError);

    }

    function engage(event){
      if(Session.pc){
        //Already active connection
        if(event.target.id === Session.target){
          hangUp();
        }
        return
      }
      if(event.target.id === Session.userInfo.username){
          //trying to connect to self
        return
      }

      // socket.emit('callRequest',{
      //   username: Session.userInfo.username,
      //   target: event.target.id
      // });

      Session.target = event.target.id;
      //create the connection
      createPeerConnection();
      //get user media
      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      })
      .then(function(stream){
        console.log('Adding local stream.');
        localVideo.src = window.URL.createObjectURL(stream);
        Session.pc.addStream(stream);
      })
      .catch(handleError);
      //peerConnection created & stream added to it
    }

    // function startCommunication(){

    // }

    function handleError(error){
      console.error("Error "+error.name+": "+error.message);
    }
   