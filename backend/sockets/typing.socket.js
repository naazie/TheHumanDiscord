// imports

import { isChannelAccessibleSocket } from "./helper/accessChannel.js"

export const registerTypingSockets = async (io, socket) => {
    // client to server -> typing-start, typing-stop
    // server to clients -> user-typing user-stop-typing
    socket.typingChannels = new Set();

    socket.on("typing-start", async({channelId}) => {
        // console.log("HERE");
        const channel = await isChannelAccessibleSocket({userId: socket.user.id, channelId: channelId});
        if(!channel)
            return;

        if(socket.typingChannels.has(channelId))
            return;
        socket.typingChannels.add(channelId);
        console.log("User typing", socket.user.username);
        socket.to(channelId).emit("user-typing", {
            channelId, 
            user: {
                id: socket.user.id, 
                username: socket.user.username
            }});
    });

    socket.on("typing-stop", async({channelId}) => {
        const channel = await isChannelAccessibleSocket({userId: socket.user.id, channelId});
        if(!channel)
            return;
        if (!socket.typingChannels.has(channelId)) return;
        socket.typingChannels.delete(channelId);
        socket.to(channelId).emit("user-stop-typing", {
            channelId,
            user: {
                id: socket.user.id,
                username: socket.user.username
        }});
    });

    socket.on("disconnect", () => {
        for(const channelId of socket.typingChannels) {
            socket.to(channelId).emit("user-stop-typing", {
                channelId, 
                user: {
                    id: socket.user.id,
                    username: socket.user.username
                }
            });
        }
        socket.typingChannels.clear();
    })
}