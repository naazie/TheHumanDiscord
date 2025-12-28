// modules/server/server.service.js
import Channel from "../channels/channel.model.js";
import Server from "./server.model.js";

function isNotValidName(name) {
    return (!name || name.trim().length == 0)
}

class ServerService
{
    async createServer({name, ownerId}) {
        // seq - check if name exists -> create -> add owner as a member
        if(isNotValidName(name))
            throw new Error("Please enter valid name for server");

        const newServer = await Server.create({
            name: name.trim(),
            owner: ownerId,
            members: [ownerId]
        });

        // name, createdby, type, server, isPrivate, allowedRoles, allowedUsers
        await Channel.create({
            name: "General",
            server: newServer._id,
            createdBy: ownerId,
            isPrivate: false
        })

        return {
            id: newServer._id,
            name: newServer.name,
            owner: newServer.owner
        };
    }

    async getUserServers({userId}) {
        const servers = await Server.find({members: userId}).select("_id name owner");
        return servers;
    }

    async getServerById({serverId}) {
        const server = await Server.findOne({_id: serverId}).select("_id name owner");
        return server;
    }

    async deleteServer({serverId}) {
        const deleted = await Server.findByIdAndDelete(serverId);
        if(!deleted)
        {
            throw new Error("Could not delete, Server not found");
        }
        return {
            id: deleted._id,
            name: deleted.name,
            owner: deleted.owner
        };
    }

    async updateServerName({serverId, newName}) {
        if(isNotValidName(newName))
        {
            throw new Error("Not a valid server name");
        }
        const updated = await Server.findByIdAndUpdate(serverId, {name: newName.trim()}, {new: true}).select("_id name owner");
        if(!updated)
            throw new Error("Could not update, Server not found");
        return {
            id: updated._id,
            name: updated.name,
            owner: updated.owner
        };
    }
}

export default new ServerService;