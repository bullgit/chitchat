// Chitchat @bullgit
// V0.1

// ====================================
// Main.js
// ====================================

var myFirebaseRef = new Firebase("https://bullchat.firebaseio.com/messages");

var message_input =  document.querySelector('.messageinput');
var send_btn = document.querySelector('.sendbutton');
var message_container = document.querySelector('.chat-messages');

// Init highlight
hljs.initHighlightingOnLoad();

// Init marked
marked.setOptions({
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  },
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

// ====================================
// Push messages to firebase
// ====================================

// Detect when message is sent
document.getElementById('send').addEventListener('click', function(){
  
  // Get the desired values for name / message
  var username = document.getElementById('name').textContent;
  var message = document.getElementById('message').textContent;

  // If the message is empty don't do anything
  if (message.length == 0) return false;

  // If the message is not empty push it to firebase
  myFirebaseRef.push({
    id: "message-id-" +Math.random().toString(36).substr(2, 16)+"-msg",
    data: {
      author: username,
      body: message
    }
  });

  // when the message is sent scroll down the messages list
  message_container.scrollTop = message_container.scrollHeight;

  // Make sure to empty the reply-box
  document.getElementById('message').innerHTML = "";
});

// ====================================
// Get messages from firebase
// ====================================
myFirebaseRef.on('child_added', function(dataSnapshot) {
  var newPost = dataSnapshot.val();
  var d = new Date();
  var today = d.getMonth() + '-' + d.getDay() + '-' + d.getYear();


  // create message template
  var template = '<message data-time-stamp="10-11-2015">' +
  '<div class="user">' +
  '  <span class="-avatar"> <img src="https://avatars.githubusercontent.com/' + newPost.data.author + '" alt="avatar user" /> </span>' +
  '  <span class="-name"> '+ newPost.data.author +' </span>' +
  ' </div>' +
  ' <div class="-message">' +
      marked(newPost.data.body) +
  '</div>' +
  '</message>';

  // Generate message container
  // And give it some attributes
  var msg = document.createElement('div');
  msg.classList.add('message-row');
  msg.id = newPost.id; 

  // Fill it with the template
  msg.innerHTML = template;

  // And add the message to the chat
  document.querySelector('.chat-messages').appendChild(msg)


  message_container.scrollTop = message_container.scrollHeight;
});

// ====================================
// MISC functions
// ====================================

// This function detect if the return key was pressed
function searchKeyPress(e){
    // look for window.event in case event isn't passed in
    e = e || window.event;
    if (e.keyCode == 13 && !e.shiftKey) {
        e.preventDefault();
      document.getElementById('send').click();
      return false
    } 
    else if (e.keyCode == 13 && e.shiftKey) {
      var br = document.createElement('span');
      br.classList.add('break-line');
      br.textContent = '&#10;&#13;';
      br.style.textIndent = "-9999px";
      message_input.appendChild(br)
      return false;
    }
    return true;
  }
