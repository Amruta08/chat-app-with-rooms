const express = require("express");
const socketio = require("socket.io");

const app = express();

// Load our static html files from public folder
app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(8000);
// handing the expressserver to socketio module
const io = socketio(expressServer);

// The browser & server are connected
io.on("connection", (socket) => {
  console.log(socket.id, "has connected");

  // We use emit method in socket.io to send messages to client
  // socket.emit("messageFromServer", { data: "Welcome to the socket server" });

  // Receving message from client
  socket.on("newMessageToserver", (data) => {
    console.log(data);
    let newdata = "Received Message :- " + data.text;
    // Send the message to all the clients
    io.emit("newmessageToClients", { text: newdata });
  });
});
