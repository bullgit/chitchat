var NONET = false;

  var myFirebaseRef = new Firebase("https://bullchat.firebaseio.com/messages");

  var message_input =  document.querySelector('.messageinput');
  var send_btn = document.querySelector('.sendbutton');
  var message_container = document.querySelector('.chat-messages');

  marked.setOptions({
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });


    
      document.getElementById('send').addEventListener('click', function(){

        var username = document.getElementById('name').textContent;
        var message = document.getElementById('message').textContent;
        if (message.length == 0) return false;
        myFirebaseRef.push({
          id: "message-id-" +Math.random().toString(36).substr(2, 16)+"-msg",
          data: {
            author: username,
            body: message
          }
        });
      message_container.scrollTop = message_container.scrollHeight;
      document.getElementById('message').innerHTML = "";
    });
    
    myFirebaseRef.on('child_added', function(dataSnapshot) {
      var newPost = dataSnapshot.val();
      var d = new Date();
      var today = d.getMonth() + '-' + d.getDay() + '-' + d.getYear();
      console.log(today);
      console.log(newPost);


       var template = '<message data-time-stamp="10-11-2015">' +
      '<div class="user">' +
          '  <span class="-avatar"> <img src="https://avatars.githubusercontent.com/' + newPost.data.author + '" alt="avatar user" /> </span>' +
          '  <span class="-name"> '+ newPost.data.author +' </span>' +
         ' </div>' +
         ' <div class="-message">' +
           ' <p>'+ marked(newPost.data.body) +'</p>' +
          '</div>' +
      '</message>';


      var msg = document.createElement('div');
      msg.classList.add('message-row');
      msg.id = newPost.id;
      msg.innerHTML = template;

      document.querySelector('.chat-messages').appendChild(msg)
      message_container.scrollTop = message_container.scrollHeight;
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
