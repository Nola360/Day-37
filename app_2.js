const User = function (name) {
  this.name = name;
  this.chatroom = null;
}


User.prototype = {

  send: function (message, to) {
    this.chatroom.send(message, this, to)

  },

  receive: function (message, from) {
    console.log(`${from.name} to ${this.name}: ${message}`);


  }
}

const Chatroom = function () {
  let users = {}; // list of users

  return {
    register: function (user) {

      // Set user.name to user thats being passed in function
      users[user.name] = user;

      user.chatroom = this;
    },

    send: function (message, from, to) {
      if (to) {
        // Single user message
        to.receive(message, from);
      } else {
        // Mass message
        for (key in users) {
          if (users[key] !== from) {
            users[key].receive(message, from);
          }
        }
      }
    }
  }
}

const james = new User('James');
const steph = new User('Steph');
const kobe = new User('Kobe');
const irvin = new User('Irvin');

const chatroom = new Chatroom();

chatroom.register(james);
chatroom.register(steph);
chatroom.register(kobe);
chatroom.register(irvin);


james.send('Long live Kobe the goat!', kobe);
steph.send('Long live Kobe the legend!', kobe);
irvin.send('Long live Kobe my good friend!', kobe);