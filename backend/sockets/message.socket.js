import MessageService from "../modules/message/message.service.js";
import Channel from "../modules/channels/channel.model.js";

export const registerMessageSockets = (io, socket) => {
    // joining channel
    socket.on("join-channel", async ({channelId}) => {
        const channel = await Channel.findById(channelId).select("_id isDeleted");
        if(!channel || channel.isDeleted)
            return socket.emit("error", "channel not found");
        socket.join(channelId);

        // send history
        const messages = await MessageService.fetchMessages({channel});
        socket.emit("channel-history", messages.reverse());
    });

    socket.io("send-message", async ({channelId, content, userId}) => {
        try {
            const channel = await Channel.findById(channelId).select("_id isDeleted");
            if(!channel || channel.isDeleted)
                return socket.emit("socket-error", "channel not found");
            const message = await MessageService.createMessage({
                content: content,
                senderId: userId,
                channel: channel
            });

            io.to(channelId).emit("new-message", message);
        } catch (error) {
            socket.emit("error", error.message);
        }
    });

}