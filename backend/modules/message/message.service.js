// modules/message/message.service.js

// import Channel from "../channels/channel.model.js";
import Message from "./message.model.js"

function validContent(content) {
    return typeof content === "string" && content.trim().length > 0;
}

class MessageService {
    // content, channel,  sender, edited, isDeleted
    // create, fetxh, edit, delete
    async createMessage({content, senderId, channel}) {
        //  check if channel exists -> validate content -> crate message -> return message id and content
        // name, createdby, type, server, isPrivate, allowedRoles, allowedUsers, isDeleted
        // check if channel is accessible 
    
        if(!channel || channel.isDeleted)
        {
            throw new Error("Channel doesn't exist");
        }
        if(!validContent(content))
            throw new Error("Content invalid");
        const message = await Message.create({
            content: content.trim(),
            channel: channel._id,
            sender: senderId
        });
        return ({
            _id: message._id,
            content: message.content,
            sender: message.sender,
            channel: message.channel,
            createdAt: message.createdAt
        })
    }
    async fetchMessages({channel, limit = 30, before}) {
        // check channel id & return 
        if(!channel || channel.isDeleted)
        {
            throw new Error("Channel doesn't exist");
        }

        const query = {channel: channel._id, isDeleted: false};

        if(before)
        {
            query.createdAt = {$lt: new Date(before)};
        }

        const messages = await Message.find(query)
            .select("_id content sender channel createdAt")
            .sort({ createdAt: -1 })
            .limit(Number(limit));

        // const messages = await Message.find({channel: channel._id, isDeleted: false}).select("_id content sender channel createdAt").sort({ createdAt: -1 });
        return messages;
    }

    async editMessage({newContent, messageId, senderId}) {
        // check if message exists -> check if sender is correct -> update message 
        // const message = await Message.findById(messageId).select("_id content sender edited channel isDeleted");
        const message = await Message.findOne({_id: messageId, isDeleted: false}).select("_id content sender edited channel isDeleted");
        if(!message)
            throw new Error("Message doesn't exist");
        if(senderId.toString() !== message.sender.toString())
            throw new Error("Not authorised to edit");
        if(!validContent(newContent))
            throw new Error("Invalid content");
        const edited = await Message.findByIdAndUpdate(messageId, {content: newContent.trim(), edited: true}, {new: true}).select("_id content sender edited channel createdAt");
        return ({
            _id: edited._id,
            content: edited.content,
            sender: edited.sender,
            channel: edited.channel,
            createdAt: edited.createdAt
        })
    }

    async deleteMessage({messageId, userId}) {
        // check if message exists and delete
        const message = await Message.findOne({_id: messageId, isDeleted: false}).select("_id content sender edited channel isDeleted");
        if(!message)
            throw new Error("Message doesn't exist");
        if(userId.toString() !== message.sender.toString())
            throw new Error("Not authorised to delete");
        const deleted = await Message.findByIdAndUpdate(messageId, {isDeleted: true}, {new: true}).select("_id content sender edited channel createdAt");
        return ({
            _id: deleted._id,
            content: deleted.content,
            sender: deleted.sender,
            channel: deleted.channel,
            createdAt: deleted.createdAt
        })
    }
}

export default new MessageService;