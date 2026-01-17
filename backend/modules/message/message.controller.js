// modules/message/message.controller.js
import MessageService from "./message.service.js";

class MessageController {
    async createMessage(req, res) {
        try {
            // contentt senderid, channelid
            const {content} = req.body;
            const newMessage = await MessageService.createMessage({content: content, senderId: req.user.id, channel: req.channel});
            const io = req.app.get("io");
            io.to(req.channel._id.toString()).emit("new-message", newMessage);
            return res.status(201).json({success: true, data: newMessage});
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }

    async fetchMessages(req, res) {
        // channelId
        try {
            const {limit, before} = req.query;
            const messages = await MessageService.fetchMessages({channel: req.channel, limit, before});
            return res.status(200).json({success: true, data: messages, nextCursor: messages.length ? messages[messages.length - 1].createdAt : null});
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }

    async editMessage(req, res) {
        try {
            // newContent, messageId, senderId
            const {newContent} = req.body;
            const {messageId} = req.params;
            const userId = req.user.id;
            const edited = await MessageService.editMessage({newContent: newContent, messageId: messageId, senderId: userId});
            return res.status(200).json({success: true, data: edited});
        } catch (error) {
            return res.status(403).json({error: error.message});
        }
    }
    
    async deleteMessage(req, res) {
        try {
            // messageId, userId
            const {messageId} = req.params;
            const userId = req.user.id;
            const deleted = await MessageService.deleteMessage({messageId: messageId, userId: userId});
            return res.status(200).json({success: true, data: deleted});
        } catch (error) {
            return res.status(403).json({error: error.message});
        }
    }
}

export default new MessageController;