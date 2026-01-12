// modules/message/message.model.js
import mongoose from "mongoose";
import Channel from "../channels/channel.model.js";
import User from "../auth/auth.model.js"

const MessageModel = mongoose.Schema(
    {
        // content, channel,  sender, edited, isDeleted'
        content: {
            type: String,
            required: true,
            trim: true
        },
        channel: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Channel"
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        edited: {
            type: Boolean,
            default: false
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
)

export default new mongoose.model("Message", MessageModel);