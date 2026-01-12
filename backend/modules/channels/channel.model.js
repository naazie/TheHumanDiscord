// modules/channels/channel.model.js
import mongoose from "mongoose";

const ChannelModel = new mongoose.Schema(
    // name, createdby, type, server, isPrivate, allowedRoles, allowedUsers, isDeleted
    {
        name: {
            type: String,
            required: true, 
            trim: true
        },
        type: {
            type: String,
            enum: ["text"],
            default: "text"
        },
        server: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Server",
            required: true
        },
        isPrivate: {
            type: Boolean,
            default: false
        },
        allowedRoles: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
            default: []
        }],
        allowedUsers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: []
        }],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", 
            required: true
        },
        isDeleted:
        {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
)

ChannelModel.index({ server: 1, name: 1 }, { unique: true });

export default new mongoose.model("Channel", ChannelModel);