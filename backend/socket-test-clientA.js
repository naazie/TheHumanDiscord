import { io } from "socket.io-client";

const socket = io("http://localhost:5050");

socket.on("connect", () => {
  console.log("Client A connected");


  socket.emit("join-channel", { channelId: "1" });
});

socket.on("joined-channel", (roomName) => {
  console.log("A joined:", roomName);

  // send messages after join
  setInterval(() => {
    socket.emit("channel-message", {
      channelId: "1",
      message: "Hello from A"
    });
  }, 1000);
});

socket.on("channel-message", (data) => {
  console.log("A received:", data);
});
