// modules/channels/channel.controller.js
import ChannelService from "./channel.service.js";

class ChannelController {
    async createChannel(req, res) {
        try {
            const createdBy = req.user._id;
            const { serverId } = req.params; 
            const {name,isPrivate = false, allowedRoles = [], allowedUsers = []} = req.body;
            const newChannel = await ChannelService.createChannel({name, serverId, isPrivate, allowedRoles, allowedUsers, createdBy});
            return res.status(201).json({success: true, data: newChannel});
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }

    async getChannelsInServer(req, res) {
        try {
            const { serverId } = req.params;
            const channels = await ChannelService.getChannelsInServer({serverId});
            return res.status(200).json({success: true, data: channels});
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }

    async updateChannel(req, res) {
        try {
            // hannelId, userId, newName, newType, newIsPrivate, newAllowedRoles, newAllowedUsers
            const { channelId } = req.params;
            const userId  = req.user._id;
            const { newName, newType, newIsPrivate, newAllowedRoles, newAllowedUsers } = req.body;
            const updated = await ChannelService.updateChannel({channelId, userId, newName, newType, newIsPrivate, newAllowedRoles, newAllowedUsers});
            return res.status(200).json({success: true, data: updated});
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }

    async deleteChannel(req, res) {
        // channelId
        try {
            const {channelId} = req.params;
            const deleted = await ChannelService.deleteChannel({channelId});
            return res.status(200).json({success: true, data: deleted});
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }
}

export default new ChannelController();