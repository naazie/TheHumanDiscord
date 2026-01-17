import MessageService from "../modules/message/message.service.js";
import { isChannelAccessibleSocket } from "./helper/accessChannel.js";

export const registerMessageSockets = (io, socket) => {
    // joining channel
    socket.on("join-channel", async ({channelId}) => {
        try {
            const channel = await isChannelAccessibleSocket({userId: socket.user.id, channelId: channelId});
            // const channel = await Channel.findById(channelId).select("_id isDeleted");
            if(!channel || channel.isDeleted)
                return socket.emit("socket-error", "channel not found");
            socket.join(channelId);

            // send history
            const messages = await MessageService.fetchMessages({channel});
            socket.emit("channel-history", messages.reverse());
        } catch (error) {
            socket.emit("socket-error", error.message);
        }
        
    });

    socket.on("send-message", async ({channelId, content}) => {
        try {
            const channel = await isChannelAccessibleSocket({userId: socket.user.id, channelId: channelId});
            // const channel = await Channel.findById(channelId).select("_id isDeleted");
            if(!channel || channel.isDeleted)
                return socket.emit("socket-error", "channel not found");
            const message = await MessageService.createMessage({
                content: content,
                senderId: socket.user.id,
                channel: channel
            });

            io.to(channelId).emit("new-message", message);
        } catch (error) {
            socket.emit("socket-error", error.message);
        }
    });

}