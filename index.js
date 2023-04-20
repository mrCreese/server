//Set up a Node.js server using Express.js
const express = require("express");
const { createServer } = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const PORT = 4050;
//Import the HTTP and the CORS

//add Socket.io to the project to create a real-time connection
const socketIO = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

socketIO.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    socket.broadcast.emit("recive_message", data);
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello",
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

socketIO.listen(4051, () => {
  console.log(`Server listening on ${PORT}`);
});
