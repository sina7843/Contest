const io = require("socket.io")();
const user = require("./models/user");
const socketapi = {
   io: io
};

io.on('connection', (socket) => {
   socket.on('getScore', () => {
      socket.emit('setBoard');
      socket.broadcast.emit('setBoard')
   })
});


module.exports = socketapi;