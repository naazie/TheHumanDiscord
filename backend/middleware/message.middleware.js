// middleware/message.middleware.js
import Message from "../modules/message/message.model.js";
import Channel from "../modules/channels/channel.model.js";
import Server from "../modules/server/server.model.js"

export async function isMessageAccessible(req, res, next) {
    try {
        const {messageId} = req.params;
        const userId = req.user._id;
        const message = await Message.findOne({_id: messageId, isDeleted: false }).select("_id sender channel")
        if(!message)
            return res.status(404).json({error: "Message not found"});
        const channel = await Channel.findById(message.channel).select("_id server isPrivate allowedUsers isDeleted");
        if(!channel || channel.isDeleted)
            return res.status(404).json({error: "Channel not found"});
        const server = await Server.findById(channel.server).select("_id owner members");
        if(!server)
            return res.status(404).json({error: "Server not found"});
        
        // server owner reigns
        if(userId.toString() !== server.owner.toString())
        {
            const isMember =  server.members.some(id => id.toString() === userId.toString());
            if(!isMember)
                return res.status(403).json({error: "not a server member"});
            if(channel.isPrivate && !channel.allowedUsers.some(id => id.toString() === userId.toString()))
                return res.status(403).json({error: "Not channel member"});
        }
        req.message = message;
        req.channel = channel;
        next();
    } catch (error) {
        return res.status(500).json({error: "Message access check failed"});
    }
}