// modules/message/message.routes.js
import { isAuthorised } from "../../middleware/auth.middleware.js";
import { isChannelAccessible } from "../../middleware/channel.middleware.js";
import { isMessageAccessible } from "../../middleware/message.middleware.js";
import MessageController from "./message.controller.js";
import express from "express";
const router = express.Router();

router.post("/channels/:channelId/messages", 
    isAuthorised, 
    isChannelAccessible,
    MessageController.createMessage
 );

 router.get("/channels/:channelId/messages",
    isAuthorised,
    isChannelAccessible,
    MessageController.fetchMessages
 );

router.patch("/messages/:messageId",
    isAuthorised,
    isMessageAccessible,
    MessageController.editMessage
);

router.delete("/messages/:messageId",
    isAuthorised,
    isMessageAccessible,
    MessageController.deleteMessage
);

export default router;