// Chitchat @bullgit
// V0.1

// ====================================
// global Variables
// ====================================
var myFirebaseRef = new Firebase("https://bullchat.firebaseio.com/messages");

var message_input =  document.querySelector('.messageinput');
var send_btn = document.querySelector('.sendbutton');
var message_container = document.querySelector('.chat-messages');

// Init marked
marked.setOptions({
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  }
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

    // This id may be useless
    id: "message-id-" +Math.random().toString(36).substr(2, 16)+"-msg", 
    data: {
      author: username,
      body: message
    }
  });

})


// ====================================
// Get messages from firebase
// ====================================

myFirebaseRef.on('child_added', function(dataSnapshot) {
  var newPost = dataSnapshot.val();

  // create message template
  var template = '<message>' +
  '<div class="user">' +
  '  <span class="-avatar"> <img src="img/poly_me.png" alt="avatar user" /> </span>' +
  '  <span class="-name"> '+ newPost.data.author +' </span>' +
  ' </div>' +
  ' <div class="user_message">' +
  ' <p>'+ marked(newPost.data.body) +'</p>' +
  '</div>' +
  '</message>';

  // Generate message container
  var msg = document.createElement('div');
  
  // Fill it with the template
  msg.innerHTML = template;

  // And add the message to the chat
  document.querySelector('.chat-messages').appendChild(msg)

  // Make sure to empty the reply-box
  document.getElementById('message').innerHTML = "";
});


// ====================================
// MISC functions
// ====================================

// This function detect if the return key was pressed
function searchKeyPress(e){
    // look for window.event in case event isn't passed in
    e = e || window.event;

    // If return was pressed, send the message
    if (e.keyCode == 13)
    {
      document.getElementById('send').click();
      return false;
    }
    return true;
  }

