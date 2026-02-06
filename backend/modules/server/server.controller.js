// modules/server/server.controller.js
import ServerService from "./server.service.js";

class ServerController {
    async createServer(req, res) {
        try {
            // het params from req
            const {name} = req.body;
            // since these will be protected routes, these will be govent through auth jwt
            const ownerId = req.user.id;
            const newServer = await ServerService.createServer({name, ownerId});
            return res.status(201).json({success: true, newServer});
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }

    async getUserServers(req, res) {
        try {
            // get params
            const userId = req.user.id;
            const servers = await ServerService.getUserServers({userId});
            return res.status(200).json({success: true, servers});
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }

    async getServerById(req, res) {
        try {
            // unpack params - which is by url
            const {serverId} = req.params;
            const server = await ServerService.getServerById({serverId});
            return res.status(200).json({success: true, server});
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }

    async deleteServer(req, res) {
        try {
            // unpack
            const serverId = req.server._id;
            const deletedServer = await ServerService.deleteServer({serverId});
            return res.status(200).json({success: true, deletedServer});
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    async updateServerName(req, res) {
        try {
            const {newName} = req.body;
            const serverId = req.server._id;
            const updatedServer = await ServerService.updateServerName({serverId, newName});
            return res.status(200).json({success: true, updatedServer});
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    async fetchMembers(req, res) {
        try {
            const {serverId} = req.params;
            const members = await ServerService.fetchMembers({serverId});
            return res.status(200).json({success: true, members});
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }
}

export default new ServerController;