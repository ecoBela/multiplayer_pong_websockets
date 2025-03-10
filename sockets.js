let readyPlayerCount = 0;

function listen(io) {
  io.on("connection", (socket) => {
    console.log("Client connected as", socket.id);

    socket.on("ready", () => {
      console.log("Player is ready on", socket.id);
      readyPlayerCount++;
      if (readyPlayerCount % 2 === 0) {
        io.emit("startGame", socket.id);
      }
    });

    socket.on("paddleMove", (paddleData) => {
      socket.broadcast.emit("paddleMove", paddleData);
    });

    socket.on("ballMove", (ballData) => {
      socket.broadcast.emit("ballMove", ballData);
    });

    socket.on("disconnect", (reason) => {
      console.log(`Client ${socket.id} disconnected because of ${reason}`);
    });
  });
}

module.exports = { listen };
