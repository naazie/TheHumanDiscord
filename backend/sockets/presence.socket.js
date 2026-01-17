// sockets/presence.socket.js
import { onlineUsers } from "./presence.store.js";

export const registerOnlinePresence = async (io, socket) => {
    const userId = socket.user.id;
    if(!onlineUsers.has(userId))
    {
        onlineUsers.set(userId, new Set());
    }
    onlineUsers.get(userId).add(socket.id);

    io.emit("user-online", {userId});

    io.on("disconnect", () => {
        const sockets = onlineUsers.get(userId);
        if(!sockets)
            return;
        sockets.delete(socket.id);

        if(sockets.size() === 0)
        {
            onlineUsers.delete(userId);
            io.emit("user-offline", {userId});
        }
    });
};