// imports 
import Channel from "../../modules/channels/channel.model.js";
import Server from "../../modules/server/server.model.js";

export const isChannelAccessibleSocket = async ({userId, channelId}) => {
    try {
        // name, createdby, type, server, isPrivate, allowedRoles, allowedUsers, isDeleted
        const channel = await Channel.findById(channelId).select("_id server isPrivate isDeleted allowedUsers");
        if(!channel || channel.isDeleted)
        {
            return null;
        }
        // name, owner, members
        const server = await Server.findById(channel.server).select("_id name owner members");
        if(!server)
            return null;

        // if woner then allowed 
        if(userId.toString() == server.owner.toString())
            return channel;

        const isServerMember = server.members.some(memberId => memberId && memberId.toString() === userId.toString());
        if(!isServerMember)
        {
            return null;
        }
        if(!channel.isPrivate)
            return channel;
    
        // if private
        const isChannelMember = channel.allowedUsers.some(memberId => memberId && memberId.toString() == userId.toString());
        if(!isChannelMember)
            return null;
    
        return channel;

    } catch (error) {
        return null;
    }
    
}