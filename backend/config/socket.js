// config/socket.js
import { Server } from "socket.io";
import { registerMessageSockets } from "../sockets/message.socket.js";
import { authenticateSocket } from "../sockets/socketAuth.js";
import { registerTypingSockets } from "../sockets/typing.socket.js";
import { registerOnlinePresence } from "../sockets/presence.socket.js";
import { registerReadSockets } from "../sockets/read.socket.js";
import { registerMessageEditsSocket } from "../sockets/messageEdit.socket.js";
import app from "../app.js";
// add onlineuser route

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: { origin: "*" }
  });

  const onlineUsers = new Map();

  io.use(authenticateSocket);

  // return io;
  io.on("connection", (socket) => {
    console.log("client connected ", socket.id);
    console.log("socket.user:", socket.user);
    const userId = socket.user.id;

    const cnt = onlineUsers.get(userId) || 0;
    onlineUsers.set(userId, cnt+1);

    if(cnt === 0)
      socket.emit("user-online", {userId});

    socket.onAny((event, ...args) => {
      console.log("EVENT:", event, args);
    });
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
    registerTypingSockets(io, socket);
    registerOnlinePresence(io, socket);
    registerReadSockets(io, socket);
    registerMessageEditsSocket(io, socket);

    socket.on("disconnect", () => {
      console.log("client disconnected: ", socket.id);

      const userId = socket.user.id;
      const cnt = onlineUsers.get(userId);
      if(!cnt)
        return;

      if(cnt === 1)
      {
        onlineUsers.delete(userId);
        socket.emit("user-offline", {userId});
      }
      else
        onlineUsers.set(userId, cnt-1);
    });
  });
  return io;
};