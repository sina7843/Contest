const io = require("socket.io")();
const user = require("./models/user");
const socketapi = {
   io: io
};

io.on('connection', (socket) => {
   console.log('a user connected');
   socket.on('getScore', () => {
      socket.emit('setBoard');
      socket.brodcast.emit('setBoard')
   })
   socket.on('disconnect', () => {
      console.log('user disconnected');
   });
});


module.exports = socketapi;