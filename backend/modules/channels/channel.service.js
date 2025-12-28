// modules/channels/channel.service.js
import Channel from "./channel.model.js";
import Server from "../server/server.model.js";

function isValidName(name) {
    if(!name || name.trim().length == 0)
        return false;
    return true;
}

class ChannelService {
    async createChannel({name, serverId, isPrivate = false, allowedRoles = [], allowedUsers = [], createdBy}) {
        if(!isValidName(name))
        {
            throw new Error("Invalid Name");
        }

        const serverDoc = await Server.findById(serverId).select("_id name owner members");
        if(!serverDoc) {
            throw new Error("Server invalid");
        }

        if(createdBy.toString() != serverDoc.owner.toString() )
            throw new Error("Only server owner can create channels");
        
        const normalisedName = name.trim().toLowerCase();
        const doesChannelExist = await Channel.findOne({name: normalisedName, server: serverId}).select("_id name");
        if(doesChannelExist)
            throw new Error("Channel with this name already exists");
        
        const newChannel = await Channel.create({
            name: normalisedName,
            server: serverId,
            isPrivate: isPrivate,
            createdBy: createdBy,
            allowedRoles: isPrivate ? allowedRoles : [],
            allowedUsers: isPrivate ? allowedUsers : [],
        });

        return {
            id: newChannel._id,
            name: newChannel.name,
            server: newChannel.server,
            createdBy: newChannel.createdBy
        }
    }

    async getChannelsInServer({serverId}) {
        const channels = await Channel.find({server: serverId, isDeleted: {$ne: true}}).select("_id name server isPrivate createdBy");
        return channels;
    }

    async updateChannel({channelId, userId, newName, newType, newIsPrivate, newAllowedRoles, newAllowedUsers}) {
        // does channel exist -> 
        // things that can be edited - name, type, allowedUsers, allowedRoles, isPrivate 
        // so update all of these
        const channel = await Channel.findById(channelId).select("_id name server isPrivate allowedRoles allowedUsers createdBy");
        if(!channel )
            throw new Error("Channel does not exist");
        const server = await Server.findById(channel.server).select("_id name owner members");
        if(!server)
            throw new Error("Server doesn't exist");
        
        let updates = {};
        if(newName != undefined)
        {
            if(!isValidName(newName))
            {
                throw new Error("Invalid new name");
            }    
            const normalisedName = newName.trim().toLowerCase();
            if(await Channel.findOne({name: normalisedName, server: channel.server, _id: {$ne: channelId}}).select("_id name"))
                throw new Error("Channel with this name already exists");
            updates.name = normalisedName; 
        } 
        if(newType != undefined)
        {
            if (!["text", "voice"].includes(newType)) 
                throw Error("Invalid Type");
            updates.type = newType;
        }
        if(newIsPrivate != undefined)
        {
            updates.isPrivate = newIsPrivate;
            if(newIsPrivate === true)
            {
                if(newAllowedRoles != undefined)
                    updates.allowedRoles = newAllowedRoles;
                if(newAllowedUsers != undefined)
                    updates.allowedUsers = newAllowedUsers;
                else
                    updates.allowedUsers = [server.owner];
            }
            else
            {
                updates.allowedUsers = [];
                updates.allowedRoles = []
            }
        }

        if (Object.keys(updates).length === 0) {
            throw new Error("No fields provided to update");
        }

        const updated = await Channel.findByIdAndUpdate(channelId, updates, {new: true});
        return {
            id: updated._id,
            name: updated.name,
            server: updated.server,
            createdBy: updated.createdBy
        }
    }

    // soft delete
    async deleteChannel({channelId}) {
        const channel = await Channel.findById(channelId).select("_id name server isPrivate createdBy allowedRoles allowedUsers createdBy isDeleted");
        if(!channel)
        {
            throw new Error("Channel does not exist");
        }
        if(channel.isDeleted)
        {
            throw new Error("Channel already deleted");
        }
        const deleted = await Channel.findByIdAndUpdate(channelId, {isDeleted: true}, {new: true});
        return {
            id: deleted._id,
            name: deleted.name,
            server: deleted.server,
            createdBy: deleted.createdBy,
            isDeleted: deleted.isDeleted
        }
    }

    // hard delete
    // async deleteChannel({channelId}) {
    //     const channel = await Channel.findById(channelId).select("_id name server isPrivate createdBy allowedRoles allowedUsers createdBy");
    //     if(!channel)
    //     {
    //         throw new Error("Channel does not exist");
    //     }
    //     const deleted = await Channel.findByIdAndDelete(channelId);
    //     if(!deleted)
    //         throw new Error("Could not delete channel");
    //     return {
    //         id: deleted._id,
    //         name: deleted.name,
    //         server: deleted.server,
    //         createdBy: deleted.createdBy
    //     }
    // }
}

export default new ChannelService();