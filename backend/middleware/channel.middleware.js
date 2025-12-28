// middleware/channel.middleware.js
// middlewares - is channelmember & ischannelowner / owner
import Channel from "../modules/channels/channel.model.js";
import Server from "../modules/server/server.model.js";

export async function isChannelAccessible(req, res, next) {
    try {
        // isChannelmember
        const {channelId} = req.params;
        const userId = req.user.id;
        const channel = await Channel.findById(channelId).select("_id name server isPrivate allowedRoles allowedUsers createdBy isDeleted");
        if(!channel)
        {
            return res.status(404).json({error: "Channel not found"});
        }
        if(channel.isDeleted)
            return res.status(404).json({error: "Channel deleted"});

        const server = await  Server.findById(channel.server).select("_id name owner members");
        if(!server)
        {
            return res.status(404).json({error: "Server Not found"});
        }

        // if server owner then access to all
        if(server.owner.toString() === userId)
        {
            req.channel = channel;
            return next();
        }

        const isServerMember = server.members.some(memberId => memberId.toString() === userId);
        if(!isServerMember)
        {
            return res.status(403).json({error: "Not a member of server"})
        }
        else if(channel.isPrivate && !(channel.allowedUsers.some(memberId => memberId.toString() === userId)))
        {
            return res.status(403).json({error: "Not a meember of this channel"})
        }
        req.channel = channel;
        req.server = server;
        next();
    } catch (error) {
        return res.status(500).json({error: "Channel membership error"});
    }
}

export async function isAuthorisedChannel(req, res, next) {
    // auth if server owner / is created by them 
    try {
        const channel = req.channel;
        const server = await Server.findById(channel.server).select("_id name members owner isDeleted");
        if(!channel || !server)
            return res.status(404).json({error: "Did not find server/channel"});
        if(channel.isDeleted)
            return res.status(404).json({error: "Channel deleted"});
        const ownerId = server.owner;
        const userId = req.user._id;
        if(userId.toString() != ownerId.toString())
            return res.status(403).json({error: "Not allowed to make changes"});   
        next();
    } catch (error) {
        res.status(500).json({error: "Channel authentication error"});
    }
}