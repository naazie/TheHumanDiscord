import MessageService from "../modules/message/message.service.js";
import { isChannelAccessibleSocket } from "./helper/accessChannel.js"

export const registerMessageEditsSocket = async (io, socket) => {
    socket.on("edit-message", async ({channelId, messageId, newContent}) => {
        try {
            const channel = await isChannelAccessibleSocket({userId: socket.user.id, channelId});
            if(!channel)
                return socket.emit("socket-error", "Access denied");
            const updatedMsg = await MessageService.editMessage({newContent, messageId, senderId: socket.user.id});
            io.to(channelId).emit("message-edited", updatedMsg);
        } catch (error) {
            return socket.emit("socket-error", error.message);
        }
    });

    socket.on("delete-message", async ({channelId, messageId}) => {
        try {
            const channel = await isChannelAccessibleSocket({userId: socket.user.id, channelId});
            if(!channel)
                return socket.emit("socket-error", "Access denied");
            const deletedMsg = await MessageService.deleteMessage({messageId, userId: socket.user.id});
            io.to(channelId).emit("message-deleted", {
                messageId,
                userId: socket.user.id
            })
        } catch (error) {
            return socket.emit("socket-error", error.message);
        }
    })
};