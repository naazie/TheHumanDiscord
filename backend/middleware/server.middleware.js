// middleware/server.middleware.js
import serverModel from "../modules/server/server.model.js";

export async function isServerMember(req, res, next) {
    try {
        const {serverId} = req.params;
        const userId = req.user.id;
        const isServer = await serverModel.findById(serverId).select("_id name owner members");
        if(!isServer)
        {
            return res.status(404).json({error: "Server not found"});
        }
        // const isMember = isServer.members.some(memberId => memberId.toString() === userId);
        const isMember = isServer.members.some(memberId => memberId && memberId.toString() === userId);
        if(!isMember)
        {
            return res.status(403).json({error: "Member not present"});
        }
        req.server = isServer;
        next();
    } catch (error) {
        return res.status(500).json({ error: "Server membership check failed" });
    }
}

export async function isOwner(req, res, next) {
    // Only owner can: delete server, rename server, kick members
    try {
        const server = req.server;
        const userId = req.user.id;
        if(!server)
        {
            return res.status(500).json({error: "Server context missing"});
        }
        if(!server.owner || server.owner.toString() !== userId)
        {
            return res.status(403).json({error: "Only server owner has access"});
        }
        next();
    } catch (error) {
        return res.status(500).json({error: "Ownership check failed"});
    }
}