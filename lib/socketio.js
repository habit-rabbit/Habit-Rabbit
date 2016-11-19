

module.exports = {
  io: null,
  initialize: function(httpServer) {
    this.io = require('socket.io')(httpServer);
    this.io.on('connection', this.onConnection);
  },

  emit: function(type, data) {
    if (this.io) {
      this.io.emit(type, data);
      // this.io.apply(arguments)
    }
  },

  onConnection: function(socket) {
    console.log(socket.id);
    // let id = 1;
    // setInterval(() => {
    //   socket.emit('message', {
    //     text: 'HEllo world',
    //     username: 'james',
    //     channel: 'lecture',
    //     id: id++
    //   });
    // }, 1000)
  }
};
