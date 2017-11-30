/*jshint esversion: 6 */
var localVideo = document.getElementById('localVideo');
var remoteVideo = document.getElementById('remoteVideo');

var uname = prompt('enter username');
var user = new User(uname,1,'uuiiids');
var serverURL = 'https://localhost:3000';
var socket = io.connect(serverURL,{secure:true});

socket.on('requestuserinfo', function(){
  socket.emit('receiveuserinfo', uname);
});

var session = new Session(user);

var userlistview = new ListView('userlist');

var userlistcontroller = new UserListController(socket, userlistview);

userlistview.controller = userlistcontroller;

userlistcontroller.init();