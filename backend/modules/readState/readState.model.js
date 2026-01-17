// modules/readState/readState.model.js
import mongoose from "mongoose";

const readStateModel = mongoose.Schema(
    {
        // user, channel, lastReadMessage
        user: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        channel: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: "Channel"
        },
        lastReadMessage: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        },
    },
    { timestamps: true }
);

readStateModel.index({ user: 1, channel: 1 }, { unique: true });

export default new mongoose.model("ReadState", readStateModel);