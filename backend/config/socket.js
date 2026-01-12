// config/socket.js
import { Server } from "socket.io";
import { registerMessageSockets } from "../sockets/message.socket.js";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: { origin: "*" }
  });
  // return io;
  io.on("connection", (socket) => {
    console.log("client connected ", socket.id);
    // socket.on("ping", () => {
    //   console.log("Pinged");
    //   socket.emit("pong");
    // })

    // socket.on("join-channel", (channelId) => {
    //   const roomName = `channel_${channelId}`
    //   console.log("Joined channel: ", channelId);
    //   socket.join(roomName);
    //   socket.emit("joined-channel", roomName);
    // });

    // socket.on("channel-message", ({channelId, message}) => {
    //   const roomName = `channel_${channelId}`
    //   io.to(roomName).emit("channel-message", {
    //     from: socket.id,
    //     message
    //   });
    //   console.log(`Message: ${message} sent to ${channelId}`);
    // });

    registerMessageSockets(io, socket);
    

    socket.on("disconnect", (socket) => {
      console.log("client disconnected: ", socket.id);
    });
  });
  return io;
};