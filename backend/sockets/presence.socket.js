// sockets/presence.socket.js
import {onlineUsers} from "./presence.store.js"

export const registerOnlinePresence = async (io, socket) => {
    console.log("PRESENCE REGISTER:", socket.user.id, socket.id);
    const userId = socket.user.id;
    if(!onlineUsers.has(userId))
    {
        onlineUsers.set(userId, new Set());
    }
    onlineUsers.get(userId).add(socket.id);

    socket.emit("online-users", {
        users: Array.from(onlineUsers.keys())
    })  

    socket.broadcast.emit("user-online", {userId});

    socket.on("get-online-users", () => {
        socket.emit("online-users", {
            users: Array.from(onlineUsers.keys())
        });
    });


    // io.emit("user-online", {userId});

    socket.on("disconnect", () => {
        const sockets = onlineUsers.get(userId);
        if(!sockets)
            return;
        sockets.delete(socket.id);

        if(sockets.size === 0)
        {
            onlineUsers.delete(userId);
            socket.broadcast.emit("user-offline", {userId});
        }
    });
};