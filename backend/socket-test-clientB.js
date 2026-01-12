import { io } from "socket.io-client";

const socket = io("http://localhost:5050");

socket.on("connect", () => {
  console.log("Client B connected");

  socket.emit("join-server", "1");

  socket.emit("join-channel", { serverId: "1", channelId: "1" });
});

socket.on("joined-channel", (roomName) => {
  console.log("B joined:", roomName);
});

socket.on("channel-message", (data) => {
  console.log("B received:", data);
});
