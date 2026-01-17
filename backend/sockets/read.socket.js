import ReadState from "../modules/readState/readState.model.js";
import { isChannelAccessibleSocket } from "./helper/accessChannel.js";

export const registerReadSockets = async (io, socket) => {
    socket.on("mark-read", async ({channelId, messageId}) => {
        try {
            const channel = await isChannelAccessibleSocket({userId: socket.user.id, channelId});
            if(!channel)
                return;

            await ReadState.findOneAndUpdate({
                    user: socket.user.id,
                    channel: channelId
                },
                {
                    lastReadMessage: messageId
                },
                {
                    upsert: true,
                    new: true
                }
            );

            socket.to(channelId).emit("read-update", {
                userId: socket.user.id,
                channelId,
                messageId
            });

        } catch (error) {
            socket.emit("socket-error", error.message);
        }
    });
};