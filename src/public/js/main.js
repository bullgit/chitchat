 var myFirebaseRef = new Firebase("https://bullchat.firebaseio.com/messages");



    document.getElementById('send').addEventListener('click', function(){

      var username = document.getElementById('name').textContent;
      var message = document.getElementById('message').value;
      if (message.length == 0) return false;
      myFirebaseRef.push({
        id: "message-id-" + Math.random().toString(36).substr(2, 16)+"-msg",
        data: {
          author: username,
          body: message
        }
      });

    })

    myFirebaseRef.on('child_added', function(dataSnapshot) {
     var newPost = dataSnapshot.val();

     console.log(newPost);


    var template = '<message>'+
    '<div class="username"><span>'+ newPost.data.author +'</span></div>'+
    '<div class="user_message"><p>'+ newPost.data.body +'</p></div>'+
    '</message>';

    var msg = document.createElement('div');
    msg.innerHTML = template;

    document.querySelector('.chat-messages').appendChild(msg)
    document.getElementById('message').value = "";
  });
  function searchKeyPress(e){
    // look for window.event in case event isn't passed in
    e = e || window.event;
    if (e.keyCode == 13)
    {
        document.getElementById('send').click();
        return false;
    }
    return true;
  }
  // function send() {
  // I'd prefer if the send function was here and then called from both the keypress and the button.
  // seems more 'semantic' or waddayacall it
  // @Haroenv
  // }
