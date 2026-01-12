// modules/channels/channel.routes.js
import { isAuthorised } from "../../middleware/auth.middleware.js";
import { isOwner, isServerMember } from "../../middleware/server.middleware.js";
import { isChannelAccessible, isAuthorisedChannel } from "../../middleware/channel.middleware.js";
import ChannelController from "./channel.controller.js"; 
import express from "express";
const router = express.Router();
// when accessing a channel, check isServer member first

// create channel
router.post("/servers/:serverId/channels", isAuthorised, isServerMember, isOwner, ChannelController.createChannel);

// get channels of a server
router.get("/servers/:serverId/channels", isAuthorised, isServerMember,ChannelController.getChannelsInServer);

// update 
router.patch("/channels/:channelId", isAuthorised, isChannelAccessible, isAuthorisedChannel, ChannelController.updateChannel);

// delete (soft)
router.delete("/channels/:channelId", isAuthorised, isChannelAccessible, isAuthorisedChannel, ChannelController.deleteChannel);

export default router;